/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  safelist: [
    {
      pattern: /bg-(|purple|sky|cyan|amber|lime|red|stone)-(500|600|800|300)/,
      variants: ['hover', 'enabled:hover']
    },
    {
      pattern: /text-(|purple|sky|cyan|amber|lime|red|stone)-(600|800)/,
      variants: ['hover']
    },
    {
      pattern: /border-(|purple|sky|cyan|amber|lime|red|stone)-(300|600)/
    }
  ],
  plugins: []
}
