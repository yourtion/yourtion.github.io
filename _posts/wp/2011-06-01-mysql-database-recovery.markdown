---
author: Yourtion
comments: true
date: 2011-06-01 00:01:02+00:00
excerpt: 创E的服务器在前段时间因为硬件问题彻底崩溃了，得到网络中心的支持将服务器迁移到学校刚刚搭建起来的虚拟化平台上，系统和asp+access数据库的网站因为保存在非系统盘所以在第一时间恢复，但是因为MySQL数据库是安装在系统里面，所以数据就一直没有空去弄它。今天花了一天时间，重装了N次MySQL
  Server终于成功将数据库恢复，但是权限问题尚未解决。先记下数据库恢复过程，权限问题稍候再说。
layout: post
slug: mysql-database-recovery
title: 系统崩溃后MySQL数据库恢复手记
wordpress_id: 2161
categories:
- 服务器
tags:
- MySQL
---
{% include JB/setup %}

创E的服务器在前段时间因为硬件问题彻底崩溃了，得到网络中心的支持将服务器迁移到学校刚刚搭建起来的虚拟化平台上，系统和asp+access数据库的网站因为保存在非系统盘所以在第一时间恢复，但是因为MySQL数据库是安装在系统里面，所以数据就一直没有空去弄它。

今天花了一天时间，重装了N次MySQL Server终于成功将数据库恢复，但是权限问题尚未解决。先记下数据库恢复过程，权限问题稍候再说。

一开始的做法是在原有系统中将原先保存```Data```的```ibdata1```覆盖到新装的```MySQL Data```目录里面，但是文件虽然变大，但是数据库并没有回来。参考了文章很多资料后，发现```ibdata1```只是保存了数据库中是数据，但是数据库的表结构是保存在另外的地方。

重新接上原来的硬盘，在```C:\Documents and Settings\All Users\Application Data\MySQL\MySQL Server 5.1\data```里面终于找到了原来的数据库结构和表结构文件，还是使用覆盖数据库文件的方式，先停用MySQL，再覆盖，但是之后就再也启动不了MySQL服务了。

然后尝试重装的时候将数据库的保存目录指定到拷贝出来的```Date```目录，安装后提示原来有数据文件，但是安装最后的配置就在一直没有成功，换了几次MySQL的版本也不行。

最后采取安装后选择性覆盖，将后期自己建立的表文件和```ibdata1```覆盖后启动成功，终于将数据库文件恢复，但是权限部分没有了。只能自己重建。比较麻烦···

最后介绍一下MySQL的备份与恢复

MySql的备份可用命令```mysqldump``` ，使用方法很简单，

```bash
mysqldump -u 用户名 -p (密码) -h 主机名 数据库名 >路径/备份名.bak；
```

同时也可以是用```mysqldump```到处数据结构(```tablename.sql```)和数据(```tablename.txt```)

```bash
mysqldump -u 用户名 -p (密码) -h 主机名 数据库名 tablename1 tablename2 > back.sql
或
mysqldump -u 用户名 -p (密码) -h 主机名 数据库名 --tab 路径 --opt 数据库名.
```

例如：

```bash
mysqldump -u pivot -p pivot news > c:\news.sql
```

那么还原可以mysql命令：

```bash
mysql -u 用户名 -p (密码) -h 主机名 --one-database 还原数据库名 < 路径/备份名.bak,--one-database是指定要恢复的数据库.
```

例如：

```bash
mysql -u pivot -p pivot news < c:\news.sql
```

(括号表示密码不先输入，在连接时在Enter password;若密码为空可缺省```-p```参数)
