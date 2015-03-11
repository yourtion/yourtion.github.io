---
author: Yourtion
comments: true
date: 2011-07-15 11:48:47+00:00
excerpt: 最近和Sobin在做一个精品课程的项目，因为用到一个固定的id作为表间关联，所以在前一个表插入数据后要把插入数据生成的自增id传递给下一个表。研究了一番决定使用Mysql提供了一个LAST_INSERT_ID（）的函数。
layout: post
slug: mysql-last-record-id
title: Mysql插入记录后返回该记录ID
wordpress_id: 2318
categories:
- PHP
tags:
- MySql
---
{% include JB/setup %}

最近和Sobin在做一个精品课程的项目，因为用到一个固定的id作为表间关联，所以在前一个表插入数据后要把插入数据生成的自增```id```传递给下一个表。研究了一番决定使用Mysql提供了一个```LAST_INSERT_ID()```的函数。

>```LAST_INSERT_ID()``` (with no argument) returns the first automatically generated value that was set for an ```AUTO_INCREMENT``` column by the most recently executed ```INSERT``` or ```UPDATE``` statement to affect such a column. For example, after inserting a row that generates an ```AUTO_INCREMENT``` value, you can get the value like this:

```sql
mysql> SELECT LAST_INSERT_ID();
-> 195
```

简单说来，就是这个函数将返回插入的那条记录在表中自增的那个字段的值，一般我们都给那个自增字段命名为ID。这样就可以返回刚插入的记录的ID值了。

一个简单的例子：

```php
$query="INSERT INTO `testtable` (`clou1`,`clou2`) VALUES ('testvalue','test')";
mysql_query($query);
$query="SELECT LAST_INSERT_ID()";
$result=mysql_query($query);
$rows=mysql_fetch_row($result);
echo $rows[0];
```

这个函数是基于```connection```的，也就是不会被其他客户端的```connection```影响到，所以结果是准确的。如果使用```select max(id) from table```,在高密度的插入请求下，是有可能出问题的，返回错误值
