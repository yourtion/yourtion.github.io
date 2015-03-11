---
author: Yourtion
comments: true
date: 2012-01-18 12:24:37+00:00
excerpt: 'Apk签名首先要有一个keystore的签名用的文件。

  keystore是由jdk自带的工具keytool生成的.'
layout: post
slug: android-apk-signature
title: 为你开发的android应用apk签名
wordpress_id: 3556
categories:
- Android
---
{% include JB/setup %}

Apk签名首先要有一个keystore的签名用的文件。

keystore是由jdk自带的工具keytool生成的.
开始->运行->cmd->cd 到JDK目录 D:\Java\jdk1.7.0_01\bin
（当然你也可以将jdk bin path添加到环境变量中，这样在任何地方都可以使用keytool了）
然后输入：

```
keytool -genkey -alias yourtion.key -keyalg RSA -validity 20000 -keystore yourtion.keystore
```



<blockquote>-alias 后跟的是别名这里是 yourtion.key
-keyalg 是加密方式这里是 RSA
-validity 是有效期 这里是 20000
-keystore 就是要生成的keystore的名称 这里是 yourtion.keystore</blockquote>


然后按回车
按回车后首先会提示你输入密码：这个在签名时要用的要记住了哦。
然后会再确认你的密码。
之后会依次叫你输入 姓名，组织单位，组织名称，城市区域，省份名称，国家代码等。

[![]({{ IMAGE_PATH }}2012/01/apk_qianming_1-560x336.jpg)]({{ IMAGE_PATH }}2012/01/apk_qianming_1.jpg)
运行完可以在 D:\Java\jdk1.7.0_01\bin 里找到刚才生产的keyStore文件

接下来开始给apk签名
使用的命令是JDK bin下面的jarsigner
好现在可以在刚才的命令行后继续运行以下命令给APK签名：

```
jarsigner -verbose -keystore yourtion.keystore -signedjar yourtion_signed.apk yourtion.apk yourtion.key
```



<blockquote>-keystore：keystore 的名称
yourtion_signed.apk 是签完名后的APK
yourtion.apk 是签名前的apk</blockquote>


然后按回车：会要求输入刚才设置的密码，输入后按回车就开始签名了。

[![]({{ IMAGE_PATH }}2012/01/apk_qianming_2-560x177.jpg)]({{ IMAGE_PATH }}2012/01/apk_qianming_2.jpg)

注意 ：有时会签名失败，因为你有可能使用的是eclipse build出来的apk默认是sign过的，所以请重新使用unsign的apk.
右键project -> Android Tools -> Export unsigned application package...

运行成功后在 D:\Java\jdk1.7.0_01\bin 目录下会多出一个被签名的apk文件
