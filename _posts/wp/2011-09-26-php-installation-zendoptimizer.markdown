---
author: Yourtion
comments: true
date: 2011-09-26 14:52:11+00:00
excerpt: Zend Optimizer(以下简称ZO)用优化代码的方法来提高PHP应用程序的执行速度。实现的原理是对那些在被最终执行之前由运行编译器(Run-Time
  Compiler)产生的代码进行优化。
layout: post
slug: php-installation-zendoptimizer
title: PHP安装ZendOptimizer
wordpress_id: 2570
categories:
- 服务器
tags:
- PHP
---
{% include JB/setup %}

Zend Optimizer(以下简称ZO)用优化代码的方法来提高PHP应用程序的执行速度。实现的原理是对那些在被最终执行之前由运行编译器(Run-Time Compiler)产生的代码进行优化。

优化能提高你的盈利能力

一般情况下，执行使用ZO的PHP程序比不使用的要快40%到100%。这意味着网站的访问者可以更快的浏览网页，从而完成更多的事务，创造更好的客户满意度。更快的反应同时也意味着可以节省硬件投资，并增强网站所提供的服务。所以，使用ZO，就等于提高了电子商务的盈利能力。

ZO能给PHP用户带来很多益处，特别是那些运营网站的人。快速运行PHP程序可以显著降低服务器的CPU负载，并可以减少一半的反应时间，也就是从访问者点击链接到服务器开始读取页面之间的时间。

系统需求

当前版本的ZO(Beta 4)只能运行在PHP下。

对操作系统的要求如下：
- 基于glibc2.1的x86 Linux系统（Red Hat 6.1, Mandrake 7.0, Slackware 7.0及SuSE 6.1）
- 基于glibc2的x86 Linux系统（Red Hat 5.2, SuSE 6.1）
- 基于libc5的x86 Linux系统（Slackware 4.0, Debian 1.3.1r8）
- Sparc Solaris 2.6, 7和8
- FreeBSD 3.4和4.0
- Windows NT 4.0（不包括其它版本的Windows）

对PHP的要求如下：
- 同时支持CGI方式和Apache模块方式
- 在Windows下，PHP必须：1)是从http://www.php.net上下载的现成的WIN32执行版本；2)自己编译时带"Release_Ts"(Release Thread Safe)选项的。

安装过程

-UNIX
1 编译PHP，不要加调试选项-否则ZO不会工作：在配置是加上--disable-debug选项
2 复制ZendOptimizer.so文件到你的机器，通常放在：/usr/local/Zend/lib下
3 在php.ini文件中加入如下两行，不要包含任何空格：
zend_optimizer.optimization_level=7
zend_extension="/usr/local/Zend/lib/ZendOptimizer.so"
4 重新启动Apache服务器

-WINDOWS
1 从http://www.php.net下载WINDOWS版的PHP 4.0.0，这个版本不包含调试特性。
2 复制ZendOptimizer.dll文件到你的机器，通常放在：C:\Program Files\Zend\lib下
3 在php.ini文件中加入如下两行，不要包含任何空格：
zend_optimizer.optimization_level=7
zend_extension_ts="C:\Program Files\Zend\lib\ZendOptimizer.dll"
4 如果需要的话，重新启动WEB服务器
