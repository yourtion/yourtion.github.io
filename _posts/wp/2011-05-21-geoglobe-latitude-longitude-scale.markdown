---
author: Yourtion
comments: true
date: 2011-05-21 08:57:37+00:00
excerpt: 之前已经介绍了《天地图GeoGlobe添加Popup弹出框》和《天地图GeoGlobe创建地图标记Marker》，现在介绍一下在矢量地图上加上当前鼠标经纬度和当前地图比例尺的控件
layout: post
slug: geoglobe-latitude-longitude-scale
title: 天地图GeoGlobe添加经纬度-比例尺
wordpress_id: 2136
categories:
- 天地图二次开发
tags:
- GeoGlobe
- 天地图
---
{% include JB/setup %}

之前已经介绍了[《天地图GeoGlobe添加Popup弹出框》](/geoglobe-add-popup-box.html)和[《天地图GeoGlobe创建地图标记Marker》](/geoglobe-map-marker.html)，现在介绍一下在矢量地图上加上当前鼠标经纬度和当前地图比例尺的控件。

通过实例化```Control```下的```MousePosition()```、```Scale```和```ScaleLine```，然后添加到地图或者DIV中实现。

代码如下：

```html
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
<script src="http://www.tianditu.com/guide/lib/GeoSurfJSAPI.js" type="text/javascript"></script>
    <script src="http://www.tianditu.com/guide/2d_samples/sampleCfg.js" type="text/javascript"></script>
    <script type="text/javascript">
	   function initialize() {
	     var map = new GeoSurf.PortalMap("frist_map");
	     map.loadLayerGroup(vectorGroup);
	     map.setCenter(new GeoSurf.LonLat(116.12371, 24.33058), 14);
		//Control
	    var mousePositionCtrl = new GeoSurf.Control.MousePosition();//初始化鼠标定位的控件
		map.addControl(mousePositionCtrl);
        var Scale=new GeoSurf.Control.Scale("sc");//在id为sc的DIV上显示一个小的比例尺指示器
        map.addControl(Scale);
        var ScaleLine=new GeoSurf.Control.ScaleLine;//显示小的线指示器用来表示当前地图的比例尺
         map.addControl(ScaleLine);
}
    </script>
  </head>
  <body onload="initialize()" align=center>
    <div id="frist_map" style="width: 640px; height: 480px ; marging:0 auto"></div>
    <div id="sc"></div>
  </body>
</html>
```

[![]({{ IMAGE_PATH }}2011/05/GeoGlobe_Control.jpg)]({{ IMAGE_PATH }}2011/05/GeoGlobe_Control.jpg)

您查看此示例的实际效果：[点击这里看Demo](http://demo.yourtion.com/GeoGlobe/control_1.php)


