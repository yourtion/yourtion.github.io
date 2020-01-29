---
author: Yourtion
comments: true
date: 2010-08-26 05:02:51+00:00
excerpt: 最近在做Showbox的站点，21showbox.com。因为首页效果之前是用ImageFlow，所以研究了很久都没办法将ImageFlow的点击效果。然后又换了另外一个放大效果，但是在页面上表现不好，最后就决定用LihghtBox效果。但是当我满心欢喜地将代码集成到页面里面的时候就发现LightBox没用了···很快我就想到是JS的兼容问题，当我去掉原来jquery.min的时候，LightBox效果就正常了。原来的代码如下：
layout: post
slug: jquery-co-exist-with-lightbox
title: jquery.min跟lightbox共存
wordpress_id: 1498
category: "HTML"
tags: ["JQuery"]
---
{% include JB/setup %}

最近在做Showbox的站点，21showbox.com。因为首页效果之前是用ImageFlow，所以研究了很久都没办法将ImageFlow的点击效果。然后又换了另外一个放大效果，但是在页面上表现不好，最后就决定用LihghtBox效果。

但是当我满心欢喜地将代码集成到页面里面的时候就发现LightBox没用了···

很快我就想到是JS的兼容问题，当我去掉原来jquery.min的时候，LightBox效果就正常了。原来的代码如下：

```javascript
<script type="text/javascript" src="jquery.min.js"></script>
<script language="javascript">
$(document).ready(function() {
	/*	2nd example	*/
	$("#menu2 li a").wrapInner( '<span></span>' );

	$("#menu2 li a").each(function() {
		$( '<span>' + $(this).text() + '</span>').appendTo(this);
	});

	$("#menu2 li a").hover(function() {
		$(".out",	this).stop().animate({'top':'45px'},200); // move down - hide
		$(".over",this).stop().animate({'top':'0px'},	200); // move down - show
	}, function() {
		$(".out",	this).stop().animate({'top':'0px'},	200); // move up - show
		$(".over",this).stop().animate({'top':'-45px'},200); // move up - hide
	});
});
</script>
```


LightBox要加入的代码：

```html
<script type="text/javascript" src="js/prototype.js"></script>
<script type="text/javascript" src="js/scriptaculous.js?load=effects,builder"></script>
<script type="text/javascript" src="js/lightbox.js"></script>
```


然后根据jquery的多库共存机制，他的应用代码是：

```javascript
jQuery.noConflict();
(function($) {
	$(function() {
	// 使用 $ 作为 jQuery 别名的代码
	});
})(jQuery);
// 其他用 $ 作为别名的库的代码</blockquote>
```

所以整合之后的代码就变成：

```javascript
<script type="text/javascript" src="jquery.min.js"></script>
<script type="text/javascript" src="js/prototype.js"></script>
<script type="text/javascript" src="js/scriptaculous.js?load=effects,builder"></script>
<script type="text/javascript" src="js/lightbox.js"></script>
<script language="javascript">
jQuery.noConflict();
(function($) {
	$(function() {
		$(document).ready(function() {
		/*	2nd example	*/
			$("#menu2 li a").wrapInner( '<span></span>' );

			$("#menu2 li a").each(function() {
				$( '<span>' + $(this).text() + '</span>').appendTo(this);
			});

			$("#menu2 li a").hover(function() {
				$(".out",	this).stop().animate({'top':'45px'},200); // move down - hide
				$(".over",this).stop().animate({'top':'0px'},	200); // move down - show
			}, function() {
				$(".out",	this).stop().animate({'top':'0px'},	200); // move up - show
				$(".over",this).stop().animate({'top':'-45px'},200); // move up - hide
			});
		});
	});
})(jQuery);
</script>
```

这样主页的导航jquery和LightBox就完美地共存了··
