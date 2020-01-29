---
author: Yourtion
comments: true
date: 2010-07-17 07:27:51+00:00
excerpt: 进入我的博客，很多朋友发现右边多了个很炫的FollowMe，而且一定会被幻灯片给吸引住。强大的3D展示功能确实跟以前所见的幻灯片不太一样，给人耳目一新的感觉。所以我忍不住把它移植到我的博客上。
layout: post
slug: super-cool-slide-show-cu3er
title: 一个超酷的幻灯片：CU3ER
wordpress_id: 1303
category: "HTML"
tags: ["特效", "插件"]
---
{% include JB/setup %}

演示地址：[http://demo.yourtion.com/cu3er/](http://demo.yourtion.com/cu3er/)

强大的3D展示功能确实跟以前所见的幻灯片不太一样，给人耳目一新的感觉。

这是在汕头大学的网站上面看到的。觉得那么多大学网站里面，汕大的网站还是很不错的，很大气！

因为从官方下载的源文件没有自动播放、幻灯图片链接等功能，所以我在这里就简单介绍一下使用方法。

**CU3ER的使用十分简单，保证3分钟内你就可以学会了。**


### 下载

到我的Dbank下载：[cu3er-v0.9.2.zip](http://www.dbank.com/download.action?t=40&k=NDEyODg2ODk=&pcode=LCwxMjAzODksMTIwMzg5&rnd=4)

或者到 http://www.progressivered.com/cu3er/download/ 猛击那个红色的大按钮，下载源文件。

### 配置

配置上最核心就是config.xml这个文件了，接下来介绍一下大致标签的含义：

```xml
<?xml version="1.0" encoding="utf-8" ?>
<cu3er>
	<slides>
		<slide>
			<url>images/slide_1.jpg</url>
		</slide>
		<slide>
			<url>images/slide_2.jpg</url>
		</slide>
		<slide>
			<url>images/slide_3.jpg</url>
		</slide>
	</slides>
</cu3er>
```


很简单，每一张图片都是包含在标签之中的，你可以把图片地址修改为你要的图片。

**给幻灯片的每张图加上链接：**

只需要在```<url></url>```下加上```<link></link>```，例如<link>http://yourtion.com</link>。

需要注意的是，下载下来直接改，然后直接运行demo是无效的，必须要上传到服务器或在本地的站点上运行才可以。还有，默认的打开方式是新窗口打开，可以通过```<link target=”_blank">```来控制打开方式。

加入标题和描述：

```xml
<description>
	<link></link>
	<heading></heading>
	<paragraph></paragraph>
</description>
```

说明一下，heading就是标题，paragraph就是描述。还有<link>就是标题的链接了。

**修改好图片之后，就是“前进，后退“按钮了**。

这些配置全部包含在```<settings>```标签以内的：


```xml
<settings>
	<prev_button>
		<defaults round_corners="5,5,5,5"/>
		<tweenOver tint="0xFFFFFF" scaleX="1.1" scaleY="1.1"/>
		<tweenOut tint="0x000000" />
	</prev_button>

	<prev_symbol>
		<tweenOver tint="0x000000" />
	</prev_symbol>

	<next_button>
		<defaults round_corners="5,5,5,5"/>
		<tweenOver tint="0xFFFFFF" scaleX="1.1" scaleY="1.1"/>
		<tweenOut tint="0x000000" />
	</next_button>

	<next_symbol>
		<tweenOver tint="0x000000" />
	</next_symbol>
</settings>
```

```<prev_button>```代表后退按钮， ```<prev_symbol>```代表后退按钮的“箭头”。前进按钮与箭头同上。 ```<tweenOver tint="0xFFFFFF" scaleX="1.1" scaleY="1.1"/>```是指当鼠标移上（```mouseover```）前进后退按钮时，按钮样式变大1.1倍，并变为```ffffff```这个颜色。

**幻灯片自动播放**，需要在里加入以下代码：

```xml
<auto_play>
	<defaults symbol="circular" time="3" />
	<tweenIn x="500" y="50" width="35" height="35" tint="0xFFFFFF" />
</auto_play>
```

更多的功能和详细的解析可以看官方的文档：[http://www.progressivered.com/cu3er/docs/](http://www.progressivered.com/cu3er/docs/)。
