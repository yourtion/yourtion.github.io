---
author: Yourtion
comments: true
date: 2010-03-19 12:36:10+00:00
excerpt: 今天突然和老师开始研究Delphi的编程~之前都是听说过~但是没有真的用过~老师说很不错~然后开始研究发现还真的不错啊···说说精确时间的获取~明天再讲讲关于DNS的问题~因为刚刚在做DNS解析的软件~~~
layout: post
slug: delphi-access-ns-ms-method
title: Delphi中ns和ms时间的获取方法
wordpress_id: 716
categories:
- Delphi
tags:
- Delphi
---
{% include JB/setup %}

今天突然和老师开始研究Delphi的编程~之前都是听说过~但是没有真的用过~老师说很不错~然后开始研究发现还真的不错啊···说说精确时间的获取~明天再讲讲关于DNS的问题~因为刚刚在做DNS解析的软件~~~

要介绍的利用Windows API函数实现精确记时的方法。利用高性能频率记数法。利用这种方法要使用两个API函数QueryPerformanceFrequency和QueryPerformanceCounter。QueryPerformanceFrequency函数获得高性能频率记数器的震荡频率。

调用该函数后，函数会将系统频率记数器的震荡频率（每毫秒）保存到一个LargeInteger中。不过利用该函数在几台机器上做过试验，结果都是1193180。读者朋友可以在自己的机器上试一下

QueryPerformanceCounter函数获得系统频率记数器的震荡次数，结果也保存到一个Largenteger中。

很显然，如果在计时中首先使用QueryPerformanceFrequency获得高性能频率记数器每毫秒的震荡次数，然后在计时开始时使用QueryPerformanceCounter函数获得当前系统频率记数器的震荡次数。在计时结束时再调用QueryPerformanceCounter函数获得系统频率记数器的震荡次数。将两者相减，再将结果除以频率记数器每毫秒的震荡次数，就可以获得某一事件经过的准确时间。(次数除以频率等于时间)

我使用的代码是~

`uses
Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
Dialogs, ActnMan, ActnColorMaps, XPMan, StdCtrls, IdBaseComponent,
IdComponent, IdUDPBase, IdUDPClient, IdDNSResolver,DateUtils,IdException;

var
t1,t2:int64;
r1,r2,r3:double;

QueryPerformanceFrequency(c1);//WINDOWS API 返回计数频率(Intel86:1193180)(获得系统的高性能频率计数器在一毫秒内的震动次数)
try
QueryPerformanceCounter(t1);//WINDOWS API 获取开始计数值
//需要计时的程序代码
QueryPerformanceCounter(t2);//获取结束计数值

r1:=(t2-t1)/c1;//取得计时时间，单位秒(s)
r2:=(t2-t1)/c1*1000;//取得计时时间，单位毫秒 (ms)
r3:=(t2-t1)/c1*1000000;//取得计时时间，单位微秒

```

最后输出就可以了！~~~~

好像可以精确到ns~
