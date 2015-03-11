---
author: Yourtion
comments: true
date: 2011-01-27 01:22:28+00:00
excerpt: 网上很多关于OAuth的文章，但是包括sina本身都都没有详细的的介绍，包括验证过程和验证后数据的储存，所以参考了Twitter的认证过程写下一些详细的注释代码。
layout: post
slug: sina-oauth-verification-storage
title: 新浪微博OAuth认证详解及验证数据储存
wordpress_id: 1837
categories:
- PHP
tags:
- OAuth
- PHP
---
{% include JB/setup %}

网上很多关于OAuth的文章，但是包括sina本身都都没有详细的的介绍，包括验证过程和验证后数据的储存，所以参考了Twitter的认证过程写下一些详细的注释代码。

在我们开始前，我们先建立一张数据库来保存用户信息，下面是一个基本的 Mysql 的例子：

```sql
CREATE TABLE `oauth_users` (
    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `oauth_provider` VARCHAR(10),
    `oauth_uid` text,
    `oauth_token` text,
    `oauth_secret` text,
    `username` text,
    PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;
```

注意 ```oauth_token``` 和 ```oauth_secret``` 这两个字段。sina的 ```OAuth``` 认证需要 ```token``` 和 ```token_secret``` 两个参数来完成认证，所以我们需要预留两个字段来记录他们。

然后我们需要依次完成以下工作：

向 ```SinaAPI```发起认证申请
注册/或者登录，如果用户已经有帐号的情况下
将相关数据保存在 ```Session``` 中

基于 OAuth 的认证流程从生成一个网址开始。用户被重定向到该网址要求认证，认证通过后，会重定向到我们的应用服务器，并会将两个认证后的参数通过 URL 方式传回。

建立index.php

```php
<?php
session_start();
//if( isset($_SESSION['last_key']) )
	header("Location: weibolist.php");
include_once( 'config.php' );
include_once( 'weibooauth.php' );
// 创建 sinaOAuth 对象实例
$sinaOAuth = new WeiboOAuth( WB_AKEY , WB_SKEY  );
$keys = $sinaOAuth->getRequestToken();
// Requesting authentication tokens, the parameter is the URL we will be redirected to
$aurl = $sinaOAuth->getAuthorizeURL( $keys['oauth_token'] ,false , 'http://t.yourtion.com/sina/callback.php');
// 保存到 session 中
$_SESSION['keys'] = $keys;
?>

<a href="<?=$aurl?>">Use Oauth to login</a>
```

接下来，我们还需要在这个文件中完成以下三件事：

* 验证 URL 中的数据
* 验证 Session 中的 token 数据
* 验证 Session 中的 secret 数据

如果所有数据库都是合法的，我们需要创建一个新的 SinaOAuth 对象实例，跟之前不同的是，我们要把获取到的 token 数据做为参数传入对象。之后，我们应该可以获取到一个 access token，这个获取到的数据应该是一个数组，这个 access token 是我们唯一需要保存起来的数据。

建立callback.php

