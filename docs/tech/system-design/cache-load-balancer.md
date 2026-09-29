---
title: Cache 与 Load Balancer
description: 从系统瓶颈出发理解 Cache 和 Load Balancer 为什么存在，以及它们分别解决什么扩展问题。
keywords:
  - System Design
  - Cache
  - Load Balancer
  - Scalability
  - Redis
---

# Cache 与 Load Balancer

System Design 最重要的习惯之一是：

> 不要先画组件，先说系统出现了什么问题。

## 为什么需要 Cache

假设每一次 Request 都访问 Database。

当 Read Traffic 很高时，Database 可能成为瓶颈。

如果大量请求读取相同数据，就可以把高频结果放到更快的 Cache。

## Cache 能解决什么

- 减少 Database Load
- 降低 Response Latency
- 提高 Read Throughput

## Cache Aside

一个常见模式：

```text
Read Cache
   ↓
Hit → Return

Miss
 ↓
Read Database
 ↓
Write Cache
 ↓
Return
```

## Cache Invalidation

真正困难的问题通常不是读取 Cache，而是：

> 数据变化以后，Cache 什么时候失效？

可能使用：

- TTL
- Explicit Invalidation
- Update Strategy

不同策略影响 Consistency 和 Complexity。

## Load Balancer

如果一个 Backend Instance 无法处理所有流量，可以运行多个实例。

这时需要有人决定：

> 每个 Request 应该交给哪台 Server？

Load Balancer 就负责流量分配。

## 常见策略

- Round Robin
- Least Connections
- Weighted Routing
- Hash-based Routing

## 为什么 Backend 最好 Stateless

如果所有 Login State 都只存在某一台 Server 内存里，Request 被分到另一台 Server 就可能找不到状态。

因此 Horizontal Scaling 通常希望 Application Server 尽量 Stateless。

状态可以放到：

- Database
- Redis
- Shared Storage

## Health Check

Load Balancer 还需要知道 Server 是否健康。

如果某个 Instance 故障，就应该停止向它分配新流量。

## 面试怎么回答

推荐顺序：

1. 当前瓶颈是什么
2. 为什么添加 Cache / Load Balancer
3. 它解决什么
4. 引入后又产生什么新问题

## 最后

> System Design 不是不断添加组件，而是在一个瓶颈出现以后，用新的组件交换新的 Trade-off。
