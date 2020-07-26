---
layout: post
date: 2020-07-26 18:03:27 +0800
slug: join-file-data-using-awk
title: "使用AWK进行文件内容join"
author: Yourtion
keywords: ["awk", "join-data", "csv"]
description: "通过AWK完成对两个CSV文件进行类似于SQL的join操作的内容合并"
category: "开发笔记"
tags: ["解决问题"]
img: 2020/07/join-file-data-using-awk-1.jpg
---
{% include JB/setup %}


最近在做一个项目，需要在两个不同的数据源上导出两个 CSV 文件，同时对导出的文件进行类似于 SQL 的 join 操作，由于只是一个查询脚本，没办法修改程序或者数据库等功能，所以就想到将 csv 文件导出后，通过 Linux 自带的命令来完成内容的合并。

首选的工具自然是最强大的 AWK 了。

> AWK是一种优良的文本处理工具，Linux及Unix环境中现有的功能最强大的数据处理引擎之一。
> https://zh.wikipedia.org/zh-hans/AWK

## 需求

首先来看一导出的两个 csv 文件：

channel.csv 主要保存渠道 ID 与渠道名称的关系

```csv
id	Name
1	渠道1
2	渠道2
...
``` 

data.csv 记录每个渠道带来的 PV/UV 等信息

```csv
id	pv	uv	submit
2	4	3	2
12	1	1	0
3	1	1	0
...
```

需要的结果是将两个文档进行整合，输出一个完整的csv

```csv
channle	id	pv	uv	submit
渠道2	2	4	3	2
未知	12	1	1	0
渠道3	3	1	1	0
```

## 思路

其实解答的一个思路还是比较简单的，因为渠道 ID 本身不会重复，最简单的方法就是将其转换为一个字典，然后对于 data.csv 的内容根据 id 去字典中获取对应的渠道名称，最后组合到一起。

首先去网上找到了一个在 awk 内按行读取文件的方法，并根据需求将文件内容转换成一个数组（其实 awk 里面数组跟 map 是一样的）。最后再按行拼装数据即可。

需要处理一下渠道 ID 找不到对应的情况，很简单，同一个三元表达式即可 `$1 in File ? File[$1] : "未知"`。

## 最终版本

首先是最核心的 join.awk ，实现了 awk 核心的逻辑：

```awk
function read_file_into_array(file, array, status, record) {
  while (1) {
    status = getline record < file
    if (status == -1) {
      print "Failed to read file " file;
      exit 1;
    }
    if (status == 0) break;
    split(record, a, "\t");
    array[a[1]] = a[2];
  }
  close(file);
}
BEGIN {
  read_file_into_array(CHANNEL, File);
} 
{ 
  if(NR == 1) {
    print "channel\tid\tpv\tuv\tsubmit"
    next
  }
  { printf("%s\t%s\t%s\t%s\t%s\t\n", ($1 in File ? File[$1] : "未知"),$1,$2,$3,$4) }
}
```

执行方法（通过 CHANNEL 参数传入变量）：

```bash
$ awk -v CHANNEL=channel.csv -f join.awk  data.csv
```

运行结果：

[![]({{ IMAGE_PATH }}2020/07/join-file-data-using-awk-1.jpg)]({{ IMAGE_PATH }}2020/07/join-file-data-using-awk-1.jpg)

代码详见：https://github.com/yourtion/BlogCodes/tree/master/awk_join

## 参考

- https://www.unix.com/302417048-post3.html
- https://www.unix.com/303007698-post1.html
- https://blog.csdn.net/bitcarmanlee/article/details/51324585

