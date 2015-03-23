---
author: Yourtion
comments: true
date: 2010-06-10 13:04:17+00:00
excerpt: 刚好帮King改他的情侣博客上发布时间的显示，查找了WordPress的时间显示资料，于是将获得的一些信息记下，供备忘，亦供朋友们参考。
layout: post
slug: custom-wordpress-time-display-format
title: WordPress时间显示格式自定义
wordpress_id: 1175
categories:
- WordPress技术
tags:
- PHP
- WordPress
---
{% include JB/setup %}

在帮King改他的私人情侣博客模版~找了一些找了，总算是把时间显示为想要的格式了。于是将获得的一些信息记下，供备忘，亦供朋友们参考。

WordPress 通过一系列的时间日期函数控制时间日期的输出，下面介绍几个常用的函数：

1、```the_date_xml()``` 函数

调用格式：

```php
<?php the_date_xml(); ?>
```

输出格式：YYYY-MM-DD

如：2005-05-14

2、```the_date() ```函数

说明：此 函数一般用于显示时间日期。根据官方文档的说法，当一个页面上有多篇发布于同一天的档案时，the_date() 函数仅在最先引用处显示，在这种情况下最好使用 the_time() 函数。见：http://codex.wordpress.org/Template_Tags/the_date

调用格式：

```php
<?php the_date('format', 'before', 'after', echo); ?>
```

参数表：

* ```format```：（字符串型）定义时间日期格式的参数。
* ```before```：（字符串型）日期前放置的文本，无缺省值。
* ```after```：（字符串型）日期后放置的文本，无缺省值。
* ```echo```：（布尔型）显示日期 (TRUE)，或返回供 PHP 使用的日期(FALSE)。缺省值为 TRUE。

3、```the_time()``` 函数

说明：此函数用于显示时间日期。根据官方文档的说法，此函数必须被使用在循环内。见：http://codex.wordpress.org/Template_Tags/the_time

调用格式：

```php
< ?php the_time('format'); ?>
```

参数表：

* ```format```：（字符串型）定义时间日期格式的参数。

4、```get_the_time()``` 函数

说明：根据官方文档的说法，此函数仅向 PHP 返回时间信息，并不显示时间日期，且必须被使用在循环内。见：http://codex.wordpress.org/Template_Tags/get_the_time

调用格式：
```php
< ?php get_the_time('format'); ?>
```

参数表：

* ```format```：（字符串型）定义时间日期格式的参数。

以上三个函数format 参数可以使用的各项值：

```a``` = 一般在12小时制显示时使用，显示当前是 am（上午）或 pm（下午）
```A``` = 功能同上，区别是 am 或 pm 为大写

```d``` = 一月中的哪一天，固定以两位数显示

```F``` = 文字全称表示的月份

```g``` = 12小时制的小时数，位数根据实际的时间决定
```G``` = 24小时制的小时数，位数根据实际的时间决定

```h``` = 12小时制的小时数，固定以两位数显示
```H``` = 24小时制的小时数，固定以两位数显示

注：如当前时间是早上8点，用 h 参数输出的结果为 08，用 g 参数输出的结果为 8，换成大写后仅改变时制。

```i``` = 当前分钟数
```I``` = 输出一个零，不知何用，望知道的兄弟指教。（大写 i）

```j``` = 一月中的哪一天，位数根据实际的日期决定

```l``` = 文字表示的星期（小写 L）
```L``` = 输出一个零，不知何用，望知道的兄弟指教。

```m``` = 数字表示的月份
```M``` = 英文缩写的月份

```s``` = 当前秒数
```S``` = 一般跟随参数 j 使用，效果是在天数后加上序数词后坠（st, nd ,rd 等）

```Y``` = 4位数的年份
```y``` = 2位数的年份

注：参数区分大小写，写在参数引号内的非参数字符不做处理，直接输出。

例如，以下格式字串：

```l```, ```F``` ```j```, ```Y```

将生成如下格式的日期：

星期五, 九月 24, 2004

5、single_month_title() 函数

调用格式：

```php
<?php single_month_title('prefix', display) ?>
```

参数表：

* prefix：年和月的前缀

输出格式：```prefix``` + ```MONTH``` + ```prefix``` + ```YEAR```

如```prefix``` 参数为"*"，显示结果将会是如下的样子：

*February * 2004

最终帮King改的时间函数为the_time('Y年m月d日,H时s分i秒')
显示效果就是：发表于: 2010年06月12日,23时14分32秒

大家可以举一反三。找到自己想要的效果
