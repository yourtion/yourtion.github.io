---
author: Yourtion
comments: true
date: 2010-06-24 03:27:41+00:00
excerpt: HTML 5的链接预取功能(link prefetching)是一个埋在沙里的宝石，至今还很少人知道它的价值。你可能已经知道了那古老而又闻名的图片预加载功能，链接预取功能就是将此概念由图片扩展到了网页内容（不需要任何AJAX代码）。
layout: post
slug: html-5-link-prefetching
title: 为网站提速—HTML 5链接预取功能
wordpress_id: 1238
categories:
- HTML
tags:
- HTML
---
{% include JB/setup %}

HTML 5的链接预取功能(link prefetching)是一个埋在沙里的宝石，至今还很少人知道它的价值。你可能已经知道了那古老而又闻名的图片预加载功能，链接预取功能就是将此概念由图片扩展到了网页内容（不需要任何AJAX代码）。

它是这样工作的，在页面上添加一个像这样的链接：


<blockquote><link rel="next" href="page2.html"></blockquote>


这样，当你的机器空闲时，浏览器就会自动的在后台把page2.html下载下来。 当用户最终点击了page2.html的链接时，浏览器会从缓存里把这个页面取出来，所以这个页面的加载速度会出乎意料的快。

目前只有火狐浏览器支持这个功能。但是因为火狐目前是世界上拥有第二大用户群的浏览器，所以只要你在HTML页面了加上这样的一句代码，仍有相当大的一部分访问者能体验到这十分明显的页面加载速度的提高。你可以在许多情况下可以使用链接预取功能：

◆当你有一篇篇幅很长的文章，或在线教程，或图册等，需要分成多页显示时。

◆在你的网站首页预加载那些用户最可能访问的下一页。(可能是一个商品网站上“重点推荐”商品页面，或博客网站上最近的一篇博客)

◆搜索查询页面预加载搜索出来的前几条。

对于静态的内容你还可以使用rel标记实现预取功能：


<blockquote><link rel="prefetch" href="/images/big.jpeg"></blockquote>


这里还有其它一些有趣的事需要注意：

◆链接预取功能不久将会在Opera, Chrome 和 Safari 浏览器里实现，但对于Internet Explorer，你估计要等到2020年。

◆如果这种功能被广泛的使用，它会影响你的网站日志和访问统计。请考虑这样的情况，你的一个页面预存取了好几个页面，可用户实际上没有访问到这几个页面。 你的服务器（或统计工具）并不知道这两者之间的区别。

为了分清这个，Firefox会在HTTP头信息里发送X-moz: prefetch信息，但你需要在服务器端有什么东西能识别这种信息。

原文地址：http://www.aqee.net/2010/06/08/how-html-5-link-prefetching-can-make-your-site-load-faster-with-one-line-of-code/
