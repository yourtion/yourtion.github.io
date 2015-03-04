---
author: admin
comments: true
date: 2015-03-02 12:39:14+00:00
excerpt: 使用Mongodb数据库，需要为各个数据库增加用户权限出现问题解决方法
layout: post
slug: mongodb-2-6-adduser
title: MongoDB2.6添加用户权限方法
wordpress_id: 4078
categories:
- Node.js
- 服务器
tags:
- MongoDB
---

使用Mongodb数据库，需要为各个数据库增加用户权限，查了一下发现下面代码：

```javascript
use test2
db.addUser( { user: "test",
              pwd: "admin",
              roles: [ "readWrite", "dbAdmin" ]
            } )

```

执行后发现：

```bash
$ mongo 192.168.1.111/test2 -u test -p admin
MyMongo:PRIMARY>

```

<blockquote>Error: 18 { ok: 0.0, errmsg: "auth failed", code: 18 } at src/mongo/shell/db.js:228</blockquote>

### 检测版本发现

```bash
$mongo --help
MongoDB shell version: 2.4.9

```

我使用的Mongodb是2.6版本，但是Shell是2.4.9的，感觉是这出现了文问题，所以采用下面方案：

### 删除旧版本的Client

```bash
sudo apt-get remove mongodb-clients
sudo apt-get autoremove
sudo apt-get autoclean

```

### 安装新的Shell

```bash
sudo apt-get install mongodb-org-shell=2.6.1
$mongo --help
MongoDB shell version: 2.6.1

```

使用新的（Mongodb 2.6的代码）添加用户

```javascript
db test2
db.createUser(
   {
     user: "test",
     pwd: "admin",
     roles:
       [
         { role: "readWrite", db: "test2" },
       ]
   }
)

```

```bash
$mongo 192.168.1.111/test2 -u test -p admin
MyMongo:PRIMARY>

```

登录成功！！！！
