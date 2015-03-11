---
author: Yourtion
comments: true
date: 2011-04-03 04:46:53+00:00
excerpt: 现在我们要在地图上添加地图标记，也就是Marker，用来标记出我们刚落成的“活活艺术教育中心”的位置所在。
layout: post
slug: geoglobe-map-marker
title: 天地图GeoGlobe创建地图标记Marker
wordpress_id: 1992
categories:
- 天地图二次开发
tags:
- GeoGlobe
- GIS
- 天地图
---
{% include JB/setup %}

上一次我们已经在[《天地图GeoGlobe开发入门》](http://blog.yourtion.com/?p=1988)中利用GeoGlobe二维地图API创建了一个map对象，在div中显示出以嘉应学院为中心点的640*480像素大小的卫星地图，现在我们要在地图上添加地图标记，也就是Marker，用来标记出我们刚落成的“活活艺术教育中心”的位置所在。

实现也是比较简单的，我们通过实例化GeoSurf.LonLat和GeoSurf.Icon两个类，再在地图上创建一个特殊的层叫做GeoSurf.Layer最后实例化GeoSurf.Marker，最终创建一个地图标记Marker（GeoGlobe地标）。

源代码如下：

```
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>天地图GeoGlobe创建地图标记Marker DEMO</title>
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
}
</script>
</head>

<body>
<div id="mark_map" style="width: 640px; height: 480px ; marging:0 auto"></div>
</body>
</html>
```

您查看此示例的实际效果：[点击这里看Demo](http://demo.yourtion.com/GeoGlobe/marker.php)

其中我使用的Marker图标是PS过的，加上了文字，你可以使用没有PS的Marker：[![地图Marker](http://demo.yourtion.com/GeoGlobe/marker.png)](http://demo.yourtion.com/GeoGlobe/marker.png)

基本来说，上面的代码注释已经比较清楚，我也就不细讲，应该可以看懂得啦~
