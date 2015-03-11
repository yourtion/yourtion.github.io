---
author: Yourtion
comments: true
date: 2010-03-15 14:55:51+00:00
excerpt: "下午重新安装了创E的服务器。Windows Server 2003 和 IIS 6 的，虽然之前也可以跑过 PHP，但用的是ISAPI，不知所以然，这次下的PHP5.2.3 不支持ISAPI了。google 一翻，终于实现手工配置 IIS 6 下以 FastCGI 跑 PHP。"
layout: post
slug: windows-2003-iis-6-fastcgi-php
title: Windows 2003 IIS 6 下配置 FastCGI 的 PHP
wordpress_id: 695
categories:
- 服务器
tags:
- PHP
- 服务器
---
{% include JB/setup %}

下午重新安装了创E的服务器。Windows Server 2003 和 IIS 6 的，虽然之前也可以跑过 PHP，但用的是ISAPI，不知所以然，这次下的PHP5.2.3 不支持ISAPI了。google 一翻，终于实现手工配置 IIS 6 下以 FastCGI 跑 PHP。

环境：
操作系统：Windows 2003 Server SP2
PHP 版本：php-5.3.2-Win32

### 下载 FastCGI For IIS6

[http://www.iis.net/expand/FastCGI](http://www.iis.net/expand/FastCGI)

下载之后，双击运行进行安装。

安装后在 C:\WINDOWS\system32\inetsrv 目录下产生了五个文件。

同时在 IIS 的 "Web 服务扩展"里多了 FastCGI Handler。

### 下载 PHP5.3.2 Windows版

[http://windows.php.net/download/](http://www.php.net/downloads.php)

下载 .zip 格式的版本，下载后解压至 D:\PHP 目录，并给 IIS 启动帐户组或用户赋予读取和运行权限。

你可以根据自己的意愿解压到别的目录。

### PHP FastCGI

打开 C:\WINDOWS\system32\inetsrv\fcgiext.ini 文件。

```
; This is the configuration file for the FastCGI handler for IIS 6.0.
; The FastCGI handler will look for this file in the same directory as
; fcgiext.dll. By default, the FastCGI installer will place this file into
; the %windir%\system32\inetsrv directory.

```


我个人的理解是，只要"Web 服务扩展"里的 FastCGI Handler 为允许时，在加载 fcgiext.dll 时，会读取 fcgiext.ini 配置文件的内容，根据里面的配置为每个网站提供映射。

在 ```[Types]``` 下添加以下配置：

```
[Types]
php=PHP
[PHP]
ExePath=D:\PHP\php-cgi.exe
```

"php"表示扩展名，"```PHP```"是配置节名称，以"```[PHP]```"定义。

### 配置```php.ini```

将 D:\PHP\php.ini-recommended 复制一个，然后重命名为　D:\PHP\php.ini

打开 D:\PHP\php.ini，修改：

```
extension_dir = "D:\PHP\ext"
fastcgi.impersonate = 1
```

其它的根据实际需要对 php.ini 进行设置修改，这里只针对能跑 php，修改完记得重启 IIS。

### 配置网站

右键网站 => 属性 => 主目录 => 配置 => 添加，

在可执行文件路径：```C:\WINDOWS\system32\inetsrv\fcgiext.dll```

然后文件扩展名写：```PHP```

### 写个php测试下吧

```php
<?php
	phpinfo();
?>
```

看到PHP的信息的话就说明你的服务器可以跑 php 了。

打开后如果出现提示：

> No input file specified.

估计是没配置 ```fastcgi.impersonate```。

如果觉得过程麻烦，请看：

[http://hi.baidu.com/imdao/blog/item/16583512f11cb654f819b858.html](http://hi.baidu.com/imdao/blog/item/16583512f11cb654f819b858.html)

如果你还觉得麻烦，那就到 [http://www.zend.com](http://www.zend.com/) 下载 Zend Core，这个就什么都不用配置，安装完就可以使用了，连 MySQL 都有。

重启IIS后,打开测试页出现如下提示:

```
FastCGI Error
The FastCGI Handler was unable to process the request.
---------------------------------------------------------
Error Details:

Error Number: 5 (0x80070005).
Error Description: 拒绝访问。
HTTP Error 500 - Server Error.
Internet Information Services (IIS)
```

这个错误是由于在解压PHP之后,没有对IIS启动帐户赋予该目录的读取和运行权限.修改文件夹安全属性,问题解决.

