---
layout: post
date: 2017-02-15 10:14:17 +08:00
slug: vue-require-remote-js
title: "Vue引入远程JS文件"
author: Yourtion
keywords: ["vue", "remote js", "require js http"]
description: "使用Vue的createElement方法，解决引入远程js问题"
category: "Vue"
tags: ["解决问题", "Javascript"]
---
{% include JB/setup %}

## 问题

最近在使用 Vue 做东西，用到钉钉扫描登录的功能，这里需要引入远程的 js 文件，因为 Vue 的方式跟之前的不太一样，又不想把文件下载到本地应用，找了一下解决的方法，貌似都需要引入第三方的库，最后找到了解决方案，分享之。

## 思路

一开始的思路是在 Vue 加载完 Dom 之后（`mounted`），使用 JavaScript 脚本在 body 中插入远程的脚本文件。

后来发现了 Vue 的 `createElement` 方法，简单的封装一个组件解决问题。

## 解决方法

第一版代码（直接在操作 Dom ）如下：

```javascript
export default {
  mounted() {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = 'https://g.alicdn.com/dingding/dinglogin/0.0.2/ddLogin.js';
    document.body.appendChild(s);
  },
}
```

使用 `createElement` 方法：

```javascript
export default {
  components: {
    'dingtalk': {
      render(createElement) {
        return createElement(
          'script',
          {
            attrs: {
              type: 'text/javascript',
              src: 'https://g.alicdn.com/dingding/dinglogin/0.0.2/ddLogin.js',
            },
          },
        );
      },
    },
  },
}

// 使用 <dingtalk></dingtalk> 在页面中调用
```

## 终极方案

通过封装一个组件 `remote-js` 实现：

```javascript
export default {
  components: {
   'remote-js': {
    render(createElement) {
      return createElement('script', { attrs: { type: 'text/javascript', src: this.src }});
    },
    props: {
      src: { type: String, required: true },
    },
  },
  },
}
```

使用方法： 

```html
<remote-js src="https://g.alicdn.com/dingding/dinglogin/0.0.2/ddLogin.js"></remote-js>
```

因为刚开始学习 Vue 有什么问题欢迎大家指出，大家一起讨论讨论。

## 参考资料

- [Vue - Render Functions](https://vuejs.org/v2/guide/render-function.html)
