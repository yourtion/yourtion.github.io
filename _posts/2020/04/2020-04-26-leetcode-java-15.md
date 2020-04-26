---
layout: post
date: 2020-04-26 17:20:46 +08:00
slug: leetcode-java-15
title: "LeetCode 手记 15"
author: Yourtion
keywords: ["leetcode", "java"]
description: "仔细阅读题目并理解题目意图很重要"
category: "学习"
tags: ["LeetCode", "Java"]
---
{% include JB/setup %}

## 本周收获

- 仔细阅读题目并理解题目意图很重要

## 1078. Bigram 分词

[https://leetcode-cn.com/problems/occurrences-after-bigram/](https://leetcode-cn.com/problems/occurrences-after-bigram/)

### 思考

先切分单词，然后不断比对，判断是否满足前两个单词，如果满足则添加当前单词

[https://leetcode-cn.com/submissions/detail/64522386/](https://leetcode-cn.com/submissions/detail/64522386/)

### 反思

跟其他人类似，其他人使用 ArrayList，感觉更快些

## 1089. 复写零

[https://leetcode-cn.com/problems/duplicate-zeros/](https://leetcode-cn.com/problems/duplicate-zeros/)

### 思考

一开始考虑先把数字移动到最后，再从前面读，但是这样还是会出现数据互相覆盖的问题

[https://leetcode-cn.com/submissions/detail/64522518/](https://leetcode-cn.com/submissions/detail/64522518/)

### 反思

按照官方解法，首先计算需要复写零的数量，然后处理剩余元素边界上零的情况，最后从末尾迭代数组，遇到非零元素直接向后移动，遇到零需要复制和移动

## 1108. IP 地址无效化

[https://leetcode-cn.com/problems/defanging-an-ip-address/](https://leetcode-cn.com/problems/defanging-an-ip-address/)

### 思考

比较简单粗暴，直接使用字符串替换的方法`replaceAll("\\.", "[.]")`

[https://leetcode-cn.com/submissions/detail/64522738/](https://leetcode-cn.com/submissions/detail/64522738/)

### 反思

看了一下，其他人使用扫码字符串重新构建结果，速度更快

## 1114. 按序打印

[https://leetcode-cn.com/problems/print-in-order/](https://leetcode-cn.com/problems/print-in-order/)

### 思考

使用`CountDownLatch`，尝试了好几个版本才把东西做对

[https://leetcode-cn.com/submissions/detail/64794164/](https://leetcode-cn.com/submissions/detail/64794164/)

### 反思

官方题解使用 synchronization 实现

## 1122. 数组的相对排序

[https://leetcode-cn.com/problems/relative-sort-array/](https://leetcode-cn.com/problems/relative-sort-array/)

### 思考

先将 arr1 的内容计数放入 Map 中，然后遍历 arr2 数组，从 map 中取出结果，按数量填充入结果数组，剩余部分使用`Arrays.sort`进行排序

[https://leetcode-cn.com/submissions/detail/64789656/](https://leetcode-cn.com/submissions/detail/64789656/)

### 反思

使用`int[]`进行计数，这样本身整体就是有序，减少后面排序的过程

## 1128. 等价多米诺骨牌对的数量

[https://leetcode-cn.com/problems/number-of-equivalent-domino-pairs/](https://leetcode-cn.com/problems/number-of-equivalent-domino-pairs/)

### 思考

一开始使用 Set 保存将两个数字组装构成的 key（正向和反向都组装成 key），随后检查是否存在，但是发现这个对计数是有要求的，所以改成使用 Map 记录 key 和次数，注意两个数字相同的情况

[https://leetcode-cn.com/submissions/detail/64792989/](https://leetcode-cn.com/submissions/detail/64792989/)

### 反思

跟其他人解法类似，但是他们使用组成数字的方法（较小的数字作十位，较大的数字作个位）简化了整个流程

## 1137. 第 N 个泰波那契数

[https://leetcode-cn.com/problems/n-th-tribonacci-number/](https://leetcode-cn.com/problems/n-th-tribonacci-number/)

### 思考

因为 N 最大为 38，所以在一开始的时候先计算好结果，然后通过 map 取值返回即可

[https://leetcode-cn.com/submissions/detail/65037501/](https://leetcode-cn.com/submissions/detail/65037501/)

### 反思

官方解法还有一种“性能优化：带记忆的递归”的解法，跟计算斐波那契数类似

## 1154. 一年中的第几天

[https://leetcode-cn.com/problems/day-of-the-year/](https://leetcode-cn.com/problems/day-of-the-year/)

### 思考

通过定义每个月的值，然后遍历累加，注意判断是否闰年（闰年加一天需要在二月份后才需要加上）

[https://leetcode-cn.com/submissions/detail/65037933/](https://leetcode-cn.com/submissions/detail/65037933/)

### 反思

跟其他人的解法类似，可以通过预先累加好每个月距离一月一日的天数，去掉循环，直接累加即可

## 1170. 比较字符串最小字母出现频次

[https://leetcode-cn.com/problems/compare-strings-by-frequency-of-the-smallest-character/](https://leetcode-cn.com/problems/compare-strings-by-frequency-of-the-smallest-character/)

### 思考

通过一个 map 进行计数，记录 words 中小于某个值的词数量，然后计算 queries 中的值，根据 map 查询结果返回

[https://leetcode-cn.com/submissions/detail/65040132/](https://leetcode-cn.com/submissions/detail/65040132/)

### 反思

跟其他人解法类似

## 1175. 质数排列

[https://leetcode-cn.com/problems/prime-arrangements/](https://leetcode-cn.com/problems/prime-arrangements/)

### 思考

先通过一个函数判断 100 以内的质数，然后剩余的就是计算质数和非质数位置的全排列，通过乘积与取模的方法循环运算即可

[https://leetcode-cn.com/submissions/detail/65255357/](https://leetcode-cn.com/submissions/detail/65255357/)

### 反思

跟其他人解法基本一致

## 1179. 重新格式化部门表

[https://leetcode-cn.com/problems/reformat-department-table/](https://leetcode-cn.com/problems/reformat-department-table/)

### 思考

通过`CASE`的方式筛选出每个月对应的列，并通过`gruop by`合并对应的部门 ID

[https://leetcode-cn.com/submissions/detail/65255398/](https://leetcode-cn.com/submissions/detail/65255398/)

### 反思

很其他人解法基本一致

## 1184. 公交站间的距离

[https://leetcode-cn.com/problems/distance-between-bus-stops/](https://leetcode-cn.com/problems/distance-between-bus-stops/)

### 思考

计算从起点到终点还有从终点到起点两个环行之间到距离，取小值

[https://leetcode-cn.com/submissions/detail/65315037/](https://leetcode-cn.com/submissions/detail/65315037/)

### 反思

其实更简单到一个方法是取起点到终点到距离，还有总距离，相减得到另外一半距离

## 1185. 一周中的第几天

[https://leetcode-cn.com/problems/day-of-the-week/](https://leetcode-cn.com/problems/day-of-the-week/)

### 思考

通过 dayOfYear 函数计算从 1971 年到目标日期经过的天数，将结果加 4（处理 1971 年 1 月 1 日周期）与 7 取模，并从 WEEK 数组中查找结果

[https://leetcode-cn.com/submissions/detail/65567524/](https://leetcode-cn.com/submissions/detail/65567524/)

### 反思

跟其他人解法基本一致

## 1189. “气球” 的最大数量

[https://leetcode-cn.com/problems/maximum-number-of-balloons/](https://leetcode-cn.com/problems/maximum-number-of-balloons/)

### 思考

先对 text 中的字母进行计数，然后循环 balloon，从计数 map 中减去所需的字母个数，不足则返回

[https://leetcode-cn.com/submissions/detail/65567566/](https://leetcode-cn.com/submissions/detail/65567566/)

### 反思

看到其他人的解法更加简单，通过计数后，取每个字母所需个数的最小值即为结果，不需要不断循环

## 1200. 最小绝对差

[https://leetcode-cn.com/problems/minimum-absolute-difference/](https://leetcode-cn.com/problems/minimum-absolute-difference/)

### 思考

先对数组进行排序，然后遍历计算元素得到最小的绝对值差，最后将绝对值差与最小差相等的元素对加入 List

[https://leetcode-cn.com/submissions/detail/65567606/](https://leetcode-cn.com/submissions/detail/65567606/)

### 反思

跟其他人的解法基本一致

## 1207. 独一无二的出现次数

[https://leetcode-cn.com/problems/unique-number-of-occurrences/](https://leetcode-cn.com/problems/unique-number-of-occurrences/)

### 思考

1. 通过对数字加 1000 将负数转为正数，
2. 使用`int[]`进行计数，计算每个每个数字出现的次数（map）
3. 使用另外一个`int[]`，表示数字出现的位置和次数（map2）
4. 如果当前次数没有出现过则加 1，如果已经出现过则返回 false

[https://leetcode-cn.com/submissions/detail/65765984/](https://leetcode-cn.com/submissions/detail/65765984/)

### 反思

跟其他人解法基本一致

## 1217. 玩筹码

[https://leetcode-cn.com/problems/play-with-chips/](https://leetcode-cn.com/problems/play-with-chips/)

### 思考

一开始对于题目没能很好理解没有找出解答思路

[https://leetcode-cn.com/submissions/detail/65766062/](https://leetcode-cn.com/submissions/detail/65766062/)

### 反思

移动偶数步无代价，移动奇数步代价一，找出数组中奇偶数的个数，将数量较少的一方移动奇数步。偶数>奇数=奇数、奇数<偶数=奇数

## 1221. 分割平衡字符串

[https://leetcode-cn.com/problems/split-a-string-in-balanced-strings/](https://leetcode-cn.com/problems/split-a-string-in-balanced-strings/)

### 思考

解题思路跟匹配括号类似，通过一个 Stack 进行存储，如果是空或者与栈顶字符一致则推入，否则弹出，直到栈为空则加一，因为输入已经是保证匹配的，所以不需要再做额外处理

[https://leetcode-cn.com/submissions/detail/65766118/](https://leetcode-cn.com/submissions/detail/65766118/)

### 反思

更简单的解法是通过一个数字进行计数统计，一个字符递增、一个字符递减，当出现计数为 0 则加一

## 1232. 缀点成线

[https://leetcode-cn.com/problems/check-if-it-is-a-straight-line/](https://leetcode-cn.com/problems/check-if-it-is-a-straight-line/)

### 思考

通过计算两个点之间点斜率，只要全部斜率相同则共线

[https://leetcode-cn.com/submissions/detail/66126598/](https://leetcode-cn.com/submissions/detail/66126598/)

### 反思

通过`x1 * y2 != x2 * y1`进行斜率计算

## 1237. 找出给定方程的正整数解

[https://leetcode-cn.com/problems/find-positive-integer-solution-for-a-given-equation/](https://leetcode-cn.com/problems/find-positive-integer-solution-for-a-given-equation/)

### 思考

通过暴力解答的方法，遍历所有可能的 x 和 y

[https://leetcode-cn.com/submissions/detail/66126702/](https://leetcode-cn.com/submissions/detail/66126702/)

### 反思

跟其他人解法类似

## 1252. 奇数值单元格的数目

[https://leetcode-cn.com/problems/cells-with-odd-values-in-a-matrix/](https://leetcode-cn.com/problems/cells-with-odd-values-in-a-matrix/)

### 思考

通过按照`indices`的内容执行所有变更后，遍历统计奇数单元格的情况

[https://leetcode-cn.com/submissions/detail/66126785/](https://leetcode-cn.com/submissions/detail/66126785/)

### 反思

奇/偶的加减可以转变成 boolean 的 true 和 false，行列的加减可以统一用两个数组解决，最后根据公式（规律）来得出奇偶的数量
