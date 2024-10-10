import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				pink: {
					"300": "#FFB3BA",
					"500": "#CD8F95",
					"700": "#AB757A",
				},
				"blue-pastel": {
					"300": "#BAE1FF",
					"700": "#536674",
				},
				"yellow-pastel": {
					"300": "#FFFFBA",
					"700": "#808057",
				},
				"green-pastel": {
					"300": "#BAFFC9",
				},
			},
			fontFamily: {
				"nunito-sans": ["var(--font-nunito-sans)", "sans-serif"],
				poppins: ["var(--font-poppins)", "sans-serif"],
			},
			fontSize: {
				md: "0.9375rem", // 15px
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
			blur: {
				"4xl": "80px",
				"7xl": "150px",
			},
			spacing: {
				"4.5": "18px",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};

export default config;
