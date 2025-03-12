import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Light mode colors
        'brand-blue': '#2AADE3',
        'brand-teal': '#00C5E3',
        'brand-turquoise': '#00D9CF',
        'brand-light-green': '#58EAAE',
        'brand-lime-green': '#ABF489',
        'brand-yellow': '#F9F871',
        
        // Dark mode adjusted colors (slightly more vibrant for dark backgrounds)
        'dark-brand-blue': '#3BBFF5',
        'dark-brand-teal': '#10D7F5',
        'dark-brand-turquoise': '#12EBE1',
        'dark-brand-light-green': '#69FCBF',
        'dark-brand-lime-green': '#BCFF9A',
        'dark-brand-yellow': '#FFFA82',
        
        // Dark mode background colors
        'dark-bg-primary': '#121212',
        'dark-bg-secondary': '#1E1E1E',
        'dark-bg-tertiary': '#2D2D2D',
        'dark-border': '#3D3D3D',
        'dark-text-primary': '#E1E1E1',
        'dark-text-secondary': '#A0A0A0',
      },
    },
  },
  plugins: [],
};

export default config;
