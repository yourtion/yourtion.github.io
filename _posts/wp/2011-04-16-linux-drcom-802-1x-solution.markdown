---
author: Yourtion
comments: true
date: 2011-04-16 15:16:53+00:00
excerpt: 802.1x下的Dr.com在Linux拨号一直是大家头痛并难以解决的问题，以前在Ubantu下研究安装Dr.com的客户端但是都因为802.1x的端口认证问题而失败告终，现在终于搞定了完美解决的方法。现在与大家分享，一起交流。
layout: post
slug: linux-drcom-802-1x-solution
title: Linux下Dr.com(802.1x)拨号上网完美解决(Ubantu)
wordpress_id: 2034
categories:
- VPS
tags:
- Linux
---
{% include JB/setup %}

```802.1x```下的```Dr.com```在Linux拨号一直是大家头痛并难以解决的问题，以前在Ubantu下研究安装Dr.com的客户端但是都因为```802.1x```的端口认证问题而失败告终，现在终于搞定了完美解决的方法。现在与大家分享，一起交流。

这次使用的是第三方开发的```MentoHUST```，因为官方的锐捷Linux版久无更新，使用官方程序很多同学无法通过认证，有些能通过但容易掉线。虽然网上第三方Linux版锐捷客户端不少，但都大同小异，不能通过锐捷的客户端校验。而MentoHUST提供一个Linux下与锐捷兼容性很好的认证客户端，方便使用Linux和锐捷的同学使用校园网。

使用方法很简单，因为我的实验环境所```Ubantu```物理机，所以只要安装deb包，然后做一下配置，最后运行即可。

安装deb包成功后在终端中输入：

```bash
$sudo -i 
#取得root权限

$sudo mentuhust 
#运行软件，初次安装后需要初始设置，帐号密码同XP，网卡选择“1”，剩余两项填“0”。

#修改设置可以运行：
$sudo gedit /etc/mentohust.conf
```

开始登陆

[![]({{ IMAGE_PATH }}2011/04/1.png)]({{ IMAGE_PATH }}2011/04/1.png)

让人烦恼的```802.1x```认证就这样搞定了`````

开始上网冲浪吧```

```MentoHUST```的下载和其他Linux版本的编译请看[http://code.google.com/p/mentohust/](http://code.google.com/p/mentohust/)


