// Compiles every generated icon .vue file's <script setup> and <template>
// blocks (without full type-checking) to catch codemod bugs: malformed JS,
// broken template expressions, unclosed tags, etc.
import { parse, compileScript, compileTemplate } from '@vue/compiler-sfc'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const DIR = join(process.cwd(), 'app/components/icons')
const files = readdirSync(DIR).filter((f) => f.endsWith('.vue'))

let failures = 0
for (const file of files) {
  const filename = join(DIR, file)
  const source = readFileSync(filename, 'utf8')
  try {
    const { descriptor } = parse(source, { filename })
    compileScript(descriptor, { id: file, inlineTemplate: false })
    compileTemplate({
      source: descriptor.template.content,
      filename,
      id: file
    })
  } catch (err) {
    failures++
    console.log(`${file}: ${err.message.split('\n')[0]}`)
  }
}
console.log(`\n${files.length - failures}/${files.length} compiled cleanly`)
