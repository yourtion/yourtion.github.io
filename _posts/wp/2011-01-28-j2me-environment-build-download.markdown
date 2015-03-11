---
author: Yourtion
comments: true
date: 2011-01-28 08:15:10+00:00
excerpt: 最近突发奇想想做PageCookery的手机java端，之前看过一点j2me，现在很久没弄，都给生疏了，连环境怎么搭都忘了，花了很久去Sun那里下载东西，贴出来大家共享一下，加快下载速度嘛。本文环境主要需要（会提供Dbank高速下载）
layout: post
slug: j2me-environment-build-download
title: j2me环境搭建及软件下载
wordpress_id: 1851
categories:
- j2me
tags:
- j2me
---
{% include JB/setup %}

最近突发奇想想做PageCookery的手机java端，之前看过一点j2me，现在很久没弄，都给生疏了，连环境怎么搭都忘了，花了很久去Sun那里下载东西，贴出来大家共享一下，加快下载速度嘛。

本文环境主要需要（会提供Dbank高速下载）

jdk1.6 下载地址：http://java.sun.com/javase/downloads/index.jsp
Eclipse3.6.1 下载地址：http://www.eclipse.org/downloads/
WTK是2.5.2版本的 下载地址：http://java.sun.com/javame/downloads/index.jsp
eclipseme 1.79版本 下载地址：http://sourceforge.net/project/showfiles.php?group_id=86829

**Dbank高速下载：[j2me环境搭建软件](http://dl.dbank.com/c0qbt3fn78)**

安装配置
1、安装jdk，一路next

2、Eclipse安装，解压到指定目录即可

3、安装wtk，一路next,注意路径选择（一会要用）

4、Eclipse me插件安装. help-->software updates-->available Software(面板)，-->Add Site -->Archive(选择eclipseme插件文件)确定之后你会在发现一个ar:file:E:\tool\java\eclipseme.feature_1.7.9_site.zip!/(file:后面的根据你的路径会不一样)，然后选中这个，再点击右边菜单install，安装过后eclipse会提示是否重启eclipse,选重启这个时候已经安装完啦

5、重启后配置window-->Preferences找到J2ME下的Device Managerment ,右边菜单Import，选择刚才wtk的安装路径，选择DefaultColorPhone，OK！

6、Eclipse汉化，可以使用最简单，直接拷贝法：将对应目录下的文件拷贝到和Eclipse对应目录下即可。（将解压后的语言包下的features和plugins目录下的所有文件和jar包分别拷贝到Eclipse的features和plugins目录下）这样就汉化成功了，不过这种方法日后不好管理；或者使用link安装，在eclipse ->Help ->software updates -> Find and Install ->Search for new features to install ->NEXT->选择New Remote Site 升级地址填写为


<blockquote>http://download.eclipse.org/technology/babel/update-site/R0.8.0/helios</blockquote>


然后出列表后选择一下简体中文就可以了！
现在整个开发环境已经配置好啦

**Helloworld程序编程**

1、建立工程：文件-->新项目-->选择J2ME下的J2ME Midlet Suite，工程建立完毕
2、Helloworld类，在src上右键“新建其他”，在面板上选j2me下的J2ME Midlet，这个类自动继承了MIDlet类，类名为HelloWorld，内容如下：

```
import javax.microedition.lcdui.Display;
import javax.microedition.lcdui.TextBox;
import javax.microedition.midlet.MIDlet;
import javax.microedition.midlet.MIDletStateChangeException;  

public class HelloWorld extends MIDlet {
    private TextBox textbox;
    public HelloWorld() {
        textbox = new TextBox("", "Hello World!", 20, 0);
    }
    protected void destroyApp(boolean arg0) throws MIDletStateChangeException {
        Display.getDisplay(this).setCurrent(textbox);
    }
    protected void pauseApp() {
        // TODO Auto-generated method stub
    }
    protected void startApp() throws MIDletStateChangeException {
        // TODO Auto-generated method stub
    }
}
```

四、运行程序
点击Run，耐心等下你会看到一个非常漂亮的手机，虽然只是个图案。
这样就大功告成了！
