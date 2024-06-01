module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'Qs-Bold': ['Qs-Bold', 'sans-serif'],
        'Qs-Light': ['Qs-Light', 'sans-serif'],
        'Qs-Medium': ['Qs-Medium', 'sans-serif'],
        'Qs-Regular': ['Qs-Regular', 'sans-serif'],
        'Qs-SemiBold': ['Qs-SemiBold', 'sans-serif']
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
