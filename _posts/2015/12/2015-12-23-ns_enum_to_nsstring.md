---
layout: post
date: 2015-12-23 15:05:28
slug: ns_enum_to_nsstring
title: "快速将 NS_ENUM 转换成 NSString"
author: Yourtion
keywords: ["NS_ENUM","转换","NSString"]
description: ""
category: ""
tags: [""]
---
{% include JB/setup %}

在项目中经常会用到 `NS_ENUM` 来保存枚举数据，但是做网络请求时候可能又需要相应的字符串来作为参数，一开始使用一个方法，把枚举传入后进行 `switch case`，但是实现起来不优雅又容易出错，这里分享一个简单的方法，希望对你有帮助。

假设枚举类型 `TestType` 定义如下：

```objc
typedef NS_ENUM(NSInteger, TestType) {
    TestTypeA = 0,
    TestTypeB,
    TestTypeC
};
```

原有转换方法：

```objc
+(NSString *)getTestTypeString:(TestType)t {
    NSString *result = nil;
    switch(t) {
        case TestTypeA:
            result = @"TypeA";
            break;
        case TestTypeB:
            result = @"TypeB";
            break;
        case TestTypeC:
            result = @"TypeC";
            break;
        default:
            result = @"unknown";
    }
    return result;
}
```

通过定义一个 `const NSString`，可以将转换方法简化如下：

```objc
NSString * const TestTypeDescription[] = {
    [TestTypeA] = @"TypeA",
    [TestTypeB] = @"TypeB",
    [TestTypeC] = @"TypeC"
};

+(NSString *)getTestTypeString:(TestType)t {
    return TestTypeDescription[t];
}
```
