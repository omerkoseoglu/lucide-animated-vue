// Codemod: ports pqoqubbw/icons React (motion/react) icon components to
// Vue 3 / Nuxt SFCs using motion-v. See CLAUDE.md for the target pattern.
//
// Usage:
//   node scripts/port-icons.mjs [--only=heart,menu] [--dry] [--force]
//
// Reads from .reference-icons/icons/*.tsx, writes to app/components/icons/*.vue.
// Files using patterns this codemod doesn't understand (AnimatePresence,
// useState, useEffect, or anything else unrecognized) are skipped and
// reported at the end for manual porting.

import { parse } from '@babel/parser'
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs'
import { join, basename } from 'node:path'

const ROOT = process.cwd()
const SRC_DIR = join(ROOT, '.reference-icons/icons')
const OUT_DIR = join(ROOT, 'app/components/icons')

const args = process.argv.slice(2)
const onlyArg = args.find((a) => a.startsWith('--only='))
const only = onlyArg ? new Set(onlyArg.slice('--only='.length).split(',')) : null
const dry = args.includes('--dry')
const force = args.includes('--force')

const ATTR_RENAME = {
  className: 'class',
  dominantBaseline: 'dominant-baseline',
  fontSize: 'font-size',
  fontWeight: 'font-weight',
  strokeDasharray: 'stroke-dasharray',
  strokeLinecap: 'stroke-linecap',
  strokeLinejoin: 'stroke-linejoin',
  strokeOpacity: 'stroke-opacity',
  strokeWidth: 'stroke-width',
  textAnchor: 'text-anchor'
}
// SVG attributes that are camelCase in the spec itself (no hyphenated form) -
// must NOT be kebab-cased, unlike the ones above.
const KEEP_CAMEL = new Set(['viewBox', 'pathLength', 'patternUnits'])

class Unsupported extends Error {
  constructor(reason) {
    super(reason)
    this.name = 'Unsupported'
  }
}

// React hooks this codemod doesn't translate; files using them need a
// manual port instead of automatic generation.
const UNSUPPORTED_HOOKS = new Set(['useState', 'useEffect', 'useLayoutEffect', 'useMemo', 'useContext', 'useReducer'])

function slice(code, node) {
  return code.slice(node.start, node.end)
}

function parseFile(code) {
  return parse(code, {
    sourceType: 'module',
    plugins: ['typescript', 'jsx']
  })
}

// ---------- JSX -> Vue template ----------

function jsxNameToString(nameNode) {
  if (nameNode.type === 'JSXIdentifier') return nameNode.name
  if (nameNode.type === 'JSXMemberExpression') {
    return `${jsxNameToString(nameNode.object)}.${jsxNameToString(nameNode.property)}`
  }
  throw new Unsupported(`unsupported JSX name type ${nameNode.type}`)
}

function convertAttr(code, attr) {
  if (attr.type === 'JSXSpreadAttribute') {
    // {...props} - Vue does this automatically via attribute fallthrough.
    return null
  }
  const name = attr.name.name
  if (name === 'onMouseEnter' || name === 'onMouseLeave' || name === 'key') {
    // handled specially by callers (root div / v-for), not generically
    return { special: name }
  }

  let outName = ATTR_RENAME[name] ?? name
  const isKeepCamel = KEEP_CAMEL.has(name)
  if (!ATTR_RENAME[name] && !isKeepCamel && /[A-Z]/.test(name)) {
    throw new Unsupported(`unknown camelCase JSX attribute "${name}"`)
  }

  if (attr.value === null) {
    return { text: outName }
  }
  if (attr.value.type === 'StringLiteral') {
    return { text: `${outName}="${attr.value.value}"` }
  }
  if (attr.value.type === 'JSXExpressionContainer') {
    const expr = attr.value.expression
    const exprText = slice(code, expr)
    return { text: `:${outName}="${exprText.replace(/"/g, '&quot;')}"` }
  }
  throw new Unsupported(`unsupported attribute value type ${attr.value.type}`)
}

