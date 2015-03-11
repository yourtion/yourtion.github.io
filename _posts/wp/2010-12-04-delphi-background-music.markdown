---
author: Yourtion
comments: true
date: 2010-12-04 01:53:41+00:00
excerpt: 最近在做个抽奖程序，想加入抽奖声音，本来打算使用了TMediaPlayer控件来播放音乐。最后发现可以直接使用WINDOWS为我们提供的API函数来播放音乐，方法如下：首先需要在uses部分加入mmsystem，接着写入下列语句，其中e:\1.mid为播放的文件，NN为自定义名称标志。
layout: post
slug: delphi-background-music
title: Delphi实现背景音乐播放
wordpress_id: 1620
categories:
- Delphi
tags:
- Delphi
---
{% include JB/setup %}

最近在做个抽奖程序，想加入抽奖声音，本来打算使用了TMediaPlayer控件来播放音乐。最后发现可以直接使用WINDOWS为我们提供的API函数来播放音乐，方法如下：首先需要在uses部分加入mmsystem，接着写入下列语句，其中e:\1.mid为播放的文件，NN为自定义名称标志。

```
procedure TForm1.Button1Click(Sender: TObject);
begin
//播放音乐
  MCISendString(OPEN e: \1.MID type SEQUENCER ALIAS NN, , 0, 0);
  MCISendString(PLAY NN FROM 0, , 0, 0);
  MCISendString(CLOSE ANIMATION, , 0, 0);
end;

procedure TForm1.Button2Click(Sender: TObject);
begin
//停止播放
  MCISendString(OPEN e: \1.MID type SEQUENCER ALIAS NN, , 0, 0);
  MCISendString(STOP NN, , 0, 0);
  MCISendString(CLOSE ANIMATION, , 0, 0);
end;
```

