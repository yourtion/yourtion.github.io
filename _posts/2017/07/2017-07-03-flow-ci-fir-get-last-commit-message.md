---
layout: post
date: 2017-07-03 16:40:53 +08:00
slug: flow-ci-fir-get-last-commit-message
title: "flow.ci使用最后的commit信息作为Fir日志"
author: Yourtion
keywords: ["flow.ci", "Fir", "git log"]
description: "flow.ci使用最后的commit信息作为Fir日志"
category: "解决问题"
tags: ["iOS", "Android", "CI"]
---
{% include JB/setup %}

最近开始使用 flow.ci 进行客户端的自动构建并发布测试版本到 Fir 方便测试人员尽快测试反馈，好处不用说，不再需要每天手动打包并上传到 Fir。

## 自动构建

进行自动构建的方法这里不再赘述，直接看 flow.ci 博客：

- [iOS 持续集成快速入门指南](http://blog.flow.ci/ci-weekly170609/)
- [使用 flow.ci 实现 Android 自动化测试与持续集成](http://blog.flow.ci/practice_language_android_emulator/)

网上也有很多相关的文章，而且操作也很简单，直接导入项目，然后按照步骤配置后就可以完成自动构建，自动发布也很简单，参考[《iOS自动构建套件 - flow.ci + fir.im + Coding》](http://blog.flow.ci/practices-ios-automatic-build-kit/)就OK了。

## 自定义Fir日志

因为 flow.ci 是通过构建时候的环境变量对各个工作流进行配置，参考[《如何在 flow.ci 中添加 fir.im 版本更新日志？》](http://blog.flow.ci/how-to-add-firim-version-updatelog-in-flowci/)可以自定义 Fir 的更新日志，无非就是两部（看新UI下截图）：

- 在 “fir.im 上传插件” 前面添加一个 “自定义脚本” 插件
- 在 “自定义脚本” 插件中 `export` 一个 `FLOW_FIR_CHANGELOG` 变量

如：`export FLOW_FIR_CHANGELOG="update at $(date) flow.ci"`，然后保存就OK了。

[![]({{ IMAGE_PATH }}2017/07/flowci-fir-1.png)]({{ IMAGE_PATH }}2017/07/flowci-fir-1.png) 

## 使用git的最后commit内容

虽然自定义了更新日志，但是内容只有个更新日期是没什么用的，测试时候不知道版本更新的内容就不知道测试的重点，最好就是把 git 上最后的commit message 作为日志，这样又简单又高效。

既然是 bash 环境变量就好办了，使用这个命令就能拿到最后一条 commit 内容：`git log --oneline -n 1`，具体的用法可以看 git 的文档，把这个命令的返回值赋给 `FLOW_FIR_CHANGELOG` 就OK啦。

所以上面的“自定义脚本”的内容就变成了： `export FLOW_FIR_CHANGELOG=$(git log --oneline -n 1)`

[![]({{ IMAGE_PATH }}2017/07/flowci-fir-2.png)]({{ IMAGE_PATH }}2017/07/flowci-fir-2.png) 

官方文档给出更好的版本：`export CHANGE_LOG=$(git log --pretty=format:"%s" -1 $describe)`，这也就只有文字内容了

## 效果

这样就大功告成，效果如下：

[![]({{ IMAGE_PATH }}2017/07/flowci-fir-3.png)]({{ IMAGE_PATH }}2017/07/flowci-fir-3.png) 

## 参考资料

- [git-log](https://git-scm.com/docs/git-log)
- [flow.ci博客](http://blog.flow.ci/)
