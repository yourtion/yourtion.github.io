---
author: Yourtion
comments: true
date: 2013-08-29 06:39:31+00:00
excerpt: 最近项目使用Python对输出文件进行处理，需要用到Image模块对图片进行处理，默认安装的Python是没有带Image库的，安装PIL的Image库还是很简单的
layout: post
slug: python-install-image-module
title: Python安装Image模块
wordpress_id: 3879
categories:
- 服务器
tags:
- Linux
---
{% include JB/setup %}

最近项目使用```Python```对输出文件进行处理，需要用到```Image```模块对图片进行处理，默认安装的```Python```是没有带```Image```库的，安装```PIL```的```Image```库还是很简单的，分享之~

如果需要```jpeg```和```zlib```支持先安装相应的包

JPEG：http://www.ijg.org

最新的版本是```jpegsrc.v9.tar.gz``` ，安装```jpeg```库

```bash
tar -zxf jpegsrc.v9.tar.gz 
cd jpegsrc.v9
./configure && make && make test && make install
```

zlib：http://www.gzip.org/zlib/

下载```zlib-1.2.8.tar.gz```支持压缩功能的```zlib```库

```bash
tar xfz zlib-1.2.8.tar.gz
cd zlib-1.2.8
./configure && make && make install
```

现在就是安装```Imagemok```了，先下载：在 http://www.pythonware.com/products/pil/index.htm 下载```Imaging-1.1.7.tar.gz```

```bash
tar xfz Imaging-1.1.7.tar.gz
cd Imaging-1.1.7
python setup.py build_ext -i
python setup.py bulid
sudo python setup.py install
```

这样就安装完成了，接下来就是测试一下：

运行```python```，然后“```import Image```”，如果没有报错应该就OK了
