import fs from "node:fs"
import path from "node:path"
import { pipeline } from "@huggingface/transformers"

const root = process.cwd()
const indexPath = path.join(root, "search-data", "semantic-index.json")

if (!fs.existsSync(indexPath)) {
  console.error("SEMANTIC_INDEX_NOT_FOUND")
  process.exit(1)
}

const query = process.argv.slice(2).join(" ").trim()

if (!query) {
  console.error("QUERY_REQUIRED")
  process.exit(1)
}

const index = JSON.parse(fs.readFileSync(indexPath, "utf8"))
const modelId = index.model || "Xenova/bge-small-zh-v1.5"

function dot(a, b) {
  let total = 0
  for (let i = 0; i < a.length; i += 1) total += a[i] * b[i]
  return total
}

function normalize(text) {
  return String(text || "").toLowerCase().replace(/\s+/g, " ")
}

function cjkBigrams(text) {
  const chars = String(text || "").match(/[\u3400-\u9fff]/g) || []
  const grams = []
  for (let i = 0; i < chars.length - 1; i += 1) grams.push(chars[i] + chars[i + 1])
  return [...new Set(grams)]
}

function asciiTokens(text) {
  return [...new Set((String(text || "").toLowerCase().match(/[a-z0-9+#.]+/g) || []).filter(x => x.length >= 2))]
}

function coverage(tokens, text) {
  if (!tokens.length) return 0
  const haystack = normalize(text)
  let hit = 0
  for (const token of tokens) {
    if (haystack.includes(token)) hit += 1
  }
  return hit / tokens.length
}

const queryBigrams = cjkBigrams(query)
const queryAscii = asciiTokens(query)

const intentTerms = [
  "大一", "大二", "大三", "大四",
  "实习", "面试", "后端", "前端",
  "WAM", "CV", "LeetCode", "Honours",
  "AI", "项目"
]

const queryIntentTerms = intentTerms.filter(term =>
  normalize(query).includes(normalize(term))
)

function intentScore(item) {
  const title = normalize(item.title)
  const section = normalize(item.section)
  const description = normalize(item.description)
  const content = normalize(item.content)

  let score = 0

  for (const term of queryIntentTerms) {
    const needle = normalize(term)

    if (title.includes(needle)) score += 0.010
    if (section.includes(needle)) score += 0.010
    if (description.includes(needle)) score += 0.004
    if (content.includes(needle)) score += 0.003
  }

  const yearTerms = ["大一", "大二", "大三", "大四"]
  const requestedYear = yearTerms.find(term =>
    normalize(query).includes(normalize(term))
  )

  if (requestedYear) {
    const headingText = title + " " + section

    if (headingText.includes(normalize(requestedYear))) {
      score += 0.012
    }

    for (const year of yearTerms) {
      if (year === requestedYear) continue

      if (headingText.includes(normalize(year))) {
        score -= 0.015
      }
    }
  }

  return score
}

function lexicalScore(item) {
  const title = item.title || ""
  const section = item.section || ""
  const description = item.description || ""
  const keywords = Array.isArray(item.keywords) ? item.keywords.join(" ") : String(item.keywords || "")
  const content = item.content || ""

  let score = 0
  score += coverage(queryBigrams, title) * 0.30
  score += coverage(queryBigrams, section) * 0.25
  score += coverage(queryBigrams, description) * 0.10
  score += coverage(queryBigrams, keywords) * 0.10
  score += coverage(queryBigrams, content) * 0.05

  score += coverage(queryAscii, title) * 0.10
  score += coverage(queryAscii, section) * 0.05
  score += coverage(queryAscii, description) * 0.03
  score += coverage(queryAscii, keywords) * 0.02

  return score
}

console.log("================================")
console.log("GRADBRIDGE HYBRID SEMANTIC SEARCH")
console.log("================================")
console.log("Query: " + query)
console.log("Model: " + modelId)
console.log("Indexed chunks: " + index.items.length)
console.log("")

const extractor = await pipeline("feature-extraction", modelId, { dtype: "q8" })

const output = await extractor(
  "为这个句子生成表示以用于检索相关文章：" + query,
  { pooling: "cls", normalize: true }
)

const queryVector = Array.from(output.data)

if (queryVector.length !== index.dimensions) {
  throw new Error("QUERY_VECTOR_DIMENSION_MISMATCH")
}

const ranked = index.items
  .map(item => {
    const semanticScore = dot(queryVector, item.embedding)
    const lexical = lexicalScore(item)
    const intent = intentScore(item)
    const hybridScore = semanticScore + lexical * 0.12 + intent

    return {
      ...item,
      semanticScore,
      lexicalScore: lexical,
      score: hybridScore
    }
  })
  .sort((a, b) => b.score - a.score)

const unique = []
const seen = new Set()

for (const item of ranked) {
  const key = item.route + "::" + item.section
  if (seen.has(key)) continue
  seen.add(key)
  unique.push(item)
  if (unique.length >= 6) break
}

console.log("=== TOP RESULTS ===")
console.log("")

unique.forEach((item, i) => {
  console.log("#" + (i + 1) + " hybrid=" + item.score.toFixed(6) + " semantic=" + item.semanticScore.toFixed(6))
  console.log("title: " + item.title)
  console.log("section: " + item.section)
  console.log("route: " + item.route)
  console.log("preview: " + String(item.content || "").slice(0, 160))
  console.log("")
})

if (typeof extractor.dispose === "function") await extractor.dispose()

console.log("HYBRID_SEMANTIC_SEARCH_COMPLETE")
