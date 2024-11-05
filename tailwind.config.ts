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
				"lg-viewport": "clamp(1.125rem, 1.25vw, 1.25vw)",
				"xl-viewport": "clamp(1.25rem, 1.4vw, 1.4vw)",
				"5xl-viewport": "clamp(3rem, 3.3vw, 3.3vw)",
				"sm-viewport": "clamp(0.875rem, 0.97vw, 0.97vw)",
				"xs-viewport": "clamp(0.75rem, 0.7vw, 0.7vw)",
			},
			lineHeight: {
				"4-viewport": "clamp(1rem, 1.11vw, 1.11vw)",
				"5-viewport": "clamp(1.25rem, 1.4vw, 1.4vw)",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
				viewport: "0.27vw",
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
				"2-viewport": "0.55vw",
				"3-viewport": "0.7vw",
				"4-viewport": "1.11vw",
				"4.5": "18px",
				"5-viewport": "1.4vw",
				"12-viewport": "3.33vw",
				"20-viewport": "5.55vw",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};

export default config;
