---
author: Yourtion
comments: true
date: 2010-01-26 13:12:42+00:00
layout: post
slug: wap-access-and-manage-wordpress
title: WordPress的WAP访问与管理
wordpress_id: 295
categories:
- WordPress技术
tags:
- WordPress
---
{% include JB/setup %}

我们不是任何时候都有机会通过宽带上网，但是一般都会将手机随身携带，通过手机查看更新博客似乎是一个不错的选择，今天要介绍的这个插件wp-t-wap就是wordpress博客手机更新的好工具。


### WP-T-WAP的作用


方便的进行wordpress博客手机的管理与使用。具体功能有：

  * 浏览、添加、修改、删除文章
  * 浏览、发表、删除、审批评论
  * 发布图文日志（发布时附带一张图片）
  * 单个文章分页显示（在需要分页的地方添加“<!–nextpage–>”的HTML代码）
  * 日志保存为草稿
  * 显示相邻文章链接
  * 首页显示最新评论
  * 首页显示热门文章（需要安装WP-PostViews插件）
  * 相关文章（需要安装WP 2.3 Related Posts插件）
  * 分类文章列表
  * 标签文章列表
  * 自定义WAP网站标题
  * 中英文双语国际化
  * 域名绑定
  * 支持 Wordpress MU
  * 支持 imax-width 插件

### WP-T-WAP的使用方法

1、安装

解压到 plugins  目录（```plugins/wp-t-wap/*.*```），然后启动插件即可通过类似http://www.mysite.com/wap 或 http://www.mysite.com/wap/index.php 的地址访问。

（**注意**：必须有读写  WP 站点根目录的 wap 目录的权限，否则，将安装失败。）

2、设置

WP 网站后台的“常规设置”->“WAP 插件”里（WP 2.5 中稍有不同），可设置“显示方式”、“自定义标题”和“版本信息”。

3、绑定域名

直接将域名绑定到 WP 站点根目录的 “wap” 目录上。例如，WP 站点根目录是 ```/usr/http/www``` ，那么应该将 ```wap.mysite.com```  域名绑定到 ```/usr/http/www/wap```  目录上。

（一般先在网站的“虚拟主机”管理界面中绑定域名到目录，然后到“域名管理”中添加域名解析）


### WP-T-WAP作者及下载

这又是一款国人开发的优秀插件，作者为[TangGaowei](http://www.tanggaowei.com/)。

下载地址：[http://wordpress.org/extend/plugins/wp-t-wap/](http://wordpress.org/extend/plugins/wp-t-wap/)

另外，推荐一个手机访问可以自动跳转的插件：


## Go2Wap

=== Go2Wap (a plugin for Wordpress)===
Author: Neekey
Version  1.0.0
支持Wordpress 2.3以上,支持最新Wordpress 2.6

将 go2wap.php 放置于Wordpress插件目录 ‘/wp-content/plugins/’下并在后台启用该插件.

Bug report,discuss:http://photozero.net/go2wap_news

Bug,建议,意见反馈:http://photozero.net/go2wap_news

</blockquote>







