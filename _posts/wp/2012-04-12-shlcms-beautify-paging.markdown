---
author: Yourtion
comments: true
date: 2012-04-12 12:48:31+00:00
excerpt: 很久没有写博客了，最近在做一个网站，因为前台页面人家已经写好。我只是负责嵌入，所以要按照要求把页面做得跟设计一样，深喉咙的分页代码太丑了，所以进行了一些美化，效果和代码如下，和大家分享
layout: post
slug: shlcms-beautify-paging
title: SHLCMS美化分页显示代码
wordpress_id: 3627
categories:
- PHP
tags :
- SHLCMS
---
{% include JB/setup %}

很久没有写博客了，最近在做一个网站，因为前台页面人家已经写好。我只是负责嵌入，所以要按照要求把页面做得跟设计一样，深喉咙的分页代码太丑了，所以进行了一些美化，效果和代码如下，和大家分享一下：

效果：

[![]({{ IMAGE_PATH }}2012/04/SHLCMS-Page.jpg)]({{ IMAGE_PATH }}2012/04/SHLCMS-Page.jpg)

首先修改”```\inc\class.pager.php```“，将

```php
public function Show($url,$style=0)
```

改为

```php
public function Show($url,$style=2)
```

然后将”```elseif($style==2)```“花括号中的内容改为：

```php
elseif($style==2)
{
	$tpageNum=8;
	$tempStr ='<div class="page"><table align="center" cellpadding="0" cellspacing="0" border="0"><tr>';
	$tempStr .=	$this->prvNo()<1?'':'';
	if($this->cPage<$tpageNum/2)
	{
		$tstart=1;
		$tend=$tpageNum+1;
	}
	else 
	{
		$tstart=$this->cPage-$tpageNum/2;
		$tend=$this->cPage+$tpageNum/2;	
	}
	$tstart=$tstart<1?1:$tstart;
	$tend=$tend>$this->totalPageNo?$this->totalPageNo:$tend;
	$tempStr .='<td>共'.$this->totalPageNo.'页</td>';
	$tempStr .=	$this->prvNo()<1?'':'<td class="pagespace"><a href="'.$this->rootpath.$url.$this->prvNo().$this->anchor.'"><button class="btn1">前一页</button></a></td>';
	$tempStr .='<td class="pagenum"> ';
	for($i=$tstart;$i<$tend+1;$i++)
	{
		$tempStr .= $this->cPage==$i?"<a href=\"#\" class=\"currentpage\"> $i </a>":' <a href="'.$this->rootpath.$url.$i.'">'.$i.$this->anchor.'</a> ';
	}
	$tempStr .='</td>';
	$tempStr .=	$this->nextNo()>$this->totalPageNo?'':'<td class="pagespace"><a href="'.$url.$this->nextNo().$this->anchor.'"><button class="btn1">下一页</button></a></td>';
	$tempStr .=	$this->nextNo()>$this->totalPageNo?'':'<td class="pagespace"><button class="btn1"> <a href="'.$this->rootpath.$url.$this->lastNo().$this->anchor.'">最后页</a></button></td>';
	$tempStr .= '<td>跳转至<select name="pagerMenu" onChange="location=\''.$this->rootpath.$url.'\'+this.options[this.selectedIndex].value+\''.$this->anchor.'\'";>';
	for($i=1;$i<$this->totalPageNo+1;$i++)
	{
		$tempStr .= '<option value="'.$i.'"';
		$tempStr .= $i==$this->cPage?' selected="selected"':'';
		$tempStr .= '>'.$i.'</option>';
	}
	$tempStr .= '</select>页</td>';
	$tempStr .="</td></tr></table></div> ";
}
```

最后在样式表中增加：

```css
.pagenum a{ padding:0px 6px; *padding:2px 6px; _padding:2px 6px; line-height:21px; margin:0px 2px; background:#fff; border:1px solid #e4e4e4;}
.page button{ font-size:12px;}
.btn1{ width: 56px; height:21px; line-height:21px; padding-left:6px; text-align:left; border:none; background:url(../images/btnbg.jpg) left -104px no-repeat;}
.btn2{ width:60px; height:22px; line-height:22px; text-align:center; border:none; background:url(../images/btnbg.jpg) -56px -104px no-repeat;}
.pagenum a.currentpage{ background:#007dfe; border:1px solid #007dfe; color:#fff; font-weight:bold;}
.pagespace{ padding-left:3px;}
.page .pagespace input{ width:30px;}
.page{ position:relative; top:15px}
```

[btnbg.jpg在这里]({{ IMAGE_PATH }}2012/04/btnbg.jpg)

希望大家多给意见和建议，让我们一同进步
