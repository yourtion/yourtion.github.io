---
author: Yourtion
comments: true
date: 2013-09-22 14:19:45+00:00
excerpt: 最近在做一个项目需要一个生成二维码的接口，但是使用第三方的接口经常不稳定，突然想到百度BAE有相关二维码的接口，研究了一下，很简单，顺便整了一下BAE的Cache也就是Memcache的东西。分享之~
layout: post
slug: bae-qrcode-api-cache
title: 利用BAE实现二维码生成API
wordpress_id: 3905
categories:
- 百度BAE
tags:
- API
- BAE
---
{% include JB/setup %}

最近在做一个项目需要一个生成二维码的接口，但是使用第三方的接口经常不稳定，突然想到百度BAE有相关二维码的接口，研究了一下，很简单，顺便整了一下BAE的```Cache```也就是```Memcache```的东西。分享之~

最简单的实现：

```php
<?php
require_once('BaeImageService.class.php');
$text = $_GET['url']; 
$baeImageService = new BaeImageService();
$params = array();
$params[BaeImageConstant::QRCODE_SIZE] = 10;
$params[BaeImageConstant::QRCODE_LEVEL] = 3;
$params[BaeImageConstant::QRCODE_FOREGROUND] = '000000';
$retVal = $baeImageService->applyQRCode($text, $params);
if($retVal !==false && isset($retVal['response_params']) && isset($retVal['response_params']['image_data'])){
	header("Content-type:image/jpg");
	$imageSrc = base64_decode($retVal['response_params']['image_data']);
	echo $imageSrc;
}else{
	echo 'qr encoding failed, error:' . $baeImageService->errmsg() . "\n";
}
?>
```

然后是加了```Memcache```的版本，必须先在应用里面添加```cache```才有效：

[![cache]({{ IMAGE_PATH }}2013/09/cache.jpg)]({{ IMAGE_PATH }}2013/09/cache.jpg)



然后使用以下带缓存的代码，也非常简单：

```php
<?php
require_once('BaeImageService.class.php');
require_once ('BaeMemcache.class.php');
$text=$_GET['url']; 
$key=md5($text);
$baeImageService = new BaeImageService();
$params = array();
$params[BaeImageConstant::QRCODE_SIZE] = 6;
$params[BaeImageConstant::QRCODE_LEVEL] = 3;
$params[BaeImageConstant::QRCODE_FOREGROUND] = '000000';
$mem = new BaeMemcache();
$img=$mem->get($key);
if($img!=""){
  	header("Content-type:image/jpg");
  	echo base64_decode($img);
}else{
	$retVal = $baeImageService->applyQRCode($text, $params);
	if($retVal !==false && isset($retVal['response_params']) && isset($retVal['response_params']['image_data'])){
      	header("Content-type:image/jpg");
      	$imgs=$retVal['response_params']['image_data'];
		$imageSrc = base64_decode($imgs);
      	$mem->set($key,$imgs);
      	echo $imageSrc;
	}else{
		echo 'qr encoding failed, error:' . $baeImageService->errmsg() . "\n";
    }
}
?>
```

使用方法很简单，就是你创建的php文件后加上```?url=http://morechou.com```就可以了。
