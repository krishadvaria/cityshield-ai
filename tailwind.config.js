/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#0A0F1D',
          card: '#111827',
          surface: '#162033',
          border: '#1F2E47',
          cyan: '#00F0FF',
          teal: '#14B8A6',
          green: '#10B981',
          amber: '#F59E0B',
          red: '#EF4444',
          purple: '#8B5CF6'
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'cyan-glow': '0 0 15px rgba(0, 240, 255, 0.25)',
        'red-glow': '0 0 15px rgba(239, 68, 68, 0.35)',
        'green-glow': '0 0 15px rgba(16, 185, 129, 0.25)',
        'amber-glow': '0 0 15px rgba(245, 158, 11, 0.3)',
      }
    },
  },
  plugins: [],
}
