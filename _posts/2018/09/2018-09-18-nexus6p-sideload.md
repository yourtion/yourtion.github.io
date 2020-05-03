---
layout: post
date: 2018-09-18 18:00:31 +0800
slug: nexus6p-sideload
title: "Nexus6P SideLoad"
author: Yourtion
keywords: ["Nexus6P", "SideLoad"]
description: "平滑升级 Nexus6P"
category: "Android"
tags: ["Android"]
---
{% include JB/setup %}


1. 官方下载最新版本的原厂镜像： https://developers.google.com/android/ota，将下载回来的 zip 景象文件（不要解压）放到 adb.exe 所在的目录（ adb 下载： https://developer.android.com/studio/releases/platform-tools.html ）；
2. 手机连电脑，然后 CMD 命令行进入该目录，执行命令：adb devices，看到手机序列号，说明链接成功；
3. 执行命令：adb reboot recovery，让手机重启进入 recovery （手机上会看到一个绿色的机器人），按住电源键不放，按一下音量加，此时会出现一堆菜单。松开电源键，使用音量减来移动菜单到 Apply update from ADB 这一行，按一下电源键确认；
4. 执行命令：adb sideload ota_file.zip ，其中 ota_file.zip 就是你第一步下载回来的那个 zip ；
5. 等待命令行的进度到 100%，手机最底部会显示 Install from ADB complete，此时按音量加键，选择 Reboot system now，按一下电源键确认，手机重启；
6. 重启过程比较漫长，耐心等候，等进入桌面后，检查 update，如果发现不是 8.1，退出来，过 1 分钟进去再看。

注意：这种升级方法是 Google 镜像下载网页上推荐的，整个过程很顺利，而且不会丢失原有数据。