```php
<?php

session_start();
include_once ('config.php');
include_once ('weibooauth.php');
if (!empty($_GET['oauth_verifier']) && !empty($_SESSION['keys']['oauth_token']) &&
    !empty($_SESSION['keys']['oauth_token']))
{
    // SinaOAuth 对象实例，注意新加入的两个参数
    $sinaOAuth = new WeiboOAuth(WB_AKEY, WB_SKEY, $_SESSION['keys']['oauth_token'],
        $_SESSION['keys']['oauth_token_secret']);
    // 获取 access token
    $access_token = $sinaOAuth->getAccessToken($_REQUEST['oauth_verifier']);
    // 将获取到的 access token 保存到 Session 中
    $_SESSION['access_token'] = $access_token;
    // 获取用户信息
    $user_info = $sinaOAuth->get('account/verify_credentials');
    // 打印用户信息
  	mysql_connect(DATABASE_HOST, DATABASE_USER, DATABASE_PSSWORD);
	mysql_select_db(DATABASE_DB_NAME);
	//更换成你的数据库连接，在config.php中
    if (isset($user_info->error) or empty($user_info['id']))
    {
        // Something's wrong, go back to square 1
        header('Location: index.php');
    } else
    {
        // Let's find the user by its ID
        $sql = "SELECT * FROM oauth_users WHERE oauth_provider='sina' AND oauth_uid=" .$user_info['id'];
        $query = mysql_query($sql);
        $result = mysql_fetch_array($query);
        // If not, let's add it to the database
        if (empty($result))
        {
            $sql = "INSERT INTO oauth_users (oauth_provider, oauth_uid, username, oauth_token, oauth_secret) VALUES ('sina', '" .
                $user_info['id'] . "', '" . $user_info['screen_name'] . "', '" . $access_token['oauth_token'] .
                "', '" . $access_token['oauth_token_secret'] . "')";
            $query = mysql_query($sql);
            $query = mysql_query("SELECT * FROM oauth_users WHERE id = ".mysql_insert_id());
            $result = mysql_fetch_array($query);
        } else
        {
            // Update the tokens
            $query = mysql_query("UPDATE oauth_users SET oauth_token = '" . $access_token['oauth_token'] .
                "', oauth_secret = '" . $access_token['oauth_token_secret'] .
                "' WHERE oauth_provider = 'sina' AND oauth_uid = " . $user_info['id']);
        }
        $_SESSION['id']=$result['id'];
        $_SESSION['username']=$result['username'];
        $_SESSION['oauth_uid']=$result['oauth_uid'];
        $_SESSION['oauth_provider']=$result['oauth_provider'];
        $_SESSION['oauth_token']=$result['oauth_token'];
        $_SESSION['oauth_secret']=$result['oauth_secret'];
		header('Location: update.php');
    }
} else
{
    // 数据不完整，转到上一步
    header('Location: index.php');
}

?>
```

你可以通过 ```$user_info->id``` 来获得用户的 ```ID```，通过 ```$user_info->screen_name``` 来获取用户名，等等，其它的信息也可以通过同样的方式获取。

需要重点指出的是，```oauth_verifier``` 这个传回来的参数不能被重用，如果上面的代码已经正确输出了用户信息，你可以试着重新刷新页面，应该会看到页面会抛出一个错误信息，因为 ```oauth_verifier``` 已经被我们用过一次了。要再次使用，需要到 ```index.php``` 页面重新发起一个认证请求。

用户注册

获得了用户信息后，现在我们要开始把用户信息注册到我们自己的数据库中，当然前提是用户没有在本地数据库注册过。

上面代码中的数据库链接信息要改成你自己的。如果用户已经存在于我们的数据库中，我们需要更新用户的 ```tokens``` 字段，因为这说明 Twitter 生成了新的 ```tokens```，数据库中的 ```tokens``` 已经过期了。如果用户不存在，我们需要新加一条记录，并将相关的数据保存在 ```Session```中，最后重定向回 ```update.php``` 页面。

```update.php```代码如下：

需要注意的是，上面代码中的 SQL 没有经过验证，你在实际使用的时候可能要经过修改。连接数据库前，我们需要先验证一下用户是否已经登录。有了用户名，我们就可以展示一条个性的欢迎信息了：

```html 
<?php
include_once ('config.php');
include_once ('weibooauth.php');
session_start();
if(!empty($_SESSION['username'])){
    // User is logged in, redirect
    header('index.php');
}
?>
<html xmlns="http://www.w3.org/1999/xhtml" dir="ltr" lang="zh-CN">
<head profile="http://gmpg.org/xfn/11">
    <title>通过 OAuth 进行身份验证--Yourtion</title>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
</head>
<body>
<h2>Hello <?=$_SESSION['username'] ?></h2>
</body>
</html>
```

这就是OAuth认证和储存的主要过程，希望对你有帮助。
代码下载：[SinaOauth](http://dl.dbank.com/c08tfjks09)
