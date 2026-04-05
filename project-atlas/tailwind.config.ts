import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    // Cover ALL possible locations
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'atlas-cream': '#F5F5F0',  // Added missing color
        'atlas-black': '#050505',   // Match your existing naming
        atlas: {
          black: '#050505',
          gold: '#c5a059',
          cream: '#F5F5F0',         // Also available as atlas.cream
        }
      },
    },
  },
  plugins: [],
};

export default config;