---
author: Yourtion
comments: true
date: 2010-08-10 03:26:00+00:00
excerpt: 最近因为团队博客的最新动态要调用到主站上面，但是主站页面因为SEO等原因做成静态页面~所以就要找一个js调用的方法~没想到WordPress真的有哦~那就是ECall~~
layout: post
slug: external-call-ecall-wordpress
title: WordPress外部调用–Ecall
wordpress_id: 1424
categories:
- WordPress插件
tags:
- WordPress
- 插件
---
{% include JB/setup %}

最近因为团队博客的最新动态要调用到主站上面，但是主站页面因为SEO等原因做成静态页面~所以就要找一个js调用的方法~没想到WordPress真的有哦~那就是ECall~~

**Ecall插件介绍：**

Ecall是External Call的缩写, 即外部调用。

Ecall是我们WPC团队完成的第一个正式插件，也已经被wordpress官方收录。

Ecall的作用简单的说就是，自动生成一段JS代码，把它放到任何网站上，即可显示出wordpress的文章列表。

**Ecall下载地址：**

[ecall.2.5.01.zip](http://www.dbank.com/download.action?t=40&k=NDc0OTU1ODM=&pcode=LCwxMjAzODksMTIwMzg5&rnd=4)      

[](http://wordpress.org/extend/plugins/ecall)  

[http://wordpress.org/extend/plugins/ecall](http://wordpress.org/extend/plugins/ecall)

**Ecall主要特点：**

* 自由定制模版      
* 缓存加速       
* 隐藏分类       
* 授权机制，防止恶意调用       
* 文章的js调用方式       
* 遵循WordPress插件开发规范

**Ecall使用说明：**

安装并启用插件之后，你可以在后台设置里看到﻿Ecall setting的标签，进入后即可对Ecall进行配置。

 

在配置页面你将看到类似这样的代码：

```html
<script type='text/javascript' src='http://blog.j0753.com/index.php?key=9bd4cb46a739cd86fbfdf76e83a44297&cid=0&rows=6'></script>
```

* http://blog.j0753.com :代表博客域名
* key: 代表插件生成的授权密钥（在插件配置页面可获得）
* cid: 代表分类的id（可选，如果没有cid即代表所有的分类）
* rows: 代表显示的数据条数（可选，默认10条）

插件配置如下，很简单，只要把生成的代码拷贝到你要调用的地方就OK了~

[![image]({{ IMAGE_PATH }}2010/08/image16.png)]({{ IMAGE_PATH }}2010/08/image17.png)
