---
author: Yourtion
comments: true
date: 2010-10-03 05:21:50+00:00
excerpt: 因为开始做IP设置程序~把每一栋楼划分为一个表~也就在一开始的时候要历遍数据库中的所有表来获得下拉菜单的选项，找了一些资料，结果如下：
layout: post
slug: delphi-get-access-table-name
title: Delphi获取Access中的表名
wordpress_id: 1534
categories:
- Delphi
tags:
- Access
- Delphi
---
{% include JB/setup %}

因为开始做IP设置程序~把每一栋楼划分为一个表~也就在一开始的时候要历遍数据库中的所有表来获得下拉菜单的选项，找了一些资料，结果如下：

```
//声明变量：
lString,lTableName:TStrings;
//-----------获取表名信息-------------
lString:=TStringList.Create;
lTableName:=TStringList.Create;
DM_Conn.con_Access.GetTableNames(lString,True);
for i:=0 to lString.Count-1 do
begin
if (lString.Strings[i]<>'MSysACEs')
and (lString.Strings[i]<>'MSysObjects')
and (lString.Strings[i]<>'MSysQueries')
and (lString.Strings[i]<>'MSysRelationships') then
lTableName.Add(lString.Strings[i]);
end;
我最终使用的代码如下：
procedure TForm1.FormCreate(Sender: TObject);
var
//声明变量：
lString:TStrings;
i:Integer;
Begin
//-----------获取表名信息-------------
lString:=TStringList.Create;
form1.ADOConnection1.GetTableNames(lString,True);
for i:=0 to lString.Count-1 do
begin
if (lString.Strings[i]<>'MSysACEs')
and (lString.Strings[i]<>'MSysObjects')
and (lString.Strings[i]<>'MSysQueries')
and (lString.Strings[i]<>'MSysRelationships') then
form1.combobox1.Items.Add(lString.Strings[i]);
End;
button2.Enabled:=false;
end;
procedure TForm1.FormCreate(Sender: TObject);
var//声明变量：
lString:TStrings;
i:Integer;
Begin    //-----------获取表名信息-------------lString:=TStringList.Create;
form1.ADOConnection1.GetTableNames(lString,True);
for i:=0 to lString.Count-1 dobeginif (lString.Strings[i]<>'MSysACEs')and (lString.Strings[i]<>'MSysObjects')and (lString.Strings[i]<>'MSysQueries')and (lString.Strings[i]<>'MSysRelationships') thenform1.combobox1.Items.Add(lString.Strings[i]);
End;
button2.Enabled:=false;
end;
```

