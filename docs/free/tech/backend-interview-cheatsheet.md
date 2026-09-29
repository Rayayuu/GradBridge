---
title: Backend Interview Cheat Sheet
description: HTTP、REST、Authentication、Database、Redis、Queue 和 System Design 的后端面试快速复习表。
keywords:
  - Backend
  - Interview
  - Cheat Sheet
  - Redis
  - HTTP
---

# Backend Interview Cheat Sheet

这页适合面试前快速复习，不替代完整学习。

## HTTP

- GET：读取
- POST：创建或执行操作
- PUT：通常整体更新
- PATCH：通常部分更新
- DELETE：删除
- 401：Authentication 问题
- 403：Authorization 问题
- 404：Resource 不存在
- 500：Server Error

## REST

关键词：

- Resource-oriented
- HTTP Method
- Status Code
- Stateless
- Idempotency

## Session vs JWT

Session：

- State 主要在 Server
- 容易主动撤销
- 多实例需要共享 Session

JWT：

- Token 自带 Claims
- 服务端可验证签名
- 未过期 Token 天然较难主动撤销

## Database

Index：

- 减少扫描范围
- 提高 Read
- 增加 Storage 和 Write Cost

Transaction：

- Atomicity
- Consistency
- Isolation
- Durability

## Redis

常见用途：

- Cache
- Session
- Counter
- Rate Limiting

RDB：Snapshot。

AOF：记录写操作。

## Cache

常见问题：

- Cache Miss
- TTL
- Invalidation
- Stampede
- Hot Key

## Message Queue

主要价值：

- Async
- Decoupling
- Buffer

新问题：

- Retry
- Duplicate
- Ordering
- Delivery Guarantee

## System Design 回答顺序

```text
Requirement
→ Bottleneck
→ Component
→ Trade-off
```

## 推荐继续阅读

- [HTTP 与 REST API](/tech/backend/http-rest-api)
- [Session vs JWT](/tech/backend/session-vs-jwt)
- [Redis 持久化](/tech/backend/redis-persistence)
- [System Design](/tech/system-design/)

## 最后

> Cheat Sheet 是为了帮你快速恢复知识结构，而不是代替真正理解。
