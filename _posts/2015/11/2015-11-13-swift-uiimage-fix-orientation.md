---
layout: post
date: 2015-11-13 11:36:48
slug: swift-uiimage-fix-orientation
title: "Swift修正UIImage图像方向"
author: Yourtion
keywords: ["UIImage", "orientation", "Swift"]
description: "在 iOS 或者 Mac 的开发中，会发现使用 `UIImagePicker` 调用手机相机拍照或者图库中的照片，到了 `UIImage` 中显示都是横七竖八的，这样导致显示到 View 或者上传到服务器的图片跟实际的不一样。"
category: "iOS"
tags: ["Swift"]
---
{% include JB/setup %}

在 iOS 或者 Mac 的开发中，会发现使用 `UIImagePicker` 调用手机相机拍照或者图库中的照片，到了 `UIImage` 中显示都是横七竖八的，这样导致显示到 View 或者上传到服务器的图片跟实际的不一样。

解决这个问题就需要借助 EXIF 记录的图片的 Orientation 信息进行修正，`UIImage` 的 `imageOrientation` 值提供了想要正常观看图像时应该旋转的方式。

在iOS的设备中也是包含了这样的方向传感器，它也采用了同样的方式来保存照片的方向信息到 EXIF 中。但是它默认的照片方向并不是竖着拿手机时的情况，而是横向，即 Home 键在右侧

在 Objective-C 中关于修正的方法已经很多，这里就不多讲，可以参考这个：[https://gist.github.com/yourtion/82d01afea8e1db012aab](https://gist.github.com/yourtion/82d01afea8e1db012aab)

这里主要分享一下在 Swift 上的实现： 

```swift
extension UIImage {

  func fixOrientation() -> UIImage {
    if (self.imageOrientation == .Up) {
      return self
    }
    
    var transform = CGAffineTransformIdentity
    
    switch (self.imageOrientation) {
    case .Down, .DownMirrored:
      transform = CGAffineTransformTranslate(transform, self.size.width, self.size.height)
      transform = CGAffineTransformRotate(transform, CGFloat(M_PI))
      
    case .Left, .LeftMirrored:
      transform = CGAffineTransformTranslate(transform, self.size.width, 0)
      transform = CGAffineTransformRotate(transform, CGFloat(M_PI_2))
      
    case .Right, .RightMirrored:
      transform = CGAffineTransformTranslate(transform, 0, self.size.height)
      transform = CGAffineTransformRotate(transform, CGFloat(-M_PI_2))
      
    default:
      break
    }
    
    switch (self.imageOrientation) {
    case .UpMirrored, .DownMirrored:
      transform = CGAffineTransformTranslate(transform, self.size.width, 0)
      transform = CGAffineTransformScale(transform, -1, 1)
      
    case .LeftMirrored, .RightMirrored:
      transform = CGAffineTransformTranslate(transform, self.size.height, 0)
      transform = CGAffineTransformScale(transform, -1, 1)
      
    default:
      break
    }
    
    let ctx = CGBitmapContextCreate(nil, Int(self.size.width), Int(self.size.height),
      CGImageGetBitsPerComponent(self.CGImage), 0,
      CGImageGetColorSpace(self.CGImage),
      CGImageGetBitmapInfo(self.CGImage).rawValue)
    CGContextConcatCTM(ctx, transform)
    
    switch (self.imageOrientation) {
    case .Left, .LeftMirrored, .Right, .RightMirrored:
      CGContextDrawImage(ctx, CGRectMake(0,0,self.size.height,self.size.width), self.CGImage)
      
    default:
      CGContextDrawImage(ctx, CGRectMake(0,0,self.size.width,self.size.height), self.CGImage)
    }
    
    // And now we just create a new UIImage from the drawing context
    let cgimg = CGBitmapContextCreateImage(ctx)
    return UIImage(CGImage: cgimg!)
  }
}
```

通过创建一个 `UIImage` 的扩展方法 `fixOrientation`，调用的时候就很方便的了，对于一个已有的 `UIImage`，只需要执行下面代码即可：

```swift
let fixedImage = image.fixOrientation()
```

附 `imageOrientation` 值与 EXIF 位置方向图：

EXIF 位置值

[![EXIF-orientation-eight-values]({{ IMAGE_PATH }}2015/11/exif-orientation-eight-values.png)]({{ IMAGE_PATH }}2015/11/exif-orientation-eight-values.png)

EXIF 拍摄方向

[![EXIF-orientation-value]({{ IMAGE_PATH }}2015/11/exif-orientation-value.png)]({{ IMAGE_PATH }}2015/11/exif-orientation-value.png)

EXIF 与 `imageOrientation` 对应表 

| EXIF value  | Orientation  | imageOrientation                |
| ----------- | :----------- | :------------------------------ |
| 1           | Up           | UIImageOrientationUp            |
| 3           | Down         | UIImageOrientationDown          |
| 5           | Left         | UIImageOrientationLeft          |
| 7           | Right        | UIImageOrientationRight         |
| 2           | UpMirror     | UIImageOrientationUpMirrored    |
| 4           | DownMirror   | UIImageOrientationDownMirrored  |
| 6           | LeftMirror   | UIImageOrientationLeftMirrored  |
| 8           | RightMirror  | UIImageOrientationRightMirrored |
