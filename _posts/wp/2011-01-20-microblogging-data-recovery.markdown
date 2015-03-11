---
author: Yourtion
comments: true
date: 2011-01-20 09:50:14+00:00
excerpt: pagecookery微博数据恢复记
layout: post
slug: microblogging-data-recovery
title: 微博数据恢复记
wordpress_id: 1788
categories:
- PageCookery
tags:
- MySql
- PageCookery
---
{% include JB/setup %}

前段时间因为误操作，导致整个服务器上的数据全部丢失，博客因为数据库定时备份，所以恢复起来有些问题，但是还是有数据可以恢复的。

最大的问题是微博的所有数据库都没备份，巧妇难为无米之炊啊！！！所以一直没有动。那天灵机一动想起我的PageCookery是自动同步到嘀咕的，遂决定从嘀咕入手，恢复数据。

首先去opencolud把我所有的嘀咕导出成文章发到博客大巴，然后进行第二步：

[![]({{ IMAGE_PATH }}2011/01/1-150x150.jpg)]({{ IMAGE_PATH }}2011/01/1.jpg)[![]({{ IMAGE_PATH }}2011/01/2-150x150.jpg)]({{ IMAGE_PATH }}2011/01/2.jpg)[![]({{ IMAGE_PATH }}2011/01/3-150x150.jpg)]({{ IMAGE_PATH }}2011/01/3.jpg)

然后把导出来的数据黏贴到记事本进行初步的整理，再导入到Excel中进行SQL的批量生成，然后发现有时区问题造成的时间差，又研究了好一些SQL的解决方案，最后写出了SQL。


[![]({{ IMAGE_PATH }}2011/01/4-560x360.jpg)]({{ IMAGE_PATH }}2011/01/4.jpg)


然后进入数据库导入数据。因为嘀咕的数据只有微博内容没有回复什么的，最后也就只能新建个谓语叫“之前说”，至此，微博内容数据恢复完成，YourtionSay回来了。欢迎继续支持http://t.yourtion.com


[![]({{ IMAGE_PATH }}2011/01/6-560x430.jpg)]({{ IMAGE_PATH }}2011/01/6.jpg)
