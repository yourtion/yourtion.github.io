---
layout: post
date: 2017-07-07 14:35:34 +08:00
slug: fastlane-ios-build-multiple-apple-id
title: "Fastlane构建多个AppleID的IPA包"
author: Yourtion
keywords: ["Fastlane", "Multiple AppleID", "iOS"]
description: "最近在做一个基于 Fastlane 的构建脚本，但是因为有一个 iOS 的项目有基于多个 AppleID 发布的包，也就是多个影子项目，简单地基于一个配置构建多个 IPA 输出"
category: "iOS"
tags: ["CI", "Fastlane"]
---
{% include JB/setup %}

最近在做一个基于 Fastlane 的构建脚本，但是因为有一个 iOS 的项目有基于多个 AppleID 发布的包，也就是多个影子项目，你懂的，那么能不能简单地基于一个配置构建多个 IPA 输出呢，研究了一下 Fastlane 的文档，实现起来还是很简单。

## 准备工作

首先对项目添加多个 target，这样方便管理各个影子APP的图标等内容，这里就不赘述了，可以参考下面两篇文章实现。

- [《Xcode —— 使用Multi-Target管控相似 App》](http://www.jianshu.com/p/a29a4fbe781d)
- [《iOS开发时，在Xcode中添加多个targets进行版本控制》](http://blog.csdn.net/ysysbaobei/article/details/10951991)

假设添加后就有两个 target 和 scheme 分别为 `project` 和 `projectClone`

## Applefile配置

首先配置好一个简单的 Fastlane，假设 AppleIDMaster 是主要的 AppleID，包括内部发布测试也是主要用这个，那么 Appfile 的内容一开始如下：

```ruby
app_identifier "com.yourtion.project"
apple_id "AppIDMaster@yourtion.com"
team_id "XXXXXXXXX"
```

然后添加一个 `for_lane` 字段，加入 `AppleIDClone` 这个打影子包的 ID，根据 Fastlane 的文档，这样针对特定的 lane 就会使用这个特定的信息，Appfile 更新如下：

```ruby
app_identifier "com.yourtion.project"
apple_id "AppIDMaster@yourtion.com"
team_id "XXXXXXXXX"

for_lane :releaseClone do
	app_identifier "com.yourtion.projectClone"
	apple_id "AppIDClone@yourtion.com"
	team_id "XXXXXXXXX"
end
```

## Fastfile配置

最简单的配置就是在把原有 `release` 配置复制一份，改名为 `releaseClone`，然后把 `scheme` 改了就好了，但是这很不优雅，这里直接贴出我的解决方法，根据时间日期将打包文件放入特定目录，方便管理，发布的是 AppleStore 的包。

```ruby
desc "打包 App Store 版本"
desc "使用方法 `fastlane release scheme:[project | projectClone]`"
private_lane :release do |options|
    scheme = options[:scheme]
    date = Time.new.strftime("%Y%m%d-%H%M")
    gym(
      scheme: "#{scheme}", 
      output_directory: "../build/#{scheme}/#{date}",
      output_name: "#{scheme}-#{date}.ipa",
      clean: true,
      silent: true,
      include_symbols: true,
      export_method:'app-store',
    )
    sh "open ../../build/#{scheme}/#{date}"
end

desc "打包 App Store 版本"
lane :releaseMaster do
    release(scheme: 'project')
end

desc "打包 App Store Clone版本"  
lane :releaseClone do
    release(scheme: 'projectClone')
end
```

其实也没有什么好注释的了，把上面内容放入 Fastfile 就好了，这样就可以进行不同的打包，通过 `private_lane` 建立一个通用的 AppleStore 的打包过程，同时完成打包文件的路径文件命名，具体参考文档就OK了。

## 使用

通过上面的配置，就可以简单的使用下面两个命令构建出不同帐号下面的发布包（通过 `fastlane list` 也可以看到）：

- 打包正常版本：`fastlane releaseMaster`
- 打包影子版本：`fastlane releaseClone`

有更多的包也可以如法炮制，Fastlane 确实是一个很好用的命令行工具。

## 参考资料

- [Advanced fastlane](https://github.com/fastlane/fastlane/blob/master/fastlane/docs/Advanced.md)
- [Fastlane Appfile](https://github.com/fastlane/fastlane/blob/master/fastlane/docs/Appfile.md)
