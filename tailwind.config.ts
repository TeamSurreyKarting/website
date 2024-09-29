import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'lightning-gold': {
          '50': '#fffbeb',
          '100': '#fef2c7',
          '200': '#fde48a',
          '300': '#fdd04c',
          '400': '#fcc133',
          '500': '#f69b0a',
          '600': '#da7405',
          '700': '#b55008',
          '800': '#923e0e',
          '900': '#78330f',
          '950': '#451903',
        },
        'nile-blue': {
          '50': '#f2f9fd',
          '100': '#e4f0fa',
          '200': '#c3e1f4',
          '300': '#8dcaec',
          '400': '#51aedf',
          '500': '#2a94cd',
          '600': '#1b77ae',
          '700': '#175f8d',
          '800': '#175175',
          '900': '#194561',
          '950': '#123047',
        },
      },
    },
  },
  plugins: [],
};
export default config;