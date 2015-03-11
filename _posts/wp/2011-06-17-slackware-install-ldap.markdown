---
author: Yourtion
comments: true
date: 2011-06-17 15:39:57+00:00
excerpt: LDAP是一种轻权的目录访问协议，由于它在读的方式上经过精心的优化，所以读的效率很高，相反对于频繁写入数据的要求是不适合的。基于LDAP的这种特性，近年来在Internet领域的应用不断加强。目前，有关LDAP的软件很多，其中最受欢迎也是最为大家所熟知的LDAP软件是基于开放源码的OpenLdap。
layout: post
slug: slackware-install-ldap
title: Slackware安装LDAP
wordpress_id: 2181
categories:
- 服务器
tags:
- LDAP
- Linux
---
{% include JB/setup %}

LDAP是一种轻权的目录访问协议，由于它在读的方式上经过精心的优化，所以读的效率很高，相反对于频繁写入数据的要求是不适合的。基于LDAP的这种特性，近年来在Internet领域的应用不断加强。目前，有关LDAP的软件很多，其中最受欢迎也是最为大家所熟知的LDAP软件是基于开放源码的OpenLdap。

一、LDAP的安装：

下载openldap-stable-20100719.tgz （http://www.openldap.org）
openldap安装

```
#tar -zxvf openldap-stable-20100719.tgz
#cd openldap-2.4.23
#./configure –prefix=/home/local/ldap
#make depend
#make
#make test 
#make install
```

ldap数据库的建立

```
#cd /home/local/ldap/etc/openldap
```

修改slapd.conf文件如下：

```
suffix “o=hitek,c=cn”
rootdn “cn=root,o=hitek,c=cn”
#cd /home/local/ldap/var/openldap-ldbm
```

建立一个hitek.ldif文件，文件内容如下

```
dn: o=hitek,c=cn
objectclass:top
objectclass:organization
o: hitek
```


```
#cd /home/local/ldap/sbin
#./slapadd –f /home/local/ldap/openldap/slapd.conf –l /home/local/ldap/var/openldap-ldbm/hitek.ldif
#cd /home/local/ldap/libexec
#./slapd
```

到此为止LDAP安装过程完成。
