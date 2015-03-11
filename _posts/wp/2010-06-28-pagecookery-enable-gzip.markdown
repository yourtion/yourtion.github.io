---
author: Yourtion
comments: true
date: 2010-06-28 07:14:03+00:00
excerpt: 总是觉得我的PageCookery微博：http://t.yourtion.com不是很快~想到WordPress可以通过启用GZip压缩加速~于是研究一下GZip的压缩~终于成功了和大家分享~
layout: post
slug: pagecookery-enable-gzip
title: PageCookery启用GZip压缩的方法
wordpress_id: 1253
categories:
- PageCookery
tags:
- PageCookery
- PHP
---
{% include JB/setup %}

总是觉得我的PageCookery微博：http://t.yourtion.com不是很快~想到WordPress可以通过启用GZip压缩加速~于是研究一下GZip的压缩~终于成功了和大家分享~

首先介绍一下GZip：


<blockquote>GZIP最早由Jean-loup Gailly和Mark Adler创建，用于UNIX系统的文件压缩。我们在Linux中经常会用到后缀为.gz的文件，它们就是GZIP格式的。现今已经成为Internet 上使用非常普遍的一种数据压缩格式，或者说一种文件格式。HTTP协议上的GZIP编码是一种用来改进WEB应用程序性能的技术。大流量的WEB站点常常使用GZIP压缩技术来让用户感受更快的速度。这一般是指WWW服务器中安装的一个功能,当有人来访问这个服务器中的网站时,服务器中的这个功能就将网页内容压缩后传输到来访的电脑浏览器中显示出来.一般对纯文本内容可压缩到原大小的40％.这样传输就快了,效果就是你点击网址后会很快的显示出来.当然这也会增加服务器的负载. 一般服务器中都安装有这个功能模块的.</blockquote>


一般启用GZip的方法有在服务器上通过更改PHP.ini还有些.htaccess文件~但是我的服务器都不行~于是另辟他径~找了关于PHP的GZip函数~最后成功~

首先在/lib/class_template.php中找到

```
$template = '<?php $current = \'' . $this->current . '\'; ?>' . $this->GetHTML();
```

这一段~改成：

```
$template = '<?php $current = \'' . $this->current . '\'; if(Extension_Loaded(\'zlib\')) Ob_Start(\'ob_gzhandler\'); Header("Content-type:text/html");?>' . $this->GetHTML();
```

然后在/template/footer.html最下方添加：

```
<?PHP
if(Extension_Loaded('zlib')) Ob_End_Flush();
?>
```

然后保存上传后去站长工具那检测就能看到：


<blockquote>网址 [http://t.yourtion.com](http://tool.chinaz.com/Redirect.aspx?url=http://t.yourtion.com) 检测结果如下:   是否压缩 **是** 压缩类型 **gzip** 原始文件大小 **36060 字节** 压缩后文件大小 **5892 字节** 压缩率（估计值） **83.66%**** **</blockquote>
