import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        clemore: ['Clemore', 'serif'],
      },
      colors: {
        'brand-dark': '#47542b',
      },
    },
  },
  plugins: [],
};
export default config;
