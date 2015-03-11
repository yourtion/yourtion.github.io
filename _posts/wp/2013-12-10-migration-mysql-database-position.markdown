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

```bash
mkdir /media/hdb1/db
```

复制linux下原数据到新目录下

```bash
cp -dpR /var/lib/mysql/* /media/hdb1/db
```

给新目录重命属性

```bash
chown mysql:mysql /media/hdb1/db
```

修改文件"```/etc/apparmor.d/usr.sbin.mysqld```"

```bash
sudo vim /etc/apparmor.d/usr.sbin.mysqld
```

把

```bash
/var/lib/mysql r,
/var/lib/mysql/** rwk,
```

改成

```bash
/media/hdb1/db r,
/media/hdb1/db/** rwk,</blockquote>
```

修改目录

```bash
sudo vim /etc/mysql/my.cnf
```

如```datadir = /var/mysql```换成```datadir = /media/hdb1/db```


再开服务器

```bash
sudo /etc/init.d/apparmor restart sudo /etc/init.d/mysql restart
```

大功告成！！！！
