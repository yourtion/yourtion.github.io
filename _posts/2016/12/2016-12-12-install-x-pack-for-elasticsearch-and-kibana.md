---
layout: post
date: 2016-12-12 12:03:20 +0800
slug: install-x-pack-for-elasticsearch-and-kibana
title: "给Elasticsearch和Kibana安装X-Pack"
author: Yourtion
keywords: ["Elasticsearch", "Kibana","X-Pack"]
description: "使用X-Pack免费授权里面提供的监控功能监控Elasticsearch集群和Kibana"
category: "服务器"
tags: ["ELK"]
---
{% include JB/setup %}

刚刚把之前的 ELK 集群化，想到还是做一下监控比较好，因为已经都升级到了 `5.x`，所以决定使用官方的 `X-Pack` 来，因为 `X-Pack` 在免费授权里面提供了监控功能（也指提供了监控功能）。

上个图：

[![]({{ IMAGE_PATH }}2016/12/x-pack-1.png)]({{ IMAGE_PATH }}2016/12/x-pack-1.png)

ELK 都通过 `yum` 安装在 `CentOS 7.2` 的机器上。

- `Elasticsearch` 被安装在 `/usr/share/elasticsearch`
- `Kibana` 被安装在 `/usr/share/kibana/`

## 下载

因为在国内直接通过网络安装速度实在是太慢了（你懂的），无法忍受，所以先把 X-Pack 下载到本地的 `/tmp` 目录。

```bash
$ wget wget https://artifacts.elastic.co/downloads/packs/x-pack/x-pack-5.1.1.zip /tmp
```

这样就能直接离线安装了。

## 安装

直接安装下载到 `/tmp/x-pack-5.1.1.zip` 的安装包。

### Elasticsearch

**注意：集群中的每台 `Elasticsearch` 都是需要安装的**

```bash
$ /usr/share/elasticsearch/bin/elasticsearch-plugin install file:///tmp/x-pack-5.1.1.zip
```

### Kibana

**注意：只需要安装在 `Kibana` 对应的机器上**

```bash
$ /usr/share/kibana/bin/kibana-plugin install file:///tmp/x-pack-5.1.1.zip
```

## 配置

因为打算使用免费授权来进行监控，所以一开始就只打开 `Monitoring` 直接关掉了其他免费授权不提供的功能，例如：`Security`、`Graph`、`Watche`、`Reporting`。

### Elasticsearch

给 Elasticsearch 的配置文件添加下面的内容：

*路径： `/etc/elasticsearch/elasticsearch.yml`*

```yaml
# x-pack
xpack.security.enabled: false
xpack.monitoring.enabled: true
xpack.graph.enabled: false
xpack.watcher.enabled: false
```

### Kibana

给 Kibana 的配置文件添加下面的内容：

*路径： `/etc/kibana/kibana.yml`*

```yaml
# x-pcak
xpack.security.enabled: false
xpack.monitoring.enabled: true
xpack.graph.enabled: false
xpack.reporting.enabled: false
```

### 重启服务

现在安装和配置都已经完成，只需要重启服务就OK了。

**注意：`Kibana` 重启时间比较长，貌似需要生成静态文件缓存**

```bash
$ systemctl restart elasticsearch
$ systemctl restart kibana
```
## 授权

虽然只是使用免费授权，还是需要去注册才能拿到授权文件，直接在 `Kibana` 中进入 `/app/monitoring` 应该会看到试用授权过期时间的提示，点击进入后：

[![]({{ IMAGE_PATH }}2016/12/x-pack-3.png)]({{ IMAGE_PATH }}2016/12/x-pack-3.png)

可以在 `Get Base` 进入网站完成注册，最后会给你的邮箱发一个邮件，下载对应的 json 文件即可，假设下载的文件为 `license.json` 放在 `/tmp/license.json` 中。

**注意：集群中的每台 `Elasticsearch` 都是需要执行，同时记得文件前面的 `@` 符号**

```bash 
$ curl -XPUT -u elastic 'http://SID-HZ-ES1:9200/_xpack/license?acknowledge=true' -d @/tmp/license.json
```

因为是免费授权，才需要加上 `acknowledge=true` 参数。

享受你的 Monitoring 之旅吧。

[![]({{ IMAGE_PATH }}2016/12/x-pack-2.png)]({{ IMAGE_PATH }}2016/12/x-pack-2.png)
