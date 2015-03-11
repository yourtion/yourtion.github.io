---
author: Yourtion
comments: true
date: 2010-09-18 06:37:48+00:00
excerpt: 关于delphi实现最简单ping
layout: post
slug: delphi-simplest-ping
title: 关于Delphi实现最简单Ping
wordpress_id: 1515
categories:
- Delphi
tags:
- Delphi
- ping
---
{% include JB/setup %}

## **函数**




<blockquote>procedure pinghost(ip:string;var info:string);
ip:目标ＩＰ地址；
info:ping了以后产生的信息(1)或(2)；
(1)成功信息
ip 发送测试的字符数　返回时间
(2)出错信息
Can not find host!</blockquote>




## 使用方法：




<blockquote>uses ping;

procedure TForm1.Button1Click(Sender: TObject);
var
str:string;
ping:Tping;
begin
ping:=Tping.create ;//一定要初试化哦
ping.pinghost('127.0.0.1',str);
memo1.Lines.Add(str);
ping.destroy ;
end;</blockquote>




## 以下保存为[ping.pas]




<blockquote>unit ping;

interface

uses

Windows, SysUtils, Classes,  Controls, Winsock,
StdCtrls;

type
PIPOptionInformation = ^TIPOptionInformation;
TIPOptionInformation = packed record
TTL: Byte;
TOS: Byte;
Flags: Byte;
OptionsSize: Byte;
OptionsData: PChar;
end;

PIcmpEchoReply = ^TIcmpEchoReply;
TIcmpEchoReply = packed record
Address: DWORD;
Status: DWORD;
RTT: DWORD;
DataSize: Word;
Reserved: Word;
Data: Pointer;
Options: TIPOptionInformation;
end;

TIcmpCreateFile = function: THandle; stdcall;
TIcmpCloseHandle = function(IcmpHandle: THandle): Boolean; stdcall;
TIcmpSendEcho = function(IcmpHandle:THandle;
DestinationAddress: DWORD;
RequestData: Pointer;
RequestSize: Word;
RequestOptions: PIPOptionInformation;
ReplyBuffer: Pointer;
ReplySize: DWord;
Timeout: DWord
): DWord; stdcall;

Tping =class(Tobject)

private
{ Private declarations }
hICMP: THANDLE;
IcmpCreateFile : TIcmpCreateFile;
IcmpCloseHandle: TIcmpCloseHandle;
IcmpSendEcho: TIcmpSendEcho;
public
procedure   pinghost(ip:string;var info:string);
constructor create;
destructor destroy;override;
{ Public declarations }
end;

var
hICMPdll: HMODULE;

implementation

constructor Tping.create;
begin
inherited create;
hICMPdll := LoadLibrary('icmp.dll');
@ICMPCreateFile := GetProcAddress(hICMPdll, 'IcmpCreateFile');
@IcmpCloseHandle := GetProcAddress(hICMPdll,'IcmpCloseHandle');
@IcmpSendEcho := GetProcAddress(hICMPdll, 'IcmpSendEcho');
hICMP := IcmpCreateFile;
end;

destructor Tping.destroy;
begin
FreeLibrary(hIcmpDll);
inherited destroy;
end;

procedure Tping.pinghost(ip:string;var info:string);
var
// IP Options for packet to send
IPOpt:TIPOptionInformation;
FIPAddress:DWORD;
pReqData,pRevData:PChar;
// ICMP Echo reply buffer
pIPE:PIcmpEchoReply;
FSize: DWORD;
MyString:string;
FTimeOut:DWORD;
BufferSize:DWORD;
begin

if ip <> '' then
begin
FIPAddress := inet_addr(PChar(ip));
FSize := 40;
BufferSize := SizeOf(TICMPEchoReply) + FSize;
GetMem(pRevData,FSize);
GetMem(pIPE,BufferSize);
FillChar(pIPE^, SizeOf(pIPE^), 0);
pIPE^.Data := pRevData;
MyString := 'Test Net - Sos Admin';
pReqData := PChar(MyString);
FillChar(IPOpt, Sizeof(IPOpt), 0);
IPOpt.TTL := 64;
FTimeOut := 4000;
try
IcmpSendEcho(hICMP, FIPAddress, pReqData, Length(MyString),@IPOpt, pIPE, BufferSize, FTimeOut);
if pReqData^ = pIPE^.Options.OptionsData^ then
info:=ip+ '　' + IntToStr(pIPE^.DataSize) + '　　　' +IntToStr(pIPE^.RTT);
except
info:='Can not find host!';
FreeMem(pRevData);
FreeMem(pIPE);
Exit;
end;
FreeMem(pRevData);
FreeMem(pIPE);
end;

end;

end.</blockquote>
