---
author: Yourtion
comments: true
date: 2011-12-25 05:55:39+00:00
excerpt: 自己的微博http://t.yourtion.com已经荒废好一段时间了，前段时间把Pagecookery升级到0.9.8，支持了新浪微博的同步导入和发布，但是一直没有去弄，趁着有时间，稍微测试和改进了一下他的新浪微博同步部分，只同步原创微博部分，和大家交流一下，大家可以举一反三自己测试，更加熟悉新浪微博的API。
layout: post
slug: sina-api-user_timeline-original
title: 新浪微博API使用user_timeline获取用户原创微博
wordpress_id: 3522
categories:
- PHP
tags:
- OAuth
- sina
---
{% include JB/setup %}

自己的微博 http://t.yourtion.com 已经荒废好一段时间了，前段时间把Pagecookery升级到0.9.8，支持了新浪微博的同步导入和发布，但是一直没有去弄，趁着有时间，稍微测试和改进了一下他的新浪微博同步部分，只同步原创微博部分，和大家交流一下，大家可以举一反三自己测试，更加熟悉新浪微博的API。

Pagecookery的微博同步是通过```Oauth```认证，之后使用```json```进行数据的抓取，对于抓取用户微博使用```user_timeline```的接口，也就是 https://api.weibo.com/2/statuses/user_timeline.json 。我看来一下接口文档，请求参数里面有一个：```feature```，是用来过滤请求的类型（过滤类型ID，0：全部、1：原创、2：图片、3：视频、4：音乐，默认为0。）由于默认是0，所以会抓取全部微博。

改造方法，在请求```json```的时候带上```feature```参数，可以使用 https://api.weibo.com/2/statuses/user_timeline.json?feature=1 。但是我这样改造没有成功，因为他的抓取依赖oauth->get的类，我在类中加入参数```$param['feature']=1;```这样抓取时就可以过滤掉非原创的成分。

关于新浪API的研究还是皮毛阶段，希望各位不要见笑，大家多多交流，共同进步。

对于Oauth还有疑问的可以看看我之前的：[《新浪微博OAuth认证详解及验证数据储存》](/sina-oauth-verification-storage.html)、[《新浪微博API使用OAuth认证发布微博实例》](/sina-api-oauth-released-microblog.html)

关于user_timeline请求参数如下表：
<table cellpadding="0" width="100%" cellspacing="0" border="1" >
<tbody >
<tr >

必选
类型及范围
说明
</tr>
<tr >

<td >source
</td>

<td >false
</td>

<td >string
</td>

<td >采用OAuth授权方式不需要此参数，其他授权方式为必填参数，数值为应用的AppKey。
</td>
</tr>
<tr >

<td >access_token
</td>

<td >false
</td>

<td >string
</td>

<td >采用OAuth授权方式为必填参数，其他授权方式不需要此参数，OAuth授权后获得。
</td>
</tr>
<tr >

<td >uid
</td>

<td >false
</td>

<td >int64
</td>

<td >需要查询的用户ID。
</td>
</tr>
<tr >

<td >screen_name
</td>

<td >false
</td>

<td >string
</td>

<td >需要查询的用户昵称。
</td>
</tr>
<tr >

<td >since_id
</td>

<td >false
</td>

<td >int64
</td>

<td >若指定此参数，则返回ID比since_id大的微博（即比since_id时间晚的微博），默认为0。
</td>
</tr>
<tr >

<td >max_id
</td>

<td >false
</td>

<td >int64
</td>

<td >若指定此参数，则返回ID小于或等于max_id的微博，默认为0。
</td>
</tr>
<tr >

<td >count
</td>

<td >false
</td>

<td >int
</td>

<td >单页返回的记录条数，默认为50。
</td>
</tr>
<tr >

<td >page
</td>

<td >false
</td>

<td >int
</td>

<td >返回结果的页码，默认为1。
</td>
</tr>
<tr >

<td >base_app
</td>

<td >false
</td>

<td >int
</td>

<td >是否只获取当前应用的数据。0为否（所有数据），1为是（仅当前应用），默认为0。
</td>
</tr>
<tr >

<td >feature
</td>

<td >false
</td>

<td >int
</td>

<td >过滤类型ID，0：全部、1：原创、2：图片、3：视频、4：音乐，默认为0。
</td>
</tr>
<tr >

<td >trim_user
</td>

<td >false
</td>

<td >int
</td>

<td >返回值中user信息开关，0：返回完整的user信息、1：user字段仅返回user_id，默认为0。
</td>
</tr>
</tbody>
</table>
