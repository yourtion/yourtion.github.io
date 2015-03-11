---
author: Yourtion
comments: true
date: 2011-01-02 03:27:38+00:00
excerpt: 看到我博客的童鞋会发现我博客的图片会有一个阴影边框~这不是在上传前添加的效果，而是css实现的。
layout: post
slug: wordpress-image-border
title: 用CSS给wordpress图片添加立体边框
wordpress_id: 1710
categories:
- WordPress技术
tags:
- CSS
- WordPress
---
{% include JB/setup %}

看到我博客的童鞋会发现我博客的图片会有一个阴影边框~这不是在上传前添加的效果，而是css实现的。

怎么做？看下去就知道了~~~~

先在你博客主题的CSS中找到img和a img的样式，没有就自己建立，然后使用一下代码：

```css
img 
{
	padding:10px;
	border:1px solid #000;
	-moz-box-shadow:3px 3px 4px #000;
	-webkit-box-shadow:3px 3px 4px #000;
	box-shadow:3px 3px 4px #000;
	background:#fff;
	filter:progid:DXImageTransform.Microsoft.Shadow(Strength=4,Direction=135,Color='#000000');
}
a img
{
	padding:10px;
	border:1px solid #000;
	-moz-box-shadow:3px 3px 4px #000;
	-webkit-box-shadow:3px 3px 4px #000;
	box-shadow:3px 3px 4px #000;
	background:#fff;
	filter:progid:DXImageTransform.Microsoft.Shadow(Strength=4,Direction=135,Color='#000000');
}
```
这样就可以了，最后在你觉得没有必要边距那么大的地方应用以下样式，如：

```css
.attachment-post-thumbnail
{
	margin:2px;
	padding:0;
	border:0;
}
.avatar
{
	margin:0;
	padding:0;
	border:0;
}
```

大功告成~~~
