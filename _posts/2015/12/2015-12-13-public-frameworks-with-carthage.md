---
layout: post
date: 2015-12-13 16:20:05
slug: public-frameworks-with-carthage
title: "使用Carthage发布Framework"
author: Yourtion
keywords: ["Dynamic frameworks", "Carthage", "framework"]
description: "使用Carthage发布Framework流程与步骤"
category: "iOS"
tags: ["Carthage"]
---
{% include JB/setup %}

最近开始尝试使用 Carthage 来管理 Swift 项目中的依赖包，对于这种去中心化的包管理还是比较喜欢的，因为很多时候项目的依赖就比较简单，虽然 CocoaPods 提供更多的功能，但是在现有的网络环境下，下载或者更新一次还是比较麻烦的。

因为 Carthage 旨在用最简单的方式添加 `frameworks` 到 `Cocoa` 应用，所以官方只支持 `Dynamic frameworks` 。`Dynamic frameworks` 在 OSX 上支持任何版本，iOS 上只支持 iOS8 及以上版本。

加上最近在写一个 HTTPDNS 的库，就想尝试一下使用 Carthage 来发布相应的包。

## 创建 Framework 工程

由于 Carthage 没有中心化的 `package list`，没有项目说明格式，大部分 `frameworks` 应该自动构建。 [`HTTPDNS`](https://github.com/yourtion/HTTPDNS-Swift) 项目一开始使用的还是之前 CocoaPods 的开发思维，没有创建一个 `Dynamic frameworks` ，所以切换到 Carthage 的第一步就是将工程转换成 `Dynamic frameworks`。

转换的方式其实也不复杂，就是新建一个 `Project`，并选择 `Framework & Library` 中的 `Cocoa Touch Framework`，其他的设置跟新建其他项目一致，新建完项目后就把原有的代码放到 `Framework` 工程中，能 Build 成功就基本没问题了。

[![create-framework-project]({{ IMAGE_PATH }}2015/12/create-framework-project.JPG)]({{ IMAGE_PATH }}2015/12/create-framework-project.JPG)

## Carthage 对于 `framework` 的特定要求

### 分享你的 Xcode schemes

Carthage 只构建从 `.xcodeproj` 分享出来的 Xcode schemes。可以通过运行 `carthage build --no-skip-current` 来检测所有的 intended schemes 是否构建成功，然后检查 `Carthage/Build` 文件夹。

如果运行命令的时候，一个重要的 `scheme` 没有构建成功，打开 Xcode 在构建菜单选择 `Manage Schemes` （如下图）

[![manage-schemes]({{ IMAGE_PATH }}2015/12/manage-schemes.JPG)]({{ IMAGE_PATH }}2015/12/manage-schemes.JPG)

对于需要构建的 `scheme` 勾选 `Shared` （如下图）

[![add-scheme-shared]({{ IMAGE_PATH }}2015/12/add-scheme-shared.JPG)]({{ IMAGE_PATH }}2015/12/add-scheme-shared.JPG)

这样 Carthage 可以发现它。

### 解决构建失败

如果运行 `carthage build --no-skip-current` 时遇到构建失败，尝试运行 `xcodebuild -scheme SCHEME -workspace WORKSPACE build` 或者 `xcodebuild -scheme SCHEME -project PROJECT build (用具体值)` 看是否出现同样的错误。这很有可能提供足够的信息来解决问题。

*如果 Apple developer tools 安装有多个版本(比如安装了Xcode beta)，使用 `xcode-select` 来选择 Carthage 最终使用哪个版本。*

### 给稳定版本打标签

Carthage 通过搜索发布到仓库中的 `tag` 来决定 `framework` 的哪个版本是可用的，并试着将每个 `tag` 翻译成 `semantic version`。比如，`tag v1.2`，语义版本是 `1.2.0`。

没有数字版本号的 `tag`，或者 有任何字符跟在数字版本号后边（比如：`1.2-alpha-1` ）目前是不支持的，将会被忽略。

### 将预构建的 frameworks 归档到 zip 文件

如果依附于一个 GitHub Release，Carthage 自动使用预构建 `framework`，而不是从头构建。

为了给预构建 `framework` 提供一个指定的 `tag`，所有支持的平台的二进制文件被压缩成一个 `archive`，这个 `archive` 依附于一个发布的响应那个 `tag` 的 `Release`。附件应该包含 `.framework` 在它们的名字（比如：`ReactiveCocoa.framework.zip` ），来表明 Carthage 它包含了二进制包。

### 声明你的兼容性

如果想声明你的项目支持 Carthage，可用添加一个兼容性的 badge 到 README文件，只需简单插入如下 Markdown：

```
![Carthage compatible](https://img.shields.io/badge/Carthage-compatible-4BC51D.svg?style=flat)](https://github.com/Carthage/Carthage)
```

### CarthageKit

Carthage 大部分的功能都被打包到一个称作 CarthageKit 的 framework 中了。
如果喜欢使用 Carthage 作为另一个工具的一部分，或者扩展 Carthage 的功能，看一下 CarthageKit 源码中的 API 是否符合你的需求。

## 参考：

  1. [Carthage README](https://github.com/Carthage/Carthage/blob/master/README.md)
  2. [(译)Carthage 使用说明](http://devtian.me/2015/08/11/translate-carthage-readme/)