import type { Config } from 'tailwindcss';

const {nextui} = require("@nextui-org/react");

const config: Config = {
  content: [
    "./node_modules/design-system-toshyro/**/*.{js,ts,jsx,tsx}",
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    require('tailwind-scrollbar'),
    nextui()
  ],
}
export default config
