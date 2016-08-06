---
layout: post
date: 2016-08-04 10:56:31 +08:00
slug: fix-jekyll-bootstrap-build-warning
title: "解决 JekyllBootstrap 中 theme.name 出错问题"
author: Yourtion
keywords: ["jekyll","bootstrap","build","page.theme.name","layout.theme.name"]
description: "fix jekyll bootstrap build warning page.theme.name to layout.theme.name"
category: "解决问题"
tags: ["Jekyll"]
---
{% include JB/setup %}

## 起源

自从 GitHub Pages 升级 3.1 之后，我使用 jekyll-bootstrap 的博客在每一次 push 都会收到 GitHub 的 “Page build warning” 邮件，内容如下：

> The page build completed successfully, but returned the following warning:
> 
> You are currently using the Jekyll Bootstrap framework which has a known incompatibility with Jekyll v3.1. To fix this incompatibility, change `page.theme.name` in `_includes/JB/setup` to `layout.theme.name`. 
> 
> Your site may not build properly until this change has been applied. For more information, see http://jekyllrb.com/docs/upgrading/2-to-3/#layout-metadata.
> 
> For information on troubleshooting Jekyll see:
> 
>   https://help.github.com/articles/troubleshooting-jekyll-builds
> 
> If you have any questions you can contact us by replying to this email.

## 疑惑

上面的邮件让我感到很疑惑，因为我在原有的 `_includes/JB/setup` 甚至整个项目就根本没有找到 `page.theme.name` 甚至相关的配置，原来的配置如下：

```ruby
{% raw %}
{% capture jbcache %}
  {% if site.JB.setup.provider == "custom" %}
    {% include custom/setup %}
  {% else %}
    {% if site.safe and site.JB.BASE_PATH and site.JB.BASE_PATH != '' %}
      {% assign BASE_PATH = site.JB.BASE_PATH %}
      {% assign HOME_PATH = site.JB.BASE_PATH %}
    {% else %}
      {% assign BASE_PATH = nil %}
      {% assign HOME_PATH = "/" %}
    {% endif %}
    {% if site.JB.ASSET_PATH %}
      {% assign ASSET_PATH = site.JB.ASSET_PATH %}
    {% elsif site.safe %}
      {% capture ASSET_PATH %}{{ site.cdn_url }}/assets/{% endcapture %}
    {% else %}
      {% capture ASSET_PATH %}{{ BASE_PATH }}/assets/{% endcapture %}
    {% endif %}
    {% if site.JB.IMAGE_PATH %}
      {% assign IMAGE_PATH = site.JB.IMAGE_PATH %}
    {% elsif site.safe %}
      {% capture IMAGE_PATH %}{{ site.cdn_url }}/images/{% endcapture %}
    {% else %}
      {% capture IMAGE_PATH %}{{ BASE_PATH }}/images/{% endcapture %}
    {% endif %}
  {% endif %}
{% endcapture %}{% assign jbcache = nil %}
{% endraw %}
```

可以看到根本没有相关的配置，找了很多资料，最后终于找到了解决的方法。

## 解决

原来在 jekyll-bootstrap 项目有人提交了一个 pull request ： [Update setup to use layout.theme.name instead of page.theme.name if it exists](https://github.com/plusjade/jekyll-bootstrap/commit/8579232806a9f553aed95c85f9888b7e3ac3f76a)

其中可以看到，原来的 `site.JB.ASSET_PATH` 中的 `else` 部分加入了下面代码：

```ruby
{% raw %}
{% if layout.theme.name %}
  {% capture ASSET_PATH %}{{ BASE_PATH }}/assets/themes/{{ layout.theme.name }}{% endcapture %}
{% else %}
  {% capture ASSET_PATH %}{{ BASE_PATH }}/assets/themes/{{ page.theme.name }}{% endcapture %}
{% end %}
{% endraw %}
```

根据上面修改我的配置后，GitHub 就没有给我发 warning 邮件了。修改记录： [update setup](https://github.com/yourtion/yourtion.github.io/commit/4b5ddb61fbf852c91eeada399792517472d0a779)





