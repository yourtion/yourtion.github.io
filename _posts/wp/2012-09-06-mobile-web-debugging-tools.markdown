---
author: Yourtion
comments: true
date: 2012-09-06 09:00:15+00:00
excerpt: 目前，在手机上使用浏览器访问网页，无法便捷地进行网页语言调试。手机屏幕相对较小且操作不便，直接在手机上进行网页数据调试不太现实。因此，UC使用技术将手机网页调试信息分离，实现一种能在大屏幕、高配置PC上来调试小屏幕、低配置的手机浏览器访问的网页的开发工具——Remote
  Inspector（简称RI）。
layout: post
slug: mobile-web-debugging-tools
title: 移动网页调试不用愁——UC开发者版内置手机网页调试工具
wordpress_id: 3707
categories:
- 电脑技巧
tags:
- UC
- 工具
---
{% include JB/setup %}

目前，在手机上使用浏览器访问网页，无法便捷地进行网页语言调试。手机屏幕相对较小且操作不便，直接在手机上进行网页数据调试不太现实。

因此，UC使用技术将手机网页调试信息分离，实现一种能在大屏幕、高配置PC上来调试小屏幕、低配置的手机浏览器访问的网页的开发工具——Remote Inspector（简称RI）。

[![]({{ IMAGE_PATH }}2012/09/uc-dev-1-560x519.gif)]({{ IMAGE_PATH }}2012/09/uc-dev-1.gif)


## **主要功能**


Android平台UC浏览器开发者版，主要支持以下功能：



	
  * DOM查看和修改

	
  * JavaScript调试、CSS调试

	
  * 网络状态查看

	
  * 资源文件查看

	
  * Console控制台




## **准备工作**




### 手机端


进入UC官方网站开发者中心（[网站地址](http://www.uc.cn/business/developer.shtml)），下载Android平台的UC浏览器开发者版（UCBrowser_Dev_RI.apk，[下载地址](http://wap.uc.cn/index.php?action=PackageDown&do=ByPfid&product=UCBrowser&pfid=145&lang=zh-cn&bid=999&direct=true&from=dev-slp-dir-pc)），安装到手机中。


### PC端


PC机一台，并在PC上安装Chrome或Safari（推荐使用Chrome）。支持Chrom

15 – Chrome 21，以及Safari5.1.4以上版本。

下载adb工具（adb_tool.zip，下载地址）到PC中。


### 连接手机与PC


Android平台UC浏览器开发者版，远程调试支持USB连接、Wi-Fi连接两种模式


#### Wi-Fi连接模式


Wi-Fi模式下，保证手机与PC处于同一个无线网段即可。


#### USB连接模式


USB连接模式需要搭建Android SDK开发环境或安装adb工具。

//附Windows操作系统上的adb安装参考

[![]({{ IMAGE_PATH }}2012/09/uc-dev-2-560x406.jpg)]({{ IMAGE_PATH }}2012/09/uc-dev-2.jpg)



	
  1. 在PC上，通过网络下载安装豌豆荚（Android手机助手）；

	
  2. 在手机上打开USB调试模式：设置>应用程序>开发>USB调试

	
  3. 连接手机与PC，若PC无手机驱动，豌豆荚会自动下载驱动并安装；

	
  4. 将手机与PC连接，能被豌豆荚识别则为正常连接

	
  5. 将adb_tool.zip解压到C:\WINDOWS\system32目录下

	
  6. 开始>运行>输入cmd.exe 进入Windows命令提示符窗口，输入adb，如果无错误提示，并能够看到”Android Debug Bridge version 1.0.26”的提示，则表明adb安装成功


搭建好Android SDK开发环境或安装好adb工具后，通过adb命令进行端口映射


<blockquote>在Windows命令提示符窗口（cmd.exe）运行：adb forward tcp:9998 tcp:9998</blockquote>




# 调试方式


在手机上启动UC浏览器开发者版，并打开需要调试的页面。

在PC上打开Chrome或Safari

若是Wi-Fi连接模式，则在地址栏输入：手机IP+:9998

例，手机IP为192.168.112.244，则输入192.168.112.244:9998

此时手机端的UC浏览器开发者版会弹出对话框，如下：

[![]({{ IMAGE_PATH }}2012/09/uc-dev-3.jpg)]({{ IMAGE_PATH }}2012/09/uc-dev-3.jpg)

选择确定，允许调试。

若是USB连接模式，则在地址栏输入：http://localhost:9998

成功访问该网址后，即可看到UC浏览器开发者版已打开索引页面：

[![]({{ IMAGE_PATH }}2012/09/uc-dev-4-560x371.png)]({{ IMAGE_PATH }}2012/09/uc-dev-4.png)

接下来，点击任一需要调试的页面即可进行调试。调试方法与PC上Chrome或Safari开发者工具的调试方法类似。以UC产品下载站为例，点击进入调试页面：

[![]({{ IMAGE_PATH }}2012/09/uc-dev-5-560x371.png)]({{ IMAGE_PATH }}2012/09/uc-dev-5.png)

当UC浏览器开发者版的某个页面被远端浏览器调试时，系统通知栏会显示扳手图标，提示UC浏览器-调试模式开启，表明当前手机页面处于调试状态。如图：

[![]({{ IMAGE_PATH }}2012/09/uc-dev-6.jpg)]({{ IMAGE_PATH }}2012/09/uc-dev-6.jpg)

所有工作准备就绪，接下来可进入调试阶段。

调试的具体方式什么的就不详细讲了，可以直接去下载我的，我就贴图几张吧！

相关下载：



	
  * [UC浏览器开发者版使用手册(Android平台-Word)](http://www.uc.cn/business/download/developer.doc)

	
  * [UC浏览器开发者版使用手册(Android平](http://www.uc.cn/business/download/developer.pdf)[台-PDF)](http://www.uc.cn/business/download/developer.pdf)




[![]({{ IMAGE_PATH }}2012/09/uc-dev-7.jpg)]({{ IMAGE_PATH }}2012/09/uc-dev-7.jpg)




[![]({{ IMAGE_PATH }}2012/09/uc-dev-8-560x408.jpg)]({{ IMAGE_PATH }}2012/09/uc-dev-8.jpg)
