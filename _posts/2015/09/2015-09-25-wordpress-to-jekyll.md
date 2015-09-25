---
layout: post
date: 2015-09-25 18:02:04
slug: wordpress-to-jekyll
title: "迁移WordPress到Jekyll"
author: Yourtion
keywords: ["wordpress","Jekyll"]
description: ""
category: "Jekyll"
tags: ["wordpress"]
---
{% include JB/setup %}


之前发布了 [《博客正式从Wordpress迁移到Jekyll》](http://blog.yourtion.com/blog-from-wordpress-to-jekyll.html) 有网友问到迁移过程，我也就大概整理一下，发上，希望对大家能有帮助，如果有什么疑问也欢迎大家提出来，我会详细解答。

## 搭建Jekyll本机环境

主要是用于在迁移过程中对主题，文档，链接等进行测试，不需要每点更改都 Push 到 GitHub Pages 。

安装过程参考：http://jekyllcn.com/docs/installation/

- 安装 RubyGems ： http://rubygems.org/pages/download
- 安装 Jekyll ： `gem install jekyll`
- 创建博客 ： `jekyll new blog`
- 运行 ： `cd blog && jekyll serve`

这样你就在本机运行了 Jekyll ，通过 http://localhost:4000/ 访问

## 导出WordPress数据

首先，在 WordPress 后台 -> 工具 -> 导出。即可导出并下载包含全部文章、页面、评论、自定义栏目、分类目录和标签的 xml 文件。

将原有 WordPress 的 `uploads` 目录下载到本地。

## 将xml转成Markdown

使用 `exitwp` https://github.com/yourtion/exitwp ，这个是我根据自己需求修改过的版本，主要添加：

1. 在导出 Markdown 文件头部加入 `{% include JB/setup %}`
2. 将 `<pre>` 标签 转换为三个 ` （也就是 Markdown 中的源码标识）
3. 将原有图片绝对链接`'http://blog.yourtion.com/wp-content/uploads/'` 转成 `'{{ IMAGE_PATH }}'` 标识（用于CDN等配置）

如果你不需要这些更改，可以使用原版 ：https://github.com/thomasf/exitwp

然后将导出的 xml 放入 `wordpress-xml` 目录中，运行 `python exitwp.py` 即可将 xml 转成 Markdown

## 迁移数据到Jekyll

将导出的文章 Markdown 文件放入刚刚新建的 blog 目录下的 `_posts` 中，WordPress 的 `uploads` 改名为 `images` 放入 blog 的根目录。运行即可看到文章已经迁移成功。

关于图片的路径问题，如果你使用我的 `exitwp` 进行转换，可以参考我博客的源码 ：https://github.com/yourtion/yourtion.github.io/blob/master/_includes/JB/setup

创建 `_includes/JB/setup` 文件，加入以下代码：

```
{% raw %}
{% capture jbcache %}
  {% if site.JB.IMAGE_PATH %}
    {% assign IMAGE_PATH = site.JB.IMAGE_PATH %}
  {% else %}
    {% capture IMAGE_PATH %}{{ BASE_PATH }}/images/{% endcapture %}
  {% endif %}
{% endcapture %}
{% assign jbcache = nil %}
{% endraw %}
```

## 部署到GitHub

参考 ：http://jekyllcn.com/docs/github-pages/

当然，迁移后最好是先在本地进行测试，修正一些转换过程中的问题再 Push 到 GitHub 上比较好。
