<script setup>
import { ref, onMounted } from "vue"
import { withBase } from "vitepress"

const query = ref("")
const results = ref([])
const loading = ref(false)
const hasSearched = ref(false)
const errorMessage = ref("")
const modelState = ref("正在准备语义搜索...")

let cachedIndex = null
let extractorPromise = null

async function loadIndex() {
  if (cachedIndex) return cachedIndex

  const response = await fetch(withBase("/search/semantic-index.json"))

  if (!response.ok) {
    throw new Error("无法加载 GradBridge 语义索引")
  }

  cachedIndex = await response.json()
  return cachedIndex
}

async function getExtractor() {
  if (!extractorPromise) {
    modelState.value = "正在加载语义模型..."

    extractorPromise = import("@huggingface/transformers")
      .then(async module => {
        module.env.useBrowserCache = true
        module.env.backends.onnx.wasm.numThreads = 1
        module.env.backends.onnx.wasm.proxy = false

        let extractor = null
        let backend = "WASM"

        if (typeof navigator !== "undefined" && "gpu" in navigator) {
          try {
            modelState.value = "正在使用 GPU 准备语义模型..."

            extractor = await module.pipeline(
              "feature-extraction",
              "Xenova/bge-small-zh-v1.5",
              {
                dtype: "q8",
                device: "webgpu"
              }
            )

            backend = "WebGPU"
          } catch (webgpuError) {
            console.warn("WebGPU unavailable, falling back to WASM:", webgpuError)
          }
        }

        if (!extractor) {
          modelState.value = "正在使用兼容模式准备语义模型..."

          extractor = await module.pipeline(
            "feature-extraction",
            "Xenova/bge-small-zh-v1.5",
            { dtype: "q8" }
          )
        }

        modelState.value = "正在预热语义模型..."

        await extractor("测试", {
          pooling: "cls",
          normalize: true
        })

        modelState.value = "语义模型已就绪 · " + backend
        return extractor
      })
      .catch(error => {
        extractorPromise = null
        modelState.value = "语义模型加载失败"
        throw error
      })
  }

  return extractorPromise
}

function dot(a, b) {
  let total = 0

  for (let i = 0; i < a.length; i += 1) {
    total += a[i] * b[i]
  }

  return total
}

function normalize(text) {
  return String(text || "").toLowerCase().replace(/\s+/g, " ")
}

function cjkBigrams(text) {
  const chars = String(text || "").match(/[\u3400-\u9fff]/g) || []
  const grams = []

  for (let i = 0; i < chars.length - 1; i += 1) {
    grams.push(chars[i] + chars[i + 1])
  }

  return [...new Set(grams)]
}

