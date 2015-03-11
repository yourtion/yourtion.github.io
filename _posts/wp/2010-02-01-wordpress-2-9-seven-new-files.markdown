---
author: Yourtion
comments: true
date: 2010-02-01 07:57:28+00:00
excerpt: 早上在研究WordPress的YupooAlbum插件，但是发现在WordPress 2.9 不再有以下七个文件
layout: post
slug: wordpress-2-9-seven-new-files
title: WordPress 2.9不再有的七个文件和对应新版本
wordpress_id: 362
categories:
- WordPress技术
tags:
- WordPress
- YuPooAlbum
- 新版本
---
{% include JB/setup %}

早上在研究WordPress的YupooAlbum插件，但是发现在Wordpress2.9下面会提示缺少wp-includes/gettext.php和wp-includes/streams.php。经过一番研究发现：

WordPress 2.9 不再有以下七个文件:
wp-admin/edit-form-advanced.php
wp-admin/edit-link-form.php
wp-admin/edit-page-form.php
wp-admin/import/btt.php
wp-admin/import/jkw.php
wp-includes/gettext.php
wp-includes/streams.php
相应的功能集成于以下文件:
wp-admin/includes/image-edit.php
wp-admin/includes/meta-boxes.php
wp-includes/class-json.php
wp-includes/class-oembed.php
wp-includes/default-embeds.php
wp-includes/meta.php
wp-includes/post-thumbnail-template.php
引用原文：[WordPress Functions 2.9](http://www.mittineague.com/blog/2009/12/wordpress-functions-2-9/)

但是当我把文件改成对应文件后 YupooAlbum插件依旧无法工作。继续研究中。
