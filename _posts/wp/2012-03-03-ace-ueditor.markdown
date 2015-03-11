---
author: Yourtion
comments: true
date: 2012-03-03 13:21:08+00:00
excerpt: 最近在研究阿里云的应用托管即ACE，同时在做公司的ISNC-CMS，感觉Ueditor很不错，就想到把Ueditor放到ACE上面，因为ACE是在一个分布式的环境中，存储与本地不利于平台按处理访问能力决定的服务器自动扩张和回收，也就是不支持文件的上传直接写入，因此ACE提供了storage服务，所以Ueditor的图片上传要通过storage来实现
layout: post
slug: ace-ueditor
title: 阿里云ACE中使用Ueditor——支持图片上传
wordpress_id: 3613
categories:
- 阿里云ACE
tags:
- Ueditor
- 阿里云ACE
---
{% include JB/setup %}

最近在研究阿里云的应用托管即ACE，同时在做公司的ISNC-CMS，感觉Ueditor很不错，就想到把Ueditor放到ACE上面，因为ACE是在一个分布式的环境中，存储与本地不利于平台按处理访问能力决定的服务器自动扩张和回收，也就是不支持文件的上传直接写入，因此ACE提供了storage服务，所以Ueditor的图片上传要通过storage来实现，方法很简单。

首先将下载的Ueditor解压并用FTP上传到阿里云ACE的ueditor目录。

修改”server\upload\php“里的up.php，把：

```
 //保存图片
    if($state == "SUCCESS"){
        $tmp_file=$_FILES["picdata"]["name"];
        $file = $path.rand(1,10000).time().strrchr($tmp_file,'.');
        $result = move_uploaded_file($_FILES["picdata"]["tmp_name"],$file);
        if(!$result){
            $state = "图片保存失败！";
        }
    }
    //向浏览器返回数据json数据
    $file= str_replace('../','',$file);  //为方便理解，替换掉所有类似../和./等相对路径标识
    echo "{'url':'".$file."','title':'".$title."','state':'".$state."'}";
```

修改为：

```
    //保存图片
    if($state == "SUCCESS"){
        $tmp_file=$_FILES["picdata"]["name"];
        $file = rand(1,10000).time().strrchr($tmp_file,'.');
	if(file_exists($_FILES["picdata"]["tmp_name"])){ 
		$storage = new CEStorage(); 
		$file_url = $storage->upload($_FILES["picdata"]["tmp_name"],$file);;
  	// $file_url will be XXX.aliapp.com/aliyun_ce_storage/title.jpg
		}
    }
	$file_url= str_replace('aliyun_ce_storage/','',$file_url);
    //向浏览器返回数据json数据
    echo "{'url':'".$file_url."','title':'".$title."','state':'".$state."'}";
```

修改”editor_config.js“，将：

```
var tmp = window.location.pathname,
        URL= tmp.substr(0,tmp.lastIndexOf("\/")+1).replace("_examples/","");//这里你可以配置成ueditor目录在您网站的相对路径或者绝对路径（指以http开头的绝对路径）
    UEDITOR_CONFIG = {
        imagePath:URL + "server/upload/", //图片文件夹所在的路径，用于显示时修正后台返回的图片url！具体图片保存路径需要在后台设置。！important
        compressSide:0, //等比压缩的基准，确定maxImageSideLength参数的参照对象。0为按照最长边，1为按照宽度，2为按照高度
        maxImageSideLength:900, //上传图片最大允许的边长，超过会自动等比缩放,不缩放就设置一个比较大的值
        relativePath:true,      //是否开启相对路径。开启状态下所有本地图片的路径都将以相对路径形式进行保存.强烈建议开启！
        UEDITOR_HOME_URL:URL, //为editor添加一个全局路径
```

修改为：

```
var tmp = window.location.pathname,
        URL= tmp.substr(0,tmp.lastIndexOf("\/")+1).replace("/ueditor/","");//这里你可以配置成ueditor目录在您网站的相对路径或者绝对路径（指以http开头的绝对路径）
    UEDITOR_CONFIG = {
        imagePath:URL + "/aliyun_ce_storage/", //图片文件夹所在的路径，用于显示时修正后台返回的图片url！具体图片保存路径需要在后台设置。！important
        compressSide:0, //等比压缩的基准，确定maxImageSideLength参数的参照对象。0为按照最长边，1为按照宽度，2为按照高度
        maxImageSideLength:900, //上传图片最大允许的边长，超过会自动等比缩放,不缩放就设置一个比较大的值
        relativePath:false,      //是否开启相对路径。开启状态下所有本地图片的路径都将以相对路径形式进行保存.强烈建议开启！
        UEDITOR_HOME_URL:URL, //为editor添加一个全局路径
```

这样就大功告成了。

演示地址：[http://yourtion.aliyun.com/ueritor/](http://yourtion.aliyun.com/ueritor/)
