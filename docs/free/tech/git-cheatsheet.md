---
title: Git Cheat Sheet
description: 学生项目和团队开发最常见 Git 命令与协作流程速查。
keywords:
  - Git
  - GitHub
  - Cheat Sheet
  - Pull Request
---

# Git Cheat Sheet

## 查看状态

```bash
git status
```

## 查看修改

```bash
git diff
```

## Stage

```bash
git add <file>
git add -A
```

## Commit

```bash
git commit -m "feat: add login"
```

## 查看历史

```bash
git log --oneline
```

## 创建 Branch

```bash
git switch -c feature/login
```

## 切换 Branch

```bash
git switch main
```

## 更新远端信息

```bash
git fetch origin
```

## Pull

```bash
git pull origin main
```

## Push

```bash
git push origin feature/login
```

## Merge

```bash
git merge feature/login
```

## Rebase

```bash
git rebase main
```

注意：不要随意 Rebase 已经被多人共享的历史。

## 撤销未 Stage 的文件修改

```bash
git restore <file>
```

## 查看 Staged Diff

```bash
git diff --cached
```

## 推荐团队流程

```text
pull latest main
→ create branch
→ implement
→ test
→ commit
→ push
→ pull request
→ review
→ merge
```

## Commit Prefix 示例

- feat: 新功能
- fix: Bug Fix
- docs: 文档
- refactor: 重构
- test: 测试
- chore: 工程维护

## 最后

> Git 最重要的能力不是记住命令，而是知道当前代码状态，以及每一步会怎样改变历史。
