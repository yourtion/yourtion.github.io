---
layout: post
date: 2021-02-24 11:25:45 +0800
slug: nodejs-eventloop
title: "Node.js事件循环详解"
author: Yourtion
keywords: ["nodejs", "eventloop"]
description: "EventLoop 运行 Node.js 去处理非阻塞 I/O 操作的机制，尽管 JavaScript 是单线程的（当有可能的时候，它们会把操作转移到系统内核中去）"
category: "学习"
tags: ["Node.js"]
img: 2021/02/nodejs-eventloop-1.jpg
---
{% include JB/setup %}

## Event Loop（事件循环）

EventLoop 运行 Node.js 去处理非阻塞 I/O 操作的机制，尽管 JavaScript 是单线程的（当有可能的时候，它们会把操作转移到系统内核中去）。

目前大多数内核都是多线程的，它们可在后台处理多种操作。当其中的一个操作完成的时候，内核通知 Node.js 将适合的回调函数添加到 `poll` 队列中等待时机执行。

当 Node.js 启动后，它会初始化事件循环，处理已提供的输入脚本（或 REPL），它可能会调用一些异步的 API、调度定时器，或者调用 `process.nextTick()`，然后开始处理事件循环。

```
事件循环操作顺序的简化概览

   ┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘
   
// 每个框被称为事件循环机制的一个阶段
```

每个阶段都有一个 FIFO 队列来执行回调。虽然每个阶段都是特殊的，但通常情况下，当事件循环进入该阶段时，它将执行该阶段的特定操作，然后执行该阶段队列中的回调，直到队列用尽或最大回调数已执行。当该队列已用尽或达到回调限制，事件循环将移动到下一阶段，然后继续下一循环。

由于这些操作中的任何一个都可能调度更多的操作和由内核入队并在 poll 阶段需要被处理的新事件，在处理轮询事件时，轮询队列可以继续入队。因此，轮询阶段允许运行长于计时器的阈值的长时间回调。（详见 timers 和 poll）。

Node 开始执行脚本时，会先进行事件循环的初始化，但是这时事件循环还没有开始，会先完成下面的事情：

- 同步任务
- 发出异步请求
- 规划定时器生效的时间
- 执行 `process.nextTick()` 等等

最后，上面这些事情都干完了，事件循环就正式开始了。事件循环会无限次地执行，一轮又一轮。只有异步任务的回调函数队列清空了，才会停止执行。

## 阶段概述

- timers（定时器）：本阶段执行已经被 `setTimeout()` 和 `setInterval()` 调度的回调函数
- pending callbacks（待定回调）：执行延迟到下一个循环迭代的 I/O 回调
- idle, prepare：仅系统内部使用
- poll（轮询）：检索新的 I/O 事件；执行与 I/O 相关的回调（除了 `close` 回调、`timers` 调度的回调和`setImmediate()` 外几乎所有回调）， node 将在适当的时候在此阻塞
- check（检测）：`setImmediate()` 回调函数在这里执行
- close callbacks（关闭的回调函数）：一些关闭的回调函数，如 `socket.on('close', ...)`

在每次运行的事件循环之间，Node.js 检查它是否在等待任何异步 I/O 或 timers，如果没有的话，则完全关闭。

## 阶段的详细概述

[![]({{ IMAGE_PATH }}2021/02/nodejs-eventloop-1.jpg)]({{ IMAGE_PATH }}2021/02/nodejs-eventloop-1.jpg)

### timerss（定时器）

timers 指定可以执行所提供回调的阈值（threshold），而不是用户希望其执行的确切时间。在指定的一段时间间隔后，计时器回调将被尽可能早地运行。但是，操作系统调度或其它正在运行的回调可能会延迟它们。

注意：技术上讲，poll 阶段控制了 timers 何时被执行

**为了防止 poll 阶段饿死事件循环，libuv 有一个硬性最大值（依赖于系统）以停止轮询获得更多事件。**

### pending callbacks（待定回调）

此阶段对某些系统操作（如 TCP 错误）执行回调。如：TCP 套接字在尝试连接时接收到 `ECONNREFUSED`，某些 *nix 的系统希望等待报告错误。这将被排队以在 pending callbacks 阶段执行。

除了以下操作的回调函数，其他的回调函数都在这个阶段执行。

- `setTimeout()` 和 `setInterval()` 的回调函数
- `setImmediate()` 的回调函数
- 用于关闭请求的回调函数，比如 `socket.on('close', () => {})`

### poll（轮询）

在 poll 阶段有两个主要功能：

1. 计算应该阻塞和轮询 I/O 的时间
2. 然后，处理 poll 队列里的事件

当事件循环进入 poll 阶段且没有 timers 需要被调度时，将发生以下两种情况之一：

