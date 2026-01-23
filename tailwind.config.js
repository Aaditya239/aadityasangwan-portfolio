/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primaryBg: '#0B0F14',
        secondaryBg: '#111827',
        cardBg: '#0F172A',
        textPrimary: '#E5E7EB',
        textSecondary: '#9CA3AF',
        textMuted: '#6B7280',
        accent: '#A78BFA',
        accentHover: '#C4B5FD',
        divider: '#1F2937',
        glow: 'rgba(167,139,250,0.15)'
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(17,24,39,0.45)', // based on secondaryBg
        card: '0 8px 30px rgba(17,24,39,0.35)',
        glow: '0 0 0 1px rgba(59,130,246,0.15), 0 0 80px 8px rgba(59,130,246,0.15)'
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(1200px 600px at 15% -5%, rgba(167,139,250,0.25), transparent 50%), radial-gradient(900px 500px at 85% 5%, rgba(168,85,247,0.18), transparent 55%)',
        'grid-radial': 'radial-gradient(circle at 50% 50%, rgba(31,41,55,0.40), transparent 60%)'
      },
      keyframes: {
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' }
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' }
        }
      },
      animation: {
        blink: 'blink 1s infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      textShadow: {
        glow: '0 0 30px rgba(59,130,246,0.3)'
      }
      borderColor: {
        DEFAULT: '#1F2937'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial'],
        display: ['General Sans', 'Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas']
      }
    }
  },
  plugins: []
}
