---
layout: post
date: 2018-01-09 09:44:26 +08:00
slug: mysql-like-search-ordering
title: "MySQL对Like搜索结果按照匹配程度排序"
author: Yourtion
keywords: ["MySQL", "like", "ordering"]
description: "MySQL对Like搜索结果按照匹配程度排序，准确匹配的结果没有排在前面。"
category: "解决问题"
tags: ["MySql"]
---
{% include JB/setup %}

最近项目上遇到一个需求，在原来项目的管理后台上，有一个通过用户昵称进行模糊搜索的功能，但是用户反映说有时候搜索关键字的结果比较多的话，准确匹配的结果没有排在前面。

检查了一下后端的代码，发现 `like` 的语句是 `LIKE %keyword%` ，然后排序的就是按照默认的方式，结果如下：

[![]({{ IMAGE_PATH }}2018/01/mysql-like-1.jpg)]({{ IMAGE_PATH }}2018/01/mysql-like-1.jpg) 

可以发现确实完整匹配 “阳光” 关键字的结果是分散的，找了一下解决方案，结果在 stackoverflow 找到这样的一个答案：[MySQL order by “best match”](https://stackoverflow.com/questions/18725941/mysql-order-by-best-match)，里面提出了几个解决方案，经过测试，在其中一个的基础上做了一些修改，得到比较好的结果。

更新后的 SQL 如下：

```
SELECT nickname
FROM customer
WHERE nickname LIKE '%阳光%'
ORDER BY
  CASE
    WHEN nickname LIKE '阳光' THEN 0
    WHEN nickname LIKE '阳光%' THEN 1
    WHEN nickname LIKE '%阳光' THEN 3
    ELSE 2
  END
```

结果如下：

[![]({{ IMAGE_PATH }}2018/01/mysql-like-2.jpg)]({{ IMAGE_PATH }}2018/01/mysql-like-2.jpg) 

使用 `ORDER BY` 并通过 `CASE` 进行判断，来返回排序结果，这样的方法从性能上可能存在问题，但是本身通过 `%keyword%` 查找就没有办法使用索引，而且管理后台的查询量就相对较少，通过上述方法可以很好的解决问题，最重要的是知道了 MySQL 上 `ORDER` 语句的一个新特性。

## 参考

- [MySQL order by “best match”](https://stackoverflow.com/questions/18725941/mysql-order-by-best-match)
