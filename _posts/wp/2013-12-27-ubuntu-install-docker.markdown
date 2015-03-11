---
author: Yourtion
comments: true
date: 2013-12-27 03:58:31+00:00
layout: post
slug: ubuntu-install-docker
title: Ubuntu安装配置Docker
wordpress_id: 3930
categories:
- 服务器
tags:
- Docker
- Linux
- Ubuntu
---
{% include JB/setup %}

最近很流行Docker这个Linux的容器引擎，抽空研究了一下，还是很不错，对于快速部署很有作用，先分享一下安装过程吧，非常简单！


## 关于Docker




<blockquote>Docker([http://www.docker.io/](http://www.docker.io/) )是一个开源的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的容器中，然后发布到任何流行的 Linux 机器上，也可以实现虚拟化。容器是完全使用沙箱机制，相互之间不会有任何接口（类似 iPhone 的 app）。几乎没有性能开销,可以很容易地在机器和数据中心中运行。最重要的是,他们不依赖于任何语言、框架或包装系统。
Docker 使用 Go 语言编写，用 cgroup 实现资源隔离，容器技术采用 LXC. 提供了能够独立运行Unix进程的轻量级虚拟化解决方案。它提供了一种在安全、可重复的环境中自动部署软件的方式。</blockquote>




## 安装Docker


安装环境为Ubuntu 12.04，Docker最佳运行环境为Linux kernel 3.8，而Ubuntu 12.04 默认的是3.2 kernel，我们需要先升级Linux内核

```
# 安装Linux内核更新
sudo apt-get update
sudo apt-get install linux-image-generic-lts-raring linux-headers-generic-lts-raring

# 重启系统
sudo reboot
```

接下来将Docker的key添加到Ubuntu的包管理中：

```
sudo sh -c "wget -qO- https://get.docker.io/gpg | apt-key add -"
sudo sh -c "echo deb http://get.docker.io/ubuntu docker main\
> /etc/apt/sources.list.d/docker.list"
```

更新包列表并安装Docker：

```
sudo apt-get update
sudo apt-get install lxc-docker
```

现在你就可以检查Docker安装成功了：

```
sudo docker version
```

我的输出是（不同版本可能有些差别）：


<blockquote>Client version: 0.7.2
Go version (client): go1.2
Git commit (client): 28b162e
Server version: 0.7.2
Git commit (server): 28b162e
Go version (server): go1.2
Last stable version: 0.7.2</blockquote>




##  去除每次sudo使用docker


在Ubuntu下，在执行Docker时，每次都要输入sudo，同时输入密码，很累人的，这里微调一下，把当前用户执行权限添加到相应的docker用户组里面。

```
# 添加一个新的docker用户组
sudo groupadd docker

# 添加当前用户到docker用户组里，注意这里的yourname为ubuntu server登录用户名
sudo gpasswd -a yourname docker

# 重启Docker后台监护进程
sudo service docker restart

# 重启之后，尝试一下，是否生效
docker version

#若还未生效，则系统重启，则生效
sudo reboot
```


