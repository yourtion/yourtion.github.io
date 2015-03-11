---
author: Yourtion
comments: true
date: 2010-02-05 03:09:58+00:00
layout: post
slug: picture-with-wordpress
title: WordPress的头像使用
wordpress_id: 461
categories:
- WordPress技术
tags:
- gravatar
- WordPress
---
{% include JB/setup %}

这两天查了头像插件方面的资料，也在自己的博客应用了。不敢独享，大家一起研究一下。

以下资料来自：http://fairyfish.net/2007/06/24/gravatars2/

目前在 WordPress 支持 Gravatar 的插件（就我所知）有三个：

第一个是 Gravatar 官方推出的 WP Gravatar，这个插件比较简单，实现的功能很少，仅仅显示头像，如果留言者没有在 Gravatar 上注册头像，它就会显示一个默认的 Gravatar 官方的头像。

第二个是 skippy dot net 的 Gravatars，它的基本功能和官方的功能基本上一致，没什么很大的区别。

最后一个，也是本站使用的 ZenPax 的 Gravatars2，该插件是在 skippy dot net 的 Gravatars 基础上改进的，首先就是它在本地注册的用户，可以直接在本地上传图像，如果不想在 Gravatar 上注册头像的话。另外，它在你服务器上缓存了头像，节省访问 gravatar.com 服务器的时间。

最后本人最喜欢的它一个功能是，默认头像可以设置到一个文件夹下面，它可以随机选取一张头像给未在 Gravatar 上注册的留言者，这样就可以让留言区域的头像比较丰富，而不会显得单一，因为在国内到 Gravatar 上注册的人不是很多。

呵呵，像本站就使用了洋葱头的一组头像。下面就给大家介绍下 Gravatars2 的安装和使用： 在使用之前，你要确认你没有使用别的 Gravatar 插件，如有，请停止它。

目前该插件的版本是2.62，你可以到这里下载，下载之后解压缩之后，把文件上传到合适的位置（压缩包中文件的层次关系就已经告诉你了合适的位址），然后把 ```wp-content``` 目录下的 gravatar 文件夹设置为可写，然后到插件管理界面激活 Gravatars2 插件，也可以激活

Gravatars2-WPCron这个插件用于定时去 gravatar.com 服务器上获取头像缓存到本地，或者你也可以把 ```gravatars2-cache-refresh.php```（该文件在压缩包中）这个文件上传到你的 WordPress 根目录下，然后通过 Unix 的 Crorn 去执行它。

这个 Cron Job 如下所示： 

```bash
0 * * * * /full_path_to_blog/gravatars2-cache-refresh.php 
```
到 Options » Gravatars，把 Cache gravatars? 设置为 yes。然后上传一个包含图像文件夹到 ```wp-content/gravatar/```目录下， 把默认头像图片选择刚才上传的文件夹，就可以实现默认头像丰富多彩。

其他设置皆为默认即可。 然后在你的 ```style.css``` 文件中插入以下样式头像的代码：

```css
.gravatar
{
	float:left;padding: 3px;
	border: 1px solid #000;
	background: #fff;
	clear:both;
}

```


然后在你的 comments.php 中的留言循环体中输入以下代码即可就算安装完成了：

```php
<?php 
	if (function_exists('gravatar')) { gravatar_image_link(); } 
?>
```


以下是我个人的经验 首先，所谓的comments.php 中的留言循环体是指在你主题文件夹里的```comments.php```文件中有Comment Loop注释部分。

最新版本的Gravatars2的CSS代码如下：

```css
.gravatar
{
	float:left;
	padding: 3px;
	border: 1px solid #000;
	background: #fff;
}

.postgrav
{
	float: left;
	padding: 3px;
	margin-right: 5px;
	margin-left: 5px;
	border: 1px solid #000;
	background: #fff;
}
```


我安装了之后发现，现在的WordPress版本都支持gravatar，就是不安插件也没问题。那为什么还要用插件呢？因为插件可以更好的管理头像还有可以缓存头像到服务器，加快访问速度~~所以呢还是建议使用插件的···
