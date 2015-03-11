---
author: Yourtion
comments: true
date: 2011-03-24 00:04:02+00:00
excerpt: '最近在弄Wordpress的sina登陆··但是在登陆之后老是会出现：

  Catchable fatal error:Object of class WP_Error could not be converted to string
  in formatting.php on line 2818研究了很久终于找到解决方法。'
layout: post
slug: catchable-fatal-error-solution
title: Catchable fatal error:Object of class * could not be converted to string解决方法
wordpress_id: 1979
categories:
- WordPress技术
tags:
- WordPress
- 解决问题
---
{% include JB/setup %}

最近在弄Wordpress的sina登陆··但是在登陆之后老是会出现：


<blockquote>Catchable fatal error:Object of class WP_Error could not be converted to string in formatting.php on line 2818</blockquote>


研究了很久终于找到解决方法。

这是由于 object转换成 string 時才会发生这个严重错误(fatal error)。

若要解决这个问题，只要你將原本类定义的地方加上 __toString() 方法即可。例如，我发生错误的是WP_Error的类位于/wp-includes/class-wp-error.php。便在类定义一开始加入：

```
function __toString()
{
    return "";
}
```

问题解决···大家遇到相应问题可以举一反三···共同进步哦···
