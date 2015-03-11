---
author: Yourtion
comments: true
date: 2010-06-21 10:56:16+00:00
excerpt: 最近838泡了汤~没办法只有入手多普达565一台过度一下~~随便献上刷机的教程和软件~因为很多软件的下载链接都失效了·找了很久才收集完全~包括解锁、免联网刷SuperCID、还有刷机工具以及在用的一个WM5的ROM。很不错·希望对你有帮助~怎么也是一代强机啊··
layout: post
slug: brush-supercid-dopod-565
title: 多普达565解锁刷机SuperCID教程及相关软件下载
wordpress_id: 1222
categories:
- 收集
tags:
- 手机刷机
---
{% include JB/setup %}

最近838泡了汤~没办法只有入手多普达565一台过度一下~~随便献上刷机的教程和软件~因为很多软件的下载链接都失效了·找了很久才收集完全~包括解锁、免联网刷SuperCID、还有刷机工具以及在用的一个WM5的ROM。很不错·希望对你有帮助~怎么也是一代强机啊··

* [01 Unlock.rar](http://www.dbank.com/download.action?t=40&k=MzQ3NDczMzc=&pcode=LCwxMjAzODksMTIwMzg5&rnd=4)
* [02 SuperCID.rar](http://www.dbank.com/download.action?t=40&k=MzQ3NDczMzc=&pcode=LCwxMjAzODksMTIwMzg5&rnd=4)
* [03 SPL064.rar](http://www.dbank.com/download.action?t=40&k=MzQ3NDczMzc=&pcode=LCwxMjAzODksMTIwMzg5&rnd=4)
* [04 SPL0109 WM5.rar](http://www.dbank.com/download.action?t=40&k=MzQ3NDczMzc=&pcode=LCwxMjAzODksMTIwMzg5&rnd=4)
* [04 SPL0109 WM6.rar](http://www.dbank.com/download.action?t=40&k=MzQ3NDczMzc=&pcode=LCwxMjAzODksMTIwMzg5&rnd=4)
* [05 MTTY.rar](http://www.dbank.com/download.action?t=40&k=MzQ3NDczMzc=&pcode=LCwxMjAzODksMTIwMzg5&rnd=4)
* [补丁.rar](http://www.dbank.com/download.action?t=40&k=MzQ3NDczMzc=&pcode=LCwxMjAzODksMTIwMzg5&rnd=4)

以上文件的打包：[565-Rom-Update-Tools-Typhoon.rar](http://www.dbank.com/download.action?t=40&k=MzQ3NDc3OTc=&pcode=LCwxMjAzODksMTIwMzg5&rnd=4)

WM5的ROM：[565 WM5 long-0530ROM.rar](http://www.dbank.com/download.action?t=40&k=MzQ3NDc4ODk=&pcode=LCwxMjAzODksMTIwMzg5&rnd=4)

![home键菜单.jpg]({{ IMAGE_PATH }}2010/06/xn-home-ot0gh48w1lza.jpg)

![ms_splash.JPG]({{ IMAGE_PATH }}2010/06/ms_splash.jpg)

![来电画面.jpg]({{ IMAGE_PATH }}2010/06/xn-vrv802asa6806a.jpg)

![原创修改主题1.jpg]({{ IMAGE_PATH }}2010/06/xn-1-dr6a67cwydotcsu1cix3f.jpg)

多普达 565 577W 595 586等 无需联网，dos环境，SuperCID手动修改教程

最近SPV-Services的网站打不开，所以在刷机时不能联网改supercid了。这里转载个来自IOICN的在dos环境下不用联网改cid为supercid的方法。只需要一些dos的小操作就可以搞定了。

注意：这个只是改supercid。相当于正式刷机教程的第二步，解锁需要先进行！

1.首先要下载ActivePerl软件 [http://www.skycn.com/soft/1211.html](http://www.skycn.com/soft/1211.html)

下载以后安装然后把附件里面补丁程序解压缩以后复制到perl\bin目录下。
接下来开始正式操作！
（别忘记先给手机解锁，解锁软件补丁包内含。还有要手机和电脑同步！）

2.点击开始-运行 然后输入CMD
接下来进入刚才安装的PERL的目录
进入X:\PERL\BIN（X是你安装的分区，默认安装到C盘）

注：如果不熟悉cmd命令，请参考：

假设ActivePerl安装到C盘，此时在cmd输入
C: 回车
再输入
cd PERL\BIN 回车
就可以进入文件夹了

一次性输入

```bash
ppm install Win32-API-0.41WJ.ppd
ppm install XdaDevelopers-NbfUtils.ppd
ppm install Crypt-DES.ppd
```

（小技巧可以用复制然后点击CMD的窗口栏 点击鼠标右键选择粘贴-回车）

3.安装完插件以后，开始修改SUPERCID
和刚才安装方法一样依次输入（还是在X:\PERL\BIN\目录下）
pdocread -n 1 0x000000 0x10000 -b 0x4000 bdk1-00-cid.nb
这一步是往手机上安装插件，这时候手机上会有提示，按"是"继续

4.继续一次性输入


```bash
perl typhooncidedit.pl bdk1-00-cid.nb
perl typhooncidedit.pl -w new_SuperCID.bin -c 11111111 bdk1-00-cid.nb
perl typhooncidedit.pl new_SuperCID.bin
pdocwrite -n 1 new_SuperCID.bin 0x000000 0x10000 -b 0x4000
```

5.这一步运行完以后显示CopyFileToTFFS(new_SuperCID.bin:0, 0, 00010000)
那就成功了！！

检测：然后可以用MTTY（附件有下载）来检测一下是否真的SUPERCID修改成功

手机进入三色屏然后干掉同步软件（使用任务管理器关闭wcescomm.exe进程），USB连接手机以后运行MTTY。
在CMD〉下输入info 2

会返回如下信息：

```
GetDeviceInfo=0x00000002

Load Binary NORMAL partition: data from DiskOnChip to RAM
Start to read bianry partition.
Read binary partition successfully.
+ SD Controller init

- SD Controller init

+StorageInit

***** user area size = 0x1E980000 Bytes

Load Binary NORMAL partition: data from DiskOnChip to RAM
Start to read bianry partition.
Read binary partition successfully.
HTCSSuperCID ||' HTCE

```

请注意最后一行，出现红字HTCSSuperCID这个就说明修改supercid成功了。

刷机教程！

刷机前言：不用说也知道最好是先备份一下哦！

### 1.解锁：

启动```SDA_ApplicationUnlock```软件后，直接按remove lock，然后重新启动手机，搞定。

### 2.改cid为supercid：

启动supercid，该软件需要连接网络，出现页面后,点击页面左边"CID Tool (Alpha)"，电脑会传一个文件到手机,要求安装,直接点"是"，然后等待片刻，电脑软件界面出现一个"set CID＝11111111"按钮，点击它，搞定cid。

### 3.升级SPL：

检测SPL版本：按住拍照键，再按开机键1秒，就可以进入手机三色屏（更简单的进入三色屏的方法：手机关机，按住照相键，插上USB接口，等待片刻就进入了），往下数第二个颜色里，可看到SPL版本，如果是已经是1.01.0109，就直接刷机，如果是1.01.0109，就升级它。

升级SPL：首先关掉电脑上的同步软件，把activesync也关掉（在同步图标上点击右键，选择"连接设置"，取消"允许USB连接"），接着让手机进入三色屏，连接电脑，电脑上启动"Patched_RUU"，把界面上能钩的地方钩上，点击"下一步"，直到看见"Update"按钮，点击它，等待几分钟，电脑和手机屏幕都升至100％，搞定。

###4.刷机：

这步同样要关掉电脑上的同步软件，重启手机进入三色屏，进入前会提示 NEED AN IU (0) ？当然按0，进入后检查一下SPL版本，应该是109了。打开刷机软件mtty，选择USB连接，点"OK"，进入界面后，按下回车，出现命令行，输入lE:\2005.bin ，命令中，l是小写L，后面的就是ROM的路径，就是ROM存在你电脑的什
么位置，再按回车键，我是把mtty和rom都拷到E盘根目录，方便刷机。然后就是等待3-4分钟，等完成后，根据提示重新启动手机，开机后就是WM5！
