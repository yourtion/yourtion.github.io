---
author: Yourtion
comments: true
date: 2011-01-23 04:51:43+00:00
excerpt: 但是每次生成SiteMap都要手动运行sitemap.php才会生成，最近在研究快速发布微博的功能，刚好在编辑httprequest.php这个文件，看到rss生成的cron。灵机一动，利用corn进行知道生成sitemap。
layout: post
slug: pagecookery-generate-sitemap
title: PageCookery自动生成Sitemap
wordpress_id: 1806
categories:
- PageCookery
tags:
- PageCookery
- PHP
---
{% include JB/setup %}

之前写过[《PageCookery生成SiteMap》](http://blog.yourtion.com/?p=1656)的文章，介绍了怎么样利用rss生成类改造成sitemap。

但是每次生成SiteMap都要手动运行sitemap.php才会生成，最近在研究快速发布微博的功能，刚好在编辑httprequest.php这个文件，看到rss生成的cron。灵机一动，利用corn进行知道生成sitemap。

很简单，在httprequest.php里面找到case 'cron':，在$_config['rss_import'] = array(上面插入以下代码：

```
$_config['sitemap'] = array(
			'cache_root' => str_replace(basename($_SERVER['PHP_SELF']), '', __FILE__) . 'cache/',
			'distance' => 900,
			'script_location' => str_replace(basename($_SERVER['PHP_SELF']), '', __FILE__) . 'sitemap.php'
		);
```

大功告成！以后Sitemap就是自动生成的了！
