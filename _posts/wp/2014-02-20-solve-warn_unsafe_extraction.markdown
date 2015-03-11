---
author: Yourtion
comments: true
date: 2014-02-20 05:48:19+00:00
layout: post
slug: solve-warn_unsafe_extraction
title: Python出现'_warn_unsafe_extraction'解决方法
wordpress_id: 3981
categories:
- 电脑技巧
tags:
- python
---
{% include JB/setup %}

在Python项目中运行出现了“AttributeError: ResourceManager instance has no attribute '_warn_unsafe_extraction'”问题，研究了一下，发现是```setuptools```在MacOS下的一个问题（见下图），我出现问题的是```pymongo```的库，需要删除```pymongo```，然后降级```setuptools```再重新安装。

[![warn_unsafe_extraction]({{ IMAGE_PATH }}2014/02/warn_unsafe_extraction.png)]({{ IMAGE_PATH }}2014/02/warn_unsafe_extraction.png)

解决方法：

1、删除pymongo：

```sh
sudo easy_install -mxN pmongo
```

2、降级setuptools：

```sh
sudo easy_install -mxN setuptools
sudo easy_install "setuptools<0.7"
```

3、重装pymongo：

```sh
sudo easy_install pymongo
```

问题解决！！！！！

附错误信息：

```default
/System/Library/Frameworks/Python.framework/Versions/2.7/bin/python /Users/yourtion/Codes/python/knowme/server.py
Traceback (most recent call last):
  File "/Users/yourtion/Codes/python/knowme/server.py", line 5, in <module>
    from Handler.api import UserHandler
  File "/Users/yourtion/Codes/python/knowme/Handler/api.py", line 3, in <module>
    from Model.user import User
  File "/Users/yourtion/Codes/python/knowme/Model/user.py", line 2, in <module>
    from mongoengine import *
  File "build/bdist.macosx-10.9-intel/egg/mongoengine/__init__.py", line 1, in <module>
  File "build/bdist.macosx-10.9-intel/egg/mongoengine/document.py", line 4, in <module>
  File "/Library/Python/2.7/site-packages/pymongo-2.6.3-py2.7-macosx-10.8-intel.egg/pymongo/__init__.py", line 80, in <module>
  File "/Library/Python/2.7/site-packages/pymongo-2.6.3-py2.7-macosx-10.8-intel.egg/pymongo/connection.py", line 39, in <module>
  File "/Library/Python/2.7/site-packages/pymongo-2.6.3-py2.7-macosx-10.8-intel.egg/pymongo/mongo_client.py", line 44, in <module>
  File "/Library/Python/2.7/site-packages/pymongo-2.6.3-py2.7-macosx-10.8-intel.egg/bson/__init__.py", line 41, in <module>
  File "/Library/Python/2.7/site-packages/pymongo-2.6.3-py2.7-macosx-10.8-intel.egg/bson/_cbson.py", line 7, in <module>
  File "/Library/Python/2.7/site-packages/pymongo-2.6.3-py2.7-macosx-10.8-intel.egg/bson/_cbson.py", line 4, in __bootstrap__
  File "build/bdist.macosx-10.9-intel/egg/pkg_resources.py", line 914, in resource_filename
    %s
  File "build/bdist.macosx-10.9-intel/egg/pkg_resources.py", line 1601, in get_resource_filename
    """Retrieve a PEP 302 "importer" for the given path item
  File "build/bdist.macosx-10.9-intel/egg/pkg_resources.py", line 1629, in _extract_resource
    from pkgutil import get_importer, ImpImporter
  File "build/bdist.macosx-10.9-intel/egg/pkg_resources.py", line 990, in get_cache_path

AttributeError: ResourceManager instance has no attribute '_warn_unsafe_extraction'

Process finished with exit code 1
```


