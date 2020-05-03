---
layout: post
date: 2020-04-12 17:10:31 +0800
slug: leetcode-java-13
title: "LeetCode 手记 13"
author: Yourtion
keywords: ["leetcode", "java"]
description: "通过一个比较流替换多个标志位，多使用内置函数；了解`Arrays.sort`相关方法的自定义实现；需要注意题目描述中的细节；使用`String.format`进行字符串格式化；使用`continue xxx`跳转回去程序特定标签处"；
category: "学习"
tags: ["LeetCode", "Java"]
---
{% include JB/setup %}

## 本周收获

- 通过一个比较流替换多个标志位，多使用内置函数
- 了解`Arrays.sort`相关方法的自定义实现
- 需要注意题目描述中的细节
- 使用`String.format`进行字符串格式化
- 使用`continue xxx`跳转回去程序特定标签处

## 893. 特殊等价字符串组

[https://leetcode-cn.com/problems/groups-of-special-equivalent-strings/](https://leetcode-cn.com/problems/groups-of-special-equivalent-strings/)

### 思考

一开始的想法比较简单，因为计算可以移动后等价其实就是对字符进行计数，然后计数序列一致即为可以转换

[https://leetcode-cn.com/submissions/detail/60270246/](https://leetcode-cn.com/submissions/detail/60270246/)

### 反思

没有深入理解题目中的点，其实并不能重排所有字母，只能排列偶数索引字母和奇数索引字母，所有需要进行转换，独立统计奇偶列

## 896. 单调数列

[https://leetcode-cn.com/problems/monotonic-array/](https://leetcode-cn.com/problems/monotonic-array/)

### 思考

通过在一次遍历中，如果结果递增或者递减则转换标志位，最后返回是否还有标志位为 true，如果递增递减的标志都为 false 则直接返回。

[https://leetcode-cn.com/submissions/detail/60280057/](https://leetcode-cn.com/submissions/detail/60280057/)

### 反思

官方解法通过`Integer.compare`函数，然后检查结果组成的比较流，如果发生翻转则返回

## 897. 递增顺序查找树

[https://leetcode-cn.com/problems/increasing-order-search-tree/](https://leetcode-cn.com/problems/increasing-order-search-tree/)

### 思考

通过构建一个虚拟根节点，然后执行中序遍历，不断往右节点添加值，最后返回虚拟根的右节点即可

[https://leetcode-cn.com/submissions/detail/60276733/](https://leetcode-cn.com/submissions/detail/60276733/)

### 反思

官方解法的“中序遍历 + 更改树的连接方式”跟我的解法类似，但是官方解法通过更改树的连接，不需要额外创建节点

## 905. 按奇偶排序数组

[https://leetcode-cn.com/problems/sort-array-by-parity/](https://leetcode-cn.com/problems/sort-array-by-parity/)

### 思考

通过双指针的方法，如果满足条件则向中间移动，否则交换位置。

[https://leetcode-cn.com/submissions/detail/60632074/](https://leetcode-cn.com/submissions/detail/60632074/)

### 反思

跟官方解法的“方法 3：原地算法”一致

## 908. 最小差值 I

[https://leetcode-cn.com/problems/smallest-range-i/](https://leetcode-cn.com/problems/smallest-range-i/)

### 思考

通过遍历数组，找出最大值和最小值，然后返回差值减去 2k 或者 0（因为不包括负数）

[https://leetcode-cn.com/submissions/detail/60632175/](https://leetcode-cn.com/submissions/detail/60632175/)

### 反思

跟官方解法一致

## 917. 仅仅反转字母

[https://leetcode-cn.com/problems/reverse-only-letters/](https://leetcode-cn.com/problems/reverse-only-letters/)

### 思考

通过前后两个指针，如果是遇到非字母则向中间移动，否则交换两个字母，直到两个指针相遇

[https://leetcode-cn.com/submissions/detail/60632269/](https://leetcode-cn.com/submissions/detail/60632269/)

### 反思

跟官方解法基本一致

## 922. 按奇偶排序数组 II

[https://leetcode-cn.com/problems/sort-array-by-parity-ii/](https://leetcode-cn.com/problems/sort-array-by-parity-ii/)

### 思考

通过双指针的形式，将数组里面的元素安放到奇偶位置上，并将指针不断后移（条件满足即后移，否则交换元素）

[https://leetcode-cn.com/submissions/detail/60923507/](https://leetcode-cn.com/submissions/detail/60923507/)

### 反思

官方的算法更加简单，不需要考虑奇数位置，只需要保证偶数位即可（剩下的一定是奇数）

## 925. 长按键入

[https://leetcode-cn.com/problems/long-pressed-name/](https://leetcode-cn.com/problems/long-pressed-name/)

### 思考

通过两个指针，然后进行比对如果相同则前进，否则与 name 的前一个元素比对（判断长按键入），如果都能跑到结尾即为相同（需要注意处理数组越界的问题）

[https://leetcode-cn.com/submissions/detail/60925090/](https://leetcode-cn.com/submissions/detail/60925090/)

### 反思

跟官方的双指针解法一致

## 929. 独特的电子邮件地址

[https://leetcode-cn.com/problems/unique-email-addresses/](https://leetcode-cn.com/problems/unique-email-addresses/)

### 思考

按照规则处理每个邮件地址并放入 Set 中，最后返回 Set 中元素的数量即可

[https://leetcode-cn.com/submissions/detail/60925184/](https://leetcode-cn.com/submissions/detail/60925184/)

### 反思

跟官方解法的“规范化表示”逻辑一致

## 933. 最近的请求次数

[https://leetcode-cn.com/problems/number-of-recent-calls/](https://leetcode-cn.com/problems/number-of-recent-calls/)

### 思考

通过一个双端队列进行计数，在 ping 的时候把超出时间的请求剔除，然后返回队列长度

[https://leetcode-cn.com/submissions/detail/61213829/](https://leetcode-cn.com/submissions/detail/61213829/)

### 反思

跟官方解法基本一致，不需要使用双端队列，同时官方解法使用`while (q.peek() < t - 3000)`更加优雅

## 937. 重新排列日志文件

[https://leetcode-cn.com/problems/reorder-data-in-log-files/](https://leetcode-cn.com/problems/reorder-data-in-log-files/)

### 思考

根据日志记录先分成数字类型和字母类型，数字类型直接放入一个 List，字母类似将头部移动到尾部后写入 TreeMap，依赖其自动排序结果，重新输出日志

[https://leetcode-cn.com/submissions/detail/61214332/](https://leetcode-cn.com/submissions/detail/61214332/)

### 反思

官方解法使用自定义`Arrays.sort`的排序方法解答

## 938. 二叉搜索树的范围和

[https://leetcode-cn.com/problems/range-sum-of-bst/](https://leetcode-cn.com/problems/range-sum-of-bst/)

### 思考

直接使用递归深度优先搜索并判断结果累加

[https://leetcode-cn.com/submissions/detail/61214728/](https://leetcode-cn.com/submissions/detail/61214728/)

### 反思

没有考虑好在搜索时候处理搜索树的性质：对于当前节点`node`，如果`node.val`小于等于 L，那么只需要继续搜索它的右子树；如果`node.val`大于等于 R，那么只需要继续搜索它的左子树；如果`node.val`在区间`(L, R)`中，则需要搜索它的所有子树。

## 941. 有效的山脉数组

[https://leetcode-cn.com/problems/valid-mountain-array/](https://leetcode-cn.com/problems/valid-mountain-array/)

### 思考

遍历数组，先要求数组递增，遇到转折后要求递减，否则返回 false，最后返回是否经历了递增后递减两个阶段

[https://leetcode-cn.com/submissions/detail/61424490/](https://leetcode-cn.com/submissions/detail/61424490/)

### 反思

官方题解通过多个循环计数的方式完成“线性扫描”，整体代码更加简洁

## 942. 增减字符串匹配

[https://leetcode-cn.com/problems/di-string-match/](https://leetcode-cn.com/problems/di-string-match/)

### 思考

一开始就考虑通过判断 I 与 D 来修改生成数组中数字位置的位置，最后返回结果

[https://leetcode-cn.com/submissions/detail/61429486/](https://leetcode-cn.com/submissions/detail/61429486/)

### 反思

官方解法每次会把可以使用的数的集合中的最小值或最大值取出，并放到当前的位置，如果是`I`从低处取，否则从高处取

## 944. 删列造序

[https://leetcode-cn.com/problems/delete-columns-to-make-sorted/](https://leetcode-cn.com/problems/delete-columns-to-make-sorted/)

### 思考

循环每个列，如果列中非有序，则结果加一

[https://leetcode-cn.com/submissions/detail/61424746/](https://leetcode-cn.com/submissions/detail/61424746/)

### 反思

跟官方解法逻辑一致

## 949. 给定数字能组成的最大时间

[https://leetcode-cn.com/problems/largest-time-for-given-digits/](https://leetcode-cn.com/problems/largest-time-for-given-digits/)

### 思考

通过穷举所有组合，然后判断是否符合时间格式，最后返回其中最大的结果

[https://leetcode-cn.com/submissions/detail/61817363/](https://leetcode-cn.com/submissions/detail/61817363/)

### 反思

跟官方解法思路基本一致，但是最后使用“String.format”格式化结果

## 953. 验证外星语词典

[https://leetcode-cn.com/problems/verifying-an-alien-dictionary/](https://leetcode-cn.com/problems/verifying-an-alien-dictionary/)

### 思考

遍历所有单词，在每个位置上通过`lastIndexOf`查找对于字符在字典排序中的位置，如果不符合则返回，注意处理单词长度不同的情况

[https://leetcode-cn.com/submissions/detail/61818903/](https://leetcode-cn.com/submissions/detail/61818903/)

### 反思

跟官方解法类似，官方解法通过`continue xxx`的方式，跳转回去特定的位置

## 961. 重复 N 次的元素

[https://leetcode-cn.com/problems/n-repeated-element-in-size-2n-array/](https://leetcode-cn.com/problems/n-repeated-element-in-size-2n-array/)

### 思考

通过排序的方法，找出位于中间的数字即可

[https://leetcode-cn.com/submissions/detail/61819031/](https://leetcode-cn.com/submissions/detail/61819031/)

### 反思

官方解法中通过比较法：一旦找到一个重复元素，那么一定就是答案

## 965. 单值二叉树

[https://leetcode-cn.com/problems/univalued-binary-tree/](https://leetcode-cn.com/problems/univalued-binary-tree/)

### 思考

使用迭代的方式，先获取 root 的值，然后通过一个队列不断遍历整棵树并将值与根的值对吧，不一致则返回 false，否则就是单值

[https://leetcode-cn.com/submissions/detail/62104391/](https://leetcode-cn.com/submissions/detail/62104391/)

### 反思

官方解法使用递归的方式看起来更加简洁

## 970. 强整数

[https://leetcode-cn.com/problems/powerful-integers/](https://leetcode-cn.com/problems/powerful-integers/)

### 思考

通过暴力穷举的方式，遍历从 x 到 y 的所有结果，满足条件即加入 Set 中，最后返回 Set 元素组成的 List

[https://leetcode-cn.com/submissions/detail/62105078/](https://leetcode-cn.com/submissions/detail/62105078/)

### 反思

跟官方解法思路基本一致

## 976. 三角形的最大周长

[https://leetcode-cn.com/problems/largest-perimeter-triangle/](https://leetcode-cn.com/problems/largest-perimeter-triangle/)

### 思考

通过对输入结果进行排序，从尾部开始取最大的三个元素，看看是否能组成三角形，否则向前移动，继续取三个元素，直到找到匹配

[https://leetcode-cn.com/submissions/detail/62105190/](https://leetcode-cn.com/submissions/detail/62105190/)

### 反思

跟官方解法一致
