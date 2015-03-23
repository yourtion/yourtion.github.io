---
author: Yourtion
comments: true
date: 2011-04-28 06:13:34+00:00
excerpt: 标签云（Tag Cloud）是自WordPress 2.3+ 以来的内置功能，一般直接调用函数 wp_tag_cloud 或者在 Widgets
  里开启即可，但是默认的全部是一个颜色，只是大小不一样，很是不顺眼，虽然可以用插件实现各种效果，但是就觉得爽，所以我在Wordpress3.1下自己动手，参考之前的一下文章，自制五彩标签云。
layout: post
slug: wordpress-colorful-tag-cloud
title: WordPress3.1实现五彩标签云
wordpress_id: 2100
categories:
- WordPress技术
tags:
- WordPress
---
{% include JB/setup %}

标签云（```Tag Cloud```）是自WordPress 2.3+ 以来的内置功能，一般直接调用函数 ```wp_tag_cloud``` 或者在 ```Widgets``` 里开启即可，但是默认的全部是一个颜色，只是大小不一样，很是不顺眼，虽然可以用插件实现各种效果，但是就觉得爽，所以我在Wordpress3.1下自己动手，参考之前的一下文章，自制五彩标签云。

后台编辑主题的 ```functions.php```, 插入以下代码：

```php
function colorCloud($text) { 
	$text = preg_replace_callback('|<a (.+?)>|i', 'colorCloudCallback', $text); 
	return $text; 
} 
function colorCloudCallback($matches) { 
	$text = $matches[1]; 
	$color = dechex(rand(0,16777215)); 
	$pattern = '/style=(\'|\")(.*)(\'|\")/i'; 
	$text = preg_replace($pattern, "style=\"color:#{$color};$2;\"", $text); 
	return "<a $text>"; 
} 
add_filter('wp_tag_cloud', 'colorCloud', 1);
```

可以看到，颜色是随机的，可以自行修改 ```$color = dechex(rand(0,16777215))```;  这行来修改范围，这样就很炫耀哈哈。

然后在侧边栏 ```sidebar.php``` 里调用如下代码：

```php
<?php wp_tag_cloud('smallest=9&largest=25&number=60'); ?>
```

即可，```9``` 是最小的 ```tag``` 的字体大小（用的最少的 ```tag```），```25```是最大的（用的最多的 ```tag```），```60``` 是 ```tag``` 的数目，可以自行修改。

[![]({{ IMAGE_PATH }}2011/04/tag.jpg)]({{ IMAGE_PATH }}2011/04/tag.jpg)
