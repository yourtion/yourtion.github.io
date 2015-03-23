---
author: Yourtion
comments: true
date: 2010-06-05 08:24:39+00:00
excerpt: 开始写j2me~今天写了最简单最经典的入门程序“Hello World”。分享一下！
layout: post
slug: j2me-helloworld
title: 第一个j2me程序“HelloWorld”
wordpress_id: 1157
categories:
- j2me
tags:
- j2me
- Java
- 移动开发
---
{% include JB/setup %}

开始写j2me~今天写了最简单最经典的入门程序“Hello World”。分享一下！

```java
import javax.microedition.midlet.*;
import javax.microedition.lcdui.*;

public class HelloWorld extends MIDlet
{
	private Display display1;
	private Form showForm;

	public HelloWorld()//构建函数
	{
		display1=Display.getDisplay(this);
		showForm=new Form("HelloWorld");
		StringItem strItem=new StringItem("Hi","这是Yourtion第一个J2me入门程序");
		showForm.append(strItem);
	}
	public void startApp() throws MIDletStateChangeException// 程序一开始就运行并抛出错误
	{
		display1.setCurrent(showForm);//程序一开始运行就显示
	}
	public void pauseApp()//当程序被中断时候执行
	{
	}
	public void destroyApp( boolean unconditional )//程序结束时候运行
	{
	}
}
```

