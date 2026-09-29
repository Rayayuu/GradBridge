---
title: Security
description: 从 Authentication、XSS、CSRF、Injection 到 Access Control，用开发者视角建立 Web Security 基础。
keywords:
  - Security
  - XSS
  - CSRF
  - Authentication
  - Access Control
---

<div class="gb-tech-home">

<section class="gb-tech-hero">
<div class="gb-section-label">TECH · SECURITY</div>
<h1>安全不是最后加上的功能，<br>而是系统设计的一部分。</h1>
<p>真正理解 Security，需要知道数据从哪里进入、谁被信任、权限在哪里检查，以及攻击者能够控制什么。</p>
</section>

<section class="gb-tech-section">
<div class="gb-section-label">START HERE</div>
<h2>从浏览器最经典的两个问题开始</h2>
<div class="gb-tech-topic-grid">
<div><a href="/tech/security/xss-vs-csrf" style="display:block;color:inherit;text-decoration:none;height:100%">
<span>WEB SECURITY</span>
<h3>XSS vs CSRF</h3>
<p>理解两类攻击分别利用什么信任关系，以及防御措施为什么有效。</p>
</a></div>
<div><a href="/tech/backend/session-vs-jwt" style="display:block;color:inherit;text-decoration:none;height:100%">
<span>AUTH</span>
<h3>Session vs JWT</h3>
<p>认证状态、Cookie、Token 生命周期和撤销机制同样属于安全设计。</p>
</a></div>
</div>
</section>

<section class="gb-tech-section gb-tech-method">
<div class="gb-section-label">SECURITY MODEL</div>
<h2>分析安全问题时先问四件事</h2>
<div class="gb-tech-method-grid">
<div><span>01</span><h3>Asset</h3><p>系统真正需要保护的是什么。</p></div>
<div><span>02</span><h3>Input</h3><p>攻击者能够控制哪些输入和请求。</p></div>
<div><span>03</span><h3>Trust</h3><p>系统在哪些地方错误地相信了数据或身份。</p></div>
<div><span>04</span><h3>Boundary</h3><p>Authentication、Authorization 和 Validation 在哪里发生。</p></div>
</div>
</section>

<section class="gb-tech-section">
<div class="gb-section-label">COMING NEXT</div>
<h2>继续进入真实漏洞</h2>
<p class="gb-tech-lead">SQL Injection、Access Control、Password Storage、CORS、SSRF、Path Traversal，以及 CodeQL 如何静态分析安全问题。</p>
</section>

</div>
