---
layout: post
date: 2018-05-07 14:54:34 +08:00
slug: auth-user-from-smtp-on-nodejs
title: "使用SMTP服务进行用户登录认证"
author: Yourtion
keywords: ["smtp", "auth", "login"]
description: "公司一般都会带有企业邮箱，那么能不能利用企业邮箱账号来做登录验证，这样就能降低内部系统的登录验证成本，同时也让员工信息数据同步。其实通过 SMTP 协议就可以简单的完成"
category: "开发笔记"
tags: ["Node.js"]
---
{% include JB/setup %}

公司一般都会带有企业邮箱，那么能不能利用企业邮箱账号来做登录验证，这样就能降低内部系统的登录验证成本，同时也让员工信息数据同步。其实通过 SMTP 协议就可以简单的完成。

## SMTP 协议

我们来看一下 SMTP 协议，可以使用简单的 telnet 客户端来进行登录操作

首先获得经过`base64`encode 的用户名和密码：

- 用户名：dGVzdEBleHRtYWlsLm9yZw==
- 密码：dGVzdA== 

```console
// 登录 smtp.163.com 端口号为 25
# telnet smtp.163.com 25
Trying 202.108.44.205...
Connected to smtp.163.com (202.108.44.205).
Escape character is '^]'.
220 163.com Anti-spam GT for Coremail System (163com[20141201])
// 与服务器打招呼，并告知客户端使用的机器名字
HELO localhost
250 OK
// 使用身份认证登录指令
AUTH LOGIN  
334 dXNlcm5hbWU6
// 输入已经 base64_encode() 过的用户名.
cmVkc29zMw== 
334 UGFzc3dvcmQ6
// 输入已经 base64_encode() 过的密码
dGVzdA==
235 Authentication successful
```

## 原理

从上面 Telnet 的例子就可以看出，SMTP协议的实现是比较简单的，建立连接后通过特定的操作符并提交响应的参数，就会返回相应的结果，这里我们只是需要进行简单的身份验证，就不去多讲邮件发送相关的操作，有兴趣的同学可以自己去看 [RF281](https://tools.ietf.org/html/rfc821) 或者相关语言实现的库。

对于进行身份验证来说，主要执行三个操作：

1. 发送  `HELO localhost`
2. 发送 `AUTH LOGIN`
3. 发送用户名和密码（使用 base64 编码）

最后校验返回的结果是不是 “235 Authentication successful”。

## Node.js 实现

既然使用 Telnet 就能进行登录认证，那么就可以使用 Node.js 提供的 net 模块来完成操作，代码也很简单，先来个最简单的 Demo：

```javascript
const net = require("net")

const COMMAMD = ["HELO localhost","AUTH LOGIN","cmVkc29zMw==","dGVzdA==","QUIT"].reverse();

const conn = net.connect(25, "smtp.163.com");

conn.on("data", (data) => {
  console.log(data.toString());
  const comm = COMMAMD.pop();
  console.log(comm)
  conn.write(comm + "\r\n")
});
```

输出结果如下：

```
220 163.com Anti-spam GT for Coremail System (163com[20141201])

HELO localhost
250 OK

AUTH LOGIN
334 dXNlcm5hbWU6

dGVzdC5vcmc=
334 UGFzc3dvcmQ6

dGVzdA==
235 Authentication successful

QUIT
221 Bye
```

可以看到这个结果就跟使用 Telnet 的结果一样，只需要进行简单的封装就可以了。

### node-smtp-auth

经过封装的代码放在：[https://github.com/yourtion/node-smtp-auth]( https://github.com/yourtion/node-smtp-auth) 项目，并发布到 NPM：[smtp-auth](http://npmjs.org/package/smtp-auth) 。

通过：`npm install smtp-auth --save` 安装即可。

使用方法：

```javascript
const SMTPAuth = require("smtp-auth");
const client = new SMTPAuth({
  host: "smtp.163.com",
  port: 25,
});

client.auth("test@extmail.org", "test").then(() => {
    console.log("login success")
}).catch((err) => {
    console.log("login fail: ", err)
});
```

返回成功的信息就是验证通过，就是这样简单。有什么问题或者意见建议欢迎给我提 [issues](https://github.com/yourtion/node-smtp-auth/issues/new)


