---
layout: post
date: 2020-03-08 17:07:38 +0800
slug: leetcode-java-08
title: "LeetCode 手记 08"
author: Yourtion
keywords: ["leetcode", "java"]
description: "熟悉二叉搜索树的性质与遍历方法；使用全局变量保存递归中间结果，而不是不断调用递归函数计算"
category: "学习"
tags: ["LeetCode", "Java"]
---
{% include JB/setup %}

## 本周收获

- 熟悉二叉搜索树的性质与遍历方法
- 使用全局变量保存递归中间结果，而不是不断调用递归函数计算

## 485. 最大连续 1 的个数

[https://leetcode-cn.com/problems/max-consecutive-ones/](https://leetcode-cn.com/problems/max-consecutive-ones/)

### 思考

解法比较简单，通过应该计数器，当遇到 0 就比较当前 1 的数量和计数器，取最大值即可，注意最后返回时也要比对计数器（防止最后一位是 1）

[https://leetcode-cn.com/submissions/detail/50643972/](https://leetcode-cn.com/submissions/detail/50643972/)

### 反思

官方题解还有一致直接合并成字符串然后`split('0')`最后返回最长一组的方法

## 492. 构造矩形

[https://leetcode-cn.com/problems/construct-the-rectangle/](https://leetcode-cn.com/problems/construct-the-rectangle/)

### 思考

一开始就想到使用开平方拿到一个边，但是做题过程有个思路错了，应该是通过拿到的平方数直接递减找答案才对

[https://leetcode-cn.com/submissions/detail/50644902/](https://leetcode-cn.com/submissions/detail/50644902/)

### 反思

对这个数开方，然后往下递减第一个可以整除的是宽度，就是最好的结果。本质上是求因数

## 496. 下一个更大元素 I

[https://leetcode-cn.com/problems/next-greater-element-i/](https://leetcode-cn.com/problems/next-greater-element-i/)

### 思考

想法比较简单粗暴，直接遍历 nums2，然后构建一个 Map，最后遍历 nums1 返回结果

[https://leetcode-cn.com/submissions/detail/50589329/](https://leetcode-cn.com/submissions/detail/50589329/)

### 反思

官方题解中使用“单调栈”的方式，减少了在构建 Map 时候的遍历次数

## 500. 键盘行

[https://leetcode-cn.com/problems/keyboard-row/](https://leetcode-cn.com/problems/keyboard-row/)

### 思考

通过拿单词的首个字母，获得键盘行的字母序列，然后使用`contains`进行判断，符合要求的推入字符串，最后返回结果

[https://leetcode-cn.com/submissions/detail/50765714/](https://leetcode-cn.com/submissions/detail/50765714/)

### 反思

看到其他人的解法中使用 char 进行比对，速度感觉更快

## 501. 二叉搜索树中的众数

[https://leetcode-cn.com/problems/find-mode-in-binary-search-tree/](https://leetcode-cn.com/problems/find-mode-in-binary-search-tree/)

### 思考

使用一个 Map 保存遍历过程中的数字和次数，并返回最大次数，最后遍历 Map 返回最大次数的结果

[https://leetcode-cn.com/submissions/detail/50880109/](https://leetcode-cn.com/submissions/detail/50880109/)

### 反思

二叉搜索树的中序遍历是一个升序序列，逐个比对当前结点(root)值与前驱结点(pre)值。更新当前节点值出现次数(curTimes)及最大出现次数(maxTimes)，更新规则：若 curTimes=maxTimes,将 root->val 添加到结果向量(res)中；若 curTimes>maxTimes,清空 res,将 root->val 添加到 res,并更新 maxTimes 为 curTimes

## 504. 七进制数

[https://leetcode-cn.com/problems/base-7/](https://leetcode-cn.com/problems/base-7/)

### 思考

这个跟二进制转换方法基本一致，就是取余数，然后除 7，最后返回结果

[https://leetcode-cn.com/submissions/detail/50883276/](https://leetcode-cn.com/submissions/detail/50883276/)

### 反思

大家解法基本一致

## 506. 相对名次

[https://leetcode-cn.com/problems/relative-ranks/](https://leetcode-cn.com/problems/relative-ranks/)

### 思考

使用一个 Map 保存排序过的数组对应的名次，再二次遍历，记录对应名次并转换前三名

[https://leetcode-cn.com/submissions/detail/51067423/](https://leetcode-cn.com/submissions/detail/51067423/)

### 反思

其他人的题解中不需要`sort`和 Map，而是初始化一个最大值的`int[]`，再按照数字位置写入，返回名次即可

## 507. 完美数

[https://leetcode-cn.com/problems/perfect-number/](https://leetcode-cn.com/problems/perfect-number/)

### 思考

从 1 开始尝试算这个数的因子，并通过一个 Set 记录，最后计算因子的和，判断是否相等

[https://leetcode-cn.com/submissions/detail/51107279/](https://leetcode-cn.com/submissions/detail/51107279/)

### 反思

通过“欧几里得-欧拉定理”，只要带入最小的若干个素数 2, 3, 5, 7, 13, 17, 19, 31，将不超过 10^8 的所有完全数计算出来即可

## 509. 斐波那契数

[https://leetcode-cn.com/problems/fibonacci-number/](https://leetcode-cn.com/problems/fibonacci-number/)

### 思考

通过一个`int[]`缓存结果并按照逻辑计算

[https://leetcode-cn.com/submissions/detail/51100352/](https://leetcode-cn.com/submissions/detail/51100352/)

### 反思

题解有几种记忆缓存算法：先计算存储子问题的答案，然后利用子问题的答案计算当前斐波那契数的答案，还有“矩阵求幂”和“公式法”，使用黄金比例 Binet 公式

## 520. 检测大写字母

[https://leetcode-cn.com/problems/detect-capital/](https://leetcode-cn.com/problems/detect-capital/)

### 思考

一开始解法有问题，后来换了思路，先判断了大小写，再按照首字母大小去判断

[https://leetcode-cn.com/submissions/detail/51373667/](https://leetcode-cn.com/submissions/detail/51373667/)

### 反思

看其他人的解法类似

## 521. 最长特殊序列 Ⅰ

[https://leetcode-cn.com/problems/longest-uncommon-subsequence-i/](https://leetcode-cn.com/problems/longest-uncommon-subsequence-i/)

### 思考

一开始觉得这个问题比较复杂，但是后面也没想到解决方法，看了题解发现问题还是比较简单的

[https://leetcode-cn.com/submissions/detail/51387548/](https://leetcode-cn.com/submissions/detail/51387548/)

### 反思

官方题解提出：

1. a=b。如果两个字符串相同，则没有特殊子序列，返回 -1
2. 长度相等，但是字符串不同，返回任意一个的长度即可
3. 长度不等，长的字符串一定不会是短字符串的子序列，返回长的字符串长度

## 530. 二叉搜索树的最小绝对差

[https://leetcode-cn.com/problems/minimum-absolute-difference-in-bst/](https://leetcode-cn.com/problems/minimum-absolute-difference-in-bst/)

### 思考

之前的思路有些问题，只是比较一级子树，后来发现有问题，只能整体遍历

[https://leetcode-cn.com/submissions/detail/51505025/](https://leetcode-cn.com/submissions/detail/51505025/)

### 反思

看了一下其他人的解法，使用 BST 中序遍历是升序，所以遍历时求相邻两个节点之间的最小绝对差值即可

## 532. 数组中的 K-diff 数对

[https://leetcode-cn.com/problems/k-diff-pairs-in-an-array/](https://leetcode-cn.com/problems/k-diff-pairs-in-an-array/)

### 思考

先对目标数组进行排序，排序后后面的数字必定大于等于前面的，只需要向后查找即不会出现重复并可快速判断：

1. 如果数字已经出现过，则跳过
2. 如果两种的差已经超过 k，即可跳过（越往后差只会增大）
3. 如果满足条件，计数器加一，跳出循环继续下一轮判断

[https://leetcode-cn.com/submissions/detail/51538831/](https://leetcode-cn.com/submissions/detail/51538831/)

### 反思

看到更快速的解法通过两个指针进行循环，次数会更少

## 538. 把二叉搜索树转换为累加树

[https://leetcode-cn.com/problems/convert-bst-to-greater-tree/](https://leetcode-cn.com/problems/convert-bst-to-greater-tree/)

### 思考

使用一个列表来记录遇到的值，然后从右到左遍历树并处理累加，性能并不特别好，感觉使用列表会带来很大的消耗

[https://leetcode-cn.com/submissions/detail/51541625/](https://leetcode-cn.com/submissions/detail/51541625/)

### 反思

官方解法提到使用“回溯”（一个反序中序遍历方法），使用一个临时变量记录 sum 即可。还有“反序中序 Morris 遍历”（这个比较复杂，没怎么看懂）

## 541. 反转字符串 II

[https://leetcode-cn.com/problems/reverse-string-ii/](https://leetcode-cn.com/problems/reverse-string-ii/)

### 思考

按照题目说明梳理出了逻辑，然后有做了一下优化精简，但是整体代码感觉还是很复杂的样子

[https://leetcode-cn.com/submissions/detail/51574521/](https://leetcode-cn.com/submissions/detail/51574521/)

### 反思

官方题解很简单：为了翻转从`i`到`j`的字符块，我们可以交换位于`i++`和`j--`的字符，循环条件使用：`int start = 0; start < a.length; start += 2 * k`

## 543. 二叉树的直径

[https://leetcode-cn.com/problems/diameter-of-binary-tree/](https://leetcode-cn.com/problems/diameter-of-binary-tree/)

### 思考

一开始想到使用递归解，但是在最后计算的时候总是不对。看了一下题解，才明白计算中的问题

[https://leetcode-cn.com/submissions/detail/51899524/](https://leetcode-cn.com/submissions/detail/51899524/)

### 反思

题解中讲到“深度优先搜索”：最优路径经过 L + R + 1 个节点。

## 551. 学生出勤记录 I

[https://leetcode-cn.com/problems/student-attendance-record-i/](https://leetcode-cn.com/problems/student-attendance-record-i/)

### 思考

解答比较简单，就是遍历字符串，根据条件进行判断，尽快跳出循环

[https://leetcode-cn.com/submissions/detail/51857528/](https://leetcode-cn.com/submissions/detail/51857528/)

### 反思

题解中还有更加简单的使用`indexOf`和正则表达式的解法，确实也很神奇

## 557. 反转字符串中的单词 III

[https://leetcode-cn.com/problems/reverse-words-in-a-string-iii/](https://leetcode-cn.com/problems/reverse-words-in-a-string-iii/)

### 思考

先按照空格分割句子，再按照单词进行反转

[https://leetcode-cn.com/submissions/detail/51862332/](https://leetcode-cn.com/submissions/detail/51862332/)

### 反思

看了其他人的解法，更加快速的解法是转换成`char[]`然后遇到空格后就转换空格中间的部分

## 559. N 叉树的最大深度

[https://leetcode-cn.com/problems/maximum-depth-of-n-ary-tree/](https://leetcode-cn.com/problems/maximum-depth-of-n-ary-tree/)

### 思考

解法跟二叉树的遍历类似， 就是把左右子树比较换成子节点数组的循环，然后取最大值即可

[https://leetcode-cn.com/submissions/detail/52091007/](https://leetcode-cn.com/submissions/detail/52091007/)

### 反思

官方题解依然使用递归和迭代解答，在堆栈的帮助下将上面的递归转换为迭代

## 561. 数组拆分 I

[https://leetcode-cn.com/problems/array-partition-i/](https://leetcode-cn.com/problems/array-partition-i/)

### 思考

因为要保证 min 结果的和尽可能大， 那么就要把相近的数字放在一起，最简单的做法就是排序后取 0.2.4.6 这些偶数位置上的数字相加即可

[https://leetcode-cn.com/submissions/detail/52110387/](https://leetcode-cn.com/submissions/detail/52110387/)

### 反思

官方题解还提到一个使用额外的空间的哈希法，可以在`O(n)`时间复杂度完成

## 563. 二叉树的坡度

[https://leetcode-cn.com/problems/binary-tree-tilt/](https://leetcode-cn.com/problems/binary-tree-tilt/)

### 思考

因为坡度计算需要计算树的左右子树的和，所以需要多次递归，通过添加一个 Map 缓存子树结果，性能有所提升

[https://leetcode-cn.com/submissions/detail/52108542/](https://leetcode-cn.com/submissions/detail/52108542/)

### 反思

看了题解发现，递归不需要再重复循环计算子树的和，而是使用全局变量保存递归结果即可（在任何结点调用该函数，都会返回当前结点下面包括其自身的结点和）
