---
layout: post
date: 2020-04-19 17:38:04 +08:00
slug: leetcode-java-14
title: "LeetCode 手记 14"
author: Yourtion
keywords: ["leetcode", "java"]
description: "使用`byte`替代`int`可以有效降到内存；不要想着过度优化代码，先按照自己的思路实现出相应的解答"
category: "学习"
tags: ["LeetCode", "Java"]
---
{% include JB/setup %}

## 本周收获

- 使用`byte`替代`int`可以有效降到内存
- 不要想着过度优化代码，先按照自己的思路实现出相应的解答

## 977. 有序数组的平方

[https://leetcode-cn.com/problems/squares-of-a-sorted-array/](https://leetcode-cn.com/problems/squares-of-a-sorted-array/)

### 思考

直接使用 stream 然后 map 最后 sort 并最后返回 Array

[https://leetcode-cn.com/submissions/detail/62287613/](https://leetcode-cn.com/submissions/detail/62287613/)

### 反思

官方题解中除了上面排序的方法，还有双指针法：从前向后遍历数组中的非负数部分，并且反向遍历数组中的负数部分

## 985. 查询后的偶数和

[https://leetcode-cn.com/problems/sum-of-even-numbers-after-queries/](https://leetcode-cn.com/problems/sum-of-even-numbers-after-queries/)

### 思考

一开始的思路是每次应用结果后重新求和，但是这样在数据量大的时候会超时，最后的方法就是先计算数组和，然后在每个计算中当出现偶数或者偶数消失的时候不断调整结果。

[https://leetcode-cn.com/submissions/detail/62291302/](https://leetcode-cn.com/submissions/detail/62291302/)

### 反思

跟官方解法基本一致

## 989. 数组形式的整数加法

[https://leetcode-cn.com/problems/add-to-array-form-of-integer/](https://leetcode-cn.com/problems/add-to-array-form-of-integer/)

### 思考

先按照 K 的数值不断处理加法，然后处理多出来的位，最后处理进位问题，返回结果

[https://leetcode-cn.com/submissions/detail/62289414/](https://leetcode-cn.com/submissions/detail/62289414/)

### 反思

官方使用“逐位相加”实现起来更容易：将整个加数加入数组表示的数的最低位

## 993. 二叉树的堂兄弟节点

[https://leetcode-cn.com/problems/cousins-in-binary-tree/](https://leetcode-cn.com/problems/cousins-in-binary-tree/)

### 思考

通过记录相应值的节点父节点和当前大深度，只要深度相同，同时父节点不同，即为堂兄弟节点

[https://leetcode-cn.com/submissions/detail/62673258/](https://leetcode-cn.com/submissions/detail/62673258/)

### 反思

官方解法通过深度搜索并使用 Map 保存，求出每一个节点的深度与父节点

## 997. 找到小镇的法官

[https://leetcode-cn.com/problems/find-the-town-judge/](https://leetcode-cn.com/problems/find-the-town-judge/)

### 思考

通过一个 int 数组记录信任队列，如果信任他人，则标记为-1，被信任则投票+1，最后遍历数组，只要被信任数量为 N-1，则返回结果

[https://leetcode-cn.com/submissions/detail/62677216/](https://leetcode-cn.com/submissions/detail/62677216/)

### 反思

跟其他人的解法基本一致，其他人使用两个数组记录与比对

## 1002. 查找常用字符

[https://leetcode-cn.com/problems/find-common-characters/](https://leetcode-cn.com/problems/find-common-characters/)

### 思考

生成一个 int 数组用于记录字母出现的情况，先遍历第一个单词的字母，记录到 table 上，然后逐个遍历其他单词，与 table 取交集（最小值），最后遍历 table 返回字母结果集合

[https://leetcode-cn.com/submissions/detail/62673484/](https://leetcode-cn.com/submissions/detail/62673484/)

### 反思

跟其他人的结果基本一致

## 1005. K 次取反后最大化的数组和

[https://leetcode-cn.com/problems/maximize-sum-of-array-after-k-negations/](https://leetcode-cn.com/problems/maximize-sum-of-array-after-k-negations/)

### 思考

先对数组进行排序，然后先将负数转我饿正数，如果 K 还有剩余同时剩下奇数个，那么再一次排序数组，将最小的转换为负数，最后求和

[https://leetcode-cn.com/submissions/detail/63025306/](https://leetcode-cn.com/submissions/detail/63025306/)

### 反思

跟其他人解法基本一致

## 1009. 十进制整数的反码

[https://leetcode-cn.com/problems/complement-of-base-10-integer/](https://leetcode-cn.com/problems/complement-of-base-10-integer/)

### 思考

使用`toBinaryString`转换成字符串，然后每位取反，最后使用`Integer.parseInt`返回结果

[https://leetcode-cn.com/submissions/detail/63025361/](https://leetcode-cn.com/submissions/detail/63025361/)

### 反思

使用 bitCount 计算 N 共有多少二进制位，然后再一位位地与 1 异或运算就行了

## 1010. 总持续时间可被 60 整除的歌曲

[https://leetcode-cn.com/problems/pairs-of-songs-with-total-durations-divisible-by-60/](https://leetcode-cn.com/problems/pairs-of-songs-with-total-durations-divisible-by-60/)

### 思考

将每个数字从 960 开始递减（数字最大 500，所以从跟 1000 最接近的 960 开始递减），然后判断是否存在于 Map 中，如果存在结果累加

[https://leetcode-cn.com/submissions/detail/63036455/](https://leetcode-cn.com/submissions/detail/63036455/)

### 反思

通过对所有时间求 mod 60 的余数，然后进行归类计数，余数相同的为一类，成对的时间必定 mod 60 的余数之和为 60

## 1018. 可被 5 整除的二进制前缀

[https://leetcode-cn.com/problems/binary-prefix-divisible-by-5/](https://leetcode-cn.com/problems/binary-prefix-divisible-by-5/)

### 思考

之前考虑的方法是不断累计构造数字然后尝试是否能被 5 整除

[https://leetcode-cn.com/submissions/detail/63297039/](https://leetcode-cn.com/submissions/detail/63297039/)

### 反思

因为单纯求和会遇到溢出 int 类型的最大值，只要 sum 大于 0，我们就减去 10，然后看该值是否为 0 或 5，是的话，为真，不是，为假

## 1021. 删除最外层的括号

[https://leetcode-cn.com/problems/remove-outermost-parentheses/](https://leetcode-cn.com/problems/remove-outermost-parentheses/)

### 思考

先将字符串转换成 StringBuilder，然后通过一个计数器，遇到`(`就加一，遇到`)`就减一，在计数器为 0 时候删除字符

[https://leetcode-cn.com/submissions/detail/63297121/](https://leetcode-cn.com/submissions/detail/63297121/)

### 反思

跟其他人的解法基本一致

## 1022. 从根到叶的二进制数之和

[https://leetcode-cn.com/problems/sum-of-root-to-leaf-binary-numbers/](https://leetcode-cn.com/problems/sum-of-root-to-leaf-binary-numbers/)

### 思考

通过 DFS 遍历，然后不断乘 2 得到十进制结果，当遇到叶子节点即累加结果

[https://leetcode-cn.com/submissions/detail/63297223/](https://leetcode-cn.com/submissions/detail/63297223/)

### 反思

跟其他人解法基本一致

## 1025. 除数博弈

[https://leetcode-cn.com/problems/divisor-game/](https://leetcode-cn.com/problems/divisor-game/)

### 思考

因为只要能占到 2 的就能赢，所以只要是奇数则输

[https://leetcode-cn.com/submissions/detail/63592977/](https://leetcode-cn.com/submissions/detail/63592977/)

### 反思

跟其他人解法基本一致

## 1029. 两地调度

[https://leetcode-cn.com/problems/two-city-scheduling/](https://leetcode-cn.com/problems/two-city-scheduling/)

### 思考

原本的思路是通过取两个价格中小的部分，但是这样要平均分比较复杂

[https://leetcode-cn.com/submissions/detail/63593038/](https://leetcode-cn.com/submissions/detail/63593038/)

### 反思

最优的方案是，选出 price_A - price_B 最小的 N 个人，让他们飞往 A 市，其余人飞往 B 市。

## 1030. 距离顺序排列矩阵单元格

[https://leetcode-cn.com/problems/matrix-cells-in-distance-order/submissions/](https://leetcode-cn.com/problems/matrix-cells-in-distance-order/submissions/)

### 思考

首先构造一个所需的矩阵，然后通过自定义`Arrays.sort`的排序方法，返回结果

[https://leetcode-cn.com/submissions/detail/63593097/](https://leetcode-cn.com/submissions/detail/63593097/)

### 反思

其他人提出了四种解法：数组排序、桶排序、BFS、几何法

## 1033. 移动石子直到连续

[https://leetcode-cn.com/problems/moving-stones-until-consecutive/](https://leetcode-cn.com/problems/moving-stones-until-consecutive/)

### 思考

一开始的思路是通过对吧三个数字的大小情况返回转换结果，但是会出现比较复杂的情况

[https://leetcode-cn.com/submissions/detail/63993631/](https://leetcode-cn.com/submissions/detail/63993631/)

### 反思

先排序方便解答，移动次数最大值：移动 a 和 c，一次只走一格。所以`max=(z-y-1)+(y-x-1)=z-x-2`，移动次数最小值：移动一次尽可能的走多步

## 1037. 有效的回旋镖

[https://leetcode-cn.com/problems/valid-boomerang/](https://leetcode-cn.com/problems/valid-boomerang/)

### 思考

对三个点进行计算，检查是否能形成三角形

[https://leetcode-cn.com/submissions/detail/63994877/](https://leetcode-cn.com/submissions/detail/63994877/)

### 反思

当两点之间的距离不等于三点的距离之和

## 1042. 不邻接植花

[https://leetcode-cn.com/problems/flower-planting-with-no-adjacent/](https://leetcode-cn.com/problems/flower-planting-with-no-adjacent/)

### 思考

没什么解答对思路

[https://leetcode-cn.com/submissions/detail/63995380/](https://leetcode-cn.com/submissions/detail/63995380/)

### 反思

使用邻接表法：

1. 根据 paths 建立邻接表；
2. 默认所有的花园先不染色，即染 0；
3. 从第一个花园开始走，把与它邻接的花园的颜色从 color{1,2,3,4}这个颜色集中删除；
4. 删完了所有与它相邻的颜色，就可以把集合中剩下的颜色随机选一个给它了，为了简单，将集合中的第一个颜色赋给当前花园；
5. 循环 3 和 4 到最后一个花园。

## 1046. 最后一块石头的重量

[https://leetcode-cn.com/problems/last-stone-weight/](https://leetcode-cn.com/problems/last-stone-weight/)

### 思考

一开始就是想通过模拟操作的方式进行模拟，但是因为需要不断重复排序，没有想到好的解决方法（后来看了其他人的解法，就是使用这样的方式，效果还很不错）

[https://leetcode-cn.com/submissions/detail/64218685/](https://leetcode-cn.com/submissions/detail/64218685/)

### 反思

使用优先队列`PriorityQueue`进行模拟，不断从中`poll`数据获取最大值

## 1047. 删除字符串中的所有相邻重复项

[https://leetcode-cn.com/problems/remove-all-adjacent-duplicates-in-string/](https://leetcode-cn.com/problems/remove-all-adjacent-duplicates-in-string/)

### 思考

通过建立一个`StringBuilder`并对其进行循环删除操作，直到不会发生删除为止

[https://leetcode-cn.com/submissions/detail/64219770/](https://leetcode-cn.com/submissions/detail/64219770/)

### 反思

官方解法通过构建一个“替换函数”还有另外一个使用“栈”进行解答，栈解法更加简单：若当前的字母和栈顶的字母相同，则弹出栈顶的字母

## 1051. 高度检查器

[https://leetcode-cn.com/problems/height-checker/](https://leetcode-cn.com/problems/height-checker/)

### 思考

解法比较简单粗暴，直接复制数组并排序，并与原数组比对，找出差异的数量

[https://leetcode-cn.com/submissions/detail/64219851/](https://leetcode-cn.com/submissions/detail/64219851/)

### 反思

看到其他人的解答为 O(n)，其实并不关心排序后得到的结果，我们想知道的只是在该位置上，与最小的值是否一致，通过简单的计数即可，不需要排序
