---
author: Yourtion
comments: true
date: 2011-03-20 01:56:52+00:00
excerpt: Delphi调用Cmd并取得输出字符
layout: post
slug: delphi-call-cmd-output
title: Delphi调用Cmd并取得输出字符
wordpress_id: 1968
categories:
- Delphi
tags:
- Delphi
---
{% include JB/setup %}

最近想做个调用```CMD```命令并取得结果的程序··找了一下··共享代码

```delphi
procedure CheckResult(b: Boolean);
begin
  if not b then
    raise Exception.Create(SysErrorMessage(GetLastError));
end;

function RunDOS(const CommandLine: string): string;
var
  HRead, HWrite: THandle;
  StartInfo: TStartupInfo;
  ProceInfo: TProcessInformation;
  b: Boolean;
  sa: TSecurityAttributes;
  inS: THandleStream;
  sRet: TStrings;
begin
  Result := '';
  FillChar(sa, sizeof(sa), 0);
//设置允许继承，否则在NT和2000下无法取得输出结果
  sa.nLength := sizeof(sa);
  sa.bInheritHandle := True;
  sa.lpSecurityDescriptor := nil;
  b := CreatePipe(HRead, HWrite, @sa, 0);
  CheckResult(b);

  FillChar(StartInfo, SizeOf(StartInfo), 0);
  StartInfo.cb := SizeOf(StartInfo);
  StartInfo.wShowWindow := SW_HIDE;
//使用指定的句柄作为标准输入输出的文件句柄,使用指定的显示方式
  StartInfo.dwFlags := STARTF_USESTDHANDLES or STARTF_USESHOWWINDOW;
  StartInfo.hStdError := HWrite;
  StartInfo.hStdInput := GetStdHandle(STD_INPUT_HANDLE); //HRead;
  StartInfo.hStdOutput := HWrite;

  b := CreateProcess(nil, //lpApplicationName: PChar
    PChar(CommandLine), //lpCommandLine: PChar
    nil, //lpProcessAttributes: PSecurityAttributes
    nil, //lpThreadAttributes: PSecurityAttributes
    True, //bInheritHandles: BOOL
    CREATE_NEW_CONSOLE,
    nil,
    nil,
    StartInfo,
    ProceInfo);

  CheckResult(b);
  WaitForSingleObject(ProceInfo.hProcess, INFINITE);

  inS := THandleStream.Create(HRead);
  if inS.Size > 0 then
  begin
    sRet := TStringList.Create;
    sRet.LoadFromStream(inS);
    Result := sRet.Text;
    sRet.Free;
  end;
  inS.Free;

  CloseHandle(HRead);
  CloseHandle(HWrite);
end;
```

使用方法也很简单···就是调用```Function```；
