---
author: Yourtion
comments: true
date: 2010-10-25 10:30:01+00:00
excerpt: WP-T-WAP插件确实不错，不过前几天用UC浏览器发表文章发现提示“您没有添加日志的权限。返回首页。”
layout: post
slug: wp-t-wap-ucweb-no-permission-solution
title: WP-T-WAP在UCWEB没有添加日志的权限解决办法
wordpress_id: 1576
categories:
- WordPress技术
tags:
- WordPress
- 解决问题
---
{% include JB/setup %}

WP-T-WAP插件确实不错，不过前几天用UC浏览器发表文章发现提示“您没有添加日志的权限。返回首页。”

而登陆提示”ERROR: WordPress requires Cookies but your browser does not support them or they are blocked.”

而以前用的好好的，现在却这样。So，应该不是插件的原因，第二个提示的意思应该是浏览器不支持cookies，我想起来前几天把UC浏览器设置中高级设置里WAP压缩中转关掉了。。。

于是去打开中转，再进入wap页，成功解决！
