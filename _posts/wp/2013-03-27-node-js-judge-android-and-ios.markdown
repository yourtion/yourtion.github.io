---
author: Yourtion
comments: true
date: 2013-03-27 07:06:54+00:00
excerpt: 最近在做微信公众账号相关的一些东西，然后遇到对用户浏览器判断的问题，因为想在服务器端得到相应的结果并返回不同的URL，所以就写了使用node.js判断Android与iOS浏览器的function，和大家共享。
layout: post
slug: node-js-judge-android-and-ios
title: Node.js判断Android与iOS浏览器
wordpress_id: 3762
categories:
- Node.js
tags:
- Android
- iOS
- Node.js
- 浏览器
---
{% include JB/setup %}

最近在做微信公众账号相关的一些东西，然后遇到对用户浏览器判断的问题，因为想在服务器端得到相应的结果并返回不同的URL，所以就写了使用node.js判断Android与iOS浏览器的function，和大家共享。

function brows()还有使用代码如下：

```
var http = require('http');
function brows($agent){//移动终端浏览器版本信息
    return {
        ios: !!$agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: $agent.indexOf('Android') > -1 || $agent.indexOf('Linux') > -1, //android终端或者uc浏览器
        iPhone: $agent.indexOf('iPhone') > -1 || $agent.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
        iPad: $agent.indexOf('iPad') > -1, //是否iPad
    }
}
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    $a=brows(req.headers['user-agent']);
    console.log($a);
    $url="";
    if ($a.iPad)//当ipad终端时
    {$url = 'http://blog.yourtion.com/ipad';}
    else if ($a.iPhone)//当iphone终端时
    {$url = 'http://blog.yourtion.com/ios/'; }
    else if ($a.ios)//当ios终端时
    {$url = 'http://blog.yourtion.com/ios/'; }
    else if ($a.android) //当Android终端时
    {$url = 'http://blog.yourtion.com/android/';}
    else//否则
     $url = 'http://blog.yourtion.com/wap/';
    res.end($url);
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
```

事实上方法也很简单，就是将request.headers['user-agent']字段传入进行判断就OK了。
