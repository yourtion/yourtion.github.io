---
author: Yourtion
comments: true
date: 2011-03-08 01:44:48+00:00
excerpt: 在服务器端和客户端可以不用设置定全管理器，或者策略文件中设置为能接受、连接、解析任何IP及端口：permission java.net.SocketPermission
  "*:*","accept,connect,resolve";　或者用1(4)的方法忽略所有IP及端口的检测。
layout: post
slug: java-access-denied-socketpermission-solution
title: Java出现access denied java.net.SocketPermission解决方法
wordpress_id: 1944
categories:
- j2me
tags:
- 解决问题
---
{% include JB/setup %}

1. 执行java PerfectTime出现异常　java.security.AccessControlException: access denied (java.net.SocketPermission 127.0.0.1:2005 connect,resolve)

无法解析和连接到127.0.0.1的2005端口上，原因是在PerfectTime中设置了安全管理器＜System.setSecurityManager(new RMISecurityManager());＞，可是又没有设置访问的策略，解决办法有四(解决这种异常的办法同样适用于DisplayPerfectTime)：

(1) 可以把代码System.setSecurityManager(new RMISecurityManager());去掉，不设置安全管理器
(2) 修改JRE的安全策略文件，这就要求你能确定执行时是用的哪个JRE，比如在Eclipse中用JDK是c:\Java\jdk1.5.0_06,相应的安全策略文件就是c:\java\jdk1.5.0_06\jre\lib\security\java.policy,如果是Applet中的java程序就应该是在 jre 目录中,如文件C:\Java\jre1.5.0_06\lib\security\java.policy。修改安全策略文件，在grant {}，大括号中加上permission java.net.SocketPermission "localhost:2005","connect,resolve";
(3) 建立自己的策略文件，如c:\MyPolicy.policy ,内容为：

grant {
permission java.net.SocketPermission "localhost:2005","connect,resolve";
}

执行PerfectTime时用命令　java -Djava.security.policy=c:\MyPolicy.policy PerfectTime 　指定了安全策略文件

(4) 把 System.setSecurityManager (new RMISecurityManager()) 改为匿名类实现，覆盖两个方法

System.setSecurityManager (new RMISecurityManager() {
public void checkConnect (String host, int port) {}
public void checkConnect (String host, int port, Object context) {}
});

当然最简单的解决方法莫过于第一种。

2. 同样是执行 PerfectTime 出现的异常
java.rmi.ServerException: RemoteException occurred in server thread; nested exception is:
java.rmi.UnmarshalException: error unmarshalling arguments; nested exception is:
java.lang.ClassNotFoundException: PerfectTime_Stub

很多人对这个问题有些莫名其妙，因为明明看到 PerfectTime_Stub 和 PerfectTime 这两个类是在同一个目录中，并且classpath 也有设置当前目录，按理既然能加载 PerfectTime 类执行，就能加载到 PerfectTime_Stub吧，为什么还提示ClassNotFound呢？其实类 PerfectTime_Stub并非由PerfectTime执行行直接加载，而是PerfectTime在向RMI注册时，要求rmiregistry去加载 PerfectTime_Stub类的，理解了这一层次上的意义就会知道其实 PerfectTime_Stub是为 rmiregistry所用的。所以解决办法是：

(1) 在执行 rmiregistry 之前，设置classpath让能查找到PerfectTime_Stub类，如在同一Dos窗口中，假设 PerfectTime_Stub类是在E:\workspace\TestRMI\bin目录中，执行过程那就是

C:\Documents and Settings\unmi>set classpath=%classpath%;E:\workspace\TestRMI\bin

C:\Documents and Settings\unmi>rmiregistry 2005

(2) 或者在命令行中先进入到 PerfectTime_Stub类所在的目录，然后再执行 rmiregistry (这种方法实质是与上面一样的，只是恰当的应用的classpath中的当前目录 "." )，执行过程如下

C:\Documents and Settings\unmi>e:

E:\>cd E:\workspace\TestRMI\bin

E:\workspace\TestRMI\bin>rmiregistry 2005

参看：rmiregistry was finding the stubs in its CLASSPATH

3. 执行客户端程序 DisplayPerfectTime 出现异常　java.security.AccessControlException: access denied (java.net.SocketPermission 127.0.0.1:1276 connect,resolve)，同时在服务器端也产生异常　Exception in thread "RMI TCP Connection(6)-127.0.0.1" java.security.AccessControlException: access denied (java.net.SocketPermission 127.0.0.1:1296 accept,resolve)

直接能想到的解决办法是把127.0.0.1:1276，127.0.0.1:1276的解析连接权限也加上，方法可取第 1 种异常所列的方法，但这个端口是随机的。在此解析一下这些端口的用途，2005是直接指定的供客户端查找注册的服务对象引用的端口，这是固定的，而上面产生的在客户端和服务器上的1276和1296的端口，是随机的，是在方法调用时真正的客户端与提供服务的服务器（而非注册服务器）之间的数据通信的端口。

为了满足上面的端口应用，可以在安全策略文件中只加上　permission java.net.SocketPermission "localhost:*","accept,connect,resolve";　允许在所有端口上的接受，连接，解析。再如果要访问的IP很多，又要写成　permission java.net.SocketPermission "*:*","accept,connect,resolve";　方便。

4. 执行客户端程序 DisplayPerfectTime出现异常　 java.rmi.UnmarshalException: Error unmarshaling return header; nested exception is:  java.io.EOFException，这种异常应该比较少见，出现情况是 客户端有权限访问服务提供端的某个端口，而服务提供端却无权限在某个端口上或给那个客户端提供服务造成的，解决办法把客户端和服务器的安全策略文件都改为能访问任何端口就行。

总结：上面1、3、4三种情况都是因为权限不足所造成的，如果安全控制的粒度不要求太细的化，在服务器端和客户端可以不用设置定全管理器，或者策略文件中设置为能接受、连接、解析任何IP及端口：permission java.net.SocketPermission "*:*","accept,connect,resolve";　或者用1(4)的方法忽略所有IP及端口的检测。
