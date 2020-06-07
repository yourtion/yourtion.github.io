---
layout: post
date: 2020-06-07 17:40:06 +0800
slug: leetcode-java-21
title: "LeetCode 手记 21"
author: Yourtion
keywords: ["leetcode", "java"]
description: "需要进一步熟悉回溯法；学习并掌握“字典排序（二进制排序） 子集”；对回溯方法需要进一步理解，做到举一反三"
category: "学习"
tags: ["LeetCode", "Java"]
---
{% include JB/setup %}

## 本周收获

- 需要进一步熟悉回溯法
- 学习并掌握“字典排序（二进制排序） 子集”
- 对回溯方法需要进一步理解，做到举一反三

## 49. 字母异位词分组

[https://leetcode-cn.com/problems/group-anagrams/](https://leetcode-cn.com/problems/group-anagrams/)

### 思考

先对每个单词转换成`char[]`后进行排序，并重新转换为一个 key，使用一个 Map 对相同字母的异位词进行存储，将相同字母组成的词放入 map 中，最后转换成数组输出

[https://leetcode-cn.com/submissions/detail/75437663/](https://leetcode-cn.com/submissions/detail/75437663/)

### 反思

除了使用排序外，还可以使用统计字符计数的方式，性能会相对更好一些

## 54. 螺旋矩阵

[https://leetcode-cn.com/problems/spiral-matrix/](https://leetcode-cn.com/problems/spiral-matrix/)

### 思考

通过一个方向矩阵模拟遍历的路径，但是这样写起来比较复杂

[https://leetcode-cn.com/submissions/detail/75430714/](https://leetcode-cn.com/submissions/detail/75430714/)

### 反思

需要通过另外一个矩阵，记录访问过的单元格位置，遍历整个矩阵，下一步候选移动位置是 (cr, cc)。如果这个候选位置在矩阵范围内并且没有被访问过，那么它将会变成下一步移动的位置；否则，我们将前进方向顺时针旋转之后再计算下一步的移动位置

## 59. 螺旋矩阵 II

[https://leetcode-cn.com/problems/spiral-matrix-ii/](https://leetcode-cn.com/problems/spiral-matrix-ii/)

### 思考

跟 54 题解法类似，先生成结果矩阵，然后循环生成 1 到 n 平方的数，按照方向矩阵指向，累加并填充到目标矩阵

[https://leetcode-cn.com/submissions/detail/75436057/](https://leetcode-cn.com/submissions/detail/75436057/)

### 反思

跟其他人解法基本一致

## 60. 第 k 个排列

[https://leetcode-cn.com/problems/permutation-sequence/](https://leetcode-cn.com/problems/permutation-sequence/)

### 思考

一开始考虑的方法是根据排列数量直接算出结果

[https://leetcode-cn.com/submissions/detail/75711526/](https://leetcode-cn.com/submissions/detail/75711526/)

### 反思

应该使用数字生成排列，然后映射到组合/子集/排列中。

- 生成输入数组，存储从 1 到 N 的数字。
- 计算从 0 到 (N−1)! 的所有阶乘数。
- (0,N!−1) 区间内，k 重复减 1。
- 计算 k 的阶乘，使用阶乘系数构造排列。
- 返回排列字符串。

## 61. 旋转链表

[https://leetcode-cn.com/problems/rotate-list/](https://leetcode-cn.com/problems/rotate-list/)

### 思考

先计算链表长度，然后将 k 与长度取模，最后循环 k-1，直到 k 为 0，将上一个节点的 next 置为 null，最后返回当前节点

[https://leetcode-cn.com/submissions/detail/75711816/](https://leetcode-cn.com/submissions/detail/75711816/)

### 反思

跟官方解法一致：先将链表闭合成环，找到相应的位置断开这个环，确定新的链表头和链表尾

## 62. 不同路径

[https://leetcode-cn.com/problems/unique-paths/](https://leetcode-cn.com/problems/unique-paths/)

### 思考

一开始考虑是通过模拟的方式进行计算，但是这样太复杂

[https://leetcode-cn.com/submissions/detail/75711885/](https://leetcode-cn.com/submissions/detail/75711885/)

### 反思

通过动态规划方式，令`dp[i][j]`是到达 i, j 最多路径

## 63. 不同路径 II

[https://leetcode-cn.com/problems/unique-paths-ii/](https://leetcode-cn.com/problems/unique-paths-ii/)

### 思考

一开始的思路是参考之前“不同路径”题目的解答，只是判断遇到的节点是否为 1

[https://leetcode-cn.com/submissions/detail/75977349/](https://leetcode-cn.com/submissions/detail/75977349/)

### 反思

从左至右、从上至下的遍历整个数组，那么在到达某个顶点之前我们就已经获得了到达前驱节点的方案数

## 64. 最小路径和

[https://leetcode-cn.com/problems/minimum-path-sum/](https://leetcode-cn.com/problems/minimum-path-sum/)

### 思考

通过遍历矩阵，计算到达当前节点最短路径，当前节点加上上方或左方的最小值，到达最后返回对应元素即可

[https://leetcode-cn.com/submissions/detail/75991166/](https://leetcode-cn.com/submissions/detail/75991166/)

### 反思

跟官方解法“方法 4：动态规划（不需要额外存储空间）”一致，只是官方解法从后向前遍历，最后返回`grid[0][0]`

## 71. 简化路径

[https://leetcode-cn.com/problems/simplify-path/](https://leetcode-cn.com/problems/simplify-path/)

### 思考

通过将路径使用`/`分割成数组。然后循环遍历

1. 遇到`.`或者空串则跳过
2. 遇到`..`则从栈 pop 出一个元素（如果栈不为空）
3. 如果是其他情况则将字符串压入栈中

最后将栈内元素组合成目标路径，如果栈为空则返回“/”

[https://leetcode-cn.com/submissions/detail/75993108/](https://leetcode-cn.com/submissions/detail/75993108/)

### 反思

跟其他人解法基本一致

## 73. 矩阵置零

[https://leetcode-cn.com/problems/set-matrix-zeroes/](https://leetcode-cn.com/problems/set-matrix-zeroes/)

### 思考

先遍历找出存在 0 的行和列，将第一行第一列作为标志位，再按照标志位循环遍历行列给对应数据填 0，最后处理第一行和列的情况

[https://leetcode-cn.com/submissions/detail/76217390/](https://leetcode-cn.com/submissions/detail/76217390/)

### 反思

跟官方解法思路基本一致，但是实现上还是有些细节没有处理好

## 74. 搜索二维矩阵

[https://leetcode-cn.com/problems/search-a-2d-matrix/](https://leetcode-cn.com/problems/search-a-2d-matrix/)

### 思考

先按照行判断目标值是否再行的范围内，再使用二分法查找

[https://leetcode-cn.com/submissions/detail/76222561/](https://leetcode-cn.com/submissions/detail/76222561/)

### 反思

可以将整个矩阵看成一个长的有序数组，然后使用二分法查找，只是在取值时候转换成矩阵行列

## 75. 颜色分类

[https://leetcode-cn.com/problems/sort-colors/](https://leetcode-cn.com/problems/sort-colors/)

### 思考

使用双指针法，前面遇到 2 就跟后面交换，后面遇到 0 就跟前面交换

[https://leetcode-cn.com/submissions/detail/76222657/](https://leetcode-cn.com/submissions/detail/76222657/)

### 反思

沿着数组移动 curr 指针，若`nums[curr] = 0`，则将其与`nums[p0]`互换；若`nums[curr] = 2`，则与`nums[p2]`互换。

## 9050. 面试题 18. 删除链表的节点

[https://leetcode-cn.com/problems/shan-chu-lian-biao-de-jie-dian-lcof/](https://leetcode-cn.com/problems/shan-chu-lian-biao-de-jie-dian-lcof/)

### 思考

循环链表并记录当前节点与之前节点，遇到目标值后将之前节点指向下一节点，注意处理目标值是头部的情况

[https://leetcode-cn.com/submissions/detail/76533389/](https://leetcode-cn.com/submissions/detail/76533389/)

### 反思

跟其他人解法基本一致

## 9051. 面试题 21. 调整数组顺序使奇数位于偶数前面

[https://leetcode-cn.com/problems/diao-zheng-shu-zu-shun-xu-shi-qi-shu-wei-yu-ou-shu-qian-mian-lcof/](https://leetcode-cn.com/problems/diao-zheng-shu-zu-shun-xu-shi-qi-shu-wei-yu-ou-shu-qian-mian-lcof/)

### 思考

通过首尾双指针的方式进行搜索，指针 i 左边都是奇数，指针 j 右边都是偶数

[https://leetcode-cn.com/submissions/detail/76533594/](https://leetcode-cn.com/submissions/detail/76533594/)

### 反思

跟其他人解法基本一致

## 9052. 面试题 22. 链表中倒数第 k 个节点

[https://leetcode-cn.com/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof/](https://leetcode-cn.com/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof/)

### 思考

通过快慢指针的方式，快指针先走 k 步，慢指针开始走直到快指针到达就可以返回

[https://leetcode-cn.com/submissions/detail/76533760/](https://leetcode-cn.com/submissions/detail/76533760/)

### 反思

跟其他人解法一致

## 77. 组合

[https://leetcode-cn.com/problems/combinations/](https://leetcode-cn.com/problems/combinations/)

### 思考

使用回溯的方式，循环数字，并不断添加到 list 中，当 list 长度达到目标时添加到结果列表中

[https://leetcode-cn.com/submissions/detail/76766365/](https://leetcode-cn.com/submissions/detail/76766365/)

### 反思

1. 若组合完成- 添加到输出中。
2. 遍历从 first t 到 n 的所有整数。

- 将整数 i 添加到现有组合`curr`中。
- 继续向组合中添加更多整数 `backtrack(i + 1, curr)`
- 将 i 从`curr`中移除，实现回溯。

## 78. 子集

[https://leetcode-cn.com/problems/subsets/](https://leetcode-cn.com/problems/subsets/)

### 思考

跟前面 77 题的方法类似，使用回溯的方法解答

[https://leetcode-cn.com/submissions/detail/76792979/](https://leetcode-cn.com/submissions/detail/76792979/)

### 反思

使用“字典排序（二进制排序） 子集”更快，将每个子集映射到长度为 n 的位掩码中，其中第 i 位掩码`nums[i]`为 1，表示第 i 个元素在子集中；如果第 i 位掩码`nums[i]`为 0，表示第 i 个元素不在子集中。

## 79. 单词搜索

[https://leetcode-cn.com/problems/word-search/](https://leetcode-cn.com/problems/word-search/)

### 思考

因为存在平面多个方向的问题，同时还要处理不能往回走的问题，一开始的递归解法没有正确

[https://leetcode-cn.com/submissions/detail/76795651/](https://leetcode-cn.com/submissions/detail/76795651/)

### 反思

需要另外一个数组记录访问过的情况，然后使用回溯加 DFS 法解答

## 80. 删除排序数组中的重复项 II

[https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array-ii/](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array-ii/)

### 思考

通过两个指针分别记录当前个数和当前索引，只有当前位置数组与之前数字不相等或者当前数字只要一个才添加数字并向后移动，否则只有索引后移

[https://leetcode-cn.com/submissions/detail/77035016/](https://leetcode-cn.com/submissions/detail/77035016/)

### 反思

官方解法逻辑一致，但是看起来更加简单优雅一些

## 81. 搜索旋转排序数组 II

[https://leetcode-cn.com/problems/search-in-rotated-sorted-array-ii/](https://leetcode-cn.com/problems/search-in-rotated-sorted-array-ii/)

### 思考

还是跟前面的题目一样使用二分查找法，但是因为存在重复的元素，需要做特殊的处理

[https://leetcode-cn.com/submissions/detail/77035079/](https://leetcode-cn.com/submissions/detail/77035079/)

### 反思

类似二分查找法，根据前半部分有序或者后半部分有序进行处理判断

## 82. 删除排序链表中的重复元素 II

[https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list-ii/](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list-ii/)

### 思考

通过哑节点，然后循环遍历链表，只有节点数组不等于前后节点则加入目标链表，否则前进

[https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list-ii/submissions/](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list-ii/submissions/)

### 反思

跟其他人解法类似
