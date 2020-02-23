---
layout: post
date: 2020-02-23 15:48:28 +08:00
slug: leetcode-java-06
title: "LeetCode 手记 06"
author: Yourtion
keywords: ["leetcode", "java"]
description: ""
category: "学习"
tags: ["LeetCode", "Java"]
---
{% include JB/setup %}

## 本周收获

- 更多地审题并认真确认题目中隐含的条件
- 更多实践二分法解题，准确把握判断条件和赋值
- 对于数组问题，多考虑双指针解法
- 要仔细看清楚题目的要求和限制
- 注意一道题目的多种解题方法
- 可以通过出现调用函数并颠倒参数顺序实现对特定参数的依赖（如长短）
- 可以使用`new int[26]`替代Map

### 二进制求和

计算二进制值相加： 5---101，7---111

- 第一步：相加各位的值，不算进位，得到010，二进制每位相加就相当于各位做异或操作，101^111。
- 第二步：计算进位值，得到1010，相当于各位进行与操作得到101，再向左移一位得到1010，(101&111)<<1。
- 第三步重复上述两步，各位相加 010^1010=1000，进位值为100=(010 & 1010)<<1。
- 继续重复上述两步：1000^100 = 1100，进位值为0，跳出循环，1100为最终结果。
- 结束条件：进位为0，即a为最终的求和结果。

## 263. 丑数

