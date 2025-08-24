/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./dist/**/*.{js,jsx,ts,tsx}"],
  prefix: "km-",
  corePlugins: {
    preflight: false
  },
  safelist: [
    {
      // Keep dynamic background colors for Divider (e.g., km-bg-gray-200)
      pattern:
        /^(km-bg)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900)$/
    }
  ],
  theme: {
    extend: {
      colors: {
        editor: {
          primary: "#3B82F6",
          secondary: "#6B7280",
          background: "#FFFFFF",
          border: "#E5E7EB",
          text: "#1F2937",
          "text-muted": "#6B7280"
        }
      },
      fontFamily: {
        editor: ["Inter", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};
