---
author: Yourtion
comments: true
date: 2011-06-02 04:51:56+00:00
excerpt: 之前已经介绍了《天地图GeoGlobe添加单击事件》，但是如果你依样画葫芦想定义双击事件，你就会发现并不可行，双击后依然还是放大地图，感谢“oОО砯崖Оo”的研究，重写双击事件得到解决。拿出了分享一下。
layout: post
slug: rewrite-double-clicke-geoglobe
title: 天地图GeoGlobe重写双击事件
wordpress_id: 2168
categories:
- 天地图二次开发
tags:
- GeoGlobe
- 天地图
---
{% include JB/setup %}

之前已经介绍了[《天地图GeoGlobe添加单击事件》](/geoglobe-add-click-event.html)，但是如果你依样画葫芦想定义双击事件，你就会发现并不可行，双击后依然还是放大地图，感谢“oОО砯崖Оo”的研究，重写双击事件得到解决。拿出了分享一下。

要定义双击事件就要重新定义地图导航控件，然后重新定义控件的双击方法。具体实现方法也比较麻烦，但是代码还是很简洁，很多东西在API文档没有，所以要自己理解咯···

代码如下：

```html
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <script src="http://www.tianditu.com/guide/lib/GeoSurfJSAPI.js" type="text/javascript"></script>
        <script src="http://www.tianditu.com/guide/2d_samples/sampleCfg.js" type="text/javascript"></script>
		<script type="text/javascript">
	window.onload=function()
	{
		var myNavigation = new GeoSurf.Control.Navigation();//重新定义地图导航控件
        myNavigation.defaultDblClick = function(evt){//重新定义控件的双击方法
                alert(evt.xy);
        }

        //在构造地图对象的时候，单独指定加载的控件
        var map = new GeoSurf.PortalMap("frist_map",{
            controls:[myNavigation,new GeoSurf.Control.PanZoom()  ]
        });

        map.loadLayerGroup(vectorGroup);
		var chinaBounds = new GeoSurf.Bounds(73.30,17,135.65,52.32);
		map.zoomToExtent(chinaBounds);
	}
        </script>
    </head>
	<body>
	<div id="frist_map" style="width: 640px; height: 480px ; marging:0 auto"></div>
	</body>
</html>
```

查看此示例的实际效果：[点击这里看Demo](http://demo.yourtion.com/GeoGlobe/DblClick.php)

但是重定义之后其他的鼠标事件也要重构·这些之后再讲··大家多多支持··
