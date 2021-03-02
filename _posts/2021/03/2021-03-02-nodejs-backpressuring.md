---
layout: post
date: 2021-03-02 18:31:46 +0800
slug: nodejs-backpressuring
title: "Node.js Backpressuring（背压）"
author: Yourtion
keywords: ["nodejs", "backpressuring"]
description: "背压，意思是在数据传输过程中有一大堆数据在缓存之后积压着。每次当数据到达结尾又遇到复杂的运算，又或者无论什么原因它比预期的慢，这样累积下来，从源头来的数据就会变得很庞大，像一个塞子一样堵塞住。"
category: "学习"
tags: ["Node.js"]
---
{% include JB/setup %}

通常在数据处理的时候我们会遇到一个普遍的问题：背压，意思是在数据传输过程中有一大堆数据在缓存之后积压着。每次当数据到达结尾又遇到复杂的运算，又或者无论什么原因它比预期的慢，这样累积下来，从源头来的数据就会变得很庞大，像一个塞子一样堵塞住。

为解决这个问题，必须存在一种适当的代理机制，确保流从一个源流入另外一个的时候是平滑顺畅的。不同的社区组织针对他们各自的问题单独做了解决，好例子比如 Unix 的管道和 TCP 的 Socket。此问题经常与流控制相关。在 Node.js 中，流已经是被采纳的解决方案。

此文的目的在于详细深入介绍什么是背压，并从代码角度详细解释在 Node.js 中，流是如何针对此问题进行处理的。本文的第二部分将给予你实现流的功能时最佳实践，以确保你的程序既安全又精简。

我们假定你对 Node.js 中的背压，`Buffer`，`EventEmitter` 和 `Stream` 的基本概念有一点了解。如果你尚未完整阅读过 API 文档，那么最好是先看一下相关 API 说明，它也会有助于你扩展理解本文的主旨。

## 处理数据中遇到的问题

我们使用 `.pipe()` 从一个数据源终端到另外一个终端，不过没有使用任何出错处理机制。如果一大堆数据出错了但是又要被接收， `ReadStream` 和 `gzip` 流不会被销毁。

pump（pump 是一个工具类，如果有某个流发生错误或者关闭，它会自动销毁相关所有的流）对于 Node.js 8.x 以及先前版本是必须的。但对于 10.x 和之后的版本而言，我们引入了 `pipeline` 来取而代之。这是一个模块化函数，用于对接不同的数据流，可以处理异常错误并善后清理释放资源。它同时也提供了一个回调函数——当整个 `pipeline` 任务完成时将触发。

这里给出一个例子，告诉你如何使用 `pipeline`：

```js
const { pipeline } = require("stream");
const fs = require("fs");
const zlib = require("zlib");

// Use the pipeline API to easily pipe a series of streams
// together and get notified when the pipeline is fully done.
// A pipeline to gzip a potentially huge video file efficiently:

pipeline(
  fs.createReadStream("The.Matrix.1080p.mkv"),
  zlib.createGzip(),
  fs.createWriteStream("The.Matrix.1080p.mkv.gz"),
  (err) => {
    if (err) {
      console.error("Pipeline failed", err);
    } else {
      console.log("Pipeline succeeded");
    }
  }
);

// async
const util = require("util");
const pipeline = util.promisify(stream.pipeline);

async function run() {
  try {
    await pipeline(
      fs.createReadStream("The.Matrix.1080p.mkv"),
      zlib.createGzip(),
      fs.createWriteStream("The.Matrix.1080p.mkv.gz")
    );
    console.log("Pipeline succeeded");
  } catch (err) {
    console.error("Pipeline failed", err);
  }
}
run().then();
```

## 数据太多，速度太快

有太多的例子证明有时 `Readable` 传输给 `Writable` 的速度远大于它接受和处理的速度！

如果发生了这种情况，消费者开始为后面的消费而将数据列队形式积压起来。写入队列的时间越来越长，也正因为如此，更多的数据不得不保存在内存中知道整个流程全部处理完毕。

