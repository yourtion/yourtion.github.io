---
author: Yourtion
comments: true
date: 2012-01-21 07:52:57+00:00
excerpt: 百度地图地点搜索和鼠标点击地点获取经纬度，这些都是地图比较基本和实用的代码，其中还包括了根据用户IP进行地图的显示、改变地图上的鼠标样式、启用滚轮缩放
layout: post
slug: baidu-maps-search-get-lonlat
title: 百度地图API地点搜索-获取经纬度
wordpress_id: 3565
category: "HTML"
tags: ["百度地图"]
---
{% include JB/setup %}

最近在做公司的自主项目，本来打算使用原来使用的天地图开发，但是考虑到天地图的文档不是非常完善，而且自己的Javascript也不是很扎实，最终决定使用百度地图进行开发，因为他的文档和实例相对比较详细，而且API也相对比较成熟，所以···接下来会慢慢分享自己开发过程遇到的问题和解决方法代码等，希望对大家有帮助~共同学习一同进步。

第一次就先分享一下地图上的地点搜索和鼠标点击获取地点经纬度，这些都是地图比较基本和实用的代码，其中还包括了根据用户IP进行地图的显示、改变地图上的鼠标样式、启用滚轮缩放等，算是半入门吧，其他的一些可以自己参考百度的地图API。

[![]({{ IMAGE_PATH }}2012/01/baidutitu-soushuo-jingweiduhuoqu.jpg)]({{ IMAGE_PATH }}2012/01/baidutitu-soushuo-jingweiduhuoqu.jpg)

核心的代码如下：

```javascript
var map = new BMap.Map("container");//在指定的容器内创建地图实例
map.setDefaultCursor("crosshair");//设置地图默认的鼠标指针样式
map.enableScrollWheelZoom();//启用滚轮放大缩小，默认禁用。
map.centerAndZoom(new BMap.Point(116.124878, 24.309178), 13);
map.addControl(new BMap.NavigationControl()); 
map.addEventListener("click", function(e){//地图单击事件
	document.getElementById("lonlat").value = e.point.lng + ", " + e.point.lat;
});
function iploac(result){//根据IP设置地图中心
    var cityName = result.name;
    map.setCenter(cityName);
}
var myCity = new BMap.LocalCity();
myCity.get(iploac);
function sear(result){//地图搜索
	var local = new BMap.LocalSearch(map, {
  		renderOptions:{map: map}
	});
	local.search(result);
}
```

### 实例请点击：


[http://demo.yourtion.com/BaiduMap/mapSearch_getLonlet.html](http://demo.yourtion.com/BaiduMap/mapSearch_getLonlet.html)

### 源码：

[https://github.com/yourtion/BlogCodes/blob/master/baidu-maps-search-get-lonlat.html](https://github.com/yourtion/BlogCodes/blob/master/baidu-maps-search-get-lonlat.html)


