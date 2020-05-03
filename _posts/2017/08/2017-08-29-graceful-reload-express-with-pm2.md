---
layout: post
date: 2017-08-29 10:27:48 +0800
slug: graceful-reload-express-with-pm2
title: "使用PM2的GracefulReload无停机更新Express应用"
author: Yourtion
keywords: ["pm2", "GracefulReload", "Express"]
description: "使用PM2的GracefulReload无停机更新Express应用，在执行了startOrGracefulReload之后，PM2 会马上启动一个新的进程处理新进的请求，同时等待原有的进程停止后删除退出。"
category: "Node.js"
tags: ["解决问题"]
---
{% include JB/setup %}

最近的项目上遇到一个问题，在 API 服务中，有些请求是先返回了结果，然后在后面继续处理一些异步操作，但是如果这时候重启了服务，因为部分操作没执行成功，就会导致数据不一致的情况。

很早之前就知道了 PM2 的 GracefulReload，而且在实际项目中也有使用，但是基本都是以连接断开为标记，这次就顺便研究了一下怎么样更优雅的实现无停机更新。

## 最简单的版本

```javascript
const http = require('http');
const express = require('express');

...

const server = http.createServer(app);

server.listen(3000, () => {
  console.log('Express is listening on 3000');
});

process.on('SIGINT', () => {
  console.log('Closing server...');

  server.close(() => {
    console.log('Server closed !!! ');
    process.exit();
  });

});
```

简单的说就是跟 PM2 的官网说的一样，接收 `SIGINT` 参数，然后通过执行 `server.close` 方法，不再接收新的连接，并等待旧的连接响应完成才回调回来。

这样的版本并不能解决在回调后还有异步处理的问题。所以就有了下面的扩展版。

## 扩展升级版本

```javascript
const http = require('http');
const express = require('express');

...

const server = http.createServer(app);

server.listen(3000, () => {
  console.log('Express is listening on 3000');
});

process.on('SIGINT', () => {

  const cleanUp = () => {
    mysql.end(console.error);
    redis.end();
  };

  server.close(() => {
    // Stop after 10 secs
    setTimeout(() => {
      cleanUp();
      process.exit();
    }, 10000);
  });

  // Force close server after 15 secs
  setTimeout((e) => {
    console.log('Forcing server close !!!', e);
    cleanUp();
    process.exit(1);
  }, 15000);

});
```

这个版本添加了对 `mysql` 和 `redis` 资源的释放，同时在连接断开后等待 10 秒，让异步的请求执行完（`requert` 上的超时为 5s，所有 10s 应该是足够了）。

## 效果测试

在启动的时候加上 `kill-timeout` 参数，或者在 json 文件中中设置，同时注意使用 `cluster` 模式启动。
 
```bash
pm2 start app.js --kill-timeout 15000
```

经过测试，这样的配置运行良好，可以从下面的日志看出来：

```
PM2        | Starting execution sequence in -cluster mode- for app name:Express id:1
PM2        | App name:Express id:1 online
1| Express | 08-29 10:44:51: Express is listening on 3000
PM2        | -softReload- New worker listening
PM2        | Stopping app:Express id:_old_1
PM2        | App name:Express id:_old_1 disconnected
PM2        | App [Express] with id [_old_1] and pid [24262], exited with code [0] via signal [SIGINT]
PM2        | pid=24262 msg=process killed
```

可以看出，在执行了 `startOrGracefulReload` 之后，PM2 会马上启动一个新的进程处理新进的请求，同时等待原有的进程停止后删除退出。至此，应该算是大功告成了。


## 参考

- [Graceful restart/reload/stop](http://pm2.keymetrics.io/docs/usage/signals-clean-restart/)
- [Graceful shutdown NodeJS HTTP server when using PM2](http://www.acuriousanimal.com/2017/08/27/graceful-shutdown-node-processes.html)

