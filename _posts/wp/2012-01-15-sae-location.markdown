---
author: Yourtion
comments: true
date: 2012-01-15 08:37:54+00:00
excerpt: SAE地理信息服务（SAE Location）是SAE为开发者提供给的免费获取地理信息服务。可以查询自驾车路线、公交车路线、根据关键词查询公交线路、根据关键词查询公交站点、根据IP地址返回地理信息坐标
layout: post
slug: sae-location
title: SAE推出地理信息服务——SAE Location
wordpress_id: 3547
categories:
- 新浪SAE
---
{% include JB/setup %}

SAE地理信息服务（SAE Location）是SAE为开发者提供给的免费获取地理信息服务。使用```LocationFree```，开发者可以很方便的实现以下功能：

* 根据起点与终点查询自驾车路线
* 根据起点与终点查询公交车路线
* 根据关键词查询公交线路
* 根据关键词查询公交站点
* 根据IP地址返回地理信息坐标


特别注意：地理信息服务部分调用要求参数为关联数组形式，请注意键值的正确选择。

### 应用场景

免费地理信息服务为用户提供免费的地理信息基础数据，可用于需要地理信息服务的地方。

### 使用指南

目前提供以下的函数支持：

```php
 void __construct ()
 array getDriveRoute ($post) //根据起点与终点查询自驾车路线
 array getBusRoute ($post) //根据起点与终点查询公交车路线
 array getBusLine ($post) //根据关键词查询公交线路
 array getBusStation ($post) //根据关键词查询公交站点
 array getIpToGeo ($post) //根据IP地址返回地理信息坐标
```

### 错误码参考：

* errno: 0 成功
* errno: -1 不合法参数
* errno: -2 错误的参数输入（为空）
* errno: -3 接口内部错误
* errno: -4 其他错误
* errno: 607 服务未初始化

### 服务限制与配额

**请求数限制为60 次/分钟**
