---
author: Yourtion
comments: true
date: 2011-05-17 02:16:33+00:00
excerpt: 最近女朋友也用上Chrome了，想到给我们的情侣微博也来个Chrome插件，这次初步的插件开发，发现过程还是比较简单，有HTML和Javascript基础的朋友，都能开发出属于自己的Chrome插件。
layout: post
slug: chrome-plugin-development-html
title: 用HTML开发Chrome插件入门
wordpress_id: 2128
categories:
- HTML
tags:
- Chrome插件
- HTML
---
{% include JB/setup %}

最近女朋友也用上Chrome了，想到给我们的情侣微博也来个Chrome插件，这次初步的插件开发，发现过程还是比较简单，有HTML和Javascript基础的朋友，都能开发出属于自己的Chrome插件。


### 插件开发流程


1.开发语言和软件
开发语言就是HTML和Javascript，开发软件选择一款自己熟悉的纯文本编辑器就可以了，例如系统自带的记事本，或者支持语法高亮的Notpad++。

2.设计插件
一个完整的插件是由4个部分组成，分别是manifest.json、.js文件、图标和HTML文件，设计插件就是设计这4类文件。manifest.json的作用是定义插件的属性，例如名称、版本、类型等;HTML文件具体实现插件的功能;.js文件是一个跟浏览器互动的脚本。

3.载入插件
设计好上面几个文件后，就可以将插件载入浏览器中试用一下。首先将它们整理到同一个文件夹中，然后在Chrome的工具栏中选择“扩展程序”，进入扩展管理页，在右侧选择“开发人员模式”，再点击“载入正在开发的扩展程序”按钮，定位到这个文件夹，将整个文件夹载入Chrome中。

4.发布插件
插件试用没有问题后，不妨将它发布出去让更多人使用。首先将插件所在的文件夹压缩成一个ZIP文件(别顺手压缩成了RAR文件)。然后再到扩展管理页，点击右下角的“获得更多扩展程序”链接，进入Chrome官方插件下载页面，在这个网页的左下角，你能看到“发布扩展程序”的链接，点击链接，上传ZIP压缩文件、添加插件的使用说明和截图，就可以发布插件了。


### 组成结构


Chrome插件最基本的三个文件为：

icon.png: 用于在插件工具栏上显示图标，文件名可以自定义，19*19；
manifest.json: 控制整个插件行为的配置文件，该文件需要保存成UTF-8格式；
popup.html: 点击插件图标后弹出的窗口，是插件的主界面，文件名可以自定义。
如果希望插件结构更完善，还可以包含如下文件/目录：

imgs目录：存放插件中使用的图片；
css目录：存放CSS文件；
js目录：存放JS文件；
background.html: 插件的后台程序，其不会因为popup.html窗口消失而停止运行。
icon_128.png: 在插件描述中作为插件的Logo，128*128。
**manifest.json 为整个插件的主控文件，基本功能描述如下：**

```
{
    "name": "GroovyQ Ask Question",   //名称
    "version": "0.1",       //版本号
    "description": "提交Groovy/Grails问题！",     //描述信息，会显示在插件属性里
    "browser_action": {
        "default_icon": "groovyq.jpg",     //指定插件图标的路径
        "popup": "popup.html"            // 指定 popup.html 文件的路径
    },

    "permissions": [
      "http://www.groovyq.net/"     //此权限支持向 <a href="http://www.groovyq.net/" title="http://www.groovyq.net/">http://www.groovyq.net/</a> 发送 Ajax 请求
    ]
}
```

**popup.html为整个插件的界面，框架如下：**

```
<!DOCTYPE html>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link rel="stylesheet" href="main.css" />

<!-- 注意js代码的路径，下面访问的是与popup.html同级目录的groovyq.js -->
<script type="text/javascript" src="./groovyq.js"></script>
<script type="text/javascript">
......

</script>
<body >
   ......
</body>
```

**关于Background.html**

在popup.html中定义的JavaScript变量会在popup.html页面关闭时被释放，如何保存全局变量呢？这时可以使用background.html。background.html页面中定义的javascript变量会在Chrome浏览器生命期中一直存在，因此把全局变量放在这里是最合适的了。

```
//Background.html中定义变量
var global_url = "";
var global_type = "";
//在popup.html中读取上述变量或赋值
var backpg = chrome.extension.getBackgroundPage();
backpg.global_url = "http://www.groovyq.net";
backpg.global_type = "blog";
```

对于数据保存，还可以使用HTML5的localStorage：

```
//保存
localStorage['url'] = golbal_url;
localStorage['type'] = global_type;
//取值
global_url = localStorage['url'];
global_type = localStorage['type'];
```



### 插件调试/发布


插件开发中，可以使用任何浏览器打开popup.html进行调试。但若是用到一些Chrome的特性，就需要在Chrome上进行调试。

安装插件：Chrome中，单击工具栏的扳手按钮，选择工具 -》扩展程序，在出现的页面中单击：开发人员模式 -》载入正在开发的扩展程序，选择插件的根目录，确定。

在扩展程序列表中会出现插件的相关信息，而在Chrome的工具栏中也能看到插件图标，单击图标，弹出的就是popup.html。
如果修改插件程序，只需单击插件描述信息下方的“重新载入”，修改就会生效。你还可以在此对插件执行停用/卸载等操作。

插件开发结束后，可以打包插件分发给更多人享用你的插件。可以选择“打包扩展程序”，填入插件根目录以及私有密钥，之后在https://chrome.google.com/extensions 发布你的程序即可。
