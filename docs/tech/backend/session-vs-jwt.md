---
title: Session vs JWT
description: 从状态保存、撤销、Cookie、安全与扩展性角度理解 Session 和 JWT 两种常见认证方案。
keywords:
  - Session
  - JWT
  - Authentication
  - Cookie
  - Backend
---

# Session vs JWT

Session 和 JWT 经常被简单理解成：

> Session 旧，JWT 新。

这种理解是不准确的。

它们更重要的区别是：认证状态放在哪里，以及服务端如何控制它。

## Session 的基本流程

用户登录成功后：

1. 服务端创建 Session
2. Session 数据保存在服务端
3. 客户端收到 Session ID
4. 浏览器通常通过 Cookie 发送 Session ID
5. 服务端根据 ID 找到 Session

所以核心状态仍然由 Server 控制。

## JWT 的基本流程

用户登录成功后：

1. 服务端生成 Token
2. Token 包含 Claims
3. Token 被签名
4. 客户端保存 Token
5. 后续请求携带 Token
6. 服务端验证签名和有效期

JWT 的内容通常可以被读取，但不能在不知道签名密钥的情况下被合法篡改。

## 为什么 JWT 难主动撤销

如果服务端只是验证：

- Signature
- Expiration

那么一个已经签发且尚未过期的 JWT，本身仍然有效。

服务端没有天然保存“这个 Token 已经被撤销”的状态。

所以 Logout、账号封禁、Token 泄漏等场景会变复杂。

解决方式可能包括：

- Short-lived Access Token
- Refresh Token
- Token Blacklist
- Token Version
- Server-side Revocation State

但一旦加入这些状态，系统又开始重新引入服务端状态管理。

## Session 为什么更容易撤销

因为 Session 本身通常存在 Server。

删除 Session 后，对应 Session ID 就不能再恢复有效登录状态。

## Cookie 和 Session 不是同一个东西

Cookie 是浏览器存储和发送数据的一种机制。

Session 是服务端管理登录状态的一种方式。

Session ID 经常放在 Cookie 中，但两者不是同一个概念。

## JWT 放哪里

常见选择包括：

- HttpOnly Cookie
- Memory
- Local Storage

不同方案会带来不同安全取舍。

例如 Local Storage 中的 Token 更容易受到 XSS 读取。

## Session 的扩展问题

如果有多个 Backend Instance，需要考虑 Session 如何共享。

常见方式包括：

- Redis Session Store
- Sticky Session
- Shared Database

## JWT 就一定更适合微服务吗

不一定。

JWT 可以减少部分中心 Session Lookup，但同时增加 Token 生命周期、撤销、权限更新和密钥管理复杂度。

## 面试怎么回答

可以从四个维度回答：

1. State 放在哪里
2. Server 如何撤销
3. Distributed Deployment
4. Security / Token Lifecycle

## 最后

Session 和 JWT 没有绝对赢家。

> 认证方案应该根据系统规模、安全要求、撤销需求和架构复杂度选择。
