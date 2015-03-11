---
author: Yourtion
comments: true
date: 2014-10-22 08:55:46+00:00
excerpt: iOS自定义TextField的clearButton
layout: post
slug: ios-custom-textfield-clearbutton
title: iOS自定义TextField的clearButton
wordpress_id: 4052
categories:
- iOS
---

因为自定义了 TextField的背景为黑色，所以原生的clearButton就看不到了，查找了一下，可以利用KVO方法进行定制，代码如下：

```objc
UIButton *clearButton = [myTextField valueForKey:@"_clearButton"];
[clearButton setImage:[UIImage new] forState:UIControlStateNormal];
```

Gist：[https://gist.github.com/yourtion/0c984de3245e52fff5ac](https://gist.github.com/yourtion/0c984de3245e52fff5ac)

希望对你有帮助啦！
