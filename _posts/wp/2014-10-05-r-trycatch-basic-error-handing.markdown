---
author: Yourtion
comments: true
date: 2014-10-05 05:16:41+00:00
excerpt: 捕获错误然后处理了就OK，最简单的莫过于tryCatch了。R中的tryCatch使用方法如下
layout: post
slug: r-trycatch-basic-error-handing
title: R语言使用tryCatch进行简单的错误处理
wordpress_id: 4048
categories:
- R
tags:
- 错误处理
---
{% include JB/setup %}

最近在看《机器学习：实用案例解析》，做邮件过滤器的时候，参考书中的代码读取邮件文件进行分类器训练，在读取过程中会出现下面的错误：

```default
seq.default(which(text == "")[1] + 1, length(text), 1)
: 'from' cannot be NA, NaN or infinite
```

看了一下，应该是读取文件的时候文件编码的问题，具体锁定的代码如下：

```r
get.msg <- function(path)
{
  con <- file(path, open = "rt", encoding = "latin1")
  text <- readLines(con)
  msg <- text[seq(which(text == "")[1] + 1, length(text), 1)]
  close(con)
  return(paste(msg, collapse = "\n"))
}
```

懒得去研究是哪里的问题，加上我也是刚刚学习R，最简单的方法就是做一个错误处理，捕获错误然后处理了就OK，最简单的莫过于tryCatch了。找了一下，R中的tryCatch使用方法如下：

```r
result = tryCatch({
    expr
}, warning = function(w) {
    warning-handler-code
}, error = function(e) {
    error-handler-code
}, finally = {
    cleanup-code
}
```

接下来就很简单了，把代码修改为下面的形式，问题解决：

```r
get.msg <- function(path)
{
  con <- file(path, open = "rt", encoding = "latin1")
  text <- readLines(con)
  msg <- tryCatch({
    text[seq(which(text == "")[1] + 1, length(text), 1)]
  }, error = function(e) {
    ""
  })
  close(con)
  return(paste(msg, collapse = "\n"))
}
```

总的来说，遇到这个问题我只是用来最简单的方法跳过去了，如果是在真实的项目中，可能就需要去排查具体的问题，tryCatch只是用来预防一些极个别的错误情况用的方法。
