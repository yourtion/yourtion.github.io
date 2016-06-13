---
layout: post
date: 2016-06-12 12:01:01 +08:00
slug: is-osx-app-enable-http
title: "判断Mac应用是否开放HTTP权限"
author: Yourtion
keywords: ["mac 10.11 http","NSAppTransportSecurity","isHTTPEnable","HTTPDNS"]
description: "从 OSX 10.11 起，新特性要求 App 访问网络请求，要采用 HTTPS 协议。但是能不能判断开发者是否允许 HTTP 的请求，这样就不会在发起请求时候失败同时弹出以下信息,如果允许了 HTTP 的访问，才开启 HTTPDNS 相关的功能"
category: "Mac"
tags: ["解决问题"]
---
{% include JB/setup %}

之前写过关于在 iOS 应用上判断是非开启 HTTP 请求权限的文章[《判断iOS应用是否开放HTTP权限》](/is-ios-app-enable-http.html)。最近在把 [HTTPDNS](https://github.com/yourtion/HTTPDNS-OC) 的库进行 OSX 上的兼容。发现 Mac 上的 app 也会有 HTTP 权限的问题。

解决方法参考（操作是一致的）：[《解决iOS9下blocked cleartext HTTP》](/ios9-http-blocked.html)

> App Transport Security has blocked a cleartext HTTP (http://) resource load since it is insecure. Temporary exceptions can be configured via your app's Info.plist file.

判断的方法类似，分享之：

### 获取 Mac 版本

```objc
NSDictionary *systemVersionDictionary =
    [NSDictionary dictionaryWithContentsOfFile:
        @"/System/Library/CoreServices/SystemVersion.plist"];
NSString *systemVersion =
    [systemVersionDictionary objectForKey:@"ProductVersion"];
```

### 判断 OSX 版本是否大于 10.11

```objc
if([systemVersion compare:@"10.11" options:NSNumericSearch] != NSOrderedAscending)
```

### 判断 HTTP 权限

权限判断方法跟 iOS 的一致：

```objc
NSDictionary *systemVersionDictionary = [NSDictionary dictionaryWithContentsOfFile:@"/System/Library/CoreServices/SystemVersion.plist"];
if([[systemVersionDictionary objectForKey:@"ProductVersion"] compare:@"10.11" options:NSNumericSearch] != NSOrderedAscending){
    NSDictionary *infoDict = [[NSBundle mainBundle] infoDictionary];
    return [[[infoDict objectForKey:@"NSAppTransportSecurity"] objectForKey:@"NSAllowsArbitraryLoads"] boolValue];
}
```

### iOS 与 OSX 统一的判断方法

想判断系统版本：iOS 大于 9.0 或者 OSX 大于 10.11，再去 `info.plist` 判断 [Gist](https://gist.github.com/yourtion/9349476b151ffa035200af37cbeb1a3a)：

```objc
- (BOOL)needTransportSecurity {
#if TARGET_OS_IPHONE
    if([[[UIDevice currentDevice] systemVersion] compare:@"9.0" options:NSNumericSearch] != NSOrderedAscending){
        return YES;
    }
#elif TARGET_OS_MAC
    NSDictionary *systemVersionDictionary = [NSDictionary dictionaryWithContentsOfFile:@"/System/Library/CoreServices/SystemVersion.plist"];
    if([[systemVersionDictionary objectForKey:@"ProductVersion"] compare:@"10.11" options:NSNumericSearch] != NSOrderedAscending){
        return YES;
    }
#endif
    return NO;
}

- (BOOL)isHTTPEnable {
    if([self needTransportSecurity]){
        NSDictionary *infoDict = [[NSBundle mainBundle] infoDictionary];
        return [[[infoDict objectForKey:@"NSAppTransportSecurity"] objectForKey:@"NSAllowsArbitraryLoads"] boolValue];
    }
    return YES;
}
```
