---
author: Yourtion
comments: true
date: 2011-01-25 00:14:39+00:00
excerpt: 为此，我在PageCookery手机网页端的基础上，改写了一个快速验证的微博发布回复系统，解决女朋友手机没办法发微博的问题，一开始是在原来微博系统的基础上增加一个case，绕过原来的用户验证机制，用另外一个明码密码进行验证用户，最终发布微博。
layout: post
slug: pagecookery-mobile-quickly-blogging
title: PageCookery的手机快速微博功能--概念内测版
wordpress_id: 1826
categories:
- PageCookery
tags:
- Delphi
- PageCookery
---
{% include JB/setup %}

最近用PageCookery架了一个情侣微博http://love.yourtion.com。是一个双栏情侣微博。随时随地的手机微博功能自然少不了！

PageCookery的手机发布功能比较方便，但是部分是手机将居然连Cookie都不支持，这样就没办法办法成功登陆，更不用说微博，我女朋友的手机就是一个典型。

为此，我在PageCookery手机网页端的基础上，改写了一个快速验证的微博发布回复系统，解决女朋友手机没办法发微博的问题，一开始是在原来微博系统的基础上增加一个```case```，绕过原来的用户验证机制，用另外一个明码密码进行验证用户，最终发布微博。

但是后来发现我在电脑可以正常发布微博到了手机就不行，研究了很久发现可能是```POST```的时候用的```Form```的```enctype```类型问题，把```multipart/form-data```改成```application/x-www-form-urlencoded```之后我地方手机是正常了，但是女朋友的还是不行，最终导致我重新写了发布的代码，但是问题依旧。

在我研究了三天这个东西，即将抓狂的时候，决定把```POST```改成```GET```，然后，居然奇迹般的正常了，神马山寨机啊，居然连```POST```数据都会···我就开始佩服那些163啊新浪啊，他们的微博居然在我女朋友那边神马手机也能正常，算了，差距····

因为是自己做来自己用，还是很粗糙的代码，安全性也一般，还有一些是硬编码，也就不放源码了，基本实现思路也说了，有兴趣的可以一起研究下，或者有空了重新写一下那些代码再发布。最后看图说话，快速发布微博的几个页面·····

[![]({{ IMAGE_PATH }}2011/01/love1.jpg)]({{ IMAGE_PATH }}2011/01/love1.jpg)

[![]({{ IMAGE_PATH }}2011/01/love2.jpg)]({{ IMAGE_PATH }}2011/01/love2.jpg)

[![]({{ IMAGE_PATH }}2011/01/love3.jpg)]({{ IMAGE_PATH }}2011/01/love3.jpg)
