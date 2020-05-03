---
layout: post
date: 2020-05-03 19:21:20 +0800
slug: leetcode-java-16
title: "LeetCode 手记 16"
author: Yourtion
keywords: ["leetcode", "java"]
description: "对于有序数组尽可能考虑使用二分查找等方法；特定场景下使用桶排序性能更佳"
category: "学习"
tags: ["LeetCode", "Java"]
---
{% include JB/setup %}

## 本周收获

- 对于有序数组尽可能考虑使用二分查找等方法
- 特定场景下使用桶排序性能更佳

## 1260. 二维网格迁移

[https://leetcode-cn.com/problems/shift-2d-grid/](https://leetcode-cn.com/problems/shift-2d-grid/)

### 思考

通过将原有的网络按照移位转换成一个数组，然后重新输出到结果 List 中去，注意使用`k % (m * n)`避免数组越界

[https://leetcode-cn.com/submissions/detail/66342165/](https://leetcode-cn.com/submissions/detail/66342165/)

### 反思

官方解法主要还是通过原地模拟迁移来完成操作

## 1266. 访问所有点的最小时间

[https://leetcode-cn.com/problems/minimum-time-visiting-all-points/](https://leetcode-cn.com/problems/minimum-time-visiting-all-points/)

### 思考

没有想到很好的解决方法，通过遍历计算好像会有比较大问题

[https://leetcode-cn.com/submissions/detail/66342237/](https://leetcode-cn.com/submissions/detail/66342237/)

### 反思

使用切比雪夫距离算法：从 x 移动到 y 的最少次数为 dx 和 dy 中的较大值`max(dx, dy)`，这也被称作 x 和 y 之间的 切比雪夫距离

## 1275. 找出井字棋的获胜者

[https://leetcode-cn.com/problems/find-winner-on-a-tic-tac-toe-game/](https://leetcode-cn.com/problems/find-winner-on-a-tic-tac-toe-game/)

### 思考

首先通过循环按照 moves 数组的内容模拟完井字棋，然后通过 win 函数进行判别。通过预定义的判别矩阵获取相应的元素，然后判断是否练成线

[https://leetcode-cn.com/submissions/detail/66344019/](https://leetcode-cn.com/submissions/detail/66344019/)

### 反思

跟官方解基本一致，关注转换成了一维数组，处理起来更加简单

## 1281. 整数的各位积和之差

[https://leetcode-cn.com/problems/subtract-the-product-and-sum-of-digits-of-an-integer/](https://leetcode-cn.com/problems/subtract-the-product-and-sum-of-digits-of-an-integer/)

### 思考

这道题目解法比较简单，通过 while 循环累计每位的积与和，然后计算差值即可

[https://leetcode-cn.com/submissions/detail/66563802/](https://leetcode-cn.com/submissions/detail/66563802/)

### 反思

跟官方解法一致

## 1287. 有序数组中出现次数超过 25%的元素

[https://leetcode-cn.com/problems/element-appearing-more-than-25-in-sorted-array/](https://leetcode-cn.com/problems/element-appearing-more-than-25-in-sorted-array/)

### 思考

因为是一个有序的数组，所以超过 25%的数字一定是一起出现的，只需循环数组，当遇到相同的数就累加，当超过四分之一即可返回

[https://leetcode-cn.com/submissions/detail/66563876/](https://leetcode-cn.com/submissions/detail/66563876/)

### 反思

官方题解还有通过二分查找的解法，时间复杂度更低

## 1290. 二进制链表转整数

[https://leetcode-cn.com/problems/convert-binary-number-in-a-linked-list-to-integer/](https://leetcode-cn.com/problems/convert-binary-number-in-a-linked-list-to-integer/)

### 思考

通过从头遍历链表，不断乘 2 累加即可得到结果

[https://leetcode-cn.com/submissions/detail/66563967/](https://leetcode-cn.com/submissions/detail/66563967/)

### 反思

跟官方解法一致

## 1295. 统计位数为偶数的数字

[https://leetcode-cn.com/problems/find-numbers-with-even-number-of-digits/](https://leetcode-cn.com/problems/find-numbers-with-even-number-of-digits/)

### 思考

直接使用`String.valueOf(a).length()`将数字转换成为字符串然后判断位数

[https://leetcode-cn.com/submissions/detail/66831642/](https://leetcode-cn.com/submissions/detail/66831642/)

### 反思

官方题解提到通过数学法：求以 10 为底的对数函数 log10() 来得到整数 x 包含的数字个数

## 1299. 将每个元素替换为右侧最大元素

[https://leetcode-cn.com/problems/replace-elements-with-greatest-element-on-right-side/](https://leetcode-cn.com/problems/replace-elements-with-greatest-element-on-right-side/)

### 思考

先取出最后一个数，将最后一位置为-1，然后从数组尾部开始，向前循环，把每一位替换成当前最大值，如果遇到大于当前值则替换

[https://leetcode-cn.com/submissions/detail/66831730/](https://leetcode-cn.com/submissions/detail/66831730/)

### 反思

跟官方解法基本一致，但是官方解法使用`ans[i] = max(ans[i + 1], arr[i + 1])`，减少了临时变量保存和比对的逻辑

## 1304. 和为零的 N 个唯一整数

[https://leetcode-cn.com/problems/find-n-unique-integers-sum-up-to-zero/](https://leetcode-cn.com/problems/find-n-unique-integers-sum-up-to-zero/)

### 思考

逻辑很简单，先生成一个目标长度的数组，从 1 开始，不断累加，数组从 0 开始放置 i 对应的负数，从中间位置放置对应的 i，如果是奇数个数，剩余一个位置为 0

[https://leetcode-cn.com/submissions/detail/66831801/](https://leetcode-cn.com/submissions/detail/66831801/)

### 反思

官方解法是直接放 1 到 n-2，最后放一个负数等于前面的和

## 1313. 解压缩编码列表

[https://leetcode-cn.com/problems/decompress-run-length-encoded-list/](https://leetcode-cn.com/problems/decompress-run-length-encoded-list/)

### 思考

先计算总体解压后的数组大小，然后循环填充结果数组

[https://leetcode-cn.com/submissions/detail/67135389/](https://leetcode-cn.com/submissions/detail/67135389/)

### 反思

其他人的解法中使用`Arrays.fill`填充内容，性能可能较好

## 1317. 将整数转换为两个无零整数的和

[https://leetcode-cn.com/problems/convert-integer-to-the-sum-of-two-no-zero-integers/](https://leetcode-cn.com/problems/convert-integer-to-the-sum-of-two-no-zero-integers/)

### 思考

一开始的想法是根据有没有 1 的情况再根据 0 的位置进行处理，但是这样处理的逻辑就会很复杂

[https://leetcode-cn.com/submissions/detail/67135526/](https://leetcode-cn.com/submissions/detail/67135526/)

### 反思

官方题解使用一个简单粗暴的方法，直接尝试减一直到找到结果

## 1323. 6 和 9 组成的最大数字

[https://leetcode-cn.com/problems/maximum-69-number/](https://leetcode-cn.com/problems/maximum-69-number/)

### 思考

转换成数字转换成字符串数组，遇到 6 就转成 9 并返回

[https://leetcode-cn.com/submissions/detail/67135587/](https://leetcode-cn.com/submissions/detail/67135587/)

### 反思

跟官方解法类似，看到还有人使用穷举法直接按照数字返回结果

## 1331. 数组序号转换

[https://leetcode-cn.com/problems/rank-transform-of-an-array/](https://leetcode-cn.com/problems/rank-transform-of-an-array/)

### 思考

拷贝数组并进行排序，然后通过一个 map 记录数字对应的序号，最后重新遍历原数组，将对应需要填充到对应的位置

[https://leetcode-cn.com/submissions/detail/67369599/](https://leetcode-cn.com/submissions/detail/67369599/)

### 反思

更快的解法使用了桶排序的方法，先遍历 arr 数组，找到数组中的最大值和最小值，建立桶数组，将 arr 数组中出现过的元素在桶中设置为 1，最后利用前缀和统计出每个元素前面出现过的次数，即该元素的序号

## 1332. 删除回文子序列

[https://leetcode-cn.com/problems/remove-palindromic-subsequences/](https://leetcode-cn.com/problems/remove-palindromic-subsequences/)

### 思考

总体来说分成三种情况，空字符串返回 0，如果本身是回文串即一次可以删除返回 1，剩余的情况返回 2，因为回文子串删除后剩下的一定是一个字符组成的（因为只有 a 和 b 两个字符）

[https://leetcode-cn.com/submissions/detail/67369655/](https://leetcode-cn.com/submissions/detail/67369655/)

### 反思

跟其他人解法一致

## 1337. 方阵中战斗力最弱的 K 行

[https://leetcode-cn.com/problems/the-k-weakest-rows-in-a-matrix/](https://leetcode-cn.com/problems/the-k-weakest-rows-in-a-matrix/)

### 思考

先使用一个 count 方法对每一行进行战斗力计算，并放入一个二维数组中，然后使用定义的的 sort 方法`Arrays.sort(map, (o1, o2) -> o1[0] == o2[0] ? o1[1] - o2[1] : o1[0] - o2[0])`，在从排序好的数组中取出前 k 个的行序号

[https://leetcode-cn.com/submissions/detail/67369919/](https://leetcode-cn.com/submissions/detail/67369919/)

### 反思

一个更简单的方法是直接将战斗力乘以 100（题目说明 m 和 n 不大于 100）后加上行序号组成排序的 key，然后直接使用`Arrays.sort`排序即可，最后将 key 值与 100 取模即为行序号返回

## 1342. 将数字变成 0 的操作次数

[https://leetcode-cn.com/problems/number-of-steps-to-reduce-a-number-to-zero/](https://leetcode-cn.com/problems/number-of-steps-to-reduce-a-number-to-zero/)

### 思考

操作比较简单， 直接按照题目描述循环执行除 2 和减 1 然后计算次数

[https://leetcode-cn.com/submissions/detail/67613614/](https://leetcode-cn.com/submissions/detail/67613614/)

### 反思

也可以通过位操作的方式：把十进制转化成二进制，有 m 位表示需要做 m-1 次除法（最后一位不需要），有 n 个'1'表示需要做 n 次减法

## 1346. 检查整数及其两倍数是否存在

[https://leetcode-cn.com/problems/check-if-n-and-its-double-exist/](https://leetcode-cn.com/problems/check-if-n-and-its-double-exist/)

### 思考

循环将数组放入 set 中并检查是否在 set 中，如果没有负数，因为数组已经排序，所以从后往前检查的时候大数已经被放入 set 中，但是因为存在负数的情况，应该再执行一遍循环

[https://leetcode-cn.com/submissions/detail/67617956/](https://leetcode-cn.com/submissions/detail/67617956/)

### 反思

跟官方解法的哈希表法类似，但是不需要再做计数

## 1351. 统计有序矩阵中的负数

[https://leetcode-cn.com/problems/count-negative-numbers-in-a-sorted-matrix/](https://leetcode-cn.com/problems/count-negative-numbers-in-a-sorted-matrix/)

### 思考

通过一个 count 函数计算负数个数（从头统计，减去正数个数），最后再累加即可

[https://leetcode-cn.com/submissions/detail/67614640/](https://leetcode-cn.com/submissions/detail/67614640/)

### 反思

跟官方解法的倒序统计类似，也可以使用二分法加快查找速度

## 1356. 根据数字二进制下 1 的数目排序

[https://leetcode-cn.com/problems/sort-integers-by-the-number-of-1-bits/](https://leetcode-cn.com/problems/sort-integers-by-the-number-of-1-bits/)

### 思考

循环并使用`Integer.bitCount`计算数字中 1 的个数，乘以 10000000（题目中不会大于 10^4）然后加上原数字，放入数组 map 中，并对 map 进行排序，最后`% 10000000`获取原来的数组，填充到原数组返回即可

[https://leetcode-cn.com/submissions/detail/67888286/](https://leetcode-cn.com/submissions/detail/67888286/)

### 反思

官方解法使用更改 sort 比较方法也是一个很好的策略

## 1360. 日期之间隔几天

[https://leetcode-cn.com/problems/number-of-days-between-two-dates/](https://leetcode-cn.com/problems/number-of-days-between-two-dates/)

### 思考

一开始通过一个复杂的方法计算两年直接的距离，先算起始年剩余天数，加上经过的年份天数，最后加上结束年份，但是计算结果有些问题，最后使用计算到 1971 年之间的天数差

[https://leetcode-cn.com/submissions/detail/67890539/](https://leetcode-cn.com/submissions/detail/67890539/)

### 反思

闰年的数量计算：

1. 先加上所有模 4 为 0 的年份的数量。此时有些模 100 为 0 的不是闰年的年份被加上了。
2. 再减去所有模 100 为 0 的年份的数量。此时有些模 400 为 0 的是闰年的年份被减去了。
3. 再加上所有模 400 为 0 的年份的数量。完成

## 1365. 有多少小于当前数字的数字

[https://leetcode-cn.com/problems/how-many-numbers-are-smaller-than-the-current-number/](https://leetcode-cn.com/problems/how-many-numbers-are-smaller-than-the-current-number/)

### 思考

1. 因为数字都小于 100，所以先构建一个`int[] map = int[100]`
2. 循环数组，将对应 map 的数字位加一进行计数（某个数字出现的次数）
3. 循环 map，将小于当前数字的值累加到当前位上（比当前数字小的数字出现的次数）
4. 循环原始数组，获取 map 对应位上的值即为结果

[https://leetcode-cn.com/submissions/detail/67889787/](https://leetcode-cn.com/submissions/detail/67889787/)

### 反思

跟官方解法的“频次数组 + 前缀和”一致
