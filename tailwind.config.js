module.exports = {
  theme: {
    container: {
      center: true,
    },
    extend: {}
  },
  variants: {},
  plugins: [
    require('tailwindcss-elevation')(['hover', 'focus', 'active']),
  ]
}