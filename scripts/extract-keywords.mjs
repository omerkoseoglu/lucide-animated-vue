// Extracts { name, keywords } from the upstream ICON_LIST in
// .reference-icons/icons/index.ts and writes it as JSON for the homepage
// search to consume (keyword-aware search, not just name matching).
import { parse } from '@babel/parser'
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const SRC = join(process.cwd(), '.reference-icons/icons/index.ts')
const OUT = join(process.cwd(), 'app/utils/icon-keywords.json')

const code = readFileSync(SRC, 'utf8')
const ast = parse(code, { sourceType: 'module', plugins: ['typescript'] })

const listDecl = ast.program.body.find(
  (s) => s.type === 'VariableDeclaration' && s.declarations[0].id.name === 'ICON_LIST'
)
if (!listDecl) throw new Error('ICON_LIST not found')

let arr = listDecl.declarations[0].init
// upstream chains `.sort(...)` onto the array literal
while (arr.type === 'CallExpression') arr = arr.callee.object
if (arr.type !== 'ArrayExpression') throw new Error(`expected ArrayExpression, got ${arr.type}`)

const result = {}
for (const el of arr.elements) {
  const nameProp = el.properties.find((p) => p.key.name === 'name')
  const keywordsProp = el.properties.find((p) => p.key.name === 'keywords')
  const name = nameProp.value.value
  const keywords = keywordsProp.value.elements.map((e) => e.value)
  result[name] = keywords
}

writeFileSync(OUT, JSON.stringify(result, null, 2) + '\n', 'utf8')
console.log(`Wrote ${Object.keys(result).length} icon keyword entries to ${OUT}`)
