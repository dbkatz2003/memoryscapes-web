/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'memory-blue': '#0066FF',
        'memory-magenta': '#FF00FF',
        'memory-purple': '#9999FF',
        'memory-lavender': '#B8B8FF',
        'memory-pink': '#E6007E',
      },
    },
  },
  plugins: [],
}
