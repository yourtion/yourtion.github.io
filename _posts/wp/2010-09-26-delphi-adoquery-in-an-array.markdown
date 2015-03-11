---
author: Yourtion
comments: true
date: 2010-09-26 08:01:44+00:00
layout: post
slug: delphi-adoquery-in-an-array
title: Delphi利用ADOQuery将SQL查询结果存放到数组
wordpress_id: 1520
categories:
- Delphi
tags:
- Access
- Delphi
---
{% include JB/setup %}

最近在用Delphi做交换机存活测试软件~因为要将Access数据库中的IP地址表等导入数组~研究了一下~大家分享一下~~

比如 select B from A ，把查询的字段B放到一个数组中（假设是字符型的）：

```delphi
procedure TForm1.Button1Click(Sender: TObject);
var
	A: Array of String;//定义动态数组
	Index: Integer;//定义数组下标变量
	begin ADOQuery.SQL.Clear;
		ADOQuery.SQL.Add('Select B from A');
		ADOQuery.Open;
		Setlength(A,ADOQuery.RecordCount); //设置数组宽度
		Index := 0;//初始化下标
		ADOQuery.First;
		While Not ADOQuery.Eof Do //数据集循环
			begin
				A[Index] := ADOQuery.FieldByName('B').asString;//数据添加到数组中 Inc(Index);
				ADOQuery.Next;
			end;
	end;
```

