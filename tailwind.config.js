/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,svelte,js,ts}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            'color': '#030712',
            '.hljs, pre code': {
              'background-color': 'inherit',
              'color': 'inherit !important',  // don't use theme color for non-highlighted text
              'display': 'block',
              'overflow-x': 'inherit !important',
              'padding': '1.25rem !important',
            }
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
