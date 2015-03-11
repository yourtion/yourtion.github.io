---
author: Yourtion
comments: true
date: 2010-01-25 14:33:23+00:00
layout: post
slug: qzone-comments-article-to-wordpress
title: 将QQ空间的文章评论转到wordpress
wordpress_id: 281
categories:
- WordPress技术
tags:
- WordPress
---
{% include JB/setup %}

最近寻思着把自己QQ空间里的文章都转移到wordpress来，毕竟wordpress使用起来更方便些。于是自己google了一下午尝试了很多方法最后终于成功了，特写下这篇文章记录下，也是给有需要的朋友一个方便！

可能比较繁琐，但是我相信没有复制粘贴繁琐哈！需要的朋友就跟着我一步一步来吧！

首先进入blogbus提供的博客搬家服务页面：[http://banjia.blogbus.com/](http://banjia.blogbus.com/)
在页面底部输入框输入你的QQ空间地址并点击，在完成后的页面点击把xml文件下载到本地；

这个xml文件是blogbus可导入的格式，但是导入wprdpress的话我们还需要进一步加工才行；

为了继续我们首先要下载一个文件：blogbus.zip

把下载下来的压缩包里面的 blogbus.php 文件上传到你的 WordPress 安装目录的

wp-admin/import/目录下,这样在 WordPress 后台导入菜单下多了一个 BlogBus 导入按钮，然后使用它把你之前下载下来的xml文件中的文章和评论导入到 WordPress 中去。
以下是完整过程：

1. 进入你的 WordPress 后台，点击 工具 => 导入 => BlogBus。点击上传文件然后选择刚下载下来的xml文件并导入即可开始。

部分版本wordpress可能会在导入页面出现错误，没关系，我们可以直接访问以下url进入导入页面：http://您的url/wp-admin/admin.php?import=blogbus

以上是导入页面，成功页面我就不演示啦，各位有兴趣的朋友去尝试下吧！

写得辛苦，转载请注明出处，谢谢！

本文来源于:一路向北！ http://beself.cn
