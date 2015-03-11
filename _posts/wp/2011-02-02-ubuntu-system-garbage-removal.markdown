---
author: Yourtion
comments: true
date: 2011-02-02 12:22:27+00:00
layout: post
slug: ubuntu-system-garbage-removal
title: ubuntu系统垃圾清除
wordpress_id: 1892
categories:
- VPS
tags:
- Ubuntu
---
{% include JB/setup %}

sudo apt-get autoclean清理旧版本的软件缓存
sudo apt-get clean清理所有软件缓存
sudo apt-get autoremove删除系统不再使用的孤立软件
sudo dpkg -l |grep ^rc|awk '{print $2}' |sudo xargs dpkg -P 清除已删除包的残馀配置文件
