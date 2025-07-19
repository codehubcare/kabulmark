/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./dist/**/*.{js,jsx,ts,tsx}"],
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
