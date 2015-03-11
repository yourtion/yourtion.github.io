---
author: Yourtion
comments: true
date: 2013-09-15 09:00:00+00:00
excerpt: 如果需要用php的mail()函数来发送邮件，是需要服务器安装sendmail组件才能支持的，这个在php的手册中mail()函数部分也有介绍到。一般造成在php用mail()发送邮件缓慢的原因，是DNS解析慢导致，又常常是因为服务器的hostname不是一个真实可解析的域名。
layout: post
slug: ubuntu-open-phps-mail
title: Ubuntu开启php的mail()并解决速度慢问题
wordpress_id: 3891
categories:
- 服务器
tags:
- Linux
- PHP
---
{% include JB/setup %}

如果需要用php的mail()函数来发送邮件，是需要服务器安装sendmail组件才能支持的，这个在php的手册中mail()函数部分也有介绍到。然后在

在Ubuntu下安装sendmail的命令：

```
sudo apt-get install sendmail
```

安装好之后，启动sendmail服务：

```
sudo service sendmail start
```

有了sendmail的支持，就可以在php中用mail()函数发送邮件了。

一般造成在php用mail()发送邮件缓慢的原因，是DNS解析慢导致，又常常是因为服务器的hostname不是一个真实可解析的域名。

```
sudo vim /etc/hosts
```

然后按i键，然后就可以修改代码了。在127.0.0.1那段里面添加localhost.localdomain和你的主机别名，改好之后按Esc键退出编辑状态，然后输入‘:wq’保存并退出。

最后重启下sendmail服务：

```
sudo service sendmail restart
```

