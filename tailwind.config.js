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
        accent: "var(--accent)",
        "bg-active": "var(--bg-active)",
        "nav-border": "var(--nav-border)",
        "divider-color": "var(--divider-color)",
        "hero-border-color": "var(--hero-border-color)",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        caveat: ["var(--font-caveat)", "Caveat", "cursive"],
        "dm-mono": [
          "var(--font-dm-mono)",
          "DM Mono",
          "Consolas",
          "Monaco",
          "Courier New",
          "monospace",
        ],
      },
      spacing: {
        "0.5px": "0.5px",
        "1px": "1px",
        "2px": "2px",
        "20vh": "20vh",
      },
      margin: {
        "1px": "1px",
        "calc(12px+8px)": "calc(12px + 8px)",
      },
      fontSize: {
        17: "17px",
      },
      fontWeight: {
        300: "300",
      },
      maxWidth: {
        sjofn: "var(--max-width-sjofn, 600px)",
      },
      width: {
        "89px": "89px",
        "20px": "20px",
        "14px": "14px",
        "12px": "12px",
        "1px": "1px",
      },
      height: {
        "40px": "40px",
        "20px": "20px",
        "16px": "16px",
        "14px": "14px",
        "0.5px": "0.5px",
      },
      gap: {
        "12px": "12px",
      },
      padding: {
        "24px-16px-16px-16px": "24px 16px 16px 16px",
        "2px-4px": "2px 4px",
        "0-16px-20vh-16px": "0 16px 20vh 16px",
        "12px-16px": "12px 16px",
      },
      borderRadius: {
        "4px": "4px",
      },
      zIndex: {
        9999: "9999",
      },
      opacity: {
        0.15: "0.15",
        0.4: "0.4",
        0.5: "0.5",
      },
      transitionDuration: {
        "168ms": "168ms",
      },
      lineHeight: {
        "40px": "40px",
      },
      flex: {
        "0-0-auto": "0 0 auto",
        "1-1-auto": "1 1 auto",
      },
      caretColor: {
        "sf-fg-default": "var(--sf-fg-default)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".scrollbar-none": {
          "scrollbar-width": "none",
          "-ms-overflow-style": "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
