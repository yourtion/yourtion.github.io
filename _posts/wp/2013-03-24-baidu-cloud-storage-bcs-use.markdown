---
author: Yourtion
comments: true
date: 2013-03-24 12:45:33+00:00
excerpt: 最近使用百度的云平台BAE做了一些小东西，主要用来给微信公众平台提供API数据接口服务，因为涉及到一部分数据采集，需要将采集的数据保存起来以便以后可以进行数据分析，所以使用了百度的云存储也就是BCS，简单的使用一些功能
layout: post
slug: baidu-cloud-storage-bcs-use
title: 小试百度云存储BCS
wordpress_id: 3751
categories:
- 云服务
tags:
- 百度云
---
{% include JB/setup %}

最近使用百度的云平台BAE做了一些小东西，主要用来给微信公众平台提供API数据接口服务，因为涉及到一部分数据采集，需要将采集的数据保存起来以便以后可以进行数据分析，所以使用了百度的云存储也就是BCS，简单的使用一些功能，也就和大家分享一下，希望对大家有帮助。

首先当然是注册开发者账号之类的，这里就略过了，然后再云存储中我建立一个叫“```aqidata```”的```buncket```，再在“```服务管理```”-“```我的密钥```”中创建一个密钥对，最后在BAE中加入```BCS```的```PHP-SDK```，就可以使用以下代码将```curl```的结果存储到BCS上：

```php
require_once 'bcs.class.php';
require_once "BaeLog.class.php";
$logger=BaeLog::getInstance();
$host = 'bcs.duapp.com';
$ak = "Your Access Key";
$sk = "Your Secure Key";
$bucket = 'aqidata';
$tmp=sys_get_temp_dir();
$filepath= date("Ymd");
$filetime= date("H");
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "http://xxx.com/1.json");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_HEADER, 0);
$output = curl_exec($ch);
file_put_contents($tmp."/".$filepath.$filetime.'.json',$output);
curl_close($ch);
$file=$tmp."/".$filepath.$filetime.'.json';
$filename="/".$filepath."/".$filetime.'.json';
$baiduBCS = new BaiduBCS ( $ak, $sk );
$response = $baiduBCS->create_object ( $bucket,$filename , $file );
```

事实上调用非常简单，就是使用new ```BaiduBCS```创建一个对象并使用```create_object```将你的对象保存到BCS上，保存结果如下图：

[![BCS-result]({{ IMAGE_PATH }}2013/03/BCS-result-560x473.jpg)]({{ IMAGE_PATH }}2013/03/BCS-result.jpg)
