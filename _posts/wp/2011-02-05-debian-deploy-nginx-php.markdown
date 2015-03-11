---
author: Yourtion
comments: true
date: 2011-02-05 14:15:21+00:00
excerpt: 前面已经介绍过Debian下的Nginx配置，继续配置PHP环境，但是针对其中出现的问题，进行更正修改。
layout: post
slug: debian-deploy-nginx-php
title: Debian下部署Nginx+PHP
wordpress_id: 1902
categories:
- VPS
tags:
- Debian
- Nginx
- PHP
---
{% include JB/setup %}

前面已经介绍过Debian下的Nginx配置，继续参考http://67054.blog.51cto.com/57054/128471配置PHP环境，但是针对其中出现的问题，进行更正修改。

1、首先修改nginx的配置文件

vim /etc/nginx/conf/nginx.conf


<blockquote>#user  nobody;
worker_processes  1;
#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;
#pid        logs/nginx.pid;
worker_rlimit_nofile 51200;                           //需要在shell下执行ulimit  -SHn  512 00
events {
use epoll;
worker_connections  51200;
}

http {
include       mime.types;
default_type  application/octet-stream;

server_names_hash_bucket_size 128;
client_header_buffer_size 32k;
large_client_header_buffers 4 32k;
log_format  access  '$remote_addr - $remote_user [$time_local] "$request" '
'"$status" $body_bytes_sent "$http_referer" '
'"$http_user_agent" "$http_x_forwarded_for"';
access_log  logs/access.log  access;
sendfile        on;
tcp_nopush     on;
#keepalive_timeout  0;
keepalive_timeout  60;

tcp_nodelay on;
#gzip  on;
server {
listen       80;
server_name  localhost;
#charset koi8-r;
#access_log  logs/host.access.log  main;
location / {
root   /home/web;
index  index.php index.html index.htm;
if (-f $request_filename/index.html){
rewrite (.*) $1/index.html break;
}
if (-f $request_filename/index.php){
rewrite (.*) $1/index.php;
}
if (-f $request_filename){
rewrite (.*) /index.php;
}
}
#error_page  404              /404.html;
# redirect server error pages to the static page /50x.html
#
error_page   500 502 503 504  /50x.html;
location = /50x.html {
root   html;
}
# proxy the PHP scripts to Apache listening on 127.0.0.1:80
#
#location ~ \.php$ {
#    proxy_pass   [url]http://127.0.0.1[/url];
#}
# pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000

location ~ \.php$ {
root           html;
fastcgi_pass   127.0.0.1:9000;
fastcgi_index  index.php;
fastcgi_param  SCRIPT_FILENAME  /home/web$fastcgi_script_name;    //home/web 为php网站的目录
include        fastcgi_params;
}
# deny access to .htaccess files, if Apache's document root
# concurs with nginx's one
#
#location ~ /\.ht {
#    deny  all;
#}
}

# another virtual host using mix of IP-, name-, and port-based configuration
#
#server {
#    listen       8000;
#    listen       somename:8080;
#    server_name  somename  alias  another.alias;
#    location / {
#        root   html;
#        index  index.html index.htm;
#    }
#}
# HTTPS server
#
#server {
#    listen       443;
#    server_name  localhost;
#    ssl                  on;
#    ssl_certificate      cert.pem;
#    ssl_certificate_key  cert.key;
#    ssl_session_timeout  5m;
#    ssl_protocols  SSLv2 SSLv3 TLSv1;
#    ssl_ciphers  ALL:!ADH:!EXPORT56:RC4+RSA:+HIGH:+MEDIUM:+LOW:+SSLv2:+EXP;
#    ssl_prefer_server_ciphers   on;
#    location / {
#        root   html;
#        index  index.html index.htm;
#    }
#}
}</blockquote>


以上是我的nginx.conf文件内容

2、安装php5-cgi模块


<blockquote>apt-get install php5-cgi php5-gd php5-curl</blockquote>


修改/etc/php5/cgi/php.ini文件，里面有一项cgi.fix_pathinfo数据为1，默认为0 cgi.fix_pathinfo=1; 这样php5-cgi方能正常使用SCRIPT_FILENAME这个变量。
这里还要装一个php加速的软件ZendOptimizer，在输入php.ini位置的时候输入


<blockquote>/etc/php5/cgi/</blockquote>


3、安装spawn-fcgi spawn-fcgi是lighttpd的一个用来控制php-cgi的工具
如果系统没有安装GCC编译环境，刚需要在安装lighttpd之前要安装build-essential工具包，执行以下

命令


<blockquote>aptitude install build-essential  libpcre3-dev
wget http://www.lighttpd.net/download/spawn-fcgi-1.6.3.tar.gz
tar -zxf spawn-fcgi-1.6.3.tar.gz
cd spawn-fcgi-1.6.3
./configure --bindir=/usr/bin --libdir=/usr/lib --prefix=/etc
make&&make install</blockquote>


这样cgi控制器就安装完成了。

4、启动cgi


<blockquote>spawn-fcgi -a 127.0.0.1 -p 9000 -C 5 -u www -g www -f /usr/bin/php5-cgi</blockquote>


注意:ip,端口与nginx服务器中的fastcgi-pass要对应. -C表示打开几个cgi进程
启动nginx ，在启动之前先测试下配置文件是否正确


<blockquote>nginx -t -c /etc/nginx/conf/nginx.conf
2009/02/03 15:27:12 [info] 21782#0: the configuration file /etc/nginx/conf/nginx.conf syntax is ok
2009/02/03 15:27:12 [info] 21782#0: the configuration file /etc/nginx/conf/nginx.conf was tested successfully</blockquote>


出现以上信息说明配置文件准确。


<blockquote>/etc/init.d/nginx start</blockquote>


好了，如果没有出错信息，则说明配置成功了，现在写个phpinfo测试下吧


<blockquote>cd /home/web
nano index.php</blockquote>


输入

```
<?php
phpinfo();
?>
```

保存。
测试是否出现phpinfo


<blockquote>lynx http://127.0.0.1/index.php</blockquote>


或者用其它机器访问本机
完成!
