---
author: Yourtion
comments: true
date: 2011-02-28 01:42:41+00:00
excerpt: 刚刚把启动了50多天的服务器重启了一下，结果发现xampp上的Apache显示Running但是网站均无法访问，端口监听也显示正常，研究了很久，发现error.log上面显示：
layout: post
slug: xampp-apache-unable-access-solutions
title: xampp Apache启动后localhost IP均无法访问站点解决方法
wordpress_id: 1941
categories:
- 服务器
tags:
- Apache
- xampp
- 解决问题
---
{% include JB/setup %}

刚刚把启动了50多天的服务器重启了一下，结果发现xampp上的Apache显示Running但是网站均无法访问，端口监听也显示正常，研究了很久，发现error.log上面显示：


>[error] (OS 10038)在一个非套接字上尝试了一个操作。  : winnt_accept: getsockname error on listening socket, is IPv6 available?

研究了很久，找到解决的方法，分享一下：

解决办法一：

可能是安装了某些程序修改了Winsock，使用```netsh winsock reset ```命令修复Winsock重启计算机即可!

解决办法二：

在```httpd.conf```文件中添加 ```Win32DisableAcceptEx``` 标记，如下：

```ini
<If Module mpm_winnt.c\>
ThreadsPerChild 1000
MaxRequestsPerChild 10000
Win32DisableAcceptEx
```

解决办法三：

1、```网上邻居```-;```本地连接```-;```属性```-;```internet协议(TCP/IP)```-;```属性```-;```高级```-;```wins标签```-;去掉启用```LMhosts```查询前的勾.

2、```控制面版```-;```windows防火墙```-;```高级标签```-;```本地连接设置```-;服务的标签里勾选```安全Web服务器(HTTPS)```。

3、然后重启```Apache```

然后就OK了
