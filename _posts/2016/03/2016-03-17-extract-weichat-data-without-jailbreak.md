---
layout: post
date: 2016-03-17 13:06:37 +08:00
slug: extract-weichat-data-without-jailbreak
title: "不越狱导出iPhone微信数据教程"
author: Yourtion
keywords: ["wechat","extract weichat","extract iTunes backup"]
description: "不越狱导出iPhone微信数据"
category: "Mac"
tags: ["解决问题"]
---
{% include JB/setup %}

最近打算研究微信群聊的数据，想从 iPhone 上导出微信的数据，然后可以直接拿到微信的数据库，因为 iOS 上微信的数据库没有加密。这也就省去了研究怎么解密的烦恼。

如果 iPhone 已经越狱（越狱了你就有各种工具破除沙盒限制）或者你是使用 Windows 那么操作就相对简单（我记得 Windows 上有现成的导出工具）。

但是我不想因为这件事去把 iPhone 越狱，也懒得去折腾 Windows（你懂的）。最后找到了在 Mac 上从 iTunes 备份中提取微信数据（不止是微信，其他 APP 也可以）的方法，下面一步步跟我来操作。

## 备份数据

把手机连接上电脑并打开 iTunes，找到手机的选项卡，如下图：

[![]({{ IMAGE_PATH }}2016/03/backup0.png)]({{ IMAGE_PATH }}2016/03/backup0.png)

在 Backups 栏中，去掉 “Encrypt iPhone backup” 的勾选，千万不能加密备份，否则你拿到的数据所有文件都是 iTunes 加密过的，没办法正常打开；

[![]({{ IMAGE_PATH }}2016/03/backup1.png)]({{ IMAGE_PATH }}2016/03/backup1.png)

点击 ”Back Up Now“ 把你的 iPhone 备份到你的 Mac 上，再次确认 ”Don't Encrypt“；

[![]({{ IMAGE_PATH }}2016/03/backup2.png)]({{ IMAGE_PATH }}2016/03/backup2.png)

等待 iPhone 备份完成（漫长的等待，64G也有不好的地方），你可以看到 ”Latest Backups” 里面已经有今天的备份在你的电脑上了。

[![]({{ IMAGE_PATH }}2016/03/backup3.png)]({{ IMAGE_PATH }}2016/03/backup3.png)

## 提取数据

经过上面的备份步骤，你的 Mac 上已经有一份 iPhone 数据的存档，接下来就是在备份中导出需要的数据。

你可以手工去 iTunes 的备份目录找文件，解析 plist 等，也有相关的教程（请自行Google），但是我觉得太麻烦了，还是找个工具好了。

这时候祭出神器 ”iPhone / iPod Touch Backup Extractor“ 下载地址：[http://supercrazyawesome.com/](http://supercrazyawesome.com/)，这只是众多提取工具中的一个，用它的主要原因是简单、免费、功能单一。

打开软件后选择 ”Read Backups“

[![]({{ IMAGE_PATH }}2016/03/extract1.png)]({{ IMAGE_PATH }}2016/03/extract1.png)

找到你手机最新的备份（我只有一个就不需要找了）

[![]({{ IMAGE_PATH }}2016/03/extract2.png)]({{ IMAGE_PATH }}2016/03/extract2.png)

打开后就能看的你手机中安装的 APP 的数据备份列表，我们要找的微信的 ”Application Name“ 是 `com.tencent.xin`，其他的 APP 的名字也基本可以猜出来，这个可以自己把玩。

选择后点击 ”Extract“，选择导出到你本地的慢慢来就 OK 了。

[![]({{ IMAGE_PATH }}2016/03/extract3.png)]({{ IMAGE_PATH }}2016/03/extract3.png)

导出完成后目录会自己打开（如下图），熟悉 iOS 开发的朋友就发现了，这两个文件夹就是 APP 的沙盒中的内容。

[![]({{ IMAGE_PATH }}2016/03/extract4.png)]({{ IMAGE_PATH }}2016/03/extract4.png)

数据导出来了，接下来就是怎么样用，怎么分析了。

欲知后事如何，请听下回分解。
