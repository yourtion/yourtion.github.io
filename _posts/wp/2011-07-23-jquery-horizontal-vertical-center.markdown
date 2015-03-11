---
author: Yourtion
comments: true
date: 2011-07-23 13:13:59+00:00
excerpt: 最近在做一个红酒相关的网站，因为对设计要求比较高，所以做了一个图片感比较强的网站，但是发现在大分辨率，特别是4:3的时候很奇怪，所以想让网页水平垂直都居中，就是让一个div实现水平和垂直居中，虽然好几种方式实现，但是今天介绍时我最喜欢的方法，通过css和jQuery实现。
layout: post
slug: jquery-horizontal-vertical-center
title: 使用jQuery创建水平和垂直居中的网站
wordpress_id: 2326
categories:
- CSS+DIV
tags:
- jQuery
- 解决问题
---
{% include JB/setup %}

最近在做一个红酒相关的网站，因为对设计要求比较高，所以做了一个图片感比较强的网站，但是发现在大分辨率，特别是4:3的时候很奇怪，所以想让网页水平垂直都居中，就是让一个div实现水平和垂直居中，虽然好几种方式实现，但是今天介绍时我最喜欢的方法，通过css和jQuery实现。

### 1、通过css实现水平居中：

```css
.className
{
	margin:0 auto;
	width:200px;
	height:200px;
}
```

### 2、通过css实现水平居中和垂直居中

通过css创建一个水平居中和垂直居中的div是一件比较麻烦的事情，您必须事先知道另外一个div的尺寸：

```css
.className{
	width:300px;
	height:200px;
	position:absolute;
	left:50%;
	top:50%;
	margin:-100px 0 0 -150px;
}
```

### 3、通过jQuery实现


水平居中和垂直居中前面已经提到过了，css的方法只适用于有固定尺寸的div，所以到jQuery发挥作用了：

```javascript
$(window).resize(function(){
	$('.className').css({
		position:'absolute',
		left: ($(window).width() - $('.className').outerWidth())/2,
		top: ($(window).height() - $('.className').outerHeight())/2
	});
});
//初始化函数
$(window).resize();
```

