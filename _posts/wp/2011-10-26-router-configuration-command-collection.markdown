---
author: Yourtion
comments: true
date: 2011-10-26 17:21:48+00:00
layout: post
slug: router-configuration-command-collection
title: 网络规划设计师常用路由器配置命令集锦
wordpress_id: 2597
categories:
- 网络规划设计
tags:
- 网络工程
---
{% include JB/setup %}

1、进入特权模式、全局配置模式、接口配置模式、虚拟终端配置模式、RIP路由协议配置模式


<blockquote>Router > enable
Password :
Router #
Router # configure terminal
Router (config) #
Router (config) # int f0/12
Router (config-if) #
Router (config) # line vty 0 15
Router (config-line) #
Router (config) # router rip
Router (config-router) #</blockquote>


2、配置远程登录密码


<blockquote>Router (config) # line vty 0 15
Router (config-line) # password 7 isncgyx</blockquote>


3、拷贝配置文件到TFTP Server


<blockquote>Router # write network</blockquote>


4、拷贝running-config 到TFTP Server


<blockquote>Router # copy running-config tftp:</blockquote>


5、拷贝bootflash 中的配置文件到TFTP Server


<blockquote>Router # copy bootflash : tftp :</blockquote>


6、从TFTP Server 拷贝配置文件到路由器


<blockquote>Router # copy tftp : running-config</blockquote>


7、将TFTP Server 上的配置文件拷贝到bootflash


<blockquote>Router # copy tftp : bootflash :</blockquote>


8、配置路由器的主机名


<blockquote>Router (config) #hostname Router-isnc</blockquote>


9、配置超级用户口令


<blockquote>Router (config) # enable secret isncgyx</blockquote>


10、设置系统时钟


<blockquote>Router # calendar set 11:30:00 16 october 2011</blockquote>


11、保存配置


<blockquote>Router # write memory
Router # write network tftp</blockquote>


12、删除配置


<blockquote>Router # write erase</blockquote>


13、基本检测命令(telnet、ping、trace)


<blockquote>Router > telnet paris/221.4.8.1
Router > ping 192.168.201.64
Router > trace 210.38.160.5
Router > traceroute www.yourtion.com</blockquote>


14、查看flash、系统时钟、软硬件版本、路由器配置、查看路由表、IP路由协议的详细信息


<blockquote>Router > show flash
Router > sh clock
Router > sh version
Router # sh configuration
Router # sh ip route
Router # sh ip protocols</blockquote>


15、配置接口描述信息


<blockquote>Router (config-if) # description To-JiaYing University</blockquote>


16、配置接口带宽


<blockquote>Router (config-if) # bandwidth 2500,000</blockquote>


17、配置接口的IP地址


<blockquote>Router (config-if) # ip address 202.112.7.249 255.255.255.252</blockquote>


18、接口的开启与关闭


<blockquote>Router (config-if) # shutdown/no shutdown</blockquote>


19、不作ARP代理


<blockquote>Router (config-if) # duplex ful
l# no ip directed-broadcast
# no ip proxy-arp</blockquote>


20、配置异步串行接口


<blockquote>Router (config) # interface a1
Router (config-if) # ip unnumbered ethernet0
Router (config-if) # encapsulation ppp
Router (config-if) # async default ip address 202.112.7.129
Router (config-if) # async dynamic routing
Router (config-if) # async mode interactive
Router (config-if) # no shutdown
Router (config-if) # exit
Router (config) # exit
Router (config) #</blockquote>


21、配置高速同步串行接口


<blockquote>Router (config) # interface s1/1
Router (config-if) # description To-shenzhen
Router (config-if) # bandwidth 2048
Router (config-if) # ip address 212.112.41.81 255.255.255.252
Router (config-if) # encapsulation hdlc
Router (config-if) # no ip directed-broadcast
Router (config-if) # no ip proxy-arp</blockquote>


22、配置POS接口


<blockquote>Router (config) # interface POS3/0
Router (config-if) # description To TianJingDaXue
Router (config-if) # bandwidth 2500,000
Router (config-if) # ip address 212.12.37.18 255.255.255.252
Router (config-if) # crc 32
Router (config-if) # pos framing sdh
Router (config-if) # no ip directed-broadcast
Router (config-if) # pos flag s1 s0 2</blockquote>


23、loopback 接口的配置


<blockquote>Router (config) # int loopback 0
Router (config-if) # ip address 192.167.167.9 255.255.255.255
Router (config-if) # no ip route-cache
Router (config-if) # no ip mroute-cache</blockquote>


24、配置静态路由


<blockquote>Router (config) # ip route 192.65.96.0 255.255.240.0 222.112.37.1(静态路由的配置)</blockquote>


25、进入RIP配置模式


<blockquote>Router (config) # router rip</blockquote>


26、设置参与RIP协议的网络地址


<blockquote>Router (config-router) # network 159.105.0.0</blockquote>


27、配置RIP的被动接口


<blockquote>Router (config-router) # passive-interface ethernet 0</blockquote>


28、配置RIP的路由过滤


<blockquote>Router (config) # access-list 12 deny any
Router (config) # router rip
Router (config-router) # distribute-list 12 in ethernet0</blockquote>


29、配置RIP的管理距离


<blockquote>Router (config-router) # distance 50</blockquote>


30、配置RIP的邻居路由器


<blockquote>Router (config-router) # neighbor 202.112.7.2</blockquote>


31、配置单个IP地址参与OSPF


<blockquote>Router (config) # router ospf 63
Router (config-router) # network 131.107.25.1 0.0.0.0 area 0</blockquote>


32、网络地址参与OSPF


<blockquote>Router (config-router) # network 133.181.0.0 0.0.255.255 area 0</blockquote>


33、定义参与OSPF的子网地址


<blockquote>Router (config-router) # area 0 range 212.37.123.0 255.255.255.0</blockquote>


34、配置被动接口(包括路由器和第三层交换机的配置)


<blockquote>Router (config-router) # passive-interface Ethernet 0
Router (config-router) # passive-interface vlan37</blockquote>


35、配置路由过滤


<blockquote>Router (config) # access-list 12 deny any
Router (config) # router ospf 63
Router (config-router) # distribute-list 12 in serial 0</blockquote>


36、配置管理距离


<blockquote>Router (config-router) # distance 10</blockquote>


37、配置OSPF引入外部路由的花费值


<blockquote>Router (config-router) # redistribute metric 100</blockquote>


38、配置引入外部路由时缺省的标记值


<blockquote>Router (config-router) # redistribute tag 10</blockquote>


39、配置引入外部路由时缺省的外部路由类型


<blockquote>Router (config-router) # redistribute connected metric-type 1 subnets</blockquote>


40、配置IP地址池的名称


<blockquote>Router (config) # ip dhcp pool ttt/234</blockquote>
