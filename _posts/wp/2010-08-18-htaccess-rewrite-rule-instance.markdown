---
author: Yourtion
comments: true
date: 2010-08-18 08:31:43+00:00
excerpt: '.htaccess文件相信大家都不陌生吧，不过网上关于.htaccess编写方法的教程很有限，也没有几个完全是博主自己写的。

  我在这里就搜了几个常用规则，总结一下rewrite规则的用法。当然这只是.htaccess功能的一小部分，但是相当实用。

  如果熟练掌握rewrite规则的编写，能够加强对网站URL的控制，对用户体验、SEO都十分有利。'
layout: post
slug: htaccess-rewrite-rule-instance
title: .htaccess的rewrite实例
wordpress_id: 1463
categories:
- 服务器
tags:
- .htaccess
---
{% include JB/setup %}

```.htaccess```文件相信大家都不陌生吧，不过网上关于```.htaccess```编写方法的教程很有限，也没有几个完全是博主自己写的。

我在这里就搜了几个常用规则，总结一下rewrite规则的用法。当然这只是```.htaccess```功能的一小部分，但是相当实用。

如果熟练掌握```rewrite```规则的编写，能够加强对网站URL的控制，对用户体验、SEO都十分有利。（注：所有规则来源于网络）

一、防盗链功能


```ini
RewriteEngine On
RewriteCond %{HTTP_REFERER} !^http://(.+\.)?mysite\.com/ [NC]
RewriteCond %{HTTP_REFERER} !^$
RewriteRule .*\.(jpe?g|gif|bmp|png)$ /images/nohotlink.jpg [L]
```

1.打开```Rewrite```功能。有可能服务器设置里已经是全局下打开了，但是多写也没事。

2.```RewriteCond```指令，定义生效条件，用于寻找匹配条件的地址。后面内容用正则表达式匹配。代表含义是发送的请求不由mysite.com而来，那就是盗链啦。末尾的```[NC]```代表忽略大小写。

3.发送请求的主机前缀不为空。

4.```RewriteRule```指令，定义重写规则，把匹配的地址按此规则重写。本例中把这些后缀为这些图片格式的，都替换到某一个图片下。```[L]```表示这是最后一段规则。

在此再这里总结一下几个常用参数：


```RewriteCond```下：

* ```[NC]```  不分字母大小写
* ```[OR]```  用于连接下一条规则

RewriteRule下：

* ```[R]``` 强制重定向，[R=code] code默认为302
* ```[F]``` 禁用URL，返回HTTP 403 错误
* ```[L]``` 这是最后一条规则，之后内容无用。


还有一篇关于正则表达式的教程（很详细）：http://www.unibetter.com/deerchao/zhengzhe-biaodashi-jiaocheng-se.htm

二、网址规范化

```ini
#Options +FollowSymLinks
rewriteEngine on
rewriteCond %{http_host} ^yourdomain.com [NC]
rewriteRule ^(.*)$ http://www.yourdomain.com/$1 [R=301,L]</blockquote>
```

这个是把所有二级域名都重定向到www.yourdomain.com的例子，看起来是不是很简单？

需要注意的是，这里的```Options +FollowSymLinks```不是必须的，但在某些服务器如果不设置```FollowSymLinks```，可能引起500错误。再来看一个好玩的重定向：

```ini
RewriteEngine On
RewriteBase /
RewriteCond %{HTTP_USER_AGENT} (Googlebot)
RewriteRule ^ http://abc.com/ [R=301,L]
```

1. 打开```Rewrite```功能。
2. ```RewriteBase```指令，设置目录级重写的基准URL。可以理解成把该目录（这个```.htaccess```所在目录）假定为基准的URL前缀。本例中这样的写法无用。
3. ```RewriteCond```指令。匹配所有```USER_AGENT```为Googlebot的发送请求。
4. ```RewriteRule```指令。本例中把这些请求都重定向到了abc.com。

在本例中，这个配置应该是黑客所为，把google蜘蛛指向某个网站，等于伪造PR。

三、临时错误页面

当你的网站在升级、修改的时候，你最好让访客转到指定的页面，而不是没做完的页面或者是错误页。这时我们做一个302转跳就OK啦。

```ini
RewriteEngine on
RewriteCond %{REQUEST_URI} !/maintenance.html$
RewriteCond %{REMOTE_ADDR} !^123\.123\.123\.123
RewriteRule $ /error.html [R=302,L]</blockquote>
```

1. 继续打开Rewrite功能。 – -|
2. REQUEST_URI，请求的URL值。这里指所有访问 maintenance.html页面的请求。
3. REMOTE_ADDR，向服务器发送请求的IP地址。本例中此处应设为你自己的 IP，这样就只有你能访问。
4. RewriteRule指令。本例中把这些请求都重定向到了error.html 。

在本例，我们总结几个常用的正则表达式和特殊符号。

* ```(.*) ```用于匹配某一区域内所有内容。如 ```abc/def/ghi``` 可用 ```(.*)\/(.*)\/(.*)```匹配。
* ```([a-zA-Z_]+) ```匹配英文单词，允许用-和_连接。
* ```([0-9]+) ```匹配多位数字，通常用于匹配ID。
* ```([0-9]) ```只匹配一位的数字。
* ```^ ```表示正则的开始
* ```$``` 表示正则的结束

四、重定向WordPress的RSS Feed链接地址到Feedburner地址

除了可以更改模板里的RSS地址外，.htaccess也能实现RSS地址的更改，并更加方便。

```ini
RewriteEngine on
RewriteCond %{HTTP_USER_AGENT} !FeedBurner    [NC]
RewriteCond %{HTTP_USER_AGENT} !FeedValidator [NC]
RewriteRule ^feed/?([_0-9a-z-]+)?/?$ http://feeds2.feedburner.com/yourname [R=302,NC,L]
```

有了上面的总结，本例其实就很简单了吧。

唯一要注意的是这样操作要确保填写正确的```HTTP_USER_AGENT```。其实你不常换模板的话。可能还是直接改模板更省事。

在最后，为懒虫们推荐几个好东东：

在线```.htaccess```生成器：htaccessEditor

```在线正则表达式```检查器：http://www.sman.cn/Blog/attachments/month_0711/320071117123354.html

```mod_rewrite```模块中文参考手册：http://man.chinaunix.net/newsoft/Apache2.2_chinese_manual/mod/mod_rewrite.html

其实```rewrite```也只是```APACHE```一个模块而已，做到边查边写足矣，实在不行直接去搜一个规则也未尝不可。不过其中的正则表达式还是非常实用的，值得深入学习。
