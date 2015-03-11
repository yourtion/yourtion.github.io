---
author: Yourtion
comments: true
date: 2011-02-03 13:42:05+00:00
excerpt: 之前介绍了LNMP的一键安装，但是因为VPS的内存太小，在256M下面同时运行Nginx和Mysql会爆内存，所以决定分开两部服务器。一部做前端，一部做数据库。
layout: post
slug: nginx-debian
title: Debian下快速部署Nginx
wordpress_id: 1896
categories:
- VPS
tags:
- Debian
- Nginx
---
{% include JB/setup %}

之前介绍了```LNMP```的一键安装，但是因为VPS的内存太小，在256M下面同时运行Nginx和Mysql会爆内存，所以决定分开两部服务器。一部做前端，一部做数据库。

参考了：http://67054.blog.51cto.com/57054/128245 ，之后成功在```Debian```下面部署```Nginx```。分享一下：

首先不需要太多包，只需要 ```pcre```, ```ssl``` and ```zlib```

```bash
aptitude install libpcre3 libpcre3-dev libpcrecpp0 libssl-dev zlib1g-dev
```


现在，我们可以下载源代码了。如下

```bash
cd  /home
wget  http://sysoev.ru/nginx/nginx-0.7.30.tar.gz
tar -zxvf nginx-0.7.30.tar.gz
cd nginx-0.7.30
./configure --sbin-path=/usr/local/sbin --with-http_ssl_module  --with-http_stub_status_module
```

最后会显示

```bash
Configuration summary
+ using system PCRE library
+ using system OpenSSL library
+ md5 library is not used
+ sha1 library is not used
+ using system zlib library
nginx path prefix: "/usr/local/nginx"
nginx binary file: "/usr/local/sbin"
nginx configuration prefix: "/usr/local/nginx/conf"
nginx configuration file: "/usr/local/nginx/conf/nginx.conf"
nginx pid file: "/usr/local/nginx/logs/nginx.pid"
nginx error log file: "/usr/local/nginx/logs/error.log"
nginx http access log file: "/usr/local/nginx/logs/access.log"
nginx http client request body temporary files: "/usr/local/nginx/client_body_temp"
nginx http proxy temporary files: "/usr/local/nginx/proxy_temp"
nginx http fastcgi temporary files: "/usr/local/nginx/fastcgi_temp"
```

继续

```bash
make&&make install
```

现在来创建一个启动脚本

```bash
nano /etc/init.d/nginx
```

然后插入以下脚本

```bash
#! /bin/sh
### BEGIN INIT INFO
# Provides:          nginx
# Required-Start:    $all
# Required-Stop:     $all
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-De.ion: starts the nginx web server
# De.ion:       starts nginx using start-stop-daemon
### END INIT INFO
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin
DAEMON=/usr/local/sbin/nginx
NAME=nginx
DESC=nginx
test -x $DAEMON || exit 0
# Include nginx defaults if available
if [ -f /etc/default/nginx ] ; then
    . /etc/default/nginx
fi
set -e
case "$1" in
start)
	echo -n "Starting $DESC: "
	start-stop-daemon --start --quiet --pidfile /usr/local/nginx/logs/nginx.pid \
	--exec $DAEMON -- $DAEMON_OPTS
	echo "$NAME."
	;;
stop)
	echo -n "Stopping $DESC: "
	start-stop-daemon --stop --quiet --pidfile /usr/local/nginx/logs/nginx.pid \
	--exec $DAEMON
	echo "$NAME."
	;;
restart|force-reload)
	echo -n "Restarting $DESC: "
	start-stop-daemon --stop --quiet --pidfile \
	/usr/local/nginx/logs/nginx.pid --exec $DAEMON
	sleep 1
	start-stop-daemon --start --quiet --pidfile \
	/usr/local/nginx/logs/nginx.pid --exec $DAEMON -- $DAEMON_OPTS
	echo "$NAME."
	;;
reload)
	echo -n "Reloading $DESC configuration: "
	start-stop-daemon --stop --signal HUP --quiet --pidfile /usr/local/nginx/logs/nginx.pid \
	--exec $DAEMON
	echo "$NAME."
	;;
*)
N=/etc/init.d/$NAME
echo "Usage: $N {start|stop|restart|force-reload}" >&2
exit 1
;;
esac
exit 0
;;
*)
N=/etc/init.d/$NAME
echo "Usage: $N {start|stop|restart|force-reload}" >&2
exit 1
;;
esac
exit 0
```

继续

添加脚本到系统默认运行级别

```bash
/usr/sbin/update-rc.d -f nginx defaults
```

由于nginx是安装在```/usr/local/```，可以链接到我们常用的```/etc/```下

```bash
ln -s /usr/local/nginx  /etc/nginx
```

现在可以运行nginx了

```bash
/etc/init.d/nginx start
```

继续

```bash
curl http://localhost
```

或者用局域网其它机器访问本机,如果出现

>Welcome to nginx!

说明nginx安装成功了。
