import type {Config} from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        'gray-10': '#F7F7F7',
        'gray-20': '#E8EBEA',
        'gray-30': '#D6DCDA',
        'gray-40': '#BFCDC7',
        'gray-80': '#303E38',
        'gray-90': '#222C28',
        'blue-60': '#0A3360',
        'blue-95': '#001022'
      }
    }
  },
  plugins: []
};

export default config;
