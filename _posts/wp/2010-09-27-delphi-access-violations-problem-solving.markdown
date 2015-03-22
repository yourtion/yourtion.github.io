---
author: Yourtion
comments: true
date: 2010-09-27 00:59:31+00:00
excerpt: AccessViolation（非法访问），GeneralProtectionFault（一般保护性错误）或者InvalidPageFault（无效页面错误），虽然说法不一样，但本质上总是由同一种错误引起的。AccessViolation常常在计算机用户运行的程序试图存取未被指定使用的存储区时遇到。
layout: post
slug: delphi-access-violations-problem-solving
title: Delphi Access Violations 问题的解决思路
wordpress_id: 1525
categories:
- Delphi
tags:
- Access
- Delphi
---
{% include JB/setup %}

Windows用户可能经常会看到类似于错误提示：“```Error：Accessviolationataddress836556F8.Readofaddress836556F8```”。作为一个Delphi程序开发者，遇到这种错误的机会比其他用户更多(^_^)。

究竟什么是“```AccessViolation```”？如何在设计期避免它的出现？

其中```AccessViolation```（非法访问），```GeneralProtectionFault```（一般保护性错误）或者```InvalidPageFault```（无效页面错误），虽然说法不一样，但本质上总是由同一种错误引起的。```AccessViolation```常常在计算机用户运行的程序试图存取未被指定使用的存储区时遇到。

* Accessviolationataddress<十六进制值>
* inmodule<应用程序名>
* Readofaddress<十六进制值>

一旦Windows要在它被分配的存储区之外写数据信息，它就会覆盖其他程序甚至操作系统的命令或数据。一旦发生了这种情况，操作系统将会瘫痪或者以某种形式关闭，你必须重新启动计算机。

例如，在WindowsNT/2000下一个程序遇到这种错误时，Dr.Watson出现并且停止了该程序，捕获了一些快速的细节状态，再把它们用文本形式记录下来。```AccessViolation```是某些最令人气恼的Windows程序遇到的错误之一。本文的目的就是让你找到Delphi中```AccessViolation```的解决之道。首先声明一点，```AccessViolation```和```MicrosoftAccess```没有任何关系。

用Delphi开发程序时，我们可以把遇到的```AccessViolation```分成两大类：运行期和设计期。

一、设计期的AccessViolation

1.硬件原因

在启动或关闭DelphiIDE以及编译一个Delphi工程时容易出现设计期的AccessViolation。在你的计算机运行中出现AccessViolation信息可能由各种各样的原因引起，包括系统BIOS、操作系统或者是硬件驱动线，有些声卡、显卡、网卡实际上也会导致这种错误。为什么这么说？计算机里的每一块卡都有它的设备驱动程序。对于不同的制造商、不同版本的Windows或者不同版本的Delphi都可能会遇到不同的问题。如下的几个步骤可能有助于你解决遇到的这些问题：

1. 按照必要的步骤来证实你安装的驱动程序之间没有冲突。
2. 有时降低显示分辨率可能会使某些古怪的显卡驱动程序稳定一些。
3. 如果使用双处理器的主板，则保证对每个处理器的修改步骤一样。
4. 对于计算机上的所有硬件注意使用最新的驱动程序。

2.软件原因

尽管Intel的计算机中Windows是最流行的操作系统，由于Windows系统天生的脆弱性和BUG，应用程序的误操作可能导致操作系统的迅速瘫痪（有时操作系统本身也会莫名其妙的瘫痪）。选择一个更稳定的程序开发环境是解决之道，如下几个步骤可以帮助你防止某些AccessViolation的发生：

（1）尽管Windows9X相当流行，WindowsNT/2000还是从多方面被证实是一个稳定得多的环境，几乎对于所有的Windows代码平台而言都是这样。

（2）确保对于WindowsNT/2000已经安装了最新的```servicepack```。每次安装完新版的```servicepack```，你会发现机器变得稳定了。

（3）为你使用的各种版本的Delphi装上当前的更新或补丁（```BDE```、```ADO```……），这是提前预防错误的好办法。尽量使用最新的Delphi补丁——```AccessViolation```错误数量尤其是设计期的错误数会大大减少。

（4）如果你在IDE中经常随机遇到```AccessViolation```错误，很有可能是你安装了一个不好的控件、包或者一个向导，它不是你使用的版本的Delphi所编写或编译的。试着一个一个卸载定制的控件（或者包）直到问题被解决，然后联系控件厂商关注这个问题的结果。

（5）检查一下计算机里是否有没用的东西和程序冲突。奇怪的软件程序和测试版的产品常常会导致AccessViolation错误。

（6）如果系统设置有错误，那么```AccessViolation```错误可能也会经常出现。如果你不停地遇到一个错误提示信息一样的```AccessViolation```，记录下这些细节，然后通知可能导致这个错误的软件制造厂商。

这些就是我对设计期```AccessViolation```错误的全部建议。

二、运行期的```AccessViolation```

Delphi常见的运行期```AccessViolation```错误有哪些？如何防止？

任何软件开发都会遇到这样的情况：你写好程序并测试，然后到处发送，结果用户告诉你它失败了。

你可能考虑用编译指令{$D}编译你的程序——Delphi可以建立一个有助于定位AccessViolation错误的源代码的镜像文件。

工程选项对话框（Project|Options|Linker&Compiler）让你指定你所需要的一切。对于单元文件，debug信息和单元的对象代码一起记录在unit文件里了。

编译使用这个单元的程序时，debug信息会增加单元文件的大小而且会增加额外的内存开销，但是它不会影响最终可执行文件的大小和运行速度。

包含debug信息和镜像文件（Project|Options|Linker）选项的产品只有在{$D+}编译指令下才会完成行信息。

