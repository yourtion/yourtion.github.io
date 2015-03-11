---
author: Yourtion
comments: true
date: 2010-07-04 03:04:02+00:00
excerpt: 之前看教程自己制作了留言板《无插件创建WordPress留言板》~但是倒序显示的问题一直不行~今天重新研究了一回~终于解决了~给大家分享一下~希望对你有帮助~
layout: post
slug: wordpress-message-board-reverse
title: WordPress自制留言板倒序分页问题
wordpress_id: 1269
categories:
- WordPress技术
tags:
- WordPress
- 解决问题
---
{% include JB/setup %}

之前看教程自己制作了留言板[《无插件创建WordPress留言板》](/create-wordpress-gestbook-no-plugin.html)~但是倒序显示的问题一直不行~今天重新研究了一回~终于解决了~还搞定了分页问题~

给大家分享一下~希望对你有帮助~

网上流传的方法是找到guestcomments.php里面的

```<?php foreach ($comments as $comment) : ?>```

替换成：

```<?php foreach (array_reverse($comments) as $comment) : ?>```

实现留言板留言倒序显示。

但是我替换后并没有改变~研究发现那一段是针对WP2.6以前的版本~WordPress2.7开始支持的```wp_list_comments```函数，我用的是3.0啊~~晕死~

从```wp_list_comments```函数入手开始查找，于是找到模板标签```wp_list_comments()``` 里面详细讲解了这个```wp_list_comments```函数包含的各类定义:

```php
<?php 
$args = array(
	'walker' => null,
	'max_depth' => ,
	'style' => 'ul',
	'callback' => null,
	'end-callback' => null,
	'type' => 'all',
	'page' => ,
	'per_page' => ,
	'avatar_size' => 32,
	'reverse_top_level' => null,
	'reverse_children' => 
); 
?>
```

发现，里面是有个参数reverse_top_level来选择是否倒序的，如果你指定了这个参数的值，那么就是你所指定的值优先。那么，我们就可以传参让它倒序了，而因为我们是自己制作的一个模版，所以，又不会影响到其他的文章页评论！

所以把


```guestcomments.php```里的```<?php wp_list_comments(); ?>```

替换成

```php
<?php
	wp_list_comments('reverse_top_level=1&type=comment&callback=mytheme_comment'); 
?>
```


就解决了倒序问题·····然后是分页~事实上也是有函数的~

只需要将原来的

```php
<?php 
	wp_list_comments('type=comment&callback=mytheme_comment'); 
?>
```

之后加上&per_page=显示数目,

```php
<?php 
	wp_list_comments('type=comment&callback=mytheme_comment&per_page=10'); 
?>
```

就可以控制页面显示评论分页数目了 。

最后 ```<?php wp_list_comments(); ?>```就变成


```php
<?php 
	wp_list_comments('reverse_top_level=1&type=comment&callback=mytheme_comment&per_page=10'); 
?>
```

这就是我留言板的效果了·
