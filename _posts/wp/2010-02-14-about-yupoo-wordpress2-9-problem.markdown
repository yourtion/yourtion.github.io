---
author: Yourtion
comments: true
date: 2010-02-14 02:14:00+00:00
layout: post
slug: about-yupoo-wordpress2-9-problem
title: 关于Yupoo相册插件在WordPress2.9的问题
wordpress_id: 610
categories:
- WordPress技术
tags:
- WordPress
- YuPooAlbum
- 出错
---
{% include JB/setup %}

之前写了一篇[关于WordPress用WindowsLiveWrite出错解决方法](/windows-livewrite-error-wordpress-solution.html)的文章，原来不能用wlw更新分类的问题也就解决了。

但是过了两天我却发现wlw又没办法更新分类出现了以下错误：


> 尝试登陆时发生意外错误：
> 
> 服务器响应无效 - 从日志服务器接收的对blogger.getUsersBlogs方法的响应无效：
> 
>Invalid response document returned from XmlRpc server

还会出现提示，要求输入用户名和密码，但是输入正确之后还是弹出这个。

用之前介绍的Zoundry Raven也是提示出错，

```
unclosed token: line 155, column 0

zoundry.blogpub.xmlrpc.xmlrpcserverimpl.ZXmlRpcException: {ZBlogServerException['metaWeblog.getCategories' type:Error, code:0 msg:unclosed token: line 155, column 0]}
at zoundry\blogpub\xmlrpc\xmlrpcserverimpl.pyo:1005 [getCategories()] -> None
at zoundry\blogapp\services\pubsystems\blog\xmlrpc.pyo:18 [_listCategories()] -> None
at zoundry\blogapp\services\pubsystems\blog\blogpublisher.pyo:519 [listCategories()] -> None
at zoundry\blogapp\services\pubsystems\blog\blogcommands.pyo:338 [listCategoriesForBlog()] -> None
at zoundry\blogapp\services\pubsystems\blog\blogcommands.pyo:331 [listCategories()] -> None
at zoundry\blogapp\services\pubsystems\blog\blogcommands.pyo:326 [doCommand()] -> None
at zoundry\blogapp\ui\util\publisherutil.pyo:396 [updateCategories()] -> None
at zoundry\blogapp\ui\util\publisherutil.pyo:509 [_updateCategories()] -> None
at zoundry\blogapp\ui\util\publisherutil.pyo:487 [_run()] -> None
at zoundry\appframework\services\backgroundtask\backgroundtaskimpl.pyo:265 [run()] -> None
Caused By:
xml.parsers.expat.ExpatError: {unclosed token: line 155, column 0}
at zoundry\blogpub\xmlrpc\zpatch\xmlrpclib.pyo:560 [close()] -> None
at zoundry\blogpub\xmlrpc\zpatch\xmlrpclib.pyo:1441 [_parse_response()] -> None
at zoundry\blogpub\xmlrpc\zpatch\xmlrpclib.pyo:1230 [request()] -> None
at zoundry\blogpub\xmlrpc\zpatch\xmlrpclib.pyo:1565 [__request()] -> None
at zoundry\blogpub\xmlrpc\zpatch\xmlrpclib.pyo:1163 [__call__()] -> None
at zoundry\blogpub\xmlrpc\xmlrpcserverimpl.pyo:829 [_metaWeblogGetCategories()] -> None
at zoundry\blogpub\xmlrpc\xmlrpcserverimpl.pyo:1314 [_metaWeblogGetCategories()] -> None
at zoundry\blogpub\xmlrpc\xmlrpcserverimpl.pyo:1002 [getCategories()] -> None

Thread: [bgtask:id:00000126cbd8439500c000a8000100986ea0ce2b]

```

这样就让我非常郁闷，就是我基本肯定是插件出问题。因为当我禁用所有插件之后就可以正常更新和发布，所有我用排除法一个个把插件开启，并测试更新，当我启用到YuPooAlbum这个插件的时候，就出问题，那就确定了根源了。

原因分析：

YuPooAlbum这个插件在我之前一篇文章《[WordPress 2.9不再有的七个文件和对应新版本](/wordpress-2-9-seven-new-files.html)》有提到，里面说到在Wordpress2.9下面会提示缺少```wp-includes/gettext.php```和```wp-includes/streams.php```。

但是当我把文件改成对应文件后 YupooAlbum插件依旧无法工作。虽然后来做一些更改之后插件算是正常，但是经常会找不到照片，我也就一直研究中，插件也就一直开着，我怀疑Wordpress2.9的文件除了改名还改变了原有文件的一些参数。导致插件调用出错。禁用插件后一切正常。希望YuPoo能推出新版本的插件。

如果你也遇到这样的问题也可以试试是不是插件出错了。
