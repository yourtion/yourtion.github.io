---
layout: post
date: 2020-02-28 16:06:50 +0800
slug: deploy-ghost-3-on-heroku
title: "在 Heroku 上部署 Ghost 3.x"
author: Yourtion
keywords: ["Heroku", "Ghost"]
description: "之前的另外一个博客是托管在Farbox上，但是因为没有什么流量，也没有怎么去折腾，一直也就没有怎么管，某天突然想起，就想到要看看，结果发现Farbox已经快过期了，而且还没得续费。考虑到几个需求：自定义域名、发布简单，想想不想再折腾回Jekyll，又想到 MWeb 支持直接发布到 Ghost，就打算折腾回 Ghost，但是又不想去搞什么VPS部署啥的，流量不大，就想起了Heroku。"
category: "Node.js"
tags: ["Heroku"]
img: 2020/02/deploy-ghost-3-on-heroku-1.jpg
---
{% include JB/setup %}

之前的另外一个博客是托管在 Farbox 上，但是因为没有什么流量，也没有怎么去折腾，一直也就没有怎么管，某天突然想起，就想到要看看，结果发现 Farbox 已经快过期了，而且还没得续费。

考虑到几个需求：自定义域名、发布简单，想想不想再折腾回 Jekyll，又想到 MWeb 支持直接发布到 Ghost，就打算折腾回 Ghost，但是又不想去搞什么 VPS 部署啥的，流量不大，就想起了 Heroku。

虽然在海外，但是可以通过 CDN 加速解决一下访问问题，剩下的就是怎么部署还要解决存储问题，折腾了一轮，输出点踩过点坑和经验吧。

- 博客地址：http://view.yourtion.com
- 项目 GitHub：https://github.com/yourtion/ghost-on-heroku

假设你已经有 Heroku 账号并了解一些基本的操作，如果不懂的话可能你就不需要往下看了。

> 有条件的绑定个信用卡以提升 Free Dyno Hours，详见 [free-dyno-hours](https://devcenter.heroku.com/articles/free-dyno-hours#usage)

## 初始化并添加相关服务

在 Heroku 上“Create New App”，设置好应用名等东西后，添加 “JawsDB MySQL” 和 “Mailgun” 两个服务。如下图：

[![]({{ IMAGE_PATH }}2020/02/deploy-ghost-3-on-heroku-1.jpg)]({{ IMAGE_PATH }}2020/02/deploy-ghost-3-on-heroku-1.jpg)

因为 Heroku 对于环境每次部署都会初始化，所以 Ghost 需要通过 MySQL 保存应用的数据，同时使用 Mailgun 进行邮件发送。

因为 “JawsDB MySQL” 有 5M 的容量大小限制，如果你的博客非常大可能就要考虑付费或者使用其他 MySQL 了，我的博客相对内容比较少，初期评估 5M 基本还是够用的。

## 环境变量配置

配置完服务后，需要在 Heroku 的“Settings”的“Config Vars”中配置下面的环境变量。

[![]({{ IMAGE_PATH }}2020/02/deploy-ghost-3-on-heroku-2.jpg)]({{ IMAGE_PATH }}2020/02/deploy-ghost-3-on-heroku-2.jpg)

- `APP_PUBLIC_URL`：对外访问 Ghost 的地址（如果没有绑定自定义域名，就用 Heroku 的地址）
- `QN_BUCKET`：七牛的 bucket
- `QN_DOMAIN`：七牛的 CDN 地址（http://cdn.view.yourtion.com）
- `QN_KEY`：七牛的 AccessKey
- `QN_SEC`：七牛的 SecretKey

## 配置文件生成

因为 Ghost 的配置文件中，有很多配置依赖于运行的环境变量，但是新版本的 Ghost 好像已经不支持使用 js 文件作为配置文件，所以只能在项目根目录下新建`.profile`文件，让 Heroku 在启动前帮我们生成需要的配置文件。

`.profile`内容很简单：`bin/create-config`，也就是执行[create-config](https://github.com/yourtion/ghost-on-heroku/blob/master/bin/create-config)这个脚本。

## 拷贝主题文件

同时在构建镜像时候，需要通过`npm`的`postinstall`执行[copy-themes.sh](https://github.com/yourtion/ghost-on-heroku/blob/master/bin/copy-themes.sh)，将主题文件拷贝到对应的目录，否则会找不到主题文件。

## 使用七牛做为文件存储

测试了一轮，找到一个比较可用的七牛存储适配器，其他的适配器好像有些老，执行总是不正常，但是因为 Heroku 在海外，从服务器端调用七牛云存储还是有些慢的（有时候要 20s 才能上传完成），要有点耐心。

同时需要把适配器链接到：`content/adapters/storage/qiniu`（详见：目录结构）

最后记得去七牛申请 bucket，让获取相关的信息，配置在环境变量上。（详见：环境变量配置）

## 部署

最后只要把项目 push 上 Heroku 就可以了。类似这样：`git push heroku master`。

然后就可以访问你的项目了。

或者你也可以克隆我的项目，修改修改，推到你的 Heroku 上。

## 项目目录结构

```tree
├── .gitignore
├── .profile            // 启动前触发生成配置
├── Procfile            // 启动脚本
├── bin
│   ├── copy-themes.sh  // 拷贝主题
│   └── create-config   // 根据环境变量生成配置
├── config.development.json     //开发配置
├── content             // 默认content文件夹（必须有）
│   ├── adapters
│   │   └── storage     // 七牛存储适配器
│   │       └── qiniu -> ../../../node_modules/qiniu-store/
│   ├── data            // 默认数据文件夹（必须有）
│   │   └── .gitkeep
│   └── themes          // 默认主题文件夹（必须有）
│       └── .gitkeep
├── package.json
└── server.js           // 启动脚本
```

## 参考

- https://github.com/snathjr/ghost-on-heroku
- https://b.log.ci/host-ghost-on-heroku/
