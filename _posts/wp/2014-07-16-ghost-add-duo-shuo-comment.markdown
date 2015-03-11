---
author: Yourtion
comments: true
date: 2014-07-16 08:26:23+00:00
excerpt: 最近整了一个Ghost博客玩了一下：http://view.yourtion.com，在其中集成多说的评论，参考了一些文章，都不是很详细，所以就把我自己集成的过程分享之~
layout: post
slug: ghost-add-duo-shuo-comment
title: Ghost添加多说评论
wordpress_id: 4017
categories:
- Node.js
tags:
- Ghost
---
{% include JB/setup %}

最近整了一个Ghost博客玩了一下：[http://view.yourtion.com](http://view.yourtion.com)，在其中集成多说的评论，参考了一些文章，都不是很详细，所以就把我自己集成的过程分享之~

我的Ghost使用的是[https://github.com/sethlilly/Vapor](https://github.com/sethlilly/Vapor) 的主题，其他的主题修改也差不多。

首先是多说的注册和设置站点，这里就不多讲，进入通用代码页面（如下图）

[![Duoshuo-code]({{ IMAGE_PATH }}2014/07/Duoshuo-code.jpg)]({{ IMAGE_PATH }}2014/07/Duoshuo-code.jpg)


在模板的“```default.hbs```”的</body>之前添加多说的js代码部分（即```<script type="text/javascript"></script>```包含部分）[https://github.com/yourtion/Vapor/blob/yourtion/default.hbs](https://github.com/yourtion/Vapor/blob/yourtion/default.hbs)

然后在“```page.hbs```”和“```post.hbs```”的“\{\{/post}}”标签之前添加多说的评论DIV，这个已经针对Ghost修改：

```html
{% raw %}
<div class="ds-thread" data-thread-key="\{\{id}}" data-title="\{\{title}}" data-url="\{\{url absolute="true"}}"></div>
{% endraw %}
```

参考：[https://github.com/yourtion/Vapor/blob/yourtion/post.hbs](https://github.com/yourtion/Vapor/blob/yourtion/post.hbs)

至此集成就完成了，详细效果可以看：[http://view.yourtion.com](http://view.yourtion.com) 

主题的源码已经托管在GitHub：[https://github.com/yourtion/Vapor/tree/yourtion](https://github.com/yourtion/Vapor/tree/yourtion)


