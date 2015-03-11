---
author: Yourtion
comments: true
date: 2010-06-08 04:47:22+00:00
excerpt: 最近在用Eclipse写J2me程序~但是你会发现Eclipse只有在写"."后面才会自动补全~很不方便。现在就介绍然后让它全都自动补全。
layout: post
slug: enhanced-auto-complete-eclipse
title: 增强Eclipse自动补全
wordpress_id: 1167
categories:
- 电脑技巧
tags:
- Eclipse
- Java
---
{% include JB/setup %}

最近在用Eclipse写J2me程序~但是你会发现Eclipse只有在写"."后面才会自动补全~很不方便。现在就介绍然后让它全都自动补全。

打开 Eclipse 的 **窗口（Window） -> 首选项（Perferences） -> Java -> 编辑器（Editor ）-> 内容辅助（Content）**，最下面一栏 **自动激活（Auto）-Java的自动激活触发器（Activation）** 会看到只有一个"."存在。表示：只有输入"."之后才会有代码提示，我们要修改的地方就是这里，可是Eclipse默认只允许输入4个自定义字符。 先把上图中"."的地方输入几个随便的字符，例如"qwer"，点最下面的"OK"来保存设置。 然 后打开 Eclipse的 **文件（File） -> 导出（Export），在窗口中展开 常规（General） -> 首选项（Perferences）-->全部导出（Export all）**然后点击 **下一步（NEXT）**。然后点击**浏览（Browse）**选择任意的一个路径，保存配置文 件，然后点击**完成（Finish）** 。

用记事本打开刚才保存的那个配置文件（扩展文件名：*.epf），按**搜索"ctrl + F"**，输入刚才设置的"qwer"，找到刚才字符串。把"aaaa"修改为"abcdefghijklmnopqrstuvwxyz."，然后保存，退出记事本。

打开Eclipse的 **文件（File） -> 导入（Import）** 然后在打开的窗口里展开 **常规（General） -> 首选项（Perferences）**，点击**下一步（NEXT）** ，选中刚才修改过的配置文件，点击 **完成（Finish）** 。现在，再打开窗口**（Window） ->首选项（Perferences）** ，并依次展开 **Java -> 编辑器（Editor） -> 内容辅助（Content）**的**Java的自动激活触发器（Activation）**，会发现已经超过了4个字符，也就是说我们输入任何字母和"."都会有代码提示了。
