---
layout: post
date: 2020-05-10 17:56:12 +0800
slug: leetcode-java-17
title: "LeetCode 手记 17"
author: Yourtion
keywords: ["leetcode", "java"]
description: "可能的情况下使用桶记数而不是排序再判断；在查找/比较元素过程尽可能使用二分查找提升速度"
category: "学习"
tags: ["LeetCode", "Java"]
---
{% include JB/setup %}

## 本周收获

- 可能的情况下使用桶记数而不是排序再判断
- 在查找/比较元素过程尽可能使用二分查找提升速度

## 1370. 上升下降字符串

[https://leetcode-cn.com/problems/increasing-decreasing-string/](https://leetcode-cn.com/problems/increasing-decreasing-string/)

### 思考

先对字符串转换成`char[]`并进行排序，然后从头到尾找出不相同到字符串，再从尾到头找出不相同到字符串填充到 StringBuilder 中，循环操作直到所以字符使用完，返回结果

[https://leetcode-cn.com/submissions/detail/68116785/](https://leetcode-cn.com/submissions/detail/68116785/)

### 反思

官方解法使用桶记数的方式，避免了排序等问题

## 1374. 生成每种字符都是奇数个的字符串

[https://leetcode-cn.com/problems/generate-a-string-with-characters-that-have-odd-counts/](https://leetcode-cn.com/problems/generate-a-string-with-characters-that-have-odd-counts/)

### 思考

使用一个很简单粗暴的方法，先生成一个 n 个字符都是 a 的 char 数组，如果 n 是偶数，则把第一个字母换成 b

[https://leetcode-cn.com/submissions/detail/68118688/](https://leetcode-cn.com/submissions/detail/68118688/)

### 反思

跟其他人解法类似，但是使用 StringBuilder 貌似比 char 数组更快

## 1380. 矩阵中的幸运数

[https://leetcode-cn.com/problems/lucky-numbers-in-a-matrix/](https://leetcode-cn.com/problems/lucky-numbers-in-a-matrix/)

### 思考

通过两个数组记录每列最大和每行最小，然后循环矩阵，记录最大最小值，最后通过 set 查找除相交的结果（因为数字唯一）

[https://leetcode-cn.com/submissions/detail/68119472/](https://leetcode-cn.com/submissions/detail/68119472/)

### 反思

其他人的解法使用坐标直接判断， 不需要使用 set，更迅速

## 1385. 两个数组间的距离值

[https://leetcode-cn.com/problems/find-the-distance-value-between-two-arrays/](https://leetcode-cn.com/problems/find-the-distance-value-between-two-arrays/)

### 思考

循环 arr1 和 arr2 两个数组，对 arr1 的每个元素在 arr2 中计算距离并判断是否小于 d，如果小于等于则跳过，否则结果加 1

[https://leetcode-cn.com/submissions/detail/68376801/](https://leetcode-cn.com/submissions/detail/68376801/)

### 反思

跟官方题解的“模拟”类似，更高效的是使用“二分查找”（对 arr2 进行排序，加快 arr1 元素在 arr2 中的查找速度）

## 1389. 按既定顺序创建目标数组

[https://leetcode-cn.com/problems/create-target-array-in-the-given-order/](https://leetcode-cn.com/problems/create-target-array-in-the-given-order/)

### 思考

使用 List 进行数字的临时存储通过 add 方法在特定位置插入对应的数值，最后将 List 转换回`int[]`返回结果

[https://leetcode-cn.com/submissions/detail/68376894/](https://leetcode-cn.com/submissions/detail/68376894/)

### 反思

跟官方题解思路一致，更快的解法是直接使用`int[]`然后遇到插入当前位置/之前位置的情况则使用`System.arraycopy`对数据进行移动

## 1394. 找出数组中的幸运数

[https://leetcode-cn.com/problems/find-lucky-integer-in-an-array/](https://leetcode-cn.com/problems/find-lucky-integer-in-an-array/)

### 思考

1. 创建一个`int[]`用于记录对应数字出现次数
2. 循环数组在数组中对应位置加，同时记录数字的最大值（减少循环）
3. 从大到小遍历 map 数组，遇到元素与出现次数一致即返回

[https://leetcode-cn.com/submissions/detail/68376985/](https://leetcode-cn.com/submissions/detail/68376985/)

### 反思

跟官方解法一致

## 1399. 统计最大组的数目

[https://leetcode-cn.com/problems/count-largest-group/](https://leetcode-cn.com/problems/count-largest-group/)

### 思考

遍历每个数字计算数位和并放入 map 中进行计数，然后对 map 进行排序，从后向前遍历排序后的 map，遇到与最后一个（最大数量）不同的则返回结果

[https://leetcode-cn.com/submissions/detail/68585197/](https://leetcode-cn.com/submissions/detail/68585197/)

### 反思

跟官方的“哈希表”解法类似，但是官方不要排序，而是遍历数组累加与最大数量相同的个数

## 1403. 非递增顺序的最小子序列

[https://leetcode-cn.com/problems/minimum-subsequence-in-non-increasing-order/](https://leetcode-cn.com/problems/minimum-subsequence-in-non-increasing-order/)

### 思考

先对数组进行排序，从后向前取大数作为子序列 1，并从前向后取值累加，当累加大于大数子序列时候，则先累加后向数组（使其严格大于前面的）

[https://leetcode-cn.com/submissions/detail/68585252/](https://leetcode-cn.com/submissions/detail/68585252/)

### 反思

其他人解法通过将数组数字内容进行桶计数，并计算总和，再重新遍历计数数组，减少了排序和重复计算的问题

## 1408. 数组中的字符串匹配

[https://leetcode-cn.com/problems/string-matching-in-an-array/](https://leetcode-cn.com/problems/string-matching-in-an-array/)

### 思考

对于数组中的单词每个拿出来，跟数组中其他单词做比对（排除长度比当前单词大的）获取`word.lastIndexOf(w) != -1`则加入结果

[https://leetcode-cn.com/submissions/detail/68585295/](https://leetcode-cn.com/submissions/detail/68585295/)

### 反思

其他人的解法通过将所有单词组合成一个字符串，然后进行比对`allS.indexOf(s) != allS.lastIndexOf(s)`，有效减少了循环

## 1413. 逐步求和得到正数的最小值

[https://leetcode-cn.com/problems/minimum-value-to-get-positive-step-by-step-sum/](https://leetcode-cn.com/problems/minimum-value-to-get-positive-step-by-step-sum/)

### 思考

遍历累加数组中数字，同时获取最小值，如果最小值大于 1 则返回 1，否则返回负数的绝对值加 1

[https://leetcode-cn.com/submissions/detail/68863599/](https://leetcode-cn.com/submissions/detail/68863599/)

### 反思

跟其他人的解法基本一致

## 1417. 重新格式化字符串

[https://leetcode-cn.com/problems/reformat-the-string/](https://leetcode-cn.com/problems/reformat-the-string/)

### 思考

首先将字符串的数字和字母放入一个桶中，然后根据数字和字母的情况，填充到目标字符串里面

[https://leetcode-cn.com/submissions/detail/68881179/](https://leetcode-cn.com/submissions/detail/68881179/)

### 反思

其他人可以通过 stack 放入字符和数字，然后从 stack 从不断循环填充即可

## 1422. 分割字符串的最大得分

[https://leetcode-cn.com/problems/maximum-score-after-splitting-a-string/](https://leetcode-cn.com/problems/maximum-score-after-splitting-a-string/)

### 思考

1. 循环字符串数组，先计数其中的 1 作为右边的结果
2. 重新循环，如果遇到 0 则左边分数加一，否则右边分数减一，统计分数最大值
3. 返回最大值即为结果最大分数

[https://leetcode-cn.com/submissions/detail/68883503/](https://leetcode-cn.com/submissions/detail/68883503/)

### 反思

跟其他人解法基本一致

## 1431. 拥有最多糖果的孩子

[https://leetcode-cn.com/problems/kids-with-the-greatest-number-of-candies/](https://leetcode-cn.com/problems/kids-with-the-greatest-number-of-candies/)

### 思考

先遍历 candies 记录最大的糖果数量，再次遍历 candies 只要每个值加上 extraCandies 主要大于最大值即为 true

[https://leetcode-cn.com/submissions/detail/69096599/](https://leetcode-cn.com/submissions/detail/69096599/)

### 反思

跟其他人解法基本一致

## 1436. 旅行终点站

[https://leetcode-cn.com/problems/destination-city/](https://leetcode-cn.com/problems/destination-city/)

### 思考

1. 先将所有路径的起点加入一个 Set 中
2. 遍历路径，如果路径目标点不在 Set 中，即为目标终点

[https://leetcode-cn.com/submissions/detail/69096671/](https://leetcode-cn.com/submissions/detail/69096671/)

### 反思

跟其他人解法一致

## 1441. LCP 01. 猜数字

[https://leetcode-cn.com/problems/guess-numbers/](https://leetcode-cn.com/problems/guess-numbers/)

### 思考

解法很简单直接循环数组比对数字，相同则加一

[https://leetcode-cn.com/submissions/detail/69096725/](https://leetcode-cn.com/submissions/detail/69096725/)

### 反思

跟其他人解法一致

## 1442. LCP 02. 分式化简

[https://leetcode-cn.com/problems/deep-dark-fraction/](https://leetcode-cn.com/problems/deep-dark-fraction/)

### 思考

没有找到相应的解答思路

[https://leetcode-cn.com/submissions/detail/69393471/](https://leetcode-cn.com/submissions/detail/69393471/)

### 反思

从 cont 的末尾（即右下角的分数）开始计算，算出分子，分母，下一数时，因为有分号，上一轮的分子，要乘进来作为分母

## 1446. LCP 06. 拿硬币

[https://leetcode-cn.com/problems/na-ying-bi/](https://leetcode-cn.com/problems/na-ying-bi/)

### 思考

对于一堆硬币，如果是偶数则取二分之 n 次，奇数则还要加一，然后累加每堆硬币次数即可

[https://leetcode-cn.com/submissions/detail/69393512/](https://leetcode-cn.com/submissions/detail/69393512/)

### 反思

跟其他人解法一样

## 1447. LCP 07. 传递信息

[https://leetcode-cn.com/problems/chuan-di-xin-xi/](https://leetcode-cn.com/problems/chuan-di-xin-xi/)

### 思考

一开始考虑的是从后向前不断遍历查找路径，但是结果没有正确

[https://leetcode-cn.com/submissions/detail/69397312/](https://leetcode-cn.com/submissions/detail/69397312/)

### 反思

使用深度优先搜索，找出所有可能的传递方案。枚举每一轮传递玩家的编号和被传递玩家的编号。若当前是最后一轮且信息位于 k 处，则方案总数加 1

## 1451. LCP 11. 期望个数统计

[https://leetcode-cn.com/problems/qi-wang-ge-shu-tong-ji/](https://leetcode-cn.com/problems/qi-wang-ge-shu-tong-ji/)

### 思考

其实最终只和分数的个数有关，如果是同个分数有多个人，平均下来概率还是 1

[https://leetcode-cn.com/submissions/detail/69695262/](https://leetcode-cn.com/submissions/detail/69695262/)

### 反思

对于一个排好序的序列，对相同的数字随机打乱顺序后期望有多少个数字保持原位置不变。

## 1457. 面试题 01.01. 判定字符是否唯一

[https://leetcode-cn.com/problems/is-unique-lcci/](https://leetcode-cn.com/problems/is-unique-lcci/)

### 思考

因为题目建议不使用额外的数据结构，会很加分，所以通过转换成`char[]`循环并通过`astr.indexOf(arr[i], i + 1)`判断是否后面还出现当前字符

[https://leetcode-cn.com/submissions/detail/69695332/](https://leetcode-cn.com/submissions/detail/69695332/)

### 反思

跟其他人类似，其他人也有使用其他数据结构的

## 1458. 面试题 01.02. 判定是否互为字符重排

[https://leetcode-cn.com/problems/check-permutation-lcci/](https://leetcode-cn.com/problems/check-permutation-lcci/)

### 思考

使用一个`int[]`对两个字符中的`char`进行计数，一个执行加一，一个执行减一，如果是重排的，则最后计数数组全部为 0

[https://leetcode-cn.com/submissions/detail/69695425/](https://leetcode-cn.com/submissions/detail/69695425/)

### 反思

还有其他的解答使用数字异或与累加和进行判断，需要的空间更小
