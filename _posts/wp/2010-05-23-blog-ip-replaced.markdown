---
author: Yourtion
comments: true
date: 2010-05-23 02:04:26+00:00
excerpt: 博客因G F W访问不正常~已更换IP~恢复正常~
layout: post
slug: blog-ip-replaced
title: 博客因G F W访问不正常~已更换IP~恢复正常~
wordpress_id: 1133
categories:
- 博客大事记
tags:
- 服务器
---
{% include JB/setup %}

这两天突然发现博客上不了~但是DNS解析什么都是正常！所以我昨天就发邮件给Backy LLC那边~那边的回复是：

> Hello,
> 
> The website is up and running just fine for me. Please submit your ip address and during normal business hours we will look into the issue for you.
> 
> Since you are a free client we do not provide 24x7 support.
> 
> Sincerely,
> 
> William Backy  CEO/Owner Backy LLC

既然那边服务器正常就是我们网络的问题啦~~我便Tracert 了我的域名~结果发现在219.158.4.110这个地方卡住了~那个Tracert结果如下：

```bash
Being this is a few day.Here is the Tracing :  

Tracing route to yourtion.tk [74.86.183.194]  
over a maximum of 30 hops:

1 <1 ms <1 ms <1 ms 192.168.180.1  
2 14 ms 14 ms 4 ms 210.38.163.205  
3 <1 ms <1 ms <1 ms 210.38.163.174  
4 4 ms 10 ms 8 ms 221.5.72.137  
5 * * * Request timed out.  
6 8 ms 8 ms 8 ms 221.4.2.157  
7 10 ms 9 ms 9 ms 221.4.0.29  
8 9 ms 10 ms 9 ms 219.158.11.229  
9 40 ms 40 ms 40 ms 219.158.4.110  
10 * * * Request timed out.  
11 * * * Request timed out.  
12 * * * Request timed out.  
13 * * * Request timed out.  
14 * * * Request timed out.  
15 * * * Request timed out.
```


可以看到在219.158.4.110IP之后就失去了音讯~再查一下这个IP~就会得到以下结果“查询结果[1]: 219.158.4.110 ==>> 219.158.4.110 ==>> 3684566126 ==>> 中国 联通骨干网”。那么我就可以肯定我的博客所在的IP被G F W屏蔽了·~所以我再次写信希望跟换IP。对方给我答复如下：

> The website is up and running just fine for me. Please submit your ip address and during normal business hours we will look into the issue for you.
> 
> Since you are a free client we do not provide 24x7 support.
> 
> Sincerely,
> 
> William Backy  CEO/Owner 
> 
> Backy LLC

然后今天就给我换了服务器~IP换了~因为是他们解析的DNS！~~我自己不用做什么~博客又正常了···希望大家继续支持~~



