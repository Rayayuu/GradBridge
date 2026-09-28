import fs from 'node:fs'
import path from 'node:path'

const projectRoot = process.cwd()
const corpusPath = path.join(projectRoot, 'search-data', 'search-corpus.json')

if (!fs.existsSync(corpusPath)) {
  console.error('SEARCH_CORPUS_NOT_FOUND')
  process.exit(1)
}

const corpus = JSON.parse(fs.readFileSync(corpusPath, 'utf8'))
const query = process.argv.slice(2).join(' ').trim()

if (!query) {
  console.error('QUERY_REQUIRED')
  process.exit(1)
}

function normalize(text) {
  return String(text ?? '')
    .toLowerCase()
    .replace(/[，。！？、；：,.!?;:()[\]{}'"`~_*#>|/\\-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function asciiTokens(text) {
  return normalize(text)
    .split(' ')
    .filter(token => /^[a-z0-9+#.]+$/.test(token) && token.length >= 2)
}

function cjkBigrams(text) {
  const chars = normalize(text).replace(/[^\p{Script=Han}]/gu, '')
  const grams = []
  for (let i = 0; i < chars.length - 1; i += 1) {
    grams.push(chars.slice(i, i + 2))
  }
  return grams
}

function overlapScore(queryItems, targetSet) {
  let score = 0
  for (const item of queryItems) {
    if (targetSet.has(item)) score += 1
  }
  return score
}

const queryAscii = asciiTokens(query)
const queryCjk = cjkBigrams(query)
const normalizedQuery = normalize(query)

const scored = corpus.map(item => {
  const keywordText = Array.isArray(item.keywords) ? item.keywords.join(' ') : ''
  const title = normalize(item.title)
  const section = normalize(item.section)
  const description = normalize(item.description)
  const content = normalize(item.content)
  const combined = [title, section, description, keywordText, content].join(' ')

  const targetAscii = new Set(asciiTokens(combined))
  const targetCjk = new Set(cjkBigrams(combined))

  let score = 0
  score += overlapScore(queryAscii, targetAscii) * 3
  score += overlapScore(queryCjk, targetCjk)

  for (const token of queryAscii) {
    if (title.includes(token)) score += 6
    if (section.includes(token)) score += 5
    if (description.includes(token)) score += 3
  }

  for (const gram of queryCjk) {
    if (title.includes(gram)) score += 2
    if (section.includes(gram)) score += 2
    if (description.includes(gram)) score += 1
  }

  if (title && normalizedQuery.includes(title)) score += 12

  return { ...item, score }
})

const results = scored
  .filter(item => item.score > 0)
  .sort((a, b) => b.score - a.score)
  .slice(0, 8)

console.log('================================')
console.log('SEARCH CORPUS SMOKE TEST')
console.log('================================')
console.log('Mode: lexical/bigram baseline (NOT embeddings)')
console.log('Query: ' + query)
console.log('Candidates: ' + results.length)
console.log('')

results.forEach((item, index) => {
  const preview = String(item.content ?? '').slice(0, 180)
  console.log('#' + (index + 1) + ' score=' + item.score)
  console.log('title: ' + item.title)
  console.log('section: ' + item.section)
  console.log('route: ' + item.route)
  console.log('preview: ' + preview)
  console.log('')
})
