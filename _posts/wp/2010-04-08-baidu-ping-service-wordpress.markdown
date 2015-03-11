---
author: Yourtion
comments: true
date: 2010-04-08 04:00:34+00:00
excerpt: 更新网站，然后等待搜索引擎来收录，这种被动式的方法现在已经过时了。现在很多博客系统都加入了Ping 服务功能，所谓Ping 服务也叫更新服务，是一种让别人知道你的博客有更新的工具。在你每次创建或者更新博客时通过XML-RPC ping会让WP自动的通知给一些流行的更新服务商（如Technorati，Sphere，rssfeeds这些内容聚合网站）。相应的更新服务商会处理ping并更新他们的索引。这样别人再浏览更新服务商网站时便能看到你的博客更新。
layout: post
slug: baidu-ping-service-wordpress
title: Wordpress的Ping服务（加快百度收录的百度Ping）
wordpress_id: 1004
categories:
- WordPress技术
tags:
- SEO
- WordPress
---
{% include JB/setup %}

更新网站，然后等待搜索引擎来收录，这种被动式的方法现在已经过时了。现在很多博客系统都加入了Ping 服务功能，所谓Ping

服务，实际上是一种更新通知服务，它可以将您的博客更新自动通知博客目录和搜索引擎，加快网站被搜索引擎收录的速度。ping服务对博客来说是件非常重要的工具，它可以在你发表文章后迅速通知搜索引擎，feed托管服务商和在线RSS阅读器更新。这对博客来说是相当不错的。

WordPress可以通过选项-撰写-更新服务来修改Ping清单，如下图所示：

![]({{ IMAGE_PATH }}2010/04/zrclip_002n11fd1050.png)

以下是我正在使用的Ping列表：


* http://ping.baidu.com/ping/RPC2
* http://rpc.pingomatic.com/
* http://blogsearch.google.com/ping/RPC2
* http://api.my.yahoo.com/RPC2
* http://api.my.yahoo.com/rss/ping
* http://ping.feedburner.com
* http://www.zhuaxia.com/rpc/server.php
* http://www.xianguo.com/xmlrpc/ping.php
* http://www.feedsky.com/api/RPC2
* http://blog.iask.com/RPC2
* http://ping.blog.qikoo.com/rpc2.php
* http://rpc.technorati.com/rpc/ping
* http://www.blogsdominicanos.com/ping/


但是要注意的是ping太多会影响你发表文章的速度，特别是像我们这些国外主机的，能省则省。