[https://leetcode-cn.com/problems/ugly-number/](https://leetcode-cn.com/problems/ugly-number/)

### 思考

根据题目描述，在输入能被5整除的情况下不断除5，3和2同理，最后如果为1则证明能被2、3、5整除

[https://leetcode-cn.com/submissions/detail/47721163/](https://leetcode-cn.com/submissions/detail/47721163/)

### 反思

解题方法于大家的题解基本一致


## 268. 缺失数字

[https://leetcode-cn.com/problems/missing-number/](https://leetcode-cn.com/problems/missing-number/)

### 思考

思路上比较简单，就是循环一遍，找到最大值，同时用异或计算，最后再用所以应该有的整数异或一次，求出结果。

第一次解题还忘了最大数就是缺失的情况。

[https://leetcode-cn.com/submissions/detail/47722646/](https://leetcode-cn.com/submissions/detail/47722646/)

### 反思

看了官方题解，位运算的方法根本没有必要那么麻烦，只需要一开始将最大值假定为missing，然后循环执行`missing ^= i ^ nums[i];`即可，没有那么复杂的逻辑。同时我那个计算max也是多此一举的。

还有更为巧妙的是数学公式法，先算出应该有的和后减去现在数组元素，即可得到结果


## 278. 第一个错误的版本

[https://leetcode-cn.com/problems/first-bad-version/](https://leetcode-cn.com/problems/first-bad-version/)

### 思考

一开始就想到使用二分查找，重新梳理了一下思路和逻辑，总算写出了应该正确的版本。

[https://leetcode-cn.com/submissions/detail/47724236/](https://leetcode-cn.com/submissions/detail/47724236/)

### 反思

看了官方题解的二分法解答，感觉自己写的二分查找依然不够完整，正确的应该是`right = mid`和`left = mid + 1`，不需要再去判断什么最后结果


## 283. 移动零

[https://leetcode-cn.com/problems/move-zeroes/](https://leetcode-cn.com/problems/move-zeroes/)

### 思考

考虑到要把0移动到最后，所以决定从后向前移动，遇到0就不断交换位置移动到最后面，解题时间好像有些长，没想到更加少移动方式到套路。

[https://leetcode-cn.com/submissions/detail/47903543/](https://leetcode-cn.com/submissions/detail/47903543/)

### 反思

官方题解非常巧妙，使用双指针法，当遇到一个非零元素时，交换当前指针和慢速指针指向的元素，然后前进两个指针。如果它是零元素，我们只前进当前指针。


## 290. 单词规律

[https://leetcode-cn.com/problems/word-pattern/](https://leetcode-cn.com/problems/word-pattern/)

### 思考

通过HashMap记录字母对应的单词，如果单词不对应或者一个单词对应多个字母都返回false

[https://leetcode-cn.com/submissions/detail/47905865/](https://leetcode-cn.com/submissions/detail/47905865/)

### 反思

跟题解中大家的解法类似


## 292. Nim 游戏

[https://leetcode-cn.com/problems/nim-game/](https://leetcode-cn.com/problems/nim-game/)

### 思考

梳理了一下题目的情况，只要数量n不能被4整除，就可以保证赢

[https://leetcode-cn.com/submissions/detail/47906413/](https://leetcode-cn.com/submissions/detail/47906413/)

### 反思

跟官方题解一致


## 299. 猜数字游戏

[https://leetcode-cn.com/problems/bulls-and-cows/](https://leetcode-cn.com/problems/bulls-and-cows/)

### 思考

1. 首先假设猜中Bulls为0，全部猜中Cows，
2. 遍历两个字符串，如果位置和数字都一致，Bulls++、Cows--，同时记录字母情况在table上
3. 遍历table，只要table上有正数，就是没有猜中Cows
4. 输出结果

注：因为如果猜中位置和数字，在table上值会抵消，如果没有猜中Cows，对应的位即为负值

[https://leetcode-cn.com/submissions/detail/48171063/](https://leetcode-cn.com/submissions/detail/48171063/)

### 反思

跟题解中的解法基本思路一致


## 303. 区域和检索 - 数组不可变

[https://leetcode-cn.com/problems/range-sum-query-immutable/](https://leetcode-cn.com/problems/range-sum-query-immutable/)

### 思考

感觉题目很简单，就是记录数组，然后输出结果，但是提交后跑出来的结果很差

[https://leetcode-cn.com/submissions/detail/48176901/](https://leetcode-cn.com/submissions/detail/48176901/)

### 反思

看了题解才明白，题目的重点的怎么优化会“多次调用 sumRange 方法”这个点，正确的方式映射在初始化时候计算好sum数组，在调用时候直接返回结果（重点在缓存与如何优化缓存上）


## 326. 3的幂

[https://leetcode-cn.com/problems/power-of-three/](https://leetcode-cn.com/problems/power-of-three/)

### 思考

还是使用暴力解法解答的，只是参考了之前“2的幂”中题解的代码，对比了二进制位，没有想到解题思路，只能暴力解答。

[https://leetcode-cn.com/submissions/detail/48171936/](https://leetcode-cn.com/submissions/detail/48171936/)

### 反思

官方题解里面提到了三种解法：

1. 基准转换，只要把数字转换为以三为底的数，并判断是否1开头，后面为0即可：`Integer.toString(n, 3).matches("^10*$")`
2. 使用数学公式（类似于）：`(Math.log10(n) / Math.log10(3)) % 1 == 0`
3. 利用整数限制，整数范围内最大为3的19次幂，算出来是“1162261467”，最后只要返回`n > 0 && 1162261467 % n == 0`


## 342. 4的幂

[https://leetcode-cn.com/problems/power-of-four/](https://leetcode-cn.com/problems/power-of-four/)

### 思考

通过“3的幂”，决定使用最简单暴力的方法，先穷举出32位整数内所有结果，直接返回

[https://leetcode-cn.com/submissions/detail/48342287/](https://leetcode-cn.com/submissions/detail/48342287/)

### 反思

官方题解又要新方案：

1. 不用硬编码，先在init的时候预计算结果，比起硬编码更加优雅
2. 通过数学运算：`(num > 0) && (Math.log(num) / Math.log(2) % 2 == 0)`
3. 位运算：`(num > 0) && ((num & (num - 1)) == 0) && ((num & 0xaaaaaaaa) == 0)`
4. 位运算+数学运算：`(num > 0) && ((num & (num - 1)) == 0) && (num % 3 == 1)`


## 344. 反转字符串

[https://leetcode-cn.com/problems/reverse-string/](https://leetcode-cn.com/problems/reverse-string/)

### 思考

使用双指针，从头到尾和从尾到头，如果char不一样则交换。

[https://leetcode-cn.com/submissions/detail/48344838/](https://leetcode-cn.com/submissions/detail/48344838/)

### 反思

跟官方解法基本一致，官方使用`left++`和`right--`，更为优雅


## 345. 反转字符串中的元音字母

[https://leetcode-cn.com/problems/reverse-vowels-of-a-string/](https://leetcode-cn.com/problems/reverse-vowels-of-a-string/)

### 思考

一开始没有很好理解到题目，后面跑测试失败，重新审题发现问题，参考“反转字符串”使用双指针解题

[https://leetcode-cn.com/submissions/detail/48367912/](https://leetcode-cn.com/submissions/detail/48367912/)

### 反思

其他人的解法中，在循环内直接使用`while (left < right && !isVowel(arr[left]))`可以减少外层循环的次数


## 349. 两个数组的交集

[https://leetcode-cn.com/problems/intersection-of-two-arrays/](https://leetcode-cn.com/problems/intersection-of-two-arrays/)

### 思考

通过两个集合，记录出现过的数字，如果已经出现，就添加到结果Set中

[https://leetcode-cn.com/submissions/detail/48479316/](https://leetcode-cn.com/submissions/detail/48479316/)

### 反思

官方解法一跟我的解法基本一致，而且还有一个使用内部函数`set1.retainAll(set2)`的方法，确实简洁很多


## 350. 两个数组的交集 II

[https://leetcode-cn.com/problems/intersection-of-two-arrays-ii/](https://leetcode-cn.com/problems/intersection-of-two-arrays-ii/)

### 思考

使用一个HashMap记录数字的出现次数，然后遍历另外一个数组，找到就次数减1并记录到数组，最后输出

[https://leetcode-cn.com/submissions/detail/48481283/](https://leetcode-cn.com/submissions/detail/48481283/)

### 反思

官方第一个解法跟我的基本一致，还添加了处理长短数组的方法。还讲到可以通过排序法处理，也是一个很不错的方法，不需要额外空间，原地排序和比对


## 367. 有效的完全平方数

[https://leetcode-cn.com/problems/valid-perfect-square/](https://leetcode-cn.com/problems/valid-perfect-square/)

### 思考

本来是使用暴力解法，但是时间超出了限制，没想到别的方法，只能去找了牛顿法相关的参数，完成了题目

[https://leetcode-cn.com/submissions/detail/48545129/](https://leetcode-cn.com/submissions/detail/48545129/)

### 反思

官方题解中提到二分法和牛顿法，主要都是减少查找次数，牛顿法迭代计算`x = (x + num / x) / 2`


## 371. 两整数之和

[https://leetcode-cn.com/problems/sum-of-two-integers/](https://leetcode-cn.com/problems/sum-of-two-integers/)

### 思考

大概知道需要用位运算解题，但不是很熟悉，直接用函数糊弄过去。

[https://leetcode-cn.com/submissions/detail/48676433/](https://leetcode-cn.com/submissions/detail/48676433/)

### 反思

通过二进制的异或和与运算完成求和


## 374. 猜数字大小

[https://leetcode-cn.com/problems/guess-number-higher-or-lower/](https://leetcode-cn.com/problems/guess-number-higher-or-lower/)

### 思考

还是简单的使用二分法，但是感觉结果不怎样

[https://leetcode-cn.com/submissions/detail/48777799/](https://leetcode-cn.com/submissions/detail/48777799/)

### 反思

跟官方题解的二分法差不多，官方题解还有三分法，但最坏情况下比二分法差


## 383. 赎金信

[https://leetcode-cn.com/problems/ransom-note/](https://leetcode-cn.com/problems/ransom-note/)

### 思考

想法比较简单，就是把 magazine 放到Map中并计数，最后比对需要得到的结果，从map中不断取值

[https://leetcode-cn.com/submissions/detail/48779165/](https://leetcode-cn.com/submissions/detail/48779165/)

### 反思

看了一下解法中的比较快的方法，通过`new int[26]`保存字母位置，然后通过`magazine.indexOf`不断向后取值，性能更好，而且空间需求也少


## 387. 字符串中的第一个唯一字符

[https://leetcode-cn.com/problems/first-unique-character-in-a-string/](https://leetcode-cn.com/problems/first-unique-character-in-a-string/)

### 思考

思路相对比较简单，只要这个字符没有出现过，同时后面不再出现，即可判断这个是唯一的

[https://leetcode-cn.com/submissions/detail/48906493/](https://leetcode-cn.com/submissions/detail/48906493/)

### 反思

跟官方的题解思路类似


## 389. 找不同

[https://leetcode-cn.com/problems/find-the-difference/](https://leetcode-cn.com/problems/find-the-difference/)

### 思考

通过对一个计数表进行操作，一个++一个--，最后得到-1的那个位置的字符便是结果

[https://leetcode-cn.com/submissions/detail/48902867/](https://leetcode-cn.com/submissions/detail/48902867/)

### 反思

看到一个解法非常巧妙，直接对一个整数进行操作即可`res += tt[i] - ss[i]`，不需要使用计数表


## 392. 判断子序列

[https://leetcode-cn.com/problems/is-subsequence/](https://leetcode-cn.com/problems/is-subsequence/)

### 思考

这个解法主要是对后续挑战中大规模比对进行的，首先在初始化时讲T系列通过`getSourceMap`转换为一个表（字母：字母在T中位置列表）。

执行判断时，根据当前字母和当前位置`index`，在map中查找大于index的该字母的位置，能找到就继续，否则返回`false`。

其中`getIndex`还有两个优化点：

1. 使用二分查找法进一步提升查找性能
2. 通过一个位置记录表，记录某个字母现在已经查找过的位置，加速二分查找过程

[https://leetcode-cn.com/submissions/detail/48908020/](https://leetcode-cn.com/submissions/detail/48908020/)

### 反思

比较快的解法就说通过`t.indexOf`进行查找，跟我之前的思路类似
