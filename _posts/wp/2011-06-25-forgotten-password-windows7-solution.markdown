---
author: Yourtion
comments: true
date: 2011-06-25 13:59:57+00:00
excerpt: 由于无法使用管理员帐号进入Windows7，辅助工具比较大，已经回不到xp时代的pe一键删除密码了，不过用Windows7的system账户运行cmd命令可以强制修改账户密码!就拿xp+Windows7为例(没有安装双系统也可以进入pe)
layout: post
slug: forgotten-password-windows7-solution
title: 忘记Windows7密码最新解决方法(Windows7密码破解)
wordpress_id: 2198
categories:
- 电脑技巧
tags:
- 解决问题
---
{% include JB/setup %}

由于无法使用管理员帐号进入Windows7，辅助工具比较大，已经回不到xp时代的pe一键删除密码了，不过用Windows7的system账户运行cmd命令可以强制修改账户密码!就拿xp+Windows7为例(没有安装双系统也可以进入pe)。

**第一步**：由于cmd在系统目录，文件更改首先要获得文件所有权。

打开“```C:/windows/system32```”(假设Windows7安装在C盘。)，右击“```arrator.ex```e”选择“权限”——高级——所有者，将当前xp下管理员帐号设置为所有者(如果没有当前帐号在列表，则单击“其他账户”，手动输入当前账户名)。单击“确定”返回权限设置窗口，点击“添加”，将当前管理员帐户添加到列表，并将账户对该文件读取权限设置为“完全控制”。

**第二步**：操作同上。

设置当前账户对“```cmd.exe```”权限为完全控制，然后将 “```narrator.exe```”重命名为“```narrator1.exe```”，“```cmd.exe```”重命名为“```narrator.exe```”。

**第三步**：(如果是以administrator账户登录的就不用这一步了)重启登录 Windows7。

Windows7登录界面单击右下角的“轻松访问”按钮，在打开的窗口勾选“启动讲述人”，此时启动的就是cmd窗口了(是以system身份开启的，自然有管理员权限啦～)，在cmd输入下面的命令开启administrator账户，重启即可使用administrator了。
