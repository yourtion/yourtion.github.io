---
author: Yourtion
comments: true
date: 2014-12-20 18:10:21+00:00
excerpt: 想在用户输入内容的时候同时检测UITextField的输入并根据用户的输入内容响应页面上的事件
layout: post
slug: ios-realtime-uitextfield-contect
title: iOS实时检测UITextField内容
wordpress_id: 4061
categories:
- iOS
post_format:
- 日志
---

想在用户输入内容的时候同时检测```UITextField```的输入并根据用户的输入内容响应页面上的事件，在这个例子中是实时检测用户输入的手机号码，当手机号码的位数达到11位同时满足手机号码的格式时，确定按钮变为可用状态。

代码如下：

先声明textfield然后添加下面方法：

```objc
- (BOOL)textField:(UITextField *)textField shouldChangeCharactersInRange:(NSRange)range replacementString:(NSString *)string {
    NSString *checkString;
    if (range.location == 11) {
        return NO;
    }else{

        if (![string isEqualToString:@""]) {
            checkString=[self.textfield.text stringByAppendingString:string];
        }else{
            checkString=[checkString stringByDeletingLastPathComponent];
        }

        if ([self isMobileNumber:checkString]) {
            NSLog(@"号码满足");
        }else{
            NSLog(@"号码不满足");
        }
        return YES;
    }
}

```

手机号码检测使用下面代码：

```objc
- (BOOL)isMobileNumber:(NSString *)mobileNum
{
    NSString * MOBILE = @"^((13[0-9])|(14[^4,\\D])|(15[^4,\\D])|(18[0-9]))\\d{8}$|^1(7[0-9])\\d{8}$";
    NSPredicate *regextestmobile = [NSPredicate predicateWithFormat:@"SELF MATCHES %@", MOBILE];
    if ([regextestmobile evaluateWithObject:mobileNum] == YES){
        return YES;
    }else{
        return NO;
    }
}

```
