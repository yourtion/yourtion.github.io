---
layout: post
date: 2020-01-12 19:43:24 +08:00
slug: leecode-java-02
title: "LeetCode 手记 02"
author: Yourtion
keywords: ["leetcode", "java"]
description: "需要考虑元素移动的操作成本，通过与最后的元素交换获得更好性能；认真学习KMP算法；重新认真对二分法进行实践；了解动态规划与动态规划算法；了解一些基础的学习方法，如“牛顿法”；加强操作列表的结点指针的能力，包括循环条件的设置"
category: "学习"
tags: ["leetcode", "java"]
---
{% include JB/setup %}

## 本周收获与反思

- 需要考虑元素移动的操作成本，通过与最后的元素交换获得更好性能
- 认真学习KMP算法
- 重新认真对二分法进行实践
- 了解动态规划与动态规划算法
- 了解一些基础的学习方法，如“牛顿法”
- 加强操作列表的结点指针的能力，包括循环条件的设置

### 二分查找法模板

核心思想：“排除法”，每一轮循环排除一半以上的元素，使用对数时间复杂度把区间收缩到只剩1个数。把对单个值是否是目标数值的判断留在最后做，甚至有时连最后一步都省去了。

1. 前提:分析清楚左右边界，不要漏掉目标值，日标值很可能在边界
2. 中位数先写`int mid = (eft + right) >>> 1;`等循环里分支的逻辑写完，再回来做调整
3. 先写逻辑上容易想到的分支逻辑，这个分支遭辑通常是排除中位数的逻辑
4. 循环内只写两个分支，-个分支排除中位数，另个分支不排除中位数，循环中不单独对中位数作判断
5. 根据分支逻辑选择中位数，可能是左中位数，也可能是右中位数，选择的标准是避免循环
6. 退出循环的时候，可能需要对“夹逼“剩下的那个数单独做一次判断，这一步称之为“后处理" 
7. 取中位数的时候，要避免在计算上出现整型溢出;（Java中。一定要使用无符号右移>>>）
8. 编码一旦出现死循环，输出必要的变量值、分支逻辑是调试的重要方法。

### 分治法解决问题的模板

1. 定义基本情况。
2. 将问题分解为子问题并递归地解决它们。
3. 合并子问题的解以获得原始问题的解。

## 第一天

### 27. 移除元素

