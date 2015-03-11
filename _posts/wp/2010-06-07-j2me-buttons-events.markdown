---
author: Yourtion
comments: true
date: 2010-06-07 07:39:29+00:00
excerpt: 这两天开始写关于退出按键的程序~~发现用Java很麻烦的感觉~写个东西老是要继承类啊什么的·~~对于习惯傻瓜编程的我很不习惯~~写个退出都那么麻烦··郁闷就是···
layout: post
slug: j2me-buttons-events
title: j2me的按钮和事件
wordpress_id: 1163
categories:
- j2me
tags:
- j2me
- 手机开发
---
{% include JB/setup %}

这两天开始写关于退出按键的程序~~

发现用Java很麻烦的感觉~写个东西老是要继承类啊什么的·~~对于习惯傻瓜编程的我很不习惯~~写个退出都那么麻烦··郁闷就是···

```
import javax.microedition.midlet.*;
import javax.microedition.lcdui.*;

public class CommandTest extends MIDlet implements CommandListener // 继承按键监听
{
	private Display display1;
	private Form showForm;

	public CommandTest() {
		display1 = Display.getDisplay(this);
		showForm = new Form("测试退出按钮");
		Command exitCommand = new Command("退出", Command.STOP, 2);// 声明并初始化exitCommand按钮
		showForm.addCommand(exitCommand);// 面板上添加刚才的按钮
		showForm.setCommandListener(this);
	}

	public void startApp() throws MIDletStateChangeException {
		display1.setCurrent(showForm);
	}

	public void pauseApp() {
	}

	public void destroyApp(boolean unconditional) {
		notifyDestroyed();
	}

	public void commandAction(Command cmd, Displayable diaplayable)// 继承commandAction方法，既点击时候执行的函数
	{
		destroyApp(true);// 执行退出
	}
}
```

