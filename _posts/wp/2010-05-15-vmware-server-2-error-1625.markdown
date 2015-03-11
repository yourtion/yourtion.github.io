---
author: Yourtion
comments: true
date: 2010-05-15 04:12:52+00:00
layout: post
slug: vmware-server-2-error-1625
title: VMware Server 2 出错 1625
wordpress_id: 1116
categories:
- 服务器
---
{% include JB/setup %}

VMware Server 2　安装时出现ERROR2755: Server returned unexpected error 1625 attempting to install package 报错。

这是由于尝试在运行 Microsoft Windows Server 2003 或 Microsoft Windows XP 的计算机上安装大型 Microsoft Windows Installer (.msi) 程序包或大型Microsoft Windows Installer 修补程序 (.msp) 包时要打补丁包Windows Server 2003 更新（KB925336）

可以从 Microsoft 下载中心下载以下文件：

[立即下载 Windows Server 2003 更新（KB925336）程序包](http://www.microsoft.com/downloads/details.aspx?displaylang=zh-cn&FamilyID=8effe1d9-7224-4586-be2b-42c9ae5b9071)。 (http://www.microsoft.com/downloads/details.aspx?displaylang=zh-cn&FamilyID=8effe1d9-7224-4586-be2b-42c9ae5b9071)

就能解决

随便介绍一下Vmware Workstation和VMware Server的区别：

1.    VM屏幕录像－Workstation的屏幕录像可以录制VM的所有屏幕操作,并保存为一个AVI文件.Server则没有屏幕录像功能。

2.    主机－虚拟机间拖拽－可以让主机上的对象拖拽到虚拟机上。Server不支持主机－虚拟机间文件拖拽。

3.    VM组－Workstation支持以组的方式来管理多个VM。Server不具备此功能。

4.    VM克隆－Workstation克隆功能可以快速地拷贝一个VM。Server不支持。

5.    快照－Workstation和Server都支持普通快照。

6.    多重快照－Workstation支持多重快照，Server仅支持单一快照。

7.    CPU支持－Workstation和Server都支持2－way虚拟处理器。

8.    虚拟机内存支持－Workstation提供了每个VM最高8GB的内存支持，而Server只支持每VM最高3.6GB内存。

9.    多用户访问－Workstation一次只允许一个用户访问。而Server基于服务的实现方式允许多用户并发访问，而且还提供了一个用于远程管理的Web控制台功能。

10. 作为服务运行－Workstation和Server最大的区别在于。Server作为一个后台服务来运行，而Workstation则作为一个标准的桌面应用程序。Workstation提供了更好的交互性能，而Server更适合多用户服务器整合的场景。Workstation更适合于开发环境，Server则更适合于生产环境。

11. 价格－Workstation卖到189美元，Server免费。
