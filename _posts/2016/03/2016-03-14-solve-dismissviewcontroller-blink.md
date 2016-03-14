---
layout: post
date: 2016-03-14 13:44:09 +08:00
slug: solve-dismissviewcontroller-blink
title: "巧妙化解dismissViewController闪烁问题"
author: Yourtion
keywords: ["dismissViewController","modalPresentationStyle","modalTransitionStyle"]
description: "巧妙化解dismissViewController闪烁问题,modalPresentationStyle设置为OverCurrentContext，modalTransitionStyle设置为CrossDissolve"
category: "iOS"
tags: ["解决问题"]
---
{% include JB/setup %}

## 问题描述

最近项目里面涉及到一个解锁的界面，这个提示解锁界面在 `present` 一个人脸解锁的 `ViewController` ，人脸解锁完成后会有一个 `delegate` 回调人脸验证结果，并且人脸验证界面自动 `dismiss` 掉。

如果解锁成功的话，逻辑上人脸验证界面一 `dismiss` 掉就应该显示 app 的主界面，相对于提示解锁界面在人脸验证 `dismiss` 同时应该消失。而人脸验证失败的话，提示解锁界面就应该继续覆盖在主界面上，给用户更多提示并引导进一步的操作。

这里面就涉及到 `ViewController` 生命周期的问题，由提示解锁界面 `present` 的人脸验证界面没有完全 `dismiss` 之前是没办法 dismiss 掉解锁界面的，否则就可能出现空指针等问题。

同时使用的SDK并没有回调 `viewWillDisappear` 事件，所以 `delegate` 回调跟 `viewWillDisappear` 的关系与顺序是不可预测的。如果在 `delegate` 回调中执行 `dismiss`，那么在人脸验证界面消失的时候就会看到提示解锁界面闪了一下。

本来打算使用 `UIView` 来解决这个问题，但是因为 `UIView` 没有办法接受 `delegate` 回调，就会引入更多奇怪的问题。最后终于想到了一个不算特别优雅，但是很巧妙的方式解决这个问题。分享之，希望对你有帮助。

## 解决思路

既然不能直接 `dismiss`，那么是否可以将这个 `ViewController` 透明呢，也就是在人脸验证界面 `present` 完成后，将提示解锁界面变成透明的，然后如果回调结果不是，马上设置提示解锁界面为原来的值。

经过查找资料和做了简单的原型验证后，发行这个方法可行，也很简单，下面以 `Swift` 代码简单进行演示

## 解决方法

首先在显示解锁提示页面设置相关的属性，这里以 `Segue` 实现为例。

主要设置两个参数：

- `modalPresentationStyle` 设置为 `OverCurrentContext`
- `.modalTransitionStyle` 设置为 `CrossDissolve`


```swift
override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject!) {
  if (segue.identifier == "ShowLockVC") {
    let lockedVC : LockedViewController = segue.destinationViewController as! LockedViewController
    lockedVC.modalPresentationStyle = .OverCurrentContext
    lockedVC.modalTransitionStyle = .CrossDissolve
  }
}

```

接下来当人脸验证界面 `present` 完成后将当前界面（解锁提示）的 `alpha` 设置为 0，让界面透明：

```swift
self.presentViewController(faceVerifyView as! UIViewController, animated: true, completion: { () -> Void in
   self.view.alpha = 0
})
```

最后就是处理人脸验证回调结果，如果成功则 `dismiss` 解锁提示界面（人脸验证界面会自动 `dismiss`）：

```swift
func superID(sender: SuperID!, faceVerifyResponse state: SIDFACEVerifyState) {
  if (state == SIDFACEVerifyState.SIDFaceVerifySucceed) {
    self.dismissViewControllerAnimated(false, completion: nil)
  } else {
    self.view.alpha = 1
  }
}
```

问题就这样解决了。

### 参考

- [《Presenting a View Controller》](https://developer.apple.com/library/ios/featuredarticles/ViewControllerPGforiPhoneOS/PresentingaViewController.html)
- [《关于presentViewController的后的background变黑的问题》](http://blog.csdn.net/chaoyuan899/article/details/38390507)
