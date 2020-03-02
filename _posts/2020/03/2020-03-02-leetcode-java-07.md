---
layout: post
date: 2020-03-02 15:51:08 +08:00
slug: leetcode-java-07
title: "LeetCode 手记 07"
author: Yourtion
keywords: ["leetcode", "java"]
description: "使用`toCharArray()`效率更高；仔细审题，利用好题目中的所有相关信息"
category: "学习"
tags: ["LeetCode", "Java"]
---
{% include JB/setup %}

## 本周收获

- 使用`toCharArray()`效率更高
- 仔细审题，利用好题目中的所有相关信息

## 401. 二进制手表

[https://leetcode-cn.com/problems/binary-watch/](https://leetcode-cn.com/problems/binary-watch/)

### 思考

一开始找不到思路，最后只能是通过计算数字中 1 的个数，然后按照小时和分钟计算，程序写起来相对复杂的样子

[https://leetcode-cn.com/submissions/detail/49177882/](https://leetcode-cn.com/submissions/detail/49177882/)

### 反思

看了其他人的题解，发现不需要那么复杂，只要两层循环，计算小时和分钟，并且计算 1 的数量就够了

## 404. 左叶子之和

[https://leetcode-cn.com/problems/sum-of-left-leaves/](https://leetcode-cn.com/problems/sum-of-left-leaves/)

### 思考

一开始想法比较简单，就是递归计算结果就好，但是提交的时候发现如果只有根的时候报错了。后来只能重构函数，添加是否需要返回结果

[https://leetcode-cn.com/submissions/detail/49201987/](https://leetcode-cn.com/submissions/detail/49201987/)

### 反思

跟其他人的解法基本一致

## 405. 数字转换为十六进制数

[https://leetcode-cn.com/problems/convert-a-number-to-hexadecimal/](https://leetcode-cn.com/problems/convert-a-number-to-hexadecimal/)

### 思考

一开始通过取余的方式能解出正数的结果，但是对于负数部分没有找到方法，只能看看题解的方式

[https://leetcode-cn.com/submissions/detail/49231542/](https://leetcode-cn.com/submissions/detail/49231542/)

### 反思

应该使用`>>>`进行移位，然后通过`&15`计算余数

## 409. 最长回文串

[https://leetcode-cn.com/problems/longest-palindrome/](https://leetcode-cn.com/problems/longest-palindrome/)

### 思考

通过 map 计数后，只要是偶数，即可两两组成回文信息，并在中间可以外加一个字母

[https://leetcode-cn.com/submissions/detail/49343291/](https://leetcode-cn.com/submissions/detail/49343291/)

### 反思

跟官方解法思路基本一致

## 412. Fizz Buzz

[https://leetcode-cn.com/problems/fizz-buzz/](https://leetcode-cn.com/problems/fizz-buzz/)

### 思考

思路比较简单，就是循环计算然后添加到结果数组

[https://leetcode-cn.com/submissions/detail/49347584/](https://leetcode-cn.com/submissions/detail/49347584/)

### 反思

基础解法与官方一致，官方解法还提到可以使用“字符串连接”和“散列表”优化有更多规则的情况

## 414. 第三大的数

[https://leetcode-cn.com/problems/third-maximum-number/](https://leetcode-cn.com/problems/third-maximum-number/)

### 思考

一开始想到使用堆，但想想觉得不需要那么复杂，直接使用三个变量就好了，但是因为题目判定中有“-2147483648”这个边界值，后来没办法直接对数组进行排序了

[https://leetcode-cn.com/submissions/detail/49357337/](https://leetcode-cn.com/submissions/detail/49357337/)

### 反思

看到有人使用`TreeSet`可以很方便地判断

## 415. 字符串相加

[https://leetcode-cn.com/problems/add-strings/](https://leetcode-cn.com/problems/add-strings/)

### 思考

解法相对比较简单，就是从后面循环整个字符串，按照加法不断相加，同时注意处理进位问题。

[https://leetcode-cn.com/submissions/detail/49543236/](https://leetcode-cn.com/submissions/detail/49543236/)

### 反思

看了其他人的解法都是类似，但程序看起来简洁很多，例如使用`% 10`直接处理大于 10 的结果，通过三元表达式处理长度问题等

## 434. 字符串中的单词数

[https://leetcode-cn.com/problems/number-of-segments-in-a-string/](https://leetcode-cn.com/problems/number-of-segments-in-a-string/)

### 思考

提交了很多次错误答案，因为思考的方向错了，其实应该是通过空格去判断单词数量

[https://leetcode-cn.com/submissions/detail/49547870/](https://leetcode-cn.com/submissions/detail/49547870/)

### 反思

对于英文的理解跟中文还是很大差距，题解中比较简单的是使用`.split("\\s+")`进行解题，同时记得处理前后空格等情况

## 437. 路径总和 III

[https://leetcode-cn.com/problems/path-sum-iii/](https://leetcode-cn.com/problems/path-sum-iii/)

### 思考

这个解题思路比较简单，通过递归处理，之前使用 List，后来改成 int 数组

[https://leetcode-cn.com/submissions/detail/49574116/](https://leetcode-cn.com/submissions/detail/49574116/)

### 反思

跟其他人的解法基本类似

## 441. 排列硬币

[https://leetcode-cn.com/problems/arranging-coins/](https://leetcode-cn.com/problems/arranging-coins/)

### 思考

解法很简单，就是迭代除以当前的`i`值，直到`n`为 0，或者比`i`小，返回结果

[https://leetcode-cn.com/submissions/detail/49780183/](https://leetcode-cn.com/submissions/detail/49780183/)

### 反思

看到使用公式`k(k+1) /2 = n`可以直接返回结果`(int)(Math.sqrt(2) * Math.sqrt(n + 0.125) - 0.5)`

## 443. 压缩字符串

[https://leetcode-cn.com/problems/string-compression/](https://leetcode-cn.com/problems/string-compression/)

### 思考

一开始没有看好题目，只是返回结果，没有在原位进行压缩，后面修改了一个版本，但是关于多位数的情况一致没有处理好

[https://leetcode-cn.com/submissions/detail/49793427/](https://leetcode-cn.com/submissions/detail/49793427/)

### 反思

看了官方题解，使用双指针，同时使用`(char c: ("" + (read - anchor + 1)).toCharArray())`处理多位计数问题

## 447. 回旋镖的数量

[https://leetcode-cn.com/problems/number-of-boomerangs/](https://leetcode-cn.com/problems/number-of-boomerangs/)

### 思考

一开始打算使用暴力穷举法，但是发现整体数量太多，计算量太大，看了题解后发现应该是用 Hash 表查表的方法

[https://leetcode-cn.com/submissions/detail/49782559/](https://leetcode-cn.com/submissions/detail/49782559/)

### 反思

使用 Hash 查表法，找出距离相等的点集合即可

## 448. 找到所有数组中消失的数字

[https://leetcode-cn.com/problems/find-all-numbers-disappeared-in-an-array/](https://leetcode-cn.com/problems/find-all-numbers-disappeared-in-an-array/)

### 思考

想了很久没有找到不需要额外空间的方法，知道需要在原数组中进行操作，但是没有想到好的解决方法

[https://leetcode-cn.com/submissions/detail/49953561/](https://leetcode-cn.com/submissions/detail/49953561/)

### 反思

看了官方题解后发现，题目说明数组中元素都为正数，那么可以通过将元素置为负数的方法来标记。从而实现原地操作

## 453. 最小移动次数使数组元素相等

[https://leetcode-cn.com/problems/minimum-moves-to-equal-array-elements/](https://leetcode-cn.com/problems/minimum-moves-to-equal-array-elements/)

### 思考

看了题目后，没能很好地 get 到题目的点，后来看了题解发现相关的逻辑，通过排序后计算解答了题目

[https://leetcode-cn.com/submissions/detail/49979574/](https://leetcode-cn.com/submissions/detail/49979574/)

### 反思

题解提到了动态规划和数学法解答（只需要将所有的数都减到最小的数即可），通过计算元素总和 moves，并减去最小值即可`moves - min * nums.length`

## 455. 分发饼干

[https://leetcode-cn.com/problems/assign-cookies/](https://leetcode-cn.com/problems/assign-cookies/)

### 思考

使用了一个非常复杂的解法，思路就是给剩余的孩子分配尽可能大的饼干，先分配了正好相等的部分，然后按照胃口从大到小，饼干也从大到小分配，直到最后

[https://leetcode-cn.com/submissions/detail/49976632/](https://leetcode-cn.com/submissions/detail/49976632/)

### 反思

正确的应该是使用贪心算法，通过对两个数组进行排序，然后每次分配只关注未分配饼干的最小胃口的小朋友即可

## 459. 重复的子字符串

[https://leetcode-cn.com/problems/repeated-substring-pattern/](https://leetcode-cn.com/problems/repeated-substring-pattern/)

### 思考

解题方法相对比较简单，循环遍历整个字符串，然后加长比对字符串的长度，然后跟字符循环比对，优化点有两个，一个是只需要`c<s.length() + 1`，另外一个是子字符串必须能被字符长度整除

[https://leetcode-cn.com/submissions/detail/50260614/](https://leetcode-cn.com/submissions/detail/50260614/)

### 反思

看到题解里面有个很高端的暴力解法，通过多次“移位和换行”来解决问题

## 461. 汉明距离

[https://leetcode-cn.com/problems/hamming-distance/](https://leetcode-cn.com/problems/hamming-distance/)

### 思考

一开始看到位比较就想到使用异或运算，但是结果没有对，后来发现需要对异或结果进行位 1 的计数

[https://leetcode-cn.com/submissions/detail/50248944/](https://leetcode-cn.com/submissions/detail/50248944/)

### 反思

使用`Integer.bitCount`对数字的 1 位数进行统计

## 463. 岛屿的周长

[https://leetcode-cn.com/problems/island-perimeter/](https://leetcode-cn.com/problems/island-perimeter/)

### 思考

通过看图找到规律，按照图形情况，如果 1 周围上下左右是 0 则边数加 1:

1. 上边界：如果是第 0 行则加 1，否则判断`i-1`为 0 则边数+1
2. 下边界：如果是最后一行则加 1，否则判断`i+1`为 0 则边数+1
3. 左边界：如果是第 0 列则加 1，否则判断`j-1`为 0 则边数+1
4. 右边界：如果是最后一列则加 1，否则判断`j+1`为 0 则边数+1

[https://leetcode-cn.com/submissions/detail/50263413/](https://leetcode-cn.com/submissions/detail/50263413/)

### 反思

看到题解才发现，由于岛屿内没有湖,所以只需要求出 北面(或南面) + 西面(或东面)的长度再乘 2 即可

## 475. 供暖器

[https://leetcode-cn.com/problems/heaters/](https://leetcode-cn.com/problems/heaters/)

### 思考

一开始的思路是查找供暖器跟房屋的距离，然后找出距离最最小中最大的供暖器即为结果，但是没有写出来，参考了一下题解

[https://leetcode-cn.com/submissions/detail/50477855/](https://leetcode-cn.com/submissions/detail/50477855/)

### 反思

使用二分法找到每个房屋离加热器的最短距离（即找出离房屋最近的加热器），然后在所有距离中选出最大的一个即为结果。

## 476. 数字的补数

[https://leetcode-cn.com/problems/number-complement/](https://leetcode-cn.com/problems/number-complement/)

### 思考

想到需要使用位操作一位位比较后加上，但是对位操作实在是不熟悉

[https://leetcode-cn.com/submissions/detail/50475527/](https://leetcode-cn.com/submissions/detail/50475527/)

### 反思

拿到一个位数和 num 一样切所有位都为 1 的数就好了

## 482. 密钥格式化

[https://leetcode-cn.com/problems/license-key-formatting/](https://leetcode-cn.com/problems/license-key-formatting/)

### 思考

一开始对题目理解有问题，后来重新写了一下，从后往前取字母，然后在遇到 K 的时候插入`-`，注意处理最后的一个`-`

[https://leetcode-cn.com/submissions/detail/50362485/](https://leetcode-cn.com/submissions/detail/50362485/)

### 反思

感觉跟其他人的解法类似，但是我写得还是有点复杂的