function findReturnedJSX(mapCallbackBody) {
  if (mapCallbackBody.type === 'JSXElement' || mapCallbackBody.type === 'JSXFragment') {
    return mapCallbackBody
  }
  if (mapCallbackBody.type === 'BlockStatement') {
    const ret = mapCallbackBody.body.find((s) => s.type === 'ReturnStatement')
    if (!ret || !ret.argument) throw new Unsupported('map callback has no JSX return')
    return ret.argument
  }
  throw new Unsupported(`unsupported map callback body ${mapCallbackBody.type}`)
}

function renderElement(code, node, indent, extraDirectives = []) {
  if (node.type === 'JSXFragment') {
    throw new Unsupported('JSX fragments are not supported')
  }
  if (node.type !== 'JSXElement') {
    throw new Unsupported(`expected JSXElement, got ${node.type}`)
  }
  const tag = jsxNameToString(node.openingElement.name)
  const pieces = [tag, ...extraDirectives]

  for (const attr of node.openingElement.attributes) {
    const converted = convertAttr(code, attr)
    if (!converted || converted.special) continue
    pieces.push(converted.text)
  }

  const openTag = `<${pieces.join(' ')}`
  const childrenXml = renderChildren(code, node.children, indent + 2)

  if (!childrenXml.trim()) {
    return `${' '.repeat(indent)}${openTag} />`
  }
  return `${' '.repeat(indent)}${openTag}>\n${childrenXml}\n${' '.repeat(indent)}</${tag}>`
}

function renderChildren(code, children, indent) {
  const prefix = ' '.repeat(indent)
  const lines = []
  for (const child of children) {
    if (child.type === 'JSXText') {
      const text = child.value.trim()
      if (text) lines.push(`${prefix}${text}`)
      continue
    }
    if (child.type === 'JSXElement') {
      lines.push(renderElement(code, child, indent))
      continue
    }
    if (child.type === 'JSXExpressionContainer') {
      const expr = child.expression
      if (expr.type === 'JSXEmptyExpression') continue
      if (
        expr.type === 'CallExpression' &&
        expr.callee.type === 'MemberExpression' &&
        expr.callee.property.name === 'map'
      ) {
        const arrayExpr = expr.callee.object
        const cb = expr.arguments[0]
        if (!cb || (cb.type !== 'ArrowFunctionExpression' && cb.type !== 'FunctionExpression')) {
          throw new Unsupported('map() callback is not a function expression')
        }
        const itemName = cb.params[0] ? slice(code, cb.params[0]) : 'item'
        const indexName = cb.params[1] ? slice(code, cb.params[1]) : 'index'
        const arrayText = slice(code, arrayExpr)
        const jsxEl = findReturnedJSX(cb.body)
        const keyAttr = jsxEl.openingElement.attributes.find(
          (a) => a.type === 'JSXAttribute' && a.name.name === 'key'
        )
        const keyDirective = keyAttr
          ? convertAttrKey(code, keyAttr)
          : `:key="${indexName}"`
        lines.push(
          renderElement(code, jsxEl, indent, [
            `v-for="(${itemName}, ${indexName}) in ${arrayText.replace(/\s+/g, ' ').trim().replace(/"/g, '&quot;')}"`,
            keyDirective
          ])
        )
        continue
      }
      // plain text interpolation
      lines.push(`${prefix}{{ ${slice(code, expr)} }}`)
      continue
    }
    throw new Unsupported(`unsupported JSX child type ${child.type}`)
  }
  return lines.join('\n')
}

function convertAttrKey(code, attr) {
  if (attr.value.type === 'StringLiteral') return `key="${attr.value.value}"`
  if (attr.value.type === 'JSXExpressionContainer') {
    return `:key="${slice(code, attr.value.expression).replace(/"/g, '&quot;')}"`
  }
  throw new Unsupported('unsupported key attribute value')
}

