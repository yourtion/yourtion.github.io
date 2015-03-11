---
author: Yourtion
comments: true
date: 2011-07-03 03:55:47+00:00
excerpt: '最近在做学校思想道德与法律基础的网站，http://210.38.160.82/sxfl/，在本地的时候，首页的FLV视频是可以读取和播放的，但是上传到服务器之后就没有反应了···

  原来这是由于flv是Flash媒体播放器支持的视频格式，但部分服务器需要进行MIME 类型映射设置，才能支持.flv视频格式。否则，本地能够正常播放的.flv文件，一传到服务器上就无法显示。而WIN2003加强了IIS6的MIME验证，一切未注册扩展文件格式统统显示404错误。'
layout: post
slug: iis-flv-rmvb-streaming-solution
title: 设置IIS解决无法播放FLV、RMVB等流媒体文件
wordpress_id: 2207
categories:
- 服务器
tags:
- IIS
- Windows 2003
- 解决问题
---
{% include JB/setup %}

最近在做学校思想道德与法律基础的网站，http://210.38.160.82/sxfl/，在本地的时候，首页的FLV视频是可以读取和播放的，但是上传到服务器之后就没有反应了···

原来这是由于flv是Flash媒体播放器支持的视频格式，但部分服务器需要进行MIME 类型映射设置，才能支持.flv视频格式。否则，本地能够正常播放的.flv文件，一传到服务器上就无法显示。而WIN2003加强了IIS6的MIME验证，一切未注册扩展文件格式统统显示404错误。

MIME 类型映射设置的具体步骤是：
“开始” > “控制面板” > “管理工具” >“Internet 信息服务（IIS管理器）”，找到您的网站，右击 > “属性” > “HTTP头” > “MIME类型” > “新建”，在“扩展名”框内输入“.flv”，“MIME类型”框中输入“flv-application/octet-stream”，然后确定即可。

_“MIME类型”只是一个描述，并一定要输入“flv-application/octet-stream” _

RMVB等流媒体也是同个道理····
