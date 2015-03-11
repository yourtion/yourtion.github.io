---
author: Yourtion
comments: true
date: 2011-10-03 12:09:55+00:00
excerpt: 一直想知道怎么对自己的站做好同步备份，一开始想用Cpanel的，但是看了很多教程，觉得很麻烦，然后今天看到wget，GNU wget是linux下的非交互式网络文件下载工具。
layout: post
slug: remote-ftp-mirror-backup
title: 使用wget和cron job进行远程ftp镜像备份
wordpress_id: 2576
categories:
- 服务器
tags:
- FTP
- Linux
---
{% include JB/setup %}

一直想知道怎么对自己的站做好同步备份，一开始想用Cpanel的，但是看了很多教程，觉得很麻烦，然后今天看到wget，GNU wget是linux下的非交互式网络文件下载工具。平时使用的时候都只是简单的用来 wget -c 下载一些文件，今天才发现可以用它来直接对整个ftp站点做镜像。方法如下：

直接使用命令

```bash
wget -o ~/mirror.log -m -nH -b -P ~/mirror/ ftp://username:password@IPAddress/*
```

* ```-o``` 便是输出的log文件名
* ```-m``` 表示对ftp做镜像
* ```-nH``` 表示不生成远程主机的目录
* ```-b``` 程序将在后台执行
* ```-P``` 后面输入镜像存放的位置

一般做镜像还需使用```crontab```来自动完成镜像的同步。

只需修改crontab文件即可，文件加入以下语句：

```bash
0 0 0 * * 0 wget -o ~/mirror.log -m -nH -b -P ~/mirror/ ftp://username:password@IPAddress/*
```

表示在每个星期天来完成镜像的同步工作。 前面一串数字的意义为：（直接写*表任意匹配）

```bash
*    *    *    *     *  command to be executed
-    -     -    -     -
|     |     |     |     |
|     |     |     |     +----- day of week (0 - 6) (Sunday=0)
|     |     |     +------- month (1 - 12)
|     |     +--------- day of month (1 - 31)
|     +----------- hour (0 - 23)
+------------- min (0 - 59
```


（使用 ```-L``` 和 ```-np``` 选项可以保证只对当前目录下做镜像）
