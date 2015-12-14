---
layout: post
date: 2015-12-14 13:39:35
slug: use-plantuml-on-mac
title: "在 Mac 上使用 PlantUML 高效画图"
author: Yourtion
keywords: ["PlantUML", "Graphviz", "Diagram", "Sublime Text"]
description: "在Mac上使用PlantUML快速地画出：时序图、流程图、用例图、状态图、组件图。只需要用文字表达出图的内容，然后就可以直接生成图片。"
category: "电脑技巧"
tags: ["Mac"]
---
{% include JB/setup %}

刚刚看了 kamidox 写的 [《使用 Sublime + PlantUML 高效地画图》](http://www.jianshu.com/p/e92a52770832)，心痒痒的，马上进行尝试，因为作者是在 Windows 上搭建的环境，我主要是用 Mac，大概研究了一下，搭建起来还是蛮简单的。

## PlantUML

PlantUML 是一个画图脚本语言，用它可以快速地画出：时序图、流程图、用例图、状态图、组件图。

简单地讲，我们使用 visio 或者 Omni Graffle 画图时需要一个一个图去画，但使用 PlantUML 只需要用文字表达出图的内容，然后就可以直接生成图片。

如下图：

[![PlantUML-Demo1]({{ IMAGE_PATH }}2015/12/palntuml-demo1.png)]({{ IMAGE_PATH }}2015/12/palntuml-demo1.png)

可以通过下面文本生成：

```
@startuml

start
:"步骤1处理";
:"步骤2处理";
if ("条件1判断") then (true)
    :条件1成立时执行的动作;
    if ("分支条件2判断") then (no)
        :"条件2不成立时执行的动作";
    else
        if ("条件3判断") then (yes)
            :"条件3成立时的动作";
        else (no)
            :"条件3不成立时的动作";
        endif
    endif
    :"顺序步骤3处理";
endif

if ("条件4判断") then (yes)
:"条件4成立的动作";
else
    if ("条件5判断") then (yes)
        :"条件5成立时的动作";
    else (no)
        :"条件5不成立时的动作";
    endif
endif
stop

@enduml
```

是不是很方便，很想要，事不宜迟，马上开始动手吧！

## 基础环境
  - Java 
  - Graphviz 
  - Sublime Text 2 or 3

`Java` 和 `Sublime Text` 就不用说了，大家都知道怎么安装了（或者本来系统就有的），主要说一下 `Graphviz` 这个开源的图片渲染库。我是执行 `brew install graphviz` 直接安装的。

>如果不知道 Homebrew 已经怎么安装 `brew` 请参考[brew.sh](brew.sh)

## Sublime Text 配置

`Sublime Text` 的集成使用的是 [sublime_diagram_plugin](https://github.com/jvantuyl/sublime_diagram_plugin) 因为默认的包管理中没有，所以需要自己添加源。

  1. 使用 `Command-Shift-P` 打开 `Command Palette`
  2. 输入 `add repository` 找到 `Package Control:Add Repository`
  3. 在下方出现的输入框中输入 `https://github.com/jvantuyl/sublime_diagram_plugin.git` 然后回车
  4. 等待添加完成后再次使用 `Command-Shift-P` 打开 `Command Palette`
  5. 输入 `install package` 找到 `Package Control:Install Package`
  6. 等待列表加载完毕，输入 `diagram` 找到 `sublime_diagram_plugin` 安装
  7. 重启 `Sublime Text`

重启后可以在 `Preferences -> Packages Setting` 看到 `Diagram`，默认绑定的渲染快捷键是 `super + m` 也就是 `Command + m` 如果不冲突直接使用即可。

> 如果不知道怎么开启 Sublime Text 的 Package Control 请参考： [https://packagecontrol.io/installation](https://packagecontrol.io/installation)

## 简单使用

使用的话比较简单，绘图的内容需要包含在 `@startuml` 和 `@enduml` 中，不然会报错。

在文本中输入以下内容：

```
@startuml
Bob -> Alice : Hello, how are you
Alice -> Bob : Fine, thank you, and you?
@enduml
```

按 `Command + m` 会在当前工作目录下生成这个图片文件，同时自动弹出窗口显示如下图片。

[![PlantUML-Demo]({{ IMAGE_PATH }}2015/12/palntuml-demo.png)]({{ IMAGE_PATH }}2015/12/palntuml-demo.png)

样例可以参考kamidox 写的 [《使用 Sublime + PlantUML 高效地画图》](http://www.jianshu.com/p/e92a52770832)

更多使用方法参考官方中文文档：[http://translate.plantuml.com/zh](http://translate.plantuml.com/zh)

## 参考
  1. [使用 Sublime + PlantUML 高效地画图](http://www.jianshu.com/p/e92a52770832)
  2. [sublime_diagram_plugin](https://github.com/jvantuyl/sublime_diagram_plugin) 
 
