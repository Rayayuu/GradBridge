---
title: System Design
description: 从 Cache、Load Balancer、Queue、Rate Limiting 到 Database Scaling，建立系统设计的瓶颈与权衡思维。
---

<div class="gb-tech-home">

<section class="gb-tech-hero">
<div class="gb-section-label">TECH · SYSTEM DESIGN</div>
<h1>不要背架构图，<br>先找到系统真正的瓶颈。</h1>
<p>System Design 的核心不是用了多少组件，而是每增加一个组件，都能解释它解决什么问题、又带来了什么成本。</p>
</section>

<section class="gb-tech-section">
<div class="gb-section-label">SYSTEM PATH</div>
<h2>从三个最常见的扩展问题开始</h2>
<div class="gb-tech-topic-grid">
<div><a href="/tech/system-design/cache-load-balancer" style="display:block;color:inherit;text-decoration:none;height:100%">
<span>SCALE</span>
<h3>Cache 与 Load Balancer</h3>
<p>解决 Read Pressure、Latency 和 Application Horizontal Scaling。</p>
</a></div>
<div><a href="/tech/system-design/message-queue" style="display:block;color:inherit;text-decoration:none;height:100%">
<span>ASYNC</span>
<h3>Message Queue</h3>
<p>理解异步、解耦、Buffer、Retry、Ordering 和 Delivery Guarantee。</p>
</a></div>
<div><a href="/tech/system-design/rate-limit-database-scaling" style="display:block;color:inherit;text-decoration:none;height:100%">
<span>PROTECTION</span>
<h3>Rate Limiting 与 Database Scaling</h3>
<p>从流量保护到 Replica、Partition 和 Sharding。</p>
</a></div>
</div>
</section>

<section class="gb-tech-section gb-tech-method">
<div class="gb-section-label">DESIGN METHOD</div>
<h2>每次设计都先回答四个问题</h2>
<div class="gb-tech-method-grid">
<div><span>01</span><h3>Requirement</h3><p>系统真正需要支持什么。</p></div>
<div><span>02</span><h3>Bottleneck</h3><p>当前哪里会先撑不住。</p></div>
<div><span>03</span><h3>Component</h3><p>新增组件解决什么具体问题。</p></div>
<div><span>04</span><h3>Trade-off</h3><p>复杂度、一致性和成本发生了什么变化。</p></div>
</div>
</section>

</div>
