---
author: Yourtion
comments: true
date: 2011-03-12 06:39:23+00:00
excerpt: 最近在做组织部人事处的文章，在文章首页的下载栏目想点击链接直接下线文件，不用进入详细内容页面再点下载。
layout: post
slug: shlcms-direct-download
title: SHLCMS下载频道直接下载文件
wordpress_id: 1948
categories:
- SHLCMS
tags:
- PHP
- 深喉咙CMS
---
{% include JB/setup %}

最近在做组织部人事处的文章，在文章首页的下载栏目想点击链接直接下线文件，不用进入详细内容页面再点下载。

实现方法很简单，在Skins里你的模版文件夹下面的index下新建一个download_0.php的文件

内容如下：

```
<?php
if(URLREWRITE)
{?>
<li><a href="<?php echo get_root_path().$o->filePath?>"><?php echo ·.$o->softwareName; ?></a></li>
<?php
}
else
{?>
<li><a href="<?php echo get_root_path().$o->filePath?>"><?php echo $o->softwareName; ?></a></li>
<?php
}
?>
```

然后在你的主页模版用<?php echo dt_download(38,5,25,0,0,true) ?>直接调用即可。
