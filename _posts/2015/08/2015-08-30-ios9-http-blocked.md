---
layout: post
date: 2015-08-30 21:11:51
slug: ios9-http-blocked
title: "解决iOS9下blocked cleartext HTTP"
author: Yourtion
keywords: ["NSAppTransportSecurity", "NSAllowsArbitraryLoads", "ios blocked cleartext"]
description: "解决Xcode7编写iOS9应用时提示blocked a cleartext HTTP问题，"
category: "ios"
tags: ["解决问题"]
---
{% include JB/setup %}


使用Xcode7编写iOS9应用时，如果获取http://数据时会报如下错误：

> App Transport Security has blocked a cleartext HTTP (http://) resource load since it is insecure. Temporary exceptions can be configured via your app's Info.plist file.

原因：从iOS9起，新特性要求App访问网络请求，要采用 HTTPS 协议。 

如果仍想要使用HTTP协议，解决办法如下，修改项目的 `Info.plist` 文件，增加以下内容：

```xml
<key>NSAppTransportSecurity</key>
<dict>
   <key>NSAllowsArbitraryLoads</key>
   <true/>
</dict>
```

如果觉得直接修改文件太麻烦，可以在项目的 `Info` 直接通过界面添加配置：

1. 在 `Info` 中添加 `NSAppTransportSecurity` 类型 `Dictionary` ;
2. 在 `NSAppTransportSecurity` 下添加 `NSAllowsArbitraryLoads` 类型 `Boolean` ，值设为 `YES` ;

完成后如下图：

[![NSAppTransportSecurity]({{ IMAGE_PATH }}2015/08/NSAppTransportSecurity.JPG)]({{ IMAGE_PATH }}2015/08/NSAppTransportSecurity.JPG)

