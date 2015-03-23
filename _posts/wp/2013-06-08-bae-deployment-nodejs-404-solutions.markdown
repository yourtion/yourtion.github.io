---
author: Yourtion
comments: true
date: 2013-06-08 02:57:48+00:00
excerpt: 最近想试一下百度BAE的Nodejs环境，因为以前在BAE上测试环境什么的都是直接新建版本然后在BAE Code Editor里面写代码然后发布的，这一次想把本地的应用部署到BAE上面去，结果就遇到了问题，访问一直都是404错误，日志里面没有任何提示，研究了很久，终于解决了问题，特此与大家分享，希望对大家有帮助！
layout: post
slug: bae-deployment-nodejs-404-solutions
title: BAE部署Nodejs应用404解决方法
wordpress_id: 3787
categories:
- 云服务
tags:
- 百度云
---
{% include JB/setup %}

最近想试一下百度BAE的Nodejs环境，因为以前在BAE上测试环境什么的都是直接新建版本然后在```BAE Code Editor```里面写代码然后发布的，这一次想把本地的应用部署到BAE上面去，结果就遇到了问题，访问一直都是404错误，日志里面没有任何提示，研究了很久，终于解决了问题，特此与大家分享，希望对大家有帮助！

我一开始使用的是在新建版本时”```上传Node.js代码包```“。把之前写的一个极其简单的```express```示例放上去。


[![版本新建与代码包上传]({{ IMAGE_PATH }}2013/06/pic1.png)]({{ IMAGE_PATH }}2013/06/pic1.png)


然后将版本上线后一直显示404，日志里面除了访问日志之外没有node的任何提示，研究了很久，把能改的东西都改了，还是没有用，用SVN把代码拉到本地运行完全正常。

之后突发奇想要试试官方文档中的```express```示例，又新建了一个版本，用```BAE Code Editor```把官方的示例代码粘进去执行居然一切正常，这让我更加郁闷了，想把代码再拉下来看看，终于发现了问题所在！

新建版本不上传代码包的目录比上传代码包的目录多了几个文件：


[![多出来的文件]({{ IMAGE_PATH }}2013/06/pic2.png)]({{ IMAGE_PATH }}2013/06/pic2.png)

把代码包中的代码拷贝到这个目录，在```push```上去，居然就没问题了，继续研究一番，终于发现问题在```app.conf```上，文件中有下面一段：

```ini
handlers:
  - url : favicon.ico
    script: favicon.ico
  - url : (.*)
    script: $1.nodejs
```

原来上传代码包之后代码包中没有```app.conf```文件，所有```js```文件没有被正确地处理。

只要在原来的代码包中加入```app.conf```文件，```app.js```就会正常地启动监听，至此，问题终于解决了！

希望我的经历对你有帮助。




