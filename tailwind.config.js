/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,svelte,js,ts}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: '#030712',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
