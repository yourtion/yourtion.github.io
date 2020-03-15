---
layout: post
date: 2020-03-15 17:20:20 +08:00
slug: leetcode-java-09
title: "LeetCode 手记 09"
author: Yourtion
keywords: ["leetcode", "java"]
description: "使用“除法和取模”进行矩阵填充；使用 Map 的`containsKey()`方法检查 key 是否存在；通过清空列表保存最小值结果"
category: "学习"
tags: ["LeetCode", "Java"]
---
{% include JB/setup %}

## 本周收获

- 使用“除法和取模”进行矩阵填充
- 使用 Map 的`containsKey()`方法检查 key 是否存在
- 通过清空列表保存最小值结果

### 费马平方和定理

一个非负整数`c`能够表示为两个整数的平方和，当且仅当`c`的所有形如`4k+3`的质因子的幂次均为偶数。

## 566. 重塑矩阵

[https://leetcode-cn.com/problems/reshape-the-matrix/](https://leetcode-cn.com/problems/reshape-the-matrix/)

### 思考

先判断矩阵转换是否能满足条件（行列积相等），然后新建一个返回结果矩阵，按照目标大小进行数据填充，返回结果

[https://leetcode-cn.com/submissions/detail/52302244/](https://leetcode-cn.com/submissions/detail/52302244/)

### 反思

因为计算填充行列时候需要判断是否要换行，还是比较麻烦的，官方题解中有个非常优雅的做法`res[count / c][count % c] = nums[i][j]`，只要每次循环不断增加`count`即可，不需要不断判断与换行

## 572. 另一个树的子树

[https://leetcode-cn.com/problems/subtree-of-another-tree/](https://leetcode-cn.com/problems/subtree-of-another-tree/)

### 思考

通过判断当前树是否相等，然后不断递归计算子树是否相等

[https://leetcode-cn.com/submissions/detail/52297094/](https://leetcode-cn.com/submissions/detail/52297094/)

### 反思

看了其他人的题解，通过更快跳出子树判断的循环可以加快判别的速度

## 575. 分糖果

[https://leetcode-cn.com/problems/distribute-candies/](https://leetcode-cn.com/problems/distribute-candies/)

### 思考

方法比较简单， 使用一个`boolean[200001]`的数组来记录糖果是否出现，如果没有出现过就加一，最后返回糖果类型和数组一半的最小值

[https://leetcode-cn.com/submissions/detail/52305146/](https://leetcode-cn.com/submissions/detail/52305146/)

### 反思

看了其他人的解法，可以先计算数组的一半大小，然后在循环中判断是否超过数组一半，这样可以减少循环的次数

## 581. 最短无序连续子数组

[https://leetcode-cn.com/problems/shortest-unsorted-continuous-subarray/](https://leetcode-cn.com/problems/shortest-unsorted-continuous-subarray/)

### 思考

一开始就想使用不使用额外空间的指针查找方法，但是一直都没有做出结果，最后只能使用排序后比较的方法解答

[https://leetcode-cn.com/submissions/detail/52524655/](https://leetcode-cn.com/submissions/detail/52524655/)

### 反思

从官方题解的解法可以看到，解法需要四次循环（之前一直没做出处理是因为思路对了，解答有问题），应该是最小元素的正确位置可以决定左边界，最大元素的正确位置可以决定右边界

## 589. N 叉树的前序遍历

[https://leetcode-cn.com/problems/n-ary-tree-preorder-traversal/](https://leetcode-cn.com/problems/n-ary-tree-preorder-traversal/)

### 思考

还是递归的解法，跟二叉树类似

[https://leetcode-cn.com/submissions/detail/52525992/](https://leetcode-cn.com/submissions/detail/52525992/)

### 反思

使用迭代法需要使用一个栈来帮助我们得到前序遍历，需要保证栈顶的节点就是我们当前遍历到的节点。我们首先把根节点入栈，因为根节点是前序遍历中的第一个节点。随后每次我们从栈顶取出一个节点 u，它是我们当前遍历到的节点，并把 u 的所有子节点逆序推入栈中。

## 590. N 叉树的后序遍历

[https://leetcode-cn.com/problems/n-ary-tree-postorder-traversal/](https://leetcode-cn.com/problems/n-ary-tree-postorder-traversal/)

### 思考

继续还是使用递归法，跟二叉树类似

[https://leetcode-cn.com/submissions/detail/52526065/](https://leetcode-cn.com/submissions/detail/52526065/)

### 反思

迭代法：使用和 N 叉树的前序遍历 相同的方法，使用一个栈来得到后序遍历。我们首先把根节点入栈。当每次我们从栈顶取出一个节点 u 时，就把 u 的所有子节点顺序推入栈中

## 594. 最长和谐子序列

[https://leetcode-cn.com/problems/longest-harmonious-subsequence/](https://leetcode-cn.com/problems/longest-harmonious-subsequence/)

### 思考

先通过一个 Map 进行哈希映射，然后查找是否能找到对应的数值，找到就累加 1

[https://leetcode-cn.com/submissions/detail/52795109/](https://leetcode-cn.com/submissions/detail/52795109/)

### 反思

题解中在哈希映射的基础上，只需要一次扫描，通过在扫描到 nums[i] 时，u + v 和 v + w 中一定有一个就是答案的逻辑，减少一次扫描

## 595. 大的国家

[https://leetcode-cn.com/problems/big-countries/](https://leetcode-cn.com/problems/big-countries/)

### 思考

解法很简单，就是通过`where`和`or`进行筛选

[https://leetcode-cn.com/submissions/detail/52797418/](https://leetcode-cn.com/submissions/detail/52797418/)

### 反思

官方题解中还提到使用两个查询然后`UNION`的方法

## 596. 超过 5 名学生的课

[https://leetcode-cn.com/problems/classes-more-than-5-students/](https://leetcode-cn.com/problems/classes-more-than-5-students/)

### 思考

一开始觉得很简单，但是没有看清楚题目，需要包括等于的，还有就是需要根据学生去重，使用两层查询完成

[https://leetcode-cn.com/submissions/detail/52797880/](https://leetcode-cn.com/submissions/detail/52797880/)

### 反思

除了子查询外，还可以使用`HAVING COUNT(DISTINCT student) >= 5`进行过滤

## 598. 范围求和 II

[https://leetcode-cn.com/problems/range-addition-ii/](https://leetcode-cn.com/problems/range-addition-ii/)

### 思考

如果直接初始化一个巨大的矩阵是会超出内存的，其实逻辑非常简单，遍历操作矩阵，算出 M 和 N 的最小值，相乘即可

[https://leetcode-cn.com/submissions/detail/53119909/](https://leetcode-cn.com/submissions/detail/53119909/)

### 反思

官方解法与我的解法一致

## 599. 两个列表的最小索引总和

[https://leetcode-cn.com/problems/minimum-index-sum-of-two-lists/](https://leetcode-cn.com/problems/minimum-index-sum-of-two-lists/)

### 思考

使用四次循环:

1. 首先将数量少的 list 放入 map 中
2. 遍历另外一个 list，将存在的 key 放入 map2
3. 遍历 map2，找出最小的索引
4. 再次遍历 map2，将最小索引的 key 取出来并返回

[https://leetcode-cn.com/submissions/detail/53120145/](https://leetcode-cn.com/submissions/detail/53120145/)

### 反思

官方题解中使用一个 list，并判断当前索引是否最小，更小则清空并加入自己，否则将自己加入列表即可

## 605. 种花问题

[https://leetcode-cn.com/problems/can-place-flowers/](https://leetcode-cn.com/problems/can-place-flowers/)

### 思考

思路比较简单，通过遍历 flowerbed 数组，判断当前位置前后是否没有花，可以种花则结果加 1，最后比较可以种的数量和需要种的数量即可

[https://leetcode-cn.com/submissions/detail/53121027/](https://leetcode-cn.com/submissions/detail/53121027/)

### 反思

官方使用贪心算法，将可以种植的位置重写为 1 降低判断逻辑复杂度，我使用的是临时变量，不去改变原数组

## 606. 根据二叉树创建字符串

[https://leetcode-cn.com/problems/construct-string-from-binary-tree/](https://leetcode-cn.com/problems/construct-string-from-binary-tree/)

### 思考

通过一个递归前序遍历，然后注意处理左子树为空以及叶子节点的特殊情况即可

[https://leetcode-cn.com/submissions/detail/53351511/](https://leetcode-cn.com/submissions/detail/53351511/)

### 反思

官方同样使用递归和迭代两种解法

## 617. 合并二叉树

[https://leetcode-cn.com/problems/merge-two-binary-trees/](https://leetcode-cn.com/problems/merge-two-binary-trees/)

### 思考

采用递归前序遍历合并两棵树，如果都为空则直接返回，如果一个节点不为空即返回该节点，否则进行节点值相加再递归合并左右子树

[https://leetcode-cn.com/submissions/detail/53352017/](https://leetcode-cn.com/submissions/detail/53352017/)

### 反思

官方依然提供递归与迭代两种解法

## 620. 有趣的电影

[https://leetcode-cn.com/problems/not-boring-movies/](https://leetcode-cn.com/problems/not-boring-movies/)

### 思考

解法比较简单，通过``id`% 2 = 1 AND`description`<> 'boring'`进行过滤即可

[https://leetcode-cn.com/submissions/detail/53381741/](https://leetcode-cn.com/submissions/detail/53381741/)

### 反思

与官方解法基本一致，官方使用`mod(id, 2) = 1`

## 627. 交换工资

[https://leetcode-cn.com/problems/swap-salary/](https://leetcode-cn.com/problems/swap-salary/)

### 思考

方法比较简单，通过`IF(`sex`= 'f', 'm', 'f')`一条语句完成更新

[https://leetcode-cn.com/submissions/detail/53576742/](https://leetcode-cn.com/submissions/detail/53576742/)

### 反思

官方使用`CASE...WHEN...`

## 628. 三个数的最大乘积

[https://leetcode-cn.com/problems/maximum-product-of-three-numbers/](https://leetcode-cn.com/problems/maximum-product-of-three-numbers/)

### 思考

解法比较简单粗暴，直接对数组进行排序，一开始没有考虑到负数的情况，错误后添加条件判断，如果有两个以上负数，就判断两个负数的乘积与倒数二三的乘积的大小

[https://leetcode-cn.com/submissions/detail/53609666/](https://leetcode-cn.com/submissions/detail/53609666/)

### 反思

官方题解还讲了使用线性扫描的方法，找出最大的三个数以及最小的两个数，最后比较乘积即可

## 633. 平方数之和

[https://leetcode-cn.com/problems/sum-of-square-numbers/](https://leetcode-cn.com/problems/sum-of-square-numbers/)

### 思考

使用了一个比较暴力的解法，通过循环递增一个平方数，再判断剩余的数是否是平方数

[https://leetcode-cn.com/submissions/detail/53611739/](https://leetcode-cn.com/submissions/detail/53611739/)

### 反思

官方题解更简单的是使用`sqrt`函数，首先枚举 a，并保证`c - a^2 >= 0`，随后直接使用`sqrt`函数直接找出 b，还有使用费马平方和定理

## 637. 二叉树的层平均值

[https://leetcode-cn.com/problems/average-of-levels-in-binary-tree/](https://leetcode-cn.com/problems/average-of-levels-in-binary-tree/)

### 思考

通过一个 Map 记录递归过程中的节点和以及个数，然后遍历 Map 输出结果

[https://leetcode-cn.com/submissions/detail/53877069/](https://leetcode-cn.com/submissions/detail/53877069/)

### 反思

跟题解中的深度优先搜索类似， 题解使用两个 List 保存结果

## 643. 子数组最大平均数 I

[https://leetcode-cn.com/problems/maximum-average-subarray-i/](https://leetcode-cn.com/problems/maximum-average-subarray-i/)

### 思考

先计算第 0 到 k-1 数的和，然后开始滑动计算，减去最前面的，加上最后面的，比较当前和的大小，最后返回和最大值的平均数

[https://leetcode-cn.com/submissions/detail/53868210/](https://leetcode-cn.com/submissions/detail/53868210/)

### 反思

跟官方题解的滑动窗口法一致

## 645. 错误的集合

[https://leetcode-cn.com/problems/set-mismatch/](https://leetcode-cn.com/problems/set-mismatch/)

### 思考

一开始想到循环，计算出缺失值与真值的差，但是没办法找到缺失值与正确值的方法

[https://leetcode-cn.com/submissions/detail/53876754/](https://leetcode-cn.com/submissions/detail/53876754/)

### 反思

看了题解，最简单的方法就是遍历 nums 中的所有数字，在遇到的位上转换位负数，如果遇到负数就是重复值，缺失数字 j 对应的索引处仍然是正数
