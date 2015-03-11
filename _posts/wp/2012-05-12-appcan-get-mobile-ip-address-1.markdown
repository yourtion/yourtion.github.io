---
author: Yourtion
comments: true
date: 2012-05-12 12:23:43+00:00
excerpt: 刚刚在论坛有开发者在问到关于获取手机客户端地址的问题，我想到之前发过一个《IP在线查询位置及转换存储》的文章，那个是基于PHP和新浪API的，现在网上搜索到的关于获取IP地址那个腾讯的API已经不能用了，我又找了一下，先分享，还有一些关于效率和Ajax请求的下一回再写吧。
layout: post
slug: appcan-get-mobile-ip-address-1
title: AppCan获取手机客户端的IP地址(1)
wordpress_id: 3664
categories:
- AppCan
---
{% include JB/setup %}

刚刚在论坛有开发者在问到关于获取手机客户端地址的问题，我想到之前发过一个[《IP在线查询位置及转换存储》](http://blog.yourtion.com/the-ip-address-areas-and-converter.html)的文章，那个是基于PHP和新浪API的，现在网上搜索到的关于获取IP地址那个腾讯的API已经不能用了，我又找了一下，先分享，还有一些关于效率和Ajax请求的下一回再写吧。

解决方案有两个，先讲简单的使用API接口的形式吧。

方法一（API调用），使用新浪和搜狐的API：

在你要获取地址的APP的页面中加入：

```
<script type="text/javascript" src="http://counter.sina.com.cn/ip" charset="gb2312"></script>
<script type="text/javascript" src="http://pv.sohu.com/cityjson?ie=utf-8"></script>
<script type="text/javascript">
//var ILData = new Array("125.77.19.138","中国", "福建省", "福州市", "电信"); if (typeof(ILData_callback) != "undefined") { ILData_callback(); }  //新浪返回数据，可加IP ?ip=139.256.0.9
//var returnCitySN = {"cip": "125.77.19.138", "cid": "350100", "cname": "福建省福州市"};  //不可加IP，可设置编码
document.write("(数组)新浪IP地址查询：" + ILData.join(",") + "<br/>");
document.write("(json)搜狐IP地址查询：" + returnCitySN.cip + "," + returnCitySN.cid + "," + returnCitySN.cname + "<br/>");
</script>
```

我把两个API写到一起。大家按需调用吧，由于没做Ajax，在真机GPRS时候可能由于速度慢导致失败，下次写个Ajax的版本。

第二种方法就在自己做服务器程序，直接返回$_SERVER["HTTP_CLIENT_IP"] （PHP），其他的也差不多。

还是建议使用API，顺便可以解析地址
