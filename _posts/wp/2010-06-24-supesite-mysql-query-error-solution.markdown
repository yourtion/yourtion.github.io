---
author: Yourtion
comments: true
date: 2010-06-24 17:12:25+00:00
excerpt: '在安装supesite6.0/x-space4.0后登陆个人空间时，出现这样的错误:SupeSite info: MySQL Query Error Error: Table ''discuz.[Table]mythreads'' doesn''t exist Errno.: 1146 解决方法'
layout: post
slug: supesite-mysql-query-error-solution
title: 'SupeSite info: MySQL Query Error解决方法'
wordpress_id: 1244
categories:
- 康盛
tags:
- MySql
---
{% include JB/setup %}

在安装supesite6.0/x-space4.0后登陆个人空间时，出现这样的错误:

```sql
SupeSite info: MySQL Query Error

User: Guest
Time: 2010-5-10 1:21pm
Script: /xspace/index.php

SQL: SELECT t.tid, t.author, t.subject, t.fid, t.views, t.replies, t.dateline, t.lastpost FROM `discuz`.`[Table]mythreads` m, `discuz`.`[Table]threads` t WHERE m.uid='1' AND m.tid=t.tid AND t.displayorder>=0 AND t.author!='' ORDER BY t.tid DESC LIMIT 0,10
Error: Table 'discuz.[Table]mythreads' doesn't exist
Errno.: 1146
```

这是表缺失的关系，可以通过在phpMyadmin执行以下语句：

```sql
CREATE TABLE IF NOT EXISTS `cdb_myposts` (
`uid` mediumint(8) unsigned NOT NULL default '0',
`tid` mediumint(8) unsigned NOT NULL default '0',
`pid` int(10) unsigned NOT NULL default '0',
`position` smallint(6) unsigned NOT NULL default '0',
`dateline` int(10) unsigned NOT NULL default '0',
`special` tinyint(1) unsigned NOT NULL default '0',
PRIMARY KEY  (`uid`,`tid`),
KEY `tid` (`tid`,`dateline`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `cdb_mythreads` (
`uid` mediumint(8) unsigned NOT NULL default '0',
`tid` mediumint(8) unsigned NOT NULL default '0',
`special` tinyint(1) unsigned NOT NULL default '0',
`dateline` int(10) NOT NULL default '0',
PRIMARY KEY  (`uid`,`tid`),
KEY `tid` (`tid`,`dateline`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

```

新建表就行。

注意：如果是```gbk```的把```utf8```替换成```gbk```，还有就是cdb是你论坛数据库的前缀~

如果有改论坛数据库前缀的也要注意更改。
