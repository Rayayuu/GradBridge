---
title: Embedding 与 Vector Search
description: 从向量表示、相似度到 Semantic Search，理解 Embedding 为什么能够支持 RAG 和语义检索。
keywords:
  - Embedding
  - Vector Search
  - Semantic Search
  - Cosine Similarity
  - AI Engineering
---

# Embedding 与 Vector Search

Embedding 的核心目标是：

> 把文本、图片或其他对象转换成可以被计算机比较的向量表示。

## 为什么关键词搜索不够

关键词搜索更关注字面是否重合。

例如：

- “怎么准备后端面试”
- “Backend technical interview preparation”

字面差异很大，但语义接近。

Embedding 希望让语义相近的内容在向量空间中也更接近。

## Vector 是什么

一个文本经过 Embedding Model 后，会得到类似：

```text
[0.12, -0.08, 0.31, ...]
```

这样的高维数字数组。

每一个数字本身通常没有直观的人类语义。

真正有价值的是整个向量在空间中的相对位置。

## Similarity

最常见的比较方式之一是 Cosine Similarity。

它关注两个向量方向是否相近。

如果向量已经 Normalize，Dot Product 也常被用于高效比较。

## Semantic Search 流程

典型流程：

```text
Documents
   ↓
Chunking
   ↓
Embedding
   ↓
Vector Index

User Query
   ↓
Query Embedding
   ↓
Similarity Search
   ↓
Top-K Results
```

## Chunking 为什么重要

如果把整本书变成一个向量，检索粒度会太粗。

如果每一句话都变成独立 Chunk，又可能失去上下文。

所以 Chunk Size、Overlap 和 Section Boundary 都会影响 Retrieval Quality。

## Metadata

除了向量，通常还会保存：

- Title
- Route
- Section
- Source
- Category
- Keywords

Metadata 可以用于 Filter、Display 和 Reranking。

## Vector Database

数据规模小时，可以直接在内存或静态 JSON 中比较所有向量。

数据规模变大以后，通常会考虑：

- pgvector
- Qdrant
- Pinecone
- Milvus
- 其他 ANN Vector Index

核心目的都是更高效地找到相似向量。

## Approximate Nearest Neighbor

当向量数量非常多时，逐个比较所有向量成本很高。

ANN 的目标是用更低成本找到“足够接近”的候选结果。

这是 Recall、Latency 和 Memory 之间的工程权衡。

## Hybrid Search

纯 Vector Search 并不总是最好。

真实系统经常把：

- Semantic Similarity
- Keyword Match
- Metadata
- Intent
- Reranking

组合起来。

GradBridge 当前语义搜索本身就是这种思路。

## 面试怎么回答

推荐从四层回答：

1. Embedding 把内容表示成 Vector
2. Query 也转换成同一向量空间
3. 使用 Similarity 找 Top-K
4. 大规模系统使用 Vector Index / Vector Database 提高效率

## 最后

> Embedding 的价值不在“生成一个向量”，而在于让非结构化信息第一次可以通过距离进行检索和比较。
