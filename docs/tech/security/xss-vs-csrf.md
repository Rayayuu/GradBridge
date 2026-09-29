---
title: XSS vs CSRF
description: 从浏览器信任模型理解 XSS 与 CSRF 分别利用了什么，以及常见防御方法为什么有效。
keywords:
  - XSS
  - CSRF
  - Web Security
  - Cookie
  - SameSite
---

# XSS vs CSRF

XSS 和 CSRF 经常一起出现，但它们利用的是完全不同的信任关系。

## XSS

XSS 的核心问题是：

> 攻击者让恶意脚本在受信任网站的上下文中执行。

如果应用把用户输入直接作为 HTML 注入页面，就可能产生风险。

## XSS 能做什么

取决于页面权限和浏览器环境，恶意脚本可能：

- 读取页面内容
- 修改 DOM
- 代表用户发请求
- 读取可访问的 Token
- 窃取敏感信息

## 常见防御

- Output Encoding
- HTML Sanitization
- Avoid unsafe DOM APIs
- Content Security Policy
- HttpOnly Cookie

HttpOnly 可以降低 JavaScript 直接读取 Cookie 的能力，但并不能“解决所有 XSS”。

## CSRF

CSRF 的核心问题是：

> 浏览器会自动携带某些认证凭证。

攻击者诱导已登录用户访问恶意页面，然后向目标网站发起请求。

如果目标网站只依赖自动携带的 Cookie 来识别用户，并且没有额外验证，就可能执行非用户真实意图的操作。

## 为什么 Cookie 和 CSRF 有关系

因为浏览器可能自动为目标域名附带 Cookie。

攻击者不一定需要知道 Cookie 的具体值。

## 常见防御

- CSRF Token
- SameSite Cookie
- Origin / Referer Validation
- Re-authentication for sensitive actions

## XSS 和 CSRF 最大区别

### XSS

攻击代码进入并运行在目标网站上下文。

### CSRF

攻击者利用用户已经存在的登录状态诱导浏览器发送请求。

## JWT 能自动解决 CSRF 吗

不能简单这样说。

如果 JWT 存在 Cookie 中并自动发送，仍然需要考虑 CSRF。

如果 Token 由 JavaScript 从其他位置主动加入 Authorization Header，CSRF 风险模型会不同，但又需要考虑 XSS 对 Token 的影响。

## 面试怎么回答

可以从“谁信任谁”回答：

- XSS：网站错误信任并执行了恶意内容
- CSRF：网站错误信任了浏览器自动带来的已认证请求

## 最后

> Security 很少是单一技术的胜负，而是在浏览器、认证方式和数据流之间理解完整威胁模型。
