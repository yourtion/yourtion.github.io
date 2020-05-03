---
layout: post
date: 2016-07-18 17:37:24 +0800
slug: fix-reactnative-use-cameraroll-undefined
title: "解决ReactNative使用CameraRoll时undefined错误"
author: Yourtion
keywords: ["ReactNative", "CameraRoll undefined", "CameraRoll getPhotos undefined"]
description: "ReactNative出现 Cannot read property 'getPhotos' of undefined 错误解决方法"
category: "解决问题"
tags: ["React Native", "iOS"]
---
{% include JB/setup %}

最近在学习 ReactNative ，写到 CameraRoll 相关的 [CameraRoll Demo](https://github.com/yourtion/LearningReactNative/blob/master/DemoAPIs/CameraRollDemo.js) 时候，一直出现 `Cannot read property 'getPhotos' of undefined` 错误。

[![]({{ IMAGE_PATH }}2016/07/RN_CameraRoll_0.png)]({{ IMAGE_PATH }}2016/07/RN_CameraRoll_0.png)

这里 return 的 `RCTCameraRollManager.getPhotos(params);` 是一个原生的模块 :

[![]({{ IMAGE_PATH }}2016/07/RN_CameraRoll_1.png)]({{ IMAGE_PATH }}2016/07/RN_CameraRoll_1.png)

```javascript
var RCTCameraRollManager = require('NativeModules').CameraRollManager;
```

研究了一下工程，发现根本没有相关的项目，只好手动添加，步骤如下：

将 `RCTCameraRoll.xcodeproj` 工程添加到现有工程中：

[![]({{ IMAGE_PATH }}2016/07/RN_CameraRoll_2.png)]({{ IMAGE_PATH }}2016/07/RN_CameraRoll_2.png)

路径位于 `node_modules/react-native/Libraries/CameraRoll`

[![]({{ IMAGE_PATH }}2016/07/RN_CameraRoll_3.png)]({{ IMAGE_PATH }}2016/07/RN_CameraRoll_3.png)

添加静态库依赖：

[![]({{ IMAGE_PATH }}2016/07/RN_CameraRoll_4.png)]({{ IMAGE_PATH }}2016/07/RN_CameraRoll_4.png)

[![]({{ IMAGE_PATH }}2016/07/RN_CameraRoll_5.png)]({{ IMAGE_PATH }}2016/07/RN_CameraRoll_5.png)

大功告成：

[![]({{ IMAGE_PATH }}2016/07/RN_CameraRoll_6.png)]({{ IMAGE_PATH }}2016/07/RN_CameraRoll_6.png)
