import fs from "node:fs"
import path from "node:path"
import { pipeline } from "@huggingface/transformers"

const root = process.cwd()
const corpusPath = path.join(root, "search-data", "search-corpus.json")
const outputPath = path.join(root, "search-data", "semantic-index.json")
const modelId = "Xenova/bge-small-zh-v1.5"
const batchSize = 16

if (!fs.existsSync(corpusPath)) {
  console.error("SEARCH_CORPUS_NOT_FOUND")
  process.exit(1)
}

const corpus = JSON.parse(fs.readFileSync(corpusPath, "utf8"))

if (!Array.isArray(corpus) || corpus.length === 0) {
  console.error("SEARCH_CORPUS_EMPTY_OR_INVALID")
  process.exit(1)
}

console.log("================================")
console.log("BUILD SEMANTIC INDEX")
console.log("================================")
console.log("Model: " + modelId)
console.log("Chunks: " + corpus.length)
console.log("Batch size: " + batchSize)
console.log("")

const extractor = await pipeline("feature-extraction", modelId, {
  dtype: "q8"
})

const indexedItems = []
let dimensions = 0

for (let start = 0; start < corpus.length; start += batchSize) {
  const batch = corpus.slice(start, start + batchSize)

  const inputs = batch.map(item => {
    const keywords = Array.isArray(item.keywords) ? item.keywords.join(" ") : ""
    const text = [
      item.title,
      item.section,
      item.description,
      keywords,
      item.content
    ].filter(Boolean).join(". ")

    return text
  })

  const output = await extractor(inputs, {
    pooling: "cls",
    normalize: true
  })

  if (!Array.isArray(output.dims) || output.dims.length !== 2) {
    throw new Error("UNEXPECTED_EMBEDDING_SHAPE: " + JSON.stringify(output.dims))
  }

  dimensions = output.dims[1]

  for (let i = 0; i < batch.length; i += 1) {
    const from = i * dimensions
    const to = from + dimensions
    const embedding = Array.from(output.data.slice(from, to))

    indexedItems.push({
      ...batch[i],
      embedding
    })
  }

  const completed = Math.min(start + batch.length, corpus.length)
  console.log("Embedded " + completed + "/" + corpus.length)
}

fs.mkdirSync(path.dirname(outputPath), { recursive: true })

const semanticIndex = {
  version: 1,
  model: modelId,
  dimensions,
  count: indexedItems.length,
  items: indexedItems
}

fs.writeFileSync(
  outputPath,
  JSON.stringify(semanticIndex),
  "utf8"
)

if (typeof extractor.dispose === "function") {
  await extractor.dispose()
}

console.log("")
console.log("================================")
console.log("SEMANTIC INDEX BUILT")
console.log("================================")
console.log("Dimensions: " + dimensions)
console.log("Indexed chunks: " + indexedItems.length)
console.log("Output: " + outputPath)
