---
author: Yourtion
comments: true
date: 2011-03-15 08:49:02+00:00
excerpt: DElphi7在打开 Project-options (工程-选项) 时弹出"格式'%s' 无效或不匹配"。研究了很久，终于知道是怎么回事，解决方法共享一下
layout: post
slug: delphi-invalue-fix
title: Delphi格式'%s'无效或不匹配解决方法
wordpress_id: 1960
categories:
- Delphi
tags:
- Delphi
---
{% include JB/setup %}

Delphi7在打开 ```Project```-```options``` (工程-选项) 时弹出"格式'%s' 无效或不匹配"。研究了很久，终于知道是怎么回事，解决方法共享一下，事实上很简单~~

在“```我的电脑```”->右键“```属性```”->“```高级```”->“```性能```”->“```设置```”->“```数据执行保护```”

选择“只为关键Windows程序和服务启动数据执行保护”，然后重启电脑就OK了

[![]({{ IMAGE_PATH }}2011/03/1.jpg)]({{ IMAGE_PATH }}2011/03/1.jpg)