写入磁盘的速度远比从磁盘读取数据慢得多，因此，当我们试图压缩一个文件并写入磁盘时，背压的问题也就出现了。因为写磁盘的速度不能跟上读磁盘的速度。

这就是为什么说背压机制很重要——如果背压机制不存在，进程将用完你全部的系统内存，从而对其它进程产生显著影响，它独占系统大量资源直到任务完成为止。

这最终导致一些问题：

- 明显使得其它进程处理变慢
- 太多繁重的垃圾回收
- 内存耗尽

没有合适的流来处理背压，同样的进程处理就会产生一个内存占用数量级的差异！

## 背压是怎么处理这些问题的？

我们有不同的函数将数据从一个进程传入另外一个进程。在 Node.js 中，有一个内置函数称为 `.pipe()`，同样地，你们也可以使用其它工具包。最终，在这个进程的基本层面上我们有二个互不相关的组件：数据的 source 和 consumer。

当 `.pipe()` 被源调用之后，它通知消费者有数据需要传输。管道函数为事件触发建立了合适的背压封装。

在 Node.js 中，源头是一个 `Readable` 的流，消费者是 `Writable` 流（它们两者可能通过 `Duplex` 或 `Transform` 进行交互）。

当背压被触发的一刹那，它可以被缩小到 `Writable` 的 `.write()` 函数的返回值。这是根据一些条件所决定的。

在数据缓存超出了 `highWaterMark` 或者写入的列队处于繁忙状态，`.write()` 会返回 `false`。

当 `false` 返回之后，背压系统介入了。它将暂停从任何发送数据的数据流中进入的 `Readable`。一旦数据流清空了，`'drain'` 事件将被触发，消耗进来的数据流。

一旦队列全部处理完毕，背压机制将允许允许数据再次发送。在使用中的内存空间将自我释放，同时准备接收下一次的批量数据。

这个有效的举措允许一大堆锁住的内存可以为 `.pipe()` 函数随时使用而并没有内存泄露、无限扩大的内存缓冲。同时垃圾回收器仅需要处理一处地方。

所以，背压既然如此重要，为什么还有理由说你没有听说过呢？显然答案很明显：Node.js 为你做了一切。

注意：对于大部分机器，存在着一个字节的大小用以决定一个缓存是否已经满了（不同机器此值有变化）。Node.js 将允许你设置你自己的 highWaterMark。但是通常来说，默认是设置为 16kb（16384，对于对象模型流而言是 16）。在某些实例中你或许想提高那个值，尽管去提高吧，但是也要小心使用！

## .pipe() 的生命周期

为了对背压有一个更好的理解，这里有一副 `Readable` 流正通过 `piped` 流入 `Writable` 流的整个生命周期图：

```js
                                                     +===================+
                         x-->  Piping functions   +-->   src.pipe(dest)  |
                         x     are set up during     |===================|
                         x     the .pipe method.     |  Event callbacks  |
  +===============+      x                           |-------------------|
  |   Your Data   |      x     They exist outside    | .on('close', cb)  |
  +=======+=======+      x     the data flow, but    | .on('data', cb)   |
          |              x     importantly attach    | .on('drain', cb)  |
          |              x     events, and their     | .on('unpipe', cb) |
+---------v---------+    x     respective callbacks. | .on('error', cb)  |
|  Readable Stream  +----+                           | .on('finish', cb) |
+-^-------^-------^-+    |                           | .on('end', cb)    |
  ^       |       ^      |                           +-------------------+
  |       |       |      |
  |       ^       |      |
  ^       ^       ^      |    +-------------------+         +=================+
  ^       |       ^      +---->  Writable Stream  +--------->  .write(chunk)  |
  |       |       |           +-------------------+         +=======+=========+
  |       |       |                                                 |
  |       ^       |                              +------------------v---------+
  ^       |       +-> if (!chunk)                |    Is this chunk too big?  |
  ^       |       |     emit .end();             |    Is the queue busy?      |
  |       |       +-> else                       +-------+----------------+---+
  |       ^       |     emit .write();                   |                |
  |       ^       ^                                   +--v---+        +---v---+
  |       |       ^-----------------------------------<  No  |        |  Yes  |
  ^       |                                           +------+        +---v---+
  ^       |                                                               |
  |       ^               emit .pause();          +=================+     |
  |       ^---------------^-----------------------+  return false;  <-----+---+
  |                                               +=================+         |
  |                                                                           |
  ^            when queue is empty     +============+                         |
  ^------------^-----------------------<  Buffering |                         |
               |                       |============|                         |
               +> emit .drain();       |  ^Buffer^  |                         |
               +> emit .resume();      +------------+                         |
                                       |  ^Buffer^  |                         |
                                       +------------+   add chunk to queue    |
                                       |            <---^---------------------<
                                       +============+
```

