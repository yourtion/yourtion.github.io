---
author: Yourtion
comments: true
date: 2010-12-15 09:21:02+00:00
excerpt: 因为最近在使用深喉咙开发，但是一个要求比较高的网站，要做管理员日志，所以只有自己开发日志模块
layout: post
slug: shlcms-administrator-logs-module
title: 为shl（深喉咙）CMS创建管理员日志模块
wordpress_id: 1633
categories:
- PHP
tags:
- SHLCMS
---
{% include JB/setup %}

因为最近在使用深喉咙开发，但是一个要求比较高的网站，要做管理员日志，所以只有自己开发日志模块。

[![]({{ IMAGE_PATH }}2010/12/weblog-300x111.jpg)]({{ IMAGE_PATH }}2010/12/weblog.jpg)

创建数据表：


-- 表的结构 'web_log'

[![]({{ IMAGE_PATH }}2010/12/weblogdb-300x89.jpg)]({{ IMAGE_PATH }}2010/12/weblogdb.jpg)

```sql
DROP TABLE IF EXISTS web_log;
CREATE TABLE IF NOT EXISTS web_log (
id int(11) NOT NULL AUTO_INCREMENT,'name' varchar(64) CHARACTER SET utf8 NOT NULL,
func varchar(128) CHARACTER SET utf8 NOT NULL,
date datetime NOT NULL,
events varchar(128) CHARACTER SET utf8 NOT NULL,
ip varchar(64) CHARACTER SET utf8 NOT NULL,
PRIMARY KEY (id)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;</blockquote>
```

**注意引号换为半角
注意把web_log中的web_前缀改为你的数据表前缀。然后执行**

其中```http://你的CMS目录/inc/models/```

生成```log```数据表的```models```类。

下载：weblog模块替换到深喉咙安装目录：[weblog模块](http://dl.dbank.com/c08i39tb4a)

这样安装就基本完成了。

我已经在```login```里面添加了日志选项，接下来我会写在其他地方添加日志的教程，敬请期待~~~~~~
