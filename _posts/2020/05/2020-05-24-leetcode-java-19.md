---
layout: post
date: 2020-05-24 15:12:28 +0800
slug: leetcode-java-19
title: "LeetCode 手记 19"
author: Yourtion
keywords: ["leetcode", "java"]
description: "回顾之前的一些题目解法，温故而知新"
category: "学习"
tags: ["LeetCode", "Java"]
---
{% include JB/setup %}

## 1446. 连续字符

[https://leetcode-cn.com/problems/consecutive-characters/](https://leetcode-cn.com/problems/consecutive-characters/)

### 思考

遍历字符串，不断获取并统计统计最长的连续字符（遇到相同则加一，否则取当前值与最大值比较）

[https://leetcode-cn.com/submissions/detail/71682347/](https://leetcode-cn.com/submissions/detail/71682347/)

### 反思

跟其他人类似，也可以使用双指针计算

## 1450. 在既定时间做作业的学生人数

[https://leetcode-cn.com/problems/number-of-students-doing-homework-at-a-given-time/](https://leetcode-cn.com/problems/number-of-students-doing-homework-at-a-given-time/)

### 思考

循环 startTime 和 endTime 数组，遇到包含 queryTime 则加一

[https://leetcode-cn.com/submissions/detail/71682449/](https://leetcode-cn.com/submissions/detail/71682449/)

### 反思

跟其他人解法一致

## 9028. 面试题 08.06. 汉诺塔问题

[https://leetcode-cn.com/problems/hanota-lcci/](https://leetcode-cn.com/problems/hanota-lcci/)

### 思考

没有想到好的解题思路，应该需要通过递归解答

[https://leetcode-cn.com/submissions/detail/71682514/](https://leetcode-cn.com/submissions/detail/71682514/)

### 反思

当`n = 1`时，直接把盘子从 A 移到 C；`n > 1`时:

- 先把上面 n - 1 个盘子从 A 移到 B（子问题，递归）；
- 再将最大的盘子从 A 移到 C；
- 再将 B 上 n - 1 个盘子从 B 移到 C（子问题，递归）。

## 9029. 面试题 08.10. 颜色填充

[https://leetcode-cn.com/problems/color-fill-lcci/](https://leetcode-cn.com/problems/color-fill-lcci/)

### 思考

通过 DFS 算法遍历替换目标点周边的元素，注意处理数据越界和不匹配的情况，避免出现死循环

[https://leetcode-cn.com/submissions/detail/71893819/](https://leetcode-cn.com/submissions/detail/71893819/)

### 反思

跟其他人解法基本一致

## 9030. 面试题 10.05. 稀疏数组搜索

[https://leetcode-cn.com/problems/sparse-array-search-lcci/](https://leetcode-cn.com/problems/sparse-array-search-lcci/)

### 思考

通过遍历数组实现的，逻辑上应该使用二分法查找完成

[https://leetcode-cn.com/submissions/detail/71893904/](https://leetcode-cn.com/submissions/detail/71893904/)

### 反思

在原有二分法的情况下，针对稀疏数组情况，添加代码（遇到空串向右移动），当`mid>right`时`right=left+(right-left)/2-1;`

## 9031. 面试题 16.05. 阶乘尾数

[https://leetcode-cn.com/problems/factorial-zeros-lcci/](https://leetcode-cn.com/problems/factorial-zeros-lcci/)

### 思考

参考之前的解答，只需要将 n 除以 5 的每个幂，也就是累加 n / 5 即可

[https://leetcode-cn.com/submissions/detail/71893993/](https://leetcode-cn.com/submissions/detail/71893993/)

### 反思

跟其他人解法基本一致

## 9032. 面试题 16.07. 最大数值

[https://leetcode-cn.com/problems/maximum-lcci/](https://leetcode-cn.com/problems/maximum-lcci/)

### 思考

没有想到合适到思路

[https://leetcode-cn.com/submissions/detail/72252164/](https://leetcode-cn.com/submissions/detail/72252164/)

### 反思

使用位运算平均值法： `max(a, b) = ((a + b) + abs(a - b)) / 2`。

## 9033. 面试题 16.11. 跳水板

[https://leetcode-cn.com/problems/diving-board-lcci/](https://leetcode-cn.com/problems/diving-board-lcci/)

### 思考

通过计算长板和短板的差，然后循环 k，不断在短板上累加差值即可，注意处理 k 为 0 和长短板一样长度的问题

[https://leetcode-cn.com/submissions/detail/72255883/](https://leetcode-cn.com/submissions/detail/72255883/)

### 反思

跟其他人解法基本一致

## 9034. 面试题 16.15. 珠玑妙算

[https://leetcode-cn.com/problems/master-mind-lcci/](https://leetcode-cn.com/problems/master-mind-lcci/)

### 思考

通过 map 存储字符数量，统计总猜中次数，计算伪猜中 = 总次数 - 猜中次数

[https://leetcode-cn.com/submissions/detail/72256076/](https://leetcode-cn.com/submissions/detail/72256076/)

### 反思

跟其他人解法一致，使用`int[]`替代 map

## 9035. 面试题 16.17. 连续数列

[https://leetcode-cn.com/problems/contiguous-sequence-lcci/](https://leetcode-cn.com/problems/contiguous-sequence-lcci/)

### 思考

两次遍历累加记录子数组的最大值

[https://leetcode-cn.com/submissions/detail/72502713/](https://leetcode-cn.com/submissions/detail/72502713/)

### 反思

使用动态规划和分治两种方法

## 9036. 面试题 17.01. 不用加号的加法

[https://leetcode-cn.com/problems/add-without-plus-lcci/](https://leetcode-cn.com/problems/add-without-plus-lcci/)

### 思考

对于位运算没有太多思路

[https://leetcode-cn.com/submissions/detail/72503179/](https://leetcode-cn.com/submissions/detail/72503179/)

### 反思

1. 进行不含进位的加法的运算,即异或运算,结果记为 ans
2. 每一位上的进位凑成一个数,记为 carry,显然 carry = (a&b) <<1
3. 如果 carry 为 0,则答案为 ans;如果 carry 不为 0,则答案为 ans+carry,为了完成新出现的加法运算,重复过程 1,2

## 9037. 面试题 17.04. 消失的数字

[https://leetcode-cn.com/problems/missing-number-lcci/](https://leetcode-cn.com/problems/missing-number-lcci/)

### 思考

通过计算 0 到 n 的总和减去数组中每个数字，结果就是消失的数字

[https://leetcode-cn.com/submissions/detail/72503364/](https://leetcode-cn.com/submissions/detail/72503364/)

### 反思

跟其他人解法类似

## 9038. 面试题 17.10. 主要元素

[https://leetcode-cn.com/problems/find-majority-element-lcci/](https://leetcode-cn.com/problems/find-majority-element-lcci/)

### 思考

先使用投票算法找出列表中的多数元素，再进一步使用循环算法判读是否超过一半

[https://leetcode-cn.com/submissions/detail/72746643/](https://leetcode-cn.com/submissions/detail/72746643/)

### 反思

跟其他人解法基本一致

## 9039. 面试题 17.12. BiNode

[https://leetcode-cn.com/problems/binode-lcci/](https://leetcode-cn.com/problems/binode-lcci/)

### 思考

之前考虑使用栈的形式去替换节点中的左节点，但是结果有些不一致

[https://leetcode-cn.com/submissions/detail/72746733/](https://leetcode-cn.com/submissions/detail/72746733/)

### 反思

使用中序遍历递归方式进行迭代

## 9040. 面试题 03. 数组中重复的数字

[https://leetcode-cn.com/problems/shu-zu-zhong-zhong-fu-de-shu-zi-lcof/](https://leetcode-cn.com/problems/shu-zu-zhong-zhong-fu-de-shu-zi-lcof/)

### 思考

通过循环数组，将数组中当前数组对于的下标置为负数，下次遇到负数则为出现第二次

[https://leetcode-cn.com/submissions/detail/72746780/](https://leetcode-cn.com/submissions/detail/72746780/)

### 反思

题解使用将数据放入 Set 中进行判断

## 9041. 面试题 04. 二维数组中的查找

[https://leetcode-cn.com/problems/er-wei-shu-zu-zhong-de-cha-zhao-lcof/](https://leetcode-cn.com/problems/er-wei-shu-zu-zhong-de-cha-zhao-lcof/)

### 思考

从前向后循环每一行，如果行的首尾不在目标值范围内则跳过，否则使用二分查找法查找结果，最后返回 false

[https://leetcode-cn.com/submissions/detail/73052957/](https://leetcode-cn.com/submissions/detail/73052957/)

### 反思

如果当前元素大于目标值，说明当前元素的下边的所有元素都一定大于目标值，因此往下查找不可能找到目标值，往左查找可能找到目标值。如果当前元素小于目标值，说明当前元素的左边的所有元素都一定小于目标值，因此往左查找不可能找到目标值，往下查找可能找到目标值。

## 9042. 面试题 05. 替换空格

[https://leetcode-cn.com/problems/ti-huan-kong-ge-lcof/](https://leetcode-cn.com/problems/ti-huan-kong-ge-lcof/)

### 思考

直接将字符串转换成字符数组，然后使用 StringBuilder 进行字符串拼接

[https://leetcode-cn.com/submissions/detail/73040148/](https://leetcode-cn.com/submissions/detail/73040148/)

### 反思

官方解法直接使用一个三倍于输入字符串长度的数组进行拼接，最后按照实际长度返回

## 9043. 面试题 06. 从尾到头打印链表

[https://leetcode-cn.com/problems/cong-wei-dao-tou-da-yin-lian-biao-lcof/](https://leetcode-cn.com/problems/cong-wei-dao-tou-da-yin-lian-biao-lcof/)

### 思考

1. 第一次循环计算链表长度
2. 根据链表长度创建结果数组
3. 从头再次遍历链表，在数组中从尾向前填充遍历结果

[https://leetcode-cn.com/submissions/detail/73040193/](https://leetcode-cn.com/submissions/detail/73040193/)

### 反思

官方结果需要使用栈重新存储一遍节点内容

## 9044. 面试题 09. 用两个栈实现队列

[https://leetcode-cn.com/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof/](https://leetcode-cn.com/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof/)

### 思考

使用两个栈进行模拟，一个作为辅助栈，如果在推入时辅助栈为空，数据可直接压入辅助栈（等待推出再推入目标栈），从头部取数据时，如果辅助栈不为空，先将数据导回目标栈中，提升连续压入和取出性能

[https://leetcode-cn.com/submissions/detail/73244453/](https://leetcode-cn.com/submissions/detail/73244453/)

### 反思

跟官方题解类似，感觉特定条件下更优

## 9045. 面试题 10-I. 斐波那契数列

[https://leetcode-cn.com/problems/fei-bo-na-qi-shu-lie-lcof/](https://leetcode-cn.com/problems/fei-bo-na-qi-shu-lie-lcof/)

### 思考

使用自下而上解法，从头开始计算数列结果，只保留`F(N - 1)和`F(N - 2)`

[https://leetcode-cn.com/submissions/detail/73244806/](https://leetcode-cn.com/submissions/detail/73244806/)

### 反思

跟其他人解法一致

## 9046. 面试题 10-II. 青蛙跳台阶问题

[https://leetcode-cn.com/problems/qing-wa-tiao-tai-jie-wen-ti-lcof/](https://leetcode-cn.com/problems/qing-wa-tiao-tai-jie-wen-ti-lcof/)

### 思考

与之前的三步问题类似，使用动态规划，从最后开始向前推进计算结果

[https://leetcode-cn.com/submissions/detail/73244834/](https://leetcode-cn.com/submissions/detail/73244834/)

### 反思

首先知道青蛙每走一步，只有两种情况：这一步要么跳一级，要么跳两级，所以最后一步一定是从第（n-1）级或者第（n-2）级开始跳的`F(n) = F(n-1) + F(n-2)`
