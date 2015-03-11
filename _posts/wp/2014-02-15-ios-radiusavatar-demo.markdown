---
author: Yourtion
comments: true
date: 2014-02-15 03:28:15+00:00
layout: post
slug: ios-radiusavatar-demo
title: iOS实现图片圆角及圆形头像效果
wordpress_id: 3975
categories:
- iOS
---
{% include JB/setup %}

最近在做一个项目，需要用户头像显示为圆形，研究了一下，写了个简单的Demo，当做一个笔记，也希望能帮到需要的人。

**Demo：[https://github.com/yourtion/Demo_iOSRadiusAvatar](https://github.com/yourtion/Demo_iOSRadiusAvatar)**

思路：使用```view```的```layer```属性，通过设置```cornerRadius```来设置圆角的半径，当```view```是正方形同时圆角为边长一般时形成圆形的头像。

代码如下：

```objc
[self.imageView1.layer setCornerRadius:CGRectGetHeight([view bounds]) / 2];
self.imageView1.layer.masksToBounds = YES;
self.imageView1.layer.contents = (id)[[UIImage imageNamed:@"image"] CGImage];
```

更多效果参见Demo。效果如下：

[![iOS-RadiusAvatar-Demo]({{ IMAGE_PATH }}2014/02/iOS-RadiusAvatar-Demo.png)]({{ IMAGE_PATH }}2014/02/iOS-RadiusAvatar-Demo.png)
