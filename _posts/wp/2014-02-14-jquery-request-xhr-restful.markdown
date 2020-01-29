---
author: Yourtion
comments: true
date: 2014-02-14 11:05:57+00:00
layout: post
slug: jquery-request-xhr-restful
title: jQuery跨域请求RESTful
wordpress_id: 3970
categories:
- HTML
tags:
- JavaScript
- jQuery
---
{% include JB/setup %}

今天下午有个朋友问起关于用jQuery实现百度BCS的```RESTful```请求，一直提示“```Success```”但是执行不成功，所以研究了一下jQuery的跨域，写了个Demo，希望能帮助到需要的童鞋~~

因为请求在百度云，所以需要添加跨域，不然会提示拒绝跨域。

```javascript
$.ajax({
	url: "http://bcs.duapp.com/testjsjs/%2Ftwister.txt?sign=MBO:FB414a1be43c6585a6357c4b373b8dab:vrgj4sxtv264xnyQziodKAMTfMo%3D",
	type: "DELETE",
	beforeSend: function (xhr) {
		xhr.overrideMimeType("text/plain; charset=x-user-defined");
	}
})
.done(function (data) {
	if (console && console.log) {
		console.log("Sample of data:", data);
	}
});
```

结果如下图：

[![jquery-bcs-restful]({{ IMAGE_PATH }}2014/02/jquery-bcs-restful.jpg)]({{ IMAGE_PATH }}2014/02/jquery-bcs-restful.jpg)


