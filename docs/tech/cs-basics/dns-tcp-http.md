---
title: 输入 URL 后发生了什么
description: 从 DNS、IP、TCP、TLS 到 HTTP，用一条完整链路理解浏览器访问网站时发生的事情。
keywords:
  - DNS
  - TCP
  - HTTP
  - HTTPS
  - Networking
---

# 输入 URL 后发生了什么

这是非常经典的 Network Interview Question。

真正价值不是背流程，而是把多个网络概念连接起来。

假设你输入：

```text
https://example.com
```

## 1. 浏览器解析 URL

浏览器先确定：

- Protocol
- Host
- Port
- Path

HTTPS 默认通常使用 443。

## 2. DNS 查找 IP

计算机最终需要连接 IP，而不是直接连接域名字符串。

所以需要把：

```text
example.com
```

解析成 IP Address。

可能涉及：

- Browser Cache
- OS Cache
- Local Resolver
- Recursive DNS Resolver
- Root
- TLD
- Authoritative DNS

实际流程会受到 Cache 影响。

## 3. 建立连接

对于传统 HTTP/1.1 或 HTTP/2 over TCP，客户端需要和 Server 建立 TCP Connection。

TCP 提供：

- Reliable Delivery
- Ordered Delivery
- Retransmission
- Flow Control

## 4. TCP Three-way Handshake

经典流程：

```text
Client -> SYN
Server -> SYN-ACK
Client -> ACK
```

目的是让双方建立连接状态并确认通信能力。

## 5. HTTPS 还需要 TLS

HTTPS 可以理解成 HTTP over secure transport。

TLS 负责：

- Encryption
- Integrity
- Server Authentication

浏览器还会验证 Server Certificate。

## 6. 发送 HTTP Request

例如：

```http
GET / HTTP/1.1
Host: example.com
```

Server 收到以后开始处理请求。

## 7. Server 返回 Response

包括：

- Status Code
- Headers
- Body

Body 可能是 HTML、JSON、Image 等。

## 8. 浏览器继续加载资源

HTML 中可能还有：

- CSS
- JavaScript
- Image
- Font
- API Request

所以一个网页往往对应很多网络请求。

## TCP 和 UDP

TCP 强调可靠、有序和连接状态。

UDP 更轻量，不保证可靠和顺序。

不同协议会根据需求选择不同传输方式。

## 面试怎么回答

建议按层次回答：

URL → DNS → Connection → TLS → HTTP → Server → Browser Rendering。

如果面试官继续追问，再深入 DNS Cache、TCP Handshake、TLS 或 HTTP。

## 最后

> 一个 URL 背后其实连接了 DNS、Transport、Security、HTTP 和 Browser 五个不同层次的问题。
