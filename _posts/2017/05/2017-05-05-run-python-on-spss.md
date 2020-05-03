---
layout: post
date: 2017-05-05 17:05:25 +0800
slug: run-python-on-spss
title: "使用Python操作SPSS"
author: Yourtion
keywords: ["SpssClient", "SPSS"]
description: ""
category: "Python"
tags: ["SPSS", "Python"]
---
{% include JB/setup %}

因为最近需要在 SPSS 的输出中提取出相应表格的内容数据并进行相应的计算，以便自动化处理输出的结果，所以开始研究了一下 SPSS 上的 Python 操作，使用 SpssClient 对输出进行处理。

首先讲一下怎样在 SPSS 上运行 Python 脚本。

## 使用 Python

使用 Python 脚本之前需要确保你安装了 `Python Essentials`，有两种方式调用 Python 脚本（Python2 和 Python3 类似）。

### 通过脚本运行

- 编辑好了一个python脚本文件（*.py）
- 打开【运行脚本】对话框以后，直接选择打开并运行

### 在 syntax 中插入

- 将 Python 代码插入到 syntax 的 `BEGIN PROGRAM` 和 `END PROGRAM` 之间
- 选中所编写的代码以后，点击工具栏上面的绿色三角形，就可以运行

## SpssClient 入门

使用 Python 控制 SPSS 的时候，我们必须在使用 SPSS 的任何功能前，先启动 SPSS Client，这就是用到了 SpssClient 的 `StartClient` 方法。

假如我们完成了所有 SPSS 的工作，这时候我们就可以使用 `StopClient` 方法来结束 SPSS Client 进程。

假设在 syntax 中运行下面代码：

```python
BEGIN PROGRAM.

# 导入 SpssClient 模块
import SpssClient

# 启动 SPSS Client
SpssClient.StartClient()

# 打印当前工作目录
print SpssClient.GetCurrentDirectory()

# 结束 SPSS Client
SpssClient.StopClient()

END PROGRAM.
```

点击运行后就能看到相应的输出（根据系统还有版本会有不同）

```
/Applications/IBM/SPSS/Statistics/24/SPSSStatistics.app/Contents
```

[![]({{ IMAGE_PATH }}2017/05/spss-1.png)]({{ IMAGE_PATH }}2017/05/spss-1.png)

## 关于 SpssClient 

从下图可以看到 SpssClient 有五大功能类别：`DataDocList`，`SyntaxDocsList`，`OutputDocsList`，`SpssServerConfList`，`SpssScriptContext`

[![]({{ IMAGE_PATH }}2017/05/spss-2.png)]({{ IMAGE_PATH }}2017/05/spss-2.png) 

### DataDocList

获取 SPSS 的数据文件列表。用它来读取、修改、操作数据，数据文件的后缀名是 `sav`。

### SyntaxDocsList

获取 SPSS 的 syntax 文件列表。里面都是 syntax 代码，或者可能掺杂有 Python 代码，它用于读取、修改、操作 syntax 代码，syntax 文件的后缀名是 `sps`。

### OutputDocsList

获取 SPSS 的统计结果输出文件列表。里面存放着 SPSS 的统计结果，我们可以在 Python 中使用该类来修改、操作结果数据，结果输出文件的后缀名是 `spv`。

### SpssServerConfList

该类用于 SPSS Server，也就是 SPSS 服务器。

### SpssScriptContext

该类用于返回脚本文件的环境。

## 预告

下面的文章主要讨论和使用`DataDocList` 和 `OutputDocsList`，用于获取数据文件还有输出的内容，特别是 `OutputDocs` 中 `OutputItem` 的 `PivotTable`， 用于获取输出数据中的表格。

