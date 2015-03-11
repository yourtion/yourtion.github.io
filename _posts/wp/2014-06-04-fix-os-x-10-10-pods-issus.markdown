---
author: Yourtion
comments: true
date: 2014-06-04 09:34:20+00:00
excerpt: 解决OS X 10.10 Pod kernel_require.rb:55 cannot load such file xcodeproj
layout: post
slug: fix-os-x-10-10-pods-issus
title: 解决OS X 10.10 Pod 出错问题
wordpress_id: 3997
categories:
- iOS
tags:
- Pod
---
{% include JB/setup %}

昨天升级到Mac OS X 10.10 Yosemite，今天用pod添加库的时候发现出现问题了，pod install 出现下面的错误：

```
/System/Library/Frameworks/Ruby.framework/Versions/2.0/usr/lib/ruby/2.0.0/rubygems/core_ext/kernel_require.rb:55:in `require': cannot load such file -- xcodeproj/prebuilt/universal.x86_64-darwin14-2.0.0/xcodeproj_ext (LoadError)
    from /System/Library/Frameworks/Ruby.framework/Versions/2.0/usr/lib/ruby/2.0.0/rubygems/core_ext/kernel_require.rb:55:in `require'
    from /Library/Ruby/Gems/2.0.0/gems/xcodeproj-0.16.1/lib/xcodeproj/ext.rb:6:in `rescue in <top (required)>'
    from /Library/Ruby/Gems/2.0.0/gems/xcodeproj-0.16.1/lib/xcodeproj/ext.rb:3:in `<top (required)>'
    from /System/Library/Frameworks/Ruby.framework/Versions/2.0/usr/lib/ruby/2.0.0/rubygems/core_ext/kernel_require.rb:55:in `require'
    from /System/Library/Frameworks/Ruby.framework/Versions/2.0/usr/lib/ruby/2.0.0/rubygems/core_ext/kernel_require.rb:55:in `require'
    from /Library/Ruby/Gems/2.0.0/gems/xcodeproj-0.16.1/lib/xcodeproj.rb:30:in `<top (required)>'
    from /System/Library/Frameworks/Ruby.framework/Versions/2.0/usr/lib/ruby/2.0.0/rubygems/core_ext/kernel_require.rb:55:in `require'
    from /System/Library/Frameworks/Ruby.framework/Versions/2.0/usr/lib/ruby/2.0.0/rubygems/core_ext/kernel_require.rb:55:in `require'
    from /Library/Ruby/Gems/2.0.0/gems/cocoapods-0.32.1/lib/cocoapods.rb:2:in `<top (required)>'
    from /System/Library/Frameworks/Ruby.framework/Versions/2.0/usr/lib/ruby/2.0.0/rubygems/core_ext/kernel_require.rb:55:in `require'
    from /System/Library/Frameworks/Ruby.framework/Versions/2.0/usr/lib/ruby/2.0.0/rubygems/core_ext/kernel_require.rb:55:in `require'
    from /Library/Ruby/Gems/2.0.0/gems/cocoapods-0.32.1/bin/pod:32:in `<top (required)>'
    from /usr/bin/pod:23:in `load'
    from /usr/bin/pod:23:in `<main>'
```

找了一下，找到解决的方法：

首先安装Xcode6 的 ```Command Line Tools```，在开发者中心下载

接下来按照下面步骤操作：
	
  1. 打开 Xcode 6
  2. 打开 ```Preferences```
  3. 选择 ```Locations```选项卡
  4. 将 ```Command Line Tools```选择为 ```Xcode 6.0```
  5. 卸载 ```cocoapods```执行```$ sudo gem uninstall cocoapods```
  6. 安装 ```xcodeproj```执行```$ sudo gem install xcodeproj```
  7. 再安装 ```cocoapods```执行```$ sudo gem install cocoapods```

最后运行 ```pod --version```

就看到Pod正常了。

_参考：[https://github.com/CocoaPods/CocoaPods/issues/2219#issuecomment-44979127](https://github.com/CocoaPods/CocoaPods/issues/2219#issuecomment-44979127)_
