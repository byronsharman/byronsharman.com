/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,svelte,js,ts}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            h1: {
              margin: '0px',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
