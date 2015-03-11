---
author: Yourtion
comments: true
date: 2011-04-24 00:57:51+00:00
excerpt: '前面介绍了《用路由表让VPN内网访问正常、省流量、加速VPN》，但是我自己是在局域网，所以顺便研究一下PPTP接入VPN和Windows路由表结合加速的原理，加深对二层隧道协议的认识。'
layout: post
slug: routing-table-vpn-analysis
title: 添加路由表加速VPN和恢复内网连接原理浅析
wordpress_id: 2081
categories:
- 杂杂的
---
{% include JB/setup %}

前面介绍了[《用路由表让VPN内网访问正常、省流量、加速VPN》](/routing-table-speed-up-vpn.html)，但是我自己是在局域网，所以顺便研究一下PPTP接入VPN和Windows路由表结合加速的原理，加深对二层隧道协议的认识。

首先我们先看一下连接VPN前后访问facebook的tracert结果：

未连接VPN前：

```bash
Tracing route to facebook.com [159.106.121.75]
over a maximum of 30 hops:
  1    <1 ms    <1 ms    <1 ms  192.168.200.1 
  2     2 ms     1 ms     1 ms  210.38.163.142 
  3     7 ms    10 ms     9 ms  210.38.163.174 
  4    20 ms    13 ms    27 ms  221.5.72.137 
  5    11 ms    11 ms    10 ms  120.80.189.9 
  6    17 ms    18 ms    17 ms  120.80.4.125 
  7     *        *        *     Request timed out.
  8     *        *        *     Request timed out.
  9     *        *        *     Request timed out.
 10     *        *        *     Request timed out.
```

连接VPN后：

```bash
Tracing route to facebook.com [69.63.181.12]
over a maximum of 30 hops:
  1   262 ms   268 ms   268 ms  172.16.1.1 
  2   262 ms   256 ms   255 ms  74.117.56.129 
  3   252 ms     *        *     65.19.176.69 
  4   293 ms   286 ms   290 ms  72.52.92.122 
  5   278 ms   277 ms   273 ms  206.223.143.161 
  6   277 ms   282 ms     *     204.15.21.162 
  7     *        *      283 ms  204.15.21.171 
  8   272 ms   278 ms   279 ms  74.119.79.243 
  9   278 ms   274 ms   278 ms  69.63.181.12 
Trace complete.
```

可以看到连接VPN后第一跳就发生了变化，由原来的192.168.200.1变成172.16.1.1。后来的就不言而喻了。

再看一下路由表：

连接VPN前：

```bash
Destination  Netmask    Gateway        Interface        Metric
0.0.0.0      0.0.0.0    192.168.200.1  192.168.203.64	20
```

默认路由是192.168.200.1

连接VPN后：

```bash
Destination   Netmask  Gateway     Interface   Metric
0.0.0.0       0.0.0.0  172.16.1.3  172.16.1.3	  1
0.0.0.0       0.0.0.0  192.168.200.1  192.168.203.64     21
192.168.0.0   255.255.0.0 192.168.200.1  192.168.203.64  5
```

默认路由有了两条，但是172.16.1.3的```Metric```比192.168.200.1的小，根据路由选择的原理，除非172.16.1.3失效，否则默认出口都为172.16.1.3。

但是细心的人会发现，我们添加用于加速和内网的路由的```Metric```是5，比起默认路由的要小，为什么连接内网会选择后面的路由呢。

这样又要从路由选择讲起。路由表中明细的路由（静态路由）时，就会先找明细路由，在明细中找不到路由时，就走默认的。

地址掩码越小、精度越高，就匹配哪个！！！

比如同样的目标地址，192.168.1.0/25就比192.168.1.0/24优先！！！

我们添加的路由精度较默认路由高，所以就走我们添加的路由。

这就是我个人的见解，有什么错误的还请高手指正
