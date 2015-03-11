---
author: Yourtion
comments: true
date: 2012-05-03 15:08:41+00:00
excerpt: 最近在做一个私密聊天的客户端，顺便研究了一下在线查询IP地理位置，基于新浪IP地址信息数据库共享接口，同时研究了关于IP地址在数据库中转存为数值类型的方法，和大家进行分享，基于PHP实现，大家可以举一反三。
layout: post
slug: the-ip-address-areas-and-converter
title: IP在线查询位置及转换存储
wordpress_id: 3653
categories:
- PHP
tags:
- PHP
---
{% include JB/setup %}

最近在做一个私密聊天的客户端，顺便研究了一下在线查询IP地理位置，基于新浪IP地址信息数据库共享接口，同时研究了关于IP地址在数据库中转存为数值类型的方法，和大家进行分享，基于PHP实现，大家可以举一反三。

接口地址：http://int.dpool.sina.com.cn/iplookup/iplookup.php?ip=需要查询的ip地址

使用方法（返回Json并解析处理）：

```php
$url = "http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json&ip=".$ip;
$message = json_decode(file_get_contents($url),true);
if (!empty($message))
{
	return $message['province'].$message['city'].$message['district'].$message['isp'];
}
	else return '未知地点';
```

其中返回的各个参数可以自己删减显示，


* [ret] => 1表示正常 -1表示内网，-2表示ip地址输入有误
* [start] => 地址段起点
* [end] => 地址段终点
* [country] => 国家
* [province] => 省
* [city] => 是
* [district] =>
* [isp] =>
* [type] => 类型
* [desc] =>


关于地址的转换和存储就分享两个function

IP转整数：

```php
function iptolong($ip){
	$ip = explode('.',$ip);
	$num = $ip[0]*256*256*256 + $ip[1]*256*256 + $ip[2]*256 + $ip[3] - 256*256*256*256;
	return $num;
}
```

整数转IP：

```php
function longtoip($num){
	$ip = array();
	$ip[0] = floor($num / 256 / 256 / 256);
	$ip[1] = floor($num / 256 / 256) - $ip[0] *256;
	$ip[2] = floor($num / 256) - $ip[0]*256*256 - $ip[1]*256;
	$ip[3] = $num - $ip[0]*256*256*256 - $ip[1]*256*256 - $ip[2]*256;
	$ip[0] = $num < 0 ? (256+$ip[0]) : $ip[0];
	return implode('.',$ip);
}
```

