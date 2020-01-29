---
author: Yourtion
comments: true
date: 2010-08-21 09:45:31+00:00
excerpt: '最近在为梅州刑侦的网站工作收尾，已经拖了相当久··都有些不好意思啦··人家提了要求要在文章列表下面加虚线，也就只好研究一下··因为用CSS，之前Table的做法就不适合了···重新研究一下···这个方法不错··希望你能举一反三··用在自己站点咯··· '
layout: post
slug: add-a-dash-way-the-article-list
title: 文章列表添加虚线方法
wordpress_id: 1481
category: "HTML"
tags: ["CSS"]
---
{% include JB/setup %}

最近在为梅州刑侦的网站工作收尾，已经拖了相当久··都有些不好意思啦··  人家提了要求要在文章列表下面加虚线，也就只好研究一下··因为用CSS，之前Table的做法就不适合了···重新研究一下···  这个方法不错··希望你能举一反三··用在自己站点咯···  动易标签提供了两个参数，我们可以利用这两个参数来制作。


风格样式1： 列表中奇数行的CSS效果的类名

风格样式2： 列表中偶数行的CSS效果的类名</blockquote>


大家来动手做吧，先把下面ＣＳＳ放在风格最后面，然后保存，刷新风格。  以下是CSS代码：

```css
.lbxx,.lbxx2 {border-bottom: #ccc 1px dashed;} /* 定义虚线，可以修改 #ccc ，可以修改虚线颜色*/
.lbxx {background:#FFFFFF;} /*  定义列表奇数行背景颜色，白色*/
.lbxx a:link {color:  #000000;} /* 未访问的链接，黑颜色*/
.lbxx a:visited {color:  #000000;} /*已访问的链接， 黑颜色*/
.lbxx a:hover{COLOR: #FF0000;} /* 鼠标在链接上，red颜色*/
.lbxx a:bb:active {color: #FF0000;} /*  点击激活链接，黑颜色*/
.lbxx2  {background:#FFFFFF;}  /* 定义列表偶数行背景颜色，白色*/
.lbxx2 a:link {color:  #000000;}   /* 未访问的链接，黑颜色*/
.lbxx2 a:visited {color:  #000000;}   /*已访问的链接， 黑颜色*/
.lbxx2 a:hover{COLOR: #FF0000;} /* 鼠标在链接上，red颜色*/
.lbxx2 a:active {color: #FF0000;} /*  点击激活链接，黑颜色*/

```


第一行CSS是定义虚线的，“```#ccc ```” 为虚线的颜色；“```1px```”为虚线的像素；其他上面都有注释了。  然后我们就可以在标签调用就可以了

下面举个例：大家注意一下有两个CSS的样式，一个是“```lbxx```”， 一个是“```lbxx2```”，在下面标签调用的时候只要把两个风格样式填上去就可以了。  如：

```
<!--{$GetArticleList(0,0,false,0,0,11,false,false,"",0,3,2,56,0,false,1,false,false,0,false,false,false,false,false,false,0,1,,lbxx,lbxx2)}-->
```


其他标签也是一样。  如果是编辑标签的时候也是把这两个风格填上去即可。

> 风格样式1： 列表中奇数行的CSS效果的类名
> 
> 风格样式2： 列表中偶数行的CSS效果的类名


现在大家知道怎么做了吧。分别有什么作用？你看看旁边红色字不就清楚了！

**注意**：标签的显示样式不一定要是“表格式”，我用的是DIV输出既“5”

```ShowType``` -----显示方式，1为普通样式，2为表格式，3为各项独立式，4为智能多列式，5为输出DIV，6为输出RSS
