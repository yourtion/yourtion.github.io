---
author: Yourtion
comments: true
date: 2012-02-25 02:31:30+00:00
excerpt: '中文分词服务应用场景：对博客标题进行分词，提取其中的名词作为文章关键词。对用户搜索条件进行分词，提取其中关键词语进行搜索。'
layout: post
slug: sae-chinese-word-segmentation-trial
title: SAE中文分词服务试用
wordpress_id: 3597
categories:
- 云服务
tags :
- 新浪SAE
---
{% include JB/setup %}

中文分词(Chinese Word Segmentation)指的是将一个汉字序列切分成一个一个单独的词。中文分词是文本挖掘的基础，对于输入的一段中文，成功的进行中文分词，可以达到电脑自动识别语句含义的效果。SAE分词系统基于隐马模型开发出的汉语分析系統，主要功能包括中文分词、词性标注、命名实体识别、新词识别。

中文分词服务应用场景：

1. 对博客标题进行分词，提取其中的名词作为文章关键词。
2. 对用户搜索条件进行分词，提取其中关键词语进行搜索。

如，用户搜索”SAE中文分词服务试用Yourtion”，可分词为"sae","中文","分词","服务","试用","yourtion"六个关键词来进行搜索，提高搜索成功率。

使用指南

在SAE在线管理平台进入应用的“```分词服务```”```管理页面```，```启用分词服务```，即可开始使用。代码示例：

```php
<?php
$str = "明天是星期天"
$seg = new SaeSegment();
$ret = $seg->segment($str, 1);
print_r($ret);    //输出
// 失败时输出错误码和错误信息
if ($ret === false)
	var_dump($seg->errno(), $seg->errmsg());
?>
```

我稍微改了一下，做了个测试页面：

[http://yourtion.sinaapp.com/seg/index.php?title=SAE的中文分词服务试用Yourtion](http://yourtion.sinaapp.com/seg/index.php?title=SAE的中文分词服务试用Yourtion)

请求标题词组返回分词字段。
