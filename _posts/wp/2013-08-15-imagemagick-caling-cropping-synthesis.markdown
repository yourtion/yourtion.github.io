---
author: Yourtion
comments: true
date: 2013-08-15 02:53:41+00:00
excerpt: 最近的项目里面需要对书籍的封面进行处理，就是加一条阴影线形成书脊的凹凸感，然后将书脊切出，分成两部分，以便客户端实现打开动画。由于需要在服务器端处理，使用就研究使用imagemagick来进行。同时准备封装了一个Node.js和Python的方法，主要还是讲一下然后使用imagemagick来对图片进行缩放、合成后进行裁剪吧。
layout: post
slug: imagemagick-caling-cropping-synthesis
title: 使用ImageMagick进行图片缩放、合成与裁剪
wordpress_id: 3867
categories:
- Node.js
tags:
- ImageMagick
---
{% include JB/setup %}

最近的项目里面需要对书籍的封面进行处理，就是加一条阴影线形成书脊的凹凸感，然后将书脊切出，分成两部分，以便客户端实现打开动画。由于需要在服务器端处理，使用就研究使用```imagemagick```来进行。同时准备封装了一个```Node.js```和```Python```的方法，主要还是讲一下然后使用```imagemagick```来对图片进行缩放、合成后进行裁剪吧。

首先素材文件如下（左边未处理封面，右边为需要合成上去的阴影）：

[![fmsc]({{ IMAGE_PATH }}2013/08/fmsc.png)]({{ IMAGE_PATH }}2013/08/fmsc.png)

安装```ImageMagick```的过程就不讲了，可以参考官网的安装方法：http://www.imagemagick.org/script/install-source.php

首先对封面图片```file.png```进行缩放，缩放到高度为```1024```，生成```newfile.png```方便与阴影图片合成，命令如下：

```bash
convert -resize x1024 file.png newfile.png
```

convert进行缩放的方法如下：


```convert -resize 1024 file.jpg newfile.jpg```

得到图片宽为1024，高根据原始图片比例计算而来

```convert -resize x768 file.jpg newfile.jpg```

得到的图片高位768，宽根据原始图片比例计算而来

```convert -resize 1024x768! file.jpg newfile.jpg```

固定宽高缩放，不考虑原是图宽高的比例，把图片缩放到指定大小。

```convert -resize "1024x768>" file.jpg newfile.jpg```

只有当src.jpg的宽大于1024或高大于768时候，才进行缩小处理，否则生成newfile.jpg和file.jpg具有一样的尺寸。

convert -resize "1024x768<" file.jpg newfile.jpg
只有当src.jpg的宽小于1024或高小于768时候，才进行放大处理，否则生成newfile.jpg和file.jpg具有一样的尺寸。</blockquote>


接下来就是将阴影文件合成到封面上（将yy.png从左上角合成到file.png生成newfile.png）：

```
composite -gravity northwest yy.png file.png newfile.png
```

这里主要解释一下-gravity参数：


```-gravity``` ```northwest```指右上角
如果要求在正中间，参数为```center```
如果要求在右下角，参数为```southeast```
其他按照方位进行


合成后效果如下：

[![fmyy]({{ IMAGE_PATH }}2013/08/fmyy.png)]({{ IMAGE_PATH }}2013/08/fmyy.png)

最后就是图片的裁剪，将图片分为两部分，阴影部分```left.png```和其他部分```right.png```：

```bash
#left：
convert file.png -gravity southwest -crop 31x1024+0+0 left.png

#right：
convert file.png -gravity southeast -crop 737x1024+0+0 right.png
```

裁剪方法的调整如下：

```convert file.png -crop widthxheight+x+y newfile```

其中```widthxheight```是目标图片的尺寸，```+x+y```是原始图片的坐标点，这两组值至少要出现一组，也可以同时存在。另外该命令也可使用gravity来重新定义坐标系统。


最后成果如下：

[![fmwc]({{ IMAGE_PATH }}2013/08/fmwc.png)]({{ IMAGE_PATH }}2013/08/fmwc.png)
