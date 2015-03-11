---
author: Yourtion
comments: true
date: 2012-04-13 14:46:32+00:00
excerpt: 第一次写关于AppCan开发的文章，有人写了关于jQuery或者原生Ajax与json的交互，那我就稍微写写我开发过程中使用jQuery获取json后使用zy_tmpl生成下拉菜单的实例吧。
layout: post
slug: appcan-jquery-zy_tmpl-php
title: AppCan使用jQuery与zy_tmpl生成下拉菜单(PHP)
wordpress_id: 3633
categories:
- AppCan
tags:
- jQuery
- PHP
---
{% include JB/setup %}

第一次写关于AppCan开发的文章，有人写了关于jQuery或者原生Ajax与json的交互，那我就稍微写写我开发过程中使用jQuery获取json后使用zy_tmpl生成下拉菜单的实例吧。

PHP服务端生成json的那部分就不写那么多了，就是输入一个数组$res,然后

```
echo $_GET['jsoncallback'] . "(" . json_encode($res) . ")";
```

在AppCan的模版中，先加入一个下拉菜单，我的菜单是：

```
<!--下拉列表开始-->
<div class=" ui-has-label">
	<label  class="ui-select ">选择楼群：</label>
	<div class="ui-select">
		<div  class="ui-btn ui-btn-icon-right ui-btn-corner-all ui-btn-b">
			<span class="ui-btn-inner ui-btn-corner-all" >
				<span class="ui-btn-text">楼名</span>
				<div class="ui-li-link-alt ui-btn ui-btn-corner-right ui-shadow">
				<span class="ui-icon ui-icon-arrow-d ui-icon-shadow"></span>
				</div>
			</span>
			<select name="lc" id="lc" selectedIndex="0" id="select-choice-0" onchange="zy_slectmenu(this.id)">
				数据加载中，请稍候
			</select>
		</div>
	</div>
</div>
<!--下拉列表结束-->
```

然后在<script></script>中加入：

```
function getlq(){
	$.getJSON('http://localhost/json.php?jsoncallback=?', function(data) {
		var tmpl='<option value="${BuildingId}">${BuildingName}</option>';
		$("#lc").html("");
		$("#lc").append(zy_tmpl(tmpl,data,zy_tmpl_count(data)));
	})
}
```

这样在onload或者onchange、onclick时执行getlq();就能实现select的更新。
