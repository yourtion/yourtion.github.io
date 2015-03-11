---
author: Yourtion
comments: true
date: 2011-01-10 01:35:05+00:00
excerpt: '采用最新版 SyntaxHighlighter 3.0.83 作为核心代码

  语法js文件动态加载，只加载页面中需要的

  选择代码段时不会选中行号

  自动换行，行号自动对齐

  日志编辑器中增加插入代码的按钮

  内置8种风格css

  本插件支持几乎所有主流的程序语言。

  本插件在IE[6-8]、FireFox3、Chrome5下测试通过。'
layout: post
slug: wordpress-perfect-code-highlighting
title: WordPress完美代码语法高亮插件
wordpress_id: 1779
categories:
- WordPress插件
tags:
- WordPress
- 插件
---
{% include JB/setup %}

来自：http://blog.nxun.com/archives/8

目前我正在使用的代码高亮插件：Syntax Highlighter Optimized，很不错~

******************************
主要特性：

采用最新版 SyntaxHighlighter 3.0.83 作为核心代码
语法js文件动态加载，只加载页面中需要的
选择代码段时不会选中行号
自动换行，行号自动对齐
日志编辑器中增加插入代码的按钮
内置8种风格css
本插件支持几乎所有主流的程序语言。
本插件在IE[6-8]、FireFox3、Chrome5下测试通过。

******************************
显示效果：

[默认风格]
[![]({{ IMAGE_PATH }}2011/01/sh-560x450.png)]({{ IMAGE_PATH }}2011/01/sh.png)

[另一种深色调风格]
[![]({{ IMAGE_PATH }}2011/01/sh2-560x434.png)]({{ IMAGE_PATH }}2011/01/sh2.png)

******************************
使用方法：

1.在 可视化编辑 中点击按钮插入代码。
2.在 HTML编辑 中使用以下格式插入代码。


<blockquote>

> 
> <pre> // brush: + language
> 
> 

> 
> function foo()
> 
> 

> 
> {
> 
> 

> 
> alert("Hello World!");
> 
> 

> 
> return;
> 
> 

> 
> }</pre>
> 
> </blockquote>


******************************
版本改动：

v1.1b
修正了 IE8 下复制代码不换行的问题。

v1.1
修正了一些 IE6 下的显示问题。

v1.0
初始版本。

******************************
常见问题：

1.启用插件后代码无变化
请检查当前主题的footer.php中是否有wp_footer()这个函数的调用。

2.有什么可选参数?
参见->官方说明

******************************
下载：

[syntax-highlighter-optimized ](http://dl.dbank.com/c0yymo0j25) -- v1.1b

******************************
