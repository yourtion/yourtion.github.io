---
layout: post
date: 2020-01-05 12:43:24 +0800
slug: leetcode-java-01
title: "LeetCode 手记 01"
author: Yourtion
keywords: ["leetcode", "java"]
description: "使用charAt()进行字符串遍历与操作；减少额外内存占用；使用“双指针”简化代码；考虑如何使用额外的空间极大降低代码时间复杂度；对解题方法要举一反三；多注意溢出等边界条件与问题"
category: "学习"
tags: ["LeetCode", "Java"]
---
{% include JB/setup %}

## 本周收获与反思

- 使用 `charAt()` 进行字符串遍历与操作，减少额外内存占用
- 使用“双指针”简化代码
- 考虑如何使用额外的空间极大降低代码时间复杂度
- 对解题方法要举一反三
- 多注意溢出等边界条件与问题


## 1. 两数之和

[https://leetcode-cn.com/problems/two-sum/](https://leetcode-cn.com/problems/two-sum/)

### 思路

做题的时候就是想到最简单的暴力穷举的方法，通过两层循环不断测试与目标答案是否符合，最终写出了解决方法。

[https://leetcode-cn.com/submissions/detail/41919022/](https://leetcode-cn.com/submissions/detail/41919022/)

### 反思

但是看到官方提供的题解，发现自己从一开始思考时候忽略了解题的一个突破口，通过空间换时间，通过“哈希表”可以完成快速查找所需结果是否存在于给定数列中。

> 通过将数字加入map，然后将目标减去当前数字，并查找结果是否存在与map中

## 7. 整数反转

[https://leetcode-cn.com/problems/reverse-integer/](https://leetcode-cn.com/problems/reverse-integer/)

### 思路


这道题想到的也还是很简单的想到了转换到字符串数组，然后翻转字符串数组的解题方法，同时记得处理了负数的情况。

但是第一次提交答案没有通过，因为`int`溢出了，所以通过简单地加个`trycatch`解决了。

[https://leetcode-cn.com/submissions/detail/41919035/](https://leetcode-cn.com/submissions/detail/41919035/)

### 反思

看到官方的题解，发现通过巧妙的数学方法“弹出”和“推入”数字可以快速解决问题，这个方法从来没想到，自己模拟了一下才大致明白解法的思路。

同时对于数字溢出也没有很好掌握，只是简单通过trycatch解决问题。

> 弹出（x % 10）和推入（rev * 10 + pop）数字 & 溢出前进行检查（一个是大于整数最大值MAX_VALUE，另一个是小于整数最小值MIN_VALUE）

## 9. 回文数

[https://leetcode-cn.com/problems/palindrome-number/](https://leetcode-cn.com/problems/palindrome-number/)

### 思路

一上来解决思路很简单，就是转换成字符串，然后循环进行头尾数字对比，但是做题过程很粗心，最简单的边界条件也没有整好，测试也没有好好跑就去提交答案，还错了三次。

[https://leetcode-cn.com/submissions/detail/41956263/](https://leetcode-cn.com/submissions/detail/41956263/)

### 反思

官方题解与上一个题目翻转数字解法类似，通过翻转一半数字的方法，处理问题。（**对于问题的解决方法要知道举一反三**）

> 将原始数字除以 10，然后给反转后的数字乘上 10，所以，当原始数字小于反转后的数字时，就意味着我们已经处理了一半位数的数字。（通过 revertedNumber/10 去除处于中位的数字）


## 13. 罗马数字转整数

[https://leetcode-cn.com/problems/roman-to-integer/](https://leetcode-cn.com/problems/roman-to-integer/)

### 思路

先通过特殊类型的字典，计算六种特殊类型的组合，然后在拆开字符串通过字典查找进行加和，最终返回结果。

[https://leetcode-cn.com/submissions/detail/42078580/](https://leetcode-cn.com/submissions/detail/42078580/)

### 反思

从精选题解看到解法也类似，但是感觉我自己写的看起来代码更加清晰，但是因为使用了`contains` 和 `replace`，带来了不必要的内存损耗，看到比较好的方法是比较前后结果。

> 每次比较后一个和前一个的值的大小关系，前值小于后值，减去前值，反之加上前值


## 14. 最长公共前缀

[https://leetcode-cn.com/problems/longest-common-prefix](https://leetcode-cn.com/problems/longest-common-prefix)

### 思路

解题一开始思路比较直接，通过找出最短的长度，然后每个单词去遍历，直到发现不不同。但是解决过程非常粗心，忽略了非常多的边界条件，结果错误了五次，结果性能看起来还是比较不错的。

[https://leetcode-cn.com/submissions/detail/42194822/](https://leetcode-cn.com/submissions/detail/42194822/)

### 反思

该问题叫做LCP问题，题解中讲了好几种解决方式，包括介绍了Trie(前缀树)，官方的解法中关于分治还有二分查找的方法确实很让我受启发，代码也简洁很多。 



## 20. 有效的括号

[https://leetcode-cn.com/problems/valid-parentheses](https://leetcode-cn.com/problems/valid-parentheses)

### 思路

最开始想到的解法就是使用栈来进行，看到左括号入栈，看到右括号比对并出栈，不匹配直接返回。一开始使用String，后面使用Character，但是都还是用了Java自带的Stack，总体实现过程还是有些粗心，一些边界情况没有考虑。

[https://leetcode-cn.com/submissions/detail/42223358/](https://leetcode-cn.com/submissions/detail/42223358/)

### 反思

我的解法跟官方解法逻辑一致，但是官方提供的代码比我的简洁很多。

## 21. 合并两个有序链表

[https://leetcode-cn.com/problems/merge-two-sorted-lists](https://leetcode-cn.com/problems/merge-two-sorted-lists)

### 思路

一开始的想法就是遍历两个有序链表，根据当前值不断插入到新的链表上，但是一开始解决的思路有点偏，写了非常多的判断和临时变量，后来重新构思并重构了代码整体逻辑还是比较清楚的。

[https://leetcode-cn.com/submissions/detail/42265463/](https://leetcode-cn.com/submissions/detail/42265463/)

### 反思

官方提供递归写法看起来很优雅，这个是之前没有考虑的。

我的解法跟官方迭代的解法逻辑一致，但是官方提供的代码比我的简洁很多，多余创建的判断其实可以通过巧妙的方法解决，同时官方的解法没有创建新的节点，都是直接使用原有链表的节点对象，只是创建了一个新的根节点。

**官方解法会破坏原链表，我的解法不会**


## 26. 删除排序数组中的重复项

[https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array//)

### 思路

思路还是比较简单的，因为是一个有序数组，直接从第一个开始，只要跟前面的不同，就把它放到数组里面游标当前位置，同时游标加一，最后返回游标即为不同元素的数量。

[https://leetcode-cn.com/submissions/detail/42328969/](https://leetcode-cn.com/submissions/detail/42328969/)

### 反思

官方解法类似，但是官方使用双指针法，不需要像我那样依赖一个临时变量保存当前值，解法更为优雅。


