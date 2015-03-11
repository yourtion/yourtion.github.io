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

```bash
Switch-3548 > enable
Password : ********
Switch-3548 # config t
Switch-3548 (config) #
```


2、 启用交换机的HTTP Server

```bash
Switch-3548 (config) # ip http server
```

3、 配置主机名

```bash
Switch-3548 (config) # hostname Switch-PHY-3548
```

4、 配置超级用户口令

```bash
Switch-GYX-3548 (config) # enable secret 5 zzz
Switch-GYX-3548 (config) # enable password zzz
Switch-GYX-3548 (config) #
Switch-GYX-3548 (config) # enable password 7 zzz
Switch-GYX-3548 (config) #
```

5、 配置远程登录口令

```bash
Switch-GYX-3548 (config) # line vty 0 4
Switch-GYX-3548 (config-line) # password 7 zzz
Switch-GYX-3548 (config-line) # password 0 zzz
Switch-GYX-3548 (config-line) #
```

6、 配置系统时间

```bash
Switch-GYX-3548 # clock set 23:00:00 29 March 2009
```

7、 配置设备管理地址(IP地址及缺省路由)

```bash
Switch-GYX-3548 (config) # interface VLAN1
Switch-GYX-3548 (config-if) # ip address 203.105.1.62 255.255.255.0
Switch-GYX-3548 (config) # ip default-gateway 203.105.1.1
```

8、 进入端口配置模式

```bash
Switch-GYX-3548 (config) # interface f0/24
```

9、 配置端口描述信息

```bash
Switch-GYX-3548 (config-if) # description To-lib
```

10、配置交换机端口的关闭与开启

```bash
Switch-GYX-3548 (config-if) # (no) shutdown
```

11、配置交换机端口的通信方式

```bash
Switch-GYX-3548 (config-if) # duplex auto/full/half
```

12、配置交换机端口的传输速率

```bash
Switch-GYX-3548 (config-if) # speed 10/100/auto
```

13、配置VTP域名

```bash
Switch-GYX-3548 (config) # vtp domain pku
```

14、配置VTP工作模式

```bash
Switch-GYX-3548 (config) # vtp mode server/client/transparent
```

15、进入VLAN配置模式


```bash
Switch-GYX-3548 # vlan data
```


16、建立VLAN


```bash
Switch-GYX-3548 (vlan) # vlan 1000 name vlan1000
```


17、删除VLAN


```bash
Switch-GYX-3548 (vlan) # no vlan 1000
```


18、修改VLAN


```bash
Switch-GYX-3548 (vlan) # vlan 1000 name v1000
```


19、为端口分配VLAN


```bash
Switch-GYX-3548 (config-if) # switchport access vlan 248
```


20、配置VLAN Trunk模式


```bash
Switch-GYX-3548 (config-if) # switchport mode trunk
```


21、封装VLAN协议


```bash
Switch-GYX-3548 (config-if) # switchport trunk encapsulation dot1 q/isl/negotiate P
```


22、设置允许中继的VLAN


```bash
Switch-GYX-3548 (config-if) # switchport trunk allowed vlan 10,14/10-14/except 100-1000
```


23、打开或关闭STP


```bash
Switch-GYX-3548 (config) # (no) spanning-tree vlan 3
```


24、配置根网桥和备份根网桥


```bash
Switch-GYX-3548 (config) # spanning-tree vlan 3 root primary/secondary
```


25、配置生成树优先级


```bash
Switch-GYX-3548 (config) # spanning-tree vlan 3 priority 8192
```


26、配置BackboneFast 生成树可选功能


```bash
Switch-GYX-3548 (config) # spanning-tree backbonefast
```


27、配置UplinkFast 生成树可选功能


```bash
Switch-GYX-3548 (config) # spanning-tree uplinkfast max-update-rate 32000
Switch-GYX-3548 (config) # spanning-tree uplinkfast
```


28、配置PortFast 生成树可选功能


```bash
Switch-GYX-3548 (config) # spanning-tree portfast default
```


29、配置BPDU Filter 生成树可选功能


```bash
Switch-GYX-3548 (config) # spanning-tree portfast bpdufilter default
```
