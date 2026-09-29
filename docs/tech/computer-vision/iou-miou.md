---
title: IoU、mIoU 与视觉模型评估
description: 理解 Intersection over Union、mIoU，以及 Detection 和 Segmentation 为什么不能只看 Accuracy。
keywords:
  - IoU
  - mIoU
  - Segmentation
  - Evaluation
  - Computer Vision
---

# IoU、mIoU 与视觉模型评估

Computer Vision 中，一个模型“预测对了”通常比普通分类更复杂。

因为我们不仅关心类别，还可能关心空间位置。

## IoU

IoU 是 Intersection over Union。

直觉是：

> 预测区域和真实区域重叠得有多好。

公式：

```text
IoU = Intersection / Union
```

如果预测区域和 Ground Truth 完全一致，IoU 接近 1。

完全不重叠，则为 0。

## Detection 中的 IoU

Detection 使用 Bounding Box。

IoU 可以判断预测 Box 和 Ground Truth Box 是否足够匹配。

不同 Evaluation Protocol 会使用不同 IoU Threshold。

## Segmentation 中的 IoU

Segmentation 不比较矩形，而是比较 Pixel Region。

对于某个 Class：

```text
IoU(class)
=
correct overlap
/
predicted union ground truth
```

## mIoU

mIoU 是多个类别 IoU 的平均值。

它经常用于 Semantic Segmentation。

例如：

```text
Road IoU     = 0.94
Car IoU      = 0.88
Person IoU   = 0.79

mIoU = mean(...)
```

## 为什么 Accuracy 可能误导

假设图片中 90% Pixel 都是 Background。

模型全部预测 Background，也可能获得很高 Pixel Accuracy。

但它实际上没有识别目标。

IoU 对这种问题更敏感。

## Precision 和 Recall

Detection 中同样需要关注：

### Precision

预测出来的目标中，有多少是真的。

### Recall

真实目标中，有多少被找到了。

## False Positive / False Negative

不同业务对错误类型的成本不同。

例如安全检测场景中，漏检和误报的代价可能完全不同。

所以不能只看一个总体 Metric。

## 面试怎么解释 mIoU

推荐先说：

mIoU 衡量预测区域和真实区域的重叠程度，并对多个类别取平均，因此比单纯 Pixel Accuracy 更能反映 Segmentation 对目标区域的真实预测质量。

然后再解释 Class Imbalance 和 Background 问题。

## 最后

> Evaluation Metric 不是报告里的一个数字，而是在定义“什么叫模型做得好”。
