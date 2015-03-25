---
layout: post
date: 2015-03-25 15:25:30
slug: cnpm-privite-npm
title: "使用CNPM搭建私有NPM"
author: Yourtion
keywords: ["cnpm","npm","私有npm","privite npm"]
description: "最近的Node项目中因为数据模型等问题，需要有一个对各个模块进行统一的管理，如果把私有的模型publish到公共的npm不太合适，所以决定使用cnpm搭建一个私有的npm，同时也可以对项目常用的npm模块做一个缓存，加快部署速度。搭建的过程还是比较简单，参考cnpm的[Deploy]很快搭建起来"
category: "服务器"
tags: ["Node.js"]
---
{% include JB/setup %}

最近的Node项目中因为数据模型等问题，需要有一个对各个模块进行统一的管理，如果把私有的模型publish到公共的npm不太合适，所以决定使用cnpm搭建一个私有的npm，同时也可以对项目常用的npm模块做一个缓存，加快部署速度。

搭建的过程还是比较简单，参考cnpm的[Deploy](https://github.com/cnpm/cnpmjs.org/wiki/Deploy)很快搭建起来，给大家分享一下。

服务器环境：

- Ubuntu Server 14.04
- Node.js v0.12.0
- MySQL 5.5

因为cnpm使用了```--harmony```参数，所以需要Node版本大于0.11.12，所以就直接上了最新的v0.12.0，没有MySQL也没关系，可以直接使用sqlite3。

### Clone源码并导入SQL

（MySQL用户名：root 密码：root，数据库名：cnpm，项目和数据放在~/cnpm）

```bash

# clone from github
$ git clone git://github.com/cnpm/cnpmjs.org.git $HOME/cnpm
$ cd $HOME/cnpmjs

# create mysql tables
$ mysql -uroot -proot -e 'DROP DATABASE IF EXISTS cnpmjs;'
$ mysql -uroot -proot
mysql> use cnpmjs;
mysql> source docs/db.sql
```

### 创建并编辑```config.js```

```bash
$ vim config/config.js
```
```javascript
 module.exports = {
    debug: false,
    scopes: ['@superid'],
    enableCluster: true, // enable cluster mode
    mysqlServers: [
      {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'root',
      }
    ],
    mysqlDatabase: 'cnpm',
    enablePrivate: true, // enable private mode
    admins: {
      admin: 'yourtion@gmail.com',
    },
    syncModel: 'exist'// 'none', 'all', 'exist'
  };  
```

### 安装依赖并启动运行

```bash
$ make install

$ npm run start
```

### 检查运行

```bash
#open registry and web
# registry
$ curl http://localhost:7001
# web
$ curl http://localhost:7002
```

看到```7001```返回json数据，而```7002```返回HTML源代码就是运行成功。

### 客户端设置

首先安装cnpm，并设置``` ~/.cnpmrc```：

```bash
$ sudo npm install -g cnpm

$ vim  ~/.cnpmrc
```

设置```registry=http://127.0.0.1:7001```(```127.0.0.1```改为你的服务器ip)

这样就可以正常的publish私有模块以及使用cnpm的缓存服务了。

### 有几个需要注意的点：

1. 因为需要创建私有仓库并且保证有权限才能publish模块，所以```config.js```中```enablePrivate```必须设为```true```;
2. 为了保证私有的库不与公开npm冲突，```config.js```中需要设置```scopes```数组为你的公司名或者项目代号，publish的模块名为```@superid/myModel```；
