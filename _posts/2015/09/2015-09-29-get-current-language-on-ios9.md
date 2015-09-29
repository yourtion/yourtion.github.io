---
layout: post
date: 2015-09-29 16:28:09
slug: get-current-language-on-ios9
title: "iOS9正确获取用户语言设置"
author: Yourtion
keywords: ["preferredLanguages", "NSLocale", "currentLanguage", "zh-Hans", "zh-Hans-CN"]
description: "升级 iOS9 后，发现很多应用都变成了英文的，这是因为 iOS9 对语言的标识进行升级，zh-Hans 变成了 zh-Hans-CN，导致一些程序原有的语言判断出错，针对这个情况，在兼容原有系统的基础上对语言的判断进行升级，让功能更加完善"
category: "ios"
tags: ["移动开发"]
---
{% include JB/setup %}

升级 iOS9 后，发现很多应用都变成了英文的，这是因为 iOS9 对语言的标识进行升级，导致一些程序原有的语言判断出错，针对这个情况，在兼容原有系统的基础上对语言的判断进行升级，让功能更加完善，分享之~

## 获取语言方法

```obj-c
NSString *currentLanguage = [[NSLocale preferredLanguages] objectAtIndex:0];
NSLog(@"currentlanguage = %@",currentLanguage);
```

## 原有判断逻辑为

之前的中文使用 `zh-Hans` 直接判断相等即可：

```obj-c
if ([currentLanguage isEqualToString:@"zh-Hans"]) {
	NSLog("zh-Hans");
}
```

## 兼容判断逻辑

iOS升级后 `zh-Hans` 变成了 `zh-Hans-CN` ，估计是按照 “RFC 4646” 进行进一步规范，为了兼容原有的系统，对判断逻辑进行如下升级：

```obj-c
if ([currentLanguage containsString:@"zh-Hans"]) {
	NSLog("zh-Hans");
}
```

同理，繁体中文的变成：

```obj-c
if ([currentLanguage isEqualToString:@"zh-Hant"]) {
	NSLog("zh-Hant");
}
```

## 中文相关标签 

参考： http://www.ruanyifeng.com/blog/2008/02/codes_for_language_names.html


| tag       |      Lang          |
|-----------|:------------------|
|zh-Hans    | 简体中文            |
|zh-Hans-CN | 大陆地区使用的简体中文|
|zh-Hans-HK | 香港地区使用的简体中文|
|zh-Hans-MO | 澳门使用的简体中文   |
|zh-Hans-SG | 新加坡使用的简体中文  |
|zh-Hans-TW | 台湾使用的简体中文   |
|zh-Hant    | 繁体中文            |
|zh-Hant-CN | 大陆地区使用的繁体中文|
|zh-Hant-HK | 香港地区使用的繁体中文|
|zh-Hant-MO | 澳门使用的繁体中文   |
|zh-Hant-SG | 新加坡使用的繁体中文  |
|zh-Hant-TW | 台湾使用的繁体中文 |

