/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "fg-default": "var(--fg-default)",
        "fg-soft": "var(--fg-soft)",
        "bg-default": "var(--bg-default)",
        "sf-fg-default": "var(--fg-default)",
        "sf-fg-soft": "var(--fg-soft)",
        "sf-bg-default": "var(--bg-default)",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        caveat: ["Caveat", "cursive"],
      },
      maxWidth: {
        sjofn: "580px",
      },
    },
  },
  plugins: [],
};
