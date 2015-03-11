---
author: Yourtion
comments: true
date: 2011-01-09 06:01:18+00:00
excerpt: 几行代码实现利于google引擎收录抓取的动态sitemap.xml
layout: post
slug: shlcms-generation-sitemap
title: SHLCMS实现sitemap.xml生成
wordpress_id: 1766
categories:
- SHLCMS
tags:
- PHP
- 深喉咙CMS
---
{% include JB/setup %}

来自：http://www.shenhoulong.net/viewthread.php?tid=7980&highlight=sitemap

在admini文件中找到login.php文件，找到if($_GET['act']=='logout')这个函数
替换为以下代码，这个是修改过的了，上次帖子中有错误，使用的请修改成以下最新代码。

```php
if($_GET['act']=='logout')
{
	global $db,$sitemap_list;
	$siteMenu = '';
	$siteClass = '';
	$sql = "select * from `".TB_PREFIX."menu` where deep='0' and isHidden='0'";
	$sitemap_list = $db->get_results($sql);
	if(!empty($sitemap_list))
	{
		foreach($sitemap_list as $o){
		if($o->isExternalLinks==1)
			$loc = 'http://'.$_SERVER['HTTP_HOST'].$o->redirectUrl;
		else
			$loc = 'http://'.$_SERVER['HTTP_HOST'].'/?p='.$o->id;

		$siteMenu .= "\r\n$loc\r\n".date("Y-m-d")."\r\nmonthly\r\n
		1.0\r\n\r\n";

		$sql = "select * from `".TB_PREFIX."menu` where deep='1' and isHidden='0' and parentId=".$o->id;
		$MapChildren = $db->get_results($sql);
		if(!empty($MapChildren))
		{
			foreach($MapChildren as $subMap){
				if(substr($o->redirectUrl,4)!==$subMap->id)
				$siteClass .= "\r\nhttp://".$_SERVER['HTTP_HOST'].'/?p='."$subMap->id\r\n".date("Y-m-d")."\r\nweekly\r\n
				0.8\r\n\r\n";
			}
		}
	}
}
$sitemapheader = '<!--?xml version="1.0" encoding="UTF-8"?-->
';
string2file($sitemapheader."\r\n".$siteMenu."\r\n".$siteClass.'',ABSPATH.'/sitemap.xml');
@session_start();
@session_destroy();
setcookie('username','');
setcookie('pwd','');
setcookie(session_name(),'',time()-3600);
$_SESSION = array();
}
```

原理很简单就是改动了后台注销登陆响应函数每次后台退出时调用代码生成新的```sitemap.xml```。复制修改代码后在网站根目录下手动建立一个```sitemap.xml```，用记事本另存为UTF-8编码。登陆后台、退出后台、检查```sitemap.xml```是否更新。到google站长管理中提交自己站的sitemap.xml吧。

注意：其中修改时间采用退出时间，优先级```priority```、更新频率```changefreq```，用户自身需要调整。高级用户可以改动数据库```shl_menu```表，修改栏目保存时写进时间，后台退出时读时间到```sitemap.xml```中。

此功能支持深喉咙3.8中文版，生成动态的```sitemap.xml```（也就是生成的```sitemap```中的链接没有采用静态化，而且该```sitemap```每次在你退出后台时都自动更新），需要中英或者是静态化的sitemap自行修改（原理类似）。
