---
layout: post
date: 2020-02-09 13:12:28 +08:00
slug: leetcode-java-04
title: "LeetCode 手记 04"
author: Yourtion
keywords: ["leetcode", "java"]
description: "多从整体的角度上思考，看看如何巧妙解答；通过画图帮忙扩展思路，找出一些突破点；深入了解 char 相关内容；深入了解熟悉位操作；需要更多地去分析理解题目中的内容；【SQL】需要了解临时表的使用；【SQL】熟悉 HAVING 的用法；深入了解和熟悉二进制数字和位运算"
category: "学习"
tags: ["LeetCode", "Java"]
---

{% include JB/setup %}

# LeetCode 手记 04

## 本周收获与反思

- 多从整体的角度上思考，看看如何巧妙解答
- 通过画图帮忙扩展思路，找出一些突破点
- 深入了解 char 相关内容
- 深入了解熟悉位操作
- 需要更多地去分析理解题目中的内容
- 【SQL】需要了解临时表的使用
- 【SQL】熟悉 HAVING 的用法
- 深入了解和熟悉二进制数字和位运算

### Boyer-Moore 算法

Boyer-Moore 就是找`nums`的一个后缀`suf`，其中`suf[0]`就是后缀中的众数。

我们维护一个计数器，如果遇到一个我们目前的候选众数，就将计数器加一，否则减一。只要计数器等于 0 ，我们就将 nums 中之前访问的数字全部 忘记 ，并把下一个数字当做候选的众数。

我们可以放心地遗忘前面的数字，并继续求解剩下数字中的众数。最后，总有一个后缀满足计数器是大于 0 的，此时这个后缀的众数就是整个数组的众数。


## 112. 路径总和

