---
author: Yourtion
comments: true
date: 2014-07-30 08:54:46+00:00
excerpt: 需要为项目中为Node.js制作一个C++的Addon，其中用到一个jpg的lib，找了很多资料，对于在addon中添加的静态库等的都不能成功，最后自己自己倒腾了一番，成功的将jpglib编译到项目中
layout: post
slug: node-js-addon-ues-library
title: 在Node.js的C++扩展中编译第三方库
wordpress_id: 4029
categories:
- Node.js
tags:
- Addon
---
{% include JB/setup %}

需要为项目中为Node.js制作一个C++的Addon，其中用到一个jpg的lib，找了很多资料，对于在addon中添加的静态库等的都不能成功，最后自己自己倒腾了一番，成功的将jpglib编译到项目中，方法比较简单，共享之。

主要操作的是“binding.gyp”这个文件，将要引用的库的源码放到一个文件夹，这里是“jpglib”，然后在binging文件添加一个build的选项，最终文件如下：

```default
{
    "targets": [
        {
            'target_name': 'jpeg',
            'type': 'static_library',
            'sources': [
                "jpglib/jcapimin.c",
                "jpglib/jcapistd.c",
                "jpglib/jccoefct.c",
                "jpglib/jccolor.c",
            ],
            'include_dirs': ["jpglib"]
        },
        {
            "target_name": "Test",
            "sources": [
                "test.cc"
            ],
            'dependencies': [
                'jpeg'
            ]
        }
    ]
}
```

“jpeg”的“sources”中包含jpglib源码中需要的c文件，这样编译后就会生成一个jpeg.a的静态库，在最终工程的源码中就能直接使用jpglib的功能。
