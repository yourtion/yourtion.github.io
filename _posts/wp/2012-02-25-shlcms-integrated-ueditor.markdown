---
author: Yourtion
comments: true
date: 2012-02-25 16:31:42+00:00
excerpt: 最近看到百度出了Uedit编辑器，感觉还不错，所以想把它集成到深喉咙里面，研究了一番，终于搞定了，现在将方法和大家共享，有需要的同学可以举一反三老做一下，刚刚弄好可能不是非常完美，大家有什么意见建议也欢迎提出，互相学习。
layout: post
slug: shlcms-integrated-ueditor
title: SHLCMS(深喉咙CMS)集成Ueditor教程
wordpress_id: 3603
categories:
- PHP
tags:
- SHLCMS
- Ueditor
---
{% include JB/setup %}

最近看到百度出了Uedit编辑器，感觉还不错，所以想把它集成到深喉咙里面，研究了一番，终于搞定了，现在将方法和大家共享，有需要的同学可以举一反三老做一下，刚刚弄好可能不是非常完美，大家有什么意见建议也欢迎提出，互相学习。

首先下载```Ueditor```并解压到```shl```根目录下，命名为```ueditor```。

之后将```admini\views\system\options```下的```index.php```中的：

```php
$editor_arr = array('kindeditor'=>'KindEditor','fckeditor'=>'FCKeditor');
```

改为：

```php
$editor_arr = array('kindeditor'=>'KindEditor','fckeditor'=>'FCKeditor','ueditor'=>'Ueditor');
```

这样在“构建网站”下的“系统设置”里的“编辑器类型：”就有了“Ueditor”的选项。

然后修改inc目录下的common.php，在

```php
case 'fckeditor':
        $oFCKeditor = new FCKeditor($name) ;
	$oFCKeditor->Value = $content;
	$oFCKeditor->Create() ;
break;
```

插入以下代码：

```php
case 'ueditor':
    echo '<script type="text/javascript" charset="utf-8" src="'.ROOTPATH.'/ueditor/editor_config.js"></script>';
    echo '<script type="text/javascript" src="'.ROOTPATH.'/ueditor/editor_all.js"></script>';
    echo '<link rel="stylesheet" href="'.ROOTPATH.'/ueditor/themes/default/ueditor.css"/>';
    echo '<textarea id="'.$name.'" name="'.$name.'" cols="100" rows="8" style="width:95%;height:400px;">'.$content.'</textarea>';
    echo '<script type="text/javascript">';
    echo '    var editor = new baidu.editor.ui.Editor();';
    echo '    editor.render("'.$name.'");';
    echo '</script>';
break;
```

这样编辑器的嵌入就完成了，但是你会发现上传图片这些都打不开，所以接下来修改Uedito目录下的editor_config.js，将：

```php
//var URL = window.UEDITOR_HOME_URL || '../';
    var tmp = window.location.pathname,
        URL= tmp.substr(0,tmp.lastIndexOf("\/")+1).replace("_examples/","");//这里你可以配置成ueditor目录在您网站的相对路径或者绝对路径（指以http开头的绝对路径）
    UEDITOR_CONFIG = {
        imagePath:URL + "server/upload/", //图片文件夹所在的路径，用于显示时修正后台返回的图片url！具体图片保存路径需要在后台设置。！important
```

改为：

```php
 //var URL = window.UEDITOR_HOME_URL || '../';
    var tmp = window.location.pathname,
    URL = tmp.substr(0, tmp.lastIndexOf("\/") + 1).replace("admini/", "ueditor/");//这里你可以配置成ueditor目录在您网站的相对路径或者绝对路径（指以http开头的绝对路径）
    UEDITOR_CONFIG = {
        imagePath:URL.replace("ueditor/", ""), //图片文件夹所在的路径，用于显示时修正后台返回的图片url！具体图片保存路径需要在后台设置。！important
```

这样上传图片视频等的按键打开就正常了，最后是修改图片上传模块，将ueditor\server\upload\php下的up.php复制到ueditor根目录下，并将

```php
$config = array(
        "uploadPath"=>"../uploadfiles/",                          //保存路径
        "fileType"=>array(".gif",".png",".jpg",".jpeg",".bmp"),   //文件允许格式
        "fileSize"=>1000                                          //文件大小限制，单位KB
    );
```

改为：

```php
  $config = array(
        "uploadPath"=>'../upload/',                          //保存路径
        "fileType"=>array(".gif",".png",".jpg",".jpeg",".bmp"),   //文件允许格式
        "fileSize"=>1000                                          //文件大小限制，单位KB
    );
```

这样就大功告成了。


