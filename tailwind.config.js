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
        accent: '#3B82F6',
        accentHover: '#60A5FA',
        divider: '#1F2937',
        glow: 'rgba(59,130,246,0.15)'
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(17,24,39,0.45)', // based on secondaryBg
        card: '0 8px 30px rgba(17,24,39,0.35)',
        glow: '0 0 0 1px rgba(59,130,246,0.15), 0 0 80px 8px rgba(59,130,246,0.15)'
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(1000px 500px at 10% -10%, rgba(59,130,246,0.15), transparent 60%), radial-gradient(900px 450px at 90% -10%, rgba(59,130,246,0.10), transparent 60%)',
        'grid-radial': 'radial-gradient(circle at 50% 50%, rgba(31,41,55,0.35), transparent 60%)'
      },
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
