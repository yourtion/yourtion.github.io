---
author: Yourtion
comments: true
date: 2012-09-27 04:50:24+00:00
excerpt: 现在很多PHP程序都需要ZendOptimizer环境，但是ZendOptimizer在PHP5.2之后已经被支持，那怎么办，Zend也不会这么做，原来PHP5.3开始ZendOptimizer正式改为Zend
  Guard Loader。
layout: post
slug: php5-4-zendoptimizer
title: PHP5.3、PHP5.4安装ZendOptimizer
wordpress_id: 3723
categories:
- 服务器
tags:
- PHP
- Zend
---
{% include JB/setup %}

现在很多PHP程序都需要ZendOptimizer环境，但是ZendOptimizer在PHP5.2之后已经被支持，那怎么办，Zend也不会这么做，原来PHP5.3开始ZendOptimizer正式改为Zend Guard Loader。

Zend Guard Loader的发布，而且Zend Optimizer不会再更新，并且由于差异很大使用Zend Guard加密代码时将提示你是否使用php5.3，如果使用5.3那么代码就无法在php5.2上运行。

Zend Guard Loader安装说明
1。下载Zend Guard Loader包。(官方地址:[http://www.zend.com/en/products/guard/downloads](http://www.zend.com/en/products/guard/downloads))


<blockquote>Linux:
x86:http://downloads.zend.com/guard/5.5.0/ZendGuardLoader-php-5.3-linux-glibc23-i386.tar.gz
x64:http://downloads.zend.com/guard/5.5.0/ZendGuardLoader-php-5.3-linux-glibc23-x86_64.tar.gz

Windows:
http://downloads.zend.com/guard/5.5.0/ZendGuardLoader-php-5.3-Windows.zip</blockquote>


2. 并提取ZendGuardLoader.so（Linux）或ZendLoader.dll（Windows）上传到服务器。


<blockquote>3. 加载ZendGuardLoader,配置PHP.INI
例子:
zend_extension=C:\web\PHP\ext\ZendLoader.dll
zend_loader.enable=1
zend_loader.disable_licensing=0
zend_loader.obfuscation_level_support=3
zend_loader.license_path=</blockquote>


下面逐一说明：

**注意windows版的只支持NTS(非线程安全)版的PHP5.3,即phpinfo中Thread Safety为disabled的！**

在你的php.ini文件中添加以下行：


<blockquote>Linux和Mac OS X：zend_extension=<ZendGuardLoader.so的绝对路径>
Windows的非线程安全的：zend_extension=<ZendLoader.dll的绝对路径></blockquote>


4. 添加下面这行加载ZendGuardLoader:


<blockquote>;启用加载编码脚本。默认开启
zend_loader.enable=1</blockquote>


5. 可选：配置ZendGuardLoader


<blockquote>;禁用检查授权（出于性能原因）
zend_loader.disable_licensing=0
;配置混淆水平 0 - 不支持混淆
zend_loader.obfuscation_level_support=3
;配置寻找授权文件的路径
zend_loader.license_path=</blockquote>


6. 如果你同时使用Zend debugger,请保证加载Zend guard Loader后再加载Zend debugger

7. 如果你同时使用Ioncube loader,请保证加载Ioncube loader后再加载Zend guard Loader

8. 重启Web服务。

如果在phpinfo中看到如下内容（不同的版本可能会有所不同）：


<blockquote>This program makes use of the Zend Scripting Language Engine:Zend Engine v2.4.0, Copyright (c) 1998-2011 Zend Technologies</blockquote>


说明安装已经成功！
