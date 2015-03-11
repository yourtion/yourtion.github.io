---
author: Yourtion
comments: true
date: 2013-09-11 02:31:26+00:00
excerpt: 自动打包成不同的包名的APK，同时自动添加各个市场渠道等内容信息，由于需要与后端联动，一键生成，所以必须在服务器上进行Android项目的打包生成，因为服务器是UbuntuServer，没有图像界面，所有只能搭建一个命令行环境，直接执行ant脚本打包
layout: post
slug: ubuntu-server-ant-android-apk
title: UbuntuServer用ant批量打包apk环境搭建
wordpress_id: 3899
categories:
- 服务器
tags:
- Android
- Linux
- Ubuntu
---
{% include JB/setup %}

最近在做一个电子书生成的项目，需要根据电子书的内容资源在线添加后自动打包成不同的包名的APK，同时自动添加各个市场渠道等内容信息，由于需要与后端联动，一键生成，所以必须在服务器上进行Android项目的打包生成，因为服务器是UbuntuServer，没有图像界面，所有只能搭建一个命令行环境，直接执行ant脚本打包，找了一下资料，根据自己的环境配置搭建过程与大家分享


### Ant环境准备


最简单的就是使用：

```
sudo apt-get install ant
```

或者是手动安装：

一、到Apache官网下载最新版本的ant：http://ant.apache.org/ 。解压下载下来的.tar.gz文件：

```
tar -xf apache-ant-1.8.2-bin.tar.gz
```

二、将解压出来的文件移动到/opt/下：sudo mv apache-ant-1.8.2 /opt/ （sudo 不能省，否则没有权限）

三、配置环境变量：sudo vim /etc/profile，在原来基础上添加以下蓝体字：


<blockquote>export ANT_HOME=/opt/apache-ant-1.8.2
export JAVA_HOME=/usr/lib/jvm/java-6-openjdk
export PATH=$JAVA_HOME/bin:$PATH:$ANT_HOME/bin
export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar</blockquote>


四、验证是否安装成功：

```
ant -version
```

Apache Ant(TM) version 1.8.2 compiled on December 20 2010
如此字样，则表示安装成功！


### Android编译环境准备


在http://developer.android.com/sdk/index.html 下载adt-bundle-linux-x86_64-20130729.zip或者相应最新版本，并解压：

```
unzip adt-bundle-linux-x86_64-20130729.zip
```

将解压后的sdk目录拷贝到/opt/sdk

```
cp ./adt-bundle-linux-x86_64-20130729/sdk/ /opt/sdk
```

设置环境变量：

```
vim /etc/bash.bashrc
```

在最下面加上:


<blockquote>export ANDROID_SDK_HOME=/opt/sdk/
export PATH=$PATH:$ANDROID_SDK_HOME/tools:$ANDROID_SDK_HOME/build-tools/android-4.3:$ANDORID_SDK_HOME/platforms/android-18/</blockquote>


保存后运行一下：bash使环境变量生效。

现在可以通过运行android来测试是否成功了！

```
android create project --target "android-18" --name APP --path App --activity MainActivity --package com.yourtion.android
```

在编译生成APK的时候还需要JRE，可能需要先安装，我安装的是JRE7的

```
sudo apt-get install openjdk-7-jre openjdk-7-jdk openjdk-7-jre-lib
```

这样环境就基本OK了，大家使用过程还有什么问题欢迎一起交流！
