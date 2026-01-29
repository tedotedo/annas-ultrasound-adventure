/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#3B82F6',
        'soft-blue': '#E8F4FD',
        'warm-orange': '#F97316',
        'soft-orange': '#FFF7ED',
        'text-dark': '#1E293B',
        'text-light': '#64748B',
        'success-green': '#22C55E',
      },
      fontFamily: {
        heading: ['Nunito', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'xl': '16px',
      },
    },
  },
  plugins: [],
}
