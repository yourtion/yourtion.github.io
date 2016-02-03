---
author: Yourtion
comments: true
date: 2013-07-02 06:38:02+00:00
excerpt: 希望将原有的PDF文件直接生成HTML数据流，方便进行排版编辑，研究了一下大家的解决方案，决定采用基于xpdf的Poppler进行处理。因为服务器端使用的是Node.js，没有现成的调用源码，所以使用express实现了上传转换输出。
layout: post
slug: nodejs-convert-pdf-to-html
title: Node.js实现PDF文件转HTML
wordpress_id: 3801
categories:
- Node.js
---
{% include JB/setup %}

最近在做一个富媒体项目，希望将原有的PDF文件直接生成HTML数据流，方便进行排版编辑，研究了一下大家的解决方案，决定采用基于 `xpdf` 的 `Poppler` 进行处理。因为服务器端使用的是 `Node.js`，没有现成的调用源码，所以使用 `express` 实现了上传转换输出。与大家共享！

首先安装 `Poppler`，我使用的上 MacOS，Linux 平台也大同小异，就是下载 `Poppler` 的源码进行编译，或者直接使用 Mac 下的 `Ports` 进行安装。

Poppler：http://poppler.freedesktop.org/

安装完成后在终端运行 “pdftohtml” 可以看到下面的提示：

[![pdftohtml]({{ IMAGE_PATH }}2013/07/pdftohtml.png)]({{ IMAGE_PATH }}2013/07/pdftohtml.png)

这样就能在 `Node.js` 中利用子线程调用转换了，不多说，实现代码如下：

```javascript
function getData(file,callback){
    var out="";
    last = exec('pdftohtml -p -noframes '+file);
    last.stdout.on('data', function (data) {
    callback("OK!");
    });
}
```

PDF文件上传处理部分：

jade：

```javascript
form(method="post", enctype="multipart/form-data", action="/upload")
    fieldset
        legend General
        p
            label(for="user[pdf]") Picture:
            input(type="file", name="pdf")
    p.buttons
        input(type="submit", value="Save")
```

Node.js：


```javascript
app.post('/upload', function (req, res) {
    // 获得文件的临时路径
    var date = new Date();
    var tmp_path = req.files.pdf.path;
    console.log(tmp_path);
    // 指定文件上传后的目录 - 示例为"images"目录。
    var target_path = './pdf/' +req.files.pdf.name;
    console.log(target_path);
    // 移动文件
    fs.rename(tmp_path, target_path, function (err) {
        if (err) throw err;
        // 删除临时文件夹文件,
        fs.unlink(tmp_path, function () {
            if (err) throw err;
            //res.send('File uploaded to: ' + target_path + ' - ' + req.files.pdf.size + ' bytes');
            getData(target_path,function call(data){
                //res.send(data);
                res.redirect("/"+req.files.pdf.name.replace("pdf","html"));
            });
        });
    });
});
```

Demo地址： [https://github.com/yourtion/Demo_PDFtoHTML](https://github.com/yourtion/Demo_PDFtoHTML)

功能的实现大致就是这样，要什么问题欢迎大家一起交流！
