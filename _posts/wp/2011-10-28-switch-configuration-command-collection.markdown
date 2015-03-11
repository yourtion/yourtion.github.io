---
author: Yourtion
comments: true
date: 2011-10-28 02:31:19+00:00
layout: post
slug: switch-configuration-command-collection
title: 网络规划设计师常用交换机配置命令集锦——Catalyst 3548
wordpress_id: 2599
categories:
- 网络规划设计
tags:
- 网络工程
---
{% include JB/setup %}

1、 进入全局配置模式


<blockquote>Switch-3548 > enable
Password : ********
Switch-3548 # config t
Switch-3548 (config) #</blockquote>


2、 启用交换机的HTTP Server


<blockquote>Switch-3548 (config) # ip http server</blockquote>


3、 配置主机名


<blockquote>Switch-3548 (config) # hostname Switch-PHY-3548</blockquote>


4、 配置超级用户口令


<blockquote>Switch-GYX-3548 (config) # enable secret 5 zzz
Switch-GYX-3548 (config) # enable password zzz
Switch-GYX-3548 (config) #
Switch-GYX-3548 (config) # enable password 7 zzz
Switch-GYX-3548 (config) #</blockquote>


5、 配置远程登录口令


<blockquote>Switch-GYX-3548 (config) # line vty 0 4
Switch-GYX-3548 (config-line) # password 7 zzz
Switch-GYX-3548 (config-line) # password 0 zzz
Switch-GYX-3548 (config-line) #</blockquote>


6、 配置系统时间


<blockquote>Switch-GYX-3548 # clock set 23:00:00 29 March 2009</blockquote>


7、 配置设备管理地址(IP地址及缺省路由)


<blockquote>Switch-GYX-3548 (config) # interface VLAN1
Switch-GYX-3548 (config-if) # ip address 203.105.1.62 255.255.255.0
Switch-GYX-3548 (config) # ip default-gateway 203.105.1.1</blockquote>


8、 进入端口配置模式


<blockquote>Switch-GYX-3548 (config) # interface f0/24</blockquote>


9、 配置端口描述信息


<blockquote>Switch-GYX-3548 (config-if) # description To-lib</blockquote>


10、配置交换机端口的关闭与开启


<blockquote>Switch-GYX-3548 (config-if) # (no) shutdown</blockquote>


11、配置交换机端口的通信方式


<blockquote>Switch-GYX-3548 (config-if) # duplex auto/full/half</blockquote>


12、配置交换机端口的传输速率


<blockquote>Switch-GYX-3548 (config-if) # speed 10/100/auto</blockquote>


13、配置VTP域名


<blockquote>Switch-GYX-3548 (config) # vtp domain pku</blockquote>


14、配置VTP工作模式


<blockquote>Switch-GYX-3548 (config) # vtp mode server/client/transparent</blockquote>


15、进入VLAN配置模式


<blockquote>Switch-GYX-3548 # vlan data</blockquote>


16、建立VLAN


<blockquote>Switch-GYX-3548 (vlan) # vlan 1000 name vlan1000</blockquote>


17、删除VLAN


<blockquote>Switch-GYX-3548 (vlan) # no vlan 1000</blockquote>


18、修改VLAN


<blockquote>Switch-GYX-3548 (vlan) # vlan 1000 name v1000</blockquote>


19、为端口分配VLAN


<blockquote>Switch-GYX-3548 (config-if) # switchport access vlan 248</blockquote>


20、配置VLAN Trunk模式


<blockquote>Switch-GYX-3548 (config-if) # switchport mode trunk</blockquote>


21、封装VLAN协议


<blockquote>Switch-GYX-3548 (config-if) # switchport trunk encapsulation dot1 q/isl/negotiate P</blockquote>


22、设置允许中继的VLAN


<blockquote>Switch-GYX-3548 (config-if) # switchport trunk allowed vlan 10,14/10-14/except 100-1000</blockquote>


23、打开或关闭STP


<blockquote>Switch-GYX-3548 (config) # (no) spanning-tree vlan 3</blockquote>


24、配置根网桥和备份根网桥


<blockquote>Switch-GYX-3548 (config) # spanning-tree vlan 3 root primary/secondary</blockquote>


25、配置生成树优先级


<blockquote>Switch-GYX-3548 (config) # spanning-tree vlan 3 priority 8192</blockquote>


26、配置BackboneFast 生成树可选功能


<blockquote>Switch-GYX-3548 (config) # spanning-tree backbonefast</blockquote>


27、配置UplinkFast 生成树可选功能


<blockquote>Switch-GYX-3548 (config) # spanning-tree uplinkfast max-update-rate 32000
Switch-GYX-3548 (config) # spanning-tree uplinkfast</blockquote>


28、配置PortFast 生成树可选功能


<blockquote>Switch-GYX-3548 (config) # spanning-tree portfast default</blockquote>


29、配置BPDU Filter 生成树可选功能


<blockquote>Switch-GYX-3548 (config) # spanning-tree portfast bpdufilter default</blockquote>
