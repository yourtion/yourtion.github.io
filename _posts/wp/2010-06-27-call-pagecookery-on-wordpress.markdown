---
author: Yourtion
comments: true
date: 2010-06-27 03:00:40+00:00
excerpt: 刚刚架设了PageCookery的微博，http://t.yourtion.com。然后就研究怎么跟现在的WordPress结合一下~分享一下如何在wordpress中调用PageCookery的内容。
layout: post
slug: call-pagecookery-on-wordpress
title: WordPress调用PageCookery的方法
wordpress_id: 1229
categories:
- PageCookery
- WordPress技术
tags:
- PageCookery
- WordPress
---
{% include JB/setup %}

刚刚架设了PageCookery的微博，http://t.yourtion.com

然后就研究怎么跟现在的WordPress结合一下~分享一下如何在wordpress中调用PageCookery的内容。

将下面的代码插入到你想显示PageCookery微博的地方。

代码如下：

```php
<div class="sidebarbox">
<a target="_blank" href="http://t.yourtion.com/"><h2>我的微博~http://t.yourtion.com~</h2></a>
<ul>
	<?php
		require_once (ABSPATH . WPINC . '/class-feed.php');
		$feed = new SimplePie();
		$feed->set_feed_url('http://t.yourtion.com/rss.xml');
		$feed->set_cache_location($_SERVER['DOCUMENT_ROOT'] . '/wp-content/cache');
		$feed->set_file_class('WP_SimplePie_File');
		$feed->set_cache_duration(300);
		$feed->init();
		$feed->handle_content_type();
		$items = $feed->get_items(0,3);
	foreach($items as $item) {
		echo  '<ul style="podding:20px;"><li>'.$item->get_description().'<a href="'.$item->get_link().'" target="_blank"><h3>回复他</h3></a>'.'</li></ul>';
	}
	?>
</ul>
</div>
```


如上所示，我们主要应用WordPress的```fetch_feed```函数来读取微博客RSS的内容，只需要将该代码插入到你的wordpress模板中即可。

其中，```set_cache_duration(3700)```; 的意思是3700秒读取一次rss，看是否有更新；

```get_items(0,5)```的目的是控制显示多少条微博。

echo后面跟的是希望显示的内容，如果希望以列表模式显示，并列出微博客发布的时间，可以将源代码对应echo的部分修改为：

```php
echo  '<li>'.$item->get_description().'<br />'.'<a href="http://t.yourtion.com/">'.$item->get_date('Y-m-j G:i').'</a>'.'</li>';
```

完成如上操作后，可以调整样式表，改为自己喜欢的排版模式。

如果对所显示的内容不满意，可以到```PageCookery```的对应目录中修改```cron/rss_update.php```文件，来变更RSS显示的内容。

关于出现：

```
Warning: ./cache/791730c068090a99527392a2d75c1392.spc is not writeable in /home/jcom/public_html/yourtion/wp-includes/class-simplepie.php on line 1780
```

修改```/wp-content/cache```为有权限写入的文件夹路径即可~

```php
$feed->set_cache_location($_SERVER['DOCUMENT_ROOT'] . '/wp-content/cache');
```
