---
author: Yourtion
comments: true
date: 2010-11-16 01:05:28+00:00
layout: post
slug: joomla-common-functions-resolve
title: Joomla常用功能解析
wordpress_id: 1582
categories: 
- PHP
tags: 
- Joomla
---
{% include JB/setup %}

获得表单提交数据： 

```php
JRequest::getCmd( 'task' ); JRequest::getInt('limit', 0); JRequest::getVar('message', '');
```

绑定模板数据：```view.html.php: $this->assignRef('lists', 'value');```

网站名： ```$mainframe->getCfg('sitename');```

获得管理员名称与邮箱:

```php
$mainframe->getCfg('mailfrom'); $mainframe->getCfg('fromname');
```

配置文件设置方法:

```php
// Get the path of the configuration file $fname = JPATH_CONFIGURATION.DS.'configuration.php';  // clear cache $cache = JFactory::getCache(); $cache->clean();
// Update the credentials with the new settings $config =& JFactory::getConfig(); $config->setValue('config.form_email', 'xxx');
// Get the config registry in PHP class format and write it to configuation.php jimport('[Joomla](http://joomla.kuaizhanbao.com/).filesystem.file'); if (!JFile::write($fname, $config->toString('PHP', 'config', array('class' => 'JConfig')))) { $msg = JText::_('ERRORCONFIGFILE'); }
```

路 由地址为HTML全地址: ```JRoute::_( 'index.php?option=com_ccNewsletter' );```

绝对地址： ```JPATH_COMPONENT```

组件地址，前台、后台 ```JPATH_ADMINISTRATOR```

组件路径后台 ```JPATH_COMPONENT_SITE```

组件路径前台 ```JPATH_ROOT``` 根目录

日历： 

```php
<?php 
echo JHTML::_(
	'calendar', 
	'1980-1-1', 
	'ielts_score_date', 
	'ielts_score_date', 
	'%Y-%m-%d', 
	array('class'=>'short', 
			'size'=>'25',  
			'maxlength'=>'19'
		)
); 
?>

JHTML::_('date',  $this->list->modified, JText::_('DATE_FORMAT_LC2') )
```

载入脚本：``` JHTML::script('upload.js', 'components/com_smipa/js/', false); JHTML::_('behavior.mootools');```

获得全局对象：

```php
$user = &JFactory::getUser(); 
$db = &JFactory::getDBO(); 
$document = &JFactory::getDocument(); 
$lang = &JFactory::getLanguage();
```

数据库对象操作：

```php
$db = &JFactory::getDBO();
$db->setQuery($sql); 
$db->loadObjectList();
```

对象列表

```php
 $db->loadObject();
```

一行对象 

```php
$db->loadResult();
```

单个结果

```php
$db->Quote();
```

过滤敏感字Document对象操作：

```php
$document->addStyleSheet(url); $document->addScript(url);
```

语言对象操作：

```php
$lang->_lang === 'en-GB' or $lang->_lang === 'zh-TW'
```

用户对象操作:

```php
$user->get('guest') //是否登录,登录了返回false
```

获得组件的Menuid：

```php
$menu = &JSite::getMenu(); 
$Items = $menu->getItems('link', 
			'index.phpoption=com_idoblog&view=idoblog'); 
$Itemid=$Items[0]->id;
```

获得当前Menuid:

```php
$menus = &JSite::getMenu(); 
$menu = $menus->getActive();
```

发送Email:

```php
$sent = JUtility::sendMail($email, $contactname, $adminmail, $subject, $body, true); if (!$sent) { $this->setError("Send email failed."); }
```

修改默 认提示信息：

>libraries\Joomla\document\html\renderer\message.php

Javascript弹 出小窗口：

```html
<a href="/xx" rel="{handler: 'iframe', size: {x: 570, y: 350}}">xx</a>
```
