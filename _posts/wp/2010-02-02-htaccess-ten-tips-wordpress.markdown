---
author: Yourtion
comments: true
date: 2010-02-02 06:36:59+00:00
layout: post
slug: htaccess-ten-tips-wordpress
title: WordPress的.htaccess十个技巧
wordpress_id: 357
categories:
- WordPress技术
tags:
- .htaccess
- WordPress
---
{% include JB/setup %}

### 重定向wordpress的订阅地址


除了修改WordPress的模板文件来定制其输出的RSS Feed链接地址外，还可以使用.[htaccess文件](http://paranimage.com/htaccess-wen-jian-shi-yong-jiao-cheng-4htaccess-wen-jian-shi-yong-xiao-jie/)来进行设置(替换yourrssfeedlink为自己的Feedburner地址)。

```
# temp redirect wordpress content feeds to feedburner
<IfModule mod_rewrite.c>
RewriteEngine on
RewriteCond %{HTTP_USER_AGENT} !FeedBurner    [NC]
RewriteCond %{HTTP_USER_AGENT} !FeedValidator [NC]
RewriteRule ^feed/?([_0-9a-z-]+)?/?$ http://feeds2.feedburner.com/catswhocode [R=302,NC,L]
</IfModule>

```

参考：[How to redirect WordPress rss feeds to feedburner](http://www.wprecipes.com/how-to-redirect-wordpress-rss-feeds-to-feedburner-with-htaccess)


### 去除WordPress分类链接中的“/category/”前缀


默认情况下，WordPress的分类链接显示的样式为：
```http://xxx.com/blog/category/tech```
其实其中的category部分没有任何意义，如果想去掉它可以修改.htaccess文件(替换yourblog为自己的网址)。

```
RewriteRule ^category/(.+)$ http://www.yourblog.com/$1 [R=301,L]

```

参考：[How to remove category from your WordPress url](http://www.wprecipes.com/how-to-remove-category-from-your-wordpress-url)


##### 3. 使用浏览器缓存


可以修改```.htaccess```文件让访问者使用浏览器缓存来优化其访问速度。

```
FileETag MTime Size
<ifmodule mod_expires.c>
<filesmatch "\.(jpg|gif|png|[CSS](http://paranimage.com/category/dede/css/)|js)$">
ExpiresActive on
ExpiresDefault "access plus 1 year"
</filesmatch>
</ifmodule>

```

参考： Comment accelerer le temps de chargement de votre blog


### 压缩静态数据


可以修改```.htaccess```文件来压缩需要访问的数据（传输后在访问端解压），从而可以减少访问流量和载入时间。

```
AddOutputFilterByType DEFLATE text/[html](http://paranimage.com/category/dede/html/) text/plain text/xml application/xml application/xhtml+xml text/[javascript](http://paranimage.com/category/dede/javascript/) text/css application/x-javascript
BrowserMatch ^Mozilla/4 gzip-only-text/html
BrowserMatch ^Mozilla/4.0[678] no-gzip
BrowserMatch bMSIE !no-gzip !gzip-only-text/html

```

### 重定向日期格式的WP Permalink链接地址为Postname格式


如果你目 前的Permalink地址为/%year%/%monthnum%/%day%/%postname%/ 的格式，那么我强烈推荐你直接使用/%postname%/ ，这样对搜索引擎要舒服得多。

首先你需要在WordPress的后台设置输出的Permalinks格式为/%postname%/ 。

然后修改.htaccess文件来重定向旧的链接，不然别人以前收藏你的网址都会转成404哦！(替换yourdomain为自己的网址)

```
RedirectMatch 301 /([0-9]+)/([0-9]+)/([0-9]+)/(.*)$ http://www.yourdomain.com/$4

```

参考： [Redirect day and name permalinks to postname](http://www.wprecipes.com/redirect-day-and-name-permalinks-to-postname)


### 阻止没有referrer来源链接的垃圾评论


设置```.htaccess```文件可以阻止大多数无Refferrer来源的垃圾评论机器人Bot Spammer。其会查询访问你网站的来源链接，然后阻止其通过```wp-comments-post.php```来进行垃圾评论。

```
RewriteEngine On
RewriteCond %{REQUEST_METHOD} POST
RewriteCond %{REQUEST_URI} .wp-comments-post\.php*
RewriteCond %{HTTP_REFERER} !.*yourblog.com.* [OR]
RewriteCond %{HTTP_USER_AGENT} ^$
RewriteRule (.*) ^http://%{REMOTE_ADDR}/$ [R=301,L]

```

参考： [How to deny comment posting to no referrer requests](http://www.wprecipes.com/how-to-deny-comment-posting-to-no-referrer-requests)


### 定制访问者跳转到维护页面


当你进行网站升级，模板修改调试等操作时，最好让访问者临时 跳转到一个声明的维护页面(和404错误页面不同)，来通知网站暂时无法访问，而不是留下一片空白或者什么http bad错误。（替换maintenance.html为自己定制的维护页面网址，替换123.123.123.123为自己目前的IP地址，不然你自己访 问也跳转哦）

```
RewriteEngine on
RewriteCond %{REQUEST_URI} !/maintenance.html$
RewriteCond %{REMOTE_ADDR} !^123\.123\.123\.123
RewriteRule $ /maintenance.html [R=302,L]

```

参考：[Comment faire une page d’accueil pour les internautes](http://www.woueb.net/2007/07/25/comment-faire-une-page-d-accueil-pour-les-internautes/)


### 设置你的WordPress防盗链


盗链是指其它网站直接使用你自己网站内的资源，从而浪费网站的流量和带宽，比如图片，上传的音乐，电影等文件。（替换mysite为自己的网址和/images/notlink.jpg为自己定制的防盗链声明图片）

```
RewriteEngine On
#Replace ?mysite\.com/ with your blog url
RewriteCond %{HTTP_REFERER} !^http://(.+\.)?mysite\.com/ [NC]
RewriteCond %{HTTP_REFERER} !^$
#Replace /images/nohotlink.jpg with your "don't hotlink" image url
RewriteRule .*\.(jpe?g|gif|bmp|png)$ /images/nohotlink.jpg [L]

```

参考：[How to protect your WordPress blog from hotlinking](http://www.wprecipes.com/how-to-protect-your-wordpress-blog-from-hotlinking)


### 只允许自己的IP访问wp-admin


如果你不是团队合作Blog，最好设置只有自己能够访问WP的后台。前提是你的IP不是像我一样动态的哦。（替换xx.xx.xx.xx为自己的IP地址）

```
AuthUserFile /dev/null
AuthGroupFile /dev/null
AuthName "Example Access Control"
AuthType Basic
<LIMIT GET>
order deny,allow
deny from all
allow from xx.xx.xx.xx
</LIMIT>

```

参考：[Protecting the WordPress wp-admin folder](http://www.reubenyau.com/protecting-the-wordpress-wp-admin-folder/)


### 阻止指定IP的访问


如果你想要阻止指定IP的访问，来防止其垃圾评论，那么你可以创建自己的Backlist黑名单。(替换xx.xx.xx.xx为指定的IP地址)

```
<Limit GET POST>
order allow,deny
deny from xx.xx.xx.xx
allow from all
</Limit>

```

参考：[The easiest way to ban a WordPress spammer](http://lorelle.wordpress.com/2007/09/20/the-easiest-way-to-ban-a-wordpress-spammer/)

英文原文: [10 awesome .htaccess hacks for WordPress](http://www.catswhocode.com/blog/10-awesome-htaccess-hacks-for-wordpress)

中文译文: [10个WordPress的.htaccess技巧](http://e-spacy.com/blog/10-htaccess-hacks-for-wordpress.html)
