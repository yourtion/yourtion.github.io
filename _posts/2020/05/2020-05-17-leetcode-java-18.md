---
layout: post
date: 2020-05-17 18:09:18 +0800
slug: leetcode-java-18
title: "LeetCode 手记 18"
author: Yourtion
keywords: ["leetcode", "java"]
description: "使用`String.valueOf`从`char[]`中获取子串；通过快慢指针找链表中点更简单（快指针走两步、慢指针走一步）；通过一定策略降低无谓的存储，减少内存的使用"
category: "学习"
tags: ["LeetCode", "Java"]
---
{% include JB/setup %}

## 本周收获

- 使用`String.valueOf`从`char[]`中获取子串
- 通过快慢指针找链表中点更简单（快指针走两步、慢指针走一步）
- 通过一定策略降低无谓的存储，减少内存的使用

## 1441. 用栈操作构建数组

[https://leetcode-cn.com/problems/build-an-array-with-stack-operations/](https://leetcode-cn.com/problems/build-an-array-with-stack-operations/)

### 思考

操作方式比较简单，匹配当前数字则 Psuh，否则加入 Push、Pop

[https://leetcode-cn.com/submissions/detail/69920060/](https://leetcode-cn.com/submissions/detail/69920060/)

### 反思

跟其他人的解法一致

## 9008. 面试题 01.03. URL 化

[https://leetcode-cn.com/problems/string-to-url-lcci/](https://leetcode-cn.com/problems/string-to-url-lcci/)

### 思考

通过转换成`char[]`，然后从后向前遍历，遇到空格插入“%20”，否则原样拷贝原位置字符，最后通过 substring 取出结果字符串

[https://leetcode-cn.com/submissions/detail/69933349/](https://leetcode-cn.com/submissions/detail/69933349/)

### 反思

跟其他人的解法类似

## 9009. 面试题 01.04. 回文排列

[https://leetcode-cn.com/problems/palindrome-permutation-lcci/](https://leetcode-cn.com/problems/palindrome-permutation-lcci/)

### 思考

通过对字符串的字母进行计数，只要不超过一个字符为奇数即为“回文排列”

[https://leetcode-cn.com/submissions/detail/69923357/](https://leetcode-cn.com/submissions/detail/69923357/)

### 反思

跟其他人解法一致

## 9010. 面试题 01.09. 字符串轮转

[https://leetcode-cn.com/problems/string-rotation-lcci/submissions/](https://leetcode-cn.com/problems/string-rotation-lcci/submissions/)

### 思考

如果 s2 为 s1 轮转而成，那么将两个 s2 拼接起来必然包含一个 s1，只需要调用一次检查子串`(s2 + s2).lastIndexOf(s1) > -1`

[https://leetcode-cn.com/submissions/detail/70194079/](https://leetcode-cn.com/submissions/detail/70194079/)

### 反思

更快的方法应该是：`(s1+s1).contains(s2)`，如果 s2 是 s1 的子串， 那么 s2 必然在 s1+s1 里面

## 9011. 面试题 02.01. 移除重复节点

[https://leetcode-cn.com/problems/remove-duplicate-node-lcci/](https://leetcode-cn.com/problems/remove-duplicate-node-lcci/)

### 思考

使用一个 Set 保存之前遇到的节点，如果是之前没有遇到的则加入，否则跳过

[https://leetcode-cn.com/submissions/detail/70194767/](https://leetcode-cn.com/submissions/detail/70194767/)

### 反思

跟其他人解法类似，但是没有看到如何不使用临时缓冲区

## 9024. 面试题 02.02. 返回倒数第 k 个节点

[https://leetcode-cn.com/problems/kth-node-from-end-of-list-lcci/](https://leetcode-cn.com/problems/kth-node-from-end-of-list-lcci/)

### 思考

先遍历一遍计算整个链表有多少元素，再遍历到倒数第 k 个（通过总数减去 k）元素返回结果

[https://leetcode-cn.com/submissions/detail/70200458](https://leetcode-cn.com/submissions/detail/70200458)

### 反思

通过两个指针，让快指针先跑 k 步，再开始同时循环，到了快指针到尾部时候返回慢指针的结果

## 9026. 面试题 02.03. 删除中间节点

[https://leetcode-cn.com/problems/delete-middle-node-lcci/](https://leetcode-cn.com/problems/delete-middle-node-lcci/)

### 思考

因为只要删除当前节点，只要把下一个节点的值和下下个节点的指针放到当前被删除节点即可

[https://leetcode-cn.com/submissions/detail/70431736/](https://leetcode-cn.com/submissions/detail/70431736/)

### 反思

跟其他人解法一致

## 9012. 面试题 02.06. 回文链表

[https://leetcode-cn.com/problems/palindrome-linked-list-lcci/](https://leetcode-cn.com/problems/palindrome-linked-list-lcci/)

### 思考

先循环一遍确定链表的长度，然后在一半的位置，取出节点，把链表反转，再与原来的一半链表比对，相同即为回文

[https://leetcode-cn.com/submissions/detail/70431795/](https://leetcode-cn.com/submissions/detail/70431795/)

### 反思

在出来链表反转的时候没有做对，后来重新梳理了。

## 9013. 面试题 02.07. 链表相交

[https://leetcode-cn.com/problems/intersection-of-two-linked-lists-lcci/](https://leetcode-cn.com/problems/intersection-of-two-linked-lists-lcci/)

### 思考

通过双指针同时遍历两个单链表，当其中一个指针为空，即到到达表尾，就指向另一个链表的表头。当两个指针相等时说明相交。

[https://leetcode-cn.com/submissions/detail/70431846/](https://leetcode-cn.com/submissions/detail/70431846/)

### 反思

参考了之前的双指针解法

## 9014. 面试题 03.01. 三合一

[https://leetcode-cn.com/problems/three-in-one-lcci/](https://leetcode-cn.com/problems/three-in-one-lcci/)

### 思考

通过一个数组记录栈中的数据，然后另外一个数组记录对应一个栈在数组中的索引变化情况，根据栈号码 psuh 或者 pop 对应栈内容即可

[https://leetcode-cn.com/submissions/detail/70699308/](https://leetcode-cn.com/submissions/detail/70699308/)

### 反思

跟其他人解法一致

## 9015. 面试题 03.02. 栈的最小值

[https://leetcode-cn.com/problems/min-stack-lcci/](https://leetcode-cn.com/problems/min-stack-lcci/)

### 思考

通过两个栈，一个记录栈的数值，另外一个栈记录当前最小值，同时操作两个栈即可

[https://leetcode-cn.com/submissions/detail/70697916/](https://leetcode-cn.com/submissions/detail/70697916/)

### 反思

- 压栈时，如果最小元素发生变更，就把当前最小元素也进行压栈，标记这一次的最小元素变更情况。
- 出栈时，如果遇到当前最小值与栈顶元素相同的情况，就连着这个元素一起弹出，并将当前最小值更新为这个元素的下一个元素。

## 9016. 面试题 03.04. 化栈为队

[https://leetcode-cn.com/problems/implement-queue-using-stacks-lcci/](https://leetcode-cn.com/problems/implement-queue-using-stacks-lcci/)

### 思考

通过一个临时栈，在 push 的时候使用临时栈倒一遍数据出来，放入新数据，再把数据倒回去

[https://leetcode-cn.com/submissions/detail/70698006/](https://leetcode-cn.com/submissions/detail/70698006/)

### 反思

1. 添加：添加到 stack1；
2. 判断是否是空：判断两个栈是不是空的
3. pop：首先 pop stack2 然后将 stack1 中的元素添加到 stack2 中，再 pop stack2
4. top：首先 top stack2 然后将 stack1 中的元素添加到 stack2 中，再 top stack2

## 9017. 面试题 03.06. 动物收容所

[https://leetcode-cn.com/problems/animal-shelter-lcci/](https://leetcode-cn.com/problems/animal-shelter-lcci/)

### 思考

使用两个`Queue`保存猫和狗的收容情况，同时使用一个计数器保存收容顺序，如果是 dequeueAny 则先判断收容顺序，否则从各自队列获取

[https://leetcode-cn.com/submissions/detail/70982028/](https://leetcode-cn.com/submissions/detail/70982028/)

### 反思

跟其他人的类似

## 9018. 面试题 04.02. 最小高度树

[https://leetcode-cn.com/problems/minimum-height-tree-lcci/](https://leetcode-cn.com/problems/minimum-height-tree-lcci/)

### 思考

因为输入的是一个有序数组，所以通过递归的形式，不断通过中间构建节点，并把左边元素作为左子树，右边元素作为右子树

[https://leetcode-cn.com/submissions/detail/70972848/](https://leetcode-cn.com/submissions/detail/70972848/)

### 反思

跟其他人的解法基本一致

## 9019. 面试题 04.04. 检查平衡性

[https://leetcode-cn.com/problems/check-balance-lcci/](https://leetcode-cn.com/problems/check-balance-lcci/)

### 思考

计算树的左右子树高度差并递归计算计算子树并判断是否平衡

[https://leetcode-cn.com/submissions/detail/70973811/](https://leetcode-cn.com/submissions/detail/70973811/)

### 反思

跟其他人解法类似

## 9020. 面试题 05.01. 插入

[https://leetcode-cn.com/problems/insert-into-bits-lcci/](https://leetcode-cn.com/problems/insert-into-bits-lcci/)

### 思考

一开始的思路是通过转换为字符串然后通过字符串操作，但是这样是完全不正确的，应该基于位运算

[https://leetcode-cn.com/submissions/detail/71228964/](https://leetcode-cn.com/submissions/detail/71228964/)

### 反思

通过将`11111111111111111111111111111110`首尾循环移动`distance`位并与 N 与运算将第`distance`位清零

## 9021. 面试题 05.03. 翻转数位

[https://leetcode-cn.com/problems/reverse-bits-lcci/](https://leetcode-cn.com/problems/reverse-bits-lcci/)

### 思考

通过将数字转化成二进制字符串，然后尝试将每一个遇到的 0 转换为 1，计算连续 1 的个数，最后取最大值，注意全部为 1 的情况

[https://leetcode-cn.com/submissions/detail/71229119/](https://leetcode-cn.com/submissions/detail/71229119/)

### 反思

通过位运算一次遍历，pre 表示上一个连续 1 的长度+1，cur 表示当前连续 1 的长度，结果即为最大的 pre+cur

## 9022. 面试题 05.06. 整数转换

[https://leetcode-cn.com/problems/convert-integer-lcci/](https://leetcode-cn.com/problems/convert-integer-lcci/)

### 思考

一开始是通过一个`int[]`对数字进行计数，然后比对不同，结果发现对负数也是不对的

[https://leetcode-cn.com/submissions/detail/71230027/](https://leetcode-cn.com/submissions/detail/71230027/)

### 反思

求 A 与 B 异或的值中 1 的个数, 通过`n&(n - 1)`可以去掉一个数的二进制表示的最右边的 1

## 9023. 面试题 05.07. 配对交换

[https://leetcode-cn.com/problems/exchange-lcci/](https://leetcode-cn.com/problems/exchange-lcci/)

### 思考

一开始的解题思路是通过不断除二后获取特定位交换，但是这样的不行的

[https://leetcode-cn.com/submissions/detail/71497997/](https://leetcode-cn.com/submissions/detail/71497997/)

### 反思

取出奇数位和偶数位，移动后做或运算

- 0xaaaaaaaa 10101010101010101010101010101010 (偶数位为 1，奇数位为 0）
- 0x55555555 1010101010101010101010101010101 (偶数位为 0，奇数位为 1）
- even + odd 和 even | odd 性质一样

## 9025. 面试题 08.01. 三步问题

[https://leetcode-cn.com/problems/three-steps-problem-lcci/](https://leetcode-cn.com/problems/three-steps-problem-lcci/)

### 思考

没有太多的思路，考虑使用的是动态规划实现

[https://leetcode-cn.com/submissions/detail/71497902/](https://leetcode-cn.com/submissions/detail/71497902/)

### 反思

考虑倒数第二步：可以在第`n-1`、`n-2`、`n-3`这 3 个台阶上，然后一步就可以到达终点，所以`dp(n) = dp(n-1) + dp(n-2) + dp(n-3)`，初始状态容易得到：`dp(1), dp(2), dp(3) = 1, 2, 4`，可以用 3 个变量代表 dp 过程中的数字，无需开辟 dp 数组

## 9027. 面试题 08.03. 魔术索引

[https://leetcode-cn.com/problems/magic-index-lcci/](https://leetcode-cn.com/problems/magic-index-lcci/)

### 思考

方法很简单粗暴，就是循环数组，遇到和索引一致的就返回

[https://leetcode-cn.com/submissions/detail/71497954/](https://leetcode-cn.com/submissions/detail/71497954/)

### 反思

因为是一个有序数组，使用二分法进行解答，如果找到，则从左半边继续查找更小的解，如果未找到，则先搜索左半边，左半边无解的情况下再搜索右半边
