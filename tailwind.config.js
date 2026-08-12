/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0f172a',
        'bg-secondary': '#1e293b',
        'accent-blue': '#3b82f6',
        'accent-cyan': '#06b6d4',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.8s ease forwards',
        'slide-in-left': 'slide-in-left 0.8s ease forwards',
        'slide-in-right': 'slide-in-right 0.8s ease forwards',
      },
    },
  },
  plugins: [],
}
