---
author: Yourtion
comments: true
date: 2014-03-03 11:39:27+00:00
excerpt: 最近一个项目需要对图片进行不断旋转，实现方法也比较简单，代码分享之
layout: post
slug: ios-photo-360-degree-rotation
title: iOS图片360度旋转
wordpress_id: 3987
categories:
- iOS
tags:
- Animation
---
{% include JB/setup %}

最近一个项目需要对图片进行不断旋转，实现方法也比较简单，代码分享之~

利用CABasicAnimation添加一个动画层，让图片围绕Z轴旋转，通过不同的图层组合和时间，可以调出各种效果。

核心的Function如下，传入一个UIImageView，会返回一个不断旋转的UIImageView，可以控制动画时间和长度。唯一的不足是没办法回调或在动画执行过程中得知动画进行的情况。

先上代码：

```objc
- (UIImageView *)rotate360DegreeWithImageView:(UIImageView *)imageView {
    CABasicAnimation *animation = [ CABasicAnimation
                                   animationWithKeyPath: @"transform" ];
    animation.fromValue = [NSValue valueWithCATransform3D:CATransform3DIdentity];
    //围绕Z轴旋转，垂直与屏幕
    animation.toValue = [ NSValue valueWithCATransform3D:
                         CATransform3DMakeRotation(M_PI/2, 0.0, 0.0, 1.0) ];
    animation.duration = 0.4;
    //旋转效果累计，先转180度，接着再旋转180度，从而实现360旋转
    animation.cumulative = YES;
    animation.repeatCount = 16;
    animation.removedOnCompletion = YES;
    CGRect imageRrect = CGRectMake(0, 0,imageView.frame.size.width, imageView.frame.size.height);
    UIGraphicsBeginImageContext(imageRrect.size);
    [imageView.image drawInRect:imageRrect];
    imageView.image = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    [imageView.layer addAnimation:animation forKey:nil ];
    return imageView;
}
```

使用方法：

```objc
// 开始动画Loding为UIImageView
Loding = [self rotate360DegreeWithImageView:Loding];

//结束动画
[Loding.layer removeAllAnimates];
```

相关参数解析：

```objc
// 旋转方向——顺时针
CATransform3DMakeRotation(M_PI/2, 0.0, 0.0, 1.0)
// 旋转方向——逆时针
CATransform3DMakeRotation(M_PI, 0.0, 0.0, 1.0)

// 动画无限循环
animation.repeatCount = 0;

// 动画时间0.4秒
animation.duration = 0.4;
```

其他的可以自己摸索，比较简单就不上Demo了
