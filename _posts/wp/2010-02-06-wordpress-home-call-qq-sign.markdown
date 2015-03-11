---
author: Yourtion
comments: true
date: 2010-02-06 02:38:00+00:00
layout: post
slug: wordpress-home-call-qq-sign
title: WordPress首页调用QQ签名
wordpress_id: 488
categories:
- WordPress技术
tags:
- WordPress
- 签名
---
{% include JB/setup %}

看到我的博客的朋友一定注意到我的页面旁边一个QQ签名的实时显示，如下图：

[![image]({{ IMAGE_PATH }}2010/image.png)]({{ IMAGE_PATH }}2010/image.png)

是怎么实现的呢？？下面一步步告诉你。希望对你有帮助。

首先登陆QQ滔滔首页：[http://www.taotao.com/](http://www.taotao.com/)并且登陆（如果是IE的话快速登陆很快）：

[![image]({{ IMAGE_PATH }}2010/image1.png)]({{ IMAGE_PATH }}2010/image1.png)

然后在上面导航栏选择插件：

[![image]({{ IMAGE_PATH }}2010/image2.png)]({{ IMAGE_PATH }}2010/image2.png)

可以看到有Flash、图片、好友圈还有JavaScript四种插件。很多教程都是说使用JavaScript的方法，但是我在自己的WordPress上实验老是获取不到QQ号。

所以这一次我大胆地选择使用Flash版本。

[![image]({{ IMAGE_PATH }}2010/image3.png)]({{ IMAGE_PATH }}2010/image3.png)

在样式那选择你喜欢的样式，还要注意的一点是，Flash的字体背景是透明的，我黑色背景就只能是选”秋色盎然“，不然的话字体在我的博客上看不到。让吧代码发坐下来，我的代码如下：

```html
<embed object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,124,0" width="180" height="400">
</embed> 
```


如果你是想像我一样在侧边栏显示的话，在后台主题的小工具

[![image]({{ IMAGE_PATH }}2010/image4.png)]({{ IMAGE_PATH }}2010/image4.png) 

[![image]({{ IMAGE_PATH }}2010/image5.png)]({{ IMAGE_PATH }}2010/image5.png)

然后将代码复制到里面，最重要的一部就是根据你主题的侧边栏大小修改Flash的长度还有你喜欢的高度

[![image]({{ IMAGE_PATH }}2010/image6.png)]({{ IMAGE_PATH }}2010/image6.png)

修改代码中两个 width="180" 和height="400"为你想要的值。&num=20则为你要显示心情的条数。可以自己修改。最后保存就可以了·······

插件还有图片的形式。你也可以使用图片进行调用

[![image]({{ IMAGE_PATH }}2010/image7.png)]({{ IMAGE_PATH }}2010/image7.png)

代码如下：

```html
<img src="http://p.taotao.com/images/head/50/49/74/13/350497413_1.png" alt="" />
```

将```scr=”“```部分替换为你的图片地址即可。

但是图片的话限制相对比较多，宽度是150到200.签名型图片则大小固定，虽然可以通过代码限定大小，但是效果可能不好。大家可以看着用。
