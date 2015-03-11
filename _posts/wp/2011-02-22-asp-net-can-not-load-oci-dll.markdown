---
author: Yourtion
comments: true
date: 2011-02-22 13:42:03+00:00
excerpt: '解决一台新虚拟机上迁移一个ASP.net与ORACLE的程序，一直出现oci.dll无法加载的问题'
layout: post
slug: asp-net-can-not-load-oci-dll
title: ASP.net无法加载oci.dll解决新法
wordpress_id: 1928
categories:
- ASP.NET
tags:
- 解决问题
---
{% include JB/setup %}

看老师们在一台新虚拟机上迁移一个```ASP.net```与```ORACLE```的程序，一直出现```oci.dll```无法加载的问题，用```regsvr32```注册，提示：

>oci.dll was loaded,but the DLLRegisterServer entry point was not found.

研究了很久，什么目录权限啊，注册表啊，都没有见效。

最终无奈之下把```oraclient8.dll```，```orasql9.dll```，```oci.dll```拷贝到System32解决问题。

```
[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\MSDTC\MTxOCI]

"OracleXaLib"="oraclient8.dll"
"OracleSqlLib"="orasql8.dll"
"OracleOciLib"="oci.dll"
```
