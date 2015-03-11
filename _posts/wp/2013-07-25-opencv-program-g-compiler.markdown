---
author: Yourtion
comments: true
date: 2013-07-25 05:18:20+00:00
excerpt: 使用在Ubuntu下使用g++编译一个opencv的项目，用作者写的sh文件编译一直出错，研究了许久，终于找到解决的方法。共享之！
layout: post
slug: opencv-program-g-compiler
title: g++编译opencv程序
wordpress_id: 3816
categories:
- OpenCV
tags:
- 编译
---
{% include JB/setup %}

使用在Ubuntu下使用g++编译一个opencv的项目，用作者写的sh文件编译一直出错，研究了许久，终于找到解决的方法。共享之！

原来的编译代码如下：

```
g++ `pkg-config opencv --libs --cflags opencv` tclip.cpp -o tclip
```

编译出错信息如下：

[![opencv-err]({{ IMAGE_PATH }}2013/07/1111-560x502.jpg)]({{ IMAGE_PATH }}2013/07/1111.jpg)



研究一番发现是opencv的库没有成功的调用，找了很久文档，发现编译的命令有问题，改成下面的命令就正常了。

```
g++ tclip.cpp -o tclip `pkg-config --cflags --libs opencv`
```


