---
author: Yourtion
comments: true
date: 2013-10-17 03:44:41+00:00
excerpt: 关于rsync的服务器端和客户端一直整不太明白，看到很多都是服务器端向客户端推备份数据，考虑了一下，因为数据分散在很多服务器上，希望简单的配置让各个服务器的数据汇总到备份服务器上，也就是备份服务器作为服务器端，接受来自客户端的数据。
layout: post
slug: rsync-client-to-server-backup
title: rsync客户端向服务端备份
wordpress_id: 3912
categories:
- 服务器
tags:
- Linux
---
{% include JB/setup %}

关于rsync的服务器端和客户端一直整不太明白，看到很多都是服务器端向客户端推备份数据，考虑了一下，因为数据分散在很多服务器上，希望简单的配置让各个服务器的数据汇总到备份服务器上，也就是备份服务器作为服务器端，接受来自客户端的数据。

安装sync：在CentOS服务器，我们可以执行以下命令安装

```bash
yum install rsync
```

对于debian、ubuntu服务器，则是以下命令

```bash
sudo apt-get install rsync
```

服务器端的设置

首先，服务器端（192.168.2.100）及客户端（192.168.2.199）都需要安装rsync，以root用户登录，重点在配置服务器端上；

需要两个配置，一个是主配置文件```rsyncd.conf``` ，另一个是设定客户端访问服务器端的用户名密码信息的文件，名称任意，只要主配置文件中指定正确即可，这里命名为```rsync.pwd```；

我们把主配置文件```rsyncd.conf``` 放置在```/etc/```目录下，内容如下：

```ini
# Minimal configuration file for rsync daemon
# See rsync(1) and rsyncd.conf(5) man pages for help
# This line is required by the /etc/init.d/rsyncd script
pid file = /var/run/rsyncd.pid
uid = backup
gid = root   
use chroot = yes
read only = no 

#limit access to private LANs
hosts allow=192.168.2.0/255.255.255.0
hosts deny=*

max connections = 5

#This will give you a separate log file
#log file = /var/log/rsync.log

#This will log every file transferred - up to 85,000+ per user, per sync
#transfer logging = yes

log format = %t %a %m %f %b
syslog facility = local3
timeout = 300

[files]
path = /home/backup/file
list=yes
ignore errors
auth users = backup
secrets file = /etc/rsync.pwd

[data]
path = /home/backup/data
list=yes
ignore errors
auth users = backup
secrets file = /etc/rsync.pwd
```

另一个文件（```rsync.pwd```）为客户端向服务器端传输文件时的用户名及口令，我们就将它新建成rsync.pwd便于识别，我也将他放置在```/etc/```目录下；

内容这样写，前面是用户名，后面是客户端访问的密码

```bash
backup:backup
```

将两个文件的权限设置为```600```，如下：

```bash
sudo chmod 600 /etc/rsyncd.conf
sudo chmod 600 /etc/rsync.pwd
```

启动服务器端的rsync：

```bash
sudo rsync --daemon
```

接下来是客户端设置，新建一密码文件```rsync.pass```，内容写入与主配置```rsync.pwd```内密码一致的内容，即：backup，将此文件放置在/etc目录下

例如我们需要将客户端目录下的/www/myfile 目录备份至服务器，可以使用如下命令：

```bash
rsync -aSvH --password-file=/etc/rsync.pass /www/myfile tadu@192.168.2.100::files
```

可以列出传输的文件，待传输完毕，我们去服务器端的```/home/backup/file```目录查看，可以看到```myfile```目录已经备份过来了。


