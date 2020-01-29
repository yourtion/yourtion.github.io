---
author: Yourtion
comments: true
date: 2010-12-14 08:08:03+00:00
excerpt: '最近在做一个系统的重构~之前它导入用户名和密码都是要手工黏贴到数据库的~所以想直接用Excel导入，方便用户操作。用Excel导入~在网上搜了很多这方面的资料，发现都是将excel文件另存为csv文件，然后从csv文件导入。这里介绍一个直接将excel文件导入mysql的例子。我花了一晚上的时间测试，无论导入简繁体都不会出现乱码，非常好用。'
layout: post
slug: php-import-excel-to-mysql
title: PHP导入Excel到MySQL
wordpress_id: 1629
categories:
- PHP
tags:
- MySQL
- PHP
---
{% include JB/setup %}

最近在做一个系统的重构~之前它导入用户名和密码都是要手工黏贴到数据库的~所以想直接用Excel导入，方便用户操作。

研究了一下~方法不少~最后决定用Excel导入~在网上搜了很多这方面的资料，发现都是将```excel```文件另存为```csv```文件，然后从```csv```文件导入。这里介绍一个直接将excel文件导入mysql的例子。我花了一晚上的时间测试，无论导入简繁体都不会出现乱码，非常好用。

```PHP-ExcelReader```,下载地址: http://sourceforge.net/projects/phpexcelreader

说明：

PHP将EXCEL导入MYSQL的测试环境：MYSQL数据库采用```utf8```编码.导入EXCEL文档是```xls```格式,经过测试，```xlsx``` 格式[excel 2007]也OK.

请替换成你配置好的数据，如数据库配置等。运行http://localost/test.php实现导入。

以下是我贴出的详细代码，其中```test.php```为我写的测试文件，```reader.php```和```oleread.inc```文件是从上面提供的网址中下载的。

1. PHP将EXCEL导入MYSQL的代码示例```test.php```

```php
< ?php 
require_once 'reader.php'; // ExcelFile($filename, $encoding); 
$data = new Spreadsheet_Excel_Reader(); // Set output Encoding. 
$data->setOutputEncoding('gbk');
//”data.xls”是指要导入到mysql中的excel文件
$data->read('data.xls');
@$db = mysql_connect('localhost', 'root', '123456') or
die("Could not connect to database.");//连接数据库
mysql_query("set names 'gbk'");//输出中文
mysql_select_db('mydb'); //选择数据库
error_reporting(E_ALL ^ E_NOTICE);
for ($i = 1; $i <= $data->sheets[0]['numRows']; $i++) {
	//以下注释的for循环打印excel表数据
	/*
	for ($j = 1; $j < = $data->sheets[0]['numCols']; $j++) {
		echo "\"".$data->sheets[0]['cells'][$i][$j]."\",";
	}
	echo "\n";
*/
//以下代码是将excel表数据【3个字段】插入到mysql中，根据你的excel表字段的多少，改写以下代码吧！
$sql = "INSERT INTO test VALUES('".
$data->sheets[0]['cells'][$i][1]."','".
$data->sheets[0]['cells'][$i][2]."','".
$data->sheets[0]['cells'][$i][3]."')";
echo $sql.'< br />';
$res = mysql_query($sql);
}
?>
```

以上就是PHP将EXCEL导入MYSQL的相关方法介绍，希望多又需要的朋友有所帮助。

但是发现他class里面的文件有点问题，修改了之后就正常了~可以到

[这里下载phpexcelreader](http://dl.dbank.com/c03m2yw4md)
