---
author: Yourtion
comments: true
date: 2010-11-06 00:13:11+00:00
layout: post
slug: detailed-structure-joomla-mvc
title: JoomlaMVC结构详解
wordpress_id: 1578
categories:
- Joomla
tags:
- Joomla
- MVC
- PHP
---
{% include JB/setup %}

index.php?option=组件名&view=视图名&controller=控制器名&layout=视图分页名

index.php?option=com_test模板和组件com_test的展示 index2.php?option=com_test

仅组件com_test的展示
组件开发需要在数据库 添加记录，并以com_开头，组件分前台与后台,后台组件放在administrator/components下，前台组件放在components 下。

Task是Controller下的分支，没有Task时用默用处理。

建立了View可以用 index.php?option=com_test&view=? 来显示，不需要写Controller，但必需有Controller存在

命名规则：

Controller 类名：控制器名Controller, 控制器名随时，但会影响View和Model的命名 文件名 随时，由主文件调用

View 类名：控制器名View视图名 放在views目录下，以视图名作为目录名，主文件为view.html.php，模板页在tmpl下

Model 类名：控制器名Model视图名 放在models目录下，以视图名为文件名

Model: 继承JModel，所有以get开头的成员函数都作用参数。

比如getXXX(), 从View中可以用$this->get('xxx')获取返回值 Controller: JController成员名对应task名。