注意：如果你创建一些管道准备把一些流串联起来从而操纵数据，你应该实现 `Transform` 流。

在这种情况下，从 `Readable` 流中的输出进入 `Transform`，并且会被管道输送进入 `Writable`。

```js
Readable.pipe(Transformable).pipe(Writable);
```

背压将被自动应用，但是同时请注意输入和输出 `Transform` 的 `highWaterMark` 可以手动控制，并且会影响到背压系统。

## 实现用户自定义流须知

流的黄金法则是**总是接受背压**。作为最佳实践的构成是不矛盾的实践。只要你小心避免与内部背压支持冲突的行为，你可以确信你在遵循良好的实践。

1. 没有特殊要求下，绝对不要用 `.push()`
2. 在流返回 `false` 后不要调用 `.write()` 方法，而是等待 `'drain'`
3. 流在不同的 Node.js 版本和库中是有变化的，小心使用并进行相应的测试

### 对于可读流的规则

因为 Node.js 的功能，数据从 `Readable` 流到 `Writable` 流。但是正如我们在数据流传输过程中我们观察到，source 和 `Readable` 目标一样重要， `Readable` 流对于背压是如何处理的至关重要。

这两个过程相互依赖地进行有效沟通，如果 `Readable` 流在 `Writable` 流需要它停止发送数据的时候忽略了，那就会跟 `.write()` 的返回值不正确时一样，产生相应的问题。

所以，除了谨慎对待 `.write()` 方法的返回值，我们同样要小心在 `._read()` 方法中使用 `.push()` 方法的返回值。如果 `.push()` 方法返回一个 `false`，流就会停止从源读数据。否则，它就不会停止而继续读下去。

### 关于可写流的规则

重新调用 `.write()` 方法根据一些条件可能返回 `true` 或者 `false`。幸运地是，当我们构建属于自己的 `Writable` 流的时候，流状态机（stream state machine）会处理我们的回调，并且决定什么时候处理背压并且为我们简化数据流。

但是当我们需要直接使用 `Writable` 流时，我们必须考虑 `.write()` 方法返回的值，并且注意到以下一些情况：

- 如果写队列确实繁忙，`.write()` 方法将返回 `false`
- 如果数据块太大，`.write()` 方法将返回 `false`（限定通过 `highWaterMark` 决定）

## 总结

流经常作为一个模块用于 Node.js 中，对于内部的系统结构而言非常重要。对于开发者而言，可以通过 Node.js 扩展连接应答系统。

现在我们希望你有能力进行故障排除，记住了是如何为你的 `Writable` 和 `Readable` 流编写背压处理的。并且你还可以把这些知识分享给你的同事和朋友们。

在此之后请仔细阅读更多的有关 `Stream` 其它 API 函数，这样有助于当你在构建 Node.js 的应用程序之时更好地理解关于流的能力。

## 参考

- https://nodejs.org/en/docs/guides/backpressuring-in-streams/
- https://nodejs.org/zh-cn/docs/guides/backpressuring-in-streams/
