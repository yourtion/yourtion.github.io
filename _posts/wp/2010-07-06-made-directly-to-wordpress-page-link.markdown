---
author: Yourtion
comments: true
date: 2010-07-06 02:09:17+00:00
excerpt: 有时候我们需要在WordPress首页添加BBS，留言板，微博之类的链接，当然，这些我们可以在友链里实现，也可以在小工具中的“文本”写入HTML代码来实现，但如果想把页面的链接直接做成链接，指向BBS，留言板就需要进行下面的操作，之后我们就可以实现点击页面链接直接转向我们设定的网址，而不是站内的某个页面，很方便的说～
layout: post
slug: made-directly-to-wordpress-page-link
title: 把WordPress页面直接做成链接
wordpress_id: 1276
categories:
- WordPress技术
tags:
- WordPress
- PHP
---
{% include JB/setup %}

来自：http://www.ifunkey.com/1825.html

有时候我们需要在WordPress首页添加BBS，留言板，微博之类的链接，当然，这些我们可以在友链里实现，也可以在小工具中的“文本”写入HTML代码来实现，但如果想把页面的链接直接做成链接，指向BBS，留言板就需要进行下面的操作，之后我们就可以实现点击页面链接直接转向我们设定的网址，而不是站内的某个页面，很方便的说～

两个方法：

第一，创建一个命名为```Redirect.php```的文件，拷贝内容如下：（如果出现错误，请把代码的标点换成英文输入法下的标点）

```php
<?php
/*
Template Name: Redirect
*/
if (have_posts()) {
	the_post();
	
	$pattern = '@(https?://([-\w\.]+)+(:\d+)?(/([\w/_\.]*(\?\S+)?)?)?)@';
	preg_match($pattern, get_the_excerpt(), $matches);
	if ($matches[0]) 
		header('Location: '.$matches[0]);
	else 
		echo 'Enter a URL into your page body text.';
}
?>
```

然后把这个文件上传到Wordpress中所使用的主题的根目录下（比如/wp-content/themes/主题目录）。

接下来，按照正常方式创建一个页面，并在创建页面底部的”页面模板”选择Redirect。在页面中，除了你的链接，其它什么内容都不要填。然后发布页面即可。

第二，创建一个名为```link_to.php```的文件，内容如下：

```html
<?php
/*
Template Name: link to
*/
?>
<script>location="要跳转的地址";</script>
```

然后把```link_to.php```上传至所用主题的目录下，比如用的是```inove```主题，就上传至```/wp-content/themes/inove```下面，

然后在后台创建一个页面，页面模板选择“link_to”（上传那个文件后就可以出现“```link to```”选项），```location=“你要跳转的地址”```，这样，点击页面就可以跳转到你希望的网址了。

而在日志标题上实现这样的效果，我们在创建一篇文章之后，添加```<!–more–>```标签，紧跟其后添加```<script>location=“要跳转的地址”;</script>```这段代码即可实现点击日志标题实现跳转的效果。
