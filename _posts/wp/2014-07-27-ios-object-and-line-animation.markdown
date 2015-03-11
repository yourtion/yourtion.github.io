---
author: Yourtion
comments: true
date: 2014-07-27 09:49:15+00:00
excerpt: 使用CAKeyframeAnimation进行物体的路径移动；使用UIBezierPath构建路径线及使用CABasicAnimation的stroke完成线的动画；使用CABasicAnimation的opacity进行物体运动过程的透明度变化，让动画更加自然；
layout: post
slug: ios-object-and-line-animation
title: iOS物体与直线动画
wordpress_id: 4021
categories:
- iOS
tags:
- Animation
---
{% include JB/setup %}

最近在做产品里面一个界面的交互，需要对一个物体进行移动，同时有一条直线跟随物体运动增长，就像物体是拉着一根线出现，消失的时候就是线拉着物体回去的感觉，大概情况如下面的动画：

[![ScreenShot]({{ IMAGE_PATH }}2014/07/ScreenShot.gif)]({{ IMAGE_PATH }}2014/07/ScreenShot.gif)

找了挺久的教程，很多动画的路径都是直接显示，或者是不显示，没办法，只能直接动手自己写，完成后与大家共享，希望能帮到大家。

说说实现的大概思路，具体的代码请看Git的Demo咯，大家有需要的话后期可以抽象成一个类库来。现在只要简单的上下左右移动，可以根据需求修改运动坐标变成任意方向移动，稍后会更新上去。

**Demo on GitHub：[https://github.com/yourtion/Demo-LineAnimation](https://github.com/yourtion/Demo_LineAnimation)**

动画主要由三块组成：



	
  1. 使用CAKeyframeAnimation进行物体的路径移动；

	
  2. 使用UIBezierPath构建路径线及使用CABasicAnimation的stroke完成线的动画；

	
  3. 使用CABasicAnimation的opacity进行物体运动过程的透明度变化，让动画更加自然；


最后就是使用CAAnimationGroup将动画组合起来，效果就是上面所看到的，具体代码参见GitHub的Demo，欢迎大家Fork项目还有Follow我，有什么问题欢迎一起交流。