[https://leetcode-cn.com/problems/path-sum/](https://leetcode-cn.com/problems/path-sum/)

### 思路

解题的思路还是比较简单的

1. 判断当前节点为 null 就返回 false
2. 如果 sum 已经是 0 并且是已经是叶子节点，则说明已经找到解，返回 true
3. 其他情况则递归处理左右子树，同时将 sum 减去当前节点值

[https://leetcode-cn.com/submissions/detail/45468638/](https://leetcode-cn.com/submissions/detail/45468638/)

### 反思

解法跟官方题解的递归解法一致，官方提供的迭代解法还是不太能理解，感觉整体上也没有递归那么简洁与易理解，同时也没有性能上的优势。

## 118. 杨辉三角

[https://leetcode-cn.com/problems/pascals-triangle/](https://leetcode-cn.com/problems/pascals-triangle/)

### 思路

通过简单的循环计算每行的元素，推入结果数组即可，其中：

1. 每行的第一个和最后一个元素是 1
2. 其他元素等于上一行的当前 index-1 的值加上上一行的当前 index 的值

[https://leetcode-cn.com/submissions/detail/45478330/](https://leetcode-cn.com/submissions/detail/45478330/)

### 反思

跟官方题解的方法基本一致，但是感觉官方解法中的代码太过于啰嗦的感觉，不如我写的版本那么简单。

## 119. 杨辉三角 II

[https://leetcode-cn.com/problems/pascals-triangle-ii/](https://leetcode-cn.com/problems/pascals-triangle-ii/)

### 思路

没有想到具体的数学解法，还是跟上面的方法类似，只是不需要保存整个数据，只需要保留上一层的数据用于计算。

[https://leetcode-cn.com/submissions/detail/45481754/](https://leetcode-cn.com/submissions/detail/45481754/)

### 反思

公式法是把它看成一个组合数：`n!/(k!(n−k)!)=(n∗(n−1)∗(n−2)∗...(n−k+1))/k!`


## 121. 买卖股票的最佳时机

[https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/)

### 思路

一直陷在两次循环的套路里面，只是简单地想到去掉一些不必要的循环，还是暴力解题的思路

[https://leetcode-cn.com/submissions/detail/45615367/](https://leetcode-cn.com/submissions/detail/45615367/)

### 反思

其实有个最简单的方法，就是循环一遍，找出最小值后找出其后的最大值，也就是找到最小的谷之后的最大的峰。

## 122. 买卖股票的最佳时机 II

[https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/)

### 思路

解题的思路比较简单，通过`i`，`j`两个指针进行循环：

1. 如果后面的值`j`比当前买入价格`i`还小，则 i 继续累加
2. 如果当前值比之前的值小，那么就在上一次卖出，累计收益，同时把`i`买入指针置为当前位置
3. 记得处理最后一个位置卖出的情况

[https://leetcode-cn.com/submissions/detail/45654435/](https://leetcode-cn.com/submissions/detail/45654435/)

### 反思

看了官方题解，我的方法使用了两次循环，跟题解的“峰谷法”类似。

但是“方法三：简单的一次遍历”的方法非常巧妙，通过转换每次计算峰谷转换成连续峰和谷的高度之差，使用一次遍历就完成了。遇到类似的问题，可以通过画图帮忙扩展思路。

## 125. 验证回文串

[https://leetcode-cn.com/problems/valid-palindrome/](https://leetcode-cn.com/problems/valid-palindrome/)

### 思路

通过`i`两个指针`j`，通过`charAt()`原位比较：

1. 使用`Character.isLetterOrDigit`判断字母和数字
2. 使用`Character.toLowerCase`进行大小写转换

[https://leetcode-cn.com/submissions/detail/45675166/](https://leetcode-cn.com/submissions/detail/45675166/)

### 反思

使用了 java 类库而不是对 char 直接进行大小比较，可能会对性能有一定影响，但是在使用现成的类库比起自己造轮子更好呢？


## 136. 只出现一次的数字

[https://leetcode-cn.com/problems/single-number/](https://leetcode-cn.com/problems/single-number/)

### 思路

解法相对比较暴力，没有使用额外的存储空间，需要循环整个数组多次，如果找到另外一个数字就把两个位置置为 0，直到整个数组处理完。

[https://leetcode-cn.com/submissions/detail/45764062/](https://leetcode-cn.com/submissions/detail/45764062/)

### 反思

一直没有想到线性时间解决的方法（考虑过 hash 表，但是想到要额外的空间），大概有个思路，但是没想到位操作的方法，`a⊕b⊕a=(a⊕a)⊕b=0⊕b=b`，其实只要循环一次，使用`res ^= num[i]`即可。

还有另外一个方法也值得学习`2∗(a+b+c)−(a+a+b+b+c)=c`，只要返回`2 * sum(set(nums)) - sum(nums)`，虽然需要多一倍多空间，但是也比暴力法好。

## 141. 环形链表

[https://leetcode-cn.com/problems/linked-list-cycle/](https://leetcode-cn.com/problems/linked-list-cycle/)

### 思路

用来一个取巧的方法，其实准确来说可能还是错误的（只是样例测试不出来），将遍历过的节点设置为`Integer.MAX_VALUE`，如果再遇到就认为有环。

[https://leetcode-cn.com/submissions/detail/45844979/](https://leetcode-cn.com/submissions/detail/45844979/)

### 反思

其实正确的方法应该是使用快慢双指针法，通过快慢双指针的移动，快指针（两倍速）必然先到尾部，否则两个指针必然相遇。还一个使用 HashSet 的方法，之前也没考虑到。

## 155. 最小栈

[https://leetcode-cn.com/problems/min-stack/](https://leetcode-cn.com/problems/min-stack/)

### 思路

思路还是比较简单，对于栈就还是使用 Java 提供的`Stack`，主要考虑下面几个点：

1. 使用`min`保存当前最小值，使用`minCount`保存当前最小值有几个
2. 因为有可能有多个最小值，需要保证最小值被`pop`后不需要重新计算一次
3. 当最小值都被`pop`了，需要重新计算一次最小值和数量

[https://leetcode-cn.com/submissions/detail/45852682/](https://leetcode-cn.com/submissions/detail/45852682/)

### 反思

可能更加好的一个实现是通过一个两个值（当前值，当前最小值）的链表（或者两个栈）来保存，虽然牺牲了一些存储空间，但是性能也要更强（通过空间换时间）。


## 160. 相交链表

[https://leetcode-cn.com/problems/intersection-of-two-linked-lists/](https://leetcode-cn.com/problems/intersection-of-two-linked-lists/)

### 思路

首先想出了最暴力最简单的写法，同时也是验证一下测试样例和方法的正确性，性能很差。

[https://leetcode-cn.com/submissions/detail/45931791/](https://leetcode-cn.com/submissions/detail/45931791/)

接下来使用了`HashSet`进行哈希存储，总体感觉还行，但是没用想到不使用额外存储空间同时为线性时间的解法。

[https://leetcode-cn.com/submissions/detail/45934723/](https://leetcode-cn.com/submissions/detail/45934723/)

### 反思

官方解法中的双指针法确实非常巧妙，通过将较长的链表指针指向较短链表头部，从而消除了两个链表的长度差，只要两者相等即为相交，否则两个指针同时到达尾部`null`

## 167. 两数之和 II - 输入有序数组

[https://leetcode-cn.com/problems/two-sum-ii-input-array-is-sorted/](https://leetcode-cn.com/problems/two-sum-ii-input-array-is-sorted/)

### 思路

一看到是有序数组就想到使用二分法，但是没用出很好的解法，只能通过二分法加快暴力搜索的速度，答案其实不是特别满意。

[https://leetcode-cn.com/submissions/detail/45971242/](https://leetcode-cn.com/submissions/detail/45971242/)

### 反思

官方题解的双指针法确实非常巧妙，充分利用了题目中有序数组还有唯一解的性质，从前后两端移动指针，直到找到唯一解。

## 168. Excel 表列名称

[https://leetcode-cn.com/problems/excel-sheet-column-title/](https://leetcode-cn.com/problems/excel-sheet-column-title/)

### 思路

其实思路很简单，就是简单的进制转换，记得处理当没用余数的情况。

[https://leetcode-cn.com/submissions/detail/45980629/](https://leetcode-cn.com/submissions/detail/45980629/)

### 反思

跟官方解法基本一致，但是不懂得通过`char`的特性简化操作`(char)('A' + c - 1)`，该有就是使用`sb.insert(0, x)`从前面插入。


## 169. 多数元素

[https://leetcode-cn.com/problems/majority-element/](https://leetcode-cn.com/problems/majority-element/)

### 思路

没有想到很好的方法，只能通过哈希计数的方式解题，通过空间换时间的方法，但是跑出来的结果却是不怎样。

[https://leetcode-cn.com/submissions/detail/46063801/](https://leetcode-cn.com/submissions/detail/46063801/)

### 反思

官方解法提出了很多种，除了暴力解法和我使用的哈希表，我认为最有启发的是“排序法”（直接排序数组，返回中间的元素）。

还有“Boyer-Moore 投票算法”，通过遗忘前面的非众数从而得到结果，非常巧妙。

## 171. Excel 表列序号

[https://leetcode-cn.com/problems/excel-sheet-column-number/](https://leetcode-cn.com/problems/excel-sheet-column-number/)

### 思路

跟之前的 Excel 序号问题一样，也是进制转换的问题：

1. 通过从后往前循环并使用`s.charAt(i) - 'A'`获得当前位的乘数
2. 使用`k *= 26`在循环中不断增长当前位的底数
3. 计算`int b = n >= 26 ? 0 : 1`解决进位过程的问题
4. 最后将每位字母的结果累加即可

[https://leetcode-cn.com/submissions/detail/46068259/](https://leetcode-cn.com/submissions/detail/46068259/)

### 反思

看了别人的题解后发现，其实从前往后累加计算才是更加简单的解法，只需要`ans = ans * 26 + num`即可。

## 172. 阶乘后的零\*

[https://leetcode-cn.com/problems/factorial-trailing-zeroes/](https://leetcode-cn.com/problems/factorial-trailing-zeroes/)

### 思路

看了一下数据，一开始觉得主要计算乘的过程会有多少 2 和 5 出现即可，但是写代码的过程考虑错误，直接返回了`n / 5`，结果一直没有结果，最后看了题解才有了思路。

[https://leetcode-cn.com/submissions/detail/46075012/](https://leetcode-cn.com/submissions/detail/46075012/)

### 反思

对于题目还是要多研究验证，通过多个方法进行对比，可以写出更多测试样例更好，方便找规律。

解法：先把`n`更新`n = n / 5`，然后再累加计算`n / 5`即可。


## 175. 组合两个表

[https://leetcode-cn.com/problems/combine-two-tables/solution/zu-he-liang-ge-biao-by-leetcode/](https://leetcode-cn.com/problems/combine-two-tables/solution/zu-he-liang-ge-biao-by-leetcode/)

### 思路

这是一道 SQL 的题目，比较简单，就用`LEFT JOIN`连接两个表。

[https://leetcode-cn.com/submissions/detail/46211212/](https://leetcode-cn.com/submissions/detail/46211212/)

### 反思

跟官方题解一致

## 176. 第二高的薪水\*

[https://leetcode-cn.com/problems/second-highest-salary/submissions/](https://leetcode-cn.com/problems/second-highest-salary/submissions/)

### 思路

还是一道 SQL 的题目，基本的方法是做了，但是一直解决不了`null`的问题（不存在的情况下要输出 null），最后发现需要使用临时表。

[https://leetcode-cn.com/submissions/detail/46212160/](https://leetcode-cn.com/submissions/detail/46212160/)

### 反思

不管是`IFNULL`或者是临时表，都是需要将原来写出来的查询作为一个子查询的。

## 181. 超过经理收入的员工

[https://leetcode-cn.com/problems/employees-earning-more-than-their-managers/](https://leetcode-cn.com/problems/employees-earning-more-than-their-managers/)

### 思路

一开始就想到`JOIN`，还想用`HAVING`，其实`join`后只要用`where`查一下就可以了。

[https://leetcode-cn.com/submissions/detail/46214869/](https://leetcode-cn.com/submissions/detail/46214869/)

### 反思

更加简单的方法是直接`select`两个表，通过`where`组合一下就 OK 了

## 182. 查找重复的电子邮箱

[https://leetcode-cn.com/problems/duplicate-emails/](https://leetcode-cn.com/problems/duplicate-emails/)

### 思路

一开始想使用`HAVING`，但是没用对，使用了临时表子查询的方法。

[https://leetcode-cn.com/submissions/detail/46213242/](https://leetcode-cn.com/submissions/detail/46213242/)

### 反思

写出来的 SQL 还是没有题解的那么优雅，总算明白了`HAVING`的使用方式。

## 183. 从不订购的客户

[https://leetcode-cn.com/problems/customers-who-never-order/](https://leetcode-cn.com/problems/customers-who-never-order/)

### 思路

想到使用`NOT IN`解题，还是比较简单的，直接把订单表的客户 ID 查出来，然后用`NOT IN`查一下就可以了。

[https://leetcode-cn.com/submissions/detail/46215817/](https://leetcode-cn.com/submissions/detail/46215817/)

### 反思

跟官方解法一致。


## 189. 旋转数组

[https://leetcode-cn.com/problems/rotate-array/](https://leetcode-cn.com/problems/rotate-array/)

### 思考

解题的思路比较简单，首先是不使用额外的空间，所以都是原地进行替换，但是没有想到怎么样才能不需要循环`k`次的方法，所以解题效果不是很理想

[https://leetcode-cn.com/submissions/detail/46418437/](https://leetcode-cn.com/submissions/detail/46418437/)

### 反思

## 190. 颠倒二进制位

[https://leetcode-cn.com/problems/reverse-bits/](https://leetcode-cn.com/problems/reverse-bits/)

### 思考

不懂怎么进行二进制操作，直接把它转换成字符串，然后反转，第一次解答错了，因为忘记在后面补 0。

[https://leetcode-cn.com/submissions/detail/46430183/](https://leetcode-cn.com/submissions/detail/46430183/)

### 反思

应该使用二进制操作解题，用一个变量`res`去存储结果，依次得到要转换数字的低位，然后依次保存到`res`中。`res`每得到一位后进行左移腾出位置保存下一位。

## 191. 位 1 的个数

[https://leetcode-cn.com/problems/number-of-1-bits/](https://leetcode-cn.com/problems/number-of-1-bits/)

### 思路

还是使用字符串的解法，通过转换成字符串在计算 1 的个数

[https://leetcode-cn.com/submissions/detail/46432096/](https://leetcode-cn.com/submissions/detail/46432096/)

### 反思

应该通过二进制解法将数字跟掩码`1`进行逻辑与运算，都可以让我们获得这个数字的最低位。检查下一位时，我们将掩码左移一位。
