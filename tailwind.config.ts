import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "primary-background": '#0F172A',
        "secondary-background": '#1E293B',
        "accent-purple": '#8B5CF6',
        "accent-blue": '#3B82F6',
        "text-primary": '#E2E8F0',
        "text-secondary": '#94A3B8',
      },
    },
  },
  plugins: [],
} satisfies Config;
