---
author: Yourtion
comments: true
date: 2010-09-19 01:50:47+00:00
excerpt: 因为PingSwitch项目要不间断Ping交换机所以Ping的速度和评论不能太大，所以要进行延时操作，一般用Sleep，但是好奇就找了一下资料：在Delphi中，通常可以用以下三种方法来实现程序的延时，即TTtimer控件，Sleep函数，GetTickCount函数。但是其精度是各不相同的。
layout: post
slug: delphi-accuracy-delay-analysis
title: Delphi的三种延时及其精度分析
wordpress_id: 1522
categories:
- Delphi
tags:
- Delphi
---
{% include JB/setup %}

因为PingSwitch项目要不间断Ping交换机所以Ping的速度和评论不能太大，所以要进行延时操作，一般用Sleep，但是好奇就找了一下资料：

在Delphi中，通常可以用以下三种方法来实现程序的延时，即TTtimer控件，Sleep函数，GetTickCount函数。但是其精度是各不相同的。
一、三种方法的简单介绍

1）TTtimer控件

TTtimer控件的实质是调用Windows API定时函数SetTimer和KillTimer来实现的，并简化了对WM_TIMER 消息的处理过程。通过设置OnTimer事件和Interval属性，我们可以很方便的产生一些简单的定时事件。

2）Sleep函数

Sleep函数用来使程序的执行延时给定的时间值。Sleep的调用形式为Sleep(milliseconds)，暂停当前的进程milliseconds毫秒。Sleep的实现方法其实也是调用Windows API的Sleep函数。例如：


<blockquote>sleep(1000); //延迟1000毫秒</blockquote>


Sleep会引起程序停滞，如果你延迟的时间较长的话，你的程序将不能够响应延时期间的发生的其他消息，所以程序看起来好像暂时死机。

3）GetTickCount函数

在主程序中延时，为了达到延时和响应消息这两个目的，GetTickCount()构成的循环就是一种广为流传的方法。例如：


<blockquote>procedure Delay(MSecs: Longint);
//延时函数，MSecs单位为毫秒(千分之1秒)
var
FirstTickCount, Now: Longint;
begin
FirstTickCount := GetTickCount();
repeat
Application.ProcessMessages;
Now := GetTickCount();
until (Now - FirstTickCount >= MSecs) or (Now < FirstTickCount);
end;</blockquote>


二、高精度的微妙级性能计数器（high-resolution performance counter）介绍

为了比较以上方法的精度，首先需要找到一个参考的定时器。在这里，我提供了两个参考的定时器。一是用单片机每隔1.024ms产生一个实时中断RTI，作为计数器；二是选用了一个高精度的微妙级性能计数器

（参见：http://msdn.microsoft.com/msdnmag/issues/04/03/HighResolutionTimer/default.aspx ，或者 http://community.csdn.net/Expert/FAQ/FAQ_Index.asp?id=200249
）

1）计数器的Delphi源代码


<blockquote>{
A high-precision counter/timer. Retrieves time differences
downto microsec.
Quick Reference:
THPCounter inherits from TComponent.

Key-Methods:
Start: Starts the counter. Place this call just before the
code you want to measure.

Read: Reads the counter as a string. Place this call just
after the code you want to measure.

ReadInt: Reads the counter as an Int64. Place this call just
after the code you want to measure.
--------------------------------------------------------------------------------
}
unit HPCounter;

interface

uses
SysUtils, WinTypes, WinProcs, Messages, Classes, Graphics, Controls,
Forms, Dialogs, StdCtrls, ExtCtrls;

type
TInt64 = TLargeInteger;
THPCounter = class(TComponent)
private
Frequency: TLargeInteger;
lpPerformanceCount1: TLargeInteger;
lpPerformanceCount2: TLargeInteger;
fAbout: string;
procedure SetAbout(Value: string);
{ Private declarations }
public
constructor Create(AOwner: TComponent); override;
destructor Destroy; override;
procedure Start;
function Read: string;
function ReadInt: TLargeInteger;
{ Private declarations }
published
property About: string read fAbout write SetAbout;
{ Published declarations }
end;

procedure Register;

implementation

procedure Register;
begin
RegisterComponents('MAs Prod.', [THPCounter]);
end;

constructor THPCounter.Create(AOwner: TComponent);
begin
inherited Create(AOwner);
fAbout:= 'Version 1.1, 2000® Mats Asplund, EMail: masprod@telia.com, Site: http://go.to/masdp';
end;

