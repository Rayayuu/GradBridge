---
title: CNN、Detection 与 Segmentation
description: 从 CNN 特征提取出发，理解 Classification、Object Detection 和 Semantic Segmentation 的任务差异。
keywords:
  - CNN
  - Object Detection
  - Segmentation
  - Computer Vision
  - Deep Learning
---

# CNN、Detection 与 Segmentation

Computer Vision 的不同任务，本质上在回答不同问题。

## Classification

输入一张图片，输出类别。

例如：

```text
Image → Cat
```

它告诉你“这是什么”，但不会告诉你对象具体在哪里。

## CNN

CNN 通过局部感受野和共享参数，从图像中逐层提取特征。

浅层可能学习：

- Edge
- Texture

更深层逐渐学习更高层语义特征。

## Object Detection

Detection 不仅预测类别，还需要预测位置。

输出通常包含：

- Bounding Box
- Class
- Confidence

例如：

```text
Person: [x1, y1, x2, y2]
Car:    [x1, y1, x2, y2]
```

## Segmentation

Segmentation 的粒度更细。

它需要判断每一个 Pixel 属于哪个类别。

## Semantic Segmentation

同一类别的所有对象通常共享同一个 Class Label。

例如道路场景：

- Road
- Car
- Person
- Building

每个 Pixel 都会得到类别。

## Instance Segmentation

除了 Pixel Class，还区分同一类别中的不同实例。

例如两个人会被识别成两个不同 Instance。

## Classification vs Detection vs Segmentation

| Task | Output |
| --- | --- |
| Classification | Class |
| Detection | Box + Class |
| Semantic Segmentation | Pixel Class |
| Instance Segmentation | Pixel + Instance |

## 项目中如何选择

如果只需要判断有没有目标：Classification 可能足够。

如果需要知道对象位置：Detection。

如果需要精确区域：Segmentation。

## 面试怎么回答

不要只背模型名字。

先说明任务 Output，再解释为什么这个任务需要这种粒度。

## 最后

> 选择 Computer Vision Model 之前，先明确你到底需要 Class、Bounding Box，还是 Pixel-level Prediction。
