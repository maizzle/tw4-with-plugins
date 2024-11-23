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

export function withPostCss(css) {
  return postcss([
    tailwindcss(), 
    cssVariables()
  ]).process(css, {
    from: undefined,
  }).then(result => result.css);
}

export function withPostHtml(html) {
  return posthtml([
    posthtmlPostcss([
      tailwindcss({
        content: {
          raw: html,
          extension: 'html',
        }
      }),
      cssVariables,
      addImportantPlugin,
    ], { from: process.cwd() })
  ])
    .process(html)
    .then(result => result.html);
};
