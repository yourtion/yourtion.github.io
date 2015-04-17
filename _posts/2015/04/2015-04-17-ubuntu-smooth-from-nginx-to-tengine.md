---
layout: post
date: 2015-04-17 11:27:32
slug: ubuntu-smooth-from-nginx-to-tengine
title: "Ubuntu下从Nginx平滑升级到Tengine"
author: Yourtion
keywords: ["Nginx","Tengine"]
description: "考虑到我们业务的场景和大压力访问需求，所以考虑将原来的Nginx升级到Tengine，同时可以使用相关的监控功能，由于是线上的业务，所以要做好快速平滑升级"
category: "服务器"
tags: ["Nginx","Ubuntu"]
---
{% include JB/setup %}

Tengine是由淘宝网发起的Web服务器项目。它在Nginx的基础上，针对大访问量网站的需求，添加了很多高级功能和特性。Tengine的性能和稳定性已经在大型的网站如淘宝网，天猫商城等得到了很好的检验。它的最终目标是打造一个高效、稳定、安全、易用的Web平台。

考虑到我们业务的场景和大压力访问需求，所以考虑将原来的Nginx升级到Tengine，同时可以使用相关的监控功能，由于是线上的业务，所以要做好快速平滑升级，试了一下，分享之。

## 升级过程

### 查看原有Nginx版本

```bash
$ nginx -v
nginx version: nginx/1.6.3
```

### 下载Tengine并编译安装(使用Git方式)

**原有Nginx安装在```/usr/sbin/nginx```，配置文件在```/etc/nginx/nginx.conf ```**

```bash
# Clone tengine
$ git clone https://github.com/alibaba/tengine
$ cd tengine
# 切换到最新Releases
$ git checkout tengine-2.1.0

# 根据服务器原有的配置进行configure
$ ./configure --prefix=/usr/sbin/nginx --conf-path=/etc/nginx/nginx.conf
$ make

# 备份Nginx并将Tengine拷贝到对应目录
$ sudo mv /usr/sbin/nginx /usr/sbin/nginx.old
$ sudo cp objs/nginx /usr/sbin/
$ sudo chmod +x /usr/sbin/nginx
```

### 查看Tengine是否安装成功

```
# 检测Tengine版本
$ nginx -v
Tengine version: Tengine/2.1.0 (nginx/1.6.2)

# 检测原有配置
$ sudo nginx -t
the configuration file /etc/nginx/nginx.conf syntax is ok
configuration file /etc/nginx/nginx.conf test is successful

```

### 重启服务完成升级

```bash
$ sudo service nginx restart
 * Restarting nginx nginx [ OK ]
```

这样升级就完成了，可以查看网站的```ResponseHeader```，就可以看到：```Server:Tengine```
