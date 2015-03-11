---
author: Yourtion
comments: true
date: 2012-08-03 03:30:28+00:00
excerpt: 之前已经介绍了《PHPWEB破解安装新模块》的方法破解。我这里再简单的讲一下，结合@天悬星河 找到的在后台添加权限的方法，简化了破解安装的流程。
layout: post
slug: phpweb-module-package-download
title: PHPWEB模块安装包下载（安装方法）
wordpress_id: 3696
categories:
- PHP
tags:
- PHPWEB
---
{% include JB/setup %}

之前已经介绍了[《PHPWEB破解安装新模块》](/phpweb-crack-to-install-module.html)的方法破解。

我这里再简单的讲一下，结合@天悬星河 找到的在后台添加权限的方法，简化了破解安装的流程。

首先解密post.php文件并进行修改，下面是我修改好的```post.php```。替换掉```base\admin```下面的```post.php```

[post.php (18.27K))](http://dl.dbank.com/c0svt1fm14)

在我下面提供的下载链接或到有这个模块的站点拷贝这个模块的文件夹，放到根目录。最后去后台安装这个模块，随便输个用户名和密码，稍后就会提示安装模块成功，在后台也可以看到这个模块。

接下来就是添加权限，在管理员后台的“```设置```”->“```管理帐户维护```”里对要增加权限的管理员点击“```修改权限```”。

[![]({{ IMAGE_PATH }}2012/08/phpweb-model-1.jpg)]({{ IMAGE_PATH }}2012/08/phpweb-model-1.jpg)

进入后会看到你新安装的模块前面没有打勾，全部打上勾，再点“```修改```”就大功告成了！

[![]({{ IMAGE_PATH }}2012/08/phpweb-model-2.jpg)]({{ IMAGE_PATH }}2012/08/phpweb-model-2.jpg)

各个模块下载地址（那些一定有的新闻图片页面模块就不提供咯）：

[PHPWEB模块下载](http://dl.dbank.com/c0ofwvbaxn)
