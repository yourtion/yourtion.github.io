---
layout: post
date: 2020-04-05 16:55:01 +08:00
slug: leetcode-java-12
title: "LeetCode 手记 12"
author: Yourtion
keywords: ["leetcode", "java"]
description: "使用 List 的 toArray 简化代码"
category: "学习"
tags: ["LeetCode", "Java"]
---
{% include JB/setup %}

## 本周收获

- 使用 List 的 toArray 简化代码

## 811. 子域名访问计数

[https://leetcode-cn.com/problems/subdomain-visit-count/](https://leetcode-cn.com/problems/subdomain-visit-count/)

### 思考

通过对每个域名信息进行解析，并返回子域名列表，再通过 Map 进行累加计数并返回结果

[https://leetcode-cn.com/submissions/detail/58242053/](https://leetcode-cn.com/submissions/detail/58242053/)

### 反思

跟官方解法基本一致，但是使用正则匹配效率各方面还是有些影响

## 812. 最大三角形面积

[https://leetcode-cn.com/problems/largest-triangle-area/](https://leetcode-cn.com/problems/largest-triangle-area/)

### 思考

通过遍历穷举所有组合找到最大值

[https://leetcode-cn.com/submissions/detail/58217572/](https://leetcode-cn.com/submissions/detail/58217572/)

### 反思

跟官方解法类似，使用坐标进行计算

## 819. 最常见的单词

[https://leetcode-cn.com/problems/most-common-word/](https://leetcode-cn.com/problems/most-common-word/)

### 思考

先讲 banned 的内容写入到 Set 中，然后拆分 paragraph 并进行比对计数

[https://leetcode-cn.com/submissions/detail/58246600/](https://leetcode-cn.com/submissions/detail/58246600/)

### 反思

跟官方解法基本一致，官方解法使用 StringBuilder 去获取 CharArray 的内容，而不是直接 Split 字符串

## 821. 字符的最短距离

[https://leetcode-cn.com/problems/shortest-distance-to-a-character/](https://leetcode-cn.com/problems/shortest-distance-to-a-character/)

### 思考

通过先查找出字符中目标字符的 index 列表，再遍历字符，取再 index 列表中前后两个 index 的最小值

[https://leetcode-cn.com/submissions/detail/58596367/](https://leetcode-cn.com/submissions/detail/58596367/)

### 反思

官方解法通过找出距离向左或者向右下一个字符 C 的距离。答案就是这两个值的较小值

## 824. 山羊拉丁文

[https://leetcode-cn.com/problems/goat-latin/](https://leetcode-cn.com/problems/goat-latin/)

### 思考

通过遍历字符串数组，如果遇到非字母和最后一个字母，按照逻辑处理元音和非元音并添加 a 即可

[https://leetcode-cn.com/submissions/detail/58586173/](https://leetcode-cn.com/submissions/detail/58586173/)

### 反思

跟官方解法类似，官方使用`S.split`处理起来好像更加简单

## 830. 较大分组的位置

[https://leetcode-cn.com/problems/positions-of-large-groups/](https://leetcode-cn.com/problems/positions-of-large-groups/)

### 思考

通过两个指针进行计算，如果差值大于 3 则加入 List 中

[https://leetcode-cn.com/submissions/detail/58588081/](https://leetcode-cn.com/submissions/detail/58588081/)

### 反思

跟官方解法类似，官方解法更加简单优雅

## 832. 翻转图像

[https://leetcode-cn.com/problems/flipping-an-image/](https://leetcode-cn.com/problems/flipping-an-image/)

### 思考

处理方法比较简单，遍历每一行，然后进行翻转和反转

[https://leetcode-cn.com/submissions/detail/58891399/](https://leetcode-cn.com/submissions/detail/58891399/)

### 反思

官方解答使用`^ 1`进行反转操作

## 840. 矩阵中的幻方

[https://leetcode-cn.com/problems/magic-squares-in-grid/](https://leetcode-cn.com/problems/magic-squares-in-grid/)

### 思考

原来的思路很简单，就是逐个检查幻方，但是执行过程发现检查的方法总是有缺陷

[https://leetcode-cn.com/submissions/detail/58893459/](https://leetcode-cn.com/submissions/detail/58893459/)

### 反思

应该正确检查幻方：分别检查每 3x3 的网格。对于每个网格，所有数字必须不同，并且在 1 到 9 之间；且每一个行，列，对角线的和必须相同。

## 844. 比较含退格的字符串

[https://leetcode-cn.com/problems/backspace-string-compare/](https://leetcode-cn.com/problems/backspace-string-compare/)

### 思考

直接针对字符按照退格操作后返回，对比字符是否一致即可，注意处理退格多次导致超出头部情况

[https://leetcode-cn.com/submissions/detail/58893568/](https://leetcode-cn.com/submissions/detail/58893568/)

### 反思

官方解法通过双指针法进行比对，不需要额外空间

## 849. 到最近的人的最大距离

[https://leetcode-cn.com/problems/maximize-distance-to-closest-person/](https://leetcode-cn.com/problems/maximize-distance-to-closest-person/)

### 思考

先遍历找出有人的位置，在遍历找出空位并计算当前位置与前后两个人的距离，注意需要处理最前和最后座位的情况

[https://leetcode-cn.com/submissions/detail/59191579/](https://leetcode-cn.com/submissions/detail/59191579/)

### 反思

官方题解提到“按零分组”，感觉更加简单：两个人之间有 K 个空座位，则存在座位到最近的人的距离为`(K+1) / 2`，边缘的座位，它们的一侧没有人，那么认为它们到该侧最近的人的距离为 K。

## 852. 山脉数组的峰顶索引

[https://leetcode-cn.com/problems/peak-index-in-a-mountain-array/](https://leetcode-cn.com/problems/peak-index-in-a-mountain-array/)

### 思考

从左往右扫描直到山的高度不再增长为止，停止增长点就是峰顶

[https://leetcode-cn.com/submissions/detail/59191692/](https://leetcode-cn.com/submissions/detail/59191692/)

### 反思

官方题解讲到使用二分查找，可以更快找到结果

## 859. 亲密字符串

[https://leetcode-cn.com/problems/buddy-strings/](https://leetcode-cn.com/problems/buddy-strings/)

### 思考

根据字符串是否相等进行不同的判断，一开始的策略是看是否有两个字符不同，但是发现这样解答是错误的

[https://leetcode-cn.com/submissions/detail/59193593/](https://leetcode-cn.com/submissions/detail/59193593/)

### 反思

在`A[i], A[j], B[i], B[j]`这四个自由变量中，只存在两种情况：`A[i] == A[j]` 或 `A[i] != A[j]`

## 860. 柠檬水找零

[https://leetcode-cn.com/problems/lemonade-change/](https://leetcode-cn.com/problems/lemonade-change/)

### 思考

直接通过简单的当前硬币数量的加减进行状态判断，尽可能用大面额进行找零，如果找不开则返回失败

[https://leetcode-cn.com/submissions/detail/59481820/](https://leetcode-cn.com/submissions/detail/59481820/)

### 反思

跟官方解法的场景模拟方法基本一致，但是感觉官方解法更加简单易懂的样子

## 867. 转置矩阵

[https://leetcode-cn.com/problems/transpose-matrix/](https://leetcode-cn.com/problems/transpose-matrix/)

### 思考

使用直接遍历复制到结果数组的方式进行解答

[https://leetcode-cn.com/submissions/detail/59481909/](https://leetcode-cn.com/submissions/detail/59481909/)

### 反思

跟官方解法一致

## 868. 二进制间距

[https://leetcode-cn.com/problems/binary-gap/](https://leetcode-cn.com/problems/binary-gap/)

### 思考

先通过`Integer.toBinaryString(N)`的方法，转换成字符串，然后在字符串中使用双指针计算两个`1`的距离

[https://leetcode-cn.com/submissions/detail/59481997/](https://leetcode-cn.com/submissions/detail/59481997/)

### 反思

官方解法使用`(N >> i) & 1`的方式来进行位的判断

## 872. 叶子相似的树

[https://leetcode-cn.com/problems/leaf-similar-trees/](https://leetcode-cn.com/problems/leaf-similar-trees/)

### 思考

通过深度遍历一棵树，并把叶子节点加入队列，然后同样方式遍历另外一棵树，如果顺序一致即为相似的树

[https://leetcode-cn.com/submissions/detail/59807876/](https://leetcode-cn.com/submissions/detail/59807876/)

### 反思

跟官方解法的“深度优先搜索”基本一致，但是没有使用两个 List 再比对

## 874. 模拟行走机器人

[https://leetcode-cn.com/problems/walking-robot-simulation/](https://leetcode-cn.com/problems/walking-robot-simulation/)

### 思考

通过将`obstacles`转换成字符串放入 set 中，然后模拟机器人行走

[https://leetcode-cn.com/submissions/detail/59831393/](https://leetcode-cn.com/submissions/detail/59831393/)

### 反思

如果机器人得到转弯的指令，我们就更新方向；否则就沿给定的方向走指定的步数。

## 883. 三维形体投影面积

[https://leetcode-cn.com/problems/projection-area-of-3d-shapes/](https://leetcode-cn.com/problems/projection-area-of-3d-shapes/)

### 思考

通过各个面积投影进行分享，并进行数学计算

[https://leetcode-cn.com/submissions/detail/60101165/](https://leetcode-cn.com/submissions/detail/60101165/)

### 反思

- 从顶部看，由该形状生成的阴影将是网格中非零值的数目。
- 从侧面看，由该形状生成的阴影将是网格中每一行的最大值。
- 从前面看，由该形状生成的阴影将是网格中每一列的最大值。

## 884. 两句话中的不常见单词

[https://leetcode-cn.com/problems/uncommon-words-from-two-sentences/](https://leetcode-cn.com/problems/uncommon-words-from-two-sentences/)

### 思考

通过`split("\\W")`获得单词数组，然后加入到 Map 中，如果 Map 中的计数为 1，则可以返回，注意处理结果为空的情况

[https://leetcode-cn.com/submissions/detail/60095555/](https://leetcode-cn.com/submissions/detail/60095555/)

### 反思

跟官方解法一致，通过 List 可以直接使用`ans.toArray(new String[ans.size()]);`

## 888. 公平的糖果交换

[https://leetcode-cn.com/problems/fair-candy-swap/](https://leetcode-cn.com/problems/fair-candy-swap/)

### 思考

通过累加两个人糖果总数算出两个人的差距，同时将其中一个人的结果加入一个 Set 中，最后遍历第一个人的糖果数，如果第二个人有满足条件的糖果则返回。

[https://leetcode-cn.com/submissions/detail/60100881/](https://leetcode-cn.com/submissions/detail/60100881/)

### 反思

跟官方解法一致
