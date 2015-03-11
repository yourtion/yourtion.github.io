---
author: Yourtion
comments: true
date: 2012-01-11 04:04:07+00:00
excerpt: '做Web前端开发的童鞋们一定都知道PNG是一个相当不错的图片格式，但是这个好的格式却在IE6时代造成了麻烦，IE6会使透明的PNG的透明部分出现#DBEAED的色彩。透明不了。使得在FF下开发表现很好的界面换成IE浏览就惨不忍睹，又逼着换成GIF，而GIF的假透明在变换背景时造成毛边现象。'
layout: post
slug: fix-ie6-png-transparent
title: 修复IE6下PNG透明问题的官方解决方法
wordpress_id: 3545
categories:
- HTML
tags:
- IE6
---
{% include JB/setup %}

做Web前端开发的童鞋们一定都知道PNG是一个相当不错的图片格式，但是这个好的格式却在IE6时代造成了麻烦，IE6会使透明的PNG的透明部分出现#DBEAED的色彩。透明不了。使得在FF下开发表现很好的界面换成IE浏览就惨不忍睹，又逼着换成GIF，而GIF的假透明在变换背景时造成毛边现象。

最近在做一个有背景像素图的网页，为了让图像背景可以穿透，只能使用PNG-24。

找了一番，结果发现居然还有官方的解决方案。;)

核心代码如下：

```javascript
/* 
Correctly handle PNG transparency in Win IE 5.5 & 6. 
Copyright 2007 Ignia, LLC 
Based in part on code from from http://homepage.ntlworld.com/bobosola. 

Use in  with DEFER keyword wrapped in conditional comments: 

<script type="text/javascript" defer="true" src="pngfix.js"></script> 

*/ 

function fixPng() { 
  var arVersion = navigator.appVersion.split("MSIE") 
  var version = parseFloat(arVersion[1]) 

  if ((version >= 5.5 && version < 7.0) && (document.body.filters)) { 
    for(var i=0; i<document.images.length;></document.images.length;>      var img = document.images[i]; 
      var imgName = img.src.toUpperCase(); 
      if (imgName.indexOf(".PNG") > 0) { 
        var width = img.width; 
        var height = img.height; 
        var sizingMethod = (img.className.toLowerCase().indexOf("scale") >= 0)? "scale" : "image"; 
        img.runtimeStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + img.src.replace('%23', '%2523').replace("'", "%27") + "', sizingMethod='" + sizingMethod + "')"; 
        img.src="images/blank.gif" mce_src="images/blank.gif"; 
        img.width = width; 
        img.height = height; 
        } 
      } 
    } 
  } 

fixPng();
```

使用方法就是把下面压缩包的js和images拷贝到你网站的目录，然后引用```MSIE.PNG.js```，就是这么简单。

下载地址：[msiepng.rar)](http://dl.dbank.com/c0yqm9kbbc)
