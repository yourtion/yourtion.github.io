---
author: Yourtion
comments: true
date: 2011-10-19 00:48:12+00:00
excerpt: '给大家提供更新源的地址，方便大家安装ubuntu11.10后，及时更新源地址。'
layout: post
slug: ubuntu-11-10-update-source
title: 国内比较快的Ubuntu 11.10更新源地址列表——更改方法及下载
wordpress_id: 2593
categories:
- 服务器
tags:
- Linux
- Ubuntu
---
{% include JB/setup %}

给大家提供更新源的地址，方便大家安装ubuntu11.10后，及时更新源地址。

ubuntu11.10下载地址 http://www.ubuntu.com/download/ubuntu/download

前面的是公网普通源，后面是教育网更新源（上海交大、北理、兰大）适合在校大学生使用。

1、首先备份Ubuntu 11.10源列表

```
sudo cp /etc/apt/sources.list /etc/apt/sources.list.backup
```

（备份下当前的源列表，有备无患嘛）
2、修改更新源

```
sudo gedit /etc/apt/sources.list
```

（打开Ubuntu 11.10源列表文件）
3、将下面的代码粘贴进去（“#”开头的那一行为注释，可以直接复制进文件中）

4、通知ubuntu启用新的更新源

```
sudo apt-get update
```

