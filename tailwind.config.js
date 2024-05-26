module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sf-black': ['SF-Black', 'sans-serif'],
        'sf-blackitalic': ['SF-BlackItalic', 'sans-serif'],
        'sf-bold': ['SF-Bold', 'sans-serif'],
        'sf-bolditalic': ['SF-BoldItalic', 'sans-serif'],
        'sf-heavy': ['SF-Heavy', 'sans-serif'],
        'sf-heavyitalic': ['SF-HeavyItalic', 'sans-serif'],
        'sf-light': ['SF-Light', 'sans-serif'],
        'sf-lightitalic': ['SF-LightItalic', 'sans-serif'],
        'sf-medium': ['SF-Medium', 'sans-serif'],
        'sf-mediumitalic': ['SF-MediumItalic', 'sans-serif'],
        'sf-regular': ['SF-Regular', 'sans-serif'],
        'sf-regularitalic': ['SF-RegularItalic', 'sans-serif'],
        'sf-semibold': ['SF-Semibold', 'sans-serif'],
        'sf-semibolditalic': ['SF-SemiboldItalic', 'sans-serif'],
        'sf-thin': ['SF-Thin', 'sans-serif'],
        'sf-thinitalic': ['SF-ThinItalic', 'sans-serif'],
        'sf-ultralight': ['SF-Ultralight', 'sans-serif'],
        'sf-ultralightitalic': ['SF-UltralightItalic', 'sans-serif'],
      },
      colors: {
        'primary-purple': '#6331FF',
        'secondary-purple': '#6F26FF',
        'primary-white': '#FFF',
        'secondary-white': '#F9F9FF'
      },
    },
  },
  plugins: [],
}
