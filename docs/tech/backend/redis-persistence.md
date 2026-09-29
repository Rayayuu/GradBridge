---
title: Redis 持久化：RDB 与 AOF
description: 理解 Redis 为什么需要持久化，以及 RDB、AOF 在性能、恢复速度和数据安全之间的权衡。
keywords:
  - Redis
  - RDB
  - AOF
  - Persistence
  - Cache
---

# Redis 持久化：RDB 与 AOF

Redis 最常见的印象是：

> 数据放在内存，所以很快。

但如果进程退出或机器故障，内存中的数据怎么办？

这就是 Persistence 要解决的问题。

## Redis 为什么需要持久化

不是所有 Redis 使用场景都要求数据永久保存。

例如纯 Cache 丢失以后可以从 Database 重建。

但 Redis 也可能用于：

- Session
- Queue
- Counter
- Leaderboard
- Temporary State

是否允许数据丢失，取决于业务。

## RDB

RDB 会在某些时间点生成数据快照。

可以理解成：

> 周期性拍一张 Redis 当前状态的照片。

### 优点

- 文件紧凑
- 适合备份
- 恢复通常比较快
- 对运行时写入影响相对可控

### 缺点

两次 Snapshot 之间的数据可能丢失。

## AOF

AOF 会记录修改数据的写操作。

恢复时可以重新执行这些操作。

### 优点

通常可以提供更细粒度的数据持久保障。

### 缺点

- 文件可能更大
- 写入存在额外开销
- 需要 Rewrite 控制文件增长

## fsync

AOF 并不意味着每条命令一定立刻安全落盘。

fsync 策略会影响：

- 性能
- 数据丢失窗口

这是典型的 Durability / Performance Trade-off。

## RDB 和 AOF 可以一起用吗

可以。

具体如何组合取决于 Redis 配置和业务要求。

核心问题应该是：

> 系统最多能接受丢多少数据，以及恢复速度要求是什么？

## Redis 为什么不能直接代替 Database

Redis 很强，但数据模型、持久性、一致性、查询能力和成本与关系数据库不同。

选择 Redis 应该来自具体需求，而不是“Redis 快”。

## Cache 常见问题

- Cache Miss
- Cache Invalidation
- TTL
- Eviction
- Cache Stampede
- Hot Key

这些问题通常比“如何 set/get”更重要。

## 面试怎么回答 RDB vs AOF

推荐结构：

1. RDB 是 Snapshot
2. AOF 记录写操作
3. RDB 恢复快、可能有较大数据丢失窗口
4. AOF 通常更细粒度，但带来额外写入和文件管理成本
5. 选择取决于 Durability 和 Performance 要求

## 最后

> Redis 持久化本质上是在性能、恢复速度和允许的数据丢失之间做工程权衡。
