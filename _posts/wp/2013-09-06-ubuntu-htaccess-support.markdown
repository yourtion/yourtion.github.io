---
author: Yourtion
comments: true
date: 2013-09-06 14:05:47+00:00
excerpt: Ubuntu开启.htaccess的支持，xampp的ModRewrite开启方法
layout: post
slug: ubuntu-htaccess-support
title: Ubuntu开启.htaccess的支持
wordpress_id: 3884
categories:
- 服务器
tags:
- PHP
---
{% include JB/setup %}

Ubuntu下启动Apache对```.htaccess``` 的支持步骤:

1. 终端运行

```bash
sudo a2enmod
```

程序提示可供激活的模块名称，输入：

其中```rewrite```

2. 修改```/etc/apache2/sites-enabled/000-default``` (该链接指向的是站点配置文件)

把（默认的```www```目录、或者需要应用```.htaccess```的目录）下的```AllowOverride``` 属性改为```All```，保存。

3. 重新加载```apache```

```bash
sudo /etc/init.d/apache2 restart
```

### 附xampp的ModRewrite开启方法：


要开启Mod Rewrite功能其实是很简单的:

  1. 在你的```XAMPP```安装目录下找到 ```httpd.conf``` 这个文件( 位于```\etc\httpd.conf```)
  2. 用vim或其他文本编辑器打开它
  3. 找到 “```AllowOverride None```”, 替换为”```AllowOverride All```“。(修改第一个就可以了)
  4. 再找到”```#LoadModule rewrite_module modules/mod_rewrite.so```“，把前面的”#”号去掉
  5. 重启```XAMPP```


然后```Mod Rewrite```功能就开启了:)
