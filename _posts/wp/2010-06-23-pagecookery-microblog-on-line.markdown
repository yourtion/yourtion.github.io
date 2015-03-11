---
author: Yourtion
comments: true
date: 2010-06-23 09:59:00+00:00
excerpt: 经过一整天的努力~我的PageCookery微博http://t.yourtion.com正式上线啦~大家多多支持~它也会同时同步到新浪微博和嘀咕哦·介绍一下PageCookery先~然后是安装教程~http://pagecookery.com/
layout: post
slug: pagecookery-microblog-on-line
title: 我的PageCookery微博上线啦~
wordpress_id: 1232
categories:
- PageCookery
tags:
- PageCookery
---
{% include JB/setup %}

经过一整天的努力~我的PageCookery微博 http://t.yourtion.com 正式上线啦~

大家多多支持~它也会同时同步到新浪微博和嘀咕哦·~~~

介绍一下PageCookery先~然后是安装教程~http://pagecookery.com/


>PageCookery 是一款国产的微博客，采用 Php+Mysql 架构而成，是国内首款公开发行的单用户版微薄程序，目前已支持 digu.com 双向同步，支持发送博文至 Wordpress。


[![]({{ IMAGE_PATH }}2010/06/PageCookery.png)]({{ IMAGE_PATH }}2010/06/PageCookery.png)

安装教程：

一、上传安装文件。

和其他博客程序一样，到官网下载PageCookery的最新安装程序，通过FTP上传到主机空间，当然还需要设置访问该微博的二级域名或者是二级目录，至于用哪个可根据自己情况来选择；

二、修改```config.php```配置文件。

根据文件中的注释说明填写相关内容，当然前提是你已经创建一个数据库；

微博的Title也是在这里设置，最后保存。需要注意的是必须将该文件保存为```utf-8```格式；

```php
############ 数据库配置 ############
// 数据库主机
define(DATABASE_HOST, 'localhost');
// 数据库用户名
define(DATABASE_USER, '****');
// 数据库密码
define(DATABASE_PSSWORD, '***');
// 数据库名称
define(DATABASE_DB_NAME, '****');
############ 站点配置 ############
// 网站名称
define(SITE_NAME, 'Yourtion Say');
// 微博访问路径, 请以 / 结尾
define(BASE_URL, 'http://t.yourtion.com/');
############  下面的内容无需修改 ############
define(COOKERY_FRAMEWORK_DIR, './');
define(DEBUG, FALSE);
define(COOKIE_PREFIX, substr(strtoupper(md5($_SERVER['HTTP_HOST'])), 0, 6) . '_');
```

三、设置目录和文件权限。

设置cache目录、```rss.xml```，```music.json```，```photos.json```文件为属性权限为 777；

四、导入数据表。

登录到已经创建的数据库中选择```导入（import）```，浏览```sql/install/database.sql```，设置文件字符集为```utf-8```。

执行成功后，将有7张表导入到数据库中；

五、安装。

准备就绪，接下来就访问你设置的地址进行安装吧。输入一个用户名和密码登录即可进入系统，还等什么，赶快来一条试试吧。
