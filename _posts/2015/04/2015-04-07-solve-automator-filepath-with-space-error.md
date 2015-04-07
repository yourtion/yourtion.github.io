---
layout: post
date: 2015-04-07 20:02:04
slug: solve-automator-filepath-with-space-error
title: "解决Automator输入文件路径存在空格出错"
author: Yourtion
keywords: ["automator", "space", "error"]
description: ""
category: "mac"
tags: ["解决问题"]
---
{% include JB/setup %}

之前做了[AutomatorGenerateICON](https://github.com/yourtion/AutomatorGenerateICON)一个批量生成图标的Automator，一开始自己团队的人用着也没问题，后来有用户反馈说在10.10.3下面会出错，自己试了好多次都是正常的。

用户反馈说解决了，原来是存放图片的文件夹名称包含空格，所以就出错了，查了好些资料和文章，试了上面说的各种方法，最后终于解决了这个问题，修复了bug（[Commit#8fdcdae](https://github.com/yourtion/AutomatorGenerateICON/commit/8fdcdae9239fb92cd4c4ba6e0c7867aad0411845)）

解决方法也蛮简单的，之前是使用输入```as arguments```，然后使用下面方法历遍：

```bash
for f in "$@"; do
	# do someting with $f
done
```

这个方法就会遇到文件路径有空格的问题。

把输入改成```to stdin```，然后换用下面的方法进行历遍


```bash
OLDIFS="$IFS"
IFS=$'\n'
while read f; do
	# do someting with $f
done
```

这样就解决了文件路径空格的问题。

欢迎大家使用[AutomatorGenerateICON](https://github.com/yourtion/AutomatorGenerateICON) 并反馈问题。
