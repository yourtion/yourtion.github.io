---
author: Yourtion
comments: true
date: 2011-04-25 00:46:41+00:00
excerpt: AndroidSDK在国内下载一直很慢··有时候通宵都下不了一点点，最后只有选择离线安装，现在发出离线安装地址和方法，希望对大家有帮助
layout: post
slug: android-sdk-off-line-installation
title: Android SDK离线安装方法详解(加速安装)更新中
wordpress_id: 2085
categories:
- Android
tags:
- Android
- SDK
---
{% include JB/setup %}

AndroidSDK在国内下载一直很慢··有时候通宵都下不了一点点，最后只有选择离线安装，现在发出离线安装地址和方法，希望对大家有帮助！

**离线安装包下载地址：[http://dl.vmall.com/c0m7f1w8rq](http://dl.vmall.com/c0m7f1w8rq)**

一，首先下载SDK的安装包，android-sdk_r10-windows.zip（安装工具）解压到目录，如我的目录D:\programs\android-sdk-windows

下载地址：http://dl.google.com/android/android-sdk_r10-windows.zip（目前最新版）

二，然后新建以下 几个文件夹

platforms，docs，samples，usb_driver，market_licensing

三，删除tools全部内容

这一步是可选的，因为tools内容可能已经过时，也可能仍然可用。

四，打开下载工具（迅雷，电驴等等），下载以下内容

谷歌api的安装包
<table cellpadding="0" cellspacing="0" border="1" >
<tbody >
<tr >

<td width="401" >Android SDK Tools, revision 10
</td>

<td width="542" >[http://dl-ssl.google.com/android/repository/tools_r10-windows.zip](http://dl-ssl.google.com/android/repository/tools_r10-windows.zip)
</td>
</tr>
<tr >

<td width="401" >Android SDK Platform-tools, revision 3
</td>

<td width="542" >[http://dl-ssl.google.com/android/repository/platform-tools_r03-windows.zip](http://dl-ssl.google.com/android/repository/platform-tools_r03-windows.zip)
</td>
</tr>
<tr >

<td width="401" >Android SDK Docs for Android API 11, revision 1
</td>

<td width="542" >[http://dl-ssl.google.com/android/repository/docs-3.0_r01-linux.zip](http://dl-ssl.google.com/android/repository/docs-3.0_r01-linux.zip)
</td>
</tr>
<tr >

<td width="401" >Android SDK Platform 3.0, revision 1
</td>

<td width="542" >[http://dl-ssl.google.com/android/repository/android-3.0_r01-linux.zip](http://dl-ssl.google.com/android/repository/android-3.0_r01-linux.zip)
</td>
</tr>
<tr >

<td width="401" >Android SDK Platform 2.3.3._r1 Revision 1
</td>

<td width="542" >[http://dl-ssl.google.com/android/repository/android-2.3.3_r01-linux.zip](http://dl-ssl.google.com/android/repository/android-2.3.3_r01-linux.zip)
</td>
</tr>
<tr >

<td width="401" >Android SDK Platform 2.3.1_r2 Revision 2 (Obsolete)
</td>

<td width="542" >[http://dl-ssl.google.com/android/repository/android-2.3.1_r02-linux.zip](http://dl-ssl.google.com/android/repository/android-2.3.1_r02-linux.zip)
</td>
</tr>
<tr >

<td width="401" >Android SDK Platform 2.2_r1 Revision 2
</td>

<td width="542" >[http://dl-ssl.google.com/android/repository/android-2.2_r02-windows.zip](http://dl-ssl.google.com/android/repository/android-2.2_r02-windows.zip)
</td>
</tr>
<tr >

<td width="401" >Android SDK Platform 2.1_r2 Revision 2
</td>

<td width="542" >[http://dl-ssl.google.com/android/repository/android-2.1_r02-windows.zip](http://dl-ssl.google.com/android/repository/android-2.1_r02-windows.zip)
</td>
</tr>
<tr >

<td width="401" >Android SDK Platform 1.6_r2 Revision 3
</td>

<td width="542" >[http://dl-ssl.google.com/android/repository/android-1.6_r03-windows.zip](http://dl-ssl.google.com/android/repository/android-1.6_r03-windows.zip)
</td>
</tr>
<tr >

<td width="401" >Android SDK Platform 1.5_r3 Revision 4
</td>

<td width="542" >[http://dl-ssl.google.com/android/repository/android-1.5_r04-windows.zip](http://dl-ssl.google.com/android/repository/android-1.5_r04-windows.zip)
</td>
</tr>
<tr >

<td width="401" >Android SDK Samples for Android API 11, revision 1
</td>

<td width="542" >[http://dl-ssl.google.com/android/repository/samples-3.0_r01-linux.zip](http://dl-ssl.google.com/android/repository/samples-3.0_r01-linux.zip)
</td>
</tr>
<tr >

<td width="401" >Android SDK Samples for Android API 10, revision 1
</td>

<td width="542" >[http://dl-ssl.google.com/android/repository/samples-2.3.3_r01-linux.zip](http://dl-ssl.google.com/android/repository/samples-2.3.3_r01-linux.zip)
</td>
</tr>
<tr >

<td width="401" >Android SDK Samples for Android API 9, revision 1
</td>

<td width="542" >[http://dl-ssl.google.com/android/repository/samples-2.3_r01-linux.zip](http://dl-ssl.google.com/android/repository/samples-2.3_r01-linux.zip)
</td>
</tr>
<tr >

<td width="401" >Android SDK Samples for Android API 8, revision 1
</td>

<td width="542" >[http://dl-ssl.google.com/android/repository/samples-2.2_r01-linux.zip](http://dl-ssl.google.com/android/repository/samples-2.2_r01-linux.zip)
</td>
</tr>
<tr >

<td width="401" >Android SDK Samples for Android API 7, revision 1
</td>

<td width="542" >[http://dl-ssl.google.com/android/repository/samples-2.1_r01-linux.zip](http://dl-ssl.google.com/android/repository/samples-2.1_r01-linux.zip)
</td>
</tr>
<tr >

<td width="401" >Android + Google APIs, API 11, revision 1
</td>

<td width="542" >[http://dl-ssl.google.com/android/repository/google_apis-11_r01.zip](http://dl-ssl.google.com/android/repository/google_apis-11_r01.zip)
</td>
</tr>
<tr >

<td width="401" >Android + Google APIs, API 10, revision 1
</td>

<td width="542" >[http://dl-ssl.google.com/android/repository/google_apis-10_r01.zip](http://dl-ssl.google.com/android/repository/google_apis-10_r01.zip)
</td>
</tr>
<tr >

<td width="401" >Android + Google APIs, API 9, revision 2
</td>

<td width="542" >[http://dl-ssl.google.com/android/repository/google_apis-9_r02.zip](http://dl-ssl.google.com/android/repository/google_apis-9_r02.zip)
</td>
</tr>
<tr >

<td width="401" >Android + Google APIs, API 8, revision 2
</td>

<td width="542" >[http://dl-ssl.google.com/android/repository/google_apis-8_r02.zip](http://dl-ssl.google.com/android/repository/google_apis-8_r02.zip)
</td>
</tr>
<tr >

<td width="401" >Android + Google APIs, API 7, revision 1
</td>

<td width="542" >[http://dl-ssl.google.com/android/repository/google_apis-7_r01.zip](http://dl-ssl.google.com/android/repository/google_apis-7_r01.zip)
</td>
</tr>
<tr >

<td width="401" >Android + Google APIs, API 4, revision 2
</td>

<td width="542" >[http://dl-ssl.google.com/android/repository/google_apis-4_r02.zip](http://dl-ssl.google.com/android/repository/google_apis-4_r02.zip)
</td>
</tr>
<tr >

<td width="401" >Android + Google APIs, API 3, revision 3
</td>

<td width="542" >[http://dl-ssl.google.com/android/repository/google_apis-3-r03.zip](http://dl-ssl.google.com/android/repository/google_apis-3-r03.zip)
</td>
</tr>
<tr >

<td width="401" >Google USB Driver package, revision 4
</td>

<td width="542" >[https://dl-ssl.google.com/android/repository/usb_driver_r04-windows.zip](https://dl-ssl.google.com/android/repository/usb_driver_r04-windows.zip)
</td>
</tr>
</tbody>
</table>
**Dbank下载地址：[http://dl.vmall.com/c0m7f1w8rq](http://dl.vmall.com/c0m7f1w8rq)**

如果是Linux平台的朋友，请把windows统一改为linux即可，mac平台的朋友改为macosx即可。

需要说明的是，文档和样例都是同样的地址docs-2.2_r01-linux.zip,samples-2.2_r01-linux.zip,samples-2.1_r01-linux.zip。

五，解压文档到指定目录

把android开头的文件解压到platforms目录下

把goole_apis开头的文件解压到add-ons目录下

把market_licensing-r01.zip解压到market_licensing目录下

把tools_r07-windows.zip解压到tools目录下（前面清空了该文件夹）

把docs-2.2_r01-linux.zip解压到docs

把samples-2.2_r01-linux.zip和samples-2.1_r01-linux.zip解压到samples目录下

把usb_driver_r03-windows.zip解压到usb_driver目录下。

基本上安装工作就完成了。

再打开SDK Setup.ext发现，它会找到我们已经安装的内容。

不过，可以也会有内容要更新或者安装，因为你看到该文章时，有可能已经有了更新的内容。

然后，将你的安装目录/tools加到系统环境变量，把安装目录加到Android_Home。就完成了整个安装。
