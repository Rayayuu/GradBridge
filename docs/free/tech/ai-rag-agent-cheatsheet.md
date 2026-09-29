---
title: AI、RAG 与 Agent 概念速查
description: Embedding、Vector Search、RAG、Agent、LangChain、LangGraph 和 MCP 的一页概念速查。
keywords:
  - AI
  - RAG
  - Agent
  - LangGraph
  - MCP
---

# AI、RAG 与 Agent 概念速查

## Embedding

把文本或其他对象转换成高维 Vector Representation。

用途：

- Semantic Search
- Retrieval
- Similarity
- Clustering

## Vector Search

把 Query 也转换成 Vector，然后找到最相似的 Top-K Candidate。

常见 Similarity：

- Cosine Similarity
- Dot Product

## RAG

```text
Question
→ Retrieve
→ Context
→ LLM
→ Answer
```

RAG 最大风险之一：Retrieval 本身找错内容。

## Chunking

Chunk 太大：Noise 多。

Chunk 太小：Context 断裂。

## Agent

Agent 不只是输出文字，还可能：

- Decide
- Choose Tool
- Execute
- Observe
- Continue

## Tool Calling

LLM 决定调用什么工具，但真正的工具操作由系统执行。

## LangChain

广泛的 LLM Application Toolkit。

## LangGraph

更适合：

- State
- Branch
- Loop
- Retry
- Multi-step Workflow

## MCP

用于 AI Application 与外部 Tool / Resource 之间的标准化连接。

MCP 不是 Model，也不是 Web Framework。

## 一句话区分

```text
Embedding = 表示信息
Vector Search = 找信息
RAG = 把信息交给 LLM
Agent = 让模型参与决策和执行流程
LangChain = LLM App 工具生态
LangGraph = Stateful Agent Workflow
MCP = 外部能力连接协议
```

## 推荐继续阅读

- [Embedding 与 Vector Search](/tech/ai/embedding-vector-search)
- [RAG](/tech/ai/rag)
- [Agent · LangChain · LangGraph · MCP](/tech/ai/agent-langchain-langgraph-mcp)

## 最后

> 先理解每一个概念解决的问题，再决定需要使用什么框架。
