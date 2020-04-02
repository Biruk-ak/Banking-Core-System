import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bcs: {
          navy: '#0b1f33',
          teal: '#0d9488',
          gold: '#c9a227',
        },
      },
    },
  },
  plugins: [],
};
export default config;