[https://leetcode-cn.com/problems/remove-element/](https://leetcode-cn.com/problems/remove-element/)

#### 思路

这道题目的解决方法跟上一道题移除重复元素一致，就是通过指针把当前的不等于所需移除的数字移到指针所在位置即可。

[https://leetcode-cn.com/submissions/detail/42506804/](https://leetcode-cn.com/problems/remove-element/)
#### 反思

官方题解的第一个方法跟我的基本一致，我还多余地判断了一次，没有必要。

看到第二个解法“双指针 —— 当要删除的元素很少时”时，明白了在解答时候需要考虑移动元素的次数，如果需要删除的元素较少时，直接交换最后一个元素，可以获得很高效率，减少交换的次数。

## 第二天

### 28. 实现 strStr()


#### 思路

方法比较简单粗暴，直接遍历haystack，查找needle的第一个值，找到后继续查找needle下面的结果，判断结果。

[https://leetcode-cn.com/submissions/detail/42526981/](https://leetcode-cn.com/problems/remove-element/)

#### 反思

字符串查找有 KMP、BM、Horspool、Sunday 等算法，很多东西还是要好好认真学习的。

> KMP 算法永不回退 txt 的指针 i，不走回头路（不会重复扫描 txt），而是借助 dp 数组中储存的信息把 pat 移到正确的位置继续匹配，时间复杂度只需 O(N)

### 35. 搜索插入位置


#### 思路

一开始是打算用二分法查找，但是写了五六次没有写出来，心累，所以直接遍历数组找了结果。

[https://leetcode-cn.com/submissions/detail/42656284/](https://leetcode-cn.com/problems/remove-element/)

#### 反思

看了一下题解，才发现之前二分法的写法和思路整个都是错的。

> 首先把循环可以进行的条件写成 `while(left < right)`，在退出循环的时候，一定有 `left == right` 成立，此时返回 `left` 或者 `right` 都可以。

## 第三天

### 38. 外观数列

[https://leetcode-cn.com/problems/count-and-say/](https://leetcode-cn.com/problems/remove-element/)

#### 思路

解题思路还是比较简单的，就是判断每个字符串跟之前一个是不是一样，一样就计数加一，否则把计数数量和字符拼接上去。其实可以使用递归让代码更加优雅，但是懒得写，直接使用了循环代替。

[https://leetcode-cn.com/submissions/detail/42782259/](https://leetcode-cn.com/problems/remove-element/)

#### 反思

看到题解也没有什么特别大的差别，但是有个JS的解法使用正则也是非常新颖：`prev = prev.replace(/(\d)\1*/g, item =>`${item.length}${item[0]}`)`

### 53. 最大子序和

[https://leetcode-cn.com/problems/maximum-subarray/](https://leetcode-cn.com/problems/remove-element/)

#### 思路

一开始看到题目其实也没有想到很好的方法，没有想到题目中O(N)的方法是怎么做的，只能用最笨的方法通过两层循环完成比对。

[https://leetcode-cn.com/submissions/detail/42789278/](https://leetcode-cn.com/problems/remove-element/)

#### 反思

题解中使用“贪心”算法有效地在O(N)时间完成题解，而且整个方法非常优雅。而分治法可以很好的用递归和多线程甚至分布式进行问题求解。

“动态规划（Kadane 算法）”则有些复杂，对于动态规划还是要好好再学一学。

> 每一步都选择最佳方案，到最后就是全局最优的方案

## 第四天

### 58. 最后一个单词的长度

[https://leetcode-cn.com/problems/length-of-last-word/](https://leetcode-cn.com/problems/remove-element/)

#### 思路

用了比较坑的解法，直接split，再取最后一个。

[https://leetcode-cn.com/submissions/detail/42908226/](https://leetcode-cn.com/problems/remove-element/)

#### 反思

正确的方法应该是从字符尾部开始遍历，直到遇到空格（注意一些边界条件，还有最后一个是空格的情况）

### 66. 加一

[https://leetcode-cn.com/problems/plus-one/](https://leetcode-cn.com/problems/remove-element/)

#### 思路

处理方法比较简单，从最后一位开始加一后判断是否为10，如果是10则置为0同时继续循环，否则返回结果。需要注意考虑全部为9进位的情况。

[https://leetcode-cn.com/submissions/detail/42910443/](https://leetcode-cn.com/problems/remove-element/)

#### 反思

大部分解法类似，他们会使用 `% 10` 来判断并处理变为10的情况。

## 第五天

### 67. 二进制求和

[https://leetcode-cn.com/problems/add-binary/](https://leetcode-cn.com/problems/remove-element/)

#### 思路

解题思路还是比较简单直接，通过一个变量确定是否需要进位，然后通过判断字符串进行计算，最后输出结果，注意处理最后的进位的情况，还有循环函数的流程

[https://leetcode-cn.com/submissions/detail/42922249/](https://leetcode-cn.com/problems/remove-element/)

#### 反思

题解中的解法使用0补齐的方法，整体看情况比我写的循环更加简洁

## 第六天

### 69. x 的平方根

[https://leetcode-cn.com/problems/sqrtx/](https://leetcode-cn.com/problems/remove-element/)

#### 思路

解题比较暴力，直接返回`(int) Math.floor(Math.sqrt(x))`，其实这样是不对的，直接用函数库的方法

[https://leetcode-cn.com/submissions/detail/43039291/](https://leetcode-cn.com/problems/remove-element/)

#### 反思

题解中讲了“二分法”和“牛顿法”，之前有听说过牛顿法求平方根，但是根本不知道这个解法的原理。还是要认真打一下基础才行。

> 使用二分查找法搜索，注意特值对搜索边界的影响


## 第七天

### 83. 删除排序链表中的重复元素

[https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list/](https://leetcode-cn.com/problems/remove-element/)

#### 思路

解题方法跟之前删除有序数组重复元素一致，但是一开始还是忽略了一些边界条件

[https://leetcode-cn.com/submissions/detail/43153054/](https://leetcode-cn.com/problems/remove-element/)

#### 反思

官方题解解法中的方法比起我写的代码简洁非常多，通过两个条件的while循环加上判断，很好地解决问题。

> 可以通过定义“循环不变式”来证明此代码的正确性。循环不变式是在循环的每次迭代之前和之后为真的条件。
