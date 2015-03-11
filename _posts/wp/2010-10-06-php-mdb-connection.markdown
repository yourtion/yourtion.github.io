---
author: Yourtion
comments: true
date: 2010-10-06 06:02:26+00:00
excerpt: 因为之前做的PingSwitch要做一个WEB展示的前端，因为一开始用了Delphi和access的结构，而Delphi与MySQL的连接又相对麻烦，最后只能选择用PHP+Access的组合，比较奇怪，但是也合理·····在PHP中连接access数据库的话我们必须ADO来连接，这跟ASP中连接数据库非常的类似。下边给出了一段DEMO供大家参考。
layout: post
slug: php-mdb-connection
title: PHP连接mdb数据库
wordpress_id: 1546
categories:
- PHP
tags:
- Access
- PHP
---
{% include JB/setup %}

因为之前做的PingSwitch要做一个WEB展示的前端，因为一开始用了Delphi和access的结构，而Delphi与MySQL的连接又相对麻烦，最后只能选择用PHP+Access的组合，比较奇怪，但是也合理·····

在PHP中连接access数据库的话我们必须```ADO```来连接，这跟ASP中连接数据库非常的类似。下边给出了一段DEMO供大家参考。

```php
<?PHP
/*
创建ADO连接
*/
$conn = @new COM("ADODB.Connection") or die ("ADO Connection faild.");
$connstr = "DRIVER={Microsoft Access Driver (*.mdb)}; DBQ=" . realpath("DATUM/cnbt.mdb");
$conn->Open($connstr);
/*
创建记录集查询
*/
$rs = @new COM("ADODB.RecordSet");
$rs->Open("select * from dbo_dirs",$conn,1,3);
/*
循环读取数据
*/
while(!$rs->eof){
	echo "$rs->Fields["title"]->Value;
	echo "<br/>";
	$rs->Movenext(); //将记录集指针下移
}
$rs->close();
?>
```

这样运行就没问题了····
