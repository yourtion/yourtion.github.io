---
author: Yourtion
comments: true
date: 2011-07-11 02:45:27+00:00
excerpt: '可能由于使用习惯的不同，国外网页设计者设计的WordPress博客主题的顶部导航是WordPress博客的页面，而国人开发的WordPress博客主题的顶部导航则是WordPress博客的分类目录，国人的使用习惯偏向后者。

  那么，使用以页面为导航的国外主题就要通过替换相关代码变更为以分类目录作为导航目录。'
layout: post
slug: wordpress-page-replace-categories
title: WordPress 页面导航更换为分类目录导航
wordpress_id: 2303
categories:
- WordPress技术
tags:
- WordPress
---
{% include JB/setup %}

可能由于使用习惯的不同，国外网页设计者设计的WordPress博客主题的顶部导航是WordPress博客的页面，而国人开发的WordPress博客主题的顶部导航则是WordPress博客的分类目录，国人的使用习惯偏向后者。

那么，使用以页面为导航的国外主题就要通过替换相关代码变更为以分类目录作为导航目录。

相关代码：

页面列表代码：

```php
<?php 
wp_list_pages('depth=1&sort_column=menu_order&title_li=' . __('') . '' ); 
?>
```

分类目录代码：

```php
<?php
wp_list_categories('depth=1&title_li=0&orderby=id&show_count=0'); 
?>
```

操作步骤：

登陆博客后台，点击左侧外观选项卡中的“```编辑```”功能，在右侧的文件中点击“```header.php```”（主题顶部，WordPress主题文件相关说明），找到页面列表代码：

```php
<?php 
wp_list_pages('depth=1&sort_column=menu_order&title_li=' . __('') . '' ); 
?>
```

用分类目录代码

```php
<?php
wp_list_categories('depth=1&title_li=0&orderby=id&show_count=0'); 
?>
```

替换掉页面列表代码，然后点击“更新文件”按钮，完成！
提醒：有些页面列表或分类目录代码不相同，如有的主题的分类目录代表是

```php
<?php 
wp_list_categories('orderby=id&hide_empty=0&title_li=');
?>
```

这种情况下，可以把找到```wp_list_pages```且更换为```wp_list_categories```即可。
