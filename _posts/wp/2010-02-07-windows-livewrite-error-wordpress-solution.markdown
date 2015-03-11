---
author: Yourtion
comments: true
date: 2010-02-07 00:49:00+00:00
layout: post
slug: windows-livewrite-error-wordpress-solution
title: 关于WordPress用WindowsLiveWrite出错解决方法
wordpress_id: 503
categories:
- WordPress技术
tags:
- Windows live writer
- WordPress
- 出错
---
{% include JB/setup %}

之前写过一篇日志关于[用Windows live writer离线发布Wordpress日志](/?p=338)。一开始使用很正常，有一天突然发现我的类别更新不了，他会提示：从日志服务器接收的对 wp.getCategories 方法的响应无效:的问题。如下图：




[![image]({{ IMAGE_PATH }}image_thumb8.png)]({{ IMAGE_PATH }}image8.png)




让我一直摸不清头脑，不知道到底是那里出了问题。经过多天的研究和Goolge之后都没有很详细的解答。突然有一天看到一篇关于后台增加分类后就无法更新的问题。我根据他的方法去把我增加的分类删除之后还是一样出现那个错误。




偶然看到很多Blog都在说：“尝试连接到您的日志时出错:服务器响应无效 – 从日志服务器接收的对 blogger.getUsersBlogs 方法的响应无效:Invalid response document returned from XmlRpc server必须先纠正此错误才能继续操作。”这个错误，好像跟我的有几分相似。都是说wordpress返回的的XmlRpc无法被wlw识别。可具体是那个部分不对却没给提示。




他们说这是因为wordpress本身的一个bug。在utf-8编码下，xml-rpc返回的格式不正确，缺了三个字节，所以wlw就会提示出错。解决的方法是找到博客目录的wp-includes下的class.ixr.php，然后用一个文本编辑工具打开它，查找：




$length = strlen($xml);




替换为：




$length = strlen($xml)+3;




我按照这个方法修改之后就真的没问题了··看来这个Bug影响不小啊。




总结一下解决方法：




1 首先先禁用刚刚启用的插件。




2 然后更换主题，或者直接用回原主题。




3 把原版的xmlrpc.php替换上去试一下。




4 如果是提示服务器错误405：




则到后台撰写里启用远程发布里的xmlrpc即可：




[![image]({{ IMAGE_PATH }}image_thumb9.png)]({{ IMAGE_PATH }}image9.png)




[![image]({{ IMAGE_PATH }}image_thumb10.png)]({{ IMAGE_PATH }}image10.png)




5 尝试连接到您的日志时出错:服务器响应无效 – 从日志服务器接收的对 blogger.getUsersBlogs 方法的响应无效:Invalid response document returned from XmlRpc server必须先纠正此错误才能继续操作–的错误提示按照上面的方法解决！




这篇文章就是用wlw写的然后发布的~




基本上就是这样啦··希望这篇文章对你有帮助！！



