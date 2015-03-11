---
author: Yourtion
comments: true
date: 2010-07-27 06:49:31+00:00
excerpt: 今天看到人家发给我的一个网站，说很好看。我发现是用ImageFlow做的效果。之前研究过一下下。遂决定将我的微博上的照片墙拿来改造。事实上ImageFlow很简单就是在它预定的DIV里面加入要调用图片的<img
  />标记即可。
layout: post
slug: pagecookery-photo-wall-reconstruction
title: PageCookery照片墙改造
wordpress_id: 1328
categories:
- PageCookery
tags:
- CSS
- PHP
---
{% include JB/setup %}

今天看到人家发给我的一个网站，说很好看。我发现是用ImageFlow做的效果。之前研究过一下下。遂决定将我的微博上的照片墙拿来改造。事实上ImageFlow很简单就是在它预定的DIV里面加入要调用图片的<img>标记即可。

效果：[http://t.yourtion.com/?act=photos](http://t.yourtion.com/?act=photos)



改造过程：

因为PageCookery调用Flick的相册后生成的<uk>和<li>标签，所以先从标签入手，

下载：[ImageFlow_1.3.0.zip](http://www.dbank.com/download.action?t=40&k=NDQ3NDAyNjE=&pcode=LCwxMjAzODksMTIwMzg5&rnd=4)

把下载回来的ImageFlow解压到你的微博下面的imageflow目录。

然后把template下的photos.html中的


<blockquote><div id="main" style="padding: 0;">

<ul>

<!--{foreach ($recent_photos['items'] AS $photo)}-->

<li>

<div style="background: url({$photo['media']['m']}) no-repeat center center"title="{$photo['title']}"></div>

<a href="{$photo['link']}" target="_blank">{$photo['title']}</a>

</li>

<!--{/foreach}-->

</ul>

<div style="clear:left"></div>

</div></blockquote>


替换为：


<blockquote><div id="main" style="padding: 0;" >

<div id="myImageFlow" class="imageflow" >

<!--{foreach ($recent_photos['items'] AS $photo)}-->

<img src="{$photo['media']['m']}" longdesc="{$photo['link']}"  alt="{$photo['title']}">

<!--{/foreach}--> 

</div>

<div style="clear:left"></div>

</div></blockquote>


然后在前面加上


<blockquote><script type="text/javascript" src="imageflow/imageflow.packed.js"></script></blockquote>


最后在head.html中的<head>中加入


<blockquote><link rel="stylesheet" href="imageflow/imageflow.packed.css" type="text/css" /></blockquote>


这样就大功告成了，剩下的是一些微调的工作。

下面是我博客的head、photo还有imageflow文件的打包。希望对你有帮助，举一反三自己改造咯

我博客的文件打包：[ImageFlow.rar](http://www.dbank.com/download.action?t=40&k=NDQ3NDE1NTk=&pcode=LCwxMjAzODksMTIwMzg5&rnd=4)

更加详细的用法可以参看ImageFlow的官方文档：[http://finnrudolph.de/ImageFlow/Documentation](http://finnrudolph.de/ImageFlow/Documentation)
