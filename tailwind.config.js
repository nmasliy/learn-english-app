/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  safelist: [
    {
      pattern:
        /bg-(|purple|fuchsia|sky|cyan|amber|lime|red|stone)-(500|600|800|300)/,
      variants: ['hover', 'enabled:hover']
    },
    {
      pattern:
        /text-(|purple|fuchsia|sky|cyan|amber|lime|red|stone)-(600|800)/,
      variants: ['hover']
    }
  ],
  plugins: []
}