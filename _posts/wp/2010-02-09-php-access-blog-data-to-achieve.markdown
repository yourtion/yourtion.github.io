---
author: Yourtion
comments: true
date: 2010-02-09 03:35:25+00:00
excerpt: PHP获取博客数据对于一个刚刚学习PHP语言的朋友来说，实现起来还是比较困难的。希望通过对本文的解读，大家能充分掌握这一知识。
layout: post
slug: php-access-blog-data-to-achieve
title: 实现PHP获取博客数据
wordpress_id: 493
categories:
- PHP
tags:
- PHP
- 博客内容
---
{% include JB/setup %}

来自：http://developer.51cto.com/art/200912/168947.htm

PHP在我们的实际应用中可以帮助我们实现许多功能，比如在网站的建设中，对于数据等的操作等。我们今天就向大家介绍有关PHP获取博客数据的相关方法。
解读PHP冒泡排序技巧
详细介绍PHP中文处理函数大集结
PHP5常用函数列表概览
PHP String函数总结介绍
PHP Math函数系列总结


目前很多的网站提供免费个人博客服务，如Google，新浪，网易等等，如何将免费的博客充分利用起来，需要我们在使用过程中不断总结和思考，对于 程序员来说，如何使用PHP获取Blogger博客RSS或Atom数据显得非常重要，在这里简单的跟大家介绍一下使用PHP获取blogger博客 RSS或Atom数据的基本方法，以PHP获取google的Blogger博客数据为实例，了解PHP获取RSS或Atom数据的基本原理，供参考。

PHP获取博客数据使用前提

有一个Google的Blogger免费空间。
获取免费空间的RSS或Atom地址http://shifen.blogspot.com/feeds/posts/default

PHP获取博客数据实例代码

`$blogUrl = 'http://shifen.blogspot.
com/feeds/posts/default';   
$atom = simplexml_load_file ( $blogUrl );   
$atom->registerXPathNamespace (
 'atom', 'http://www.w3.org/2005/Atom' );   
$title = $atom->title;   
$subtitle = $atom->subtitle;   
$blogFeeds = $atom->link [0] [href];   
$blogURL = $atom->link [2] [href];   
$blogNextURL = $atom->link [3] [href];   
$entrys = $atom->xpath ( '//atom:entry' );  
```


PHP获取博客数据代码分析

1，定义博客blogger地址，如：$blogUrl = 'http://shifen.blogspot.com/feeds/posts/default';

2，使用PHP内置simplexml_load_file函数将blogger的XML数据转化成对象。

simplexml_load_file相关知识(具体查看PHP手册)
说明：simplexml_load_file 将一个XML文档装载入一个对象中。
原型：simplexml_load_file ( filename [,class_name [,options [, ns [, is_prefix]]]] )

3，使用PHP内置registerXPathNamespace函数为下一次 XPath 查询创建命名空间语境。与前面simplexml_load_file函数组合，支持提供命名空间，Blogger的命名空间使用的是http://www.w3.org/2005/Atom，便于调用Blogger的RSS或Atom数据。

4，获取Blogger的RSS或Atom数据。

(1)获取Blogger博客空间标题，如：$atom->title，返回：十分愉快
(2)获取Blogger博客空间次标题，如：$atom->subtitle，返回：学学东西总是好的，能让你十分愉快！
(3)获取Blogger博客RSS地址，如：$atom->link [0] [href]，返回：http://shifen.blogspot.com/feeds/posts/default
(4)获取Blogger博客URL地址，如：$atom->link [2] [href]，返回：http://shifen.blogspot.com/
(5)获取Blogger博客RSS的下一页地址，如：$atom->link [3] [href]，返回：http://shifen.blogspot.com/feeds/posts/default?start-index=26&max-results;=25
(6)获取Blogger博客文章内容，如：$atom->xpath ( '//atom:entry' )，返回文章数组，默认最新发布的25篇文章。

上面PHP获取博客数据实例可知，PHP获取Blogger博客RSS或Atom数据使用simplexml_load_file和registerXPathNamespace两个内置函数即可轻松实现。
