---
author: Yourtion
comments: true
date: 2010-07-22 14:24:34+00:00
excerpt: 有时候跑到DBank的同步文件夹很麻烦。所以想把它虚拟磁盘。这样就方便很多。说干就干，想到Windows下一个用来将文件夹虚拟磁盘的命令：subst
layout: post
slug: dbank-client-folder-virtual-hard-disk
title: 将DBank客户端文件夹变成虚拟硬盘
wordpress_id: 1318
categories:
- 电脑技巧
---
{% include JB/setup %}

有时候跑到DBank的同步文件夹很麻烦。所以想把它虚拟磁盘。这样就方便很多。  说干就干，想到Windows下一个用来将文件夹虚拟磁盘的命令：```subst```

> subst，DOS命令，用于路径替换 ，将路径与驱动器号关联，就是把一个目录当作一个磁盘驱动器来看，不过不能格式化。

于是我就新建了一个```dbank.bat```文件，内容如下：

```bash
@EchoOff
subst  z:  D:\DOC\我的DBank
```

其中```Z:```可以改成你想虚拟的盘符，而“D:\DOC\我的DBank”就是你Dbank同步路径。

最后把```dbank.bat```放到启动下面，这样每次开机就会虚拟磁盘啦~  

就是那么简单~~~~~

接下来说说Subsy的一些高级用法：  

```bash
SUBST [drive1: [drive2:]path] SUBST drive1: /D  
```

* drive1: 指定要指派路径的虚拟驱动器。 
* [drive2:]path  指定物理驱动器和要指派给虚拟驱动器的 路径。 
* /D 删除被替换的 (虚拟) 驱动器。  

不加任何参数键入 SUBST，可以显示当前虚拟驱动器的清单。  

Subst至少在视窗操作系统中能起到以下几个作用：
  
1. 减少未安装软驱系统安装硬件驱动程序时的等待时间；  
2. 方便用户管理常用目录。  
3. “欺骗功能”  现在让我们来看Subst是如何来实现这一切的。  在

Windows9x/Me中，我们只需在“```开始```”、“```运行```”的地址栏中输入“```Msconfig```”，然后点击确定或回车即可调出“```系统配置实用程序```”。

1.再点击```Autoexec.bat```，输入“```subst a: c:\tools```”语句，点击“```确定```”按钮，然后重新启动。

这一步的作用是利用系统启动时自动执行```Autoexec.bat```中的命令语句的特性，将没有软驱的电脑(如网吧的工作站就通常不配软驱)虚拟出一个软驱，双击该软驱可以调出C盘的Tools目录内容，并可以在其中进行拷贝、删除等操作。而且还缩短了无软驱电脑系统在查找驱动程序时反复查找A盘的等待时间(速度慢的电脑可能要1分钟之多，多么令人烦恼的事情！)。

当然在有软驱的电脑中，我们最好将命令行中的A盘符更改为E或者F直至Z等盘符，不必担心虚拟盘符是否会与光驱盘符有冲突，光驱盘符通常会自动向后延续。  

2.我们还可以利用这个命令来快速调用常用目录，例如我的稿件通常是放在“D:＼稿件”目录中，通过在“系统配置实用程序”中虚拟出一个G盘后，每次我就可以方便地管理稿件目录了。  

3.我们就以一个最典型的例子来讲解Subst的欺骗功能：Office97在安装的时候需要使用一张加密软盘。软盘多次使用就有可能损坏。

我们可以将软盘的内容拷贝到硬盘上，如```E:\disk```，然后在命令提示符或者开始菜单的运行中输入如下命令行：```c:\windows\command\subst a: e:\disk  ```这样就可以不需要软盘安装Office了。

这种方法同样比较适合于无软驱电脑用户和急需软盘而又暂时无盘的用户(但经过实验，有软驱的用户可以通过```Subst```命令虚拟的盘符来将原驱动器盘符隐藏)。  

注意：在Windows2000／XP中同样有这个命令，但是应当注意的是这个命令不能虚拟已经存在的驱动程序盘符。例如，如果你的电脑中安装了软驱，盘符为A，就不能用Subst虚拟A盘。
