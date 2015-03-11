---
author: Yourtion
comments: true
date: 2011-01-21 12:36:44+00:00
excerpt: 最近在研究PageCookery的快速发布，解决手机没有Cookies的问题。在谓语调用部分要历遍数据库读取的二维数组。一开始打算用foreach来历遍，但是发现没有成功，oo不过关，没办法oo写······研究后决定用for循环，演示代码如下：
layout: post
slug: calendar-two-dimensional-array-php
title: PHP历遍二维数组
wordpress_id: 1802
categories:
- PHP
tags:
- PHP
---
{% include JB/setup %}

最近在研究PageCookery的快速发布，解决手机没有```Cookies```的问题。在谓语调用部分要历遍数据库读取的二维数组。

一开始打算用```foreach```来历遍，但是发现没有成功，oo不过关，没办法oo写······

研究后决定用```for```循环，演示代码如下：

```php
<?php  
  $blog=array(  
    array(  
     "titledata"=>"titleMM",  
     "bodydata"=>"bodyMM"  
       ),  
    array(  
     "titledata"=>"titleGG",  
     "bodydata"=>"bodyGG"  
        )  
     );  
  //出错  
  foreach($blog as $b)  
   {  
    $b['titledata']="BB";  
    $b['bodydata']="CC";  
   }  
   print_r($blog);  
   //正确  
   for($i=0;$i<count($blog);$i++)  
     {  
       $blog[$i]['titledata']="title";  
       $blog[$i]['bodydata']="body";  
     }  
?>
```

