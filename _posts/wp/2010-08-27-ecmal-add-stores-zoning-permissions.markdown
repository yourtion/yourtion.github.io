---
author: Yourtion
comments: true
date: 2010-08-27 07:51:41+00:00
excerpt: ShowBox的商城基本进入尾声。前段时间介绍了《ECmall批量添加用户》。但是发现后台没办法批量添加商城，所以又花了一个晚上研究在SQL中添加商城，包括分区和权限。
layout: post
slug: ecmal-add-stores-zoning-permissions
title: Ecmal批量添加商店（包括分区和权限）
wordpress_id: 1502
categories:
- 康盛
tags:
- SQL
---
{% include JB/setup %}

ShowBox的商城基本进入尾声。前段时间介绍了[《ECmall批量添加用户》](/ecmall-bulk-add-users.html)。

但是发现后台没办法批量添加商城，所以又花了一个晚上研究在SQL中添加商城，包括分区和权限。

首先用这个语句在Excel的A1中调用商店名和店主名，在B1调用店主id生成加入开通商城的代码：

```sql
CONCATENATE(INSERT INTO `ecm_store` VALUES (",B1,"', '",A1,"', '",A1,"', '', NULL , '', '', '', '', '1', '', '0', '0.00', NULL , '1', '', '1282202793', '0', NULL , '14', '1', '', NULL , NULL , NULL , '', '', '', '', '', '');
```

```sql
INSERT INTO `ecm_store` VALUES ('14', 'A101', 'A101', '', NULL , '', '', '', '', '1', '', '0', '0.00', NULL , '1', '', '1282202793', '0', NULL , '14', '1', '', NULL , NULL , NULL , '', '', '', '', '', '');
```

然后生成之后发现 商城分区不是在商店的表里面设置的，又研究了分区和商店的关系表。用Excel语句在B1调用```商店id```在C1调用```分区id```生产SQL语句：

```sql
CONCATENATE(INSERT INTO `ecm_category_store` (`cate_id`, `store_id`) VALUES ('",c1,"', '",B1,"');

INSERT INTO `ecm_category_store` (`cate_id`, `store_id`) VALUES ('1', '14');
```


本来以为这样就可以，结果早上他们测试之后发现权限不对～所以又重新研究了权限那一块，得出我们用的是all权限，所以用Excel的语句在D1里面调用```用户id```和```商店id```（我两个是一样的）：

```sql
CONCATENATE("INSERT INTO  `ecm_user_priv` (  `user_id` ,  `store_id` ,  `privs` ) VALUES ('",D1,"',  '",D1,"',  'all');"

INSERT INTO  `ecm_user_priv` (  `user_id` ,  `store_id` ,  `privs` ) VALUES ('",14,"',  '",14,"',  'all');
```

最后就可以正常使用了··就这样添加了300多个用户···
