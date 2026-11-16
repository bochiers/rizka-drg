import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#2B6CB0', light: '#A8E6CF', dark: '#1A4971' },
        secondary: '#60A5FA',
        accent: { DEFAULT: '#FF8A65', gold: '#E8B94A' },
        success: '#6FCF97',
        bg: '#F8FAFB',
        surface: '#FFFFFF',
        'surface-alt': '#E6F4F4',
        ink: '#1F2937',
        muted: '#6B7280',
        hairline: '#E5E9ED',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 40px -15px rgba(31,41,55,0.15)',
        glow: '0 10px 30px -10px rgba(43,108,176,0.5)',
      },
      borderRadius: {
        sm: '0.375rem',
        md: '0.75rem',
        lg: '1.25rem',
        xl: '2rem',
      },
    },
  },
}
