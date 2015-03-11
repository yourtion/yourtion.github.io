---
author: Yourtion
comments: true
date: 2010-06-04 08:24:20+00:00
layout: post
slug: jdk-environment-variable-settings
title: JDK环境变量的设置
wordpress_id: 1155
categories:
- j2me
tags:
- j2me
---
{% include JB/setup %}

下载：http://java.sun.com/javase/downloads/index.jsp

安装,配置j2sdk：

执行j2sdk安装程序，自定义路径，我的安装路径为：C:\j2sdk1.4.2_04

配置j2sdk:配置环境变量:

我的电脑->属性->高级->环境变量->系统变量中添加以下环境变量：

```ini
JAVA_HOME=C:\j2sdk1.4.2_04
CLASSPATH=.;C:\j2sdk1.4.2_04\lib\tools.jar;C:\j2sdk1.4.2_04\lib\dt.jar;C:\j2sdk1.4.2_04\bin;
path=C:\j2sdk1.4.2_04\bin;
```

写一个简单的java程序来测试J2SDK是否已安装成功：

```java
public class hello
{
	public static void main(String args[])
	{
		System.out.println("Hello");
	}
}
```

将程序保存为文件名为hello.java的文件。

打开命令提示符窗口，进入到hello.java所在目录，键入下面的命令

```bash
javac hello.java
java hello
```

此时若打印出来hello则安装成功，若没有打印出这句话，仔细检查以上配置是否正确。

注意系统文件夹选项中应确定“隐藏已知文件类型的扩展名”不勾选（我的电脑>工具>查看）
