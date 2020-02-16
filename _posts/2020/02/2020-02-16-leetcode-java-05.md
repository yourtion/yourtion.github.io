---
layout: post
date: 2020-02-16 10:37:28 +08:00
slug: leetcode-java-05
title: "LeetCode 手记 05"
author: Yourtion
keywords: ["leetcode", "java"]
description: "【SQL】自身联表执行内容删除；【SQL】使用`DATEDIFF()`函数辅助`JOIN`；进一步梳理学习动态规划相关的内容；可以使用伪节点或者哨兵节点简化操作；使用厄拉多塞筛法进行质数计算；没有必要做计数或者其他数据保存可以直接使用 Set；尽可能不要使用暴力法，可能的情况下通过空间换时间（特别是差异大的情况下）；了解关于 2 的 n 次幂的位运算；在已知特定长度列表的情况下，使用计数器表（`new int[26]`）而不是 HashMap；对于题目和测试条件要更多的把握边界情况"
category: "学习"
tags: ["LeetCode", "Java"]
---

{% include JB/setup %}

# LeetCode 手记 05

## 本周收获

- 【SQL】自身联表执行内容删除
- 【SQL】使用`DATEDIFF()`函数辅助`JOIN`
- 进一步梳理学习动态规划相关的内容
- 可以使用伪节点或者哨兵节点简化操作
- 使用厄拉多塞筛法进行质数计算
- 没有必要做计数或者其他数据保存可以直接使用 Set
- 尽可能不要使用暴力法，可能的情况下通过空间换时间（特别是差异大的情况下）
- 了解关于 2 的 n 次幂的位运算
- 在已知特定长度列表的情况下，使用计数器表（`new int[26]`）而不是 HashMap
- 对于题目和测试条件要更多的把握边界情况


## 196. 删除重复的电子邮箱

