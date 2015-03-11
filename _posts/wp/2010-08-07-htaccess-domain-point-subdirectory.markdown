---
author: Yourtion
comments: true
date: 2010-08-07 06:39:06+00:00
excerpt: 想将主域名指向其中一个文件夹/目录，这样就需要利用.htaccess的重写功能。
layout: post
slug: htaccess-domain-point-subdirectory
title: 用.htaccess将主域名从网站根目录指向子目录
wordpress_id: 1406
categories:
- 服务器
tags:
- .htaccess
- 域名
- 服务器
---
{% include JB/setup %}

想将主域名指向其中一个文件夹/目录，问我会不会弄，我随即就说通过```.htaccess```重写就可以了，虽然对```.htaccess```有一定的了解，可是真正要实现这个功能的重写，还不知道具体怎么实现，尝试了几次都出现这样或那样的问题。无奈中~~只好上网寻找答案~~

找这种答案还是很容易的，很快就在HostMonster的知识库里找到了，那里有一篇文章专门写如何用```.htaccess```重写将主域名指向一个子目录/文件夹。

在虚拟主机中，主域名是使用```public_html```目录/文件夹作为主域名的缺省目录，主域名网站的文件和程序都是放在public_html目录下，附加的域名(addon domains)使用```public_html```目录/文件夹下的子目录/子文件夹。有的人可能觉得public_html目录/文件夹下的会看起来比较乱，因此想把主域名也指向其中一个子目录/文件夹。这样就需要利用```.htaccess```的重写功能。

具体的写法如下：

```ini
# .htaccess main domain to subfolder redirect
# Copy and paste the following code into the .htaccess file
# in the public_html folder of your hosting account
# make the changes to the file according to the instructions.

# Do not change this line.

RewriteEngine on

# Change yourdomain.com to be your main domain.

RewriteCond %{HTTP_HOST} ^(www.)?yourmaindomain.com$

# Change ’subfolder’ to be the folder you will use for your main domain.

RewriteCond %{REQUEST_URI} !^/subfolder/

# Don’t change this line.

RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d

# Change ’subfolder’ to be the folder you will use for your main domain.

RewriteRule ^(.*)$ /subfolder/$1

# Change yourdomain.com to be your main domain again.
# Change ’subfolder’ to be the folder you will use for your main domain
# followed by / then the main file for your site, index.php, index.html, etc.

RewriteCond %{HTTP_HOST} ^(www.)?yourmaindomain.com$
RewriteRule ^(/)?$ subfolder/index.php [L]﻿</blockquote>
```
