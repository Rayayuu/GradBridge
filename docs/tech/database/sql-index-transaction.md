---
title: SQL、Index 与 Transaction
description: 从查询、索引、事务到 ACID，建立 Backend 和 Technical Interview 中最重要的数据库基础。
keywords:
  - SQL
  - Database
  - Index
  - Transaction
  - ACID
---

# SQL、Index 与 Transaction

数据库不是“把数据存进去”这么简单。

真实系统还要解决：

- 如何快速找到数据
- 多个操作如何保持一致
- 并发修改会发生什么
- 查询为什么越来越慢

## SQL 在做什么

SQL 是描述“我要什么数据”，而不是逐步告诉数据库“怎么找”。

例如：

```sql
SELECT id, name
FROM users
WHERE email = ?;
```

真正的执行方式由 Database Optimizer 决定。

## Index 是什么

Index 可以理解成帮助数据库更快定位数据的额外数据结构。

如果 users 有一百万行，而 email 没有合适索引，数据库可能需要扫描大量记录。

有索引以后，可以更快缩小查找范围。

## 为什么不能给所有字段都加 Index

因为 Index 也有成本：

- 占用额外存储
- INSERT 需要维护索引
- UPDATE 可能维护索引
- DELETE 需要维护索引
- 索引过多会增加写入成本

所以 Index 是典型的 Read / Write Trade-off。

## Composite Index

多列索引的字段顺序很重要。

例如：

```sql
INDEX(status, created_at)
```

它是否有效取决于真实查询模式。

不要把 Composite Index 理解成多个单列索引简单相加。

## Transaction

Transaction 用于把多个操作看成一个逻辑整体。

例如转账：

1. A 扣 100
2. B 加 100

如果第一步成功、第二步失败，系统就会出现错误状态。

Transaction 可以让这些操作一起成功或一起失败。

## ACID

### Atomicity

操作要么全部完成，要么全部回滚。

### Consistency

事务前后都应该满足系统的数据约束。

### Isolation

多个并发事务不应该随意看到彼此未完成的中间状态。

### Durability

提交成功的数据应该能够持久保存。

## Isolation 为什么复杂

并发事务可能出现：

- Dirty Read
- Non-repeatable Read
- Phantom Read

更强的 Isolation 通常意味着更严格的并发控制，也可能影响吞吐量。

## 项目中怎么用

典型场景：

- 下单
- 支付
- 库存修改
- Booking
- Account Balance

只要一个业务操作涉及多个必须保持一致的写操作，就应该思考 Transaction。

## 面试怎么回答 Index 为什么快

不要只说：

> 因为 Index 使用 B+ Tree。

更完整的回答应该包含：

1. 减少需要扫描的数据
2. 数据结构支持高效查找
3. 代价是额外空间和写入维护成本
4. 是否有效取决于查询模式

## 最后

数据库优化从来不是“加一个索引”这么简单。

> 先理解访问模式，再选择数据结构、事务边界和一致性要求。
