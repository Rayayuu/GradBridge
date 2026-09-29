---
title: Agent、LangChain、LangGraph 与 MCP
description: 区分 AI Agent、LangChain、LangGraph 和 MCP 分别解决什么问题，以及它们在 Agent System 中如何协作。
keywords:
  - AI Agent
  - LangChain
  - LangGraph
  - MCP
  - Tool Calling
---

# Agent、LangChain、LangGraph 与 MCP

这几个概念经常被混在一起。

最简单的区分方式是：

- Agent：一种系统行为模式
- LangChain：构建 LLM Application 的工具生态
- LangGraph：更适合表达有状态、多步骤 Agent Workflow
- MCP：让 AI Application 以标准化方式连接外部工具和数据源的一种协议

## 什么是 Agent

一个普通 Chatbot 通常是：

```text
User → LLM → Answer
```

Agent 更可能是：

```text
User
 ↓
Reason / Decide
 ↓
Choose Tool
 ↓
Execute
 ↓
Observe Result
 ↓
Continue or Finish
```

核心变化是模型不只生成文本，还能够影响后续执行流程。

## Tool Calling

Agent 常见能力来自 Tool。

例如：

- Search
- Database Query
- API
- File Access
- Calculator
- Calendar
- Code Execution

LLM 决定何时调用哪个 Tool，然后系统执行实际操作。

## LangChain

LangChain 提供大量用于构建 LLM Application 的抽象和集成。

例如：

- Model
- Prompt
- Retriever
- Tool
- Structured Output
- Agent

它更像一个广泛的 LLM Application Toolkit。

## LangGraph

当 Workflow 开始出现：

- 多个步骤
- Condition
- Loop
- State
- Retry
- Human Approval

单纯 Chain 很快会变复杂。

LangGraph 更强调显式 Graph 和 State。

例如：

```text
START
  ↓
Planner
  ↓
Tool Executor
  ↓
Check Result
 ↙       ↘
Retry     Finish
```

## 为什么 Agent 需要 State

多步骤任务需要保存：

- Conversation
- Tool Results
- Current Step
- Intermediate Data
- Error

否则每一步都不知道之前发生了什么。

## MCP

MCP 的重点不是“让模型更聪明”。

它解决的是：

> AI Application 如何用统一方式发现和调用外部能力。

你可以把它类比成 AI Tool Integration 的标准接口层。

## MCP 和 FastAPI 一样吗

不是。

FastAPI 是构建 HTTP API 的 Web Framework。

MCP 定义的是 AI Client / Server 之间如何暴露和使用 Tool、Resource 等能力的协议。

底层实现仍然可能使用不同 Transport。

## 它们之间怎么组合

一个系统完全可能是：

```text
LangGraph
   ↓
Agent Workflow
   ↓
Tool
   ↓
MCP Client
   ↓
MCP Server
   ↓
External System
```

## Agent 最大的问题不是能不能调用 Tool

真正困难的地方通常是：

- Tool Selection
- Error Recovery
- State Management
- Infinite Loop
- Permission
- Reliability
- Observability
- Evaluation

## 面试怎么回答 LangChain vs LangGraph

可以说：

LangChain 更广泛地提供 LLM Application Components；LangGraph 更适合把复杂、有状态、带分支和循环的 Agent Workflow 显式建模成 Graph。

## 最后

> 不要从“我应该学哪个框架”开始，而要先判断你的 AI System 到底需要 Retrieval、Tool、State、Workflow 还是 Protocol Integration。
