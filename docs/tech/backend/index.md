---
title: Backend
description: GradBridge Backend 技术路线，从 HTTP、REST、Authentication、Redis 到 Database 和真实工程问题。
keywords:
  - Backend
  - HTTP
  - REST
  - JWT
  - Redis
---

<div class="gb-tech-home">

<section class="gb-tech-hero">
<div class="gb-section-label">TECH · BACKEND</div>
<h1>Backend 不只是写 API，<br>而是在管理状态、数据和边界。</h1>
<p>从 Request 进入系统，到 Authentication、Business Logic、Database、Cache 和 Response，逐步理解一个后端服务真正发生了什么。</p>
</section>

<section class="gb-tech-section">
<div class="gb-section-label">START HERE</div>
<h2>Backend 第一组核心知识</h2>
<div class="gb-tech-topic-grid">
<div><a href="/tech/backend/http-rest-api" style="display:block;color:inherit;text-decoration:none;height:100%">
<span>WEB</span>
<h3>HTTP 与 REST API</h3>
<p>理解 Method、Status Code、Header、Resource、Idempotency 和 API Contract。</p>
</a></div>
<div><a href="/tech/backend/session-vs-jwt" style="display:block;color:inherit;text-decoration:none;height:100%">
<span>AUTH</span>
<h3>Session vs JWT</h3>
<p>从状态保存、撤销、安全和分布式部署理解两种认证思路。</p>
</a></div>
<div><a href="/tech/backend/redis-persistence" style="display:block;color:inherit;text-decoration:none;height:100%">
<span>CACHE</span>
<h3>Redis 持久化</h3>
<p>RDB、AOF、TTL 和 Cache 背后的性能与可靠性权衡。</p>
</a></div>
</div>
</section>

<section class="gb-tech-section gb-tech-method">
<div class="gb-section-label">MENTAL MODEL</div>
<h2>一条 Request 如何经过 Backend</h2>
<div class="gb-tech-method-grid">
<div><span>01</span><h3>Receive</h3><p>HTTP Request 进入 Controller / Handler。</p></div>
<div><span>02</span><h3>Validate</h3><p>确认输入格式、参数和业务前置条件。</p></div>
<div><span>03</span><h3>Authenticate</h3><p>判断用户是谁，以及是否具备操作权限。</p></div>
<div><span>04</span><h3>Execute</h3><p>运行 Business Logic，并访问 Database / Cache。</p></div>
</div>
</section>

<section class="gb-tech-section">
<div class="gb-section-label">COMING NEXT</div>
<h2>下一阶段会继续补充</h2>
<p class="gb-tech-lead">Spring Boot、Validation、Exception Handling、Testing、Docker、Logging、Message Queue、Deployment 与 Backend System Design。</p>
</section>

</div>
