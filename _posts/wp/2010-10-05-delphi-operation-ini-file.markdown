---
author: Yourtion
comments: true
date: 2010-10-05 10:52:41+00:00
excerpt: 最近在做的IP设置程序~因为有些东西要保存成常量~但是又可能需要进行一些改动~所以就想到了保存到INI配置文件的办法~找了一下教程~还是继续分享~
layout: post
slug: delphi-operation-ini-file
title: Delphi操作ini配置文件
wordpress_id: 1541
categories:
- Delphi
tags:
- Delphi
---
{% include JB/setup %}

最近在做的IP设置程序~因为有些东西要保存成常量~但是又可能需要进行一些改动~所以就想到了保存到INI配置文件的办法~

找了一下教程~还是继续分享~

**一、有必要了解INI文件的结构：**

```ini
;注释
[小节名]
关键字=值
...
```

* INI文件允许有多个小节，每个小节又允许有多个关键字， “=”后面是该关键字的值。
* 值的类型有三种：字符串、整型数值和布尔值。其中字符串存贮在INI文件中时没有引号，布尔真值用1表示，布尔假值用0表示。
* 注释以分号“;”开头。

**二、定义**

1、在Interface的Uses节增加IniFiles；

2、在Var变量定义部分增加一行：

myinifile:Tinifile;

然后，就可以对变量myinifile进行创建、打开、读取、写入等操作了。

**三、打开INI文件**
myinifile:=Tinifile.create('program.ini');

--- 上面这一行语句将会为变量myinifile与具体的文件 program.ini建立联系，然后，就可以通过变量myinifile，来读写program.ini文件中的关键字的值了。

---- 值得注意的是，如果括号中的文件名没有指明路径的话，那么这个Program.ini文件会存储在Windows目录中,把Program.ini文件存储在应用程序当前目录中的方法是：为其指定完整的路径及文件名。下面的两条语句可以完成这个功能：

```
Filename:=ExtractFilePath(Paramstr(0))+'program.ini';
myinifile:=Tinifile.Create(filename);
```

**四、读取关键字的值**

--- 针对INI文件支持的字符串、整型数值、布尔值三种数据类型，TINIfiles类提供了三种不同的对象方法来读取INI文件中关键字的值。

--- 假设已定义变量vs、vi、vb分别为string、 integer、boolean类型。

* vs:=myinifile.Readstring('小节名','关键字',缺省值);
* vi:=myinifile.Readinteger('小节名','关键字',缺省值);
* vb:=myinifile.Readbool('小节名','关键字',缺省值);

--- 其中缺省值为该INI文件不存在该关键字时返回的缺省值。

**五、写入INI文件**

---- 同样的，TInifile类也提供了三种不同的对象方法，向INI文件写入字符串、整型数及布尔类型的关键字。

* myinifile.writestring('小节名','关键字',变量或字符串值);
* myinifile.writeinteger('小节名','关键字',变量或整型数值);
* myinifile.writebool('小节名','关键字',变量或True或False);

---- 当这个INI文件不存在时，上面的语句还会自动创建该INI文件。

**六、删除关键字**

---- 除了可用写入方法增加一个关键字，Tinifile类还提供了一个删除关键字的对象方法：

```myinifile.DeleteKey('小节名','关键字');```

**七、小节操作**

--- 增加一个小节可用写入的方法来完成，删除一个小节可用下面的对象方法：

```myinifile.EraseSection('小节名');```

--- 另外Tinifile类还提供了三种对象方法来对小节进行操作：

--- myinifile.readsection('小节名',TStrings变量);可将指定小节中的所有关键字名读取至一个字符串列表变量中；

--- myinifile.readsections(TStrings变量);可将INI文件中所有小节名读取至一个字符串列表变量中去。

---- myinifile.readsectionvalues('小节名',TStrings变量);可将INI文件中指定小节的所有行（包括关键字、=、值）读取至一个字符串列表变量中去。

**八、释放**

在适当的位置用下面的语句释放myinifile：

```myinifile.distory;```

**九、一个实例**

---- 下面用一个简单的例子(如图)，演示了建立、读取、存贮INI文件的方法。myini.ini文件中包含有“程序参数”小节，和用户名称（字符串）、是否 正式用户（布尔值）和已运行时间（整型值）三个关键字。程序在窗体建立读取这些数据，并在窗体释放时写myini.ini文件

--- 附源程序清单

```delphi
unit Unit1;
interface
uses
Windows, Messages, SysUtils, Classes, Graphics, Controls, Forms, Dialogs,
inifiles, //配置操作文件
StdCtrls, ExtCtrls;
type
	TForm1 = class(TForm)
	Edit1: TEdit;
	CheckBox1: TCheckBox;
	Edit2: TEdit;
	Label1: TLabel;
	Label2: TLabel;
	Timer1: TTimer;
	Label3: TLabel;
	procedure FormCreate(Sender: TObject);
	procedure FormDestroy(Sender: TObject);
	procedure Timer1Timer(Sender: TObject);
	private
	{ Private declarations }
	public
	{ Public declarations }
end;
var
	Form1: TForm1;
	implementation
var
	myinifile:TInifile;
	{$R *.DFM}
procedure TForm1.FormCreate(Sender: TObject);
var
filename:string;
begin
	filename:=ExtractFilePath(paramstr(0))+'myini.ini';
	myinifile:=TInifile.Create(filename);
	edit1.Text:= myinifile.readstring('程序参数','用户名称','缺省的用户名称');
	edit2.text:= inttostr(myinifile.readinteger('程序参数','已运行时间',0));
	checkbox1.Checked:= myinifile.readbool('程序参数','是否正式用户',False);
	end;
	procedure TForm1.FormDestroy(Sender: TObject);
		begin
			myinifile.writestring('程序参数','用户名称',edit1.Text);
			myinifile.writeinteger('程序参数','已运行时间',strtoint(edit2.text));
			myinifile.writebool('程序参数','是否正式用户',checkbox1.Checked);
			myinifile.Destroy;
		end;
		procedure TForm1.Timer1Timer(Sender: TObject);
	begin
		edit2.Text:=inttostr(strtoint(edit2.text)+1);
	end;
end.
```

