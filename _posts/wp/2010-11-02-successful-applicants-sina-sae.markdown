---
author: Yourtion
comments: true
date: 2010-11-02 01:43:45+00:00
layout: post
slug: successful-applicants-sina-sae
title: 成功申请新浪SAE
wordpress_id: 1586
categories:
- 云服务
tags:
- 新浪SAE
---
{% include JB/setup %}

最近在研究新浪微博API，同时申请了新浪SAE，使用了一下~感觉还不错~

地址：[http://sae.sina.com.cn](http://sae.sina.com.cn/)

什么是新浪SAE？SAE=Sina App Engine

Sina App Engine，名称咋这么熟悉呢？对啦，估计你是 Google App Engine 看多了，新浪的这个新服务跟 GAE 取名相似，其实服务也差不多，GAE 是一个分布式的 Python 和 Java 开发和运行平台，而 SAE 主要支持 PHP 和 MySQL ，目前的 Alpha 版本采用的是经过修改的PHP5.3(这里有修改列表)，和支持主从分离的MySQL 5.0，Memcached 和 Cron服务。鉴于新浪的实力，毫无疑问 SAE 会成为下一个高质量的 PHP+MySQL 空间。:-)

Sina SAE 提供一整套的 PHP+MySQL 开发，托管和运行平台，提供 SDK 和开发文档，它支持创建多个应用，采用 .sinaapp.com 的二级域名。

**比起传统的虚拟机主机托管，SAE有什么优势**？

Sina App Engine是新浪云计算服务的核心组成部分，和传统的虚拟主机托管有着理念上的本质不同。

- 传统服务托管面向的是硬件软件设备，使用者得到的也是设备的使用权；而SAE面向的服务，使用者得到的是服务的使用权。
- 传统服务托管不面向开发者，开发者无法在其上享受到开发的乐趣；而SAE的一个重要用户就是web developer，开发者可以在其上通过在线调试、日志分析、协作共享等功能进行web开发。
- 传统服务托管不提供分布式系统解决方案；而SAE提供的完整的分布式web服务的解决方案，其中不仅仅包括分布式数据库、分布式文件系统，更包括分布式定时器系统、网页抓取服务、图像处理服务等。
- 传统服务托管不解决域名问题，用户往往烦恼于域名申请；而SAE的用户将自动得到在sinaapp下的二级域名，同时SAE还支持域名cname。
- 传统服务托管无法保证SLA（Service Level Agreement），硬件故障的成本基本由使用者承担；而SAE保证用户的SLA，用户的web服务自动享有高冗余的前端服务器、享有自动负载均衡系统、服务自动扩展、服务自动收缩等功能。
- 传统的服务托管采用预付费的方式，费用固定且和实际使用情况无直接关系；而SAE采用预充值方式，“所付即所用，所付仅所用”，web服务的一切损耗均提供报表查询和账单汇总，让用户一目了然。

鉴于新浪的实力，毫无疑问 SAE 会成为下一个高质量的 PHP+MySQL 空间。:-)
