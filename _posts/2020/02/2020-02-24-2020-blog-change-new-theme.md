---
layout: post
date: 2020-02-24 11:55:09 +0800
slug: 2020-blog-change-new-theme
title: "2020为博客更换新主题"
author: Yourtion
keywords: ["Jekyll", "flexible-jekyll"]
description: "为博客更换一个新主题的计划其实已经想了很久，从去年就有这样的想法，趁着这个假期一直宅在家，就索性开干了。之前的主题是自己从几个模版里面参考了好几个部分，然后自己使用Bootstrap拼凑起来的，虽然感觉自己写的比较特别，但因为自己审美不行，前端水平也菜，所以一直觉得博客不够好，所以这次就不献丑了。"
category: "博客大事记"
tags: ["Jekyll"]
img: 2020/02/2020-blog-change-new-theme-1.jpg
---
{% include JB/setup %}


为博客更换一个新主题的计划其实已经想了很久，从去年就有这样的想法，趁着这个假期一直宅在家，就索性开干了。

[![]({{ IMAGE_PATH }}2020/02/2020-blog-change-new-theme-1.jpg)]({{ IMAGE_PATH }}2020/02/2020-blog-change-new-theme-1.jpg)

之前的主题是自己从几个模版里面参考了好几个部分，然后自己使用Bootstrap拼凑起来的，虽然感觉自己写的比较特别，但因为自己审美不行，前端水平也菜，所以一直觉得博客不够好，所以这次就不献丑了。

首先是选择一个比较简洁的基础模版，找了一圈，确定了使用 @artemsheludko 的 [flexible-jekyll](https://github.com/artemsheludko/flexible-jekyll) ，简洁明了，同时有移动端自动适应，整体比较符合我的需求，所以就打算基于这个主题进行改造。

## 主要改造内容

首先是更新了一下主题依赖的normalize，主要是考虑到兼容性等问题。其次是把原来示例中的图片和文章之类的删除，清理了一些文件等内容，这样基本的布局什么都完成。

因为之前的博客文档都有一个`{% include JB/setup %}`的头，用于处理文档中的变量等内容，所以这次依然还是需要将`JB`相关目录和文件更新上，虽然不再使用“Jekyll Bootstrap API”，但是为了减少改动，同时保证之前博文中关于图片的处理也正常。

最后是根据之前的经验和套路，添加了博客统计相关的代码，修改了文件头中关于博客描述的内容，还有就是根据需求，汉化了部分的主题中的表述。

至此，主题的更新就基本完成，重新导入之前的文章，修复一些问题，改造基本完成。

## 文章头图处理

在一个博客页面，特别是主页，如果都是文字，没有一些图片点缀，看起来就非常单调，但是作为一个技术博客，确实也比较难每次都去找一个头图，思考了一番，觉得使用一个比较取巧的方法。

使用文章的主题目录或者标签作为文章的头图，用于展示，因为我写的博客内容比较杂，所以应该也不会特别重复。

首先收集并处理好一批图片，放置在`assets/img/head`下，然后在`_data/images.yaml`中按照 Key-Value 的形式，放置目录和标签对应的图片路径。

其次修改模版内容，在首页获取头图部分的，添加相应代码，详见：[index_image.html](https://github.com/yourtion/yourtion.github.io/blob/c8f04a2f15901bdb43980e7bbfadd9dc04ee5e99/_includes/head_meta.html) 。处理逻辑如下：

1. 如果有头图使用头图
2. 尝试使用 category 对应的图片作为头图 
3. 尝试使用 tags 对应的图片作为头图 

至此，就完成了对文章头图的添加。

## 添加LightBox等细节

还有最后的需要处理的一点细节，那就是文章中的图片LightBox效果还有一些链接的处理，具体内容详见：[_includes/js_post.html](https://github.com/yourtion/yourtion.github.io/blob/c8f04a2f15901bdb43980e7bbfadd9dc04ee5e99/_includes/js_post.html)

大概的逻辑包括几块：

1. 处理文章中的链接，如果不是自己的域名链接，添加“nofollow”和“_blank”
2. 处理文章中的图片，添加“data-lightbox”和“data-title”，用于LightBox识别
3. 针对表格，添加“table table-hover”的类
4. 如果文章中有图片，动态引入LightBox的css和js文件

## 总结

至此，博客主题更新就基本完成，还有更多细节就看具体代码吧。