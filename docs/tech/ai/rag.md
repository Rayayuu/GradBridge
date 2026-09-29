---
title: RAG：从检索到生成
description: 理解 Retrieval-Augmented Generation 的完整流程、为什么需要 RAG，以及 Chunking、Retrieval 和 Context 的关键问题。
keywords:
  - RAG
  - Retrieval-Augmented Generation
  - Embedding
  - LLM
  - Vector Search
---

# RAG：从检索到生成

RAG 是 Retrieval-Augmented Generation。

可以把它理解成：

> 在 LLM 回答之前，先从外部知识库找到相关信息，再把这些信息作为上下文提供给模型。

## 为什么需要 RAG

LLM 自身参数中的知识存在几个限制：

- 不一定包含你的私人数据
- 不一定包含最新业务数据
- 很难直接引用公司内部文档
- 很难保证回答完全基于指定知识源

RAG 把外部知识接入生成过程。

## 一个典型 RAG Pipeline

```text
Documents
   ↓
Parse
   ↓
Chunk
   ↓
Embedding
   ↓
Vector Store

Question
   ↓
Query Embedding
   ↓
Retrieve Top-K
   ↓
Build Context
   ↓
LLM
   ↓
Answer
```

## Retrieval 是核心

如果检索出来的内容本身不相关，再强的 LLM 也只能在错误上下文上生成。

所以 RAG Quality 很大程度取决于 Retrieval Quality。

## Chunking

Chunk 太大：

- Noise 增加
- Context 浪费
- 一个向量承载太多主题

Chunk 太小：

- 上下文断裂
- 语义信息不足
- 需要更多结果才能恢复完整含义

因此 Chunking 是一个非常实际的工程问题。

## Top-K

Top-K 太小可能漏掉必要信息。

Top-K 太大则会引入噪声并占用 Context Window。

没有一个适合所有任务的固定 K。

## Reranking

第一阶段 Vector Search 找到 Candidate。

第二阶段可以再使用：

- Cross-Encoder
- Keyword Score
- Metadata
- Business Rule

重新排序。

这通常比直接扩大 Top-K 更有效。

## RAG 不等于 Fine-tuning

RAG 主要解决的是：

> 模型回答时应该看到什么知识。

Fine-tuning 更关注：

> 模型的行为、风格或特定能力如何改变。

两者解决的问题不同。

## RAG 常见失败原因

- 文档解析失败
- Chunk Boundary 不合理
- Embedding Model 不适合任务
- Query 表达和文档表达差异大
- Top-K 不合理
- Context 中噪声过多
- Prompt 没要求模型基于证据回答

## Evaluation

不能只问“感觉回答不错吗”。

可以分别评估：

- Retrieval Recall
- Retrieval Precision
- Answer Relevance
- Groundedness
- Citation Correctness

## 项目里怎么解释

如果面试官问你 RAG 项目，不要只说：

> 我用了 LangChain + Vector Database。

更应该说明：

- 数据从哪里来
- 怎么 Chunk
- 用什么 Embedding
- 怎么 Retrieval
- 如何 Rerank
- 怎么评估
- 遇到什么失败 Case

## 最后

> RAG 不是把 PDF 丢给 LLM，而是一套完整的信息检索系统。
