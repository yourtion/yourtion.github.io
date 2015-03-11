---
author: Yourtion
comments: true
date: 2010-06-26 02:32:05+00:00
excerpt: 我们写的CSS有多高效？换个说法，浏览器渲染我们的CSS会有多快？我承认这个问题我考虑的不够多。这个问题本应该是浏览器厂商考虑的——他们的浏览器越快，用户就越喜欢用他们的产品。
layout: post
slug: understanding-core-secret-cs-sefficient
title: 深入核心了解高效CSS的秘诀
wordpress_id: 1242
categories:
- CSS+DIV
tags:
- CSS
---
{% include JB/setup %}

我们写的CSS有多高效？换个说法，浏览器渲染我们的CSS会有多快？我承认这个问题我考虑的不够多。这个问题本应该是浏览器厂商考虑的——他们的浏览器越快，用户就越喜欢用他们的产品。




Mozilla有一篇关于这方面最佳实践的文章，一直坚持Web应该更快的，我们一起看看他们阐释的一些主要观点。




**从右向左**




****浏览器如何读取你的CSS选择器？如何巧妙的运用CSS选择器？我们需要明白的最重要的一点是从右向左。比如这个选择器ul > li a[title="home"]，浏览器首先读取的是a[title="home"]。这个首先被读取的部分我们叫它key selector，它是浏览器最終要选择的元素。




**ID最快，Universal最慢**




****有四种类型的key selector，解析速度由快到慢依次是：ID、class、tag和universal：




<blockquote>#main-navigation {   }      /* ID（最快） */  

body.home #page-wrap {   }  /* ID */  

.main-navigation {   }      /* Class */  

ul li a.current {   }       /* Class *  

ul {   }                    /* Tag */  

ul li a {  }                /* Tag */  

* {   }                     /* Universal（慢） */  

#content [title='home']     /* Universal */
> 
> </blockquote>




我们把这个原则与从右向左结合来看，就会发现下面这个选择器并不是很快：




<blockquote>#main-nav > li {   }  /* 比它看起来的要慢 */
> 
> </blockquote>




这真有点违反我们的直觉，由于ID很快，我们直觉的以为浏览器会迅速的找到#main-nav，然后找到它的孩子。但实际上，浏览器首先解析的是相对较慢的。




**不要tag-qualify**




****永远不要这样做：




<blockquote>ul#main-navigation {  }
> 
> </blockquote>




ID已经是唯一的，不需要Tag来标识，这样做会让选择器变慢。如果你可以，也尽量不要在class上这样用。class不是唯一的，你可以用它来处理很多不同的元素。如果你希望拥有同一个class的元素有不同的样式，你可能需要tag-qualify（比如li.first），但这是很少见的。




**后代选择器最糟糕**




****David Hyatt这样说过：




_The descendant selector is the most expensive selector in CSS. It is dreadfully expensive — especially if the selector is in the Tag or Universal Category._




换句话说，下面这个选择器是很低效的：




<blockquote>html body ul li a {  }
> 
> </blockquote>




**匹配失败的选择器更高效**




****我不清楚从这里面我们可以学到什么，在自己的CSS文件里写很多没用的东西岂不是很奇怪。但还是应该说明一下，当从右向左的解析一个选择器时，如果没有匹配的結果，浏览器将会停止下一步的动作，于是更高效了。




**想清楚你为什么这样写**




****考虑这样一个选择器：




<blockquote>#main-navigation li a { font-family: Georgia, Serif; }
> 
> </blockquote>




font-family是可以级联的，所以你可能根本不需要如此特殊的一个选择器（如果你只是要改变字体的话）。这样做会更高效，而且是高效很多：




<blockquote>#main-navigation { font-family: Georgia, Serif; }
> 
> </blockquote>




**CSS 3的效率问题**




****David Hyatt的说法是，“关于CSS 3选择器最可悲的是，他们不应该将其只用在他们所关心的页面性能上。”




CSS3选择器（比如 :nth-child）能够漂亮的定位我们想要的元素，又能保证我们的CSS整洁易读。但是这些神奇的选择器会浪费很多的浏览器资源。那该怎样做？我们真的不应该使用它们吗？让我们考虑一些实用的东西。（关于CSS 3，51CTO推荐阅读：定义未来Web样式 CSS 3最新特性一览）




**实用性**




****我是这样认为的：不管怎样，我们上面谈论的最佳实践都是有作用的。你可以遵守这些规则，因为他们并不会限制你CSS的能力。但也大可不必把它们当作教条执行。




如果你的网站正好非常缓慢，而你之前并没有考虑过这些CSS最佳实践，你可能需要好好检查一下你的CSS了。如果你的网站没有任何缓慢的迹象，那可以不用理它，以后写CSS时注意就好了。




**极速却不实用**




****我们知道了ID是最高效的选择器。如果你想要一个渲染最快的网页，那你可以给页面上每一个元素一个唯一的ID，然后样式化每一个ID。这将会超级快，但也是极其滑稽的。这可能让你的CSS文件很难读很难维护。在一些对性能要求很高的硬编码的网站上你都很难看到这种写法。我们不应该为了效率而牺牲可读性和可维护性。简单说一点，很多的JavaScript库都使用了CSS选择器，上面的原则也依然适用。ID是最快的，而复杂的后代选择器会比较慢。




本文转自abitno的博客：http://abitno.me/efficiently-rendering-css



