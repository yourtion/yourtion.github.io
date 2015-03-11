---
author: Yourtion
comments: true
date: 2010-07-13 07:22:46+00:00
layout: post
slug: ubuntu-server-terminal-gui
title: Ubuntu Server：从终端走到界面
wordpress_id: 1291
categories:
- 电脑技巧
tags:
- Linux
---
{% include JB/setup %}

总觉得Ubuntu Server作的有点不尽人意,相比RHEL5,连个图形界面都没有,还是我自己装的,相当郁闷,由于终端模式下不能识别无线网络(这个可以理解,没有哪个服务器还用无线网络的),我只能插有线,下面是从终端控制台走向图形化界面的过程。

1、连接网络，你一定要确保网络通畅，如果你和我一样使用Wireless，那先找根网线插上

2、安装xinit:   sudo apt-get install xinit   如果你此时重起，你就会大显你能够进入一个图形化界面了，只是除了鼠标指针，什么也没有

3、安装环境管理器 如果你喜欢 GNOME，使用


<blockquote>sudo apt-get install gdm</blockquote>


KDE和Xface用户分别改为 KDM和XDM

4、安装桌面环境


<blockquote>sudo apt-get install Ubuntu-desktop</blockquote>


或者


<blockquote>kubuntu-desktop  xubuntu-desktop</blockquote>


如果你只想装界面的核心环境，或者网速比较曼的话，可以


<blockquote>sudo apt-get install gnome-core  或者 kde-core xface4</blockquote>


5、如果你装的是CORE的，那么你还需要做以下的工作

1、安装新立得软件包管理器


<blockquote>sudo apt-get install gsynaptic</blockquote>


2、安装无线上网模块（如果需要）


<blockquote>sudo apt-get install network-manager*</blockquote>


3、安装中文支持（能够显示中文）


<blockquote>sudo apt-get install language-support-zh</blockquote>


4、从新立得软件包管理器中选择中文输入法支持和中文界面支持

5、使用新立得软件包管理器安装其他你想要的软件
