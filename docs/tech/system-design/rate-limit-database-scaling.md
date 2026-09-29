---
title: Rate Limiting 与 Database Scaling
description: 理解系统流量增长后如何通过限流、Read Replica、Partition 等方式保护服务并扩展数据库。
keywords:
  - Rate Limiting
  - Database Scaling
  - Read Replica
  - Sharding
  - System Design
---

# Rate Limiting 与 Database Scaling

系统扩展不是“用户多了就加服务器”。

不同组件会在不同阶段成为瓶颈。

## Rate Limiting 为什么存在

系统资源是有限的。

如果一个 Client 可以无限发送 Request，可能导致：

- Server Overload
- Database Overload
- Abuse
- Cost Explosion
- Unfair Resource Usage

Rate Limiter 用来限制一定时间内允许的请求数量。

## 常见算法

- Fixed Window
- Sliding Window
- Token Bucket
- Leaky Bucket

它们在 Burst、Accuracy、Memory 和 Implementation Complexity 上有所不同。

## Token Bucket

可以理解成 Bucket 中不断补充 Token。

每个 Request 消耗一个 Token。

没有 Token 时，请求被限制。

这种方式允许一定程度的 Burst。

## Database 为什么会成为瓶颈

Application Server 很容易水平扩展。

Database 因为保存共享状态，扩展通常更复杂。

常见瓶颈包括：

- CPU
- Disk I/O
- Connection
- Lock
- Query
- Storage

## 先优化 Query

不要看到数据库慢就直接 Sharding。

先检查：

- Query Pattern
- Index
- N+1 Query
- Unnecessary Full Scan
- Connection Pool

## Read Replica

如果系统读多写少，可以把部分 Read Traffic 分散到 Replica。

这可以降低 Primary 的读取压力。

但需要考虑 Replication Lag。

## Partition / Sharding

当单个 Database 的数据量或写入压力过大，可以把数据拆到多个节点。

关键问题是 Sharding Key。

一个差的 Sharding Key 可能导致：

- Hot Partition
- Uneven Distribution
- Cross-shard Query

## 为什么 Sharding 很贵

因为它会让：

- Query
- Transaction
- Join
- Migration
- Operations

全部变复杂。

所以它通常不是第一步。

## 面试怎么回答扩数据库

推荐顺序：

1. 优化 Query / Index
2. Cache
3. Read Replica
4. Vertical Scaling
5. Partition / Sharding

实际顺序取决于具体瓶颈，但一定要先说明原因。

## 最后

> Scaling 不是选择一个高级架构，而是定位瓶颈，然后用最小复杂度解决当前问题。
