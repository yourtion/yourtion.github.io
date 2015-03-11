---
author: Yourtion
comments: true
date: 2010-12-15 23:24:15+00:00
excerpt: 无聊之下想到为PageCookery创建一个SiteMap模块，让它生成网站的SiteMap。一开始打算用php直接读取数据库，但是发现这样很麻烦，然后突然想起RSS也是XML的，所以最后决定用RSS进行更改，生成SiteMap如下：
layout: post
slug: pagecookery-create-sitemap
title: PageCookery生成SiteMap
wordpress_id: 1656
categories:
- PageCookery
tags:
- PageCookery
- PHP
---
{% include JB/setup %}

无聊之下想到为PageCookery创建一个SiteMap模块，让它生成网站的SiteMap。

一开始打算用php直接读取数据库，但是发现这样很麻烦，然后突然想起RSS也是XML的，所以最后决定用RSS进行更改，生成SiteMap如下：

![]({{ IMAGE_PATH }}2010/12/sitemap.jpg)

发出来大家共享一下~举一反三。

我的微博的SiteMap：http://t.yourtion.com/sitemap.xml


### **下载地址：[PageCookery生成SiteMap](http://dl.dbank.com/c0osuoqdte)**


下载后放在PageCooker的根目录下，运行SiteMap.php就会在微博根目录生成一个SiteMap.xml

还没有实现实时生成，慢慢改进咯。
