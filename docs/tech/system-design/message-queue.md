---
title: Message Queue 为什么存在
description: 从同步调用、异步任务和系统解耦理解 Message Queue，以及 Delivery、Ordering 和 Retry 等核心问题。
keywords:
  - Message Queue
  - Kafka
  - RabbitMQ
  - Async
  - System Design
---

# Message Queue 为什么存在

很多人第一次接触 Message Queue，会把它理解成：

> 把消息先放进去，以后再处理。

这是对的，但不够完整。

## 同步调用的问题

假设用户下单以后需要：

1. 创建 Order
2. 扣库存
3. 发 Email
4. 发 Notification
5. 更新 Analytics

如果所有步骤都同步执行，整个 Request 会越来越慢。

而且其中一个非核心步骤失败，也可能影响主流程。

## Async

可以让核心流程先完成，再把非立即必要的任务异步处理。

例如：

```text
Order Service
    ↓
Message Queue
  ↙   ↓   ↘
Email Analytics Notification
```

## Decoupling

Producer 不需要知道有多少 Consumer。

以后增加新的 Consumer，可以减少对原服务的修改。

## Buffer

当流量突然上涨时，Queue 可以临时吸收一部分请求。

Consumer 按自己的处理能力逐渐消费。

这可以缓解瞬间流量冲击。

## Delivery

现实系统需要考虑：

- At-most-once
- At-least-once
- Exactly-once Semantics

不同系统对 Delivery Guarantee 的支持和定义不同。

## Duplicate

如果系统使用 At-least-once Delivery，同一个 Message 可能被处理多次。

因此 Consumer 经常需要考虑 Idempotency。

## Ordering

并不是所有 Queue 都能在任意规模下保证全局顺序。

如果业务要求 Ordering，就必须明确：

- 哪些消息需要顺序
- 顺序范围是什么
- 是否可以 Partition

## Retry

Consumer 失败以后可能 Retry。

但无限 Retry 会产生新的问题。

因此常见机制包括：

- Retry Count
- Backoff
- Dead Letter Queue

## Kafka 和 RabbitMQ

不要简单理解成谁更高级。

它们的设计目标、数据模型和使用场景不同。

选型应该根据：

- Throughput
- Durability
- Ordering
- Routing
- Replay
- Consumer Model

决定。

## 面试怎么回答

先回答为什么要 Queue：

- Async
- Decoupling
- Buffer

然后主动提到新问题：

- Duplicate
- Retry
- Ordering
- Delivery Guarantee

## 最后

> Message Queue 把时间和依赖关系解耦，但同时把一致性和可靠性问题带进了系统。
