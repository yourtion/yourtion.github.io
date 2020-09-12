---
layout: post
date: 2020-09-12 11:53:53 +0800
slug: fix-cloudera-scm-server-start-failed
title: "解决 CDH6 启动 cloudera-scm-server 失败问题"
author: Yourtion
keywords: ["cloudera","CDH6"]
description: "解决 CentOS7下 CDH6 启动 cloudera-scm-server 失败无任何提示的问题"
category: "解决问题"
tags: ["CDH"]
img: 2020/09/fix-cloudera-scm-server-start-failed-1.jpg
---
{% include JB/setup %}


最近尝试在 CentOS7 上使用 Cloudera CM 搭建 CDH6 的集群，安装好了`cloudera-manager-daemons`、`cloudera-manager-agent`、`cloudera-manager-server` 后，通过`systemctl start cloudera-scm-server`，一直没有成功启动服务。

看到的都报错的信息：

[![]({{ IMAGE_PATH }}2020/09/fix-cloudera-scm-server-start-failed-1.jpg)]({{ IMAGE_PATH }}2020/09/fix-cloudera-scm-server-start-failed-1.jpg)

> ● cloudera-scm-server.service - Cloudera CM Server Service
>    Loaded: loaded (/usr/lib/systemd/system/cloudera-scm-server.service; enabled; vendor preset: disabled)
>    Active: failed (Result: start-limit) since Thu 2020-09-10 17:03:36 CST; 4s ago
>   Process: 5045 ExecStart=/opt/cloudera/cm/bin/cm-server (code=exited, status=1/FAILURE)
>   Process: 5042 ExecStartPre=/opt/cloudera/cm/bin/cm-server-pre (code=exited, status=0/SUCCESS)
>  Main PID: 5045 (code=exited, status=1/FAILURE)

> Sep 10 17:03:36 cdh1 systemd[1]: cloudera-scm-server.service: main process exited, code=exited, status=1/FAILURE
> Sep 10 17:03:36 cdh1 systemd[1]: Unit cloudera-scm-server.service entered failed state.
> Sep 10 17:03:36 cdh1 systemd[1]: cloudera-scm-server.service failed.
> Sep 10 17:03:36 cdh1 systemd[1]: cloudera-scm-server.service holdoff time over, scheduling restart.
> Sep 10 17:03:36 cdh1 systemd[1]: Stopped Cloudera CM Server Service.
> Sep 10 17:03:36 cdh1 systemd[1]: start request repeated too quickly for cloudera-scm-server.service
> Sep 10 17:03:36 cdh1 systemd[1]: Failed to start Cloudera CM Server Service.
> Sep 10 17:03:36 cdh1 systemd[1]: Unit cloudera-scm-server.service entered failed state.
> Sep 10 17:03:36 cdh1 systemd[1]: cloudera-scm-server.service failed.

而且没有任何更多的日志，包括`/var/log/cloudera-scm-server/`目录也没有任何文件。

然后通过命令`journalctl -xe`发现了一些端倪，提示`JAVA_HOME`找不到，但是我明明已经安装过了jdk，使用`java -version`也可以正常列出版本信息，怎么还会找不到呢？之后在一个脚本文件中找到了些答案，原来程序默认会去使用`/usr/java`下的jdk，所以解决办法执行以下两条命令即可：

```
mkdir -p /usr/java
ln -s /opt/java/  /usr/java/default
```

再次执行就能正常的启动了：

> systemctl status cloudera-scm-server
> ● cloudera-scm-server.service - Cloudera CM Server Service
>    Loaded: loaded (/usr/lib/systemd/system/cloudera-scm-server.service; enabled; vendor preset: disabled)
>    Active: active (running) since Thu 2020-09-10 17:08:18 CST; 3s ago
>   Process: 5098 ExecStartPre=/opt/cloudera/cm/bin/cm-server-pre (code=exited, status=0/SUCCESS)
>  Main PID: 5101 (java)
>    CGroup: /system.slice/cloudera-scm-server.service

**同时注意的是，集群内其他已经安装 Java 的机器也建议这样操作**，因为 CDH 在安装过程也会检查集群内各个机器的环境情况，如果机器只是安装了 Java 并配合环境变量，但是`/usr/java`没有信息的话，检测也会提示机器没有 Java 环境的。