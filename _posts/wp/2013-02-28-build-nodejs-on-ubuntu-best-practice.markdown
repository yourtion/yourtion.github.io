---
author: Yourtion
comments: true
date: 2013-02-28 12:18:07+00:00
excerpt: 现在有了NVM（node version management），一切就方便多了。它可以用来安装和管理不同的Node.js版本，它有点像ruby
  rvm ，可以让你快速切换Node的版本来测试你的应用。
layout: post
slug: build-nodejs-on-ubuntu-best-practice
title: Ubuntu上搭建Node.js环境最佳实践
wordpress_id: 3742
categories:
- Node.js
tags:
- Node.js
---
{% include JB/setup %}

要在Ubuntu的上建立node.js的的开发环境方法很多。像直接下载源代码自己编译，或者是使用```apt-get```来帮你解决这些琐碎的问题。因为Node.js还年轻，常常会有版本的更新。手动安装及更新实在是非常的累人，而且代码在不同版本上执行可能也会有所不同。那么如何快速的安装新版本和在各个版本间切换将成为开发者面临的一大问题。

现在有了```NVM```（node version management），一切就方便多了。它可以用来安装和管理不同的```Node.js```版本，它有点像```ruby rvm``` ，可以让你快速切换Node的版本来测试你的应用。

下面我们就开始NVM的安装吧，使用Curl或者Wget

```bash
curl https://raw.github.com/creationix/nvm/master/install.sh | sh
```

或者

```bash
wget -qO- https://raw.github.com/creationix/nvm/master/install.sh | sh
```

或者使用Git手动编译安装，先安装```git-core```，以便从GitHub上获取```NVM```的最新版本

```bash
# 安装 git
$ sudo apt-get install git-core
# 获取最新的NVM
$ git clone git://github.com/creationix/nvm.git ~/.nvm
# 开启快速执行
$ echo ". ~/.nvm/nvm.sh" >> ~/.bashrc
```

这样安装就完成了，```NVM```的使用也非常简单。

```bash
# 安装特定版本的
$ nvm install v0.8.12

# 设置特定版本为默认版本
$ nvm alias default v0.8.12

# 使用特定版本
$ nvm use 0.8.12
$ nvm run 0.8.12

# 列出已经安装的Node
$ nvm ls
```

这样你就可以在多个```Node```环境中自由切换，快速测试了！
