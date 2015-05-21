---
layout: post
date: 2015-05-21 14:44:01
slug: solve-library-missing-required-architecture-x86_64
title: "解决静态库 missing required architecture x86_64问题"
author: Yourtion
keywords: ["library","architecture","x86_64"]
description: "最近在使用自己编译的静态库做项目之后发现一个问题，没办法在本机的iPhone6等模拟器上运行项目，提示“missing required architecture x86_64”，在iPhone5的模拟器上是正常的，研究了一下，原来跟我生成静态库的工程有关。解决了问题，分享之。"
category: "ios"
tags: ["解决问题"]
---
{% include JB/setup %}

最近在使用自己编译的静态库做项目之后发现一个问题，没办法在本机的iPhone6等模拟器上运行项目，提示“missing required architecture x86_64”，在iPhone5的模拟器上是正常的，研究了一下，原来跟我生成静态库的工程有关。解决了问题，分享之。

我的静态库是使用脚本完成编译的，编译模拟器对应的库是使用```xcodebuild ```脚本进行编译的，脚本如下：

```bash
xcodebuild -target $CONFIGURATION \
			-configuration $CONFIGURATION \
			-sdk iphonesimulator \
			-arch i386
```

这个是我很早前就在用的脚本，那时候还没有iPhone5s和iPhone6这些64位架构的机器，所以```-arch i386```是没问题的，现在有了这些机器，自然模拟器的库就没有对应的```x86_64```的库。

参考[苹果官方文档](https://developer.apple.com/library/mac/documentation/Darwin/Conceptual/64bitPorting/building/building.html)后，在静态库工程中的```VALID_ARCHS```添加```x86_64```，如下图：

[![Set_VALID_ARCHS]({{ IMAGE_PATH }}2015/05/2015-05-21_1.JPG)]({{ IMAGE_PATH }}2015/05/2015-05-21_1.JPG)

这样正常Archive的库就是支持64位模拟器的了，如果是跟我一样使用脚本，脚本修改如下：

```bash
xcodebuild -target $CONFIGURATION \
			-configuration $CONFIGURATION \
			-sdk iphonesimulator \
			-arch i386 \
			-arch x86_64
```
