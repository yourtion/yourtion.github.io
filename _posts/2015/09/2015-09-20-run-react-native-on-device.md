---
layout: post
date: 2015-09-20 00:07:06
slug: run-react-native-on-device
title: "React Native真机调试"
author: Yourtion
keywords: ["React Native", "_RCTSetLogFunction","PropertyFinderTests"]
description: "run-react-native-on-device and solve Undefined symbols error"
category: "React"
tags: ["Xcode","React Native","解决问题"]
---
{% include JB/setup %}

最近在尝试使用 React Native 做一些东西，发现真机调试还是有一些坑存在的。

## iOS 真机调试

首先，你要让调试用电脑和你的手机必须处于相同的 WiFi 网络中下

1. 打开 iOS 项目的 `AppDelegate.m` 文件
2. 更改 `jsCodeLocation` 中的 `localhost` 改成你电脑的局域网IP地址
3. 在 `Xcode` 中，选择你的手机作为目标设备，`Run` 即可

**可以通过晃动设备来打开开发菜单(重载、调试等)**

## Android 真机调试

在 Android 设备上打开 `USB debugging` 并连接上电脑启动调试。

在真机上运行的方法与在模拟器上运行一致，都是通过 `react-native run-android` 来安装并且运行你的 React Native 应用。

如果不是 Android 5.0+ (API 21) ，那么就没办法通过 `adb reverse` 进行调试，需要通过 WiFi 来连接上你的开发者服务器

让调试用电脑和你的手机必须处于相同的 WiFi 网络中下

1. 打开震动菜单 (摇动设备)
2. 前往 `Dev Settings`
3. 选择 `Debug server host for device`
4. 输入调试用电脑的局域网IP
5. 点击 `Reload JS`

## Xcode7上运行报错解决方法

在 Xcode7 指定真机运行，结果报出如下错误：

```
Undefined symbols for architecture arm64:
  "_RCTSetLogFunction", referenced from:
      -[PropertyFinderTests testRendersWelcomeScreen] in PropertyFinderTests.o
ld: symbol(s) not found for architecture arm64
clang: error: linker command failed with exit code 1 (use -v to see invocation)
```

一开始以为的 React Native 库的问题，查找了一下资料，研究了一下，原来在 `Build Setting` 中设置 `Dead Code Stripping` 为 `No` （如下图）就可以解决了

[![React-Native-Dead-Code-Stripping]({{ IMAGE_PATH }}2015/09/React-Native-Dead-Code-Stripping.JPG)]({{ IMAGE_PATH }}2015/09/React-Native-Dead-Code-Stripping.JPG)


