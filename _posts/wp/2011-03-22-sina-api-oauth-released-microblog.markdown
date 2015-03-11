---
author: Yourtion
comments: true
date: 2011-03-22 23:50:26+00:00
excerpt: '继续前面的文章《新浪微博OAuth认证详解及验证数据储存》，现在我们就使用它来发布微博具体实现代码。'
layout: post
slug: sina-api-oauth-released-microblog
title: 新浪微博API使用OAuth认证发布微博实例
wordpress_id: 1976
categories:
- PHP
tags:
- OAuth
- PHP
---
{% include JB/setup %}

继续前面的文章[《新浪微博OAuth认证详解及验证数据储存》](/sina-oauth-verification-storage.html)，现在我们就使用它来发布微博。

我们已经将用户新浪微博的```oauth_token```和```oauth_secret```保存到

```php
$_SESSION['oauth_token']=$result['oauth_token'];
$_SESSION['oauth_secret']=$result['oauth_secret'];
```

里面，现在要做的就很简单了··就是调用sinaOauth的类进行发布。。

代码如下：

```php
//Statuses/update
$c = new WeiboClient( WB_AKEY , 
                      WB_SKEY , 
                      $_SESSION['last_key']['oauth_token'] , 
                      $_SESSION['last_key']['oauth_token_secret']  );

$msg = $c->update("测试发表微博");
if ($msg === false || $msg === null){
	echo "Error occured";
	return false;
}
if (isset($msg['error_code']) && isset($msg['error'])){
	echo ('Error_code: '.$msg['error_code'].';  Error: '.$msg['error'] );
	return false;
} 
echo($msg['id']." : ".iconv('UTF-8', 'GB2312',
$msg['text'])." - ".$msg["created_at"]);
```

这样最简单的就OK了····
