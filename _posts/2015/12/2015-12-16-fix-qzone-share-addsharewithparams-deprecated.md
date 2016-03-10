---
layout: post
date: 2015-12-16 10:56:38
slug: fix-qzone-share-addsharewithparams-deprecated
title: "解决addShareWithParams接口弃用问题"
author: Yourtion
keywords: ["Mob", "Qzone","shareSDK","addShareWithParams"]
description: "近因为需要把项目升级到 Xcode7 和 iOS9，所以旧版本的 ShareSDK 需要升级，下载了最新的 v2.12.1 替换后，发现原有使用的QQ空间分享接口 addShareWithParams 找不到了。研究了一下，终于把原有的项目调试通过，分享之"
category: "iOS"
tags: ["解决问题"]
---
{% include JB/setup %}

最近因为需要把项目升级到 Xcode7 和 iOS9，所以旧版本的 ShareSDK 需要升级，下载了最新的 `v2.12.1` 替换后，发现原有使用的QQ空间分享接口 `addShareWithParams` 找不到了，找了很多资料，都说这个接口已经弃用。官方的说法如下：

> 分享到QQ空间的接口用于取代老的分享接口addShareWithParams（该接口已经废弃）。[《iOS_SDK_API_使用说明》](http://wiki.connect.qq.com/ios_sdk_api_%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E)

但是很多没有给出具体的更新方案，研究了一下，终于把原有的项目调试通过，分享之，希望对你有帮助。

原有的分享代码如下：

```objc
- (BOOL)shareMessage:(NSString *)title summary:(NSString *)summary imageUrl:(NSString *)imageUrl {
    TCAddShareDic *params = [TCAddShareDic dictionary];
    if (imageUrl && summary) {
        params.paramTitle = title;
        params.paramSummary =  summary;
        params.paramImages = imageUrl;
    } else {
        params.paramSummary = title;
        params.paramTitle = summary;
    }
    params.paramSite = @"分享网站";
    params.paramFromurl = @"http://yourtion.com";
    
    BOOL result = [self.oauth addShareWithParams:params];
    return result;
}
```

新的QQ空间分享接口文档及示例在[《ios_sandbox1 2.2 分享到QQ空间》](http://wiki.connect.qq.com/ios_sandbox1#2.2.E5.88.86.E4.BA.AB.E5.88.B0QQ.E7.A9.BA.E9.97.B4) 

根据新接口，更新后代码如下：

```objc
- (BOOL)shareMessage:(NSString *)title summary:(NSString *)summary imageUrl:(NSString *)imageUrl {
    NSString *webUrl = @"http://yourtion.com";
    QQApiNewsObject *newsObj;
    
    if (imageUrl && summary) {
        newsObj = [QQApiNewsObject
                   objectWithURL:[NSURL URLWithString:webUrl]
                   title:title
                   description:summary
                   previewImageURL:[NSURL URLWithString:imageUrl]];
    } else {
        newsObj = [QQApiNewsObject
                   objectWithURL:[NSURL URLWithString:webUrl]
                   title:title
                   description:title
                   previewImageURL:nil];
    }
    
    SendMessageToQQReq *req = [SendMessageToQQReq reqWithContent:newsObj];
    QQApiSendResultCode sent = [QQApiInterface SendReqToQZone:req];
    
    if (sent == 0) return YES;
    return NO;
}
```

这样就基本完成了旧接口的迁移，更多详细设置和参数，还是参考官方的文档。
