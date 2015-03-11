---
author: Yourtion
comments: true
date: 2010-07-14 05:44:55+00:00
excerpt: 最近在做一个SuperSite和UC的站点，不知什么时候开始，登陆SupeSite要二次验证，输入安全验证答案，可是用户本身并没有设置这个问题，就是在Ucenter里面去掉问答还是会提示。在网络中翻了半天，总算找到了一个解决办法
layout: post
slug: supesite6-login-problems-solution
title: 解决SupeSite6管理员登陆出现安全问答的问题
wordpress_id: 1293
categories:
- 康盛
tags:
- 解决问题
---
{% include JB/setup %}

最近在做一个SuperSite和UC的站点，不知什么时候开始，登陆SupeSite要二次验证，输入安全验证答案，可是用户本身并没有设置这个问题，就是在Ucenter里面去掉问答还是会提示。在网络中翻了半天，总算找到了一个解决办法

在```bath.login.php```中


```php
if(empty($_SCONFIG['noseccode']) || empty($_SCONFIG['ucmode']) && $member['secques'])
```


这个东西是不是错了呀？

我的改成：

```php
if((empty($_SCONFIG['noseccode']) || empty($_SCONFIG['ucmode'])) && $member['secques'])
```


不再提示我二次提问 / 安全提问了~~~~目前就这样解决这个问题，不知道还有没有更好的方法。
