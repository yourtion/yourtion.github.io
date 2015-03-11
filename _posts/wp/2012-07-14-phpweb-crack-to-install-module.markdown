---
author: Yourtion
comments: true
date: 2012-07-14 07:01:47+00:00
excerpt: 因为最近在用PHPWEB做一个站，但是原有的模版站里没有下载模块，在后台安装模块需要验证用户。不甘心，所以研究了一下PHPWEB的模块安装部分，发现验证部分是调用base\admin下面的post.php进行，所以想在这个文件动手脚。研究了一下，成功安装了下载模块。将经验与大家分享，希望大家用得上。
layout: post
slug: phpweb-crack-to-install-module
title: PHPWEB破解安装新模块
wordpress_id: 3689
categories:
- PHP
tags:
- PHPWEB
---
{% include JB/setup %}

因为最近在用PHPWEB做一个站，但是原有的模版站里没有下载模块，在后台安装模块需要验证用户。不甘心，所以研究了一下PHPWEB的模块安装部分，发现验证部分是调用base\admin下面的post.php进行，所以想在这个文件动手脚。研究了一下，成功安装了下载模块。将经验与大家分享，希望大家用得上。

[![]({{ IMAGE_PATH }}2012/07/phpweb-mokuai-560x481.jpg)]({{ IMAGE_PATH }}2012/07/phpweb-mokuai.jpg)

首先解密post.php文件并进行修改，下面是我修改好的post.php

[https://gist.github.com/yourtion/58327041cd0a549c193b](https://gist.github.com/yourtion/58327041cd0a549c193b)

然后去有这个模块的站点拷贝这个模块的文件夹，我的是下载模块，就是那个down的，最后去后台安装这个模块，随便输个用户名和密码，稍后就会提示安装模块成功，在后台也可以看到这个模块。

但是你点击进入的话会提示你没有权限操作、


[![]({{ IMAGE_PATH }}2012/07/phpweb-down-no-560x217.jpg)]({{ IMAGE_PATH }}2012/07/phpweb-down-no.jpg)


这是因为在原有模版站里没有对这个模块的授权，使用phpMyAdmin进入网站数据库，在_base_adminrights里面添加这个模块的相应权限，下载模块是160到165，如下图，这样，整个模块就安装完成了！


[![]({{ IMAGE_PATH }}2012/07/phpweb-down-sql.jpg)]({{ IMAGE_PATH }}2012/07/phpweb-down-sql.jpg)


接下来我会整理一些模块和相关的权限信息，希望能给大家以帮助！
