---
author: Yourtion
comments: true
date: 2014-01-10 02:35:42+00:00
excerpt: Twister出现stack smashing detected解决方法，是因为空间分配不足导致内存溢出，是使用了GCC的“ -fstack-protector"参数导致的。
layout: post
slug: twister-stack-smashing-detected-solution
title: Twister出现stack smashing detected解决方法
wordpress_id: 3954
categories:
- 电脑技巧
tags:
- Twister
---
{% include JB/setup %}

之前的文章介绍了在《[Ubuntu安装使用Twister](/ubuntu-install-twister.html)》，但是安装完成后，特别是加载完```block```就经常会出现：

```*** stack smashing detected ***: ./twisterd terminated```

研究了一下是因为空间分配不足导致内存溢出，是使用了```GCC```的“ ```-fstack-protector```"参数导致的。找了一下，解决方法如下：

在twister的```src```文件夹，编辑“```makefile.uni```x”，如果是其他平台请更换```makefile```的后缀。

注释掉“```HARDENING+=-fstack-protector-all -Wstack-protector```”这一行。

然后用下面命令删除文件并重新编译：

```bash
$ rm -rf ./obj/*
$ rm -rf twisterd
$ make -f makefile.unix
```

之后就可以正常使用了！


