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

之前介绍了LNMP的一键安装，但是因为VPS的内存太小，在256M下面同时运行Nginx和Mysql会爆内存，所以决定分开两部服务器。一部做前端，一部做数据库。

参考了：http://67054.blog.51cto.com/57054/128245，之后成功在Debian下面部署Nginx。分享一下：

Nginx (“engine x”) 是俄罗斯人Igor Sysoev(塞索耶夫)编写的一款高性能的 HTTP 和反向代理服务器。

Nginx 已经在俄罗斯最大的门户网站── Rambler Media（www.rambler.ru）上运行了3年时间，同时俄罗斯超过20%的虚拟主机平台采用Nginx作为反向代理服务器。

在国内，已经有 新浪博客、新浪播客、网易新闻、六间房、56.com、Discuz!、水木社区、豆瓣、YUPOO、海内、迅雷在线 等多家网站使用 Nginx 作为Web服务器或反向代理服务器。

下面开始在debian 下部署nginx

首先不需要太多包，只需要 pcre, ssl and zlib


<blockquote>aptitude install libpcre3 libpcre3-dev libpcrecpp0 libssl-dev zlib1g-dev</blockquote>


现在，我们可以下载源代码了。如下


<blockquote>cd  /home
wget  http://sysoev.ru/nginx/nginx-0.7.30.tar.gz
tar -zxvf nginx-0.7.30.tar.gz
cd nginx-0.7.30
./configure --sbin-path=/usr/local/sbin --with-http_ssl_module  --with-http_stub_status_module</blockquote>


最后会显示


<blockquote>Configuration summary
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
nginx http fastcgi temporary files: "/usr/local/nginx/fastcgi_temp"</blockquote>


继续


<blockquote>make&&make install</blockquote>


现在来创建一个启动脚本


<blockquote>nano /etc/init.d/nginx</blockquote>


然后插入以下脚本


<blockquote>#! /bin/sh
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
exit 0</blockquote>


继续
添加脚本到系统默认运行级别


<blockquote>/usr/sbin/update-rc.d -f nginx defaults</blockquote>


由于nginx是安装在/usr/local/，可以链接到我们常用的/etc/下


<blockquote>ln -s /usr/local/nginx  /etc/nginx</blockquote>


现在可以运行nginx了


<blockquote>/etc/init.d/nginx start</blockquote>


继续


<blockquote>lynx http://localhost</blockquote>


或者用局域网其它机器访问本机,如果出现


<blockquote>Welcome to nginx!</blockquote>


说明nginx安装成功了。
