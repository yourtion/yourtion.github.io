---
author: Yourtion
comments: true
date: 2012-02-23 08:41:15+00:00
excerpt: Node App Engine是基于Node.js v0.5.5开发的应用托管服务, 可提供node.js应用的在线部署功能.
layout: post
slug: an-an-ace-node-js-hosting-trial
title: ACE阿里云引擎Node.js服务托管试用
wordpress_id: 3588
categories:
- 阿里云ACE
tags:
- 阿里云
- 阿里云ACE
---
{% include JB/setup %}

**简介**

Node App Engine是基于Node.js v0.5.5开发的应用托管服务, 可提供node.js应用的在线部署功能.

**使用注意**

1. 系统node使用v0.5.5版,使用时请注意与0.4.x的功能区别
2. 如有日志方面需求请暂时使用标准输出(stdout/stderr)实现, 很快将开发日志操作API
3. ACE托管环境中每个Nodejs应用都会启动一个独立的进程
4. 上传的Nodejs应用根目录下必须有```index.js```或者```package.json```文件
5. 启动http服务只能监听10080端口
6. 当应用有语法错误或者```require```的模块不存在时，应用进程无法启动

**第三方模块**

仅支持```js-native```的模块.对于c模块暂不支持

系统默认提供如下模块:

1. express
2. connect
3. jade

如需使用其他模块请放入$app_home/node_modules即可

**禁用API**

1. child_process
2. net.listenFD()
3. net.listen() 仅支持port与callback参数, 不支持监听unix domain sock与指定监听ip

代码示例：

```javascript
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World ');
}).listen(10080);
console.log('Server is running');
```

就是把代码放到```index.js```，上传上去就Ok。

演示地址：http://nodes.aliyun.com
