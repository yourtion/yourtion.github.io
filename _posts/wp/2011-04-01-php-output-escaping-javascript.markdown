---
author: Yourtion
comments: true
date: 2011-04-01 14:56:53+00:00
excerpt: 最近在做天地图是GIS集成··要输出HTML到JavaScript里面··涉及到代码转义什么的比较麻烦··所以写个PHP的function
layout: post
slug: php-output-escaping-javascript
title: 用PHP输出转义JavaScript代码
wordpress_id: 1983
categories:
- PHP
tags:
- JavaScript
- PHP
---
{% include JB/setup %}

最近在做天地图是GIS集成··要输出HTML到JavaScript里面··涉及到代码转义什么的比较麻烦··所以写个PHP的function

分享一下：

```php
function jsformat($str)
{
    $str = trim($str);
    $str = str_replace('\\s\\s', '\\s', $str);
    $str = str_replace(chr(10), '', $str);
    $str = str_replace(chr(13), '', $str);
    $str = str_replace('	', '', $str);
    $str = str_replace('\\', '\\\\', $str);
    $str = str_replace('"', '\\"', $str);
    $str = str_replace('\\\'', '\\\\\'', $str);
    $str = str_replace("'", "\'", $str);
    return $str;
}
```

使用就不用说了··就是直接调用```jsformat($str)```
