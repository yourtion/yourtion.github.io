---
author: Yourtion
comments: true
date: 2010-11-22 01:40:46+00:00
layout: post
slug: joomla-template-parsing
title: Joomla模板解析
wordpress_id: 1584
categories:
- PHP
tags:
- Joomla
---
{% include JB/setup %}

所有前台的模板，你可以在joomla所在路径```/templates/```里找到,所有后台模板可以在joomla所在路径```/administrator/templates/```

通常模板会包含下面的文件：

* ```index.php``` 控制模块及组件的所在位置
* ```component.php``` 控制打印或发送好友页面
* ```template.css``` 模板CSS文件
* ```templateDetails.xml``` 模板信息，用于模板安装及管理
* ```template_thumbnail.(jpg,.png, gif)``` 200x150的模板缩微图，当鼠标放到模板名称上时会显示。

通常joomla1.5中还会含有下面的文件夹

* ```css``` 包含所有的css文件
* ```html``` 包含所有覆盖核心及模块的输出文件
* ```images``` 模板所用到的图片

打开rhuk_milkyway（自带模板）里的templateDetails.xml可以看到

```xml
<install version="1.5" type="template">
<name>rhuk_milkyway</name>（模板名称）
<creationDate>11/20/06</creationDate>（创建时间）
<author>Andy Miller</author>（作者）
<authorEmail>rhuk@rockettheme.com.com</authorEmail>（作者邮箱）
<authorUrl>http://www.rockettheme.com</authorUrl>（作者网站）
<copyright></copyright>（版权）
<license>GNU/GPL</license>（许可）
<version>1.0.2</version>（版本）
<description>TPL_RHUK_MILKYWAY</description>（描述）
```

上面的信息会在模板管理里面显示。

```xml
<files>
	<filename>index.php</filename>
	<filename>templateDetails.xml</filename>
	<filename>template_thumbnail.png</filename>
	<filename>params.ini</filename>
	<filename>images/arrow.png</filename>
	<filename>images/indent1.png</filename>
</files>
```

这里是所有和模板相关文件的文件名及路径（以模板路径为根目录）
更好的写法，（推荐的写法）

```xml
<files>
	<filename>index.php</filename>
	<filename>component.php</filename>
	<filename>templateDetails.xml</filename>
	<filename>template_thumbnail.png</filename>
	<filename>params.ini</filename>
	<folder>images/</folder>
	<folder>css/</folder>
</files>
```

有的模析包含了语言文件。在templateDetails.xml里会有如下信息

```xml
<languages>
<language tag="en-GB">en-GB.tpl_beez.ini</language>
</languages>（前台语言文件）
<administration>
	<languages folder="admin">
	<language tag="en-GB">en-GB.tpl_beez.ini</language>
	</languages>
</administration>（后台语言文件）
```

模块位置信息

```xml
<positions>
	<position>breadcrumb</position>
	<position>left</position>
	<position>right</position>
	<position>top</position>
	<position>user1</position>
	<position>user2</position>
	<position>user3</position>
	<position>user4</position>
	<position>footer</position>
	<position>debug</position>
	<position>syndicate</position>
</positions>
```

如果要添加新的模块位置，不仅要写入index.php也要在这里加入参数

```xml
<params>
	<param name="colorVariation" type="list" default="white" label="Color Variation" description="Color variation to use">
		<option value="blue">Blue</option>
		<option value="red">Red</option>
		<option value="green">Green</option>
		<option value="orange">Orange</option>
		<option value="black">Black</option>
		<option value="white">White</option>
	</param>
</params>
```

这可以给模板设置里增加一些参数选项。
