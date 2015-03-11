---
author: Yourtion
comments: true
date: 2010-01-25 13:39:44+00:00
layout: post
slug: wordpress-bound-multi-domain
title: WordPress 多域名绑定
wordpress_id: 282
categories:
- WordPress技术
tags:
- WordPress
- 多域名
---
{% include JB/setup %}

有时候需要为 WordPress 绑定多个域名，并且不是跳转方式，解决 WordPress 的多域名绑定问题。

**方法一：**

 编辑根目录下的 wp-config.php 文件，添加以下代码：

```php
	$home = 'http://'.$_SERVER['HTTP_HOST'];
	$siteurl = 'http://'.$_SERVER['HTTP_HOST'];
	define('WP_HOME', $home);
	define('WP_SITEURL', $siteurl);
```

我们知道，PHP 中的 ```$_SERVER['HTTP_HOST']``` 用于获得来路域名。这样，就能根据来路为 ```WP_HOME``` 和 ```WP_SITEURL``` 变量赋值，实现 WordPress 多域名绑定。 

为防止域名改变而造成图片不可用，必须在控制面板的“设置 (Options) – 杂项 (Misc)”里将“文件的完整 URL 地址”设为 ```wp-content/uploads```（与“默认上传路径”参数相同）。

方法二：
原理是WordPress支持宏定义，可以覆盖后台数据库的option选项。与我们相关的两个option选项是 site_url 和 wp_home。要想覆盖数据库里的选项，定义大写的同名的宏即可。

```php
< ?php
if (isset($_SERVER['HTTPS'])):
define("WP_SITEURL", "http://yourtion.cz.cc");
define("WP_HOME", "http://yourtion.cz.cc");
elseif ($_SERVER['HTTP_HOST']=='yourtion.tk'):
define("WP_SITEURL", "http://yourtion.com");
define("WP_HOME", "http://yourtion.com");
endif;
?>
```
