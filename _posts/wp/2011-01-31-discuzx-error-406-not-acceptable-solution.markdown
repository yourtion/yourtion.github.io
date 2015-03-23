---
author: Yourtion
comments: true
date: 2011-01-31 02:55:44+00:00
excerpt: Discuz X保存时406 Not Acceptable错误解决方法
layout: post
slug: discuzx-error-406-not-acceptable-solution
title: Discuz X保存时406 Not Acceptable错误解决方法
wordpress_id: 1887
categories:
- 康盛
---
{% include JB/setup %}

之前一直正常的DiscuzX1突然出问题，在DIY后保存或者在后台改变设置保存时会出现，


> 406 Not Acceptable
> 
> An appropriate representation of the requested resource / could not be found on this server.
> 
> Additionally, a 404 Not Found error was encountered while trying to use an ErrorDocument to handle the request.


升级成X1.5依旧这样，我就怀疑是服务器的问题。

研究了之后才发现，原来是服务器为了您的网站安全，在所有的共享服务器上安装有Apache的一个```MOD```叫作```Mod security```，就是因为这个```MOD```，当网址中包含有“%”号等其它敏感字符的时候，就会被``` Mod security``` 阻挡，导致 406 Not Acceptable 错误。

如果是旧版本的Apache就可以通过```.htaccess```控制 ```Mod security``` 的一些选项，新版中没办法使用.htaccess控制了，只能联系他们的技术支持将你的网址加入白名单内。一般出现这样的情况都是国外的空间，下面为英文不好的童鞋提供一个发邮件或者Ticket的模版。

```
Hello, I am sorry to bother you! I hope you can help me disable the Mod security for this domain: **???.com**, my cpanel account name is **???**. 
Because my URL must contain the characters "%", but the Mod security led to the error, thanks very much!
```

把里面的域名和账户名提换成你的就OK了。
