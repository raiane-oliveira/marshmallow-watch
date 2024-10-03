import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "nunito-sans": ["var(--font-nunito-sans)", "sans-serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
      }
    }
  },
  plugins: [],
}

export default config;
