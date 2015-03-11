---
author: Yourtion
comments: true
date: 2011-02-08 08:34:08+00:00
excerpt: 又是一个安全性的更新，还是直接在后台升级更新就OK。
layout: post
slug: wordpress-upgrade-3-0-5
title: WordPress升级3.0.5
wordpress_id: 1906
categories:
- 博客大事记
tags:
- WordPress 升级
---
{% include JB/setup %}

又是一个安全性的更新，还是直接在后台升级更新就OK。

在3.0.5版本中，数据库模块的版本号(db_version in wp_options)依旧是15477。


<blockquote>

> 
> Summary
* Fix XSS bug: Properly encode title used in Quick/Bulk Edit, and offer additional saniziation to various fields. Affects users of the Author or Contributor role. (r17397, r17406, r17412)
* Fix XSS bug: Preserve tag escaping in the tags meta box. Affects users of the Author or Contributor role. (r17401)
* Fix potential information disclosure of posts through the media uploader. Affects users of the Author role. (r17393)
* Enhancement: Force HTML filtering on comment text in the admin (r17400)
* Enhancement: Harden check_admin_referer() when called without arguments, which plugins should avoid. (r17387)
* Update the license to GPLv2 (or later) and update copyright information for the KSES library.
> 
> </blockquote>
