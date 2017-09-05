---
layout: post
date: 2017-09-05 10:51:53 +08:00
slug: fix-log4js-with-pm2-not-work
title: "log4js在PM2的cluster模式下大坑"
author: Yourtion
keywords: ["log4js", "PM2", "cluster"]
description: "使用 log4js 全面统一项目中的日志，所以统一构建了一个日志配置，在PM2的cluster模式下对配置添加 pm2: true 的选项"
category: "Node.js"
tags: ["解决问题"]
---
{% include JB/setup %}

之前一直使用 `debug` 还有 `console.log` 去打日志，或者使用文件日志模块，之前用 `log4js` 也主要为了把日志传输到 ELK 上。新的项目上决定使用 `log4js` 来全面统一项目中的日志，所以统一构建了一个日志配置。

在本地调试还有早期测试服务器部署都工作正常，多个配置项也输出正常，但是在部署到正式服的时候，发现日志不输出了，文件也没了记录，在生产环境使用 node 运行跟配置一致的 `log4js` 也工作正常。

一开始以为是权限问题，对日志目录做了权限调整，切换到 `/tmp` 目录都无济于事，百般无奈的情况下只好重新认真地跑去读API文档。

结果在文档 [log4js-api](https://nomiddlename.github.io/log4js-node/api.html) 的 `Configuration Object` 段中，居然看到了下面的内容：

> pm2 (boolean) (optional) 
> 
> - set this to true if you’re running your app using pm2, otherwise logs will not work (you’ll also need to install pm2-intercom)

原来还有这个配置，而且不开启的话就会工作不正常？但是我之前在测试服务器的时候工作得好好的啊～

对比了一下部署环境，原来生产环境下使用了 `cluster` 模式，但是在测试环境中只启动一个进程所以用了 `fork` 模式，在生产环境切换到 `fork` 果然就正常了～

解决办法，通过变量指定了一下部署环境，在生产环境对 `log4js` 对配置添加 `pm2: true` 的选项。

示例（我是通过 `NODE_ENV === 'production'` 进行判断）：

```javascript
const log4js = require('log4js');

log4js.configure({
  appenders: {
    out: { type: 'stdout' },
    app: { type: 'file', filename: 'application.log' }
  },
  categories: {
    default: { appenders: [ 'out', 'app' ], level: 'debug' }
  }
  pm2: process.env.NODE_ENV === 'production',
});

module.exports = log4js;

```


但是对于后面说的 `pm2-intercom` 模块，我测试中就是没有安装也可以正常工作，看了一下这个模块，是一个内部进程通讯的模块：

> Simple inter process communication for processes managed by PM2. Require PM2 > 16.0.0.

我估计是 log4js 用在多个 cluster 进程中协调文件日志的吧。

由此可见，认真看文档很重要，认真看文档很重要，认真看文档很重要！！！
