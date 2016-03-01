---
layout: post
date: 2015-12-31 09:13:17
slug: temporary-fix-cocoapod-error-on-ruby-23
title: "临时解决 Ruby2.3 上 CocoaPods 出错问题"
author: Yourtion
keywords: ["undefined method to_ary","NoMethodError","CocoaPods"]
description: "升级了 Ruby 发布了 2.3 ，安装 cocoapods 之后，`pod install` 和 `pod update`，都会报错 `NoMethodError - undefined method 'to_ary'`"
category: "Mac"
tags: ["解决问题"]
---
{% include JB/setup %}

前段时间 Ruby 发布了 2.3 ，手贱就直接升级了一下，结果 `gem` 全部都要重装，但是这并不是最坑的。最麻烦的是安装完 cocoapods 之后，`pod install` 和 `pod update`，都会报错 `NoMethodError - undefined method 'to_ary'`，这个可是出大问题。

报错堆栈如下：

```
NoMethodError - undefined method `to_ary' for #<Pod::Specification name="ReactiveCocoa">
Did you mean?  to_query
/usr/local/lib/ruby/gems/2.3.0/gems/cocoapods-0.39.0/lib/cocoapods/resolver/lazy_specification.rb:14:in `method_missing'
/usr/local/lib/ruby/gems/2.3.0/gems/cocoapods-0.39.0/lib/cocoapods/resolver.rb:64:in `flatten'
/usr/local/lib/ruby/gems/2.3.0/gems/cocoapods-0.39.0/lib/cocoapods/resolver.rb:64:in `block in resolve'
/usr/local/lib/ruby/gems/2.3.0/gems/cocoapods-0.39.0/lib/cocoapods/resolver.rb:63:in `tap'
/usr/local/lib/ruby/gems/2.3.0/gems/cocoapods-0.39.0/lib/cocoapods/resolver.rb:63:in `resolve'
/usr/local/lib/ruby/gems/2.3.0/gems/cocoapods-0.39.0/lib/cocoapods/installer/analyzer.rb:539:in `block in resolve_dependencies'
/usr/local/lib/ruby/gems/2.3.0/gems/cocoapods-0.39.0/lib/cocoapods/user_interface.rb:59:in `section'
/usr/local/lib/ruby/gems/2.3.0/gems/cocoapods-0.39.0/lib/cocoapods/installer/analyzer.rb:537:in `resolve_dependencies'
/usr/local/lib/ruby/gems/2.3.0/gems/cocoapods-0.39.0/lib/cocoapods/installer/analyzer.rb:70:in `analyze'
/usr/local/lib/ruby/gems/2.3.0/gems/cocoapods-0.39.0/lib/cocoapods/installer.rb:213:in `analyze'
/usr/local/lib/ruby/gems/2.3.0/gems/cocoapods-0.39.0/lib/cocoapods/installer.rb:136:in `block in resolve_dependencies'
/usr/local/lib/ruby/gems/2.3.0/gems/cocoapods-0.39.0/lib/cocoapods/user_interface.rb:59:in `section'
/usr/local/lib/ruby/gems/2.3.0/gems/cocoapods-0.39.0/lib/cocoapods/installer.rb:135:in `resolve_dependencies'
/usr/local/lib/ruby/gems/2.3.0/gems/cocoapods-0.39.0/lib/cocoapods/installer.rb:105:in `install!'
/usr/local/lib/ruby/gems/2.3.0/gems/cocoapods-0.39.0/lib/cocoapods/command/project.rb:71:in `run_install_with_update'
/usr/local/lib/ruby/gems/2.3.0/gems/cocoapods-0.39.0/lib/cocoapods/command/project.rb:101:in `run'
/usr/local/lib/ruby/gems/2.3.0/gems/claide-0.9.1/lib/claide/command.rb:312:in `run'
/usr/local/lib/ruby/gems/2.3.0/gems/cocoapods-0.39.0/lib/cocoapods/command.rb:47:in `run'
/usr/local/lib/ruby/gems/2.3.0/gems/cocoapods-0.39.0/bin/pod:44:in `<top (required)>'
/usr/local/bin/pod:23:in `load'
/usr/local/bin/pod:23:in `<main>'
```


搜索一下发现这个问题已经很多人提上了issue（[issues#4345](https://github.com/CocoaPods/CocoaPods/issues/4345)）而且在作者回复说在`master`上已经解决，但是还没正式发布。

没办法，又不想降级回 2.2，研究了一下修复方案[[Resolver] Fix resolution on Ruby 2.3](https://github.com/CocoaPods/CocoaPods/pull/4368)，其实就是加了一个方法，决定手动改本地的文件。

使用 vim 或者你熟悉的编辑工具打开 `lazy_specification.rb`

```
vim /usr/local/lib/ruby/gems/2.3.0/gems/cocoapods-0.39.0/lib/cocoapods/resolver/lazy_specification.rb
```

在第16行也就是 `subspec_by_name ` 的方法上面加入下面代码：

```ruby
def respond_to_missing?(method, include_all = false)
  specification.respond_to?(method, include_all)
end
```

这样就搞定了！！！



