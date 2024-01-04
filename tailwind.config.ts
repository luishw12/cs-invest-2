import type { Config } from 'tailwindcss';


const config: Config = {
  content: [
    "./node_modules/design-system-toshyro/**/*.{js,ts,jsx,tsx}",
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
export default config
