---
author: Yourtion
comments: true
date: 2011-04-23 05:59:54+00:00
excerpt: 由于连接上VPN后，默认所有流量都会走VPN线路，导致了内网访问不正常，而且如果你的VPN是限制流量的话，流量很快会被用完，所以为了访问国内网络速度不变，可以使用设置路由表的方法解决，但是为了使用VPN加密及匿名的话，就没有必要设置路由表了。
layout: post
slug: routing-table-speed-up-vpn
title: 用路由表让VPN内网访问正常、省流量、加速VPN
wordpress_id: 2074
categories:
- 网络工程
tags:
- VPN
---
{% include JB/setup %}

由于连接上VPN后，默认所有流量都会走VPN线路，导致了内网访问不正常，而且如果你的VPN是限制流量的话，流量很快会被用完，所以为了访问国内网络速度不变，可以使用设置路由表的方法解决，但是为了使用VPN加密及匿名的话，就没有必要设置路由表了。

其中Google项目在这里http://code.google.com/p/chnroutes，有兴趣的可以研究下，包括各个平台的设置方法。

VPN的话推荐这个：[http://vcup.in/erb](http://vcup.in/erb) 或者[http://goo.gl/ysLiI](http://goo.gl/ysLiI) 。没有速度限制，很快··以后会详细介绍

以下在Windows平台下添加路由表的批处理文件。[脚本文件下载](http://dl.dbank.com/c002b08rmf)---脚本提取生成日期2011-2-13

使用方法介绍：

其中包括2个文件，```vpnadd.bat```文件是添加路由表文件，```vpndel.bat```文件是删除路由表文件，脚本提取生成来自http://ftp.apnic.net/apnic/dbase/data/country-ipv4.lst，但是最后四个网段是用来登录MSN的（注意：win7及vista需要管理员权限执行批处理文件），以下分两种情况设置：

1：当使用路由上网（非拨号，指设置网关来上网的）

修改```vpnadd.bat```的“```set gw=192.168.1.1```”，将192.168.1.1替换成你的网关，然后执行一次就OK了。

由于添加的路由信息使用的是“```route add```”命令，所以重新开机后添加的路由表会消失，可以把“```route add```”修改为“```route -p add```”，这样就可以不用每次开机都执行批处理文件了，当然是可以使用```vpndel.bat```删除以上添加的路由表的，但是理论上不删也是不影响到什么。

[永久路由批处理](http://dl.dbank.com/c0etfq7mg0)

2：当使用的是拨号上网，会有点麻烦。

修改```vpnadd.bat```的“```set gw=192.168.1.1```”，将192.168.1.1替换成你的IP地址。

而且当你的上网IP变了之后.需要更新路由表。也就是需要删除原来的路由表。

可以手工操作，方法是进入运行下面的命令

“```route del 之前上网的IP```”

并更改批处理文件后，重新执行一次…
