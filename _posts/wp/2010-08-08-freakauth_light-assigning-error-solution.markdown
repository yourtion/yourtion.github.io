---
author: Yourtion
comments: true
date: 2010-08-08 00:54:09+00:00
excerpt: FreakAuth_light出现Assigning the return value of new by reference is deprecated解决方法，最近在研究CodeIgniter。因为要登录验证，所以找到了FreakAuth_light，这是一个很不错的验证插件～可以满足你日常要求～
layout: post
slug: freakauth_light-assigning-error-solution
title: FreakAuth_light出现Assigning the return value of new by reference is deprecated解决方法
wordpress_id: 1410
categories:
- PHP
tags:
- CodeIgniter
- 解决问题
---
{% include JB/setup %}

最近在研究CodeIgniter。因为要登录验证，所以找到了FreakAuth_light，这是一个很不错的验证插件～可以满足你日常要求～

但是按照他的要求配置玩以后却出现：


<blockquote>Message: Assigning the return value of new by reference is deprecated

Filename: helpers/freakauth_light_helper.php

Line Number: 32</blockquote>


还有：


<blockquote>Message: Cannot modify header information - headers already sent by (output started at D:\xampp\htdocs\ciyz\system\application\helpers\freakauth_light_helper.php:32)

Filename: libraries/Db_session.php

Line Number: 248</blockquote>


的错误。经过研究终于解决了问题。顺给给大家分享，

解决问题很简单，将helpers/freakauth_light_helper.php第 32行的          $obj->freakauth_light = & new MyFAL();改为 $obj->freakauth_light =  new MyFAL();

以后会写文章介绍一下FreakAuth_lightd的配置和使用。至于为什么出那个错误请看下文：

自从php5.3，越来越多的人会遇到“Assigning the return value of new by reference is deprecated in xxxx”这样的提示，尤其是在国外产品中（例如wordpress、joolma），很多人的解决办法很简单：把php版本换回就版本就ok了。毫无疑问这是个好办法，对这种遇到问题不求甚解的态度可能会让人看到些什么。我认为要换回php的旧版本，其实是对php技术爱好者的一种羞辱（用词不当，大致是这个意思）。解决办法：php5.3开始后，废除了php中的”=&”符号，所以要想复制，直接用=引用即可。详细如下：


<blockquote>1、PHP5对象复制是采用引用的方式；
2、如果不采用引用方式，则需要在复制对象时加关键字 clone;
3、如果在复制的过程中，同时要变更某些属性，则增加函数_clone();</blockquote>






Message: Assigning the return value of new by reference is deprecated

Filename: helpers/freakauth_light_helper.php

Line Number: 32


