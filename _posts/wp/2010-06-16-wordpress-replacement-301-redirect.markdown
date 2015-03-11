---
author: Yourtion
comments: true
date: 2010-06-16 06:01:31+00:00
excerpt: WordPress 从TK域名进军com了···介绍一下怎么做数据库的更新和301重定向
layout: post
slug: wordpress-replacement-301-redirect
title: WordPress 更换域名数据库操作以及301重定向设置
wordpress_id: 1198
categories:
- WordPress技术
tags:
- .htaccess
- WordPress
- 域名
---
{% include JB/setup %}

从TK域名进军com了···介绍一下怎么做数据库的更新和301重定向

修改数据库

在 ```phpMyAdmin``` 中选择新建的数据库，然后点击 “```SQL```”，并在输入以下代码：

```sql
UPDATE wp_options SET option_value = replace(option_value,'http://yourtion.tk','http://yourtion.com') WHERE option_name ='home' OR option_name ='siteurl';

UPDATE wp_posts SET post_content = replace( post_content,'http://yourtion.tk', 'http://yourtion.com');

UPDATE wp_posts SET guid = replace(guid,'http://yourtion.tk', 'http://yourtion.com') ;
```


操作时注意把 yourtion.tk 改为你的旧域名，把 yourtion.com 改为你的新域名。
这步完成了之后，你访问新的域名时，就会看到和原来域名一模一样的 WordPress 博客了。

以上步骤下来，其实就完成了一件事，那就是复制了一个一模一样的 WordPress 博客。在确保新博客一切链接正常之后，需要把旧域名重新定向到新域名的博客，使得别人访问你的旧域名时，就会转到你的新域名博客，其操作方法如下：

301 永久重定向

在原来域名的 ```.htaccess``` 文件上添加以下代码：

```ini
RewriteEngine on
RewriteCond %{HTTP_HOST} ^yourtion.tk$ [OR]
RewriteCond %{HTTP_HOST} ^www.yourtion.tk$
RewriteRule ^/?$ "http\:\/\/yourtion\.com" [R=301,L]
RewriteRule (.*) "http\:\/\/yourtion\.com\/$1" [R=301,L]
```


如果你之前没有 .htaccess 文件，可以把以上代码复制粘贴到记事本上，并以 “ .htaccess” 作为文件名保存，然后上传到原来域名所对应的 WordPress 文件夹根目录。那么 yourtion.tk可以正常跳转到 yourtion.com

到这里，整个域名的更换算是完成了，以后你就可以直接在新域名对应的 WordPress 上写博客了。

最后你就去各大搜索引擎提交你的新网址还有记得更新SiteMap哦···
