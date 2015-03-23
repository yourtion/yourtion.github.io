---
author: Yourtion
comments: true
date: 2011-05-26 01:45:26+00:00
excerpt: 今天我们讲一下添加单击事件的代码，通过单击事件可以触发你想要做的发生的function。这个代码比较简单，通过添加events.register。然后加入function就OK。
layout: post
slug: geoglobe-add-click-event
title: 天地图GeoGlobe添加单击事件
wordpress_id: 2146
categories:
- 天地图二次开发
tags:
- GeoGlobe
- 天地图
---
{% include JB/setup %}

之前写了不少关于天地图的教程，现在天地图的发展还在初步，需要大家多多的努力和支持，感谢“oОО砯崖Оo”开的QQ群：127651254。有兴趣的朋友可以加进来一起讨论天地图开发。

今天我们讲一下添加单击事件的代码，通过单击事件可以触发你想要做的发生的```function```。这个代码比较简单，通过添加```events.register```。然后加入```function```就OK。

代码如下：

```html
<!DOCTYPE html "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
    <script src="http://www.tianditu.com/guide/lib/GeoSurfJSAPI.js" type="text/javascript"></script>
    <script src="http://www.tianditu.com/guide/2d_samples/sampleCfg.js" type="text/javascript"></script>
    <script type="text/javascript">
	window.onload=function(){
	     var map = new GeoSurf.PortalMap("frist_map");
	     map.loadLayerGroup(imageGroup);
	     map.setCenter(new GeoSurf.LonLat(116.12371, 24.33058), 14);
		 //触发鼠标单击事件
  	     map.events.register("click", map,
			function (){
				alert("你干嘛点我？？");//事件动作Functin内容
			});
	}
    </script>
  </head>
<body align="center">
    <div id="frist_map" style="width: 640px; height: 480px ; marging:0 auto"></div>
</body>
</html>
```

您查看此示例的实际效果：[点击这里看Demo](http://demo.yourtion.com/GeoGlobe/click.php)
