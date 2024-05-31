module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sf-bold': ['SF-Bold', 'sans-serif'],
        'sf-light': ['SF-Light', 'sans-serif'],
        'sf-medium': ['SF-Medium', 'sans-serif'],
        'sf-regular': ['SF-Regular', 'sans-serif'],
        'sf-semibold': ['SF-Semibold', 'sans-serif']
      },
      colors: {
        'primary-purple': '#6331FF',
        'secondary-purple': '#6F26FF',
        'white-purple': '#B08FFF',
        'primary-white': '#FFF',
        'secondary-white': '#F9F9FF',
        'primary-grey': '#323232'
      },
    },
  },
  plugins: [],
}
