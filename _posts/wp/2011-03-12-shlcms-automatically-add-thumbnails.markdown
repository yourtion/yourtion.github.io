---
author: Yourtion
comments: true
date: 2011-03-12 22:17:15+00:00
excerpt: SHLCMS的Flash展示很不错，但是不能自动将新闻或者想要的栏目里的文章自动展示，研究了一番，参考Sobin之前做的东西，利用正则表达式实现发布自动添加Flash展示，修改文章自动修改，删除文章自动删除。
layout: post
slug: shlcms-automatically-add-thumbnails
title: SHLCMS添加文章自动增加缩略图到Flash
wordpress_id: 1951
categories:
- SHLCMS
tags:
- PHP
- 深喉咙CMS
---
{% include JB/setup %}

SHLCMS的Flash展示很不错，但是不能自动将新闻或者想要的栏目里的文章自动展示，研究了一番，参考Sobin之前做的东西，利用正则表达式实现发布自动添加Flash展示，修改文章自动修改，删除文章自动删除。

共享一下···············

修改SHLCMS的\admini\controllers\list.php

在function create()的redirect_to($request['p'],'index');之前加入以下代码：

```
/* 新增图片 - Yourtion - http://blog.Yourtion.com */
		$title=$request['title'];
		$content=$request['content'];
		if($request['p']==40){
		$r =$list->insert_id;
		$n = "/zzrs/?p=40&a=view&r=".$r;
		$pattern="/<img.*?src=[\\\'| \\\"](.*?(?:[\.gif|\.jpg]))[\\\'|\\\"].*?[\/]?>/";
        $match_times=preg_match_all($pattern,$content,$match);
        if($match_times>0){
          $pic = $match[1][0];
		  $pic = '/'.substr($pic,2);
		  $sql="INSERT ".TB_PREFIX."flash (id,title,summary,picpath,group_id,url) VALUES ('{$r}','{$title}','{$title}','{$pic}',1,'{$n}')";
		  $db->query($sql);
		}
		}
```

在function edit()的redirect_to($request['p'],'index');之前加入以下代码：

```
		/* 修改文章图片- Yourtion - http://blog.Yourtion.com */
		$title=$request['title'];
		$content=$request['content'];
		if($request['p']==40){
		$n = "/zzrs/?p=40&a=view&r=".$r;
		$pattern="/<img.*?src=[\\\'| \\\"](.*?(?:[\.gif|\.jpg]))[\\\'|\\\"].*?[\/]?>/";
        $match_times=preg_match_all($pattern,$content,$match);
        if($match_times>0){
          $pic = $match[1][0];
		  $pic = '/'.substr($pic,2);
		  $sql='update '.TB_PREFIX.'flash set picpath="'.$pic.'",title="'.$title.'",summary="'.$title.'" where id='.$request['n'];
		  $db->query($sql);
		}
		}
```

在function destroy()的redirect_to($request['p'],'index');之前加入以下代码：

```
/*删除文章图片- Yourtion - http://blog.yourtion.com */
		  $sql='delete from '.TB_PREFIX.'flash where id='.$request['n'];
		  $db->query($sql);
		  redirect_to($request['p'],'index');
```

什么的代码中有一些硬编码，在使用的时候改成你自己的。有空重新改一下，见谅··

$request['p']==40是你要自动添加图片的频道ID；

$n = "/zzrs/?p=40&a=view&r=".$r;是你发布新闻后文章内容相对根目录的地址。

这样对list.php的更改就完成了，还有就是改一下调用代码的部分，

在SHLCMS的\xml下的dt_flash.php

将

```
$flashs=$db->get_results("select * from ".TB_PREFIX."flash where group_id=$group_id order by ordering");
```

改为

```
$flashs=$db->get_results("select * from ".TB_PREFIX."flash where group_id=$group_id order by id DESC limit 5");
```

这样就大功告成了····

希望大家多提意见建议，一同进步·······
