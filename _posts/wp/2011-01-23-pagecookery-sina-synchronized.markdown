---
author: Yourtion
comments: true
date: 2011-01-23 23:40:51+00:00
excerpt: '因为讨厌了嘀咕同步到新浪微博的时候加的是嘀咕的链接，加上最近刚好想研究一下新浪API，借此机会研究开始研究curl和json的使用。决定采用Base认证进行链接，因为比较简单可行，怎么说也是个初学者嘛！'
layout: post
slug: successful-applicants-sina-sae
title: PageCookery与新浪微博、微博通同步更新
wordpress_id: 1816
categories:
- PageCookery
tags:
- PageCookery
- PHP
---
{% include JB/setup %}

因为讨厌了嘀咕同步到新浪微博的时候加的是嘀咕的链接，加上最近刚好想研究一下新浪API，借此机会研究开始研究curl和json的使用。

看了很多文章还有研究一些插件后，决定采用Base认证进行链接，因为比较简单可行，怎么说也是个初学者嘛！

在PageCookery的index.php里面找到case 'save':，在里面找到：

```php
$entryid = $SQL->Insert('entry', array('prefix', 'content', 'time', 'from', 'userid'), array(intval($_POST['prefix']), Format::Safe($_POST['message']), TIMENOW, $from, $User['id']));
```

然后在下面插入以下代码：

```php
$status=$_POST['message']." http://t.yourtion.com/";
$sinapasswd="USERNAME:PASSWORD";
$sina=curl_init("http://api.t.sina.com.cn/statuses/update.json");
curl_setopt_array($sina,array(CURLOPT_HEADER=>false,
CURLOPT_RETURNTRANSFER=>true,CURLOPT_POST=>1,
CURLOPT_POSTFIELDS=>"source=APPKEY&
status=$status",CURLOPT_HTTPAUTH=>
CURLAUTH_BASIC,CURLOPT_USERPWD=>$sinapasswd));
$sian1=curl_exec($sina);
```

注意将其中的USERNAME、PASSWORD、APPKEY替换成你的信息，如果你没有新浪开放平台的APPKEY的话，那就建议你转用微博通http://weiboto.com/。去上面注册个账户就能同步各种SNS，还包括Twitter。

[![]({{ IMAGE_PATH }}2011/01/weiboto.jpg)]({{ IMAGE_PATH }}2011/01/weiboto.jpg)

[![]({{ IMAGE_PATH }}2011/01/weiboto1.jpg)]({{ IMAGE_PATH }}2011/01/weiboto1.jpg)

绑定你想要同步的SNS，然后使用以下代码：

```php
$status=$_POST['message'];
$wbtpasswd="USERNAME:PASSWORD";
$wbt=curl_init("http://api.weiboto.com/statuses/update.json");
curl_setopt_array($wbt,array(CURLOPT_HEADER=>false,
CURLOPT_RETURNTRANSFER=>true,CURLOPT_POST=>1,
CURLOPT_POSTFIELDS=>"status=$status",
CURLOPT_HTTPAUTH=>CURLAUTH_BASIC,
CURLOPT_USERPWD=>$wbtpasswd));
$wbt1=curl_exec($wbt);
```

还是记得替换你的USERNAME和PASSWORD。然后你发布的消息就同步了。

测试的时候发了很多测试微博在新浪，嗮一下-[http://t.sina.com.cn/yourtion](http://t.sina.com.cn/yourtion)

[![]({{ IMAGE_PATH }}2011/01/sina2.jpg)]({{ IMAGE_PATH }}2011/01/sina2.jpg)

[![]({{ IMAGE_PATH }}2011/01/sina1.jpg)]({{ IMAGE_PATH }}2011/01/sina1.jpg)

[![]({{ IMAGE_PATH }}2011/01/xianguo.jpg)]({{ IMAGE_PATH }}2011/01/xianguo.jpg)

希望大家测试成功，有什么问题欢迎提出，共同研究共同成长！
