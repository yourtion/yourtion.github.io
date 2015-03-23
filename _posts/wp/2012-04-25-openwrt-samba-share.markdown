---
author: Yourtion
comments: true
date: 2012-04-25 05:48:15+00:00
excerpt: 'openwrt下samba设置起作用的机制是这样的：openwrt在/etc/config/下面有一个samba的设置，注意：这个设置不符合samba软件本身的设置文件规范。openwr启动时，会用这个设置去替换掉相应的模板里的字段，生成一个符合samba设置文件规范的文件放到/tmp目录下'
layout: post
slug: openwrt-samba-share
title: OpenWrt下Samba共享设置和Win7共享
wordpress_id: 3645
categories:
- 服务器
---
{% include JB/setup %}

openwrt下samba设置起作用的机制是这样的：

openwrt在```/etc/config/```下面有一个samba的设置，注意：这个设置不符合samba软件本身的设置文件规范。openwr启动时，会用这个设置去替换掉相应的模板里的字段，生成一个符合samba设置文件规范的文件放到```/tmp```目录下。

首先设置OpenWrt下的```Samba```，设置好共享目录并关掉Guest和在允许用户“```root```”。

然后使用：

```bash
smbpasswd root XXXX
```

注意，这个root是用户名，用户名必须是系统里已经曾在的用户，openwrt好像只有一个root，一个nobody，两个用户如果要添加其他用户， 可以用```busybox```的用户管理（```adduser/deluser```，需要在编译时添加此部分功能），或者直接编译```/etc/passwd```来添加用户，这两个我都没试过，所以，我是直接用root访问samba。

这样密码访问就正常了。对于vista,win7不能访问samba，解决方法如下：

运行里输入```secpol.msc```,进入-```本地策略```-```安全选项```里，选中:```网络安全```：```LAN管理器身份验证级别```,选择:```发送LM和NTLM,如果已协商，使用ntlmv2回话，立即生效```。

这是由于samba支持的```NTLM```版本低，nt6系统要求支持```NTLMv2```引起的。
