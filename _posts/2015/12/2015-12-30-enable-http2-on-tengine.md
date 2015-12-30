---
layout: post
date: 2015-12-30 13:45:50
slug: enable-http2-on-tengine
title: "在Tengine中开启HTTP/2"
author: Yourtion
keywords: ["Tengine","HTTP/2", "spdy"]
description: "今天看到淘宝的Tengine发布了2.1.2版本，看了一下 Changelog 发现已经支持HTTP/2，支持向后兼容SPDY。马上动手进行更新，为现在的服务器加上帅气的HTTP/2。"
category: "服务器"
tags: ["Nginx"]
---
{% include JB/setup %}

今天看到淘宝的 `Tengine` 发布了2.1.2版本，看了一下 CHANGES 发现已经支持HTTP/2，支持向后兼容SPDY。马上动手进行更新，为现在的服务器加上帅气的HTTP/2。

## 关于 HTTP/2

HTTP/2的重要特性完全源自SPDY。(详见：[使用HTTP/2提升性能的7个建议](http://www.w3ctech.com/topic/1563))

- HTTP/2是二进制（而文本）协议，因此更简洁高效；
- 它针对每个域只使用一个多路复用的连接，而不是每个文件一个连接；
- 首部使用特制的HPACK协议（而非SPDY中使用的gzip）压缩；
- HTTP/2设计了复杂的优先级排定规则，帮助浏览器首先请求最急需的文件，而NGINX已经支持（SPDY的方案要简单一些）。

性能表现参照：[HTTPS、SPDY和HTTP/2的性能比较](http://www.infoq.com/cn/news/2015/02/https-spdy-http2-comparison)

## `Tengine` 开启 HTTP/2 步骤

首先 `clone` 或者 `pull` 更新 `Tengine` 最新代码并 `checkout` 到 2.1.2

```bash
git clone https://github.com/alibaba/tengine.git
cd tengine
# 或者在已有目录 ： git pull
git checkout 2.1.2
```

配置开启 `http_v2_module` 并 `make`

```bash
./configure --with-http_ssl_module --with-http_v2_module
# 如果需要其他模块请参考：./configure --help
make
```

检测编译结果：

```bash
$ objs/nginx -v
Tengine version: Tengine/2.1.2 (nginx/1.6.2)
# 如果看到 Tengine/2.1.2 就证明版本编译对了
$ objs/nginx -V
# 结果中有 ngx_http_v2_module (static) 就是 HTTP/2 模块正常
```

更新 `Tengine` 或替换现有的 `Nginx`

```bash
# 查看现有 Nginx 的目录
$ which nginx
/usr/sbin/nginx
# 替换 Nginx
$ sudo cp -f objs/nginx /usr/sbin/nginx
```

`Nginx` 配置中启用站点对 HTTP/2 的支持

在配置文件中移除所有 `listen` 命令包含的 `spdy`模块变量，然后在 `listen` 时加上 `http2` 就可以了，例如：

```
listen 443 ssl http2 fastopen=3;
```

检测现有 `Nginx` 配置并重启

```bash
$ sudo nginx -t
the configuration file /etc/nginx/nginx.conf syntax is ok
configuration file /etc/nginx/nginx.conf test is successful
# 如果显示 ok 以及 successful 就是没问题了
$ sudo service nginx restart
```

至此你的网站就已经有了 HTTP/2 了。

检验是否启用也很简单，在 Chrome 的开发者工具的 Network 选择卡，刷新网站就能看到相关的请求的 Protocol 从 http/1.1 变成了 h2 。

### 相关内容

2.1.2的更新日志如下（详见：[CHANGES.cn](https://github.com/alibaba/tengine/blob/tengine-2.1.2/CHANGES.cn)）：

* Feature: `ngx_http_reqstat_module` 模块可以跟踪记录请求的内部重定向
* Feature: 支持HTTP/2，支持向后兼容SPDY
* Feature: `ngx_debug_pool` 模块协助分析内存状况
* Feature: 支持 `$upstream_cookie` 变量
* Bugfix: 修复 `ngx_http_dyups_module` 模块对相同后端服务器合并的问题
* Bugfix: 修复不能编译 `lua-upstream-nginx-module` 模块的问题
* Bugfix: 修复 `ngx_http_concat_module` 模块对javascript无效的问题

### 参考 

- [Nginx 开始支持 HTTP/2 了](https://imququ.com/post/nginx-http2-patch.html)
- [HTTPS、SPDY和HTTP/2的性能比较](http://www.infoq.com/cn/news/2015/02/https-spdy-http2-comparison)
- [使用HTTP/2提升性能的7个建议](http://www.w3ctech.com/topic/1563)
