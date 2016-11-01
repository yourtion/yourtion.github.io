---
layout: post
date: 2016-11-01 15:24:36 +08:00
slug: use-gitlab-ci-for-nodejs-project
title: "使用 GitLab-CI 自动化 Node.js 项目测试"
author: Yourtion
keywords: ["GitLab-CI","Node.js","GitLab Pipelines","GitLab Builds"]
description: "使用 GitLab-CI 自动化 Node.js 项目测试，同时获得代码测试覆盖度，依赖外部服务，加速测试速度与缓存。"
category: "GitLab"
tags: ["Node.js"]
---

{% include JB/setup %}

很久前就更新了新版本的 GitLab，新版本一早就支持了 CI/CD 的功能，之前也部署过 GitLab 的 Runner，但是没有真正的用起来，最近就想把新的项目的 CI 与 CD 功能一起做起来，先从 Node.js 的项目开始，接下来一步步来吧。

## 开启 Pipelines

Gitlab CI Runner 的创建和配置就不多说了，网上的教程很多，接下来的文章就假定你已经有了一个使用 Docker 的 Runner。为什么使用 Docker 的 Runner ？因为这样可以兼容各种运行的环境，同时可以链接其他服务（例如：MySQL、MongoDB、Redis...）。

如果你已经有 Share 的 Runner 同时项目默认也开启了 Builds 的功能，那么在项目主页应该可以看到 `Pipelines`  的选项，没有开启的话，可以在 `Edit Project` 的  `Feature Visibility` 中设置 `Builds` 为 `Only team members` （如下图）。

[![]({{ IMAGE_PATH }}2016/11/gitlab-enable-builds.JPG)]({{ IMAGE_PATH }}2016/11/gitlab-enable-builds.JPG)

## 最简单的测试

开启后，就是简单的问题了，你的 Node.js 项目一般都有 `test` （没有测试做个毛线 CI ）。在项目的根目录下添加 ` .gitlab-ci.yml` 文件。内容如下：

```yaml
image: node:6

before_script:
  - npm install
  
test:
  script:
  - npm test
```

最简单的测试就完成，`commit` 并且 `push` 之后，就能看到 `Pipelines` 的 `Builds` 中出现了在 `running` 的项目，如果测试没问题，那么状态就会变成 `passed` 。

## 链接外部服务

在项目重要用到外部服务（如：Redis、MongoDB）也很简单，通过 `services` 字段添加需要依赖服务的 Docker 镜像就可以了，如下：

```yams
services:
  - mongo:3.2
  - redis:3-alpine
```

在代码内就可以通过 hostname： `redis` 跟 `mongo` 访问到 Redis 和 MongoDB 的服务（端口为默认端口号）

## 加快速度

未来加快 `npm` 的安装速度，使用淘宝的镜像，把 `before_script` 的 `npm install` 改为 `npm install --registry=https://registry.npm.taobao.org` 。

同时可以缓存安装后的 `node_modules` ，通过添加 `cache` 字段：

```yaml
cache:
  paths:
  - node_modules/
```

这样在 build 成功的情况下，就能看到 `Created cache` ，下次运行就不需要安装那么多模块了。

## 添加代码测试覆盖度

Node.js 可以通过添加 `istanbul` 模块，为现有项目添加 `coverage` 功能，不需要改动原有的测试，只需要安装 `istanbul` 模块： 

```sh
npm install istanbul --save-dev
```

然后把原来的 `mocha` 改成 `./node_modules/.bin/istanbul cover _mocha` 就可以了。

接下来只要修改 `CI/CD Pipelines` 中的 `Test coverage parsing` 的内容为 `^Statements\s+:\s(\d+(?:\.\d+)?%)` 就可以让 GitLab 自动获取到代码测试覆盖度的情况。如下图：

[![]({{ IMAGE_PATH }}2016/11/gitlab-test.JPG)]({{ IMAGE_PATH }}2016/11/gitlab-test.JPG)

下方有获取对应分支 status 的代码。

##  总结

最终的 ` .gitlab-ci.yml` 如下：

```yaml
image: node:6

cache:
  paths:
  - node_modules/
  
services:
  - mongo:3.2
  - redis:3-alpine
  
before_script:
  - npm install --registry=https://registry.npm.taobao.org
  
test:
  script:
  - ./node_modules/.bin/istanbul cover _mocha
```

在 `README` 中加入相关的 status 后如下图：

[![]({{ IMAGE_PATH }}2016/11/gitlab-ststus-show.png)]({{ IMAGE_PATH }}2016/11/gitlab-ststus-show.png)

还有其他的问题欢迎大家一起讨论。
