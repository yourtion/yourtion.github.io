---
author: Yourtion
comments: true
date: 2010-03-27 05:48:29+00:00
excerpt: 之前一个动易的SiteWeaver老是上传图片出现问题···在网上找了一下··那些方法都不是很详细~自己总结一下··写了个详细的版本
layout: post
slug: powereasy-upload-image-error-solution
title: 解决动易中批量上传图片出现错误的方法
wordpress_id: 946
categories:
- 网站建设
tags:
- 服务器
---
{% include JB/setup %}

之前一个动易的SiteWeaver老是上传图片出现问题···在网上找了一下··那些方法都不是很详细~自己总结一下··写了个详细的版本~~把里面一些问题补全了··

### 一、问题：出现类似下面的提示

```Request``` 对象 错误 ```'asp 0104 ：80004005'```

不允许的操作

```D:\sw\../Include/PowerEasy.Upfile.asp, 行57```

更改win2003的IIS 6.0对asp的上传文件大小为200k限制，aspx的上传程序没有影响。

在IIS6.0中，默认设置是特别严格和安全的，最大只能传送 204,800 个字节，这样可以最大限度地减少因以前太宽松的超时和限制而造成的攻击。

IIS 6 出于安全考虑, 默认最大请求是200K（也即最大提交数据限额为200KByte，204800Byte）。（在 IIS 6.0 之前的版本中无此限制）

解决方案：

1、先打开Internet 信息[服务]（IIS）管理器
（本地计算机 ）→属性→允许直接编辑配置数据库(N)

![]({{ IMAGE_PATH }}2010/03/zrclip_001p5ea97150.png)

（图1） 【一定要勾先"允许直接编辑配置数据库(N)"】

2、然后在[服务]里关闭iis admin service服务

3、找到```windows\system32\inesrv```下的```metabase.xml```,
用计事本打开，找到```ASPMaxRequestEntityAllowed``` 把他修改为需要的值，默认为204800，即200K
把它修改为1024000（1M）

4、然后重启iis admin service服务

5、重新启动网站

### 二、问题：出现类似下面的提示

Internet Explorer不能连接到您请求的网页。此页可能暂时不可用。

解决方法: 图片太大导致asp页面脚本超时，请选择网速较好的时间上传，或者用ftp上传图片，或者联系服务器管理员修改iis里面asp页面脚本超时时间。

### 三、问题：出现下面的提示

错误类型：

```ADODB.Stream (0x800A0BBC)```

写入文件失败。

```/sw/Include/PowerEasy.Upfile.asp, 第 399 行```

解决方法：查找```PowerEasy.Upfile.asp```331行左右代码

```For i = 0 To Files.Count - 1```

在下面加入

```On Error Resume Next```

上传的问题基本就这么多··总的来说·· SiteWeaver是ASP里面很强的一个东西··
