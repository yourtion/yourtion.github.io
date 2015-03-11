---
author: Yourtion
comments: true
date: 2013-08-09 02:55:55+00:00
excerpt: 最近在做一个资源上传的项目，期间遇到一个问题，因为上传的图片有一些是用于印刷，使用的是CMYK，上传到服务器后因为web展示是RGB的，所以就发生偏色了。最后还是解决了这个上传CMYIK图片偏色的问题，先上处理结果图，再仔细说具体的实现：
layout: post
slug: solve-cmyk-image-upload-problem
title: 解决CMYK图片上传后偏色问题
wordpress_id: 3851
categories:
- Node.js
tags:
- Node.js
---
{% include JB/setup %}

最近在做一个资源上传的项目，期间遇到一个问题，因为上传的图片有一些是用于印刷，使用的是CMYK，上传到服务器后因为web展示是RGB的，所以就发生偏色了。最后还是解决了这个上传CMYIK图片偏色的问题，先上处理结果图，再仔细说具体的实现：

[![duibi]({{ IMAGE_PATH }}2013/08/duibi-560x560.jpg)]({{ IMAGE_PATH }}2013/08/duibi.jpg)

研究了一下，决定采用服务器进行处理，对上传的CMYK图片进行处理，转换成RGB再替换原图。转换使用一个比较著名强大的工具集ImageMagick（http://www.imagemagick.org/），安装过程就不讲了，可以参考官网的安装方法：http://www.imagemagick.org/script/install-source.php

使用安装后的命令行工具Convert进行转换，使用Convert还要加入颜色的描述文件，使用-profile 参数载入，在Adobe官网下了一套各种描述文件的集合：

[![icc]({{ IMAGE_PATH }}2013/08/icc-560x408.jpg)]({{ IMAGE_PATH }}2013/08/icc.jpg)



经过一轮测试和研究后，发现最通用的CMYK描述文件为JapanColor2001Coated.icc，而转换出来的RGB描述文件使用ColorMatchRGB.icc，因为服务器端使用的是Node.js，所以就用Node.js写了一个Demo共享之，Git地址：[http://code.yourtion.com/learnnodejs/src/c945bd0c96e0/cmyktorgb?at=master](http://code.yourtion.com/learnnodejs/src/c945bd0c96e0/cmyktorgb?at=master)

主要的核心function如下：

判断图片是否为CMYK：

```
function ColorSpace(filename, callback) {
  console.log('Start Identfity');
  var ident = exec('identify -format %[colorspace] ./upload/' + filename,
  function(error, stdout, stderr) {
    console.log('ident');
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
    console.log('ident OK');
    callback(stdout);
  });
}
```

转换CMYK为RGB：

```
function ConvCMYK(filename, callback) {
  console.log('Start');
  var conv = exec('convert ./upload/' + filename + ' -profile ./iccs/JapanColor2001Coated.icc -profile ./iccs/ColorMatchRGB.icc ./upload/' + filename,
  function(error, stdout, stderr) {
    console.log('conv');
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
    console.log('OK');
    callback('OK');
  });
}
```

其中最核心的就是使用ImageMagick的两条命令：identify和convert。使用方法如下，使用其他语言的朋友也可以举一反三在自己的项目中使用：

```
identify -format %[colorspace] file

convert file -profile JapanColor2001Coated.icc -profile ColorMatchRGB.icc newfile
```

相关的ICC文件什么的都在项目上有，欢迎大家一起讨论一同进步！