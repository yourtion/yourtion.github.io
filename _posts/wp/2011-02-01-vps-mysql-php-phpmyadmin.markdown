---
author: Yourtion
comments: true
date: 2011-02-01 03:09:50+00:00
excerpt: 最近申请了免费的VPS主机在练手，所以想在上面安装一个LAMP环境，但是鉴于内存只有256，相当有限，而且CPU配置比较低，只能投靠Nginx的怀抱。
layout: post
slug: vps-mysql-php-phpmyadmin
title: VPS LNMP(Nginx、MySQL、PHP、phpMyAdmin)一键安装配置
wordpress_id: 1890
categories:
- VPS
tags:
- Debian
- MySQL
- Nginx
- PHP
---
{% include JB/setup %}

最近申请了免费的VPS主机在练手，所以想在上面安装一个LAMP环境，但是鉴于内存只有256，相当有限，而且CPU配置比较低，只能投靠Nginx的怀抱。

在网上找到一个LNMP的集成环境安装包，很不错，和大家分享一下。http://lnmp.org

```LNMP```一键安装包是一个用```Linux Shell```编写的可以为```CentOS/RadHat```、```Debian/Ubuntu VPS(VDS)```或独立主机安装```LNMP```(```Nginx```、```MySQL```、```PHP```、```phpMyAdmin```)生产环境的Shell程序。


### 我们为什么需要它?


编译安装需要输入大量的命令，如果是配置生产环境需要耗费大量的时间。
不会Linux的站长或Linux新手想使用Linux作为生产环境……


### 它有什么优势?

无需一个一个的输入命令，无需值守，编译安装优化编译参数，提高性能，解决不必要的软件间依赖，特别针对VPS用户进行了优化。

### 安装哪些软件
	
  * Nginx
  * MySQL
  * PHP
  * PHPMyAdmin
  * Zend Optimizer
  * eAccelerator
  * Nginx-RRD
  * vsFTPd/PureFtpd

### 安装步骤:

1、下载LNMP一键安装包：

可以选择使用下载版(推荐国外或者美国VPS使用)或者完整版(推荐国内VPS使用)，如果使用下载版执行命令 wget -c http://soft.vpser.net/lnmp/lnmp0.5.tar.gz，如果使用完整版，执行命令 wget -c http://soft.vpser.net/lnmp/lnmp0.5-full.tar.gz，执行上述命令后LNMP一键安装包就会被下载到VPS上。

2、解压LNMP一键安装包：

执行```tar zxvf lnmp0.5.tar.gz ```或者```tar zxvf lnmp0.5-full.tar.gz``` 就会将LNMP一键安装包解压缩。

3、CentOS下安装步骤

下载版执行命令 ```cd lnmp0.5/``` ，完整版执行命令：```cd lnmp0.5-full/```

然后再执行```./centos.sh``` 也可以执行```./centos.sh | tee lnmp.log``` (推荐这种方式,出错时可以到论坛上传```lnmp.log```日志)，输入要绑定的域名，回车，再输入要设置的MySQL root的密码，再次回车确认。程序会自动安装编译Nginx、PHP、MySQL、phpMyAdmin、Zend这几个软件。

4、Debian/Ubuntu下安装步骤

下载版执行命令 ```cd lnmp0.5/``` ，完整版执行命令：```cd lnmp0.5-full/```
然后执行```./debian.sh``` 也可以执行```./debian.sh | tee lnmp.log ```(推荐这种方式,出错时可以到论坛上传lnmp.log日志)，输入要绑定的域名，回车，

再次输入VPS/服务器所在位置：asia、america、europe、oceania或africa，回车，再输入要设置的MySQL root的密码，回车后，再次回车确认。

程序会自动安装编译Nginx、PHP、MySQL、phpMyAdmin、Zend这几个软件。安装大约10分钟左右需要设置MySQL root用户的密码。


### 安装其他组件


1、安装eAccelerator，执行如下命令：./eaccelerator.sh 就会自动安装并重启web服务。

2、安装ionCube，执行如下命令：./ionCube.sh 就会自动安装并重启web服务。

3、安装PureFTPd和管理面板，执行如下命令：./pureftpd.sh 就会自动安装PureFTPd，安装完PureFTPd，需要在浏览器执行http://你的域名或IP/ftp/install.php 安装PureFTPd用户管理。详细教程参考：http://www.vpser.net/manage/lnmp-pureftpd-cp.html

4、安装VsFTPD，执行如下命令：./vsftpd.sh 就会自动安装上vsftpd，只需要执行命令：useradd -d /home/wwwroot -s /sbin/nologin adminftp 添加上帐号指定好ftp帐号的根目录，再执行：passwd adminftp 设置上密码，登录就可以了。


### 虚拟主机管理


1、添加虚拟主机

执行如下命令：```/root/vhost.sh``` 根据提示输入要绑定的域名，回车，如果需要添加更多的域名，输入```y```，再输入要另外绑定的域名，多个域名可以用空格隔开。

再输入域名绑定的目录(绝对目录，如```/home/wwwroot/lnmp```，如果不填默认是```/home/wwwroot/绑定的域名```)，再选择是否添加伪静态规则，默认已经有了```Discuz```、```Wordpress```、```Sablog```、```emlog```、```dabr```，可直接输入以上名称即可，如果需要添加自定义伪静态规则，直接输入一个想要的名字，程序会自动创建伪静态文件，直接在```/usr/local/nginx/conf/你自定义的伪静态名字.conf``` 里面添加伪静态规则就行。接下来会提示是否需要启用日志功能，一般情况下不需要启动，直接输入```n```就行，如需启动，输入```y```，再输入要定义的日志文件名字，回车就会自动添加虚拟主机。

2、删除虚拟主机，ssh执行：```rm /usr/local/nginx/conf/vhost/域名.conf```

3、状态管理及相关管理页面

* LNMP状态管理： /root/lnmp {start|stop|reload|restart|kill|status}
* PureFTPd状态管理 /root/pureftpd {start|stop|restart|kill|status}
* phpinfo : http://前面输入的域名或IP/phpinfo.php
* phpMyAdmin : http://前面输入的域名或IP/phpmyadmin/
* 探针 : http://前面输入的域名或IP/p.php
* MySQL root密码：如果不输入直接回车为root，否则为你输入的密码。


### LNMP相关目录：

* mysql : /usr/local/mysql
* php : /usr/local/php
* nginx : /usr/local/nginx
* 网站目录: /home/wwwroot

注：已经在DiaHosting、PhotonVPS（感谢提供测试VPS）、RasHost、VPSYOU、BurstNet、Linode、VPS.net、Rapidxen 及几位lnmp网友提供的VPS上的CentOS 32/64bit、Debian 4/5 32/64bit上测试成功。同时感谢提供测试VPS的商家及网友。
