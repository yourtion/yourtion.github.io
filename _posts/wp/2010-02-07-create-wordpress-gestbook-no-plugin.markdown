---
author: Yourtion
comments: true
date: 2010-02-07 09:30:20+00:00
layout: post
slug: create-wordpress-gestbook-no-plugin
title: 无插件创建WordPress留言板
wordpress_id: 527
categories:
- WordPress技术
tags:
- WordPress
- 留言板
---
{% include JB/setup %}

首先把主题目录下的single.php复制一份，改名为guestbook.php; comments.php文件复制并改名为guestcomments.php;
然后打开guestbook.php文件,在

`< ?php get_header();?>
```


这段代码下面,添加以下代码:
`< ?php
/*
Template Name: GuestBook
*/
?>
```


并修改
`< ?php comments_template();?>
```

为
`< ?php comments_template('/guestcomments.php');?>
```


最后保存文件.

添加一个页面,页面模板选guestbook.php,保存。留言板就建成了。

最后按照你的风格和习惯修改留言板的内容和风格，把guestbook.php和guestcomments.php的内容修改好，例如：
让最新留言显示在顶部，把guestcomments.php中：
`foreach ($comments as $comment)
```

替换成
`foreach (array_reverse($comments) as $comment)
```

还有就是把所有“xxx条评论”改成“xxx条留言“把“发布评论”按钮的提示改成“发布留言“等等细节修改。
让它更加适合留言板的风格。

你的留言板就建成了。[我的留言板](/?page_id=341)
