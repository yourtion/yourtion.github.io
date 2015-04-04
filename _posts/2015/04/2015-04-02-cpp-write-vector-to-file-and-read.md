---
layout: post
date: 2015-04-02 00:03:06
slug: cpp-write-vector-to-file-and-read
title: "C++将vector写入文件并重新读取"
author: Yourtion
keywords: ["cpp","verctor","file","read","write"]
description: ""
category: ""
tags: [""]
---
{% include JB/setup %}

最近在写node的addon，涉及到将vector写入文件并重新读取，包括字符串和自定义struct构成的vector。研究了各种方法，有蛮多坑，将用到的方法共享之，作为备忘，同时也希望对你有帮助。

### 需要引入的头文件

```cpp
#include <iostream>
#include <fstream>
#include <iterator>
#include <string>
#include <vector>
#include <fstream>
```

### 将```vector<string>```写入文件

```cpp
vector<string> lists;
lists.push_back("item1");
lists.push_back("item2");
lists.push_back("item3");
// 写入
std::ofstream output_file("lists.txt");
std::ostream_iterator<std::string> output_iterator(output_file, "\n");
std::copy(names.begin(), lists.end(), output_iterator);
```

### 从文件读取数据到```vector<string> names```

```cpp
vector<string> lists;
std::ifstream file("lists.txt");
// 读取
while (file) {
	std::string line;
	std::getline(file, line);
	lists.push_back(line);
}  
```

### 定义```struct``````list_item```

```cpp
struct list_item{
	int id;
	int score;
};
```

这里定义了一个```list_item```的结构体，具体使用中你可以使用自己定义的结构体，应该也是没问题的。

### 将```vector<list_item>```写入文件

```cpp
vector<list_item> lists;

list_item item1;
item1.id = 0;
item1.score = 90;
lists.push_back("item1");

list_item item2;
item2.id = 1;
item2.score = 80;
lists.push_back("item2");

// 写入
ofstream os ("item_list.db", ios::binary);
int size1 = lists.size();
os.write((const char*)&size1, 4);
os.write((const char*)&lists[0], size1 * sizeof(list_item));
os.close();
```

### 从文件读取数据到```vector<list_item> lists```

```cpp
vector<list_item> lists;
// 读取
ifstream is("item_list.db", ios::binary);
int size1;
is.read((char*)&size1, 4);
items.resize(size1);
is.read((char*)&lists[0], size1 * sizeof(list_item));
```

### 总结与待解决问题

上面的方法都是一次性获取一个vector后写入文件的，如果vector过大，一次性写入可能会有问题，在考虑做一个可以不断追加的方法，这样性能各方面会比较高，有什么好想法欢迎交流。


