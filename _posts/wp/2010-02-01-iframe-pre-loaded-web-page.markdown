---
author: Yourtion
comments: true
date: 2010-02-01 07:30:29+00:00
excerpt: '接下来介绍这篇文章的重头戏，网站首页预载加速技巧 ！

  就是依照上面的方法在当前页面对即将进入的进行预读，例如在片头Flash加载完成后加载主页的iframe，这样用户一点击跳过片头就马上看到主页，而且利用的是用户看进入页面的时间进行加载'
layout: post
slug: iframe-pre-loaded-web-page
title: IFRAME内嵌和预载网页
wordpress_id: 352
categories:
- HTML
tags:
- iframe
---
{% include JB/setup %}

iframe元素的功能是在一个文档里内嵌一个文档，创建一个浮动的帧。其部分属性简介如下：

name：内嵌帧名称

width：内嵌帧宽度(可用像素值或百分比)

height：内嵌帧高度(可用像素值或百分比)

frameborder：内嵌帧边框

marginwidth：帧内文本的左右页边距

marginheight：帧内文本的上下页边距

scrolling：是否出现滚动条(“auto”为自动，“yes”为显示，“no”为不显示)

src：内嵌入文件的地址

style：内嵌文档的样式(如设置文档背景等)

allowtransparency：是否允许透明

明白了以上属性后，我们可用以下代码实现，在main.htm中把samper.htm文件的内容显示在一个高度为80、宽度为100%、自动显示边框的内嵌帧中：

〈iframe name="import_frame" width=100%

height=80 src="samper.htm" frameborder=auto〉

〈/iframe〉

不错吧，马上“Ctrl+C”、“Ctrl+V”试试。

有时我们为强调页面的某项内容，想让它先于页面的其他内容显示。同样用iframe即可轻松实现：

先把要强调显示的内容另存为一个文件，如first.htm，然后通过一个预载页index.htm，内容如下：

〈meta http-equiv="refresh" content="3,url=index2.htm"〉

〈body〉

页面加载中，请稍候……〈iframe src="first.htm" style="display:none"〉〈/iframe〉

〈/body〉

主文件index2.htm

〈body〉

〈iframe src="first.htm"加入其他属性限制〉〈/iframe〉

〈/body〉

first.htm的内容就会先于页面的其他内容出现在您的浏览器里了，是不是很简单？再“Ctrl+C”、“Ctrl+V”一次？


## 接下来介绍这篇文章的重头戏，网站首页预载加速技巧 ！


就是依照上面的方法在当前页面对即将进入的进行预读，例如在片头Flash加载完成后加载主页的iframe，这样用户一点击跳过片头就马上看到主页，而且利用的是用户看进入页面的时间进行加载
