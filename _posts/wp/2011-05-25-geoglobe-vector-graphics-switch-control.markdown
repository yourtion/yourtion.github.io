---
author: Yourtion
comments: true
date: 2011-05-25 01:27:28+00:00
excerpt: 跟上一次一样，还是很简单的。通过实例化GeoSurf.Control.LayerSwitcher，然加图层开关。然后添加矢量图层，然后在VLayer图层创建编辑工具栏EditingToolbar就可以了···
layout: post
slug: geoglobe-vector-graphics-switch-control
title: 天地图GeoGlobe矢量绘图-图层开关控件
wordpress_id: 2150
categories:
- 天地图二次开发
tags:
- 天地图
---
{% include JB/setup %}

之前介绍了[《天地图GeoGlobe添加经纬度-比例尺》](http://blog.yourtion.com/?p=2136)，现在继续介绍空间的功能，这次添加矢量绘图空间和图层开关。对地图的应该还是不错的，看看接下来能不能在此基础上做空间分析。

跟上一次一样，还是很简单的。通过实例化GeoSurf.Control.LayerSwitcher，然加图层开关。然后添加矢量图层，然后在VLayer图层创建编辑工具栏EditingToolbar就可以了···

代码如下：

```
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
    <script src="http://www.tianditu.com/guide/lib/GeoSurfJSAPI.js"
            type="text/javascript"></script>
    <script src="http://www.tianditu.com/guide/2d_samples/sampleCfg.js"
            type="text/javascript"></script>
    <script type="text/javascript">
	window.onload=function(){
	     var map = new GeoSurf.PortalMap("frist_map");
	     map.loadLayerGroup(imageGroup);
	     map.setCenter(new GeoSurf.LonLat(116.12371, 24.33058), 14); 

		 var VLayer = new GeoSurf.Layer.Vector("VLayer");//实例化一个Vector矢量图层VLayer
         map.addLayers([VLayer]);//在地图上添加VLayer
		 var EditingToolbar=new GeoSurf.Control.EditingToolbar(VLayer);//在VLayer图层创建编辑工具栏EditingToolbar
         map.addControl(EditingToolbar);

		 var LayerSwitcher=new GeoSurf.Control.LayerSwitcher;//实例化图层开关控件LayerSwitcher
         map.addControl(LayerSwitcher);
	}
    </script>
  </head>
  <body>
    <div id="frist_map" style="width: 640px; height: 480px ; marging:0 auto"></div>
  </body>
</html>
```

[![]({{ IMAGE_PATH }}2011/05/tc-560x420.jpg)]({{ IMAGE_PATH }}2011/05/tc.jpg)
查看此示例的实际效果：[点击这里看Demo](http://demo.yourtion.com/GeoGlobe/control_2.php)