[https://leetcode-cn.com/problems/delete-duplicate-emails/](https://leetcode-cn.com/problems/delete-duplicate-emails/)

### 思考

之前的想法是通过`delete`的`where in`的方法，但是发现子查询不能包含当前表，查了一下文档，发现要通过联表再通过`where`删除。

[https://leetcode-cn.com/submissions/detail/46547020/](https://leetcode-cn.com/submissions/detail/46547020/)

### 反思

跟官方的题解解法一致，如果要通过 select 查询的话，需要保存到另外一个临时表上

## 197. 上升的温度

[https://leetcode-cn.com/problems/rising-temperature/](https://leetcode-cn.com/problems/rising-temperature/)

### 思考

一开始的想法就通过`join`自己然后进行比较，但是一开始使用`id`进行，但是结果发现测试用例并不是按照 id 排序的。看了题解才发现可以通过 DATEDIFF()来进行。

[https://leetcode-cn.com/submissions/detail/46606247/](https://leetcode-cn.com/submissions/detail/46606247/)

### 反思

使用函数协助 Join

## 198. 打家劫舍

[https://leetcode-cn.com/problems/house-robber/](https://leetcode-cn.com/problems/house-robber/)

### 思考

一开始觉得很简单，就是从 0 开始抢还是从 1 开始抢的问题，但是发现不是那么简单，因为可能还存在跨多个房屋的情况，后来看了题解，发现还是要用动态规划。

[https://leetcode-cn.com/submissions/detail/46670365/](https://leetcode-cn.com/submissions/detail/46670365/)

### 反思

通过动态规划，计算：“抢第三个房子，将数额与第一个房子相加。不抢第三个房子，保持现有最大数额。”两种情况的最大值

## 202. 快乐数

[https://leetcode-cn.com/problems/happy-number/](https://leetcode-cn.com/problems/happy-number/)

### 思考

使用递归与循环，10 以外的数最终会被转换成 10 以内的，10 以内的数除了 1 和 7，其他都为 false

[https://leetcode-cn.com/submissions/detail/46694710/](https://leetcode-cn.com/submissions/detail/46694710/)

### 反思

题解中的方法都是通过快慢指针的形式避免陷入死循环，比起我写死判断条件更为优雅，虽然计算量可能会稍大一些

## 203. 移除链表元素

[https://leetcode-cn.com/problems/remove-linked-list-elements/](https://leetcode-cn.com/problems/remove-linked-list-elements/)

### 思考

解法思路还是比较简单的，对于中间的节点通过循环删除，对于头节点，则通过递归方式进行删除。

[https://leetcode-cn.com/submissions/detail/46697675/](https://leetcode-cn.com/submissions/detail/46697675/)

### 反思

官方题解使用哨兵节点将被用于伪头，简化了整个操作的流程

## 204. 计数质数

[https://leetcode-cn.com/problems/count-primes/](https://leetcode-cn.com/problems/count-primes/)

### 思考

一开始的思路很简单，就是使用暴力法计算是否是质数，然后累加结果，但是提交后发现超时了，看了题解优化了质数计算的循环位`for (int i = 2; i * i <= n; i++)`，但是计算结果还是超时，只能使用质数筛法

[https://leetcode-cn.com/submissions/detail/46854603/](https://leetcode-cn.com/submissions/detail/46854603/)

### 反思

通过暴力的解法因为时间太长基本都会超时，使用厄拉多塞筛，简单的逻辑就是找到一个质数，那么他的倍数就都不可能是质数了。在这个基础上仔进行内存和计算的优化

## 205. 同构字符串

[https://leetcode-cn.com/problems/isomorphic-strings/](https://leetcode-cn.com/problems/isomorphic-strings/)

### 思考

一开始的思路比较简单清晰，首先计算两个字符串每位的差，然后判断跟之前的结果是否一致，同时是否存在重复映射的问题。

[https://leetcode-cn.com/submissions/detail/46855193/](https://leetcode-cn.com/submissions/detail/46855193/)

### 反思

网友解法中确实提到了一个很简单的解法：只需要判断“同一个位置的字符在本串中第一次出现的位置相同”，后来发现确实如此，相当简洁明了

## 206. 反转链表

[https://leetcode-cn.com/problems/reverse-linked-list/](https://leetcode-cn.com/problems/reverse-linked-list/)

### 思考

解法使用循环来做，保留前一个节点和下一个节点，循环地将当前节点的 next 指向上一个节点即可

[https://leetcode-cn.com/submissions/detail/46855033/](https://leetcode-cn.com/submissions/detail/46855033/)

### 反思

虽然解法通过了，但是总是感觉解法很不优雅，需要保留三个临时变量，看了官方的迭代解法也是如此。递归的话需要更多栈空间，还是迭代更简单

## 217. 存在重复元素

[https://leetcode-cn.com/problems/contains-duplicate/](https://leetcode-cn.com/problems/contains-duplicate/)

### 思考

思路比较简单，有之前题目的经验，直接使用一个 HashMap 保存遇到的整数，如果已经存在就返回即可

[https://leetcode-cn.com/submissions/detail/47001381/](https://leetcode-cn.com/submissions/detail/47001381/)

### 反思

看了一下官方题解，方法类似，只是用 HashSet，明白了确实没有用 Map 的必要

## 219. 存在重复元素 II

[https://leetcode-cn.com/problems/contains-duplicate-ii/](https://leetcode-cn.com/problems/contains-duplicate-ii/)

### 思考

这个的想法跟之前的有不一样，觉得有`k`的存在，不需要 HashMap 了，直接暴力穷尽即可，当然效果不是很理想

[https://leetcode-cn.com/submissions/detail/47001458/](https://leetcode-cn.com/submissions/detail/47001458/)

### 反思

看了官方题解才发现用暴力法是会超时的，可能是我运气好吧，正确的方法还是要用 HashSet，并在`size()>k`的时候执行`set.remove(nums[i - k])`，才是正道

## 225. 用队列实现栈

[https://leetcode-cn.com/problems/implement-stack-using-queues/](https://leetcode-cn.com/problems/implement-stack-using-queues/)

### 思考

因为栈和队列不一样，一开始在 push 的时候使用一个临时队列来保存，后来想到使用两个队列，轮流倒数据的方法，感觉整体还是比较简洁的

[https://leetcode-cn.com/submissions/detail/47001540/](https://leetcode-cn.com/submissions/detail/47001540/)

### 反思

在官方题解中发现一个更加牛的操作，跟我用两个队列方式一样，但是直接用一个队列，并且使用`q1.add(q1.remove())`这样的操作完成队列倒序

## 226. 翻转二叉树

[https://leetcode-cn.com/problems/invert-binary-tree/](https://leetcode-cn.com/problems/invert-binary-tree/)

### 思考

解题思路比较简单，直接递归转换每个子树的左右即可

[https://leetcode-cn.com/submissions/detail/47222494/](https://leetcode-cn.com/submissions/detail/47222494/)

### 反思

官方题解也有基于深度优先搜索（Breadth-fist Search, BFS）推入队列后循环的解法

## 231. 2 的幂

[https://leetcode-cn.com/problems/power-of-two/](https://leetcode-cn.com/problems/power-of-two/)

### 思考

一开始的想法是从 2 开始向上乘，但是发现这样会解答超时，后来只能转换思路，把输入不断向下除 2 并判断是否是奇数。

[https://leetcode-cn.com/submissions/detail/47224067/](https://leetcode-cn.com/submissions/detail/47224067/)

### 反思

官方解答中除了我这种解法（而且写得非常简单优雅）外，还有基于位运算的`(x & (-x)) == x`和`(x & (x - 1)) == 0`解答方法。

## 232. 用栈实现队列

[https://leetcode-cn.com/problems/implement-queue-using-stacks/](https://leetcode-cn.com/problems/implement-queue-using-stacks/)

### 思考

解题思路跟之前使用队列实现栈类似，但是不需要护换栈，只需要一个临时的栈用于倒数据

[https://leetcode-cn.com/submissions/detail/47224795/](https://leetcode-cn.com/submissions/detail/47224795/)

### 反思

感觉跟官方的解法类似，但是官方还保存了队首的元素，感觉好像没什么必要

## 234. 回文链表

[https://leetcode-cn.com/problems/palindrome-linked-list/](https://leetcode-cn.com/problems/palindrome-linked-list/)

### 思考

一开始有思考怎么在 O(n) 时间复杂度和 O(1) 空间复杂度解题，但是想出来的几个方案都被否决了，所以只能借助一个栈临时保存后半部分链表，然后 pop 出来比较。

后来想到可以保存前半部分，跟后半部分比较，更加简单。

[https://leetcode-cn.com/submissions/detail/47351520/](https://leetcode-cn.com/submissions/detail/47351520/)

### 反思

看了官方的题解，递归确实非常简洁和巧妙，还有更加容易理解的是翻转后半部分链表，当时确实没有考虑到。

## 235. 二叉搜索树的最近公共祖先

[https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-search-tree/](https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-search-tree/)

### 思考

思路相对比较简单， 首先从二叉搜索树性质可以知道左边值小于右边，所以只要找到夹在`p`和`q`中间的节点即可。

[https://leetcode-cn.com/submissions/detail/47351540/](https://leetcode-cn.com/submissions/detail/47351540/)

### 反思

官方题解的递归解法跟我类似，只是判断的条件有些差异。但是比较有意思的是迭代的解法，思路于递归一致，但是可能更好理解一些。

## 237. 删除链表中的节点

[https://leetcode-cn.com/problems/delete-node-in-a-linked-list/](https://leetcode-cn.com/problems/delete-node-in-a-linked-list/)

### 思考

思路很简单，就是把当前节点的值跟下个节点交换

[https://leetcode-cn.com/submissions/detail/47356966/](https://leetcode-cn.com/submissions/detail/47356966/)

### 反思

跟官方题解一致

## 242. 有效的字母异位词

[https://leetcode-cn.com/problems/valid-anagram/](https://leetcode-cn.com/problems/valid-anagram/)

### 思考

依赖一个外部的 Map，然后两个字符串循环后按字母对 Map 中的元素去做加减，最后 Map 中都是`0`则证明字母都相等。

[https://leetcode-cn.com/submissions/detail/47528023/](https://leetcode-cn.com/submissions/detail/47528023/)

### 反思

官方解法中还是有排序的解法，另外的跟我解法类似的使用了一个`new int[26]`的计数器表（使用`table[s.charAt(i) - 'a']++`操作），确实没有使用 Map 的必要的样子

## 257. 二叉树的所有路径

[https://leetcode-cn.com/problems/binary-tree-paths/](https://leetcode-cn.com/problems/binary-tree-paths/)

### 思考

解法依然还是使用递归的方式，当遇到叶子节点的时候加入数组，否则将路径加上当前节点后递归调用。

[https://leetcode-cn.com/submissions/detail/47529127/](https://leetcode-cn.com/submissions/detail/47529127/)

### 反思

官方解法的递归方法跟我的类似，但没有使用`StringBuilder`，感觉好像也没有太大必要，使用`StringBuilder`反而增加了复杂度的样子。迭代的方法需要两个栈，感觉写起来有些复杂

## 258. 各位相加

[https://leetcode-cn.com/problems/add-digits/](https://leetcode-cn.com/problems/add-digits/)

### 思考

一开始先使用了一个比较笨的办法，按照循环的逻辑写了一个版本，验证了正确性，同时输出了 1 到 100 的结果，发现了规律`num % 9`，当余数是 0 的时候需要返回 9。但是在提交后发现了忘了考虑 0 的情况。

[https://leetcode-cn.com/submissions/detail/47530139/](https://leetcode-cn.com/submissions/detail/47530139/)

### 反思

题解中还有一个人的解法更加巧妙，只需要一行即可，连三元判断都不需要`(num - 1) % 9 + 1`
