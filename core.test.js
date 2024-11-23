import { expect, test } from 'vitest'
import { withPostCss, withPostHtml } from 'index.js'

const css = `
  @import "./postcss-test/node_modules/tailwindcss/theme";
  @import "./postcss-test/node_modules/tailwindcss/utilities";
`

test('with postcss', () => {
  return withPostCss(css).then(result => {
    expect(result).toContain('.text-red-200 {\n  color: oklch(0.885 0.062 18.334) !important;\n}')
  })
})

const html = `
<html>
  <head>
    <style>${css}</style>
  </head>
  <body>
    <p class="text-red-200">Hello, World!</p>
  </body>
</html>
`

test('with posthtml', () => {
  return withPostHtml(html).then(result => {
    expect(result).toContain('.text-red-200 {\n  color: oklch(0.885 0.062 18.334) !important;\n}')
  })
})
