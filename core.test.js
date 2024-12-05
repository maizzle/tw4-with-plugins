import { expect, test } from 'vitest'
import { withPostCss, withPostHtml } from 'index.js'

const css = `
  @import "tailwindcss/theme";
  @import "tailwindcss/utilities";
  @theme {
    --animate-*: initial;

    --color-red-200: #FED7D7;
  }
`

test('with postcss', () => {
  return withPostCss(css).then(result => {
    expect(result).toContain('.text-red-200 {\n  color: #FED7D7 !important;\n}')
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
    console.log(result);
    
    expect(result).toContain('.text-red-200 {\n  color: #FED7D7 !important;\n}')
  })
})
