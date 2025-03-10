**Note: this is now fixed as of Tailwind CSS 4.0.9**

---

Running into an issue where PostCSS plugins used after Tailwind CSS v4.0-beta.2 do not work.

For example, this should add `!important` to properties and resolve CSS variables:

```js
import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";
import cssVariables from "postcss-css-variables";

postcss([
    tailwindcss, 
    cssVariables,
    addImportantPlugin, // see `index.js`
    ]).process(
        `
            @import "tailwindcss/theme";
            @import "tailwindcss/utilities";
        `, 
        {from: undefined}
    )
    .then(result => result.css);
```

However, the test fails:

```diff
.text-red-200 {
+   color: oklch(0.885 0.062 18.334) !important; // expected
-   color: var(--color-red-200);
}
```

Initially I thought this might be an async issue because of the `posthtml-postcss` plugin which uses Promises, but the issue persists even when using `postcss` directly.
