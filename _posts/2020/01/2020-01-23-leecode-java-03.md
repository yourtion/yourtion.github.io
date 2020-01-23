---
layout: post
date: 2020-01-19 22:12:28 +08:00
slug: leecode-java-01
title: "LeetCode 手记 01"
author: Yourtion
keywords: ["leetcode", "java"]
description: "需要熟悉双指针类型的解法；加强做题耐心与技巧，仔细发现规律；需要加强对于树这种数据结构的学习"
category: "学习"
tags: ["leetcode", "java"]
---
{% include JB/setup %}

## 本周收获与反思

- 需要熟悉双指针类型的解法
- 加强做题耐心与技巧，仔细发现规律
- 需要加强对于树这种数据结构的学习

## 第一天

### 88. 合并两个有序数组

[https://leetcode-cn.com/problems/merge-sorted-array/](https://leetcode-cn.com/problems/merge-sorted-array/)

#### 思路

直接原位复制，从后往前复制数组元素，直到两个列表都复制完成，需要考虑两个数组的其中一个甚至两个数组都是空数组的情况。

[https://leetcode-cn.com/submissions/detail/43345599/](https://leetcode-cn.com/submissions/detail/43345599/)

#### 反思

我的解法跟官方解法第三种的“双指针/从后往前”逻辑是一致的，但是感觉官方示例代码更加优雅一些。

### 100. 相同的树

[https://leetcode-cn.com/problems/same-tree/](https://leetcode-cn.com/problems/same-tree/)

#### 思路

比对两个节点（不为null且val相等，或者都为null），然后递归比对左右子树。

[https://leetcode-cn.com/submissions/detail/43348978/](https://leetcode-cn.com/submissions/detail/43348978/)

#### 反思

跟官方的解法一致，但是感觉官方那么写更好理解

## 第二天

### 101. 对称二叉树

[https://leetcode-cn.com/problems/symmetric-tree/](https://leetcode-cn.com/problems/symmetric-tree/)

#### 思路

直接对比左子树的右子树和右子树的左子树，然后循环比对。实现上代码还是有些细节没考虑到。

[https://leetcode-cn.com/submissions/detail/43352474/](https://leetcode-cn.com/submissions/detail/43352474/)

#### 反思

跟官方的解法一致，但是初始条件没有考虑到可以像官方解法一样使用两个root，导致出了一些问题和逻辑错误。

### 104. 二叉树的最大深度

[https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/)

#### 思路

还是通过递归和一个辅助函数完成计算，如果节点不为null则深度加一，然后递归处理左右子树取最大值。

[https://leetcode-cn.com/submissions/detail/43478449/](https://leetcode-cn.com/submissions/detail/43478449/)

#### 反思

官方DFS深度搜索的方法更为简洁，对于树的操作还需要加强啊。

## 第三天

### 107. 二叉树的层次遍历 II

[https://leetcode-cn.com/problems/binary-tree-level-order-traversal-ii/](https://leetcode-cn.com/problems/binary-tree-level-order-traversal-ii/)

#### 思路

通过递归执行，将结果存入Map保存，最后还原为数组

[https://leetcode-cn.com/submissions/detail/43605297/](https://leetcode-cn.com/submissions/detail/43605297/)

#### 反思

题解使用DFS或者BFS进行遍历，使用的存储空间会更少 

### 108. 将有序数组转换为二叉搜索树

[https://leetcode-cn.com/problems/convert-sorted-array-to-binary-search-tree/](https://leetcode-cn.com/problems/convert-sorted-array-to-binary-search-tree/)

#### 思路

从中间节点作为根节点开始，不断递归构造子树，最后得到目标二叉搜索树。

[https://leetcode-cn.com/submissions/detail/43610263/](https://leetcode-cn.com/submissions/detail/43610263/)

## 第四天

### 110. 平衡二叉树

[https://leetcode-cn.com/problems/balanced-binary-tree/](https://leetcode-cn.com/problems/balanced-binary-tree/)

#### 思路

思考了蛮久，没有想到一个好的方案，只能暴力穷举，效果很不理想

[https://leetcode-cn.com/submissions/detail/43734212/](https://leetcode-cn.com/submissions/detail/43734212/)

#### 反思

相对我上面的暴力法的O(N^2)，题解中“从底至顶（提前阻断法）”，可以很有效的减少重复计算，通过做深度优先遍历DFS，只要发现不平衡的情况，直接终止。

## 第五天

### 70. 爬楼梯*

[https://leetcode-cn.com/problems/climbing-stairs/](https://leetcode-cn.com/problems/climbing-stairs/)

#### 思路

思考了蛮久，一直没有想到思路，只能参考题解了。

[https://leetcode-cn.com/submissions/detail/43846697/](https://leetcode-cn.com/submissions/detail/43846697/)

#### 反思

使用基于缓存的穷举法，其实还是比较简单，但是一直思路都没对，其实一开始也有考虑过动态规划和找规律，但是没仔细做下去，用斐波那契数列去解，耐心各方面都不够。

而且官方解法还有更加高端的“Binets 方法”和“斐波那契公式“

## 第五天

### 111. 二叉树的最小深度*

[https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/](https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/)

#### 思路

思考了蛮久，尝试了几种解法，都没有找到正确的解答，参考了题解做出来了

[https://leetcode-cn.com/submissions/detail/43886662/](https://leetcode-cn.com/submissions/detail/43886662/)

#### 反思

我使用的是最简单的“递归”也就是“深度优先搜索”，此外还有“深度优先搜索迭代”和“深度优先搜索迭代”。准确的讲，这几个方法我都没有很好的掌握，所以遇到问提才会一直走弯路。
