import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const tokens = JSON.parse(readFileSync(resolve(__dirname, '../tokens/tokens.json'), 'utf8'))
const primitives = tokens['Primitive Colors/Mode 1']
const semantics = tokens['Tokens/Mode 1']

const primitivesMap = {}
/**
 * Recursively walks the `primitives` object and populates `primitivesMap` with
 * a flat key-value structure. Keys use dot notation (e.g. `blue.400`), values
 * are the full token objects (with `$value` and `$type`).
 * @param {Object} obj - The current node to walk. Start with the full `primitives` object.
 * @param {string} prefix - Dot-separated path accumulated so far. Omit on first call.
 * @returns {void} - Mutates `primitivesMap` directly rather than returning a value.
 */
const flattenPrimitives = (obj, prefix = '') => {
  for (const key in obj) {
    const value = obj[key]
    const path = prefix ? `${prefix}.${key}` : key

    if (value.$value !== undefined) { // This node is a leaf, i.e., an actual token
      primitivesMap[path] = value
    }
    else { // This node is a container object
      flattenPrimitives(value, path)
    }
  }
}
flattenPrimitives(primitives)

const primitiveLines = Object.entries(primitivesMap).map(([pathToValue, value]) => {
  return `  --primitive-${pathToValue.replaceAll('.', '-')}: ${value.$value};`
})

/**
 * Resolves a token `$value` to either a CSS variable reference or the raw value.
 * Semantic tokens reference primitives using `{blue.400}` syntax — this 
 * function detects that pattern and converts it to `var(--primitive-blue-400)`.
 * If the value is already a raw hex (e.g. `#ffffff`), it is returned as-is.
 * @param {string} value - The raw `$value` string from a semantic token.
 * @returns {string|null} - A CSS `var()` reference, the original raw value, or
 *   `null` if the reference key could not be found in `primitivesMap`.
 */
const resolveReference = (value) => {
  const match = value.match(/^\{(.+)\}$/) // Checking if string starts and ends with {}.
  if (!match) return value
  const ref = match[1] // Value within the {}
  const resolved = primitivesMap[ref]?.$value
  if (!resolved) {
    console.warn(`Unresolved reference: ${ref}`)
    return null
  }
  return `var(--primitive-${ref.replaceAll('.', '-')})`
}

const semanticLines = []
/**
 * Recursively walks the `semantics` object and populates `semanticLines` with
 * CSS custom property strings (e.g. `  --semantic-bg-default: var(--primitive-blue-400);`).
 * Handles mixed nodes — nodes that have both a `$value` and nested children.
 * Color values are resolved via `resolveReference`; number values get `px` appended.
 * @param {Object} obj - The current node to walk. Start with the full `semantics` object.
 * @param {string} prefix - Dash-separated path accumulated so far. Omit on first call.
 * @returns {void} - Mutates `semanticLines` directly rather than returning a value.
 */
const flattenSemantics = (obj, prefix = '') => {
  for (const key in obj) {
    if (key.startsWith('$')) continue // Skip to next `key` as this is either metadata or `$value`/`$type`

    const node = obj[key]
    const path = prefix ? `${prefix}-${key}` : key

    if (node.$value !== undefined) { // It's a leaf node
      const raw = node.$value
      const resolved = node.$type === 'number'
        ? `${raw}px`
        : resolveReference(String(raw))
      
      if (resolved !== null) {
        semanticLines.push(`  --semantic-${path}: ${resolved};`)
      }
      else {
        console.warn(`--semantic-${path} was unable to be added`)
      }
    }

    if (Object.keys(node).some(k => !k.startsWith('$'))) {
      flattenSemantics(node, path)
    } // A separate if rather than an else-if, as it's possible for a node has `$value` and other children
  }
}

flattenSemantics(semantics)

const output = [
  ':root {',
  ...primitiveLines,
  '',
  ...semanticLines,
  '}',
].join('\n')

writeFileSync(resolve(__dirname, '../src/styles/tokens.scss'), output)
console.log('tokens.scss written successfully')