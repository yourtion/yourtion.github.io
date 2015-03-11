---
author: Yourtion
comments: true
date: 2011-05-20 00:55:19+00:00
excerpt: 项目中需要做个提交周报的功能，需要知道指定周数的开始日期和结束日期，以便处理其他业务。以下是一段通过PHP来获取一年中的每星期的开始日期和结束日期的代码，与大家分享。
layout: post
slug: php-start-end-week-per-year
title: 用PHP获取一年中每星期的开始结束日期
wordpress_id: 2133
categories:
- PHP
---
{% include JB/setup %}

最近项目中需要做个提交周报的功能，需要知道指定周数的开始日期和结束日期，以便处理其他业务。以下是一段通过PHP来获取一年中的每星期的开始日期和结束日期的代码，与大家分享。

以下是一段通过PHP来获取一年中的每星期的开始日期和结束日期的代码。

```
 function get_week($year) {
	$year_start = $year . "-01-01";
	$year_end = $year . "-12-31";
	$startday = strtotime($year_start);
	if (intval(date('N', $startday)) != '1') {
	    $startday=strtotime("nextmonday",strtotime($year_start)); //获取年第一周的日期
	}
	$year_mondy = date("Y-m-d", $startday); //获取年第一周的日期
	$endday = strtotime($year_end);
	if (intval(date('W', $endday)) == '7') {
	  $endday=strtotime("lastsunday",strtotime($year_end));
	}
	$num = intval(date('W', $endday));
	for ($i = 1; $i <= $num; $i++) {
	$j = $i -1;
	 $start_date = date("Y-m-d", strtotime("$year_mondy $j week "));
	$end_day = date("Y-m-d", strtotime("$start_date +6 day"));
	$week_array[$i] = array (
	str_replace("-", ".", $start_date), str_replace("-", ".", $end_day));
	}
	 return $week_array;
	}
```

函数get_week()通过传入参数$year年份，获取当年第一天和最后一天所在的周数，计算第一周的日期，通过循环获取每一周的第一天和最后一天的日期。最后返回是一个数组。
想得到指定周数的开始日期和结束日期，比如2011年第18周的开始日期和结束日期，代码如下：

```
$weeks = get_week(2011);
echo '第18周开始日期：'.$weeks[18][0].'';
echo '第18周结束日期：'.$weeks[18][1];
```

最后输出结果：

1. 第18周开始日期：2011.05.02
2. 第18周结束日期：2011.05.08
