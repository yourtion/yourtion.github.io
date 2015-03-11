---
author: Yourtion
comments: true
date: 2011-11-09 04:08:46+00:00
excerpt: 使用“远程桌面连接”连接到服务器的控制台会话
layout: post
slug: remote-desktop-console-session
title: 使用“远程桌面连接”连接到服务器的控制台会话
wordpress_id: 2610
categories:
- 服务器
tags:
- 服务器
---
{% include JB/setup %}

打开命令提示符。

键入：


<blockquote>mstsc/v:server/console</blockquote>


Server：要连接到的服务器的 DNS 名称或 IP 地址

**注意**

要打开命令提示符，请单击“开始”，指向“程序”或“所有程序”，指向“附件”，然后单击“命令提示符”。

也可通过在“远程桌面连接”的“选项”对话框上“常规”选项卡的“计算机”字段中键入服务器名称或 IP 地址时指定“/console”，以连接到该服务器的控制台会话。

每台计算机只有一个控制台会话。当您远程连接到控制台会话时，其他用户可能无法从本地登录计算机。

当连接到运行 Windows XP 的远程计算机的控制台会话时，将不会应用某些客户端选项设置。例如，如果客户端已指定某个程序在连接到远程计算机时启动，则当连接到远程计算机的控制台会话时，该程序不会启动。而是显示默认桌面。如果连接到的是控制台会话之外的其他会话，则指定的程序会正常启动。控制台会话是 Windows XP Professional 上唯一可用于远程桌面的会话，所以建立连接时总会出现默认桌面，即使客户端指定了其他程序。

要查看该命令的完整语法，请在命令提示符下键入：


<blockquote>mstsc /?</blockquote>
