---
author: Yourtion
comments: true
date: 2013-12-10 15:21:51+00:00
excerpt: 考虑到数据安全问题，准备把服务器上的数据库迁移到刚刚挂载的云硬盘上，研究一下，这个方法是最靠谱的，分享之
layout: post
slug: migration-mysql-database-position
title: Ubuntu下迁移MySQL数据库位置
wordpress_id: 3927
categories:
- 服务器
tags:
- MySql
---
{% include JB/setup %}

考虑到数据安全问题，准备把服务器上的数据库迁移到刚刚挂载的云硬盘上，研究一下，这个方法是最靠谱的，分享之！

首先建立数据库即将迁移到的目录

```
mkdir /media/hdb1/db
```

复制linux下原数据到新目录下

```
cp -dpR /var/lib/mysql/* /media/hdb1/db
```

给新目录重命属性

```
chown mysql:mysql /media/hdb1/db
```

修改文件"/etc/apparmor.d/usr.sbin.mysqld"

```
sudo vim /etc/apparmor.d/usr.sbin.mysqld
```

把


<blockquote>/var/lib/mysql r,
/var/lib/mysql/** rwk,</blockquote>


改成


<blockquote>/media/hdb1/db r,
/media/hdb1/db/** rwk,</blockquote>


修改目录

```
sudo vim /etc/mysql/my.cnf
```

如


<blockquote>datadir = /var/mysql</blockquote>


换成


<blockquote>datadir = /media/hdb1/db</blockquote>


再开服务器

```
sudo /etc/init.d/apparmor restart sudo /etc/init.d/mysql restart
```

大功告成！！！！
