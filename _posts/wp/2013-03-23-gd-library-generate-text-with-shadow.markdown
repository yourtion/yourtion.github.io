---
author: Yourtion
comments: true
date: 2013-03-23 02:15:39+00:00
excerpt: 最近使用GD库来进行微信公共账号的图片生成，研究了一下GD库文字阴影效果的生成同时也发现了GD库的强大。详细解释：imagettftext (image,size,angle,
  x, y,color,fontfile,text)的用法
layout: post
slug: gd-library-generate-text-with-shadow
title: GD库生成文字并添加文字阴影
wordpress_id: 3745
categories:
- PHP
tags:
- GD
- PHP
---
{% include JB/setup %}

最近使用GD库来进行微信公共账号的图片生成，研究了一下GD库文字阴影效果的生成同时也发现了GD库的强大。

> GD库，是php处理图形的扩展库，GD库提供了一系列用来处理图片的API，使用GD库可以处理图片，或者生成图片。 在网站上GD库通常用来生成缩略图，或者用来对图片加水印，或者用来生成汉字验证码，或者对网站数据生成报表等。

GD库的安装什么的网上都有，现在很多虚拟空间也都支持，这里就不再赘述。下面通过我实际应用代码的实例和相关的注释为大家介绍一下GD库的使用方法。

原图：

[![原图]({{ IMAGE_PATH }}2013/03/3.jpg)]({{ IMAGE_PATH }}2013/03/3.jpg)


生成效果图：

[![效果图]({{ IMAGE_PATH }}2013/03/get_pic.jpg)]({{ IMAGE_PATH }}2013/03/get_pic.jpg)

代码如下：

```php
$str="北京";
$str2= "空气质量：轻度污染";
// 通过图片生成一个对象$im
$im = imagecreatefromjpeg("images/3.jpg");
//载入字体zt.ttf
$fnt = "zt.ttf";
//创建颜色，用于文字字体的白和阴影的黑
$white=imagecolorallocate($im,222,229,207);
$black=imagecolorallocate($im,50,50,50);
//创建关于相对图片位置的函数，方便调用
$top=100;
$left=60;
$top2=170;
//在图片中添加文字，imagettftext (image,size,angle, x, y,color,fontfile,text)
imagettftext($im,41, 0, $left+1, $top+1, $black, $fnt, $str);
imagettftext($im,41, 0, $left, $top, $white, $fnt, $str);
imagettftext($im,43, 0, $left+1,$top2+1 , $black, $fnt, $str2);
imagettftext($im,43, 0, $left,$top2, $white, $fnt, $str2);
//将$im输出
ImageJpeg($im);
//销毁$im对象
ImageDestroy($im);
```

接下来详细解释一下：

```php
imagettftext (image,size,angle, x, y,color,fontfile,text)
```

```imagettftext()``` 是将字符串 ```text```画到 ```image```所代表的图像上，从坐标 ```x```,```y```（左上角为 0, 0）开始，角度为 ```angle```，颜色为 ```color```，使用 ```fontfile``` 所指定的 ```TrueType``` 字体文件。

由 ```x```,```y``` 所表示的坐标定义了第一个字符的基本点大概在字符的左下角。

```angle``` 以角度表示，0 度为从左向右阅读文本，更高的值表示逆时针方向（即如果值为 90 则表示从下向上阅读文本）。

```fontfile``` 是想要使用的 ```TrueType``` 字体的文件名。

```text``` 是文本字符串，可以包含 ```UTF-8``` 字符序列。

```color``` 是颜色的索引值。
