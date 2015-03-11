---
author: Yourtion
comments: true
date: 2010-08-15 03:54:16+00:00
excerpt: 14日国务院发布公告：为表达全国各族人民对甘肃舟曲特大山洪泥石流遇难同胞的深切哀悼，国务院决定，2010年8月15日举行全国哀悼活动，全国和驻外使领馆下半旗志哀，停止公共娱乐活动。响应号召，我把博客跟微博还有团队博客微博都变成灰白，悼念遇难同胞。
layout: post
slug: mourning-site-gray-method-change
title: 悼念——网站变黑白的方法（包括Flash）
wordpress_id: 1444
categories:
- CSS+DIV
tags:
- CSS
---
{% include JB/setup %}

为表达全国各族人民对甘肃舟曲特大山洪泥石流遇难同胞的深切哀悼，国务院决定，8月15日全国下半旗志哀，停止公共娱乐活动。

舟曲泥石流已致1239人遇难，505人失踪。

14日国务院发布公告：为表达全国各族人民对甘肃舟曲特大山洪泥石流遇难同胞的深切哀悼，国务院决定，2010年8月15日举行全国哀悼活动，全国和驻外使领馆下半旗志哀，停止公共娱乐活动。

**响应号召，我把博客跟微博还有团队博客微博都变成灰白，悼念遇难同胞。**

方法如下：

如果你的网站能够支持支持CSS，是符合W3标准的网页，那就在CSS文件的最前面加上一行代码就可以了，这段代码使用的是CSS滤镜，将网页中的色彩部分给滤掉了。

**CSS滤镜过滤色彩代码**：

```css
html 
{ 
	filter:progid:DXImageTransform.Microsoft.BasicImage(grayscale=1); 
}
```

第二种方法:只支持IE```*{filter:Gray;}```

上面的代码可以使除了FLASH之外的网页所有元素变灰,如果网页中含有FLASH,可以使用下面的方法使FLASH变灰:

第一种方法:如果是用下面的方式调用FLASH,则在代码中加入```wmode="opaque"```


第二种方法:如果是用下面的方式调用FLASH,则在代码中加入

```html
<param name="wmode" value="opaque">
```
