---
title: Git 与真实工程协作
description: 从 Commit、Branch、Merge、Rebase、Pull Request 到 Code Review，理解 Git 在真实软件团队里的作用。
keywords:
  - Git
  - GitHub
  - Pull Request
  - Code Review
  - Software Engineering
---

# Git 与真实工程协作

Git 不只是把代码上传到 GitHub。

在真实工程里，它承担的是：

- Version History
- Parallel Development
- Review
- Collaboration
- Rollback
- Release Traceability

## Commit

Commit 是一个有意义的代码状态记录。

好的 Commit 应该尽量表达一个清晰目的。

例如：

```text
feat: add JWT authentication
fix: handle duplicate booking request
docs: add backend setup guide
```

## Branch

Branch 允许不同工作并行开发。

例如：

```text
main
feature/login
feature/search
fix/payment-timeout
```

## Pull Request

PR 的价值不是“告诉别人我写完了”。

它是一个 Review Unit。

一个好的 PR 应该让 Reviewer 快速理解：

- 为什么改
- 改了什么
- 怎么测试
- 有没有风险

## Code Review

Review 可以检查：

- Correctness
- Readability
- Maintainability
- Security
- Testing
- Architecture

接受 Review 不是代码能力差，而是成熟工程流程的一部分。

## Merge

Merge 会把两个开发历史结合。

如果双方修改了同一部分内容，就可能出现 Conflict。

Conflict 不是 Git 坏了，而是 Git 无法自动判断哪个版本才符合业务意图。

## Rebase

Rebase 可以把一组 Commit 重新放到新的 Base 上。

它可以帮助保持更线性的历史，但会重写 Commit History。

所以对已经共享的历史要谨慎操作。

## Merge vs Rebase

没有绝对统一答案。

关键是团队 Workflow 是否清晰和一致。

## .gitignore

常见不应该进入 Repo 的内容包括：

- node_modules
- Build Output
- Cache
- Local Environment
- Secret
- API Key

## 不要把 Secret Commit 进去

即使后来删除文件，Secret 也可能已经存在 Git History。

所以应该从一开始就使用 Environment Variable 和 Secret Management。

## 一个常见团队流程

```text
pull latest main
create branch
implement
test
commit
push
open PR
code review
fix feedback
merge
```

## 面试怎么回答 Git

不要只说会 git add / commit / push。

应该能够解释：

- 为什么需要 Branch
- PR 如何工作
- Conflict 怎么处理
- Merge / Rebase 区别
- Code Review 的作用

## 最后

> Git 真正体现的不是命令记忆，而是你是否理解多人如何安全地修改同一个代码库。