其中```Accessviolation```通常只在程序的某一个方面表现出来。当问题第一次出现时，考虑一下用户进行了什么操作是很重要的，然后从这里寻找突破口。从用户的角度来看，你的程序中止了他们的工作，由他们来告诉你出现的问题似乎让你延期解决这个问题了。然而，与用户交流是你发现问题和改善程序的惟一有效方法。

现在你将可以知道在只给你冲突地址的情况下，如何轻松发现准确路径、源代码文件、发生```Accessviolation```错误的行：```“Search-Find Error…”。```

当一个运行期Access violation出现时，你的用户得到的错误信息类似于如下情况：

* Access violation at address <十六进制值>
* in module <应用程序名>
* Read of address <十六进制值>

如果你的程序在Delphi IDE里包含debug信息编译，你可以定位到导致这个错误源代码这一行。

在Delphi程序中，一个最普遍导致Access Violation错误的原因是使用了一个没有被创建的对象。如果第二个地址<十六进制值>是FFFFFFF或0000000，十有八九就是你访问了一个没有被建立的对象。例如，你调用了一个表单的事件，但这个表单不是自动创建的，也没有代码实例化。


```delphi
procedure TfrMain.OnCreate(Sender: TObject);
var BadForm: TBadForm;
begin
	//这里将会产生Access violation
	BadForm.Refresh;
end;
```

假设BadForm在工程选项“Available Forms”窗口列表里——这个窗口是需要手工创建和释放的。在上面的代码里调用BadForm窗口的Refresh方法就会导致Access violation。

如果你在Debugger选项窗口使“Stop on Delphi Exceptions”生效，那么就会弹出下面的信息：


>The message states that the EAccessViolation has occurred. The EAccessViolation is the exception class for invalid memory access errors.


这是你在设计程序时将会看到的信息，下一个信息框将会出现，然后程序失败了：


```
Access violation at address 0043F193
in module 'Project1.exe'
Read of address 000000.
```


第一个十六进制数0043F193是发生Access violation的编译代码（Project1.exe）的运行期错误的地址。在IDE里选择菜单项“Search|Find Error…”，在对话框里输入错误发生的地址（0043F193）后点击“OK”按钮。Delphi将会重新编译你的工程文件，然后显示发生运行期错误的那一行代码，这里就是BadForm.Refresh这一行了。

下面列出了Delphi环境下导致Access violation错误的大部分常见原因。这个列表不是也不可能覆盖所有可能出现的Access violation的情况。请在论坛上发送你的Access violation信息，大家可以试着一起解决这个问题——真正的实际事例一般情况下比列出来的错误隐晦得多。

1. 调用一个不存在的对象

如上所述，大部分Access violation的合理原因是使用了没有被创建或者已经被释放的对象。为了防止这种类型的Access violation的发生，请确保你访问的任何对象都首先被创建了。例如，当一个Table定位在一个没有被创建的data module（从auto-crete窗口里移走了）里，你可能在窗体的OnCreate事件里打开这个表。

在下面的代码里，在调用一个已经被删除了的对象（b:TBitmap）事件后，一个Access violation出现了：


```delphi
var b:TBitmap;
begin
	b:=TBitmap.Create;
	try
		//对b对象进行一些操作
	finally
		b.free;
	end;
	...
	//由于b已经被释放，一个Access violation错误将会出现
	b.Canvas.TextOut(0,0,'这是一个 Access Violation');
end;
```


2. 不存在的API参数

如果你试图给Win API函数传递一个不存在的参数将会出现一个Access violation错误。解决此类Access violation错误的最好方法是查阅Win API帮助，看看这个API函数调用的参数信息以及参数类型。例如，总是保证不给一个缓冲参数传递一个无效指针。

3. 让Delphi释放

当一个对象拥有另一个对象时，让它给你做删除工作。因为默认情况下，所有的窗体（自动创建的）都属于Application对象。当一个应用程序结束时，它释放了Application对象，也就释放了所有窗体。例如，如果你在程序开始时自动创建了两个窗体（Form1/Unit1和Form2/Unit2），下面的代码就会导致Access violation错误的出现：

```delphi
unit Unit1;
...
uses unit2;
...
procedure TForm1.Call_Form2
begin
Form2.ShowModal;
Form2.Free;
//Access violation错误将会出现
Form2.ShowModal;
end;
```


4. 杀死异常

永远不要破坏临时异常对象（E），处理一个异常会自动释放异常对象。如果你自己手动释放了异常对象，程序会试图再次释放它，那么就会出现Access violation错误：

```delphi
Zero:=0;
try
	dummy:= 10 / Zero;
except
	on E: EZeroDivide do
		MessageDlg('不能用0做除数!',mtError, [mbOK], 0);
	E.free. //Access violation错误将会出现
end;
```


5. 检索一个空字符串

一个空字符串是没有任何数据的。就是说，检索一个空字符串相当于访问一个不存在的对象，这将导致Access violation错误：

```delphi
var s: string;
begin
	s:='';
	s[1]:='a';
	//Access violation错误将会出现
end;
```


6. 直接引用指针

你必须间接引用指针，否则你会改变指针地址并可能会破坏其他存储单元 ：

```delphi
procedure TForm1.Button1Click(Sender: TObject);
var
p1 : pointer;
p2 : pointer;
begin
	GetMem(p1, 128);
	GetMem(p2, 128);
	//下一行导致Access violation错误
	Move(p1, p2, 128);
	//下一行方法正确
	Move(p1^, p2^, 128);
	FreeMem(p1, 128);
	FreeMem(p2, 128);
end;
```


这些就是我对运行期Access Violation错误的全部建议，我希望你们也能对你们程序出现的Access Violation错误提出一些看法。