// ---------- component body analysis ----------

function getBlockStatements(fnNode) {
  if (fnNode.body.type === 'BlockStatement') return fnNode.body.body
  // concise arrow body: `() => expr`
  return [{ type: 'ReturnStatement', argument: fnNode.body, start: fnNode.body.start, end: fnNode.body.end }]
}

function callbackInner(callExpr) {
  // useCallback(fn, deps) | fn itself (some files might not wrap) -> return the function node
  if (callExpr.type === 'CallExpression' && callExpr.callee.name === 'useCallback') {
    return callExpr.arguments[0]
  }
  if (callExpr.type === 'ArrowFunctionExpression' || callExpr.type === 'FunctionExpression') {
    return callExpr
  }
  throw new Unsupported('expected useCallback(...) or a function expression')
}

function statementsSource(code, statements) {
  return statements.map((s) => slice(code, s)).join('\n  ')
}

// Is this expression a read of the "am I externally controlled?" flag,
// whatever its declared name/shape (`nameRef.current` or a plain `name` bool)?
function isControlledFlagRead(test, controlledFlagName) {
  if (test.type === 'MemberExpression') {
    return test.property.name === 'current' && test.object.name === controlledFlagName
  }
  if (test.type === 'Identifier') {
    return test.name === controlledFlagName
  }
  return false
}

// Extracts the "runs when NOT externally controlled" statements from a
// handleMouseEnter/handleMouseLeave body, dropping the controlled-flag
// passthrough branch/statement.
function extractUncontrolledBranch(code, statements, controlledFlagName) {
  const kept = []
  for (const stmt of statements) {
    if (stmt.type === 'IfStatement') {
      const test = stmt.test
      const isBareControlledCheck = isControlledFlagRead(test, controlledFlagName)
      const isNegatedControlledCheck =
        test.type === 'UnaryExpression' && test.operator === '!' && isControlledFlagRead(test.argument, controlledFlagName)

      if (isBareControlledCheck) {
        if (stmt.alternate) {
          const alt = stmt.alternate.type === 'BlockStatement' ? stmt.alternate.body : [stmt.alternate]
          kept.push(...alt)
        }
        continue
      }
      if (isNegatedControlledCheck) {
        const cons = stmt.consequent.type === 'BlockStatement' ? stmt.consequent.body : [stmt.consequent]
        kept.push(...cons)
        continue
      }
      throw new Unsupported('unrecognized isControlledRef branch shape')
    }
    // drop bare `onMouseEnter?.(e);` / `onMouseLeave?.(e);` passthrough statements,
    // whether the callee is a plain identifier (`onMouseEnter?.(e)`) or a
    // member/optional-member expression (`props.onMouseEnter?.(e)`)
    if (stmt.type === 'ExpressionStatement' && stmt.expression.type === 'OptionalCallExpression') {
      const callee = stmt.expression.callee
      const calleeName = callee.type === 'Identifier' ? callee.name : callee.property?.name
      if (calleeName === 'onMouseEnter' || calleeName === 'onMouseLeave') continue
    }
    kept.push(stmt)
  }
  return kept
}

// unwrap `export const X = ...` / `export default ...` to the inner declaration
function unwrapExport(stmt) {
  if (stmt.type === 'ExportNamedDeclaration' && stmt.declaration) return stmt.declaration
  if (stmt.type === 'ExportDefaultDeclaration') return stmt.declaration
  return stmt
}

// Recognizes a "controlled flag" declaration in either shape:
//   const isControlledRef = useRef(false);          (kind: 'ref')
//   const isControlled = !!ref; / ref != null;       (kind: 'plain')
function isRefIdentifier(node) {
  return node.type === 'Identifier' && node.name === 'ref'
}

