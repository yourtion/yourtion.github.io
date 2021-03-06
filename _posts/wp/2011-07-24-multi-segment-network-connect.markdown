---
author: Yourtion
comments: true
date: 2011-07-24 03:54:30+00:00
excerpt: 刚刚在用笔记本电脑无线上网，突然想起刚刚在路由器上还有一根网线剩下，而且就在我身边，我就想，如果把笔记本电脑同时通过有线和无线连接到同一个路由器会发生什么事呢。
layout: post
slug: multi-segment-network-connect
title: 电脑多网卡连接同一网段问题探究
wordpress_id: 2328
categories:
- 网络工程
tags:
- 服务器
---
{% include JB/setup %}

刚刚在用笔记本电脑无线上网，突然想起刚刚在路由器上还有一根网线剩下，而且就在我身边，我就想，如果把笔记本电脑同时通过有线和无线连接到同一个路由器会发生什么事呢。

马上动手，连接上有线网络。咦没什么变化？？

看了一下网络连接，然后```ipconfig /all```看了一下。

```ini
无线局域网适配器 无线网络连接:

   连接特定的 DNS 后缀 . . . . . . . : gateway.2wire.net
   描述. . . . . . . . . . . . . . . : Intel(R) PRO/无线 3945ABG 网络连接
   物理地址. . . . . . . . . . . . . : 00-1F-3C-72-28-96
   DHCP 已启用 . . . . . . . . . . . : 是
   自动配置已启用. . . . . . . . . . : 是
   IPv4 地址 . . . . . . . . . . . . : 192.168.0.72(首选)
   子网掩码  . . . . . . . . . . . . : 255.255.255.0
   获得租约的时间  . . . . . . . . . : 2011年7月24日  10:36:38
   租约过期的时间  . . . . . . . . . : 2011年7月25日  11:30:05
   默认网关. . . . . . . . . . . . . : 192.168.0.1
   DHCP 服务器 . . . . . . . . . . . : 192.168.0.1
   DNS 服务器  . . . . . . . . . . . : 192.168.0.1
   TCPIP 上的 NetBIOS  . . . . . . . : 已启用

以太网适配器 本地连接:

   连接特定的 DNS 后缀 . . . . . . . : gateway.2wire.net
   描述. . . . . . . . . . . . . . . : Marvell Yukon 88E8039 PCI-E Fast Ethernet
 Controller
   物理地址. . . . . . . . . . . . . : 00-1D-72-5F-7C-B3
   DHCP 已启用 . . . . . . . . . . . : 是
   自动配置已启用. . . . . . . . . . : 是
   IPv4 地址 . . . . . . . . . . . . : 192.168.0.80(首选)
   子网掩码  . . . . . . . . . . . . : 255.255.255.0
   获得租约的时间  . . . . . . . . . : 2011年7月24日  11:36:38
   租约过期的时间  . . . . . . . . . : 2011年7月25日  11:36:38
   默认网关. . . . . . . . . . . . . : 192.168.0.1
   DHCP 服务器 . . . . . . . . . . . : 192.168.0.1
   DNS 服务器  . . . . . . . . . . . : 192.168.0.1
   TCPIP 上的 NetBIOS  . . . . . . . : 已启用
```

可以看到有线和无线网卡都在路由上获取到有效IP地址，那么电脑怎么判断走哪条线路呢？？我马上想到路由表，Route Print一下看看：

```ini
===========================================================================
接口列表
 12...00 1f 3c 72 28 96 ......Intel(R) PRO/无线 3945ABG 网络连接
 11...00 1d 72 5f 7c b3 ......Marvell Yukon 88E8039 PCI-E Fast Ethernet Controll
er
  1...........................Software Loopback Interface 1
 14...00 00 00 00 00 00 00 e0 Microsoft ISATAP Adapter
 13...00 00 00 00 00 00 00 e0 Teredo Tunneling Pseudo-Interface
===========================================================================

IPv4 路由表
===========================================================================
活动路由:
网络目标        网络掩码          网关       接口   跃点数
          0.0.0.0          0.0.0.0      192.168.0.1     192.168.0.72     25
          0.0.0.0          0.0.0.0      192.168.0.1     192.168.0.80     20
        127.0.0.0        255.0.0.0       在链路上         127.0.0.1    306
        127.0.0.1  255.255.255.255       在链路上         127.0.0.1    306
  127.255.255.255  255.255.255.255       在链路上         127.0.0.1    306
      192.168.0.0    255.255.255.0       在链路上      192.168.0.72    281
      192.168.0.0    255.255.255.0       在链路上      192.168.0.80    276
     192.168.0.72  255.255.255.255       在链路上      192.168.0.72    281
     192.168.0.80  255.255.255.255       在链路上      192.168.0.80    276
    192.168.0.255  255.255.255.255       在链路上      192.168.0.72    281
    192.168.0.255  255.255.255.255       在链路上      192.168.0.80    276
        224.0.0.0        240.0.0.0       在链路上         127.0.0.1    306
        224.0.0.0        240.0.0.0       在链路上      192.168.0.80    276
        224.0.0.0        240.0.0.0       在链路上      192.168.0.72    281
  255.255.255.255  255.255.255.255       在链路上         127.0.0.1    306
  255.255.255.255  255.255.255.255       在链路上      192.168.0.80    276
  255.255.255.255  255.255.255.255       在链路上      192.168.0.72    281
===========================================================================
永久路由:
  无
IPv6 路由表
===========================================================================
活动路由:
 如果跃点数网络目标      网关
  1    306 ::1/128                  在链路上
  1    306 ff00::/8                 在链路上
===========================================================================
永久路由:
  无
```

可以看到默认路由有两条，分别对应两个网卡，但是有线连接的跳跃点是20，无线连接的是25，所以在默认情况上是走有线连接，如果有线连接中就走无线，两条连接构成冗余。

好了，实验到此结束！！！！
