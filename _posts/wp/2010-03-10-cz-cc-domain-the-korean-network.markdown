---
author: Yourtion
comments: true
date: 2010-03-10 23:44:32+00:00
excerpt: cz.cc域名被封与朝鲜网络的发展~
layout: post
slug: cz-cc-domain-the-korean-network
title: cz.cc域名与朝鲜网络~
wordpress_id: 682
categories:
- 事件看法
tags:
- 域名
- 路由
---
{% include JB/setup %}

之前就写了一篇关于CZ.CC域名不能访问的文章：[cz.cc域名被封？](/?=673)

昨天上Funkey看到他这么写：

还在使用CZ.CC免费域名的朋友目前还可以通过代理访问 www.nic.cz.cc 进行域名的各种设置，不过建议尽快更换域名，CZ.CC的主站已经无法访问，它的NS被水产也只是时间问题。

有兴趣的朋友可以在命令行中输入 tracert www.nic.cz.cc，将得到的最后一个IP通过www.ip138.com查询，不出意外的话，应该显示的是网通或者电信的骨干网络，这应该就是传说中XXX的位置了^^。

有时候想想上面的一些大大们跟这些个免费域名较劲实在是有失水准，不过和朝鲜比起来，俺们已经很幸福了，朝鲜的互联网是和国际互联网完全断开的，www.Google.com在朝鲜才真是个传说。

我 tracert到最后的IP是219.158.13.181。经过IPwhois后结果如下：


<blockquote>inetnum: 219.158.0.0 - 219.158.31.255
netname: ChinaUnicom-BACKBONE
country: CN
descr: Backbone of China Unicom
admin-c: CH444-AP
tech-c: CH444-AP
status: ALLOCATED NON-PORTABLE
changed: abuse@cnc-noc.net 20050121
mnt-by: MAINT-CNCGROUP
mnt-routes: MAINT-CNCGROUP-RR
source: APNIC

route: 219.158.0.0/20
descr: China Unicom Backbone
country: CN
origin: AS4837
mnt-by: MAINT-CNCGROUP-RR
changed: abuse@cnc-noc.net 20050217
source: APNIC

person: CNCGroup Hostmaster
nic-hdl: CH444-AP
e-mail: abuse@cnc-noc.net
address: No.156,Fu-Xing-Men-Nei Street,
address: Beijing,100031,P.R.China
phone: +86-10-82993155
fax-no: +86-10-82993144
country: CN
changed: abuse@cnc-noc.net 20041220
mnt-by: MAINT-CNCGROUP
source: APNIC</blockquote>


稍微解释一下：

Backbone of China Unicom——中国联通骨干网，然后其他的就没什么好说 。status: ALLOCATED NON-PORTABLE这个应该是说没有分配给可移动段但是不知在哪里~应该就是河蟹的一个爪牙~XXX所在啦···

里面还说到朝鲜的互联网，我也就Google了一下。

2005年新浪新闻(http://news.sina.com.cn/w/2005-01-06/13555446766.shtml):

** 平壤只有两个网吧**
“上网冲浪”这个早已在国内风行了近十年的词语在朝鲜一直是名副其实的奢侈活动。因特网自产生以来，朝鲜普通老百姓一直与其绝缘。一直到2004年，在平壤也只有两个网吧--世界粮食计划署内部的网吧和使馆区由韩国Hunnet公司开设的一家网吧。
**点击一次就要登录一次**
4月初，正当我们还沉浸在上网冲浪的快乐中时，Unterbeck沮丧地通知我们，朝鲜电脑中心决定暂停此项因特网接入服务。直到7月初，我们接到朝方通知，朝鲜电脑中心决定重新对驻朝外国人开通因特网接入服务，但这次要到国际电信局登记注册。在登记注册的手续表中，记者注意到每个注册单位和个人必须按规定在一个叫www.kcckp. net的网站上注册一个信箱，并当场提供登录名和密码。**朝鲜百姓享用国内局域网**
绝缘了半年之久的记者终于又可以体会到上网冲浪的快感。但平均接入速度只有31k，而且极不稳定，网页打开的速度让人无法忍受，更别提图片了，往往发一封20个字的信需要20分钟甚至更长的时间。比之于我们在上网时遇到的这样那样的不便和无奈，朝鲜普通百姓似乎比我们更幸运一些。他们也有自己使用的网络——“光明网”，它是一种覆盖全国各个道、市、郡的国内局域网，但不与因特网相连。内容包括政治、经济、科学、文化等各方面的知识。朝鲜早在2000年就完成了该网的建设，并开始在全国范围内投入使用，朝鲜国内用户只需到各电话分局办理入网申请手续，即可通过电话线上网，无需支付入任何网费。

2008年的光明网(http://www.gmw.cn/content/2008-05/12/content_772526.htm)说

**即使开放，步子也不会太大**

目前，朝鲜官方没有发布有关解禁手机或开放国际互联网的任何消息，韩日媒体有关朝鲜可能于今年４月解禁手机这一报道的准确性也无从考证。

值得注意的是，朝鲜在今年的新年三报共同社论中提出了要"总集中、总动员，发展经济，建设社会主义强盛大国"的发展目标。而要实现这一发展目标，朝鲜就需要加快融入国际社会的步伐。从长远看，向民众开放手机和国际互联网应是朝鲜融入国际社会进程中的一个有益步骤。在移动通信方面，除了朝鲜与埃及公司合作开展手机业务的报道外，还有消息称，朝鲜和韩国也在探讨在平壤和南浦一带构建ＣＤＭＡ通信网方面开展合作。在开放国际互联网方面，有报道称，朝鲜正在加紧进行接入国际互联网时的防火墙的研究和政府机构、ＩＴ机构、科研机构之间数据交换的加密研究，为开放国际互联网做前期准备。

然后我就没有找到更加新更加可靠的资料了~据说有五条光纤与北京互联。但是应该还是官方的吧~

一直在抱怨国内互联网管得严~现状才知道那句话： **不要抱怨没有鞋，因为有很多人没有脚** 的真谛啊····
