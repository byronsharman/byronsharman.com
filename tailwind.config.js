/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,svelte,js,ts}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            '.hljs': {
              'background-color': 'inherit',
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
