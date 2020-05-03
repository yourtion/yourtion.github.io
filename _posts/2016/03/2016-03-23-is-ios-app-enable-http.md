---
layout: post
date: 2016-03-23 13:59:49 +0800
slug: is-ios-app-enable-http
title: "判断iOS应用是否开放HTTP权限"
author: Yourtion
keywords: ["ios9 http","NSAppTransportSecurity","isHTTPEnable","HTTPDNS"]
description: "从 iOS9 起，新特性要求 App 访问网络请求，要采用 HTTPS 协议。但是能不能判断开发者是否允许 HTTP 的请求，这样就不会在发起请求时候失败同时弹出以下信息,如果允许了 HTTP 的访问，才开启 HTTPDNS 相关的功能"
category: "iOS"
tags: ["解决问题"]
---
{% include JB/setup %}

从 iOS9 起，新特性要求 App 访问网络请求，要采用 HTTPS 协议。但是能不能判断开发者是否允许 HTTP 的请求，这样就不会在发起请求时候失败同时弹出以下信息：

> App Transport Security has blocked a cleartext HTTP (http://) resource load since it is insecure. Temporary exceptions can be configured via your app’s Info.plist file.

这个需求其实是最近在弄 HTTPDNS 相关的一些东西，只能通过 HTTP 接口请求，但是希望能判断应用是否允许了 HTTP 的访问，如果允许才开启 HTTPDNS 相关的功能。

解决方法比较简单，其实就是读取 `info.plist` 看看 `NSAppTransportSecurity` 是否为 `YES`。

## Objective-C 实现

```objc
- (BOOL)isHTTPEnable {
  if([[[UIDevice currentDevice] systemVersion] compare:@"9.0" options:NSNumericSearch] != NSOrderedAscending){
    NSDictionary *infoDict = [[NSBundle mainBundle] infoDictionary];
    return [[[infoDict objectForKey:@"NSAppTransportSecurity"] objectForKey:@"NSAllowsArbitraryLoads"] boolValue];
  }
  return YES;
}
```

使用方法：

```objc
if ([self isHTTPEnable]) {
  NSLog(@"HTTP enable");
} else {
  NSLog(@"HTTP disable");
}
```

## Swift 实现

```swift
func isHTTPEnable() -> Bool {
  let flag = UIDevice.currentDevice().systemVersion.compare("9.0.0", options: NSStringCompareOptions.NumericSearch)
  if (flag != .OrderedAscending) {
    guard let infoDict = NSBundle.mainBundle().infoDictionary else {
      return false
    }
    guard let appTransportSecurity = infoDict["NSAppTransportSecurity"] else {
      return false
    }
    guard let allowsArbitraryLoads = appTransportSecurity["NSAllowsArbitraryLoads"] else {
      return false
    }
    guard let res = allowsArbitraryLoads else {
      return false
    }
    return res as! Bool 
  }
  return true
}
```

使用方法：

```swift
if self.isHTTPEnable() {
  print("HTTP enable")
} else {
  print("HTTP disable")
}
```
