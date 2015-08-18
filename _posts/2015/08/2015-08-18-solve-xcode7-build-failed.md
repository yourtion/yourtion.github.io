---
layout: post
date: 2015-08-18 15:58:33
slug: solve-xcode7-build-failed
title: "解决Xocde7编译失败问题"
author: Yourtion
keywords: ["xcode7", "build failed", "bitcode"]
description: ""
category: "iOS"
tags: ["Xcode"]
---
{% include JB/setup %}

升级了Xcode7-beta之后，原来正常编译打包的项目都出了问题，提示出错信息如下：

> ld: 'ShareSDK/UI/ShareSDKShareActionSheet.framework/ShareSDKShareActionSheet' does not contain bitcode. You must rebuild it with bitcode enabled (Xcode setting ENABLE_BITCODE), obtain an updated library from the vendor, or disable bitcode for this target. for architecture arm64
clang: error: linker command failed with exit code 1 (use -v to see invocation)
	
这个 “You must rebuild it with bitcode enabled” 中的 `bitcode` 又是个什么东西？查了一下，原来：

> Bitcode is an intermediate representation of a compiled program. Apps you upload to iTunes Connect that contain bitcode will be compiled and linked on the App Store. Including bitcode will allow Apple to re-optimize your app binary in the future without the need to submit a new version of your app to the store.

说的是 `bitcode` 是被编译程序的一种中间形式的代码。包含 `bitcode` 配置的程序将会在 App Store 上被编译和链接。`bitcode` 允许苹果在后期重新优化我们程序的二进制文件，而不需要我们重新提交一个新的版本到 App Store 上。

解决上面遇到的错误，要么让第三方库支持，要么关闭 `target` 的 `bitcode` 选项。

实际上在Xcode 7中，我们新建一个iOS程序时，bitcode 选项默认是设置为YES的。我们可以在 `Build Settings` -> `Enable Bitcode` 选项中看到这个设置。如下图所示：

[![DisableBitcode]({{ IMAGE_PATH }}2015/08/DisableBitcode.JPG)]({{ IMAGE_PATH }}2015/08/DisableBitcode.JPG)

不过，对于三个平台：iOS，Mac OS，watchOS，Bitcode的支持的不一样的。

- iOS，`bitcode` 是可选的
- WatchOS，`bitcode` 是必须的
- Mac OS，不支持 `bitcode`	

有兴趣的可以移步[LLVM Bitcode File Format](http://llvm.org/docs/BitCodeFormat.html#llvm-bitcode-file-format) 进一步了解 bitcode 。
