---
layout: post
date: 2016-08-03 17:56:05 +08:00
slug: ios-custom-description-when-require-privacy
title: "iOS自定义获取权限时的描述"
author: Yourtion
keywords: ["iOS","权限" ,"自定义", "描述", "自定义"]
description: "请求 iOS 用户权限时候提示自定义权限描述的内容"
category: "iOS"
tags: ["移动开发", "解决问题"]
---
{% include JB/setup %}

最近刚好遇到一个关于请求 iOS 用户摄像头权限时候提示的问题，想起之前在哪里看到过可以自定义访问地理位置时候权限描述的内容，但是 Google 了很久，没找到头绪。

最后终于找到了 `NSLocationAlwaysUsageDescription` 这个 key，继续搜寻，终于在苹果的官方文档（[Cocoa Keys](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html) ）中找到相关的内容，不敢独享，希望对你有帮助。

## 使用方法

使用方法很简单，在 `Info` 中添加相关的 Key 即可（见下图）：

[![]({{ IMAGE_PATH }}2016/08/privacy0.png)]({{ IMAGE_PATH }}2016/08/privacy0.png)

或者使用代码的方式添加到 `Info.plist`，类似这样：

```xml
<key>NSCameraUsageDescription</key>
<string>Yourtion need to access your camera</string>
```

## 效果

定义获取摄像头权限的描述为 ： “Yourtion need to access your camera”

[![]({{ IMAGE_PATH }}2016/08/privacy1.png)]({{ IMAGE_PATH }}2016/08/privacy1.png)

## 权限描述

总结一下权限提示相关的内容：

| 权限 `Key` | Info 中的 `name` | 使用场景 |
|:---------|:-----------------|:-----|
| `NSBluetoothPeripheralUsageDescription` |“Privacy - Bluetooth Peripheral Usage Description” | 蓝牙设备权限用途描述 |
| `NSCalendarsUsageDescription` | “Privacy - Calendars Usage Description”|  日历权限用途描述 |
| `NSCameraUsageDescription` | “Privacy - Camera Usage Description” | 摄像头权限用途描述 |
| `NSContactsUsageDescription` | “Privacy - Contacts Usage Description” | 联系人权限用途描述 |
| `NSLocationAlwaysUsageDescription` | “NSLocationAlwaysUsageDescription” | 一直开启定位服务用途描述 |
| `NSLocationWhenInUseUsageDescription` | “NSLocationWhenInUseUsageDescription” | 需要时开启定位服务用途描述 |
| `NSLocationUsageDescription` |“Privacy - Location Usage Description” | 定位服务权限用途描述 |
| `NSMicrophoneUsageDescription` | “Privacy - Microphone Usage Description” | 麦克风权限用途描述 |
| `NSMotionUsageDescription` | “Privacy - Motion Usage Description” | 运动传感器权限用途描述 |
| `NSPhotoLibraryUsageDescription` | “Privacy - Photo Library Usage Description” | 相册权限用途描述 |
| `NSRemindersUsageDescription` | “Privacy - Reminders Usage Description” | 备忘录权限用途描述 |

具体的情节，支持的平台，请看苹果官方文档：[Cocoa Keys](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html)
