import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";
import cssVariables from "postcss-css-variables";

import posthtml from "posthtml";
import posthtmlPostcss from "posthtml-postcss";

const addImportantPlugin = () => {
  return {
    postcssPlugin: 'add-important',
    Rule(rule) {
      rule.walkDecls(decl => {
        decl.important = true
      })
    }
  }
}

export async function withPostCss(css) {
  return postcss([
    tailwindcss, 
    cssVariables,
    addImportantPlugin(),
  ]).process(css, {
    from: './node_modules/',
  }).then(result => result.css);
}

export async function withPostHtml(html) {
  return posthtml([
    posthtmlPostcss([
      tailwindcss({
        content: {
          raw: html,
          extension: 'html',
        }
      }),
      cssVariables,
      addImportantPlugin(),
    ], { from: './node_modules/' })
  ])
    .process(html)
    .then(result => result.html)
}
