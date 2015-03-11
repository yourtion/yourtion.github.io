---
author: Yourtion
comments: true
date: 2010-06-09 03:04:55+00:00
excerpt: j2me实现Ticker滚动显示日期Calendar使用Ticker显示滚动消息和使用日期函数获取时间~~
layout: post
slug: j2me-ticker-scrolling-in-calendar
title: j2me实现Ticker滚动显示日期Calendar
wordpress_id: 1170
categories:
- j2me
tags:
- j2me
- 手机开发
---
{% include JB/setup %}

使用Ticker显示滚动消息和使用日期函数获取时间~~

```java
import javax.microedition.midlet.*;
import javax.microedition.lcdui.*;
import java.util.*;

public class TickerTest extends MIDlet {
	private Display display1;
	private Form showForm;

	public TickerTest()// 构建函数
	{
		display1 = Display.getDisplay(this);
		showForm = new Form("滚动效果测试--http://Yourtion.TK");
		Calendar calendar = Calendar.getInstance();// 通过getInstance()来初始化calendar
		String strYear = calendar.get(Calendar.YEAR) + "年";// 获取当年年份
		String strMonth = (calendar.get(Calendar.MONTH) + 1) + "月";// 获取月份~+1是因为系统从0开始
		String strDay = calendar.get(Calendar.DAY_OF_MONTH) + "日";// 获取当天天数
		Ticker ticker1 = new Ticker("当前日期：" + strYear + strMonth + strDay);// 滚动显示的内容
		showForm.setTicker(ticker1);// 滚动显示文字
	}

	public void startApp() throws MIDletStateChangeException// 程序一开始就运行并抛出错误
	{
		display1.setCurrent(showForm);// 程序一开始运行就显示
	}

	public void pauseApp()// 当程序被中断时候执行
	{
	}

	public void destroyApp(boolean unconditional)// 程序结束时候运行
	{
	}
}
```

