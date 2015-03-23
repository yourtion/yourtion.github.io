---
author: Yourtion
comments: true
date: 2011-05-24 07:28:25+00:00
excerpt: 之前在技术群里就聊起怎么创建地图缩略图，感谢群主“oОО砯崖Оo”分享代码，现在我稍微修改注释然后和大家分享一下，事实上有一些函数我也不太明白，今天有博友问起GeoSurf.PortalMap的问题，希望这个实例对你有帮助。
layout: post
slug: geoglobe-add-thumbnail-map
title: 天地图GeoGlobe添加缩略地图
wordpress_id: 2143
categories:
- 天地图二次开发
tags:
- GeoGlobe
- 天地图
---
{% include JB/setup %}

之前在技术群里就聊起怎么创建地图缩略图，感谢群主“oОО砯崖Оo”分享代码，现在我稍微修改注释然后和大家分享一下，事实上有一些函数我也不太明白，今天有博友问起```GeoSurf.PortalMap```的问题，希望这个实例对你有帮助。

事实上天地图的开发文档说得不清不楚，只是说了```GeoSurf.Control.OverviewMap```，但是如果单纯初始化是不能显示出缩略图的，要自己用WMS初始化地图，最近再研究有没有简单的方法。

代码如下：

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>天地图GeoGlobe添加缩略地图DEMO</title>
        <script src="http://www.tianditu.com/guide/lib/GeoSurfJSAPI.js" type="text/javascript"></script>
        <script src="http://www.tianditu.com/guide/2d_samples/sampleCfg.js" type="text/javascript"></script>
		<script type="text/javascript">
		window.onload=function()
		{
		var ol_wms = new GeoSurf.Layer.WMS(//创建一个WFS图层
                    "OpenLayers WMS",//WMS服务类型
                    "http://vmap0.tiles.osgeo.org/wms/vmap0",//WMS服务地址
                    {layers: 'basic'} //设置为基础层
                );
				var oLayer1 = new GeoSurf.Layer.GlobeTile("aaaa","http://tile0.tianditu.com/services/A0512_EMap",{
					isBaseLayer:true,
					topLevel:1,
					bottomLevel:10,
					maxExtent:new GeoSurf.Bounds(-180,-90,180,90)
				});
				var oLayer2 = new GeoSurf.Layer.GlobeTile("bbbb","http://tile0.tianditu.com/services/AB0512_Anno",{					
					topLevel:1,
					bottomLevel:10,
					maxExtent:new GeoSurf.Bounds(-180,-90,180,90)
				});

            var myOverVies = new GeoSurf.Control.OverviewMap({layers:[oLayer1,oLayer2]});//定义地图鸟瞰控件

			//在构造地图对象的时候，单独指定加载的控件
            var map = new GeoSurf.PortalMap("frist_map",{
                controls:[myOverVies,new GeoSurf.Control.PanZoom()  ]
            });
            //加载地图
            map.loadLayerGroup(imageGroup);
		    var jyuBounds = new GeoSurf.Bounds(116.11,24.33,116.12,24.32);
		    map.zoomToExtent(jyuBounds);
		}
        </script>
    </head>
    <body>
    <div id="frist_map" style="width: 640px; height: 480px ; marging:0 auto"></div>
    </body>
</html>
```

[![]({{ IMAGE_PATH }}2011/05/GeoGlobeOverView.jpg)]({{ IMAGE_PATH }}2011/05/GeoGlobeOverView.jpg)

您查看此示例的实际效果：[点击这里看Demo](http://demo.yourtion.com/GeoGlobe/overView.php)

其中很多东西都是在天地图的API参考中找不到的。大家可能要去研究它本身的JS文件。对这方面感兴趣的可以加**QQ群：127651254**。一起研究


