---
author: Yourtion
comments: true
date: 2010-07-05 03:56:36+00:00
excerpt: 我们知道谷歌有一套独有的PR系统来判定一个站点的优劣与排名（WordPress是很适合Google的程序，相对其他的程序，PR值提升的略快一点），虽然不一定准确，但经过众多SEOER的研究发现当我们发表的文章中含有一个指向低PR值网站的链接的时候，对我们自己站点的PR还是有影响的。
layout: post
slug: use-url-redirects-low-pr
title: 运用网址重定向，减少低PR站点对自己站点的影响
wordpress_id: 1274
categories:
- SEO
- WordPress技术
tags:
- SEO
- WordPress
---
{% include JB/setup %}

来自：http://www.ifunkey.com/1898.html

我们知道谷歌有一套独有的PR系统来判定一个站点的优劣与排名（WordPress是很适合Google的程序，相对其他的程序，PR值提升的略快一点），虽然不一定准确，但经过众多SEOER的研究发现当我们发表的文章中含有一个指向低PR值网站的链接的时候，对我们自己站点的PR还是有影响的。

我们可以用重定向来解决这个问题，这样可以让你文章中的外链不会影响到自己的站点在搜索引擎中的权重。

首先创建一个文本文档，保存为“re_link.php”，当然，你可以用你喜欢的文件名来替换“re_link”，在这“re_link.php”中拷贝下面的内容进去


<blockquote><?php
// Change to the URL you want to redirect to
$R_URL=$_GET['url'];
echo $R_URL;
header(”Location: $R_URL”);
?></blockquote>


保存后上传到你的站点根目录中，这样当我们在建立一个指向比如”http://www.oxoxox.com”这个链接的时候这样写“http://www.yoursite.com/redirect_url.php?url=http://www.oxoxox.com”就万无一失了。

如果打打开链接后，看到一个关于header的warning，检查两个地方来搞定这个问题：

1. 看看你的“re_link.php“文件的php起止符(也就是)前后是否有空格和空行。如果有，删除它们。

2. 打开主机根目录下的php.ini文件，确保: “output_buffering = on” 或者 “output_buffering = n” n为4096或其他接近的数字。

发现如果后面要转向的地址也是带有?的地址，会出现错误，所以，避免该死的问号
