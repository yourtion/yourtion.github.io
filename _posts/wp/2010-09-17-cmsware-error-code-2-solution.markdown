---
author: Yourtion
comments: true
date: 2010-09-17 08:41:19+00:00
excerpt: 今天下午学校主页突然模版不正常了~显示图片出错~然后提示：  [CMS] Template Running Error, click here to
  learn more.
layout: post
slug: cmsware-error-code-2-solution
title: 'CMSWare Error code: 2 问题解决方法'
wordpress_id: 1512
categories:
- PHP
tags:
- CMSware
- 解决问题
---
{% include JB/setup %}

今天下午学校主页突然模版不正常了~显示图片出错~然后提示：


>[CMS] Template Running Error, click here to learn more.


但是在此之前并没有动过网站和服务器~详细出错内容如下：

```
[CMS] Template Running Error, click here to learn more.
Exception message: fopen(http://newsadmin.jyu.edu.cn/resource/img/h000/h04/img201008132155131.jpg) [function.fopen]: failed to open stream: operation failed
Error code: 2
-- Backtrace --
(): TemplateError.handler
/srv/httpd/htdocs/cmsware/include/functions.php5.php(1246): fopen
/srv/httpd/htdocs/cmsware/sysdata/templates_c/%%c_^@templates@jiada@index1003.htm(128): AutoMini
/srv/httpd/htdocs/cmsware/include/lib/kTemplate/kTemplate.class.php(347): include
/srv/httpd/htdocs/cmsware/include/lib/kTemplate/kTemplate.class.php(546): kTemplate._fetch
/srv/httpd/htdocs/cmsware/include/admin/publishAdmin.class.php(2183): kTemplate.fetch
/srv/httpd/htdocs/cmsware/admin/admin_task.php(250): publishAdmin.refreshIndex
```

很明显是图片打不开导致的~但是之前是完全没问题的~刚刚添加的新闻删除页没有效果~

研究了很久~官方的意思是：可能原因及解决方案：你的服务器环境不能解析域名，请检查是不是服务器的dns服务解析的问题。

原来是学校的一个DNS服务器突然挂了~导致解析不正常~

将图片改成相对路径发布~问题解决~~
