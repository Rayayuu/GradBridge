---
title: HTTP 与 REST API
description: 从 HTTP Method、Status Code、Header 到 REST API 设计，建立 Backend 开发和面试中的核心 Web 基础。
keywords:
  - HTTP
  - REST
  - API
  - Backend
  - Status Code
---

# HTTP 与 REST API

Backend 开发的核心之一，就是让不同系统通过网络交换数据。

HTTP 是 Web 中最常见的应用层协议。

## Request 包含什么

一个 HTTP Request 通常包含：

- Method
- URL
- Headers
- Body

例如：

```http
POST /api/users
Content-Type: application/json

{"name":"Alice"}
```

## 常见 HTTP Method

### GET

读取资源。

### POST

创建资源或执行某个操作。

### PUT

通常表示整体更新。

### PATCH

通常表示部分更新。

### DELETE

删除资源。

## Status Code

常见范围：

- 2xx：成功
- 3xx：重定向
- 4xx：客户端请求问题
- 5xx：服务端问题

常见例子：

- 200 OK
- 201 Created
- 204 No Content
- 400 Bad Request
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found
- 409 Conflict
- 500 Internal Server Error

## 401 和 403 的区别

401 通常表示当前请求没有完成有效 Authentication。

403 通常表示身份可能已经确定，但没有足够 Authorization。

## REST 是什么

REST 更像一组设计原则，而不是一个协议。

常见 API 设计会围绕 Resource。

例如：

```text
GET    /users/123
POST   /users
PATCH  /users/123
DELETE /users/123
```

而不是：

```text
/getUser
/createUser
/deleteUser
```

## Idempotency

Idempotent 表示同样的请求执行多次，与执行一次的最终效果一致。

GET、PUT、DELETE 通常被设计成 Idempotent。

POST 通常不保证。

这个概念在 Retry、Payment 和 Distributed System 中非常重要。

## Header 有什么用

常见 Header 包括：

- Content-Type
- Authorization
- Accept
- Cookie
- Cache-Control
- Origin

## API 项目中应该注意什么

- Input Validation
- Authentication
- Authorization
- Error Handling
- Status Code
- Pagination
- Logging
- Testing

## 面试怎么回答 REST

不要只说 REST 使用 GET、POST、PUT、DELETE。

更完整的是说明：

REST 倾向围绕 Resource 设计接口，使用 HTTP Method 表达操作，并利用 HTTP 的状态码、Header 和无状态通信语义。

## 最后

> API 设计的目标不是 URL 看起来漂亮，而是让客户端和服务端之间的契约清晰、稳定、可维护。
