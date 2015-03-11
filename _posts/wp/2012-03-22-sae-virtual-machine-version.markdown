---
author: Yourtion
comments: true
date: 2012-03-22 04:05:33+00:00
excerpt: miniSAE是新浪云平台（SAE）的本地仿真环境，运行于用户本地的电脑（物理机），用户可以使用miniSAE在本地进行开发和代码调试。
layout: post
slug: sae-virtual-machine-version
title: SAE虚拟机版本地开发环境miniSAE上线内测
wordpress_id: 3622
categories:
- 新浪SAE
---
{% include JB/setup %}

miniSAE是新浪云平台（SAE）的本地仿真环境，运行于用户本地的电脑（物理机），用户可以使用miniSAE在本地进行开发和代码调试。





miniSAE具备SAE的绝大部服务和功能，这主要包括：[AppConfig](http://sae.sina.com.cn/?m=devcenter&catId=193)，[Counter](http://sae.sina.com.cn/?m=devcenter&catId=194)，[FetchURL](http://sae.sina.com.cn/?m=devcenter&catId=197)，[KVDB](http://sae.sina.com.cn/?m=devcenter&catId=199)，[Mail](http://sae.sina.com.cn/?m=devcenter&catId=200)?，[Memcache](http://sae.sina.com.cn/?m=devcenter&catId=201)，[MySQL](http://sae.sina.com.cn/?m=devcenter&catId=192)?，[Rank](http://sae.sina.com.cn/?m=devcenter&catId=202)?，[Storage](http://sae.sina.com.cn/?m=devcenter&catId=204)?，[TaskQueue](http://sae.sina.com.cn/?m=devcenter&catId=205)?，[TmpFS](http://sae.sina.com.cn/?m=devcenter&catId=206)，[Image](http://sae.sina.com.cn/?m=devcenter&catId=198)，[Wrappers](http://sae.sina.com.cn/?m=devcenter&catId=218)，Vcode，分词服务等。





作为仿真环境，miniSAE具备以下优势：




a 开发者可以离线开发，在本地使用自己顺手的IDE来开发，调试程序。




b 省去频繁向线上部署代码测试的麻烦，节省时间的同时还节省了调试代码时造成的云豆消耗。






miniSAE安装




**准备工作**




1，首先下载miniSAE安装包，并解压




miniSAE提供多种下载方式。http下载，下载链接如下：




ZIP格式（miniSAE_20120321.zip / 480M）：[http://vdisk.weibo.com/s/3n7vA](http://vdisk.weibo.com/s/3n7vA)




7z格式（miniSAE_20120321.7z / 200M）：[http://vdisk.weibo.com/s/3n84i](http://vdisk.weibo.com/s/3n84i)




bz2格式（miniSAE_20120321.tar.bz2 / 400M）：[http://vdisk.weibo.com/s/3n7oN](http://vdisk.weibo.com/s/3n7oN)





BT下载方式（MiniSAE_20120316(种子文件).zip）：?[http://vdisk.weibo.com/s/3exOW](http://vdisk.weibo.com/s/3exOW)








由于目前处于内测阶段， 我们会不定期发布新的镜像更新以修复bug。




用户下载新的镜像解压之后和原来一样安装，然后把原来的应用考到新的根目录下 面即可。




具体有哪些更新，用户可以查看CHANGELOG文件。






2，安装VMware Player虚拟机




下载地址：




Windows 32/64位：




[http://src.sinacdn.com/vmware/VMware-player-4.0.2-591240.exe](http://src.sinacdn.com/vmware/VMware-player-4.0.2-591240.exe)




Linux32位：




[http://src.sinacdn.com/vmware/VMware-Player-4.0.2-591240.i386.bundle?](http://src.sinacdn.com/vmware/VMware-Player-4.0.2-591240.i386.bundle)




Linux64位：




[http://src.sinacdn.com/vmware/VMware-Player-4.0.2-591240.x86_64.bundle](http://src.sinacdn.com/vmware/VMware-Player-4.0.2-591240.x86_64.bundle)





**Windows用户安装**




进入解压后的miniSAE目录，执行init_win.bat文件（win7用户右键单击init_win.bat文件，选择"以管理员身份运行"），按照提示，完成安装操作即可，windows用户此时直接双击CentOS.vmx即可打开该虚拟机。





注意:




1，miniSAE的目录及其各级目录不要有中文，否则安装脚本会失败。




2，由于后台脚本修改hosts文件是可能会遭到杀毒软件的拦截，所以请设置杀毒允软件许修改hosts文件，否则自动绑定应用host和检测功能将不能工作。





**Linux用户安装**




输入如下的命令：




sudo ./init_linux.sh




然后按照提示完成安装即可。





**启动虚拟机**




启动VMware Player，选择“文件”-> "打开虚拟机" , 导航到您刚刚解压的CentOS_vmware目录， 找到CentOS.vmx 文件， 双击打开。




启动虚拟机。





启动虚拟机以后您将会看到欢迎界面以及接下来如何开发的提示，这里重复一下：




1) 在浏览器中输入mini.sae.sina.com.cn:888, 进入miniSAE管理后台。




2) 如果您的线上已经有了应用，您可以通过管理后台下载相应的应用代码。




3) 当然您也可以到应用挂载的根目录按照线上应用目录的规则创建相关应用。在Linux下面需要这样创建：cd approot; mkdir fooapp/1 -p， 然后在fooapp/1下面编写程序文件。





注意：安装成功后，不要修改approot目录以外的任何文件。应用目录下面的saecfg文件夹也禁止修改，移动。





miniSAE使用




**启动管理后台**




打开浏览器，在地址栏中输入[mini.sae.sina.com.cn:8888](http://mini.sae.sina.com.cn:8888/)， 进入miniSAE管理后台。





**管理应用**




点击 "App应用管理", 此处展现的是您本地开发目录下面的全部应用，您可以将每个线上应用（SAE）的代码，数据表等信息同步到本地。








关于版本问题：




下载线上应用是下载线上该应用的所有版本。miniSAE会自动绑定所有版本的域名。






**调试代码**




您应用的代码存默认放在解压后的安装包approot目录，您可以使用顺手的IDE进行开发调试。





**预览应用**




要想在本地调试您的应用，如有一个应用名为demoApp, 按照如下格式配置：




访问本地开发环境中的应用您需要输入：1.demoApp.test.sinaapp.com；




? ?访问线上需要输入：1.demoApp.sinaapp.com / demoApp.sinaapp.com





**[MySQL](http://sae.sina.com.cn/?m=devcenter&catId=192)管理**




通过本地[MySQL](http://sae.sina.com.cn/?m=devcenter&catId=192)，您可以管理您本地[MySQL](http://sae.sina.com.cn/?m=devcenter&catId=192)中数据表信息。





**本地开发环境升级**




您可以通过 "本地环境升级" 从而使本地开发环境及时与线上环境保持同步更新。






miniSAE与SAE区别




miniSAE目前还不能做到和线上SAE一模一样的模拟运行环境，主要体现在：




1，本地的调试环境没有线上丰富的后台管理功能；




2，sae_debug 函数，只是简单的模拟；




3，暂无cURL白名单功能；




4，yaml文件不支持[cron](http://sae.sina.com.cn/?m=devcenter&catId=195)段， 如有需要， 需要用户自己在Linux在crontab文件中配置；




5，accessky 和secrekey统一模拟一个固定默认值；




6，用户在本地测试环境安装推荐应用时，应当先到线上SAE创建该应用，否则数据库需要用户自己手工建立；




7，注意：本地?[storage](http://sae.sina.com.cn/?m=devcenter&catId=204)?文件url和线上的差别，推荐使用 getUrl 函数，提高应用程序兼容性；




8，不要使用IO函数操作除了SAE_TMP_PATH之外的目录；




9，不支持https；




10，[storage](http://sae.sina.com.cn/?m=devcenter&catId=204)?文件属性功能模拟暂且不全面。





miniSAE包文件组成




miniSAE文件主要包含两个方面：虚拟机镜像和自动安装脚本。其他还有[cron](http://sae.sina.com.cn/?m=devcenter&catId=195)程序等等。整个环境除了需要安装vmware player 之外， 是个绿色环境，运行完初始化脚本之后即可使用。





解压包顶级目录miniSAE下面包含以下文件及文件夹：




approot： 示例sae应用根目录, 下面自带了两个应用实例，用来测试环境兼容性




CentOS_vmware：虚拟机镜像文件夹




init_linux.sh：linux初始化脚本




init_win.bat*：widows初始化脚本




README：本文档




system：初始化业务脚本和[cron](http://sae.sina.com.cn/?m=devcenter&catId=195)程序以及其他的miniSAE初始化所需要的文件





CentOS_vmware 文件夹下面包含了以下主要文件：




CentOS.vmdk：镜像磁盘文件




CentOS.vmx：镜像配置文件




... : ? ? ? ?其他相关文件





system 包含以下文件：




controller，inc：初始化脚本文件夹




install.php：初始化脚本文件




... : ? ? ? ?其他辅助文件






交互式安装脚本介绍




**名词解释**




1，物理机（宿主机）：用户自己的安装了操作系统的电脑。




2，虚拟机（vmware player 或者vmware workstation）: 运行在物理机上面的软件，里面可以装其它操作系统。




3，Linux虚拟机：装了Linux系统的虚拟机。




4，share folder: 是vmware-tools工具提供的供虚拟机和物理机共享文件使用的一种功能。




5，应用根目录： 就是存放您所有应用的目录。





**安装脚本所作的工作包括**




1，首先检测用户OS类型，Linux下面还会检测有没有安装PHP。




2，检测用户是否安装了VMware, 如果没有提示用户安装。




3，配置应用根目录， 此目录会通过vmware共享到虚拟机中去。




4，自动检测vmware网络配置，然后为miniSAE Linux 虚拟机选择一个IP地址。




5，根据选定的IP配置miniSAE环境所需要的hosts。




6，配置[cron](http://sae.sina.com.cn/?m=devcenter&catId=195)或者task scheduler(windows) 任务, 用来实现hosts自动绑定。






miniSAE实现原理介绍




miniSAE是将用户物理机中的一个应用根目录（如approot）暴露到虚拟机中去，approot中的应用就会暴露给linux虚拟机中的apache，从而实现对应用的访问。





重要配置文件说明：




1，在物理机后台我们跑了一个定时程序host.cron.php用来实现应用的host自动绑定和检测。




2，虚拟机中在目录 /user/local/sae 包含了miniSAE依赖的各种软件包：有apache，[mysql](http://sae.sina.com.cn/?m=devcenter&catId=192)，php,?[memcache](http://sae.sina.com.cn/?m=devcenter&catId=201)，redis，swcs等等。




3，后运行了两个apache服务，一个msyql服务，一个redis服务，一个[memcache](http://sae.sina.com.cn/?m=devcenter&catId=201)服务。




4，另外后台还运行了以下几个脚本：




saelh_yam2appconfig.php：用来将应用的config.yaml脚本转换为.appconfig文件放在应用的根目录下面。




saelh_createvhost.php：用来检测添加删除的应用，对应用进行虚拟机内部host绑定，相关vhosts文件生成，tmfs目录建立，数据库建立等等。




saelh_rmtmpfs.php：用来实现定时清除[tmpfs](http://sae.sina.com.cn/?m=devcenter&catId=206)目录内容。




5，重要配置文件及文件夹：




虚拟机中：




/etc/rc.local: 做一些初始化配置工作, 如各种后台服务的启动。




apache，php，[mysql](http://sae.sina.com.cn/?m=devcenter&catId=192)相关配置文件。




6，创建，调试一个应用demoapp：




进入到应用更目录，如approot。




Mkdir demoapp/1 -p； 如果没有.svn目录最好再Mkdir demoapp/.svn -p；不建议使用旧版的目录结构。




此时虚拟机saelh_createvhost.php会为此应用创建相应的vhost文件，并将目录重新绑定到统一的一个目录下面。物理机中定时程序会为该应用绑定host（这需要1min时间）。




进入到 demoapp/1， 执行 echo 'hello.php




访问：1.demoapp.test.sinaapp.com/hello.php。 此请求首先被发送到虚拟机中80端口的apache，然后被反向代理到81端口的apache，由其完成最终的请求并返回结果。







miniSAE 各项功能模拟




1，Config.yaml:




Config.yaml实现了类似apache .htaccess 功能，该功能有地址的apache和php扩展模块实现！




2，应用路由(多应用同时访问)功能:




该功能我们利用了apache方向代理功能和为每个应用建立一个vhosts文件来实现。




3，?[memcache](http://sae.sina.com.cn/?m=devcenter&catId=201):




用了原生的[memcache](http://sae.sina.com.cn/?m=devcenter&catId=201)服务和定制的[memcache](http://sae.sina.com.cn/?m=devcenter&catId=201)?php模块来实现memcache_init。




4，[mysql](http://sae.sina.com.cn/?m=devcenter&catId=192)：




即为原生的[mysql](http://sae.sina.com.cn/?m=devcenter&catId=192)编译而成。




5，[storage](http://sae.sina.com.cn/?m=devcenter&catId=204)：




利用本地文件系统来实现，服务跑在反向代理的apache 8888端口上面。




6，vcode：




服务跑在反向代理的apache 8888端口上面。




7，?[image](http://sae.sina.com.cn/?m=devcenter&catId=198):




利用PHP magicwand扩展实现， 服务跑在反向代理的apache 8888端口上面。




8，[rank](http://sae.sina.com.cn/?m=devcenter&catId=202):




利用redis和msyql模拟而成。




9，[kvdb](http://sae.sina.com.cn/?m=devcenter&catId=199):




通过redis模拟而成。




10，fetchrul:




由cURL模拟而成。




11，[mail](http://sae.sina.com.cn/?m=devcenter&catId=200)：




由phpMailer模拟而成。




12，[Tmpfs](http://sae.sina.com.cn/?m=devcenter&catId=206), openbase dir:




由php_admin_value，php_value指令配置而实现。




13，Wrapper模拟:




未改动。




14，segment 分词服务：




由scws模拟实现。






FAQ




**1，什么是miniSAE?**




miniSAE 运行在用户电脑里面的虚拟机上面的仿真SAE环境。





**2，如何使用miniSAE?**




下载miniSAE镜像，按照里面的安装说明安装使用即可。





**3，sharedfolder 应用根目录目录被disable了, 怎么办？**




你可以手动设置挂载上该目录。





**4，hosts自动检测功能失效？**




安装时如果有杀毒软件提示修改hosts文件，请允许通过。





**5，我如何手动配置环境?**




不建议手动配置，因为比较麻烦，如有兴趣请参考文档：[手动配置miniSAE说明](http://sae.sina.com.cn/?m=devcenter&catId=231&content_id=275)。





**6，虚拟机中网卡没有启动怎么办？**




虽然大部分时候不会遇到这种情况，但不幸总是会发生。如果您配到这种情况，首先确认你的挂载目录已经生效。然后运行/etc/init.d/network restart, 如果还是不行，重启虚拟机吧， 基本都能解决问题。





**7， 我想换一个应用根目录，可以么？**




可以，您可以通过管理后台，自行挂载其他目录作为应用根目录。不过，不建议这么做， 因为在您初次安装环境的时候，我们在您的应用根目录创建了一个隐藏文件夹用来作为虚拟机和物理机交流一些信息的渠道， 如果您移动了，那么有些功能将不能正常使用。








**8， 能否将[storage](http://sae.sina.com.cn/?m=devcenter&catId=204)中的文件同步到本地？**




目前支持同步线上代码，数据库结构等；[storage](http://sae.sina.com.cn/?m=devcenter&catId=204)仅同步domain名称。






**9，哪里我可以了解到更多关于miniSAE的信息？**




请参见?[SAE官方微博](http://e.weibo.com/saet)?和?[SAE文档中心](http://sae.sina.com.cn/?m=devcenter)?了解更多的关于这方面的信息。




寻求帮助请于?[开发者论坛](http://cloudbbs.org/forum.php)?咨询。
