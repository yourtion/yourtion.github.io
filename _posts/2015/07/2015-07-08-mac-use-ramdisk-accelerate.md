---
layout: post
date: 2015-07-08 16:32:58
slug: mac-use-ramdisk-accelerate
title: "使用Ramdisk加速你的Mac"
author: Yourtion
keywords: ["mac", "ramdisk"]
description: "使用Ramdisk加速你的Mac"
category: "Mac"
tags: ["Mac"]
---
{% include JB/setup %}

还记得之前在Windows上使用过Ramdisk来将32位系统不能识别的内存转成磁盘，存放临时文件什么的。突发奇想在Mac是不是也能用内存来放Cache呢？虽然有SSD，但是考虑到寿命问题，加上速度，内存盘也还是很有优势的。

找了一下，最简单的方法是下载一个APP，或者执行下面的脚本：

```bash
diskutil erasevolume HFS+ RamDisk `hdiutil attach -nomount ram://$((2*1024*1024*2))`
```

但是这样并不够优雅，很容易不小心就把RamDisk给Eject了，有寻思了一番，决定采用脚本形式，而且是创建隐藏的RamDisk，同时支持注销自动备份~事不宜迟，马上动手。

## 创建RamDisk脚本

在```/etc/```下创建```Ramdisk```目录，用来存放相关文件

### initramdisk.sh

创建```/etc/Ramdisk/initramdisk.sh```

```bash
#!/bin/sh

# 设置内存盘的名称
DISK_NAME=RamDisk
MOUNT_PATH=/Volumes/$DISK_NAME
# 设置备份文件的保存路径
WORK_PATH=/etc/Ramdisk
BAK_PATH=$WORK_PATH/$DISK_NAME.tar.gz
# 设置分配给内存盘的空间大小(MB)
DISK_SPACE=1024

# 创建Ramdisk
if [ ! -e $MOUNT_PATH ]; then
    dev=`hdid -nomount ram://$(($DISK_SPACE*1024*2)) | cut -d' ' -f1`
    partition=${dev}s1
    rdev=`echo $dev | sed -e 's/disk/rdisk/'`
    rpartition=`echo $partition | sed -e 's/disk/rdisk/'`
    echo y | fdisk -ia hfs $dev
    newfs_hfs -v $DISK_NAME $partition
    hdiutil mount -nobrowse $rdev
    hdiutil mount -nobrowse $rpartition
fi

# 恢复备份
if [ -s $BAK_PATH ]; then
    tar -zxf $BAK_PATH -C $MOUNT_PATH
fi
```

### syncramdisk.sh

创建```/etc/Ramdisk/syncramdisk.sh```

```bash
#!/bin/sh

# 设置内存盘的名称
DISK_NAME=RamDisk
MOUNT_PATH=/Volumes/$DISK_NAME
# 设置备份文件的保存路径
WORK_PATH=/etc/Ramdisk
BAK_PATH=$WORK_PATH/$DISK_NAME.tar.gz
LISTFILE=$WORK_PATH/list

# 设置最大的cache大小(MB)
MAX_CACHE_SIZE=50

# 备份Ramdisk内容，超过50M的目录直接不再保存
cd $MOUNT_PATH
declare -a fa
i=0
for file in $(du -s Caches/* | sort -n)
do
  fa[$i]=$file
  let i=i+1
done
size=$((i/2))
echo "file number:"$size
cd $WORK_PATH
echo ".?*">$LISTFILE
for((i=0;i<$size;i++))
do
  if ((${fa[$((i*2))]}<(($MAX_CACHE_SIZE*1024*2)) ));then
    echo "add:"${fa[$((i*2+1))]}
  else
    echo ${fa[$((i*2+1))]}>>$LISTFILE
  fi

done
if [ -e $MOUNT_PATH ] ; then
    cd $MOUNT_PATH
    tar --exclude-from $LISTFILE -czf $BAK_PATH .
fi
```

### 设置登录和注销hook

在终端下执行：

```bash
# 登录时执行initramdisk.sh
defaults write com.apple.loginwindow LoginHook /etc/Ramdisk/initramdisk.sh

# 注销时执行syncramdisk.sh
defaults write com.apple.loginwindow LogoutHook /etc/Ramdisk/syncramdisk.sh
```

## 迁移目录到RamDisk

### 转移Cache目录

在终端下继续执行：

```bash
# 删除Cahces
rm -rf ~/Library/Caches

# 在RamDisk创建Caches目录并链接
mkdir /Volumes/RamDisk/Caches 
ln -s /Volumes/RamDisk/Caches ~/Library/Caches
```

### 转移Chrome缓存

```bash
mv ~/Library/Application\ Support/Google/Chrome /Volumes/RamDisk/
ln -s /Volumes/RamDisk/Chrome ~/Library/Application\ Support/Google/Chrome
```

其他需要移到RamDisk的东西也可以如法炮制。

