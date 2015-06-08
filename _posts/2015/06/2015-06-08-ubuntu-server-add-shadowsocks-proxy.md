---
layout: post
date: 2015-06-08 10:24:58
slug: ubuntu-server-add-shadowsocks-proxy
title: "UbuntuServer配置ShadowSocks代理"
author: Yourtion
keywords: ["Ubuntu","ShadowSocks","Proxy"]
description: "使用ShadowSocks为服务器上配置科学上网"
category: "服务器"
tags: ["Ubuntu"]
---
{% include JB/setup %}

最近遇到一个问题，需要在服务器上配置科学上网，因为自己一直都是用ShadowSocks，所以打算在服务器上也直接上SS，研究了一下，感觉还是蛮简单的。

### 安装shadowsocks客户端

```bash
sudo apt-get install python-pip
pip install shadowsocks
```

###  创建配置文件

在```/etc/```位置下创建配置文件：

```bash
sudo vim /etc/shadowsocks.json
```

配置文件大致如下(其中的服务器地址、密码、端口号等自行修改配置)：

```json
{
	"server":"my_server_ip",
	"server_port":8388,
	"local_address": "127.0.0.1",
	"local_port":1080,
	"password":"mypassword",
	"timeout":300,
	"method":"aes-256-cfb",
	"fast_open": false
}
```

### 启动ShadowSocks

然后运行以下命令

```bash
sslocal -c /etc/shadowsocks.json
```

出现如下提示既表示命令成功运行，可是开始畅游网络了。

```
INFO: loading config from /etc/shadowsocks.json
2015-02-17 00:00:22 INFO loading libcrypto from libcrypto.so.1.0.0
2015-02-17 00:00:22 INFO starting local at 127.0.0.1:1080
```

### 使用代理进行wget

最简单的只是使用wget请求代理，就是```export```一个变量即可

```bash
export http_proxy="http://127.0.0.1:1080"
wget http://xxx.com/yyy.zip
```

### 配置全局代理服务

编辑```/etc/environment```文件：

```bash
vim /etc/environment
```

添加以下内容：

```ini
http_proxy="http://127.0.0.1:1080/"
https_proxy="http://127.0.0.1:1080/"
ftp_proxy="http://127.0.0.1:1080/"
no_proxy="localhost,127.0.0.1,localaddress,.localdomain.com"
HTTP_PROXY="http://127.0.0.1:1080/"
HTTPS_PROXY="http://127.0.0.1:1080/"
FTP_PROXY="http://127.0.0.1:1080/"
NO_PROXY="localhost,127.0.0.1,localaddress,.localdomain.com"
```

保存即可。

### 配置```apt-get```, ```aptitude```代理

创建```/etc/apt/apt.conf.d/95proxies```文件：

```bash
vim /etc/apt/apt.conf.d/95proxies
```

添加以下内容：

```ini
Acquire::http::proxy "http://127.0.0.1:1080/";
Acquire::ftp::proxy "ftp://127.0.0.1:1080/";
Acquire::https::proxy "https://127.0.0.1:1080/";
```

### 使用Supervisor运行Shadowsocks

上面通过命令行启动ShadowSocks后，重启需要手动重启，而且如果SS的进程挂了也不知道，官方推荐用Supervisor来运行，配置也是很简单：

安装：

```bash
apt-get install supervisor
```

编辑```/etc/supervisor/conf.d/shadowsocks.conf```

```bash
vim /etc/supervisor/conf.d/shadowsocks.conf
```

添加下面内容：

```ini
[program:shadowsocks]
command=sslocal -c /etc/shadowsocks.json
autorestart=true
user=nobody
```

重启执行supervisor就大功告成了：

```bash
service supervisor start
supervisorctl reload
```
