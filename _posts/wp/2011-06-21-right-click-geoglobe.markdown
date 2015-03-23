---
author: Yourtion
comments: true
date: 2011-06-21 00:30:48+00:00
excerpt: '之前已经介绍了《天地图GeoGlobe添加单击事件》和《天地图GeoGlobe重写双击事件》，单身你安装上述方法去定义右击事件的话，你就会一直看到浏览器弹出的右键菜单。研究了天地图官方的地图，发现它代码的实现是使用jquery的。所以按图索骥，依样画葫芦的写了个右击事件的教程，希望对你有帮助。  '
layout: post
slug: right-click-geoglobe
title: 天地图GeoGlobe创建右击事件
wordpress_id: 2189
categories:
- 天地图二次开发
tags:
- GeoGlobe
- 天地图
---
{% include JB/setup %}

之前已经介绍了[《天地图GeoGlobe添加单击事件》](/geoglobe-add-click-event)和[《天地图GeoGlobe重写双击事件》](/rewrite-double-clicke-geoglobe.html)，单身你安装上述方法去定义右击事件的话，你就会一直看到浏览器弹出的右键菜单。研究了天地图官方的地图，发现它代码的实现是使用```jquery```的。所以按图索骥，依样画葫芦的写了个右击事件的教程，希望对你有帮助。

原理还是比较简单，利用```jquery```和```jquery.contextmenu```创建地图右击事件菜单。

代码如下：

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<script  src="jquery-1.4.4.min.js"></script>
		<script src="jquery.contextmenu.r2.packed.js"></script>
		<script src="http://www.tianditu.com/guide/lib/GeoSurfJSAPI.js" type="text/javascript"></script>
		<script src="http://www.tianditu.com/guide/2d_samples/sampleCfg.js" type="text/javascript"></script>
    </head>
	<body onload="initialize()">
	<div id="frist_map" style="width: 640px; height: 480px ; marging:0 auto;z-index:100;position: absolute; display: block;"></div>
<hr />
    <!--右键菜单的源-->
    <div class="contextMenu" id="myMenu2" style="z-index:1000; position: absolute;">
        <ul>
          <li id="item_1">选项一</li>
          <li id="item_2">选项二</li>
          <li id="item_3">选项三</li>
          <li id="item_4">选项四</li>
        </ul>
   </div>
 <script type="text/javascript">
	function initialize() {
	     var map = new GeoSurf.PortalMap("frist_map");
	     map.loadLayerGroup(imageGroup);
	     map.setCenter(new GeoSurf.LonLat(116.12371, 24.33058), 14);
	}
    //所有html元素id为demo2的绑定此右键菜单
    $('#frist_map').contextMenu('myMenu2', {
      //菜单样式
      menuStyle: {
        border: '2px solid #000'
      },
      //菜单项样式
      itemStyle: {
        fontFamily : 'verdana',
        backgroundColor : 'green',
        color: 'white',
        border: 'none',
        padding: '1px'

      },
      //菜单项鼠标放在上面样式
      itemHoverStyle: {
        color: 'blue',
        backgroundColor: 'red',
        border: 'none'
      },
      //事件
      bindings:
          {
            'item_1': function(t) {
              alert('Trigger was '+t.id+'\nAction was item_1');
            },
            'item_2': function(t) {
              alert('Trigger was '+t.id+'\nAction was item_2');
            },
            'item_3': function(t) {
              alert('Trigger was '+t.id+'\nAction was item_3');
            },
            'item_4': function(t) {
              alert('Trigger was '+t.id+'\nAction was item_4');
            }
          }
    });
 </script>
	</body>
</html>
```

查看此示例的实际效果：[点击这里看Demo](http://demo.yourtion.com/GeoGlobe/rightClick.php)

