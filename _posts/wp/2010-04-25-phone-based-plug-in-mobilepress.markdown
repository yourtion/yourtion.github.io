---
author: Yourtion
comments: true
date: 2010-04-25 02:52:57+00:00
excerpt: 手机已经我们上网不可或缺的一个互联网终端，越来越多的人开始用手机来浏览网页，不过很多网站的对于手机而言都不是很友好，之前我写过一篇关于WordPress的手机浏览《WordPress的WAP访问与管理》，但是WP-T-WAP需要你访问wap目录，而且好像有时也不太正常。今天介绍的MobilePress可以自动检测手机类型，并使你的网站适合于iPhone、Opera
  Mini、Windows Mobile以及其他的手机浏览器来浏览，当用户浏览网页时，自动检测手机类型，并且可以设置只针对某些手机显示（如只针对iPhone优化）。
layout: post
slug: phone-based-plug-in-mobilepress
title: WordPress手机化插件MobilePress连汉化主题
wordpress_id: 1062
categories:
- WordPress插件
tags:
- WAP
- WordPress
- Yourtion
---
{% include JB/setup %}

![]({{ IMAGE_PATH }}2010/04/zrclip_001pe64d5c0.png)

手机已经我们上网不可或缺的一个互联网终端，越来越多的人开始用手机来浏览网页，不过很多网站的对于手机而言都不是很友好，之前我写过一篇关于WordPress的手机浏览[《WordPress的WAP访问与管理》](http://blog.yourtion.com/?p=295)，但是WP-T-WAP需要你访问wap目录，而且好像有时也不太正常。今天介绍的MobilePress可以自动检测手机类型，并使你的网站适合于iPhone、Opera Mini、Windows Mobile以及其他的手机浏览器来浏览，当用户浏览网页时，自动检测手机类型，并且可以设置只针对某些手机显示（如只针对iPhone优化）。

这个插件对访问本域名的客户端直接识别并自动转向移动站点，不用另换域名，而且支持评论，可以显示网站fav.ico；连GoogleAD也给显示出来了，使用之后觉得这个插件的界面比wp-t-wap好很多，后台还可以设定默写移动浏览器的转向识别，手机管理方面之后再介绍一个吧。

下载地址：[http://wordpress.org/extend/plugins/mobilepress/](http://wordpress.org/extend/plugins/mobilepress/)

强烈推荐使用！

后台截图如下：

![]({{ IMAGE_PATH }}2010/04/zrclip_002p79c95589.png)

此插件使用很简单，只需要上传，激活即可，上面是选项设置的页面，可以重新自定义站点名称和描述，不填则使用wordpress默认的。Force Mobile Site是指是否需要强制PC浏览下成为适合手机浏览的版本，这个一般选No，除非你想看看在PC浏览中显示为合适手机浏览的效果。

手机访问截图如下：

![]({{ IMAGE_PATH }}2010/04/zrclip_003p1999c82f.png)![]({{ IMAGE_PATH }}2010/04/zrclip_004p3a15cda9.png)

![]({{ IMAGE_PATH }}2010/04/zrclip_005p4d115198.png)![]({{ IMAGE_PATH }}2010/04/zrclip_007n3e0e882c.png)

主题我已经汉化，顺便提供汉化了的主题下载。

下载汉化主题：[Yourtion.rar]({{ IMAGE_PATH }}Yourtion.rar)

下载解压到： /wp-content/plugins/mobilepress/system/themes/ 目录下替换Defual即可。
