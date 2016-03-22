---
layout: post
date: 2016-03-21 19:00:04 +08:00
slug: install-swift-and-solve-library-not-loaded
title: "Swift开发环境搭建及问题解决"
author: Yourtion
keywords: ["Swift","Swift Development Snapshots","dyld Library not loaded","@rpath/libswiftCore.dylib"]
description: "使用 Swift 写服务器端代码，折腾了一下在 Mac 上安装 Dev 版本的 Swift，结果还踩了很大的一个坑，安装完成后一直显示 dyld: Library not loaded: @rpath/libswiftCore.dylib，摸索了好一段时间终于解决了问题。"
category: "Mac"
tags: ["解决问题"]
---
{% include JB/setup %}

最近打算研究一下使用 Swift 写服务器端代码，折腾了一下在 Mac 上安装 Dev 版本的 Swift，结果还踩了很大的一个坑，安装完成后一直显示`dyld: Library not loaded: @rpath/libswiftCore.dylib`，找了很多资料都是在工程中的解决方法，摸索了好一段时间终于解决了问题。

## 安装Swift

1. 从 Swift 的官方网站下载最新的 Swift 的开发版”Latest Development Snapshots“
2. 点击安装，安装完成后 Xcode toolchain 位于 `/Library/Developer/Toolchains/ `
3. 添加 Swift toolchain 到 PATH 上：在`~/.bashrc`末尾添加:
	`export PATH=/Library/Developer/Toolchains/swift-latest.xctoolchain/usr/bin:$PATH` 

重新打开终端，输入`swift --version`可以看到如下信息就是安装已经完成。

```bash
$ swift --version
Apple Swift version 3.0-dev (LLVM 699a786c15, Clang 77080f2c03, Swift d22638766e)
Target: x86_64-apple-macosx10.9

```

## 解决 dyld: Library not loaded

安装完 Swift 的“Xcode Swift Development Snapshot”后，在终端行执行 `swift build --help` 出现下列错误：

```bash
$ swift build --help
dyld: Library not loaded: @rpath/libswiftCore.dylib
  Referenced from: /Library/Developer/Toolchains/swift-DEVELOPMENT-SNAPSHOT-2016-03-16-a.xctoolchain/usr/bin/swift-build
  Reason: image not found
[1]    14293 trace trap  swift build --help
```

意思大概是指找不到 `libswiftCore.dylib`。网上很多的解决`dyld: Library not loaded`的文章都是说在工程中如何解决这个问题，对于在终端运行的问题没有相关的答案。

研究了一番，解决问题的关键在于 `libswiftCore` 的文件位置查找，在`~/.bashrc`末尾添加：

`export DYLD_LIBRARY_PATH=/Library/Developer/Toolchains/swift-latest.xctoolchain/usr/lib/swift/macosx:$DYLD_LIBRARY_PATH` 

将动态库的查找位置添加到环境变量中即可。

此时重新执行``，会看到如下输出就是工作已经正常：

```bash
$ swift build --help
OVERVIEW: Build sources into binary products

USAGE: swift build [options]

MODES:
  --configuration <value>        Build with configuration (debug|release) [-c]
  --clean[=<mode>]               Delete artefacts (build|dist) [-k]
  --init <mode>                  Creates a new Swift package (executable|library)
  --fetch                        Fetch package dependencies
  --generate-xcodeproj [<path>]  Generates an Xcode project for this package [-X]

OPTIONS:
  --chdir <value>    Change working directory before any other operation [-C]
  -v[v]              Increase verbosity of informational output
  -Xcc <flag>        Pass flag through to all C compiler instantiations
  -Xlinker <flag>    Pass flag through to all linker instantiations
  -Xswiftc <flag>    Pass flag through to all Swift compiler instantiations
```

## 测试编译

创建 `Hello` 工程：

```bash
$ mkdir Hello
$ cd Hello
$ touch Package.swift
```

创建 `Sources/` 目录并添加 `main.swift` 文件：

```bash
$ mkdir Sources
$ cd Sources
$ touch main.swift
$ open main.swift
```

在 `main.swift` 文件中输入并保存：

```swift
print("Hello, world!")
```

回到 `Hello` 目录并执行 `swift build` 命令：

```bash
$ cd ..
$ swift build
Compiling Swift Module 'Hello' (1 sources)
Linking .build/debug/Hello
```

执行 `.build/debug/Hello`：

```bash
$ .build/debug/Hello
Hello, world!
```

看到 “Hello, world!” 就是没问题啦。
