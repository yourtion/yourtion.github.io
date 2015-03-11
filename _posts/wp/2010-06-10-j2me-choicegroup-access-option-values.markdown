---
author: Yourtion
comments: true
date: 2010-06-10 05:26:31+00:00
excerpt: j2me使用ChoiceGroup使用和获取选项值多选框在程序中使用相当广泛~选择某些功能什么都要靠它~~
layout: post
slug: j2me-choicegroup-access-option-values
title: j2me使用ChoiceGroup使用和获取选项值
wordpress_id: 1172
categories:
- j2me
tags:
- j2me
- 手机开发
---
{% include JB/setup %}

多选框在程序中使用相当广泛~选择某些功能什么都要靠它~~

```java
import javax.microedition.midlet.*;
import javax.microedition.lcdui.*;

public class ChoiceGroupTest extends MIDlet implements ItemStateListener // 继承ItemStateListener这个接口
{
	private Display display1;
	private Form showForm;
	ChoiceGroup cg;// 声明

	public ChoiceGroupTest()// 构建函数
	{
		display1 = Display.getDisplay(this);
		showForm = new Form("ChoiceGroupTest");
		cg = new ChoiceGroup("请选择喜爱的编程语言：", Choice.MULTIPLE);// 创建ChoiceGroip.第一个是显示提示内容，第二个是类型
		cg.append("C", null); // 选项1
		cg.append("C++", null); // 选项2
		cg.append("Java", null);// 选项3
		showForm.append(cg);
		showForm.setItemStateListener(this);
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

	public void itemStateChanged(Item item)// 创建抽象类
	{
		String tmp = "";
		for (int i = 0; i < cg.size(); i++)// cg.getSize获得ChoiceGroup的选项数目
		{
			if (cg.isSelected(i))// 判断选项是否选中，如果选中就显示
			{
				tmp = tmp + cg.getString(i) + " ";// 把选中的内容串起来
			}
		}
		System.out.println("你选择了：" + tmp);// 选择的内容在控制台显示出来
	}
}
```

