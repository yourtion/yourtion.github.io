---
author: Yourtion
comments: true
date: 2013-07-30 10:01:36+00:00
excerpt: 刚刚开始使用Python写OpenCV的东西，发现关于使用Python写OpenCV的还是比较少的，先整了一个人脸识别的最简单实例，与大家共享！
layout: post
slug: python-opencv-realtime-face-recognition
title: Python与OpenCV实时人脸识别
wordpress_id: 3839
categories:
- OpenCV
tags:
- Python
---
{% include JB/setup %}

刚刚开始使用Python写OpenCV的东西，发现关于使用```Python```写```OpenCV```的还是比较少的，先整了一个人脸识别的最简单实例，与大家共享！

环境：```Python``` 2.7.4、```OpenCV``` 2.4.6、```LinuxMint``` 15

最简单代码如下：

```python
import os,sys,cv2
pth = os.path.dirname(sys.argv[0])
cv2.namedWindow("camera")
det = cv2.CascadeClassifier("./haarcascade_frontalface_alt.xml")
cam = cv2.VideoCapture(0)
while cam.isOpened():
    flag, frame = cam.read();
    if flag == True:
        tmp = cv2.cvtColor(frame, cv2.cv.CV_RGB2GRAY)
        objs = det.detectMultiScale(tmp, 1.1, 4, 0,(frame.shape[1] / 10, frame.shape[0] / 10))
    for rct in objs:
        cv2.rectangle(frame, (rct[0], rct[1]),(rct[0] + rct[2], rct[1] + rct[3]),(0, 0, 255), 2, cv2.CV_AA)
    cv2.imshow("camera", frame)
    if cv2.waitKey(10) == 27:
        cam.release()
        break
cv2.destroyWindow("camera")
```

接下来我还增加输出统计人数的功能，还是最简单的方法，统计找到的obj数目，只有在变化的时候才输出，代码如下：

```python
import os,sys,cv2

pth = os.path.dirname(sys.argv[0])
cv2.namedWindow("camera")
det = cv2.CascadeClassifier("./haarcascade_frontalface_alt.xml")
cam = cv2.VideoCapture(0)
people = 0
while cam.isOpened():
    flag, frame = cam.read();
    if flag == True:
        tmp = cv2.cvtColor(frame, cv2.cv.CV_RGB2GRAY)
        objs = det.detectMultiScale(tmp, 1.1, 4, 0,(frame.shape[1] / 10, frame.shape[0] / 10))
    if len(objs)!=people:
        people = len(objs)
        if people!=0:
            print people
    for rct in objs:
        cv2.rectangle(frame, (rct[0], rct[1]),(rct[0] + rct[2], rct[1] + rct[3]),(0, 0, 255), 2, cv2.CV_AA)
    cv2.imshow("camera", frame)
    if cv2.waitKey(10) == 27:
        cam.release()
        break
cv2.destroyWindow("camera")
```

希望对你有帮助，接下来会继续更新相关的东西
