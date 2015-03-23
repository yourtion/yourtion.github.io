---
author: Yourtion
comments: true
date: 2010-11-06 00:13:11+00:00
layout: post
slug: detailed-structure-joomla-mvc
title: JoomlaMVC结构详解
wordpress_id: 1578
categories:
- PHP
tags:
- Joomla
---
{% include JB/setup %}

Joomla```index.php?option=组件名&view=视图名&controller=控制器名&layout=视图分页名```

Joomla```index.php?option=com_test模板和组件com_test的展示 index2.php?option=com_test```

仅组件```com_test```的展示

组件开发需要在数据库 添加记录，并以```com_```开头，组件分前台与后台,后台组件放在```administrator/components```下，前台组件放在```components``` 下。

Task是```Controller```下的分支，没有Task时用默用处理。

建立了View可以用 ```index.php?option=com_test&view=?``` 来显示，不需要写```Controller```，但必需有```Controller```存在

### 命名规则：

Controller 类名：控制器名```Controller```, 控制器名随时，但会影响```View```和```Model```的命名 文件名 随时，由主文件调用

View 类名：控制器名```View```视图名 放在```views```目录下，以视图名作为目录名，主文件为```view.html.php```，模板页在tmpl下

Model 类名：控制器名```Model```视图名 放在```models```目录下，以视图名为文件名

Model: 继承```JModel```，所有以``get``开头的成员函数都作用参数。

比如getXXX(), 从View中可以用```$this->get('xxx')```获取返回值 ```Controller```: ```JController```成员名对应task名。
