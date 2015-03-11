---
author: Yourtion
comments: true
date: 2012-07-05 15:36:27+00:00
excerpt: PHP中使用MySQL按照多字段Orderby及问题解决
layout: post
slug: mysql-orderby-problem-solve
title: PHP中使用MySQL按照多字段排序及问题解决
wordpress_id: 3684
categories:
- PHP
tags:
- MySql
---
{% include JB/setup %}

因为在做一个项目需要筛选掉一部分产品列表中的产品，使其在列表显示时排在最后，但是所有产品都要按照更新时间排序。

研究了一下系统的数据库结构后，决定将要排除到后面的产品加为粗体，这样在数据库中的“```ifbold```”就会被标记为1，而其他产品就默认标记为0，然后就打算使用MySQL在```Order By```时进行多字段排序。

```Order by```的多条件分割一般使用英文逗号分割，所以我测试的SQL如下：

```sql
select * from {P}_product_con where $scl order by 'ifbold' asc,$myord desc limit $pagelimit"
```

但是运行后没有将”```ifbold```“正序，但是单纯正序”```ifbold```“却正常，调试了N久，无意中在phpMyAdmin中运行却发现正常，仔细比对后发现问题原来是来自于”```ifblod```“的引号上。改为下列语句就正常了：

```sql
select * from {P}_product_con where $scl order by `ifbold` asc,$myord desc limit $pagelimit
```

所以以后大家再程序中写SQL语句时也要注意引号的问题哦！
