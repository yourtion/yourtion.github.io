---
author: Yourtion
comments: true
date: 2013-08-13 01:40:43+00:00
excerpt: 最近因为迁移等问题需要对几台服务器进行备份，服务器跑的是UbuntuServer，研究了一下备份方法，找到一个最简单的，同样适用于其他Linux系统，共享之~
layout: post
slug: easiest-way-backup-linux
title: 备份UbuntuServer的最简单方法
wordpress_id: 3864
categories:
- 服务器
tags:
- Backup
- Linux
---
{% include JB/setup %}

最近因为迁移等问题需要对几台服务器进行备份，服务器跑的是```UbuntuServer```，研究了一下备份方法，找到一个最简单的，同样适用于其他Linux系统，共享之~

方法的原理也非常简单：将"/"目录下的所有文件打成一个压缩包，需要的是后再解压后覆盖回去。

备份：

先转到root用户权限

```bash
sudo su
```

然后进入“/”目录

```bash
cd /
```

执行备份

```bash
tar cvpzf backup.tgz --exclude=/proc --exclude=/lost+found --exclude=/backup.tgz --exclude=/mnt --exclude=/sys /
```

其中tar的cvpzf指的是：


* ```c``` - 创建一个新的备份文件
* ```v``` - 详细模式，将执行过程全部输出到屏幕
* ```p``` - 保留文件的权限信息以便恢复
* ```z``` - 使用gzip压缩文件，以便减小体积
* ```f <filename>``` - 指定备份文件的名称


这样执行后就会在“/”下面生成一个```backup.tgz```的备份文件，你就可以拷贝下来，以便恢复了。

恢复方法也非常简单：

```bash
tar xvpfz backup.tgz -C /
```

好了，就是这么简单。




