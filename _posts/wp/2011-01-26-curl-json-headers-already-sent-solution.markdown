---
author: Yourtion
comments: true
date: 2011-01-26 00:50:43+00:00
excerpt: 所以应该是curl后返回值输出引起的，仔细研读phpmanual之后，发现curl有一个变量是CURLOPT_RETURNTRANSFER，作用是将curl_exec()获取的信息以文件流的形式返回，而不是直接输出。灵机一动想到江curl输出储存到变量然后不输出就不会引起headers
  already sent。
layout: post
slug: curl-json-headers-already-sent-solution
title: 关于curl json返回值导致headers already sent的新解决
wordpress_id: 1811
categories:
- PHP
tags:
- PHP
- 解决问题
---
{% include JB/setup %}

今天心血来潮研究新浪跟微博通的API发布，用的是Curl+json数据。但是数据虽然可以正常地到达微博通还有新浪，但是发布页面会出现：

Warning: Cannot modify header information - headers already sent by (output started at /home/jcom/public_html/yourtion/t/index.php:418

研究了很久，很多人说只要把curl_setopt($ch,CURLOPT_HEADER,false)就行了。

但是改了之后一样会出现headers already sent的问题。

所以应该是curl后返回值输出引起的，仔细研读phpmanual之后，发现curl有一个变量是CURLOPT_RETURNTRANSFER，作用是将curl_exec()获取的信息以文件流的形式返回，而不是直接输出。

灵机一动想到江curl输出储存到变量然后不输出就不会引起headers already sent。

问题最终解决。顺便分享一下"Cannot modify header information"的解决方法：
1. Blank lines (空白行):检查有<?php ... ?> 后面没有空白行，特别是include或者require的文件。不少问题是这些空白行导致的。

2. Use exit statement (用exit来解决):Use exit after header statement seems to help some people在header后加上exit();

```
header ("Location: xxx");
exit();
```

3. PHP has this annoying problem, if your HTML goes before any PHP code or any header modification before redirecting to certain page, it'll said "Warning: Cannot modify header information - headers already sent by ...." Basically anytime you output to browser, the header is set and cannot be modified.  So two ways to get around the problem:
3a. Use Javascript (用Javascript来解决):

```
<? echo "<script> self.location(\"file.php\");</script>"; ?>

```

Since it's a script, it won't modify the header until execution of Javascript.可以用Javascript来代替header。

但是上面的这段代码我没有执行成功... 另外需要注意，采用这种方法需要浏览器支持Javascript.

3b. Use output buffering (用输出缓存来解决):

```
<?php ob_start(); ?>
... HTML codes ...
<?php
... PHP codes ...
header ("Location: ....");
ob_end_flush();
?>
```

This will save the output buffer on server and not output to browser yet, which means you can modify the header all you want until the ob_end_flush() statement.  This method is cleaner than the Javascript since Javascript method assumes the browser has Javascript turn on.  However, there are overhead to store output buffer on server before output, but with modern hardware I would imagine it won't be that big of deal.  Javascript solution would be better if you know for sure your user has Javascript turn on on their browser.

就像上面的代码那样，这种方法在生成页面的时候缓存，这样就允许在输出head之后再输出header了。

4.set output_buffering = On in php.ini (开启php.ini中的output_buffering )set output_buffering = On will enable output buffering for all files. But this method may slow down your php output. The performance of this method depends on which Web server you're working with, and what kind of scripts you're using.

这种方法和3b的方法理论上是一样的。但是这种方法开启了所有php程序的输出缓存，这样做可能影响php执行效率，这取决于服务器的性能和代码的复杂度。
