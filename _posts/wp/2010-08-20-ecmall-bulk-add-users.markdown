---
author: Yourtion
comments: true
date: 2010-08-20 15:54:54+00:00
excerpt: 最近在做Showbox的job，用ECmall做的商城。因为商家那边要求要批量添加店里的用户，但是后台没有这样的功能，也就只有从sql那边下手。顺便温习一下Excel和SQL。
layout: post
slug: ecmall-bulk-add-users
title: ECmall批量添加用户
wordpress_id: 1478
categories:
- 康盛
tags:
- Ecmall
- SQL
---
{% include JB/setup %}

最近在做Showbox的job，用ECmall做的商城。因为商家那边要求要批量添加店里的用户，但是后台没有这样的功能，也就只有从sql那边下手。顺便温习一下Excel和SQL。

经过研究他的数据库结构，终于得到了要添加的SQL语句，结果在前台发现登录不了。才知道密码忘了用MD5去加密。

最后用语句：

```sql
INSERT INTO jcom_mall.ecm_member VALUES (NULL , 'yourtion', 'mail@yourtion.com', '5fa2db591ebb44529673957ed8b738fc', '', '0', NULL , NULL , NULL , NULL , NULL , NULL , NULL , NULL , '0', NULL , NULL , '0', '0', NULL , '0', NULL , '');
```

添加好用户，然后是用Excel表格进行用户名等数据的代入和SQL语句的生成，查了不少资料和尝试多次之后得出语句:

```sql
CONCATENATE("INSERT INTO jcom_mall.ecm_member VALUES (NULL , '",A1,"', 'mail@yourtion.com', '5fa2db591ebb44529673957ed8b738fc', '', '0', NULL , NULL , NULL , NULL , NULL , NULL , NULL , NULL , '0', NULL , NULL , '0', '0', NULL , '0', NULL , '');")
```

其中“```A1```”就是用户名所在列，其他用户信息忽略，等用户第一次登陆更改密码和其信息时候更改，你也可以在Excel上面写好按照",```A1```,"的形式导入语句。

希望你能举一反三，有空我会找一些关于SQL和Excel的资料，希望对你有帮助～