function matchControlledFlagDecl(decl) {
  const name = decl.id.name
  const init = decl.init
  // const xRef = useRef(false);
  if (
    init.type === 'CallExpression' &&
    init.callee.name === 'useRef' &&
    init.arguments[0]?.type === 'BooleanLiteral' &&
    init.arguments[0].value === false
  ) {
    return { name, kind: 'ref' }
  }
  // const x = !!ref;
  if (
    init.type === 'UnaryExpression' &&
    init.operator === '!' &&
    init.argument.type === 'UnaryExpression' &&
    init.argument.operator === '!' &&
    isRefIdentifier(init.argument.argument)
  ) {
    return { name, kind: 'plain' }
  }
  // const x = ref != null; / ref !== undefined; / etc. (either operand order)
  if (init.type === 'BinaryExpression' && ['!=', '!==', '==', '==='].includes(init.operator)) {
    const isNullish = (n) => n.type === 'NullLiteral' || (n.type === 'Identifier' && n.name === 'undefined')
    if ((isRefIdentifier(init.left) && isNullish(init.right)) || (isRefIdentifier(init.right) && isNullish(init.left))) {
      return { name, kind: 'plain' }
    }
  }
  return null
}

function portIcon(code, filename) {
  const ast = parseFile(code)
  const body = ast.program.body

  let componentName = null
  let componentFn = null
  let sizeDefault = '28'
  const helperConsts = []
  const usedTypes = new Set()
  const extraValueImports = new Set()

  const trackTypes = (text) => {
    if (/:\s*Variants\b/.test(text)) usedTypes.add('Variants')
    if (/:\s*Transition\b/.test(text)) usedTypes.add('Transition')
  }

  // find the forwardRef component + collect top-level helper consts
  for (const rawStmt of body) {
    const stmt = unwrapExport(rawStmt)
    if (stmt.type === 'ImportDeclaration' && stmt.source.value === 'motion/react' && stmt.importKind !== 'type') {
      for (const spec of stmt.specifiers) {
        if (spec.type !== 'ImportSpecifier') continue
        if (spec.importKind === 'type') continue
        const name = spec.imported.name
        if (name === 'motion' || name === 'useAnimation') continue
        extraValueImports.add(name)
      }
      continue
    }
    if (stmt.type === 'VariableDeclaration') {
      const decl = stmt.declarations[0]
      if (
        decl.init &&
        decl.init.type === 'CallExpression' &&
        decl.init.callee.type === 'Identifier' &&
        decl.init.callee.name === 'forwardRef'
      ) {
        componentName = decl.id.name
        componentFn = decl.init.arguments[0]
        continue
      }
      // helper const (variants, transition, data arrays, ...)
      helperConsts.push(stmt)
      trackTypes(slice(code, stmt))
      continue
    }
    // ignore: directives, interfaces, type aliases, displayName
  }

  if (!componentName || !componentFn) {
    throw new Unsupported('no forwardRef component found')
  }

  // find size default from the destructured first param
  const param = componentFn.params[0]
  for (const prop of param.properties) {
    if (prop.type === 'ObjectProperty' && prop.key.name === 'size' && prop.value.type === 'AssignmentPattern') {
      sizeDefault = slice(code, prop.value.right)
    }
  }

  const statements = getBlockStatements(componentFn)

  // first pass: find the controlled-flag declaration's name/kind, wherever it is
  let controlledFlagName = 'isControlledRef'
  for (const stmt of statements) {
    if (stmt.type !== 'VariableDeclaration') continue
    const match = matchControlledFlagDecl(stmt.declarations[0])
    if (match) {
      controlledFlagName = match.name
      break
    }
  }

  // translates a piece of captured body text: rename the controlled-flag
  // identifier to our own `isControlled` ref and fix up its accessors
  const tr = (text) =>
    text
      .replace(new RegExp(`\\b${controlledFlagName}\\b`, 'g'), 'isControlled')
      .replace(/\.current\b/g, '.value')
      .replace(/\bisControlled\b(?!\.value)/g, 'isControlled.value')

  const controlsNames = []
  const extraRefs = [] // { name, initText }
  const genericFns = new Map() // name -> { isAsync, body, emitted }
  const genericConstOrder = [] // interleaved consts + fn-names, in source order
  let handleMouseEnterFn = null
  let handleMouseLeaveFn = null
  let imperativeHandleBody = null
  let jsxReturn = null

  for (const stmt of statements) {
    if (stmt.type === 'ReturnStatement') {
      jsxReturn = stmt.argument
      continue
    }
    if (stmt.type === 'VariableDeclaration') {
      const decl = stmt.declarations[0]
      const init = decl.init
      if (decl.id.type !== 'Identifier') {
        throw new Unsupported(`unsupported destructured declaration (likely useState) in component body`)
      }
      if (init.type === 'CallExpression' && UNSUPPORTED_HOOKS.has(init.callee.name)) {
        throw new Unsupported(`unsupported hook "${init.callee.name}" in component body`)
      }
      const name = decl.id.name

      if (matchControlledFlagDecl(decl)?.name === name && name === controlledFlagName) {
        continue // replaced by our own isControlled ref
      }
      if (init.type === 'CallExpression' && init.callee.name === 'useAnimation') {
        controlsNames.push(name)
        continue
      }
      if (init.type === 'CallExpression' && init.callee.name === 'useRef') {
        extraRefs.push({ name, initText: tr(slice(code, init.arguments[0] ?? { start: init.start, end: init.start })) })
        continue
      }
      if (name === 'handleMouseEnter' || name === 'handleMouseLeave') {
        const fn = callbackInner(init)
        const stmts = getBlockStatements(fn)
        const kept = extractUncontrolledBranch(code, stmts, controlledFlagName)
        const text = tr(statementsSource(code, kept))
        const isAsync = !!fn.async
        if (name === 'handleMouseEnter') handleMouseEnterFn = { isAsync, body: text }
        else handleMouseLeaveFn = { isAsync, body: text }
        continue
      }
      // generic helper: a supporting function (useCallback/plain fn) or a
      // plain data/variants const declared inside the component body
      const isFn =
        (init.type === 'CallExpression' && init.callee.name === 'useCallback') ||
        init.type === 'ArrowFunctionExpression' ||
        init.type === 'FunctionExpression'
      if (isFn) {
        const fn = callbackInner(init)
        const isAsync = !!fn.async
        const stmts = getBlockStatements(fn)
        genericFns.set(name, { isAsync, body: tr(statementsSource(code, stmts)), emitted: false })
        genericConstOrder.push({ kind: 'fn', name })
      } else {
        trackTypes(slice(code, stmt))
        genericConstOrder.push({ kind: 'const', text: tr(slice(code, stmt)) })
      }
      continue
    }
    if (
      stmt.type === 'ExpressionStatement' &&
      stmt.expression.type === 'CallExpression' &&
      stmt.expression.callee.name === 'useImperativeHandle'
    ) {
      const factory = stmt.expression.arguments[1]
      const stmts = getBlockStatements(factory)
      const ret = stmts.find((s) => s.type === 'ReturnStatement')
      if (!ret) throw new Unsupported('useImperativeHandle factory has no return')
      imperativeHandleBody = ret.argument
      continue
    }
    throw new Unsupported(`unrecognized statement type "${stmt.type}" in component body`)
  }

  if (!jsxReturn) throw new Unsupported('no JSX return found')
  if (!imperativeHandleBody || imperativeHandleBody.type !== 'ObjectExpression') {
    throw new Unsupported('no recognizable useImperativeHandle(...) return object')
  }

  // resolve startAnimation/stopAnimation implementations
  const exposedFns = {}
  const wrapperCalls = {} // key -> helper name to call, when the exposed fn is just a thin wrapper
  for (const prop of imperativeHandleBody.properties) {
    const key = prop.key.name
    if (key !== 'startAnimation' && key !== 'stopAnimation') {
      throw new Unsupported(`unexpected exposed handle property "${key}"`)
    }
    if (prop.value.type === 'Identifier') {
      const refName = prop.value.name
      if (refName === key) {
        // e.g. `startAnimation: startAnimation` referencing a predeclared
        // function of the exact same name (grip.tsx) - merge into it directly.
        const fn = genericFns.get(refName)
        if (!fn) throw new Unsupported(`exposed handle references unknown function "${refName}"`)
        fn.emitted = true
        exposedFns[key] = fn
        continue
      }
      // references a differently-named helper (e.g. `startAnimation: triggerEffect`)
      // - keep the helper as its own function and expose a thin wrapper.
      if (!genericFns.has(refName)) throw new Unsupported(`exposed handle references unknown function "${refName}"`)
      wrapperCalls[key] = refName
      continue
    }
    if (prop.value.type === 'ArrowFunctionExpression') {
      const bodyNode = prop.value.body
      const isAsync = !!prop.value.async
      let bodyText
      if (bodyNode.type === 'BlockStatement') {
        bodyText = tr(statementsSource(code, bodyNode.body))
      } else {
        bodyText = tr(`${slice(code, bodyNode)};`)
      }
      exposedFns[key] = { isAsync, body: bodyText }
      continue
    }
    throw new Unsupported(`unsupported exposed handle value type "${prop.value.type}"`)
  }
  if ((!exposedFns.startAnimation && !wrapperCalls.startAnimation) || (!exposedFns.stopAnimation && !wrapperCalls.stopAnimation)) {
    throw new Unsupported('missing startAnimation/stopAnimation in exposed handle')
  }

  // ---- render the JSX (outer div -> template root) ----
  if (jsxReturn.type !== 'JSXElement') throw new Unsupported('root JSX is not a single element')
  const rootDiv = jsxReturn
  if (jsxNameToString(rootDiv.openingElement.name) !== 'div') {
    throw new Unsupported('root JSX element is not a <div>')
  }
  let rootClass = null
  for (const attr of rootDiv.openingElement.attributes) {
    if (attr.type === 'JSXAttribute' && attr.name.name === 'className') {
      const expr = attr.value.expression
      if (expr.type === 'CallExpression' && expr.callee.name === 'cn') {
        const literalArgs = expr.arguments.filter((a) => a.type === 'StringLiteral')
        if (literalArgs.length) rootClass = literalArgs.map((a) => a.value).join(' ')
      }
    }
  }
  const svgChild = rootDiv.children.find((c) => c.type === 'JSXElement')
  if (!svgChild) throw new Unsupported('no svg child found under root div')
  const templateBody = renderElement(code, svgChild, 4)

  // ---- assemble script setup ----
  const lines = []
  lines.push(`import type { ${[...usedTypes].join(', ') || 'Variants'} } from 'motion-v'`)
  lines.push(`import { motion, useAnimationControls${extraValueImports.size ? `, ${[...extraValueImports].join(', ')}` : ''} } from 'motion-v'`)
  lines.push(`import { ref } from 'vue'`)
  lines.push('')
  lines.push('interface Props {')
  lines.push('  size?: number')
  lines.push('}')
  lines.push('')
  lines.push(`withDefaults(defineProps<Props>(), { size: ${sizeDefault} })`)
  lines.push('')
  for (const stmt of helperConsts) {
    lines.push(slice(code, stmt))
    lines.push('')
  }
  for (const name of controlsNames) {
    lines.push(`const ${name} = useAnimationControls()`)
  }
  lines.push('const isControlled = ref(false)')
  for (const r of extraRefs) {
    lines.push(`const ${r.name} = ref(${r.initText})`)
  }
  lines.push('')

  // generic helper consts/functions, in original relative order (skip any
  // that got merged directly into startAnimation/stopAnimation above)
  for (const item of genericConstOrder) {
    if (item.kind === 'const') {
      lines.push(item.text)
      lines.push('')
    } else {
      const fn = genericFns.get(item.name)
      if (fn.emitted) continue
      lines.push(`${fn.isAsync ? 'async ' : ''}function ${item.name}() {`)
      lines.push(`  ${fn.body}`)
      lines.push('}')
      lines.push('')
    }
  }

  function emitFn(name, spec) {
    const asyncKw = spec.isAsync ? 'async ' : ''
    lines.push(`${asyncKw}function ${name}() {`)
    lines.push('  isControlled.value = true')
    lines.push(`  ${spec.body}`)
    lines.push('}')
    lines.push('')
  }
  function emitWrapper(name, helperName) {
    const helper = genericFns.get(helperName)
    lines.push(`${helper.isAsync ? 'async ' : ''}function ${name}() {`)
    lines.push('  isControlled.value = true')
    lines.push(`  ${helper.isAsync ? 'await ' : ''}${helperName}()`)
    lines.push('}')
    lines.push('')
  }
  if (wrapperCalls.startAnimation) emitWrapper('startAnimation', wrapperCalls.startAnimation)
  else emitFn('startAnimation', exposedFns.startAnimation)
  if (wrapperCalls.stopAnimation) emitWrapper('stopAnimation', wrapperCalls.stopAnimation)
  else emitFn('stopAnimation', exposedFns.stopAnimation)
  lines.push('defineExpose({ startAnimation, stopAnimation })')
  lines.push('')

  if (handleMouseEnterFn) {
    lines.push(`${handleMouseEnterFn.isAsync ? 'async ' : ''}function handleMouseEnter() {`)
    lines.push(`  if (!isControlled.value) {`)
    lines.push(`    ${handleMouseEnterFn.body}`)
    lines.push('  }')
    lines.push('}')
    lines.push('')
  }
  if (handleMouseLeaveFn) {
    lines.push(`${handleMouseLeaveFn.isAsync ? 'async ' : ''}function handleMouseLeave() {`)
    lines.push(`  if (!isControlled.value) {`)
    lines.push(`    ${handleMouseLeaveFn.body}`)
    lines.push('  }')
    lines.push('}')
  }

  const script = lines
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()

  const rootAttrs = []
  if (rootClass) rootAttrs.push(`class="${rootClass}"`)
  if (handleMouseEnterFn) rootAttrs.push(`@mouseenter="handleMouseEnter"`)
  if (handleMouseLeaveFn) rootAttrs.push(`@mouseleave="handleMouseLeave"`)

  const vue = `<script setup lang="ts">
${script}
</script>

<template>
  <div${rootAttrs.length ? ' ' + rootAttrs.join(' ') : ''}>
${templateBody}
  </div>
</template>
`
  return { vue, componentName }
}

function main() {
  const files = readdirSync(SRC_DIR).filter((f) => f.endsWith('.tsx'))
  const results = { ok: [], skipped: [] }

  for (const file of files) {
    const base = basename(file, '.tsx')
    if (only && !only.has(base)) continue
    const code = readFileSync(join(SRC_DIR, file), 'utf8')
    try {
      const { vue, componentName } = portIcon(code, file)
      const outName = `${componentName}.vue`
      const outPath = join(OUT_DIR, outName)
      if (!dry) {
        if (existsSync(outPath) && !force) {
          // don't clobber hand-edited files unless --force
          results.ok.push(`${file} -> ${outName} (skipped, exists)`)
          continue
        }
        writeFileSync(outPath, vue, 'utf8')
      }
      results.ok.push(`${file} -> ${outName}`)
    } catch (err) {
      results.skipped.push(`${file}: ${err.message}`)
    }
  }

  console.log(`Ported: ${results.ok.length}`)
  console.log(`Skipped: ${results.skipped.length}`)
  if (results.skipped.length) {
    console.log('\n--- skipped ---')
    for (const s of results.skipped) console.log(s)
  }
}

main()
