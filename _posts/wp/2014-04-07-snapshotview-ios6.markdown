---
author: Yourtion
comments: true
date: 2014-04-07 04:57:56+00:00
excerpt: 最近在做一个项目，使用了FMMoveTableView，使得UITableView的Cell能够长按拖动。但是在iOS6下出现崩溃的情况，研究一番，发现是库中使用了snapshotViewAfterScreenUpdates，这个API是iOS7特有的，所以就写个兼容方案，让FMMoveTableView可以在iOS6下正常运行。
layout: post
slug: snapshotview-ios6
title: snapshotViewAfterScreenUpdates兼容iOS6
wordpress_id: 3993
categories:
- iOS
---
{% include JB/setup %}

最近在做一个项目，使用了```FMMoveTableView```，使得```UITableView```的```Cell```能够长按拖动。但是在iOS6下出现崩溃的情况，研究一番，发现是库中使用了```snapshotViewAfterScreenUpdates```，这个API是iOS7特有的，所以就写个兼容方案，让```FMMoveTableView```可以在iOS6下正常运行。

原理也很简单，使用UIGraphicsGetCurrentContext，将需要移动的cell进行截图，代替snapshotViewAfterScreenUpdates，这样效率各方面可能没那么高，到时运行过程基本不能察觉。

代码如下：

```objc
snapShot = [[UIView alloc]initWithFrame:touchedCell.frame];
UIGraphicsBeginImageContextWithOptions(touchedCell.bounds.size, YES, 1);
[touchedCell.layer renderInContext:UIGraphicsGetCurrentContext()];
UIImage *viewImage = UIGraphicsGetImageFromCurrentImageContext();
UIGraphicsEndImageContext();
UIImageView *shot = [[UIImageView alloc]initWithImage:viewImage];
[snapShot addSubview:shot];
```

更具体的代码可以参见：[https://github.com/yourtion/FMMoveTableView/commit/586f5001fbc3d260e3f1dc4b1c7b11ff579bdfb7](https://github.com/yourtion/FMMoveTableView/commit/586f5001fbc3d260e3f1dc4b1c7b11ff579bdfb7)

但是作者已经明确说不再支持iOS6了（https://github.com/FlorianMielke/FMMoveTableView/pull/22）。需要兼容的同学可以在我的git上拉版本（[https://github.com/yourtion/FMMoveTableView](https://github.com/yourtion/FMMoveTableView)）让FMMoveTableView兼容iOS6。

