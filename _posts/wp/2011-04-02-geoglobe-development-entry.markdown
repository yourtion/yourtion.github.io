---
author: Yourtion
comments: true
date: 2011-04-02 02:38:03+00:00
excerpt: 现在我们以一个最简单的示例来帮助您快速对GeoGlobe二维地图API开发有一个全面的了解，并且有一个直观感性的认识。下面的代码是在一个普通的HTML页面里加入一个以嘉应学院为中心点的640*480像素大小的卫星地图。
layout: post
slug: geoglobe-development-entry
title: 天地图GeoGlobe开发入门
wordpress_id: 1988
categories:
- 天地图二次开发
tags:
- 天地图
---
{% include JB/setup %}

现在我们以一个最简单的示例来帮助您快速对GeoGlobe二维地图API开发有一个全面的了解，并且有一个直观感性的认识。

下面的代码是在一个普通的HTML页面里加入一个以嘉应学院为中心点的640*480像素大小的卫星地图。

```html
<!DOCTYPE html "-//W3C//DTD XHTML 1.0 Strict//EN"
 "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
    <title>天地图GeoGlobe开发入门DEMO</title>
    <script src="http://www.tianditu.com/guide/lib/GeoSurfJSAPI.js"
            type="text/javascript"></script>
    <script src="http://www.tianditu.com/guide/2d_samples/sampleCfg.js"
            type="text/javascript"></script>
    <script type="text/javascript">
	   function initialize() {
	     var map = new GeoSurf.PortalMap("frist_map");
	     map.loadLayerGroup(imageGroup);
	     map.setCenter(new GeoSurf.LonLat(116.12371, 24.33058), 14);
	   }
    </script>
  </head>
  <body onload="initialize()" align=center>
  <h1 style="marging:0 auto">天地图GeoGlobe开发入门DEMO---Yourtion.com</h1>
    <div id="frist_map" style="width: 640px; height: 480px ; marging:0 auto"></div>
  </body>
</html>
```

您查看此示例的实际效果：[点击这里看Demo](http://demo.yourtion.com/GeoGlobe/)

接下来我们分析一下上面的代码，通过几个方面实现地图的调用：
下面来介绍此示例中需要注意的地方：
	
  1. 使用 ```script``` 标签包含 ```GeoGlobe```二维地图API。
  2. 创建名为“```frist_map```”的 ```div``` 元素来包含地图。
  3. 编写 ```JavaScript``` 函数创建“```map```”对象。
  4. 将地图的中心设置为指定的地理点。
  5. 从 ```body``` 标签的 ```onLoad``` 事件初始化地图对象。


**加载 GeoGlobe二维地图API**

```html
<script src="http://www.tianditu.com/guide/lib/GeoSurfJSAPI.js" type="text/javascript"></script>
```

http://www.tianditu.com/guide/lib/GeoSurfJSAPI.js 网址指向包含使用 GeoSurf 地图 API 所需定义的 JavaScript 文件的位置。

**创建地图容器**

```html
<div id="frist_map" style="width: 640px; height: 480px"></div>
```

要让地图在网页上显示，必须为其指定一个位置。通常，我们通过创建名为 ```div``` 的元素并在浏览器的文档对象模型 (DOM) 中获取此元素的引用执行此操作。

在上述示例中，我们定义名为“```frist_map```”的 ```div```，并使用CSS样式属性设置其尺寸。

**创建地图对象**

```javascript
var map = new GeoSurf.PortalMap("frist_map");
```

```GeoSurf.map``` 类是表示地图的 JavaScript 类。此类的对象在页面上定义单个地图。（可以创建此类的多个实例，每个对象将在页面上定义一个不同的地图。）我们使用 JavaScript ```new``` 操作符创建此类的一个新实例。

当创建新的地图实例时，在页面中指定一个 DOM 节点（通常是 div 元素）作为地图的容器。HTML 节点是 JavaScript ```document``` 对象的子对象，而且我们通过传入该子对象的id值来获得该元素的引用。

**设置地图中心点和缩放级别**

```javascript
map.setCenter(new GeoSurf.LonLat(116.12371, 24.33058), 14);
```

默认情况下，地图中心点为经纬度地理坐标（0，0）。现在我们需要调用地图对象的```setCenter```方法定位到北京的地理位置和相应缩放级别，以便得到一个恰当的显示效果。

经过以上步骤，您就可以得到一个具备基本功能的电子地图了。在这个地图中，您可以对地图进行放大、缩小、平移等常见操作，点击这里可以体验实际效果。
