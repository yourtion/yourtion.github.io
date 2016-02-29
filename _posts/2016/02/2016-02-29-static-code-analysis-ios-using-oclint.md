---
layout: post
date: 2016-02-29 12:27:17
slug: static-code-analysis-ios-using-oclint
title: "使用OClint进行iOS项目的静态代码扫描"
author: Yourtion
keywords: ["OClint","static code analysis"]
description: "对于iOS开发需要一个静态分析代码工具，帮助我们发布运行应用前找到代码潜在的问题。OCLint就是一个建立在Clang上的工具,能够发现代码中潜在的问题。这里主要介绍的是其安装与使用。"
category: "iOS"
tags: ["代码质量"]
---
{% include JB/setup %}

最近需要一个静态分析代码工具，帮助我们发布运行应用前找到代码潜在的问题。

其实对于iOS开发，我们的日常开发上已经用到了这样一个静态分析的工具，那就是 `Clang`， `Clang` 是支持 `C`、`C++`、`Objective-C` 和 `Swift` 的一个前端编译工具，他将 `OC` 或者 `Swift` 的代码输出抽象语法树(Abstract Syntax Tree)，然后编译成 LLVM 的 bitcode，最后由 LLVM 编译成 machine code。这个工具支撑着我们日常的开发和调试。

`OCLint` 就是一个建立在 `Clang` 上的工具,能够发现代码中潜在的问题。具体的功能请见[官方文档](http://docs.oclint.org/en/stable/)，这里主要介绍的是其安装与使用。

## 安装软件

### XCtool

```bash
brew install xctools
```

### OClint 

```bash
brew tap oclint/formulae
brew install oclint
```			
			
## 测试

进入项目目录(以 `SuperLogger` 为例)，

下载项目切换到有问题的位置（），并进入 `SuperLoggerDemo` 目录：

```
git clone https://github.com/yourtion/SuperLogger.git
cd SuperLogger
git checkout 0e64637459996ed91e0dd15718efb5d7200a9971
cd SuperLoggerDemo
```

测试执行：

```
# Cleanup before building
rm -f compile_commands.json
xctool -project SuperLoggerDemo.xcodeproj -scheme SuperLoggerDemo clean

# Build Project
xctool build \
	-project SuperLoggerDemo.xcodeproj -scheme SuperLoggerDemo \
	-reporter json-compilation-database:compile_commands.json

# Analyze Project
oclint-json-compilation-database -e Pods -- \
	-max-priority-1=100000 \
	-max-priority-2=100000 -max-priority-3=100000 \
   	-disable-rule=InvertedLogic \
   	-disable-rule=CollapsibleIfStatements \
 	-disable-rule=UnusedMethodParameter \
	-disable-rule=LongLine \
	-disable-rule=LongVariableName \
	-disable-rule=ShortVariableName \
	-disable-rule=UselessParentheses \
	-disable-rule=IvarAssignmentOutsideAccessorsOrInit | sed 's/\(.*\.\m\{1,2\}:[0-9]*:[0-9]*:\)/\1 warning:/'

# Final cleanup
rm -f compile_commands.json
```

## 输出

```
OCLint Report

Summary: TotalFiles=14 FilesWithViolations=4 P1=0 P2=2 P3=6

SuperLoggerPreviewView.m:77:37: warning: replace with container literal [migration|P3]
SuperLogerListView.m:206:37: warning: empty catch statement [empty|P2]
SuperLogerListView.m:25:15: warning: empty if statement [empty|P2]
SuperLogerListView.m:119:1: warning: long method [size|P3] Method with 92 lines exceeds limit of 50
SuperLogerListView.m:171:41: warning: replace with container literal [migration|P3]
SuperLogerListView.m:110:21: warning: replace with object subscripting [migration|P3]
SuperLogger.m:60:30: warning: replace with object subscripting [migration|P3]
SuperLogger.m:108:31: warning: replace with object subscripting [migration|P3]

[OCLint (http://oclint.org) v0.10.2]

```

具体问题可以参考：http://docs.oclint.org/en/stable/rules/index.html

## 修复后

```
OCLint Report

Summary: TotalFiles=14 FilesWithViolations=0 P1=0 P2=0 P3=0


[OCLint (http://oclint.org) v0.10.2]
```

大概的功能就是这样，使用过程有什么问题欢迎大家一起交流
