---
author: Yourtion
comments: true
date: 2014-06-05 14:13:08+00:00
excerpt: 使用原生的CIFilter创建二维码，但是生成的二维码只有黑白，而且大小不好控制，使二维码透明背景，自定义颜色，还能加上阴影效果
layout: post
slug: custom-cifilter-qrcode-generator
title: 使用CIFilter生成二维码并自定义
wordpress_id: 4002
categories:
- iOS
tags:
- CIFilter
---
{% include JB/setup %}

iOS7之后，可以使用原生的```CIFilter```创建二维码，但是生成的二维码只有黑白，而且大小不好控制，找了一下资料，发现解决的方法，使二维码透明背景，自定义颜色，还能加上阴影效果，方法很简单，直接调用即可，效果如下：

[![CustomQRCodeDemo]({{ IMAGE_PATH }}2014/06/IMG_3977.png)]({{ IMAGE_PATH }}2014/06/IMG_3977.png)

**Demo地址：[https://github.com/yourtion/Demo_CustomQRCode](https://github.com/yourtion/Demo_CustomQRCode)**

首先是二维码的生成，使用```CIFilter```很简单，直接传入生成二维码的字符串即可：

```objc
- (CIImage *)createQRForString:(NSString *)qrString {
    NSData *stringData = [qrString dataUsingEncoding:NSUTF8StringEncoding];
    // 创建filter
    CIFilter *qrFilter = [CIFilter filterWithName:@"CIQRCodeGenerator"];
    // 设置内容和纠错级别
    [qrFilter setValue:stringData forKey:@"inputMessage"];
    [qrFilter setValue:@"M" forKey:@"inputCorrectionLevel"];
    // 返回CIImage
    return qrFilter.outputImage;
}
```

因为生成的二维码是一个```CIImage```，我们直接转换成```UIImage```的话大小不好控制，所以使用下面方法返回需要大小的```UIImage```：

```objc
- (UIImage *)createNonInterpolatedUIImageFormCIImage:(CIImage *)image withSize:(CGFloat) size {
    CGRect extent = CGRectIntegral(image.extent);
    CGFloat scale = MIN(size/CGRectGetWidth(extent), size/CGRectGetHeight(extent));
    // 创建bitmap;
    size_t width = CGRectGetWidth(extent) * scale;
    size_t height = CGRectGetHeight(extent) * scale;
    CGColorSpaceRef cs = CGColorSpaceCreateDeviceGray();
    CGContextRef bitmapRef = CGBitmapContextCreate(nil, width, height, 8, 0, cs, (CGBitmapInfo)kCGImageAlphaNone);
    CIContext *context = [CIContext contextWithOptions:nil];
    CGImageRef bitmapImage = [context createCGImage:image fromRect:extent];
    CGContextSetInterpolationQuality(bitmapRef, kCGInterpolationNone);
    CGContextScaleCTM(bitmapRef, scale, scale);
    CGContextDrawImage(bitmapRef, extent, bitmapImage);
    // 保存bitmap到图片
    CGImageRef scaledImage = CGBitmapContextCreateImage(bitmapRef);
    CGContextRelease(bitmapRef);
    CGImageRelease(bitmapImage);
    return [UIImage imageWithCGImage:scaledImage];
}
```

因为生成的二维码是黑白的，所以还要对二维码进行颜色填充，并转换为透明背景，使用遍历图片像素来更改图片颜色，因为使用的是```CGContext```，速度非常快：

```objc
void ProviderReleaseData (void *info, const void *data, size_t size){
    free((void*)data);
}
- (UIImage*)imageBlackToTransparent:(UIImage*)image withRed:(CGFloat)red andGreen:(CGFloat)green andBlue:(CGFloat)blue{
    const int imageWidth = image.size.width;
    const int imageHeight = image.size.height;
    size_t      bytesPerRow = imageWidth * 4;
    uint32_t* rgbImageBuf = (uint32_t*)malloc(bytesPerRow * imageHeight);
    CGColorSpaceRef colorSpace = CGColorSpaceCreateDeviceRGB();
    CGContextRef context = CGBitmapContextCreate(rgbImageBuf, imageWidth, imageHeight, 8, bytesPerRow, colorSpace,
                                                 kCGBitmapByteOrder32Little | kCGImageAlphaNoneSkipLast);
    CGContextDrawImage(context, CGRectMake(0, 0, imageWidth, imageHeight), image.CGImage);
    // 遍历像素
    int pixelNum = imageWidth * imageHeight;
    uint32_t* pCurPtr = rgbImageBuf;
    for (int i = 0; i < pixelNum; i++, pCurPtr++){
        if ((*pCurPtr & 0xFFFFFF00) < 0x99999900)    // 将白色变成透明
        {
            // 改成下面的代码，会将图片转成想要的颜色
            uint8_t* ptr = (uint8_t*)pCurPtr;
            ptr[3] = red; //0~255
            ptr[2] = green;
            ptr[1] = blue;
        }
        else
        {
            uint8_t* ptr = (uint8_t*)pCurPtr;
            ptr[0] = 0;
        }
    }
    // 输出图片
    CGDataProviderRef dataProvider = CGDataProviderCreateWithData(NULL, rgbImageBuf, bytesPerRow * imageHeight, ProviderReleaseData);
    CGImageRef imageRef = CGImageCreate(imageWidth, imageHeight, 8, 32, bytesPerRow, colorSpace,
                                        kCGImageAlphaLast | kCGBitmapByteOrder32Little, dataProvider,
                                        NULL, true, kCGRenderingIntentDefault);
    CGDataProviderRelease(dataProvider);
    UIImage* resultUIImage = [UIImage imageWithCGImage:imageRef];
    // 清理空间
    CGImageRelease(imageRef);
    CGContextRelease(context);
    CGColorSpaceRelease(colorSpace);
    return resultUIImage;
}
```

经过这样的处理，基本上二维码就成型了，如果还想加上阴影，就在```ImageView```的```Layer```上使用下面代码添加阴影：

```objc
ImageView.layer.shadowOffset = CGSizeMake(0, 0.5);  // 设置阴影的偏移量
ImageView.layer.shadowRadius = 1;  // 设置阴影的半径
ImageView.layer.shadowColor = [UIColor blackColor].CGColor; // 设置阴影的颜色为黑色
ImageView.layer.shadowOpacity = 0.3; // 设置阴影的不透明度
```

这样就大功告成，希望能帮到你，欢迎大家一起交流。
