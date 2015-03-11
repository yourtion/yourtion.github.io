---
author: Yourtion
comments: true
date: 2011-04-11 11:49:41+00:00
excerpt: 前面我们已经介绍了如何在天地图中添加地图标记Marker，详见《天地图GeoGlobe创建地图标记Marker》，现在我们在地图标记的基础上添加Popup弹出框，弹出地图标记的相应信息。这次还是以刚落成的“活活艺术教育中心”为例，弹出“活活艺术教育中心”落成剪彩的现场图片。
layout: post
slug: geoglobe-add-popup-box
title: 天地图GeoGlobe添加Popup弹出框
wordpress_id: 2014
categories:
- 天地图二次开发
tags:
- 天地图
---
{% include JB/setup %}

前面我们已经介绍了如何在天地图中添加地图标记Marker，详见[《天地图GeoGlobe创建地图标记Marker》](/geoglobe-map-marker.html)，现在我们在地图标记的基础上添加Popup弹出框，弹出地图标记的相应信息。这次还是以刚落成的“活活艺术教育中心”为例，弹出“活活艺术教育中心”落成剪彩的现场图片。

实现过程是先通过```marker.events.register```在```Marker```上创建一个```mousedown```事件，然后实例化```GeoSurf.Popup```，最后在图层上```addPopup```。

源代码如下：

```html
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>天地图GeoGlobe添加Popup弹出框 DEMO</title>
<script language="javascript" src="http://www.tianditu.com/guide/lib/GeoSurfJSAPI.js"></script>
<script language="javascript" src="http://www.tianditu.com/guide/2d_samples/sampleCfg.js"></script>
<script language="javascript">
var map;
window.onload=function()
{
	var map = new GeoSurf.PortalMap("mark_map");
	map.loadLayerGroup(imageGroup);
	map.setCenter(new GeoSurf.LonLat(116.12294, 24.33260), 14); 

	var Layer = new GeoSurf.Layer.Markers("MarkerLayer");//创建基础层
	map.addLayer(Layer);//增加图层，用地图的实例化对象来实现
	var Icon = new GeoSurf.Icon("http://demo.yourtion.com/GeoGlobe/marker_huohuo.png",new GeoSurf.Size(100,34),new GeoSurf.Pixel(-10,-34));//图标
	var lonlat = new GeoSurf.LonLat(116.12236,24.33489);//经纬度
	var Marker_HuoHuo = new GeoSurf.Marker(lonlat,Icon);//构造Marker
	Layer.addMarker(Marker_HuoHuo);//增加标签

	marker.events.register("mousedown",Marker_HuoHuo, function(){ //在Marker上添加mousedown事件
      var contentHTML ="<img src=\"popup_HuoHuo.jpg\" \\>";//popup显示的内容
      var Popup_HuoHuo = new GeoSurf.Popup("HuoHuo",lonlat,new GeoSurf.Size(330,220),contentHTML,true);//实例化Popup
      map.addPopup(Popup_HuoHuo);//添加Popup弹出
	});
}
</script>
</head>
<body>
<h1 style="marging:0 auto">天地图GeoGlobe添加Popup弹出框 DEMO---Yourtion.com</h1>
<div id="mark_map" style="width: 640px; height: 480px ; marging:0 auto"></div>
</body>
</html>
```

您查看此示例的实际效果：[点击这里看Demo](http://demo.yourtion.com/GeoGlobe/popup.php)

其中。```GeoSurf.Size(330,220)```就是弹出框的大小，

关于Popup的详细功能和设置将会在后面的文章陆续介绍····


