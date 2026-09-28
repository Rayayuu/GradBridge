import fs from 'node:fs'
import path from 'node:path'
import { pipeline } from '@huggingface/transformers'

const root = process.cwd()
const corpusPath = path.join(root, 'search-data', 'search-corpus.json')

if (!fs.existsSync(corpusPath)) {
  console.error('SEARCH_CORPUS_NOT_FOUND')
  process.exit(1)
}

const corpus = JSON.parse(fs.readFileSync(corpusPath, 'utf8'))

function pick(route, sectionPattern = null) {
  const matches = corpus.filter(item => item.route === route)
  if (matches.length === 0) {
    throw new Error(`NO_CHUNK_FOR_ROUTE: ${route}`)
  }

  if (sectionPattern) {
    const found = matches.find(item =>
      String(item.section || '').toLowerCase().includes(sectionPattern.toLowerCase())
    )
    if (found) return found
  }

  return matches[0]
}

const candidates = [
  pick('/study/roadmap/third-year-guide', 'technical interview'),
  pick('/study/roadmap/internship-timing'),
  pick('/study/roadmap/first-year-guide'),
  pick('/study/roadmap/wam-vs-career'),
  pick('/study/roadmap/honours-guide'),
  pick('/study/method/group-project-guide')
]

const query = '大三想找实习，后端面试应该准备什么？'
const modelId = 'Xenova/multilingual-e5-small'

console.log('================================')
console.log('EMBEDDING SMOKE TEST')
console.log('================================')
console.log(`Model: ${modelId}`)
console.log(`Query: ${query}`)
console.log(`Candidates: ${candidates.length}`)
console.log('')
console.log('Loading model... first run may download model files.')

const extractor = await pipeline('feature-extraction', modelId, {
  dtype: 'q8'
})

const inputs = [
  `query: ${query}`,
  ...candidates.map(item =>
    `passage: ${item.title}. ${item.section}. ${item.description || ''}. ${item.content}`
  )
]

const output = await extractor(inputs, {
  pooling: 'mean',
  normalize: true
})

if (!Array.isArray(output.dims) || output.dims.length !== 2) {
  throw new Error(`UNEXPECTED_EMBEDDING_SHAPE: ${JSON.stringify(output.dims)}`)
}

const [rows, dimensions] = output.dims

if (rows !== inputs.length) {
  throw new Error(`UNEXPECTED_EMBEDDING_ROWS: ${rows}`)
}

const vectors = []

for (let row = 0; row < rows; row += 1) {
  const start = row * dimensions
  const end = start + dimensions
  vectors.push(Array.from(output.data.slice(start, end)))
}

function dot(a, b) {
  let total = 0
  for (let i = 0; i < a.length; i += 1) {
    total += a[i] * b[i]
  }
  return total
}

const queryVector = vectors[0]

const results = candidates
  .map((item, index) => ({
    score: dot(queryVector, vectors[index + 1]),
    title: item.title,
    section: item.section,
    route: item.route
  }))
  .sort((a, b) => b.score - a.score)

console.log('')
console.log(`Embedding dimensions: ${dimensions}`)
console.log('')
console.log('=== RANKING ===')

results.forEach((item, index) => {
  console.log(`#${index + 1} score=${item.score.toFixed(6)}`)
  console.log(`title: ${item.title}`)
  console.log(`section: ${item.section}`)
  console.log(`route: ${item.route}`)
  console.log('')
})

if (typeof extractor.dispose === 'function') {
  await extractor.dispose()
}

console.log('EMBEDDING_SMOKE_TEST_COMPLETE')
