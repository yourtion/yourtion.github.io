---
author: Yourtion
comments: true
date: 2010-11-03 02:22:49+00:00
excerpt: 在用新浪SAE做一个Jquery的微博，但是MySQL的连接一直有问题。因为没有用新浪SAE提供的基于mysql模块的SaeMysql类，只是用MySQL的connect
layout: post
slug: sina-sae-connection-mysql
title: 新浪SAE中MySQL的连接
wordpress_id: 1588
categories:
- 新浪SAE
tags:
- MySql
- SAE
---
{% include JB/setup %}

在用新浪SAE做一个Jquery的微博，但是MySQL的连接一直有问题。

因为没有用新浪SAE提供的基于mysql模块的SaeMysql类，只是用MySQL的connect

新浪那边提供的MySQL连接信息：

```php
Host: $_SERVER['HTTP_MYSQLPORT'].mysql.sae.sina.com.cn
Port: $_SERVER['HTTP_MYSQLPORT']
```

如果直接用

```php
$query=mysql_connect($_SERVER['HTTP_MYS
QLPORT'].mysql.sae.sina.com.cn,DB_USER,DB_PASSWORD);
```

会提示：

```php
SAE_Warning: mysql_connect() [function.mysql-connect]: Unknown MySQL server host '3308mysqlsaesinacomcn' (1) in index.php on line 14
```

研究了很久，得出连接字符串应该这么写

```
define('DB_HOST',$_SERVER['HTTP_MYSQL
PORT'].'.mysql.sae.sina.com.cn:'.$_SERVER['HTTP_MYSQLPORT']);

$query=mysql_connect(DB_HOST,DB_USER,DB_PASSWORD);
```

这样就可以成功连接和使用MySQL了·······

希望对你有帮助哦····
