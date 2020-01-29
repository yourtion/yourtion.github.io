---
author: Yourtion
comments: true
date: 2012-03-18 03:16:49+00:00
excerpt: 最近在研究手机APP的开发，因为一开始百度地图没有使用异步加载，而且感觉百度地图在手机显示上效果不佳，所以想使用阿里云地图来替代百度地图，因为数据库和后端数据接口是根据百度地图获取的坐标存储，直接调用百度的坐标数据后发现两者的坐标存在很大的差异，所以做了一个页面用来计算两者的差异，算是玩一下吧，大家有兴趣可以看看。
layout: post
slug: baidu-maps-ali-cloud-map-geographic-coordinates-difference
title: 百度地图与阿里云地图地理坐标差异
wordpress_id: 3617
category: "HTML"
tags: ["百度地图"]
---
{% include JB/setup %}

最近在研究手机APP的开发，因为一开始百度地图没有使用异步加载，而且感觉百度地图在手机显示上效果不佳，所以想使用阿里云地图来替代百度地图，因为数据库和后端数据接口是根据百度地图获取的坐标存储，直接调用百度的坐标数据后发现两者的坐标存在很大的差异，所以做了一个页面用来计算两者的差异，算是玩一下吧，大家有兴趣可以看看。

使用方法：

访问：[http://demo.yourtion.com/alimap-baidumap-lonlat.html](http://demo.yourtion.com/alimap-baidumap-lonlat.html)

在左边阿里云地图点击选择一个地点坐标，然后在右边百度地图点选与阿里云地图相同地点，最后点击计算差值。

[![]({{ IMAGE_PATH }}2012/03/alimap-baidumap-lonlat-560x395.jpg)]({{ IMAGE_PATH }}2012/03/alimap-baidumap-lonlat.jpg)