destructor THPCounter.Destroy;
begin
inherited Destroy;
end;

function THPCounter.Read: string;
begin
QueryPerformanceCounter(TInt64((@lpPerformanceCount2)^));
QueryPerformanceFrequency(TInt64((@Frequency)^));
Result:=IntToStr(Round(1000000 * (lpPerformanceCount2 -
lpPerformanceCount1) / Frequency));
end;

function THPCounter.ReadInt: TLargeInteger;
begin
QueryPerformanceCounter(TInt64((@lpPerformanceCount2)^));
QueryPerformanceFrequency(TInt64((@Frequency)^));
Result:=Round(1000000 * (lpPerformanceCount2 -
lpPerformanceCount1) / Frequency);
end;

procedure THPCounter.SetAbout(Value: string);
begin
Exit;
end;

procedure THPCounter.Start;
begin
QueryPerformanceCounter(TInt64((@lpPerformanceCount1)^));
end;

end.</blockquote>


2）使用方法：


<blockquote>unit Unit1;

interface

uses
Windows, Messages, SysUtils, Classes, Graphics, Controls, Forms, Dialogs,
HPCounter, StdCtrls;

type
TForm1 = class(TForm)
Button1: TButton;
Edit1: TEdit;
Label1: TLabel;
Label2: TLabel;
procedure Button1Click(Sender: TObject);
private
{ Private declarations }
public
{ Public declarations }
end;

var
Form1: TForm1;

implementation

{$R *.DFM}

procedure TForm1.Button1Click(Sender: TObject);
begin
Edit1.Text:= '';
Application.ProcessMessages;
with THPCounter.Create(Self) do
begin
Start;
// Place code to measure here
Sleep(1000);
// Place code to measure here
Edit1.Text:=Read;
Free;
end;
end;

end.</blockquote>


二、三种方法的精度比较

为了比较，采用以上3种方法，分别设置延时时间为1ms、2ms、5ms、10ms、20ms、50ms、100ms、200ms、500ms、1000ms，循环次数为5次，得到实际的延时时间。

1）TTtimer控件


<blockquote>实际延时时间（ms）
1ms： 8.012 21.551 6.875 21.647 9.809
2ms： 9.957 20.675 14.671 11.903 20.551
5ms： 9.952 20.605 9.924 20.705 12.682
10ms：14.852 9.96 21.547 9.82 20.634
20ms：27.512 34.291 26.427 31.244 30.398
50ms：61.196 61.307 64.027 62.048 63.059
100ms：102.495 108.408 112.318 110.322 102.531
200ms：193.955 202.135 207.016 205.082 202.194
500ms：496.659 500.534 503.398 495.551 500.394
1000ms：999.699 1003.576 993.698 1004.443 995.625</blockquote>


2）Sleep函数


<blockquote>1ms： 1.895 1.895 1.896 1.897 1.898
2ms： 2.868 2.874 2.852 2.872 2.869
5ms： 5.8 5.797 5.79 5.79 5.791
10ms：10.675 10.683 10.611 10.669 10.67
20ms：20.404 20.434 20.447 20.477 20.368
50ms：50.67 50.691 50.69 50.682 50.671
100ms：100.515 100.469 100.484 100.481 100.484
200ms：200.101 200.126 199.892 200.066 200.108
500ms：499.961 499.961 499.958 499.961 499.96
1000ms：1000.034 1000.04 1000.03 1000.018 1000.029</blockquote>


3）GetTickCount函数


<blockquote>1ms： 15.54 15.596 15.527 15.566 15.838
2ms： 15.561 15.563 15.603 15.477 15.571
5ms： 15.519 15.549 15.569 15.666 15.394
10ms：15.558 15.561 15.522 15.568 15.518
20ms：31.186 31.137 31.17 31.17 31.19
50ms：62.445 62.4 63.893 60.88 62.404
100ms：109.276 109.298 109.273 109.28 109.28
200ms：203.027 203.084 203.021 203.027 203.046
500ms：499.959 499.961 499.963 499.967 499.965
1000ms：1000.023 1000.022 1000.026 1000.029 1000.021</blockquote>


可见，相对而言，Sleep的精度最高，尤其是在10ms以内的延时，只有sleep函数才能够做到。TTimer控件的定时精度最差，而且稳定性不好，波动很大。GetTickCount函数所能实现的最短延时为15ms左右，稳定性相对TTimer要好一些。
