---
layout: post
date: 2015-03-26 17:00:53
slug: automator-batch-generate-icons
title: "使用Automator批量生成图标"
author: Yourtion
keywords: ["automator", "batch generate icons"]
description: "使用Automator批量生成生成各种尺寸的图标"
category: "Mac"
tags: ["插件"]
---
{% include JB/setup %}

因为设计师需要在完成图标设计后一次性生成各种尺寸的图标给工程师，使用Sketch虽然可以做到，但是还是很麻烦，所以决定给他写个脚本自动完成这个工作。

因为工作环境都是Mac，自动化肯定首选```Automator```，如果使用原生的Crop方法会很麻烦，而且自动化程度不够高，所以就想使用bash脚本，搜索了一下，发现Mac已经自带了图像处理的命令行工具```sips```，具体用法就不细说了，可以参考官方文档：[sips ManPages](https://developer.apple.com/library/mac/documentation/Darwin/Reference/ManPages/man1/sips.1.html)

大致用法：

```bash
sips [image-modification-functions] imagefile ... [--out result-file-or-dir]
```

然后就祭上```Automator```，创建一个```Service```，选择```image files```，然后添加```Utilities```->```Run Shell Script```，输入下面内容：

```bash
sizes=(144 96 72 29)
for f in "$@"; do
	for size in ${sizes[@]};do	
		sips -Z $size $f -o ${f/.png/_$size.png}
	done
done
```

这个是最基本的版本，可以通过添加```sizes```数组的内容增加需要生成的尺寸。

后来因为iOS有```@2x```这样的规则，所以又进行了一番修改，生成了特定的版本。

```bash
sizes=(144 76 144 120 180 80 160 57 114 40 80 120 29 58 97)
sizen=(144 76 76@2x 60@2x 60@3x 80 80@2x 57 57@2x 40 40@2x 40@3x 29 29@2x 29@3x)
for f in "$@" 
do
	for i in "${!sizes[@]}"; do	
		sips -Z ${sizes[$i]} $f -o ${f/.png/_${sizen[$i]}.png}
	done
done
```

保存为```Build icons```，然后在Finder中选中要生成的图标源文件（必须是png哦），选择```Services```中的```Build icons```就会在源文件同目录生成一批你需要的图标了。

源码和生成的Automator文件在GitHub：[https://github.com/yourtion/AutomatorGenerateICON](https://github.com/yourtion/AutomatorGenerateICON)，点击“Download ZIP”下载压缩包后，解压，双击直接安装就OK了。

欢迎大家反馈意见建议~
