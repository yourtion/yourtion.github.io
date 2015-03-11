---
author: Yourtion
comments: true
date: 2013-09-10 03:54:09+00:00
excerpt: 一步步在Ubuntu12.04server上自己编译PHP5.3，比繁琐，共享之。
layout: post
slug: ubuntu12-compile-php5-3
title: Ubuntu12编译PHP5.3
wordpress_id: 3894
categories:
- 服务器
tags:
- Linux
- PHP
---
{% include JB/setup %}

最近项目遇到一个坑爹的事情，一个源码必须使用PHP5.3，但是现在Ubuntu上自带的版本是5.4，降级之后会出各种奇怪的问题，最后没办法，只能一步步在Ubuntu12.04server上自己编译PHP5.3，比繁琐，共享之。

安装Apache2.2

```
sudo apt-get install apache2 -y
```

然后安装MySQL5.5

```
sudo apt-get install mysql-server-5.5 -y
```

接着就是编译依赖环境：

```
 sudo apt-get install gcc g++ autoconf build-essential -y
```

相关的lib支持库：

```
sudo apt-get install libxml2 libxml2-dev libevent-1.4-2 libevent-dev bzip2 libbz2-dev libcurl3-gnutls libcurl4-gnutls-dev libpng12-0 libpng12-dev libjpeg62 libjpeg62-dev libfreetype6 libfreetype6-dev libmcrypt4 libmcrypt-dev zlib1g-dev libtidy-dev libmysqlclient-dev  -y
```

安装：

```
./configure --prefix=/usr/local/php --with-mcrypt --with-gettext --with-mysql --with-gd --with-jpeg-dir --with-png-dir --with-curl --with-freetype-dir --enable-gd-native-ttf --enable-mbstring --enable-sockets --with-pdo-mysql --enable-fpm --with-zlib --enable-zip --with-bz2 --enable-bcmath --with-tidy --with-fpm-user=daemon --with-fpm-group=daemon

sudo make

sudo make install
```

然后安装cli和dev：

```
sudo apt-get install php5-cli php5-dev
```

最后开启Apache2支持：

```
sudo apt-get install libapache2-mod-php5
```

最后就大功告成了~
