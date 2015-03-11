---
author: Yourtion
comments: true
date: 2010-11-08 23:59:04+00:00
excerpt: 在用css重构嘉应学院主页的时候，发现最大的那个标签高度不会随着内部标签增加而变高，导致我的背景色不会覆盖，研究了一下，原来跟float有关，解决方法，主要是一下四种：
layout: post
slug: css-div-float-height-auto-increase
title: css div设置float后高度不自动增加解决
wordpress_id: 1598
categories:
- CSS+DIV
tags:
- CSS
- 解决问题
---
{% include JB/setup %}

在用css重构嘉应学院主页的时候，发现最大的那个标签高度不会随着内部标签增加而变高，导致我的背景色不会覆盖，研究了一下，原来跟float有关，解决方法，主要是一下四种：

**1.    额外标签法**

这种方法就是向父容器的末尾再插入一个额外的标签，并令其清除浮动（clear）以撑大父容器。这种方法浏览器兼容性好，没有什么问题，缺点就是需要额外的（而且通常是无语义的）标签。
我个人不喜欢这种方法，但是它确实是W3C推荐的方法


<blockquote><div style="clear:both;"></div></blockquote>


或者使用


<blockquote><br style="clear:both;" /></blockquote>


**2. 使用after伪类**

这种方法就是对父容器使用after伪类和内容声明在指定的现在内容末尾添加新的内容。经常的做法就是添加一个“点”，因为它比较小不太引人注意。然后我们再利用它来清除浮动（闭合浮动元素），并隐藏这个内容。
这种方法兼容性一般，但经过各种 hack 也可以应付不同浏览器了，同时又可以保证html 比较干净，所以用得还是比较多的。
以下为引用的内容：


<blockquote>#outer:after{
content:".";
height:0;
visibility:hidden;
display:block;
clear:both;
}</blockquote>


**3.    设置overflow为hidden或者auto**

这种做法就是将父容器的overflow设为hidden或auot就可以在标准兼容浏览器中闭合浮动元素.

不过使用overflow的时候，可能会对页面表现带来影响，而且这种影响是不确定的，你最好是能在多个浏览器上测试你的页面

**4. 浮动外部元素，float-in-float**

这种做法就是让父容器也浮动，这利用到了浮动元素的一个特性——浮动元素会闭合浮动元素。这种方式在 IE/Win 和标准兼容浏览器中都有较好的效果，但缺点也很明显——父容器未必想浮动就浮动的了，毕竟浮动是一种比较特殊的行为，有时布局不允许其浮动也很正常。
