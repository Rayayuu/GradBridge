import fs from 'node:fs'
import path from 'node:path'

const projectRoot = process.cwd()
const docsRoot = path.join(projectRoot, 'docs')
const outputDir = path.join(projectRoot, 'search-data')
const outputFile = path.join(outputDir, 'search-corpus.json')

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      files.push(...walk(fullPath))
      continue
    }

    if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath)
    }
  }

  return files
}

function stripQuotes(value) {
  const trimmed = value.trim()

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1)
  }

  return trimmed
}

function parseFrontmatter(source) {
  if (!source.startsWith('---')) {
    return { data: {}, body: source }
  }

  const lines = source.split(/\r?\n/)
  const end = lines.indexOf('---', 1)

  if (end === -1) {
    return { data: {}, body: source }
  }

  const frontmatter = lines.slice(1, end)
  const body = lines.slice(end + 1).join('\n')
  const data = {}
  let currentArray = null

  for (const rawLine of frontmatter) {
    const line = rawLine.trim()

    if (!line) continue

    if (line.startsWith('- ') && currentArray) {
      data[currentArray].push(stripQuotes(line.slice(2)))
      continue
    }

    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)

    if (!match) continue

    const [, key, value] = match

    if (!value) {
      data[key] = []
      currentArray = key
    } else {
      data[key] = stripQuotes(value)
      currentArray = null
    }
  }

  return { data, body }
}

function cleanMarkdown(text) {
  return text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^>\s?/gm, '')
    .replace(/[*_`~]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function toRoute(filePath) {
  let relative = path.relative(docsRoot, filePath).replace(/\\/g, '/')
  relative = relative.replace(/\.md$/, '')

  if (relative === 'index') return '/'

  if (relative.endsWith('/index')) {
    return '/' + relative.slice(0, -6) + '/'
  }

  return '/' + relative
}

function splitSections(body) {
  const lines = body.split(/\r?\n/)
  const sections = []
  let heading = ''
  let content = []

  function flush() {
    const cleaned = cleanMarkdown(content.join('\n'))

    if (cleaned) {
      sections.push({ heading, content: cleaned })
    }

    content = []
  }

  for (const line of lines) {
    const headingMatch = line.match(/^#{1,3}\s+(.+)$/)

    if (headingMatch) {
      flush()
      heading = cleanMarkdown(headingMatch[1])
      continue
    }

    content.push(line)
  }

  flush()
  return sections
}

function splitLongText(text, maxLength = 1200, overlap = 180) {
  if (text.length <= maxLength) return [text]

  const chunks = []
  let start = 0

  while (start < text.length) {
    let end = Math.min(start + maxLength, text.length)

    if (end < text.length) {
      const punctuation = Math.max(
        text.lastIndexOf('。', end),
        text.lastIndexOf('！', end),
        text.lastIndexOf('？', end),
        text.lastIndexOf('. ', end)
      )

      if (punctuation > start + 400) {
        end = punctuation + 1
      }
    }

    chunks.push(text.slice(start, end).trim())

    if (end >= text.length) break

    start = Math.max(end - overlap, start + 1)
  }

  return chunks.filter(Boolean)
}

const markdownFiles = walk(docsRoot)
const corpus = []

for (const filePath of markdownFiles) {
  const source = fs.readFileSync(filePath, 'utf8')
  const { data, body } = parseFrontmatter(source)
  const route = toRoute(filePath)
  const sections = splitSections(body)

  const fallbackTitle =
    body.match(/^#\s+(.+)$/m)?.[1]?.trim() ||
    path.basename(filePath, '.md')

  const title = data.title || fallbackTitle
  const description = data.description || ''
  const keywords = Array.isArray(data.keywords) ? data.keywords : []

  sections.forEach((section, sectionIndex) => {
    const pieces = splitLongText(section.content)

    pieces.forEach((piece, pieceIndex) => {
      corpus.push({
        id: route + '::' + sectionIndex + '::' + pieceIndex,
        route,
        title,
        section: section.heading || title,
        description,
        keywords,
        content: piece
      })
    })
  })
}

fs.mkdirSync(outputDir, { recursive: true })
fs.writeFileSync(outputFile, JSON.stringify(corpus, null, 2), 'utf8')

const uniqueRoutes = new Set(corpus.map(item => item.route))

console.log('================================')
console.log('SEMANTIC SEARCH CORPUS BUILT')
console.log('================================')
console.log('Markdown pages: ' + markdownFiles.length)
console.log('Indexed routes: ' + uniqueRoutes.size)
console.log('Search chunks: ' + corpus.length)
console.log('Output: ' + outputFile)
