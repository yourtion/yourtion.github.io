---
layout: post
date: 2020-03-22 18:27:39 +08:00
slug: leetcode-java-10
title: "LeetCode 手记 10"
author: Yourtion
keywords: ["leetcode", "java"]
description: "字符串匹配`lastIndexOf`会快很多；有些情况下通过迭代可以减少空间的使用"
category: "学习"
tags: ["LeetCode", "Java"]
---
{% include JB/setup %}

## 本周收获

- 字符串匹配`lastIndexOf`会快很多
- 有些情况下通过迭代可以减少空间的使用

## 653. 两数之和 IV - 输入 BST

[https://leetcode-cn.com/problems/two-sum-iv-input-is-a-bst/](https://leetcode-cn.com/problems/two-sum-iv-input-is-a-bst/)

### 思考

一开始使用直接在树上搜索的方法是错误的，因为有可能不在相邻的节点上，需要通过遍历比较长的路径

[https://leetcode-cn.com/submissions/detail/54206462/](https://leetcode-cn.com/submissions/detail/54206462/)

### 反思

利用 BST 的性质，BST 的中序遍历结果是按升序排列的。因此，中序遍历给定的 BST，并将遍历结果存储到 list 中。遍历完成后，使用两个指针 l 和 r 作为 list 的头部索引和尾部索引进行搜索

## 657. 机器人能否返回原点

[https://leetcode-cn.com/problems/robot-return-to-origin/](https://leetcode-cn.com/problems/robot-return-to-origin/)

### 思考

解法思路比较简单，对 x 和 y 两个变量进行操作，根据 UDLR 进行加减，最后 x 和 y 都为 0 即是回到原点

[https://leetcode-cn.com/submissions/detail/54207504/](https://leetcode-cn.com/submissions/detail/54207504/)

### 反思

更简单的是进行计数，然后相减

## 661. 图片平滑器

[https://leetcode-cn.com/problems/image-smoother/](https://leetcode-cn.com/problems/image-smoother/)

### 思考

通过一个`calculate`方法计算当前节点的值，重新写回矩阵

[https://leetcode-cn.com/submissions/detail/54110993/](https://leetcode-cn.com/submissions/detail/54110993/)

### 反思

官方解法看起来很简洁，但一下子有些难理解

## 665. 非递减数列

[https://leetcode-cn.com/problems/non-decreasing-array/](https://leetcode-cn.com/problems/non-decreasing-array/)

### 思考

之前的想法就是通过遍历整个数组如果出现不满足非递减的情况，但是出现了一些不满足的情况

[https://leetcode-cn.com/submissions/detail/54467621/](https://leetcode-cn.com/submissions/detail/54467621/)

### 反思

需要对每一个非递减数列中的断点，分为两种不同的情况进行处理

## 669. 修剪二叉搜索树

[https://leetcode-cn.com/problems/trim-a-binary-search-tree/](https://leetcode-cn.com/problems/trim-a-binary-search-tree/)

### 思考

如果根节点满足条件，直接通过递归的形式处理左右子树并返回，否则返回子树递归处理的结果

[https://leetcode-cn.com/submissions/detail/54391080/](https://leetcode-cn.com/submissions/detail/54391080/)

### 反思

官方题解的逻辑一致，只是看起来更加简单

## 671. 二叉树中第二小的节点

[https://leetcode-cn.com/problems/second-minimum-node-in-a-binary-tree/](https://leetcode-cn.com/problems/second-minimum-node-in-a-binary-tree/)

### 思考

通过遍历整颗树，把结果放入 Set 中，并遍历两次 Set 中的元素找出第二大的结果

[https://leetcode-cn.com/submissions/detail/54393282/](https://leetcode-cn.com/submissions/detail/54393282/)

### 反思

官方解法二通过判断当 node.val > min1 不需要遍历子树

## 674. 最长连续递增序列

[https://leetcode-cn.com/problems/longest-continuous-increasing-subsequence/](https://leetcode-cn.com/problems/longest-continuous-increasing-subsequence/)

### 思考

思路很简单，就是遍历整个数组，然后遇到变小就重制并记录最大值。在实现过程中有很多细节、边界情况没有处理好，最后调试了几次

[https://leetcode-cn.com/submissions/detail/54722581/](https://leetcode-cn.com/submissions/detail/54722581/)

### 反思

跟官方的解法基本一致

## 680. 验证回文字符串 Ⅱ

[https://leetcode-cn.com/problems/valid-palindrome-ii/](https://leetcode-cn.com/problems/valid-palindrome-ii/)

### 思考

一开始打算使用一个函数判断跳过的方法，后来觉得可以不需要，结果套路错了，因为跳过有两个方向

[https://leetcode-cn.com/submissions/detail/54725871/](https://leetcode-cn.com/submissions/detail/54725871/)

### 反思

对于给定字符串中的每个索 i，让我们删除该字符，然后检查结果字符串是否是回文。

## 682. 棒球比赛

[https://leetcode-cn.com/submissions/detail/54723042/](https://leetcode-cn.com/submissions/detail/54723042/)

### 思考

通过一个数组和指针模拟栈，按照逻辑执行

[https://leetcode-cn.com/submissions/detail/54723042/](https://leetcode-cn.com/submissions/detail/54723042/)

### 反思

跟官方使用 Stack 实现一致

## 686. 重复叠加字符串匹配

[https://leetcode-cn.com/problems/repeated-string-match/](https://leetcode-cn.com/problems/repeated-string-match/)

### 思考

一开始考虑的方法就是不断拼接字符串 A 并通过 indexOf 的方法，但是一直会出现时间超出限制的错误

[https://leetcode-cn.com/submissions/detail/55045499/](https://leetcode-cn.com/submissions/detail/55045499/)

### 反思

使用`lastIndexOf`和`indexOf`来进行字符串匹配测试数据的问题`lastIndexOf`会快很多

## 687. 最长同值路径

[https://leetcode-cn.com/problems/longest-univalue-path/](https://leetcode-cn.com/problems/longest-univalue-path/)

### 思考

一开始通过递归并保存到 Map 的方式，但是这样计算的结果会有重复

[https://leetcode-cn.com/submissions/detail/55044230/](https://leetcode-cn.com/submissions/detail/55044230/)

### 反思

对于每个节点，我们向左延伸的最长箭头和向右延伸的最长箭头，将这些候选答案记录下来，并返回最佳答案。

## 690. 员工的重要性

[https://leetcode-cn.com/problems/employee-importance/](https://leetcode-cn.com/problems/employee-importance/)

### 思考

一开始解答时候忘记考虑员工下属的下属的递归的情况，后面使用栈解决了这个问题

[https://leetcode-cn.com/submissions/detail/55040904/](https://leetcode-cn.com/submissions/detail/55040904/)

### 反思

官方解法使用深度优先搜索 DFS 递归解答

## 693. 交替位二进制数

[https://leetcode-cn.com/problems/binary-number-with-alternating-bits/](https://leetcode-cn.com/problems/binary-number-with-alternating-bits/)

### 思考

解法比较简单粗暴，通过`Integer.toBinaryString(n).toCharArray()`转换成字符串数组，然后按照字符进行判断是否交替

[https://leetcode-cn.com/submissions/detail/55255318/](https://leetcode-cn.com/submissions/detail/55255318/)

### 反思

通过`n%2`和`n//2`操作获得最后一位和其余的位。如果最后一位等于剩余的最后一位，那么两个相邻的位具有相同的值，则答案是 False 的，反之，答案是 True 的

## 696. 计数二进制子串

[https://leetcode-cn.com/problems/count-binary-substrings/](https://leetcode-cn.com/problems/count-binary-substrings/)

### 思考

一开始的思路就暴力比较，因为存在两层循环，复杂度达到 n 平方级别，在长字符串就会出现超时

[https://leetcode-cn.com/submissions/detail/55256330/](https://leetcode-cn.com/submissions/detail/55256330/)

### 反思

需要按照分组的形式，字符串的中间部分必须出现在两个组之间

## 697. 数组的度

[https://leetcode-cn.com/problems/degree-of-an-array/](https://leetcode-cn.com/problems/degree-of-an-array/)

### 思考

一开始对题目对条件不是很清楚，其实主要是度数 d 的数组必须有一些元素 x 出现 d 次，并找到最短对子数组

[https://leetcode-cn.com/submissions/detail/55255833/](https://leetcode-cn.com/submissions/detail/55255833/)

### 反思

通过统计出现次数和最前最后索引，取出最大度的数为候选，取这些候选的最小值即可

## 700. 二叉搜索树中的搜索

[https://leetcode-cn.com/problems/search-in-a-binary-search-tree/](https://leetcode-cn.com/problems/search-in-a-binary-search-tree/)

### 思考

通过二叉搜索树性质加上递归很容易解答，只需要返回`root.val > val ? searchBST(root.left, val) : searchBST(root.right, val);`

[https://leetcode-cn.com/submissions/detail/55625429/](https://leetcode-cn.com/submissions/detail/55625429/)

### 反思

官方题解也提到使用迭代进行，通过`root = val < root.val ? root.left : root.right`减少递归中栈空间的使用

## 703. 数据流中的第 K 大元素

[https://leetcode-cn.com/problems/kth-largest-element-in-a-stream/](https://leetcode-cn.com/problems/kth-largest-element-in-a-stream/)

### 思考

通过使用 Java 内置的`PriorityQueue`作为小根堆，然后在超出数量的情况下，不断驱逐元素即可

[https://leetcode-cn.com/submissions/detail/55625543/](https://leetcode-cn.com/submissions/detail/55625543/)

### 反思

可以使用数组实现小根堆

## 704. 二分查找

[https://leetcode-cn.com/problems/binary-search/](https://leetcode-cn.com/problems/binary-search/)

### 思考

还是简单的二分查找，但是感觉自己掌握的还不够熟练

[https://leetcode-cn.com/submissions/detail/55626809/](https://leetcode-cn.com/submissions/detail/55626809/)

### 反思

- 初始化指针 left = 0, right = n - 1。
- 当 left <= right：比较中间元素 nums[pivot] 和目标值 target 。
  1. 如果 target = nums[pivot]，返回 pivot。
  2. 如果 target < nums[pivot]，则在左侧继续搜索 right = pivot - 1。
  3. 如果 target > nums[pivot]，则在右侧继续搜索 left = pivot + 1。

## 705. 设计哈希集合

[https://leetcode-cn.com/problems/design-hashset/](https://leetcode-cn.com/problems/design-hashset/)

### 思考

使用一个数组作为哈希桶，然后每个桶里使用 LinkedList 作为内容存储

[https://leetcode-cn.com/submissions/detail/55953162/](https://leetcode-cn.com/submissions/detail/55953162/)

### 反思

官方解法还提到可以使用二叉搜索树进行内容存储，查找效率更高

## 706. 设计哈希映射

[https://leetcode-cn.com/problems/design-hashmap/](https://leetcode-cn.com/problems/design-hashmap/)

### 思考

跟哈希集合设计类似，使用一个 Pair 作为内容 KV 的存储容器

[https://leetcode-cn.com/submissions/detail/55953344/](https://leetcode-cn.com/submissions/detail/55953344/)

### 反思

跟官方解法一致

## 709. 转换成小写字母

[https://leetcode-cn.com/problems/to-lower-case/](https://leetcode-cn.com/problems/to-lower-case/)

### 思考

通过转换为`char[]`，然后循环判断，原地修改，最后重新生成字符串

[https://leetcode-cn.com/submissions/detail/55953438/](https://leetcode-cn.com/submissions/detail/55953438/)

### 反思

跟其他人的解法基本一致
