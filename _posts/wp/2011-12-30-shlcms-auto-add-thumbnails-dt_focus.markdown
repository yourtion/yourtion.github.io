---
author: Yourtion
comments: true
date: 2011-12-30 02:18:49+00:00
excerpt: 之前已经介绍了如何让《SHLCMS添加文章自动增加缩略图到Flash》。但是之前的改造存在一个极其严重的问题，就是如果文章的图片是直接使用外链的话，那么就不能正常调用。现在SHLCMS升级到4.11。而且增加了首页的焦点图功能，最近就索性进行一个升级，解决之前的这个大问题。
layout: post
slug: shlcms-auto-add-thumbnails-dt_focus
title: SHLCMS自动增加缩略图到首页展示改造2——dt_focus版
wordpress_id: 3534
categories:
- SHLCMS
---
{% include JB/setup %}

之前已经介绍了如何让[《SHLCMS添加文章自动增加缩略图到Flash》](http://blog.yourtion.com/shlcms-automatically-add-thumbnails.html)。但是之前的改造存在一个极其严重的问题，就是如果文章的图片是直接使用外链的话，那么就不能正常调用。现在SHLCMS升级到4.11。而且增加了首页的焦点图功能，最近就索性进行一个升级，解决之前的这个大问题。

修改方法还是和以前一样，只是代码有所更改。在function create()的redirect_to($request['p'],’index’);之前加入以下代码：

```
$content = $request['content'];
if ($request['p'] == 35 || $request['p'] == 36 || $request['p'] == 37) {
    $r = $list->insert_id;
    $n = "/?p=" . $request['p'] . "&a=view&r=" . $r;
    $pattern = "/<img.*?src=[\\\'| \\\"](.*?(?:[\.gif|\.jpg]))[\\\'|\\\"].*?[\/]?>/";
    $match_times = preg_match_all($pattern, $content, $match);
    if ($match_times > 0) {
        $pic = $match[1][0];
        if (mb_substr(substr($pic, 2), 0, 3, "utf-8") == "ttp") {
            $pic = substr($pic, 1);
        } else {
            $pic = '/' . substr($pic, 2);
        }
        $sql = "INSERT " . TB_PREFIX .
            "flash (id,title,summary,picpath,group_id,url) VALUES ('{$r}','{$title}','{$title}','{$pic}',4,'{$n}')";
        $db->query($sql);
    }
}
```

在function edit()的redirect_to($request['p'],’index’);之前加入以下代码：

```
$content = $request['content'];
if ($request['p'] == 35 || $request['p'] == 36 || $request['p'] == 37) {
    $n = "/?p=" . $request['p'] . "&a=view&r=" . $r;
    $pattern = "/<img.*?src=[\\\'| \\\"](.*?(?:[\.gif|\.jpg]))[\\\'|\\\"].*?[\/]?>/";
    $match_times = preg_match_all($pattern, $content, $match);
    if ($match_times > 0) {
        $pic = $match[1][0];
        if (mb_substr(substr($pic, 2), 0, 3, "utf-8") == "ttp") {
            $pic = substr($pic, 1);
        } else {
            $pic = '/' . substr($pic, 2);
        }
        $sql = 'update ' . TB_PREFIX . 'flash set picpath="' . $pic . '",title="' . $title .
            '",summary="' . $title . '" where id=' . $request['n'];
        $db->query($sql);
    }
}
```

在function destroy()的redirect_to($request['p'],’index’);之前加入以下代码：

```
$sql='delete from '.TB_PREFIX.'flash where id='.$request['n'];
$db->query($sql);
```

$request['p']==35等就是你要自动添加图片的频道ID；而{$pic}',4,'{$n}中的“4”就是你要增加的焦点图对应的group_id
这样对list.php的更改就完成了，还有就是改一下调用代码的部分，

在SHLCMS的content\index下的focus.php

将

```
<li><a href="<?php echo $o->url?>" target="_blank"><img src="<?php echo get_root_path().$o->picpath?>" thumb="" alt="<?php echo $o->title?>" text="<?php echo $o->summary?>" /></a></li>
```

改为

```
<li><a href="<?php
if (mb_substr($o->url, 0, 4, "utf-8") == "http") {
    echo $o->url;
} else {
    echo get_root_path() . $o->url;
}
echo $o->url
?>" target="_blank"><img src="<?php
if (mb_substr($o->picpath, 0, 4, "utf-8") == "http") {
    echo $o->picpath;
} else {
    echo get_root_path() . $o->picpath;
}
?>" thumb="" alt="<?php echo $o->title ?>" text="<?php echo $o->summary ?>" width="<?php echo
$focus_group->width; ?>" height="<?php echo
$focus_group->height; ?>" /></a></li>
```

这样就大功告成了····

大家多多·测试，看看还有什么问题或者需要没有，我会继续改进的。有什么问题大家留意交流咯
