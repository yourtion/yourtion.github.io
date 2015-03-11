---
author: Yourtion
comments: true
date: 2011-04-14 03:27:38+00:00
excerpt: Maqetta已经是开源项目，提供WYSIWYG可视化HTML5用户界面设计功能，仅需简单的拖曳操作，支持桌面和移动用户界面。现在我们将介绍如何安装使用Magetta。
layout: post
slug: html5-visual-design-tools-maqetta
title: 基于HTML5的在线可视化设计工具Maqetta安装使用
wordpress_id: 2018
categories:
- HTML
tags:
- HTML5
---
{% include JB/setup %}

4月12日，来自 IBM Impact 2011 的消息，IBM发布 Maqetta，一个创建桌面和移动用户界面的HTML5设计编辑工具，并同时宣布将项目捐助给开源机构Dojo基金会。

Maqetta已经是开源项目，提供WYSIWYG可视化HTML5用户界面设计功能，仅需简单的拖曳操作，支持桌面和移动用户界面。

Maqetta 应用本身用HTML5/Ajax编写，因此运行在浏览器中无需请求额外的插件或下载。用户可以下载源码，并安装在自己的服务器上，并可自定义源码来满足自己的需求，再回馈到开源项目。

OpenAjax Alliance 有120多个公司，最大的抱怨是Widgets的交互性，以及可视化工具的需求。“IBM 负责人Boloker解释推出该项目的原因：“我们的目标就是在web上搞定任何事儿”。

[![]({{ IMAGE_PATH }}2011/04/11-560x375.jpg)]({{ IMAGE_PATH }}2011/04/11.jpg)

[![]({{ IMAGE_PATH }}2011/04/21-560x343.jpg)]({{ IMAGE_PATH }}2011/04/21.jpg)

[![]({{ IMAGE_PATH }}2011/04/3-560x343.jpg)]({{ IMAGE_PATH }}2011/04/3.jpg)

Maqetta 功能如下：



	
  * WYSIWYG可视化页面编辑

	
  * 拖曳式移动UI设计

	
  * 设计或源码浏览同步编辑

	
  * 对CSS样式的深度支持


更多功能见项目页：http://maqetta.org/

Maqetta 下载：[maqetta-preview.zip](http://dl.dbank.com/c0ff7r4ftv)

[](http://dl.dbank.com/c0ff7r4ftv)现在我们将介绍如何使用Magetta。下载回来的压缩包解压后如下图：

[![]({{ IMAGE_PATH }}2011/04/4.jpg)]({{ IMAGE_PATH }}2011/04/4.jpg)

我在Windows2003下，而且只是本机使用，所以运行maqetta.local.win.bat。运行后会出现如下图命令行窗口：

[![]({{ IMAGE_PATH }}2011/04/5-560x360.jpg)]({{ IMAGE_PATH }}2011/04/5.jpg)

可以看出它依赖于JDK环境，那具体怎么配置可以参见[《JDK环境变量的设置》](http://blog.yourtion.com/?p=1155)。保持上面那个窗口不关闭，然后在Chrome、FireFox 3.5+ 或者Mac Safari 5浏览器里的地址栏输入：


<blockquote>start your browser at http://localhost:50000/maqetta</blockquote>


里面http://localhost:50000/maqetta这个地址即可。
