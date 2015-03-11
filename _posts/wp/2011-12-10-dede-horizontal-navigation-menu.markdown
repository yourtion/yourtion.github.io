---
author: Yourtion
comments: true
date: 2011-12-10 06:58:51+00:00
excerpt: 最近在做一个旅游网站，对方要求使用类似于QQ票务的水平二级导航菜单，由于后台使用DEDE(织梦)CMS系统，所以研究了一下它的水平二级菜单的制作方法，网上的教程不是很详细，总结了一下，把我的制作过程和方法共享一下，希望对你有帮助。
layout: post
slug: dede-horizontal-navigation-menu
title: DEDE(织梦)CMS水平二级导航菜单制作
wordpress_id: 3480
categories:
- CSS+DIV
tags:
- dede
---
{% include JB/setup %}

最近在做一个旅游网站，对方要求使用类似于QQ票务的水平二级导航菜单，由于后台使用DEDE(织梦)CMS系统，所以研究了一下它的水平二级菜单的制作方法，网上的教程不是很详细，总结了一下，把我的制作过程和方法共享一下，希望对你有帮助。

效果如下：
[![]({{ IMAGE_PATH }}2011/12/dede-shuiping-daohang-560x67.jpg)]({{ IMAGE_PATH }}2011/12/dede-shuiping-daohang.jpg)

我的dede原有模版的一级导航源码(head.htm)如下：

```
<!-- 导航 -->
<div id="nav">
	<ul>
		<li class="w1"><a href='{dede:global.cfg_cmsurl/}/'><p>主页</p></a></li>
      	{dede:channel type='top' row='10' currentstyle="<li class='w1'><a href='~typelink~' ~rel~><p>~typename~</p></a></li>"}
      	<li class="w1"><a href='[field:typeurl/]' [field:rel/]><p>[field:typename/]</p></a></li>
      	{/dede:channel}
	</ul>
</div>
```

首先导入原来用于底部友链的javascript文件：

```
 <script type='text/javascript' src='{dede:global.cfg_cmsurl/}/images/js/dropdown.js'></script>
```

然后将导航部分代码改为：

```
<div id="nav">
	<ul>
		<li class="w1"><a href='{dede:global.cfg_cmsurl/}/'><p>主页</p></a></li>
		{dede:channel type='top' row='10'}
		<li class="w1"><a href='[field:typeurl/]' [field:rel/]><p>[field:typename/]</p></a></li>
		{/dede:channel}
    </ul>
    <ul >
	<div style="clear:both;"></div>
	{dede:channelartlist typeid='top' cacheid='channelsonlist'}
		<ul id="dropmenu{dede:field.typeid/}" class="dropMenu">
		{dede:channel type='son' noself='yes'}  
			<li class="dropMenu"><a href="[field:typelink/]">[field:typename/]</a></li>
		{/dede:channel}
		</ul>
	{/dede:channelartlist}
	</ul>
</div>
<script type="text/javascript">cssdropdown.startchrome("nav")</script>
```

最后把下面的CSS代码加到你原有的CSS文件中就大功告成了：

```
.dropMenu { background: url("img/snav.jpg") repeat-x scroll 0 0 transparent; width: 1024px; height: 31px;}
.dropMenu ul li {height:16px; background:#fff}
.dropMenu li {height:16px; background:#fff}
.dropMenu a {width:auto; display: block; color:#000; padding: 2px 0 2px 2px;background:#fff}
.dropMenu a:hover {color:red; text-decoration: underline;}
```

希望这个东西对你有帮助，如果有什么问题或者意见建议欢迎留言回复交流。