```bash
#台湾源

deb http://tw.archive.ubuntu.com/ubuntu/ oneiric main universe restricted multiverse
deb-src http://tw.archive.ubuntu.com/ubuntu/ oneiric main universe restricted multiverse
deb http://tw.archive.ubuntu.com/ubuntu/ oneiric-security universe main multiverse restricted
deb-src http://tw.archive.ubuntu.com/ubuntu/ oneiric-security universe main multiverse restricted
deb http://tw.archive.ubuntu.com/ubuntu/ oneiric-updates universe main multiverse restricted
deb-src http://tw.archive.ubuntu.com/ubuntu/ oneiric-updates universe main multiverse restricted

#网易 Ubuntu 11.10 源（速度很快）
deb http://mirrors.163.com/ubuntu/ oneiric main universe restricted multiverse
deb-src http://mirrors.163.com/ubuntu/ oneiric main universe restricted multiverse
deb http://mirrors.163.com/ubuntu/ oneiric-security universe main multiverse restricted
deb-src http://mirrors.163.com/ubuntu/ oneiric-security universe main multiverse restricted
deb http://mirrors.163.com/ubuntu/ oneiric-updates universe main multiverse restricted
deb http://mirrors.163.com/ubuntu/ oneiric-proposed universe main multiverse restricted
deb-src http://mirrors.163.com/ubuntu/ oneiric-proposed universe main multiverse restricted
deb http://mirrors.163.com/ubuntu/ oneiric-backports universe main multiverse restricted
deb-src http://mirrors.163.com/ubuntu/ oneiric-backports universe main multiverse restricted
deb-src http://mirrors.163.com/ubuntu/ oneiric-updates universe main multiverse restricted

#骨头源，骨头源是bones7456架设的一个Ubuntu源 ，提供ubuntu,deepin
deb http://ubuntu.srt.cn/ubuntu/ oneiric main universe restricted multiverse
deb-src http://ubuntu.srt.cn/ubuntu/ oneiric main universe restricted multiverse
deb http://ubuntu.srt.cn/ubuntu/ oneiric-security universe main multiverse restricted
deb-src http://ubuntu.srt.cn/ubuntu/ oneiric-security universe main multiverse restricted
deb http://ubuntu.srt.cn/ubuntu/ oneiric-updates universe main multiverse restricted
deb http://ubuntu.srt.cn/ubuntu/ oneiric-proposed universe main multiverse restricted
deb-src http://ubuntu.srt.cn/ubuntu/ oneiric-proposed universe main multiverse restricted
deb http://ubuntu.srt.cn/ubuntu/ oneiric-backports universe main multiverse restricted
deb-src http://ubuntu.srt.cn/ubuntu/ oneiric-backports universe main multiverse restricted
deb-src http://ubuntu.srt.cn/ubuntu/ oneiric-updates universe main multiverse restricted

#mirror.lupaworld.com的源，速度很快

deb http://mirror.lupaworld.com/ubuntu/archive/ oneiric main restricted universe multiverse
deb http://mirror.lupaworld.com/ubuntu/archive/ oneiric-security main restricted universe multiverse
deb http://mirror.lupaworld.com/ubuntu/archive/ oneiric-updates main restricted universe multiverse
deb http://mirror.lupaworld.com/ubuntu/archive/ oneiric-backports main restricted universe multiverse
deb http://mirror.lupaworld.com/ubuntu/ubuntu-cn/ oneiric main restricted universe multiverse

#这里你也可以直接使用更快速的ubuntu.cn99.com的源（推荐）:

deb http://ubuntu.cn99.com/ubuntu/ oneiric main restricted universe multiverse
deb http://ubuntu.cn99.com/ubuntu/ oneiric-updates main restricted universe multiverse
deb http://ubuntu.cn99.com/ubuntu/ oneiric-security main restricted universe multiverse
deb http://ubuntu.cn99.com/ubuntu/ oneiric-backports main restricted universe multiverse
deb http://ubuntu.cn99.com/ubuntu-cn/ oneiric main restricted universe multiverse



//教育网源
如果大家是在校大学生，可以使用校园网/教育网，就是用教育网的资源吧，中科大，兰大、厦门大学都有很多资源，尤其是支持ipv6的，那更新速度就按兆算了。
中科大：http://mirrors.ustc.edu.cn/
厦门大学：http://mirrors.xmu.edu.cn/howto/
大家可以自己根据自己的版本设置一下，不一定局限于ubuntu 11.10，下面列出一些校内更新源。


<blockquote>#电子科技大学
deb http://ubuntu.uestc.edu.cn/ubuntu/ oneiric main restricted universe multiverse
deb http://ubuntu.uestc.edu.cn/ubuntu/ oneiric-backports main restricted universe multiverse
deb http://ubuntu.uestc.edu.cn/ubuntu/ oneiric-proposed main restricted universe multiverse
deb http://ubuntu.uestc.edu.cn/ubuntu/ oneiric-security main restricted universe multiverse
deb http://ubuntu.uestc.edu.cn/ubuntu/ oneiric-updates main restricted universe multiverse
deb-src http://ubuntu.uestc.edu.cn/ubuntu/ oneiric main restricted universe multiverse
deb-src http://ubuntu.uestc.edu.cn/ubuntu/ oneiric-backports main restricted universe multiverse
deb-src http://ubuntu.uestc.edu.cn/ubuntu/ oneiric-proposed main restricted universe multiverse
deb-src http://ubuntu.uestc.edu.cn/ubuntu/ oneiric-security main restricted universe multiverse
deb-src http://ubuntu.uestc.edu.cn/ubuntu/ oneiric-updates main restricted universe multiverse

#中国科技大学
deb http://debian.ustc.edu.cn/ubuntu/ oneiric main restricted universe multiverse
deb http://debian.ustc.edu.cn/ubuntu/ oneiric-backports restricted universe multiverse
deb http://debian.ustc.edu.cn/ubuntu/ oneiric-proposed main restricted universe multiverse
deb http://debian.ustc.edu.cn/ubuntu/ oneiric-security main restricted universe multiverse
deb http://debian.ustc.edu.cn/ubuntu/ oneiric-updates main restricted universe multiverse
deb-src http://debian.ustc.edu.cn/ubuntu/ oneiric main restricted universe multiverse
deb-src http://debian.ustc.edu.cn/ubuntu/ oneiric-backports main restricted universe multiverse
deb-src http://debian.ustc.edu.cn/ubuntu/ oneiric-proposed main restricted universe multiverse
deb-src http://debian.ustc.edu.cn/ubuntu/ oneiric-security main restricted universe multiverse
deb-src http://debian.ustc.edu.cn/ubuntu/ oneiric-updates main restricted universe multiverse

#北京理工大学
deb http://mirror.bjtu.edu.cn/ubuntu/ oneiric main multiverse restricted universe
deb http://mirror.bjtu.edu.cn/ubuntu/ oneiric-backports main multiverse restricted universe
deb http://mirror.bjtu.edu.cn/ubuntu/ oneiric-proposed main multiverse restricted universe
deb http://mirror.bjtu.edu.cn/ubuntu/ oneiric-security main multiverse restricted universe
deb http://mirror.bjtu.edu.cn/ubuntu/ oneiric-updates main multiverse restricted universe
deb-src http://mirror.bjtu.edu.cn/ubuntu/ oneiric main multiverse restricted universe
deb-src http://mirror.bjtu.edu.cn/ubuntu/ oneiric-backports main multiverse restricted universe
deb-src http://mirror.bjtu.edu.cn/ubuntu/ oneiric-proposed main multiverse restricted universe
deb-src http://mirror.bjtu.edu.cn/ubuntu/ oneiric-security main multiverse restricted universe
deb-src http://mirror.bjtu.edu.cn/ubuntu/ oneiric-updates main multiverse restricted universe

#兰州大学
deb ftp://mirror.lzu.edu.cn/ubuntu/ oneiric main multiverse restricted universe
deb ftp://mirror.lzu.edu.cn/ubuntu/ oneiric-backports main multiverse restricted universe
deb ftp://mirror.lzu.edu.cn/ubuntu/ oneiric-proposed main multiverse restricted universe
deb ftp://mirror.lzu.edu.cn/ubuntu/ oneiric-security main multiverse restricted universe
deb ftp://mirror.lzu.edu.cn/ubuntu/ oneiric-updates main multiverse restricted universe
deb ftp://mirror.lzu.edu.cn/ubuntu-cn/ oneiric main multiverse restricted universe

#上海交通大学
deb http://ftp.sjtu.edu.cn/ubuntu/ oneiric main multiverse restricted universe
deb http://ftp.sjtu.edu.cn/ubuntu/ oneiric-backports main multiverse restricted universe
deb http://ftp.sjtu.edu.cn/ubuntu/ oneiric-proposed main multiverse restricted universe
deb http://ftp.sjtu.edu.cn/ubuntu/ oneiric-security main multiverse restricted universe
deb http://ftp.sjtu.edu.cn/ubuntu/ oneiric-updates main multiverse restricted universe
deb http://ftp.sjtu.edu.cn/ubuntu-cn/ oneiric main multiverse restricted universe
deb-src http://ftp.sjtu.edu.cn/ubuntu/ oneiric main multiverse restricted universe
deb-src http://ftp.sjtu.edu.cn/ubuntu/ oneiric-backports main multiverse restricted universe
deb-src http://ftp.sjtu.edu.cn/ubuntu/ oneiric-proposed main multiverse restricted universe
deb-src http://ftp.sjtu.edu.cn/ubuntu/ oneiric-security main multiverse restricted universe
deb-src http://ftp.sjtu.edu.cn/ubuntu/ oneiric-updates main multiverse restricted universe
```
