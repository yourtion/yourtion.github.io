---
author: Yourtion
comments: true
date: 2010-09-28 01:22:08+00:00
excerpt: 之前写过《Delphi线程简单创建、挂起、激活与终止》，但是在运行的时候会出现没有调用CoInitialize的错误~查找了一下~随便分享解决方法~CoInitialize(LPVOID)，它将以特定参数调用CoInitializeEx，为当前单元初始化COM库，并标记协同模式为单线程模式。参数必须为NULL。这是关于OLE和COM的问题。
layout: post
slug: delphi-not-called-coinitialize-solution
title: Delphi“尚未调用CoInitialize”解决方法
wordpress_id: 1532
categories:
- Delphi
tags:
- Delphi
- 解决问题
---
{% include JB/setup %}

之前写过[《Delphi线程简单创建、挂起、激活与终止》](/delphi-thread-create-suspend-activation-termination.html)，但是在运行的时候会出现没有调用```CoInitialize```的错误~查找了一下~随便分享解决方法~

在```CoInitialize(LPVOID)```，它将以特定参数调用```CoInitializeEx```，为当前单元初始化COM库，并标记协同模式为单线程模式。参数必须为```NULL```。这是关于```OLE```和```COM```的问题。

在```CoInitializeEx(LPVOID)```，新版本，可以用参数指定协同模式，如多线程模式，但注意单元的协同模式是不能改的，如果在已经初始化为多线程的单元里初始化```OLE```将失败并返回```RPC_E_CHANGED_MODE```。

每个线程只要调用一次初始化就够了，同一线程中的后续调用也将通过，但会返回S_FALSE。后面解除初始化调用要与本调用一一对应，返回```S_FALSE```的```CoInitialize```调用也计算在内。应用程序的第一个线程将调用```CoInitializeEx```(```COINIT_APARTMENTTHREADED```或0)，必须是最后一个解除初始化的。如果不按上面的顺序进行初始化/解除函数调用，在该单线程单元(```STA```)里后续的初始化调用将失败，应用程序将无法工作。由于无法控制本地服务器的载入/御载顺序，在```DLLMain```里调用初始化/解除函数是不安全的。

例：

1）在DLL中使用ADO数据库组件时，调用程序调用该DLL时会出现"尚未调用CoInitialize"错误，解决的办法是在程序初始化时调用CoInitialize（nil）方法。

```delphi
initialization
CoInitialize(nil);

{* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *}
finalization
CoUninitialize;
{* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *}
```


2） 把```WebBrowser```封装到Dll里面调用的时候总是说“尚未调用 CoInitialize。”，"CoInitialize has not been called"或“尚未调用 CoInitialize。”的解决方法。

用```TWebBrowser```显示HTML文档时或者把WebBrowser封装到Dll里面调用的时候总是说“尚未调用 CoInitialize。”，解决方法：
在“开始 -> 运行”中输入 ```regsvr32 shdocvw.dll```
然后在```uses```中加入```ActiveX```，老版本的加入```OLE2```；

```delphi
uses
ActiveX, // 确认加入这个单元
// 老版本的Delphi用 OLE2 代替
Windows;

initialization
CoInitialize(nil); // 手动调用 CoInitialize()

finalization
CoUnInitialize; // 释放内存

end.
```


Delphi中 ```CoInitialize```和 ```OleInitialize```有什么区别

* ```CoInitialize```------------- COM对象
* ```OleInitialize``` ----------- OLE对象

- ```COM```库：```CoInitialize```{Ex}、```CoUnitialize```
- ```OLE```系统：```OleInitialize```、```OleUnitialize```
- ```COM```对象和```OLE```对象有什么不同呢?是不是COM是OLE的子集?
- ```OLE```是```COM```的前身，```MS```现在已经全部转道```COM```上了，应该现在不发展```OLE```

如果是使用多线程的话那就在

那么```Execute```事件的开头加上```CoInitialize（nil）```


结尾加上```CoUninitialize()```
