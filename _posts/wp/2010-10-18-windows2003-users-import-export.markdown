---
author: Yourtion
comments: true
date: 2010-10-18 05:52:55+00:00
excerpt: 因为网络中心有一台服务器要腾出来用，所以要把服务器里面的网站迁移到另外一台服务器上~但是服务器用户的导出问题一直比较麻烦~于是到网上找了下，有两个小工具addusers.exe和copypwd.exe，使用方法如下：
layout: post
slug: windows2003-users-import-export
title: Windows2003用户导入导出（非AD用户）
wordpress_id: 1566
categories:
- 服务器
tags:
- Windows 2003
---
{% include JB/setup %}

因为网络中心有一台服务器要腾出来用，所以要把服务器里面的网站迁移到另外一台服务器上~但是服务器用户的导出问题一直比较麻烦~

于是到网上找了下，有两个小工具addusers.exe和copypwd.exe，使用方法如下：

A, 备份账号
命令：　c:\addusers.exe /d:u Account.bak //名字不能改，必须是Account.bak;

B, 备份账号密码：
copypwd.exe
命令：　c:\copypwd.exe dump > copypwd.txt //同样，名字不能改，copypwd.exe只认copypwd.txt

注意：要删除account.bak,copypwd.txt中与账号无关的内容

**导入：**
先通过addusers导入账号：
命令：　c:\addusers.exe /p:L /c Account.bak

导入密码：
c:\copypwd.exe set //备份的密码文文件要在同一个目录下。

试了一下，比一个一个的添加方便多了，只是使用时要注意几点：
1、copypwd.exe只能在本地会话上使用，如果用远程桌面会出现错误。
2、addusers.exe导出的Account.bak，要把里面的计算机名改掉，因为迁移之后计算机名就变了。
3、用户、密码导入到新服务器后，常规属性里变成了默认的“用户下次登录时需更改密码”，注意要改回来。

总之，如果有大量用户需要导入导出的话，用这个工具要方便许多。

[addusers和copypwd下载](http://dl.dbank.com/c0u649e13y)
