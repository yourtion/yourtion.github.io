---
author: Yourtion
comments: true
date: 2011-07-21 15:14:47+00:00
excerpt: 最近有开始做一个实验室管理系统，因为分了几个表进行存储·所以要维护表间的关联··研究了一下MySQL的外键。
layout: post
slug: mysql-foreign-key-summary
title: MySQL外键使用总结
wordpress_id: 2321
categories:
- PHP
tags:
- MySql
---
{% include JB/setup %}

最近有开始做一个实验室管理系统，因为分了几个表进行存储·所以要维护表间的关联··研究了一下MySQL的外键。

（1）只有```InnoDB```类型的表才可以使用外键，mysql默认是```MyISAM```，这种类型不支持外键约束

（2）外键的好处：可以使得两张表关联，保证数据的一致性和实现一些级联操作；

（3）外键的作用：

	保持数据一致性，完整性，主要目的是控制存储在外键表中的数据。 使两张表形成关联，外键只能引用外表中的列的值！

（4）建立外键的前提：

* 两个表必须是InnoDB表类型。
* 使用在外键关系的域必须为索引型(Index)。
* 使用在外键关系的域必须与数据类型相似

（5）创建的步骤

指定主键关键字： ```foreign key```(列名)

引用外键关键字： ```references``` <外键表名>(外键列名)

（6）事件触发限制:``` on delete```和```on update``` , 可设参数```cascade```(跟随外键改动), ```restrict```(限制外表中的外键改动),```set Null```(设空值）,```set Default```（设默认值）,[默认]```no action```

（7）举例

```outTable```表 主键 ```id``` 类型 ```int```

创建含有外键的表：

```sql
create table temp(
id int,
name char(20),
foreign key(id) references outTable(id) on delete cascade on update cascade);
```

说明：把```id```列 设为外键 参照外表```outTable```的```id```列 当外键的值删除 本表中对应的列筛除 当外键的值改变 本表中对应的列值改变。

```sql
create table temp( id int, name char(20), foreign key(id) references outTable(id) on delete cascade on update cascade);
```

缺点：在对MySQL做优化的时候类似查询缓存，索引缓存之类的优化对InnoDB类型的表是不起作用的，还有在数据库整体架构中用得同步复制也是对InnoDB类型的表不生效的，像数据库中核心的表类似商品表请大家尽量不要是使用外键，如果同步肯定要同步商品库的，加上了外键也就没法通不了，优化也对它没作用，岂不得不偿失，做外键的目的在于保证数据完整性，请大家通过程序来实现这个目的而不是外键，切记！

来自：http://qubaoquan.blog.51cto.com/1246748/292861
