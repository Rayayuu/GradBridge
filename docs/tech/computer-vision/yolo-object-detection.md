---
title: YOLO 与 Object Detection
description: 从实时检测需求出发理解 YOLO 类方法、Bounding Box、Confidence、NMS 和工程部署中的核心问题。
keywords:
  - YOLO
  - Object Detection
  - NMS
  - Bounding Box
  - Computer Vision
---

# YOLO 与 Object Detection

YOLO 是 Object Detection 中非常有代表性的一类方法。

它的核心目标是：

> 在一次高效的模型推理中同时完成目标位置和类别预测。

## Detection Output

一个预测通常包含：

- Bounding Box
- Class
- Confidence

## Bounding Box

Bounding Box 用矩形描述目标位置。

常见表示包括：

- x1, y1, x2, y2
- center_x, center_y, width, height

不同实现内部格式可能不同。

## Confidence

模型往往会产生大量 Candidate Box。

低 Confidence Prediction 可以先通过 Threshold 过滤。

但 Threshold 太高会降低 Recall。

## 为什么会有重复 Box

同一个对象可能产生多个相互重叠的预测。

因此需要进一步去重。

## NMS

Non-Maximum Suppression 的直觉是：

1. 选最高分 Box
2. 找和它高度重叠的其他 Box
3. 抑制重复预测
4. 继续处理剩余 Box

重叠程度通常使用 IoU 衡量。

## Precision vs Recall

Detection 不能只看 Accuracy。

重要指标包括：

- Precision
- Recall
- AP
- mAP

## Real-time Trade-off

实际部署常常在：

- Accuracy
- Latency
- Model Size
- GPU / CPU Cost

之间做平衡。

更大的模型不一定适合 Edge Device。

## Dataset Quality

Detection 项目非常依赖：

- Label Quality
- Class Balance
- Scene Diversity
- Bounding Box Accuracy

模型本身不是唯一变量。

## 项目面试怎么讲 YOLO

不要只说：

> 我用了 YOLO。

应该准备：

- 为什么选择 Detection
- Dataset 怎么构建
- Classes 是什么
- Train / Validation 怎么划分
- Metric 是什么
- False Positive / False Negative
- Inference Speed
- Deployment Constraint

## 最后

> Detection 项目的核心不是模型名字，而是数据、指标、速度和真实业务目标之间的平衡。
