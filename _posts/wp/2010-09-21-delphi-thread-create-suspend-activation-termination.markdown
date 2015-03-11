---
author: Yourtion
comments: true
date: 2010-09-21 03:36:55+00:00
excerpt: 因为在做PingSwitch项目时发现在Ping交换机做循环的时候界面会死掉~老师说那要使用线程来做就不会~因为不用涉及线程间的数据同步~所以就最简单实用的就足够了·····找了好多教程，都是很复杂的···看到个简单的，大家分享一下。
layout: post
slug: delphi-thread-create-suspend-activation-termination
title: Delphi线程简单创建、挂起、激活与终止
wordpress_id: 1529
categories:
- Delphi
tags:
- Delphi
---
{% include JB/setup %}

因为在做PingSwitch项目时发现在Ping交换机做循环的时候界面会死掉~老师说那要使用线程来做就不会~

因为不用涉及线程间的数据同步~所以就最简单实用的就足够了·····找了好多教程，都是很复杂的···看到个简单的，大家分享一下。

```delphi
unit Unit1;

interface

uses
Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
Dialogs, StdCtrls;

type
	TForm1 = class(TForm)
	Button1: TButton;
	Button2: TButton;
	Button3: TButton;
	Button4: TButton;
	procedure Button1Click(Sender: TObject);
	procedure Button2Click(Sender: TObject);
	procedure Button3Click(Sender: TObject);
	procedure Button4Click(Sender: TObject);
	private
	{ Private declarations }
	public
	{ Public declarations }
	hThread:Thandle;//定义一个句柄
	ThreadID:DWord;
end;

var
Form1: TForm1;

implementation

{$R *.dfm}
function MyThreadFunc(P:pointer):Longint;stdcall;
	var
	i:longint;
	DC:HDC;
	S:string;
	begin
		DC:=GetDC(Form1.Handle);
		for i:=0 to 500000 do begin
		S:=Inttostr(i);
		Textout(DC,10,10,Pchar(S),length(S));
	end;
	ReleaseDC(Form1.Handle,DC);
end;

procedure TForm1.Button1Click(Sender: TObject);
begin
	//创建线程，同时线程函数被调用
	hthread:=CreateThread(nil,0,@MyThreadfunc,nil,0,ThreadID);
end;

procedure TForm1.Button2Click(Sender: TObject);
begin
	SuspendThread(hThread); //挂起线程
end;

procedure TForm1.Button3Click(Sender: TObject);
begin
	ResumeThread(hThread); // 激活线程
end;

procedure TForm1.Button4Click(Sender: TObject);
begin
	TerminateThread(hThread,0); //　终止线程
end;

end.
```
