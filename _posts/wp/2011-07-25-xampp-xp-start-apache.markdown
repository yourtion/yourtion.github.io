---
author: Yourtion
comments: true
date: 2011-07-25 02:04:54+00:00
excerpt: 最近在几台机上面使用xampp还有APMser等的PHP服务器，但是都遇到无法启动或者启动后自动关闭的问题，研究了很久，发现好像无论是Apache还是Nginx存在问题，那么就可以断定问题是出在电脑本身，可能是IP协议之类，在Apache的log下的error.log看到：
layout: post
slug: xampp-xp-start-apache
title: 完美解决XP下xampp等的Apache无法启动的问题
wordpress_id: 2333
categories:
- 服务器
tags:
- Apache
- xampp
- 解决问题
---
{% include JB/setup %}

最近在几台机上面使用xampp还有APMser等的PHP服务器，但是都遇到无法启动或者启动后自动关闭的问题，研究了很久，发现好像无论是Apache还是Nginx存在问题，那么就可以断定问题是出在电脑本身，可能是IP协议之类，在Apache的log下的error.log看到：

```
[Sun Jul 24 14:00:04 2011] [notice] Digest: generating secret for digest authentication ...
[Sun Jul 24 14:00:04 2011] [notice] Digest: done
[Sun Jul 24 14:00:05 2011] [notice] Apache/2.2.14 (Win32) DAV/2 mod_ssl/2.2.14 OpenSSL/0.9.8l mod_autoindex_color PHP/5.3.1 mod_apreq2-20090110/2.7.1 mod_perl/2.0.4 Perl/v5.10.1 configured -- resuming normal operations
[Sun Jul 24 14:00:05 2011] [notice] Server built: Nov 11 2009 14:29:03
[Sun Jul 24 14:00:05 2011] [notice] Parent: Created child process 2184
[Sun Jul 24 14:00:07 2011] [notice] Digest: generating secret for digest authentication ...
[Sun Jul 24 14:00:07 2011] [notice] Digest: done
[Sun Jul 24 14:00:08 2011] [notice] Child 2184: Child process is running
[Sun Jul 24 14:00:08 2011] [crit] (OS 10022)提供了一个无效的参数。  : Child 2184: setup_inherited_listeners(), WSASocket failed to open the inherited socket.
[Sun Jul 24 14:00:08 2011] [crit] Parent: child process exited with status 3 -- Aborting.
```

研究后发现是TCI/IP协议的问题，解决问题方法如下：

解决办法:
1.网上邻居->本地连接->属性->internet协议(TCP/IP)->属性->高级->wins标签->去掉启用LMhosts查询前的勾.

我就是用这个方法解决的，如果还是不行，就往下继续尝试吧

2.控制面版->windows防火墙->高级标签->本地连接设置->服务的标签里勾选安全Web服务器(HTTPS)即可.

(这上下两项完成后仍然有问题，选中：启用 TCI/IP 上的 NetBOIS.)

3.在运行里输入：netsh winsock reset

有人提到是winsock的问题，尝试修复winsock，只要直接在运行里输入：
netsh winsock reset
连提示重启都不用，就OK啦···
