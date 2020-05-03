---
layout: post
date: 2016-07-08 16:13:03 +0800
slug: update-react-native-029-bug
title: "升级 ReactNative 0.29 踩坑"
author: Yourtion
keywords: ["ReactNative", "android.app.Application cannot be cast to com.facebook.react.ReactApplication", "React Native 0.29"]
description: "ReactNative error android.app.Application cannot be cast to com.facebook.react.ReactApplication bug fix"
category: "ReactNative"
tags: ["Android"]
---
{% include JB/setup %}

今天看到 ReactNative 0.29 可以升级，就打算给我最近在写的 [ReactNative-SuperID](https://github.com/yourtion/ReactNative-SuperID) 也升级一下。

一升级后发现 Android 的 Sample 项目运行不了，出现下面的错误：

```java
FATAL EXCEPTION: main
Process: com.yourtion.superid_rn, PID: 8729
java.lang.RuntimeException: Unable to start activity ComponentInfo{com.yourtion.superid_rn/com.yourtion.superid_rn.SuperIDRNActivity}: java.lang.ClassCastException: android.app.Application cannot be cast to com.facebook.react.ReactApplication
   at android.app.ActivityThread.performLaunchActivity(ActivityThread.java:2298)
   at android.app.ActivityThread.handleLaunchActivity(ActivityThread.java:2360)
   at android.app.ActivityThread.access$800(ActivityThread.java:144)
   at android.app.ActivityThread$H.handleMessage(ActivityThread.java:1278)
   at android.os.Handler.dispatchMessage(Handler.java:102)
   at android.os.Looper.loop(Looper.java:135)
   at android.app.ActivityThread.main(ActivityThread.java:5221)
   at java.lang.reflect.Method.invoke(Native Method)
   at java.lang.reflect.Method.invoke(Method.java:372)
   at com.android.internal.os.ZygoteInit$MethodAndArgsCaller.run(ZygoteInit.java:899)
   at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:694)
Caused by: java.lang.ClassCastException: android.app.Application cannot be cast to com.facebook.react.ReactApplication
   at com.facebook.react.ReactActivity.getReactNativeHost(ReactActivity.java:79)
   at com.facebook.react.ReactActivity.onCreate(ReactActivity.java:107)
   at android.app.Activity.performCreate(Activity.java:5933)
   at android.app.Instrumentation.callActivityOnCreate(Instrumentation.java:1105)
   at android.app.ActivityThread.performLaunchActivity(ActivityThread.java:2251)
   at android.app.ActivityThread.handleLaunchActivity(ActivityThread.java:2360) 
   at android.app.ActivityThread.access$800(ActivityThread.java:144) 
   at android.app.ActivityThread$H.handleMessage(ActivityThread.java:1278) 
   at android.os.Handler.dispatchMessage(Handler.java:102) 
   at android.os.Looper.loop(Looper.java:135) 
   at android.app.ActivityThread.main(ActivityThread.java:5221) 
   at java.lang.reflect.Method.invoke(Native Method) 
   at java.lang.reflect.Method.invoke(Method.java:372) 
   at com.android.internal.os.ZygoteInit$MethodAndArgsCaller.run(ZygoteInit.java:899) 
   at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:694) 
```

原来，升级后需要对原有项目进行如下升级 （参考：[Releases 0.29.0](https://github.com/facebook/react-native/releases/tag/v0.29.0)）：

创建 `MainApplication.java` 并按照 [这个](https://github.com/facebook/react-native/blob/0.29-stable/local-cli/generator-android/templates/package/MainApplication.java) 修改：

```java
package <%= package %>;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
}
```

按照 [这个](https://github.com/facebook/react-native/blob/0.29-stable/local-cli/generator-android/templates/package/MainActivity.java) 更新 `MainActivity.java` ：

```java
package <%= package %>;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "<%= name %>";
    }
}
```

更新 `AndroidManifest.xml` 添加 `android:name=".MainApplication"` ：

```xml
<application
+   android:name=".MainApplication"
    android:allowBackup="true"
    android:label="@string/app_name"
    android:icon="@mipmap/ic_launcher"
    android:theme="@style/AppTheme">
```

这样更新后，项目就可以正常运行啦～
