---
layout: post
date: 2020-05-31 18:40:54 +0800
slug: leetcode-java-20
title: "LeetCode 手记 20"
author: Yourtion
keywords: ["leetcode", "java"]
description: "充分了解贪心算法，尽可能减少比对与循环次数；熟悉二分法和位运算；熟悉回溯算法+剪枝；针对回溯中遇到重复的情况，需要仔细考虑剪枝方法"
category: "学习"
tags: ["LeetCode", "Java"]
---
{% include JB/setup %}

## 本周收获

- 充分了解贪心算法，尽可能减少比对与循环次数
- 熟悉二分法和位运算
- 熟悉回溯算法+剪枝
- 针对回溯中遇到重复的情况，需要仔细考虑剪枝方法

## 2. 两数相加

[https://leetcode-cn.com/problems/add-two-numbers/](https://leetcode-cn.com/problems/add-two-numbers/)

### 思考

循环两个列表，获取对应节点的数值进行累加，注意处理空节点和进位问题，按序放入新的链表中

[https://leetcode-cn.com/submissions/detail/73446189/](https://leetcode-cn.com/submissions/detail/73446189/)

### 反思

跟官方题解解法一致

## 6. Z 字形变换

[https://leetcode-cn.com/problems/zigzag-conversion/](https://leetcode-cn.com/problems/zigzag-conversion/)

### 思考

一开始企图通过计算错位的数量来拼接结果字符串，但是这样做会非常复杂，只能通过构建一个数组模拟各个行的情况，最后重新拼接结果

[https://leetcode-cn.com/submissions/detail/73512707/](https://leetcode-cn.com/submissions/detail/73512707/)

### 反思

对于一开始希望的按行访问的场景：

1. 行 0 中的字符位于索引 `k(2⋅numRows−2)` 处;
2. 行 `numRows−1` 中的字符位于索引`k(2⋅numRows−2)+numRows−1`处;
3. 内部的行 i 中的字符位于索引`k(2⋅numRows−2)+i`以及`(k+1)(2⋅numRows−2)−i`处;

## 12. 整数转罗马数字

[https://leetcode-cn.com/problems/integer-to-roman/](https://leetcode-cn.com/problems/integer-to-roman/)

### 思考

通过循环的方式调用一个转换函数，根据返回结果拼接字符串并不断减去返回字母对应的数值，直到数字为 0

[https://leetcode-cn.com/submissions/detail/73518650/](https://leetcode-cn.com/submissions/detail/73518650/)

### 反思

使用贪心算法，通过将数组比对方式，寻找适合它的最大符号。我们减去它，然后寻找适合余数的最大符号，依此类推，直到余数为 0

## 15. 三数之和

[https://leetcode-cn.com/problems/3sum/](https://leetcode-cn.com/problems/3sum/)

### 思考

一开始的解法是先对数组进行排序，然后使用三层循环的方式进行计算，但是在大数据量的情况会超时

[https://leetcode-cn.com/submissions/detail/73817533/](https://leetcode-cn.com/submissions/detail/73817533/)

### 反思

- 首先对数组进行排序，排序后固定一个数 nums[i]，再使用左右指针指向 nums[i]后面的两端，数字分别为 nums[L] 和 nums[R]，计算三个数的和 sum 判断是否满足为 0，满足则添加进结果集
- 如果 nums[i]大于 0，则三数之和必然无法等于 0，结束循环
- 如果 nums[i] == nums[i−1]，则说明该数字重复，会导致结果重复，所以应该跳过
- 当 sum == 0 时，nums[L] == nums[L+1] 则会导致结果重复，应该跳过，L++
- 当 sum == 0 时，nums[R] == nums[R−1] 则会导致结果重复，应该跳过，R−−

## 16. 最接近的三数之和

[https://leetcode-cn.com/problems/3sum-closest/](https://leetcode-cn.com/problems/3sum-closest/)

### 思考

与解决 15 题的思路类似，遍历计算最小值

[https://leetcode-cn.com/submissions/detail/73840072/](https://leetcode-cn.com/submissions/detail/73840072/)

### 反思

左右指针向中间移动，中间同时从左向右移动 i，并三数相加。通过每次`三数之和 - 目标值`，比较绝对值

## 17. 电话号码的字母组合

[https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/](https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/)

### 思考

一开始考虑使用回溯法进行构建，但是没有写出结果

[https://leetcode-cn.com/submissions/detail/73842290/](https://leetcode-cn.com/submissions/detail/73842290/)

### 反思

- 如果没有更多的数字需要被输入，那意味着当前的组合已经产生好了。
- 如果还有数字需要被输入：
- 遍历下一个数字所对应的所有映射的字母。
- 将当前的字母添加到组合最后，也就是 combination = combination + letter 。
- 重复这个过程

## 9047. 面试题 11. 旋转数组的最小数字

[https://leetcode-cn.com/problems/xuan-zhuan-shu-zu-de-zui-xiao-shu-zi-lcof/](https://leetcode-cn.com/problems/xuan-zhuan-shu-zu-de-zui-xiao-shu-zi-lcof/)

### 思考

通过从尾向头遍历数组，发现数字变大即返回

[https://leetcode-cn.com/submissions/detail/74140587/](https://leetcode-cn.com/submissions/detail/74140587/)

### 反思

也可以使用二分法查找

## 9048. 面试题 15. 二进制中 1 的个数

[https://leetcode-cn.com/problems/er-jin-zhi-zhong-1de-ge-shu-lcof/](https://leetcode-cn.com/problems/er-jin-zhi-zhong-1de-ge-shu-lcof/)

### 思考

一开始考虑使用二进制除法后累加，但是发现还是有些问题，最后使用 bitCount

[https://leetcode-cn.com/submissions/detail/74143394/](https://leetcode-cn.com/submissions/detail/74143394/)

### 反思

使用`res += n & 1`和`n >>= 1`循环累加

## 9049. 面试题 17. 打印从 1 到最大的 n 位数

[https://leetcode-cn.com/problems/da-yin-cong-1dao-zui-da-de-nwei-shu-lcof/](https://leetcode-cn.com/problems/da-yin-cong-1dao-zui-da-de-nwei-shu-lcof/)

### 思考

计算位数，然后循环放入相应位置

[https://leetcode-cn.com/submissions/detail/74142586/](https://leetcode-cn.com/submissions/detail/74142586/)

### 反思

对于存在大数的场景：通过使用 char 数组进行求解；通过使用 string 进行求解

## 18. 四数之和

[https://leetcode-cn.com/problems/4sum/](https://leetcode-cn.com/problems/4sum/)

### 思考

跟三数之和类似，先排序再计算

[https://leetcode-cn.com/submissions/detail/74396879/](https://leetcode-cn.com/submissions/detail/74396879/)

### 反思

1. 第一层循环选择第一个数固定然后去遍历其它三个数。
2. 第二层循环选择第二个数固定然后去遍历最后两个数。
3. 通过双指针选出最后符合条件的两个数。

## 19. 删除链表的倒数第 N 个节点

[https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/)

### 思考

使用快慢指针的方式，先让快指针走 n 步后，慢指针才开始向后移动。需要处理倒数 N 个节点正好是头节点的情况

[https://leetcode-cn.com/submissions/detail/74428576/](https://leetcode-cn.com/submissions/detail/74428576/)

### 反思

官方题解使用一个 dummy 节点处理头节点的情况

## 24. 两两交换链表中的节点

[https://leetcode-cn.com/problems/swap-nodes-in-pairs/](https://leetcode-cn.com/problems/swap-nodes-in-pairs/)

### 思考

循环遍历链表，如当前的节点的 next 不为空，则交换当前节点和下一节点，否则直接跳过

[https://leetcode-cn.com/submissions/detail/74385676/](https://leetcode-cn.com/submissions/detail/74385676/)

### 反思

跟官方解法一致

## 29. 两数相除

[https://leetcode-cn.com/problems/divide-two-integers/](https://leetcode-cn.com/problems/divide-two-integers/)

### 思考

一开始也没有想到使用减法替代除法，后来发现直接迭代计算还会超时

[https://leetcode-cn.com/submissions/detail/74687167/](https://leetcode-cn.com/submissions/detail/74687167/)

### 反思

采用二分法的思想，dividend 每次减去 2^n 个 divisor（尽可能多），同时 reslut 每次加 2^n

## 31. 下一个排列

[https://leetcode-cn.com/problems/next-permutation/](https://leetcode-cn.com/problems/next-permutation/)

### 思考

考虑使用递归进行找出次小的数，但是这样计算很复杂

[https://leetcode-cn.com/submissions/detail/74688639/](https://leetcode-cn.com/submissions/detail/74688639/)

### 反思

交换数字 a[i−1] 和 a[j]，然后反转 a[i−1] 之后的数字

## 34. 在排序数组中查找元素的第一个和最后一个位置

[https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/](https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/)

### 思考

使用二分法找到目标数字，然后从中间向两边查找，找到边界

[https://leetcode-cn.com/submissions/detail/74685548/](https://leetcode-cn.com/submissions/detail/74685548/)

### 反思

为了找到最左边（或者最右边）包含 target 的下标（而不是找到的话就返回 true ），所以算法在我们找到一个 target 后不能马上停止。我们需要继续搜索，直到 lo == hi 且它们在某个 target 值处下标相同。

## 36. 有效的数独

[https://leetcode-cn.com/problems/valid-sudoku/](https://leetcode-cn.com/problems/valid-sudoku/)

### 思考

通过遍历行列和每个单元格内的情况，通过 Set 判断是否已经存在

[https://leetcode-cn.com/submissions/detail/74929240/](https://leetcode-cn.com/submissions/detail/74929240/)

### 反思

更快的方法是直接循环遍历然后使用`int[]`保存结果，检查看到每个单元格值是否已经在当前的行 / 列 / 子数独中出现过

## 39. 组合总和

[https://leetcode-cn.com/problems/combination-sum/](https://leetcode-cn.com/problems/combination-sum/)

### 思考

考虑的思路是将数组放入 Set 中，通过遍历每个数，不断减去自身并在 Set 中查找是否存在目标

[https://leetcode-cn.com/submissions/detail/74933540/](https://leetcode-cn.com/submissions/detail/74933540/)

### 反思

应该使用“回溯算法 + 剪枝”

## 40. 组合总和 II

[https://leetcode-cn.com/problems/combination-sum-ii/](https://leetcode-cn.com/problems/combination-sum-ii/)

### 思考

跟 39 题解法类似，使用回溯+剪枝

[https://leetcode-cn.com/submissions/detail/74963022/](https://leetcode-cn.com/submissions/detail/74963022/)

### 反思

编码的不同在于下一层递归的起始索引不一样，从候选数组的当前索引值的下一位开始

## 43. 字符串相乘

[https://leetcode-cn.com/problems/multiply-strings/](https://leetcode-cn.com/problems/multiply-strings/)

### 思考

通过遍历的方式，将 num2 每一位与 num1 进行相乘，将每一步的结果进行累加。

[https://leetcode-cn.com/submissions/detail/75156978/](https://leetcode-cn.com/submissions/detail/75156978/)

### 反思

优化上述过程：

1. 乘数 num1 位数为 M，被乘数 num2 位数为 N， `num1 x num2`结果 res 最大总位数为`M+N`
2. `num1[i] x num2[j]`的结果为`tmp`(位数为两位，"0x","xy"的形式)，其第一位位于`res[i+j]`，第二位位于`res[i+j+1]`。

## 47. 全排列 II

[https://leetcode-cn.com/problems/permutations-ii/](https://leetcode-cn.com/problems/permutations-ii/)

### 思考

一开始考虑使用回溯法，但是因为数字中存在相同的数字，没有很好的做出来

[https://leetcode-cn.com/submissions/detail/75172751/](https://leetcode-cn.com/submissions/detail/75172751/)

### 反思

在搜索之前就对候选数组排序，一旦发现这一支搜索下去可能搜索到重复的元素就停止搜索，这样结果集中不会包含重复元素。

## 48. 旋转图像

[https://leetcode-cn.com/problems/rotate-image/](https://leetcode-cn.com/problems/rotate-image/)

### 思考

通过对矩阵进行行列转换再对每一行进行翻转得到结果

[https://leetcode-cn.com/submissions/detail/75168767/](https://leetcode-cn.com/submissions/detail/75168767/)

### 反思

可以通过将给定的矩阵分成四个矩形并且将原问题划归为旋转这些矩形的问题，在一次循环中完成
