---
author: Yourtion
comments: true
date: 2011-01-08 14:59:07+00:00
excerpt: '使用Wordpress的过程中，您可能会遇到这样的错误提示：

  Fatal error: Allowed memory size of 33554432 bytes exhausted (tried to allocate
  xxx bytes)'
layout: post
slug: fix-error-allowed-memory-size
title: '修复Fatal error: Allowed memory size of 33554432 bytes exhausted (tried to allocate
  xxx bytes)'
wordpress_id: 1750
categories:
- WordPress技术
tags:
- WordPress
- 解决问题
---
{% include JB/setup %}

昨天服务器问题，重新安装了WP，结果在后台插件页面一进去就显示：


<blockquote>Fatal error: Allowed memory size of 33554432 bytes exhausted (tried to allocate xxx bytes)</blockquote>


研究一番发现，解决方法共享一下：

它是说，你正在进行的操作需要这么多的内存，但你现在服务器分配的内存不足。
正常情况下，服务器的内存当然是够的，只是你的配置文件需要修改。
解决这个问题，我们一般有两种方式：

1、修改WP配置文件。

这是最简单的方式，编辑wp-config.php这个文件，给他加上一句：


<blockquote>define(‘WP_MEMORY_LIMIT’, ’64M’);</blockquote>


其中64M可以写得更大，比如96M。

2、修改php.ini
到你的网站根目录下，建立一个php.ini文件，写入下面这句：


<blockquote>memory_limit = 64MB</blockquote>


然后再到网站根目录下修改.htaccess这个文件，写入下面这句：


<blockquote>SetEnv PHPRC /home/host1/public_html/usr1/
(unix path to the directory where php.ini is)
(keep the slashes)</blockquote>


一般情况下，使用第一种方法即可。