- 如果 poll 队列不为空，事件循环将循环访问回调队列并同步执行它们，直到队列用尽，或者达到了系统的硬性限制
- 如果 poll 队列为空，还有两件事会发生：
    - 如果代码被 `setImmediate()` 调度，则事件循环将结束 poll 阶段，并进入 check 阶段以执行那些被调度的脚本
    - 如果代码未被 `setImmediate()` 调度，则事件循环将等待回调被添加到队列中，然后立即执行

**一旦 poll 队列为空，事件循环将检查“已达到时间阈值的计时器”。如果一个或多个计时器已准备就绪，则事件循环将绕回 timers 阶段以执行这些计时器的回调。**

### check（检测）

此阶段允许开发者在 poll 阶段完成后立即执行函数回调。如果 poll 阶段变为空闲状态，并且代码使用 `setImmediate()` 而被排列到队列中，则事件循环可能进入到 check 阶段而不是继续等待。

`setImmediate()` 实际上是一个在事件循环中单独阶段运行的特殊计时器。它使用一个 libuv 的 API 以安排回调在 poll 阶段完成后执行。

通常，在执行代码时，事件循环最终会进入 poll 阶段，在那等待传入连接、请求等。但是，如果回调代码使用 `setImmediate()` 调度过，并且 poll 阶段变为空闲状态，则它将结束此阶段，并继续到 check 阶段而不是继续等待轮询事件。

### close callbacks（关闭的回调函数）

如果套接字或处理函数突然关闭（如 `socket.destroy()`），则 `'close'` 事件将在这个阶段发出。否则它将通过 `process.nextTick()` 发出。

## process.nextTick()

因为 `process.nextTick()` 从技术上讲不是事件循环的一部分。相反，不管事件循环的在哪个阶段，它都将在当前操作完成后处理 `nextTickQueue`。这里，操作被定义为从底层C/C++处理器的转换，以及处理需要执行的JavaScript。

任何时候在给定的阶段中调用 `process.nextTick()`，所有传递到 `process.nextTick()` 的回调将在事件循环继续之前处理。这可能会造成一些糟糕的情况，**因为它允许您通过递归 `process.nextTick()` 调用来“饿死”您的 I/O**，因为这将阻止事件循环到达 poll 阶段。

为什么这样的事情会包含在 Node.js 中？它的一部分是一种设计理念，在这种理念下，**API应该始终是异步的，即使它不必是异步的**。

什么时候要使用 `process.nextTick()`？有两个主要原因：

1. 允许用户处理错误，清理任何不需要的资源，或者在事件循环继续之前重试请求
2. 有时有让回调在栈展开后，但在事件循环继续之前运行的必要。

Node 执行完所有同步任务，接下来就会执行 `process.nextTick` 的任务队列

## 本轮循环和次轮循环

异步任务可以分成两种：

- 追加在本轮循环的异步任务 `process.nextTick` 和 `Promise` 的回调函数，即同步任务一旦执行完成，就开始执行它们
- 追加在次轮循环的异步任务：`setTimeout`、`setInterval`、`setImmediate`的回调函数，追加在次轮循环

### setImmediate() 与 setTimeout()

`setImmediate()` 和 `setTimeout()` 很类似，但是针对被调用的时机，他们会有有不同表现。

- `setImmediate()` 设计为一旦在当前 poll 阶段完成，就执行脚本
- `setTimeout()` 在最小阈值（ms单位）过后运行脚本

执行计时器的顺序将根据调用它们的上下文而异。如果二者都从主模块内调用，则计时器将受进程性能的约束（这可能会受到计算机上其他正在运行应用程序的影响：进入事件循环以后，有可能到了1毫秒，也可能还没到1毫秒，取决于系统当时的状况。如果没到1毫秒，那么 timers 阶段就会跳过，进入 check 阶段，先执行 `setImmediate` 的回调函数，否则先执行 `setTimeout`）。

- 如果运行以下不在 I/O 周期（即主模块）内的脚本，则执行两个计时器的顺序是非确定性的，因为它受进程性能的约束
- 如果你把这两个函数放入一个 I/O 循环内调用，setImmediate 总是被优先调用

使用 `setImmediate()` 相对于 `setTimeout()` 的主要优势是，如果 `setImmediate()` 是在 I/O 周期内被调度的，那它将会在其中任何的定时器之前执行，跟这里存在多少个定时器无关。

### process.nextTick() 对比 setImmediate()

- `process.nextTick()` 在同一个阶段立即执行
- `setImmediate()` 在事件循环的接下来的迭代或 'tick' 上触发

**我们建议开发人员在所有情况下都使用 `setImmediate()`，因为它更容易理解**

### 微任务

根据语言规格，`Promise` 对象的回调函数，会进入异步任务里面的 "微任务"（microtask）队列。

微任务队列追加在 `process.nextTick` 队列的后面，也属于本轮循环。**只有前一个队列全部清空以后，才会执行下一个队列**。


## 参考

- https://nodejs.org/zh-cn/docs/guides/dont-block-the-event-loop/
- https://nodejs.org/en/docs/guides/dont-block-the-event-loop/
- http://www.ruanyifeng.com/blog/2018/02/node-event-loop.html