---
author: Yourtion
comments: true
date: 2010-12-11 02:00:56+00:00
excerpt: 有访客说介绍一个字符截断的插件，找了一下~发现很多插件都是调用< ?php the_excerpt(); ?>输出~要专门跑去改模版，太麻烦了
layout: post
slug: wordpress-automatically-cut-off
title: WordPress自动截断--可按字符截断
wordpress_id: 1625
categories:
- WordPress插件
tags:
- WordPress
- 插件
---
{% include JB/setup %}

有访客说介绍一个字符截断的插件，找了一下~发现很多插件都是调用```<?php the_excerpt(); ?>```输出~要专门跑去改模版，太麻烦了

找到一个```WP Limit Posts Automatically```，它可以支持按单词（英文，如sofish只认为是一个单词）输入、按字数（中文用户或许应该选择这个，方便控制）、只输出第一段，相当强大。但是没有更新了。有兴趣可以试试。

官方链接：[http://www.jenst.se/2007/12/03/wp-limit-posts-automatically](http://www.jenst.se/2007/12/03/wp-limit-posts-automatically)

最后还是看中```WP Kit CN，3.0```可以使用。
这款插件的目标就是：让不懂PHP，不懂HTML的您，可以使用几乎全部的功能！

功能描述：
	
  1. 最新评论输出
  2. 最新文章输出
  3. N天内留言最多用户输出
  4. 本周或本月内留言最多用户输出
  5. 随机文章输出
  6. 评论最多的文章输出
  7. 最近回响输出
  8. 自动摘要算法，更加适合中文使用

特性描述：
	
  1. 丰富的Widget支持，几乎每个功能，都有对应的边栏Widget，轻松调用
  2. 标准模板标签，为主题作者准备，标准的WordPress模板标签调用方式
  3. 后台管理面板，支持参数设定
  4. WP Kit CN插件官方主页&下载：[http://wordpress.org/extend/plugins/wp-kit-cn/](http://wordpress.org/extend/plugins/wp-kit-cn/)