function asciiTokens(text) {
  return [...new Set(
    (String(text || "").toLowerCase().match(/[a-z0-9+#.]+/g) || [])
      .filter(token => token.length >= 2)
  )]
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

const intentTerms = [
  "大一", "大二", "大三", "大四",
  "实习", "面试", "后端", "前端",
  "WAM", "CV", "LeetCode", "Honours",
  "AI", "项目"
]

function makeQueryFeatures(queryText) {
  return {
    bigrams: cjkBigrams(queryText),
    ascii: asciiTokens(queryText),
    intents: intentTerms.filter(term =>
      normalize(queryText).includes(normalize(term))
    )
  }
}

function lexicalScore(item, features) {
  const title = item.title || ""
  const section = item.section || ""
  const description = item.description || ""
  const keywords = Array.isArray(item.keywords)
    ? item.keywords.join(" ")
    : String(item.keywords || "")
  const content = item.content || ""

  let score = 0

  score += coverage(features.bigrams, title) * 0.30
  score += coverage(features.bigrams, section) * 0.25
  score += coverage(features.bigrams, description) * 0.10
  score += coverage(features.bigrams, keywords) * 0.10
  score += coverage(features.bigrams, content) * 0.05

  score += coverage(features.ascii, title) * 0.10
  score += coverage(features.ascii, section) * 0.05
  score += coverage(features.ascii, description) * 0.03
  score += coverage(features.ascii, keywords) * 0.02

  return score
}

function intentScore(item, queryText, features) {
  const title = normalize(item.title)
  const section = normalize(item.section)
  const description = normalize(item.description)
  const content = normalize(item.content)

  let score = 0

  for (const term of features.intents) {
    const needle = normalize(term)

    if (title.includes(needle)) score += 0.010
    if (section.includes(needle)) score += 0.010
    if (description.includes(needle)) score += 0.004
    if (content.includes(needle)) score += 0.003
  }

  const yearTerms = ["大一", "大二", "大三", "大四"]
  const requestedYear = yearTerms.find(term =>
    normalize(queryText).includes(normalize(term))
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
function cleanPreview(text) {
  const value = String(text || "").replace(/\s+/g, " ").trim()
  return value.length > 180 ? value.slice(0, 180) + "…" : value
}

async function runSearch() {
  const value = query.value.trim()

  if (!value || loading.value) return

  loading.value = true
  hasSearched.value = true
  errorMessage.value = ""
  results.value = []

  try {
    const [index, extractor] = await Promise.all([
      loadIndex(),
      getExtractor()
    ])

    const output = await extractor("为这个句子生成表示以用于检索相关文章：" + value, {
      pooling: "cls",
      normalize: true
    })

    const queryVector = Array.from(output.data)

    if (queryVector.length !== index.dimensions) {
      throw new Error("语义向量维度不一致")
    }

    const features = makeQueryFeatures(value)

    const ranked = index.items
      .map(item => {
        const semanticScore = dot(queryVector, item.embedding)
        const lexical = lexicalScore(item, features)
        const intent = intentScore(item, value, features)

        return {
          ...item,
          semanticScore,
          score: semanticScore + lexical * 0.12 + intent
        }
      })
      .sort((a, b) => b.score - a.score)

    const picked = []
    const routeCounts = new Map()

    for (const item of ranked) {
      const count = routeCounts.get(item.route) || 0

      if (count >= 2) continue

      routeCounts.set(item.route, count + 1)
      picked.push({
        ...item,
        preview: cleanPreview(item.content)
      })

      if (picked.length >= 8) break
    }

    results.value = picked
  } catch (error) {
    console.error(error)
    errorMessage.value = "语义搜索加载失败：" + (error?.message || String(error))
  } finally {
    loading.value = false
  }
}

function useSuggestion(text) {
  query.value = text
  runSearch()
}
onMounted(() => {
  getExtractor().catch(error => {
    console.error("GradBridge semantic model preload failed:", error)
  })
})

</script>

<template>
<div class="gb-semantic-search">
  <div class="gb-semantic-intro">
    <span class="gb-semantic-eyebrow">SEMANTIC SEARCH</span>
    <h2>不用记文章标题，直接问你的问题。</h2>
    <p>GradBridge 会理解问题的语义，并从学习、技术、求职与生活内容中寻找最相关的段落。</p>
  </div>

  <form class="gb-semantic-form" @submit.prevent="runSearch">
    <input
      v-model="query"
      type="text"
      autocomplete="off"
      placeholder="例如：大三想找实习，后端面试应该准备什么？"
      aria-label="语义搜索"
    />
    <button type="submit" :disabled="loading || !query.trim()">
      {{ loading ? "搜索中…" : "语义搜索" }}
    </button>
  </form>

  <div class="gb-semantic-suggestions">
    <span>试试：</span>
    <button type="button" @click="useSuggestion('我刚进入大学，应该先学什么？')">大一怎么开始</button>
    <button type="button" @click="useSuggestion('什么时候应该开始准备第一份实习？')">第一份实习</button>
    <button type="button" @click="useSuggestion('成绩已经不错了，还应该继续冲 WAM 吗？')">WAM 与项目</button>
  </div>

  <div class="gb-semantic-status">
    <span class="gb-semantic-dot"></span>
    {{ modelState }}
  </div>

  <p v-if="errorMessage" class="gb-semantic-error">{{ errorMessage }}</p>

  <div v-if="hasSearched && !loading && !errorMessage" class="gb-semantic-results">
    <div class="gb-semantic-results-head">
      <span>SEARCH RESULTS</span>
      <strong>{{ results.length }} 个相关结果</strong>
    </div>

    <a
      v-for="item in results"
      :key="item.id"
      class="gb-semantic-result"
      :href="withBase(item.route)"
    >
      <div class="gb-semantic-result-meta">
        <span>{{ item.title }}</span>
        <span>{{ item.section }}</span>
      </div>
      <h3>{{ item.section }}</h3>
      <p>{{ item.preview }}</p>
      <strong>查看内容 →</strong>
    </a>

    <div v-if="results.length === 0" class="gb-semantic-empty">
      暂时没有找到合适内容。可以换一种自然语言描述再试一次。
    </div>
  </div>
</div>
</template>

<style scoped>
.gb-semantic-search { max-width: 900px; margin: 32px auto 80px; }
.gb-semantic-intro { margin-bottom: 28px; }
.gb-semantic-eyebrow { font-size: 12px; font-weight: 700; letter-spacing: .12em; opacity: .6; }
.gb-semantic-intro h2 { margin: 10px 0 10px; font-size: 32px; line-height: 1.2; }
.gb-semantic-intro p { margin: 0; max-width: 700px; opacity: .72; line-height: 1.8; }
.gb-semantic-form { display: flex; gap: 10px; margin-top: 26px; }
.gb-semantic-form input { flex: 1; min-width: 0; padding: 15px 17px; border: 1px solid var(--vp-c-divider); border-radius: 12px; background: var(--vp-c-bg-soft); color: var(--vp-c-text-1); font-size: 15px; outline: none; }
.gb-semantic-form input:focus { border-color: var(--vp-c-brand-1); box-shadow: 0 0 0 3px color-mix(in srgb, var(--vp-c-brand-1) 14%, transparent); }
.gb-semantic-form button { border: 0; border-radius: 12px; padding: 0 20px; background: var(--vp-c-brand-1); color: white; font-weight: 700; cursor: pointer; }
.gb-semantic-form button:disabled { opacity: .55; cursor: default; }
.gb-semantic-suggestions { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin-top: 14px; font-size: 13px; }
.gb-semantic-suggestions > span { opacity: .55; }
.gb-semantic-suggestions button { border: 1px solid var(--vp-c-divider); border-radius: 999px; padding: 6px 10px; background: transparent; color: var(--vp-c-text-2); cursor: pointer; }
.gb-semantic-suggestions button:hover { border-color: var(--vp-c-brand-1); color: var(--vp-c-brand-1); }
.gb-semantic-status { display: flex; align-items: center; gap: 7px; margin-top: 16px; color: var(--vp-c-text-3); font-size: 12px; }
.gb-semantic-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--vp-c-brand-1); }
.gb-semantic-error { margin-top: 24px; padding: 14px 16px; border-radius: 10px; background: var(--vp-c-danger-soft); }
.gb-semantic-results { margin-top: 34px; }
.gb-semantic-results-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; color: var(--vp-c-text-3); font-size: 12px; }
.gb-semantic-results-head strong { color: var(--vp-c-text-2); }
.gb-semantic-result { display: block; margin: 12px 0; padding: 20px; border: 1px solid var(--vp-c-divider); border-radius: 14px; background: var(--vp-c-bg-soft); text-decoration: none !important; transition: transform .16s ease, border-color .16s ease; }
.gb-semantic-result:hover { transform: translateY(-2px); border-color: var(--vp-c-brand-1); }
.gb-semantic-result-meta { display: flex; gap: 8px; flex-wrap: wrap; font-size: 12px; color: var(--vp-c-brand-1); }
.gb-semantic-result-meta span + span::before { content: "·"; margin-right: 8px; color: var(--vp-c-text-3); }
.gb-semantic-result h3 { margin: 8px 0 7px; color: var(--vp-c-text-1); font-size: 17px; }
.gb-semantic-result p { margin: 0 0 10px; color: var(--vp-c-text-2); line-height: 1.7; }
.gb-semantic-result > strong { color: var(--vp-c-brand-1); font-size: 13px; }
.gb-semantic-empty { padding: 28px 0; color: var(--vp-c-text-3); }
@media (max-width: 640px) { .gb-semantic-form { flex-direction: column; } .gb-semantic-form button { min-height: 46px; } .gb-semantic-intro h2 { font-size: 26px; } }
</style>
