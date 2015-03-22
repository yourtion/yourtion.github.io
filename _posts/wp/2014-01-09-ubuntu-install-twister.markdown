---
author: Yourtion
comments: true
date: 2014-01-09 05:29:43+00:00
excerpt: Twister是完全去中心化的点对点微博平台，现在我们开始Twister之旅，在Ubuntu上安装和使用twister。
layout: post
slug: ubuntu-install-twister
title: Ubuntu安装使用Twister
wordpress_id: 3938
categories:
- 服务器
tags:
- Linux
- Twister
- Ubuntu
---
{% include JB/setup %}

Twister是什么？

Twister([http://twister.net.co/](http://twister.net.co/))是完全去中心化的点对点微博平台，其核心工作原理是基于比特币协议的块链模型。在一个分布式的去中心化平台上，用户如何注册？Freitas借鉴了比特币的块链：

在比特币协议中，块链记录了所有的交易信息；而在Twister中，块链充当了某种分布式的公证服务，当你注册了一个用户名时系统会分配一对公钥和私钥，这对密钥就是用来验证你的身份，和比特币一样，如果丢失私钥你也就丢失你的用户名。

Twister 由三部分组成：第一部分就是基于块链的分布式用户注册和验证；第二部分是使用分布式哈希表提供用户资源和位置跟踪的键值存储服务；第三部分是基于 Bittorrent协议，用于近乎即时的在用户之间传递信息。目前Twister客户端尚未提供二进制版本，需要手动编译，Twister网络已有2500个用户名。

现在我们开始Twister之旅吧！测试安装环境为Ubuntu12.04，其他的系统也类似。

首先安装依赖：

```bash
sudo apt-get git autoconf libtool
sudo apt-get install build-essential libboost-all-dev libssl-dev libminiupnpc-dev
```

再安装```Berkeley DB```：

```bash
sudo apt-get install libdb4.8-dev
sudo apt-get install libdb++-dev
```

更多相关依赖参见：[UNIX BUILD NOTES](https://github.com/miguelfreitas/twister-core/blob/master/doc/build-unix.md)

接着安装```libtorrent```：

```bash
$ git clone https://github.com/miguelfreitas/twister-core twister
$ cd twister/libtorrent
$ ./bootstrap.sh
$ ./configure --enable-logging --enable-debug --enable-dht
$ make
```

如果是64位的系统，在```./configure``` 后添加 "```--with-boost-libdir=/usr/lib/x86_64-linux-gnu```"

安装twister：

```bash
$ cd src
$ make -f makefile.unix
```

安装twister-html：

注意：


twister-html 必须按照在：```USERHOME/.twister/html```

如果需要自定义twister-html的位置，需要添加参数： ```-htmldir=directory```



```
$ mkdir ~/.twister
$ cd ~/.twister
$ git clone https://github.com/miguelfreitas/twister-html.git html
```

这样安装就完成了，使用下面命令启动twister

```bash
./twisterd -daemon -rpcuser=user -rpcpassword=pwd -rpcallowip=127.0.0.1
```

注意：不要修改“```user```”和“```pwd```”，它们是硬编码到html中的，如果修改会导致服务无法启动


现在你可以通过：[http://127.0.0.1:28332/index.html](http://127.0.0.1:28332/index.html) 访问twister了！

启动后需要等```Block```更新完成，如下图就是已经更新完成了。

[![twister-block-update]({{ IMAGE_PATH }}2014/01/twister-block-update.png)]({{ IMAGE_PATH }}2014/01/twister-block-update.png)

接下来就是，创建用户，如下图，“```Create a new user```”，然后检查用户名是否可用之后就可以创建用户了，创建同时会给你一个“```Secret key```”，千万别弄丢哦，弄丢了就和比特币一样再也找不回帐号了！

[![twister-add-user]({{ IMAGE_PATH }}2014/01/twister-add-user.png)]({{ IMAGE_PATH }}2014/01/twister-add-user.png)

用户创建之后不是立即可用的，和比特币一样需要等待其他节点的确认，现在上线的人比较少，需要的时间比较长，只有用户被确认之后才可以更改你的```Profile```

[![twister-wait]({{ IMAGE_PATH }}2014/01/twister-wait.png)]({{ IMAGE_PATH }}2014/01/twister-wait.png)

我也在艰苦的等待中，欢迎关注我：@yourtion
