---
layout: post
date: 2022-07-26 21:44:23 +0800
slug: nodejs-download-encrypted-m3u8
title: "Node.js 流式下载加密 m3u8 视频"
author: Yourtion
keywords: ["encrypted", "m3u8"]
description: "基于 Node.js 的 Streaming 方式，一次性下载解密并拼接保存成一个文件，方便后续处理。这里做一下笔记，也算是进一步熟悉 Node.js 中 Stream 的使用"
category: "Node.js"
tags: ["解决问题"]
---
{% include JB/setup %}

之前做一个下载工具，发现有些视频内容是 m3u8 的格式，而且视频是加密的，只有在网页上可以正常播放，下载下来播放会报错。

研究了一轮之后，这个视频还是比较简单的采用了 m3u8 ts 切片方式，同时切片采用默认的 aes-128 加密方式，key 值也是相对简单的明文传输。

这里不打算详细解析怎么拿到视频的密钥和 m3u8 列表，主要讲一下怎么把加密的 m3u8 ts 切片下载解密并保存成一个 ts 文件的过程。

最简单的方式自然就是把 m3u8 中的每个视频下载下来，然后逐个解密好后拼接成一个文件，但是这样过于复杂，而且也不优雅。

这里想到的是基于 Node.js 的 Streaming 方式，一次性下载解密并拼接保存成一个文件，方便后续处理。这里做一下笔记，也算是进一步熟悉 Node.js 中 Stream 的使用。

## 解析 m3u8

这里就使用给比较简单的脚本，对 m3u8 文件转换成一个切片列表。

```typescript
function parseM3u8(text: string) {
  const arr = text.split("\n");
  return arr.filter((item) => item.match(/\.ts$/));
}
```

## 解密视频

这里相对比较简单，直接使用 crypot 库，创建一个解密实例即可：`crypot.createDecipheriv("aes-128-cbc", key, "0000000000000000")`

其中注意解密信息这里是否需要有除了 key 之外的 iv 信息，这里的 iv 使用的是全零的（根据拿到的解密信息定）。

## Stream 下载与保存

这里直接使用了 axios 作为下载的库，使用`axios.get(url, { responseType: "stream" })`，创建一个流式下载的实例，后续可以通过 pipe 的方式进行解密和文件写入，关于 stream 流控制相关内容，可以查看[《Node.js Backpressuring（背压）》](https://blog.yourtion.com/nodejs-backpressuring.html)。

之后使用 `fs.createWriteStream` 创建一个写入流，就可以把下载并解密后的内容流式地到本地文件中，最后成为一个 ts 文件了。

这里需要注意的是，因为一个 m3u8 中有多个 ts 切片需要保存到一个文件，所以在每个切片下载完后，不能直接关闭写入流，否则后续的切片无法写入，这里在执行 pipe 操作时，就要添加 `{ end: false }` 的选项。

## 整合形成

最后就是把上面的流程整合在一起，形成一个闭环，就能一次下载把加密的 m3u8 下载成一个 ts 文件的过程了。

1. 使用 `crypot.createDecipheriv` 创建解密实例
2. 将 ts 切片的 url 变成 Readable 便于后续操作
3. 通过 `d.pipe(dec).pipe(w, { end: false });` 解密并保存到本地文件
4. 最后使用 `wstream.end` 结束文件写入并 resolve

```typescript
class VideoDownloader {
  private dir = path.resolve(__dirname, "../videos");

  private async getStream(url: string) {
    const res = await axios.get(url, { responseType: "stream" });
    return res.data as Readable;
  }

  private appendSteram(url: string, key: Buffer, w: WriteStream) {
    const dec = crypot.createDecipheriv("aes-128-cbc", key, "0000000000000000");
    return new Promise((resolve) => {
      this.getStream(url).then((d) => {
        d.pipe(dec).pipe(w, { end: false });
        d.on("end", () => setTimeout(resolve, 0));
      });
    });
  }

  async download(title: string, m3u8: srting, key: Buffer) {
    const list = parseM3u8(m3u8);
    const p = path.resolve(this.dir, `${title}.ts`);
    const wstream = fs.createWriteStream(p);
    for (const u of list) {
      await this.appendSteram(u, key, wstream);
    }
    await new Promise((resolve) => wstream.end(resolve));
  }
}
```
