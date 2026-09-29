---
title: Computer Vision
description: 从 CNN、Object Detection、YOLO、Segmentation 到 IoU / mIoU，建立视觉工程完整基础。
---

<div class="gb-tech-home">

<section class="gb-tech-hero">
<div class="gb-section-label">TECH · COMPUTER VISION</div>
<h1>先明确视觉任务，<br>再讨论应该使用什么模型。</h1>
<p>Classification、Detection 和 Segmentation 的输出目标不同，数据、模型和 Evaluation 也随之变化。</p>
</section>

<section class="gb-tech-section">
<div class="gb-section-label">VISION PATH</div>
<h2>从任务到模型，再到指标</h2>
<div class="gb-tech-topic-grid">
<div><a href="/tech/computer-vision/cnn-detection-segmentation" style="display:block;color:inherit;text-decoration:none;height:100%">
<span>FOUNDATION</span>
<h3>CNN · Detection · Segmentation</h3>
<p>先理解不同 Computer Vision Task 到底在预测什么。</p>
</a></div>
<div><a href="/tech/computer-vision/yolo-object-detection" style="display:block;color:inherit;text-decoration:none;height:100%">
<span>DETECTION</span>
<h3>YOLO 与 Object Detection</h3>
<p>Bounding Box、Confidence、NMS 与实时检测中的工程权衡。</p>
</a></div>
<div><a href="/tech/computer-vision/iou-miou" style="display:block;color:inherit;text-decoration:none;height:100%">
<span>EVALUATION</span>
<h3>IoU 与 mIoU</h3>
<p>理解视觉任务如何衡量预测区域和真实区域的重叠质量。</p>
</a></div>
</div>
</section>

<section class="gb-tech-section gb-tech-method">
<div class="gb-section-label">VISION PIPELINE</div>
<h2>一个真实 CV 项目至少包含四层</h2>
<div class="gb-tech-method-grid">
<div><span>01</span><h3>Data</h3><p>采集、标注、划分和质量控制。</p></div>
<div><span>02</span><h3>Model</h3><p>根据 Task 选择合理 Architecture。</p></div>
<div><span>03</span><h3>Evaluate</h3><p>用正确 Metric 判断模型是否真的改善。</p></div>
<div><span>04</span><h3>Deploy</h3><p>考虑 Latency、Model Size 和 Hardware Constraint。</p></div>
</div>
</section>

</div>
