---
layout: post
date: 2020-03-29 17:58:12 +0800
slug: leetcode-java-11
title: "LeetCode 手记 11"
author: Yourtion
keywords: ["leetcode", "java"]
description: "使用`int d = x % 10`并不断`x /= 10`的方式获取每一个位数；计算花费`f[i]`有一个清楚的递归关系：`f[i] = cost[i] + min(f[i+1], f[i+2])`；二叉搜索树中，中序遍历会将树中节点按数值大小顺序输出；了解“Rabin-Karp 字符串哈希”和“KMP 算法”"
category: "学习"
tags: ["LeetCode", "Java"]
---
{% include JB/setup %}

## 本周收获

- 使用`int d = x % 10`并不断`x /= 10`的方式获取每一个位数
- 计算花费`f[i]`有一个清楚的递归关系：`f[i] = cost[i] + min(f[i+1], f[i+2])`
- 二叉搜索树中，中序遍历会将树中节点按数值大小顺序输出
- 了解“Rabin-Karp 字符串哈希”和“KMP 算法”

## 717. 1 比特与 2 比特字符

[https://leetcode-cn.com/problems/1-bit-and-2-bit-characters/](https://leetcode-cn.com/problems/1-bit-and-2-bit-characters/)

### 思考

一开始的想法是从后往前遍历，通过动态规划的方式进行判断

[https://leetcode-cn.com/submissions/detail/56460764/](https://leetcode-cn.com/submissions/detail/56460764/)

### 反思

原来一开始的思路就是错误，解法非常简单：从左到右扫描来判断最后一位是否为一比特字符

## 720. 词典中最长的单词

[https://leetcode-cn.com/problems/longest-word-in-dictionary/](https://leetcode-cn.com/problems/longest-word-in-dictionary/)

### 思考

一开始没有考虑到题目中词典的含义，只是简单地查找最长的单词，对于前缀的判断没有做好考虑

[https://leetcode-cn.com/submissions/detail/56461461/](https://leetcode-cn.com/submissions/detail/56461461/)

### 反思

题解中提到比较简单暴力的方法，直接在 Set 中判断前缀是否存在，或者使用“前缀树 + 深度优先搜索”的方法

## 724. 寻找数组的中心索引

[https://leetcode-cn.com/problems/find-pivot-index/](https://leetcode-cn.com/problems/find-pivot-index/)

### 思考

一开始的思路比较简单，通过两个指针，前加后减，直到在中点相遇，但是没有考虑到负数的情况

[https://leetcode-cn.com/submissions/detail/56465637/](https://leetcode-cn.com/submissions/detail/56465637/)

### 反思

其实题解的逻辑很简单，当索引`i是中心索引时，`leftsum`满足`S - nums[i] - leftsum`。所以只需要两次循环即可

## 728. 自除数

[https://leetcode-cn.com/problems/self-dividing-numbers/](https://leetcode-cn.com/problems/self-dividing-numbers/)

### 思考

通过暴力解法，遍历每一个数字，并将数字转成字符串，然后逐位进行除法，将符合条件的加入列表中

[https://leetcode-cn.com/submissions/detail/56790379/](https://leetcode-cn.com/submissions/detail/56790379/)

### 反思

还有使用`int d = x % 10`并不断`x /= 10`的方式获取每一个位数，而不是使用字符串操作

## 733. 图像渲染

[https://leetcode-cn.com/problems/flood-fill/](https://leetcode-cn.com/problems/flood-fill/)

### 思考

使用 dfs 遍历周边的像素并做相应的替换，注意处理边界条件即可

[https://leetcode-cn.com/submissions/detail/56792236/](https://leetcode-cn.com/submissions/detail/56792236/)

### 反思

跟官方解法类似，只是官方解法将判断前置到执行递归之前

## 744. 寻找比目标字母大的最小字母

[https://leetcode-cn.com/problems/find-smallest-letter-greater-than-target/](https://leetcode-cn.com/problems/find-smallest-letter-greater-than-target/)

### 思考

通过遍历字符串，根据比目标字符大或小确定计算方法，记录最小值和对应的字符

[https://leetcode-cn.com/submissions/detail/56800430/](https://leetcode-cn.com/submissions/detail/56800430/)

### 反思

由于 letters 已经有序，当我们从左往右扫描找到比目标字母大字母则该字母就是答案

## 746. 使用最小花费爬楼梯

[https://leetcode-cn.com/problems/min-cost-climbing-stairs/](https://leetcode-cn.com/problems/min-cost-climbing-stairs/)

### 思考

一开始就考虑使用动态规划，但是对于计算不是很熟悉

[https://leetcode-cn.com/submissions/detail/57018056/](https://leetcode-cn.com/submissions/detail/57018056/)

### 反思

从后往前计算 f，并计算出`f[i+1] 和 f[i+2]`

## 747. 至少是其他数字两倍的最大数

[https://leetcode-cn.com/problems/largest-number-at-least-twice-of-others/](https://leetcode-cn.com/problems/largest-number-at-least-twice-of-others/)

### 思考

因为题目要求最大元素是否至少是数组中每个其他数字的两倍，那么只需要比较最大数和第二大的数即可，遍历找出最大和第二大的数，判断是否大于两倍，注意不要用除法，会出现除 0 的情况

[https://leetcode-cn.com/submissions/detail/57019085/](https://leetcode-cn.com/submissions/detail/57019085/)

### 反思

跟官方题解一致

## 748. 最短完整词

[https://leetcode-cn.com/problems/shortest-completing-word/](https://leetcode-cn.com/problems/shortest-completing-word/)

### 思考

使用一个比较复杂的方法，先找出待查找的字符串，在候选单词中判断是否满足完整词要求，最后从中选择最短的

[https://leetcode-cn.com/submissions/detail/57023028/](https://leetcode-cn.com/submissions/detail/57023028/)

### 反思

官方题解使用计数法：每个字母的计数大于或等于 licenseplate 中的字母数即为完整词

## 762. 二进制表示中质数个计算置位

[https://leetcode-cn.com/problems/prime-number-of-set-bits-in-binary-representation/](https://leetcode-cn.com/problems/prime-number-of-set-bits-in-binary-representation/)

### 思考

通过循环 L 和 R 直接的数，通过`Integer.bitCount(x)`计算 1 的个数，并判断个数是否数质数即可

[https://leetcode-cn.com/submissions/detail/57342766/](https://leetcode-cn.com/submissions/detail/57342766/)

### 反思

只需要穷举列出几个质数即可，因为题目限制了数字的大小

## 766. 托普利茨矩阵

[https://leetcode-cn.com/problems/toeplitz-matrix/](https://leetcode-cn.com/problems/toeplitz-matrix/)

### 思考

解法比较简单，从第一行和第一列开始，检查每个对角线元素是否相等即可

[https://leetcode-cn.com/submissions/detail/57342928/](https://leetcode-cn.com/submissions/detail/57342928/)

### 反思

跟题解方法不同，题解需要 Map 存储结果

## 771. 宝石与石头

[https://leetcode-cn.com/problems/jewels-and-stones/](https://leetcode-cn.com/problems/jewels-and-stones/)

### 思考

直接遍历自己已经有的石头，计数记录到一个`int[] table`中，在遍历宝石列表，从计数表中获取结果并累加即可

[https://leetcode-cn.com/submissions/detail/57343010/](https://leetcode-cn.com/submissions/detail/57343010/)

### 反思

不需要像题解中使用 Set 去记录石头，直接累加即可

## 783. 二叉搜索树结点最小距离

[https://leetcode-cn.com/problems/minimum-distance-between-bst-nodes/](https://leetcode-cn.com/problems/minimum-distance-between-bst-nodes/)

### 思考

一开始只是比较当前节点叶子节点，但是发现会有问题，只能遍历后排序计算

[https://leetcode-cn.com/submissions/detail/57672317/](https://leetcode-cn.com/submissions/detail/57672317/)

### 反思

官方题解提到二叉搜索树的性质，只需要中序遍历（左中右），比较大小即可

## 784. 字母大小写全排列

[https://leetcode-cn.com/problems/letter-case-permutation/](https://leetcode-cn.com/problems/letter-case-permutation/)

### 思考

用了一个比较暴力的方法，一个个字符遍历，然后在两个列表中倒数据，遇到字母则遍历之前的结果，加上大小写，否则直接添加当前字符

[https://leetcode-cn.com/submissions/detail/57676835/](https://leetcode-cn.com/submissions/detail/57676835/)

### 反思

跟官方解法类似，官方解法使用`StringBuilder`

## 788. 旋转数字

[https://leetcode-cn.com/problems/rotated-digits/](https://leetcode-cn.com/problems/rotated-digits/)

### 思考

对题目意图没有特别清晰，解答有些问题

[https://leetcode-cn.com/submissions/detail/57678737/](https://leetcode-cn.com/submissions/detail/57678737/)

### 反思

通过暴力法遍历：

- 如果 X 中存在 3、4、7 这样的无效数字，则 X 不是一个好数。
- 如果 X 中不存在 2、5、6、9 这样的旋转后会变成不同的数字，则 X 不是一个好数。
- 否则，X 可以旋转成一个不同的有效数字。

## 796. 旋转字符串

[https://leetcode-cn.com/problems/rotate-string/](https://leetcode-cn.com/problems/rotate-string/)

### 思考

因为 B 可以通过 A 旋转所得，所以 A 和 B 中的字符间距应该相等，不断比较字符间距是否相等即可

[https://leetcode-cn.com/submissions/detail/57972907/](https://leetcode-cn.com/submissions/detail/57972907/)

### 反思

其实有时间解法非常简单：由于 A + A 包含了所有可以通过旋转操作从 A 得到的字符串，因此我们只需要判断 B 是否为 A + A 的子串即可`(A + A).contains(B)`

## 804. 唯一摩尔斯密码词

[https://leetcode-cn.com/problems/unique-morse-code-words/](https://leetcode-cn.com/problems/unique-morse-code-words/)

### 思考

使用 HashSet 保存 StringBuilder 生成的摩斯密码结果，返回集合长度

[https://leetcode-cn.com/submissions/detail/57973879/](https://leetcode-cn.com/submissions/detail/57973879/)

### 反思

与官方解法一致

## 806. 写字符串需要的行数

[https://leetcode-cn.com/problems/number-of-lines-to-write-string/](https://leetcode-cn.com/problems/number-of-lines-to-write-string/)

### 思考

简单遍历字符串，计算所需的行数：如果小于 100 则累加，大于 100 则换行重新计算

[https://leetcode-cn.com/submissions/detail/57973974/](https://leetcode-cn.com/submissions/detail/57973974/)

### 反思

跟官方解法基本一致
