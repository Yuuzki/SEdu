/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#00A3FF",
          50: "#E6F6FF",
          100: "#CCE9FF",
          200: "#99D4FF",
          300: "#66BEFF",
          400: "#33A9FF",
          500: "#00A3FF",
          600: "#0082CC",
          700: "#006299",
          800: "#004166",
          900: "#002133",
        },
        neon: {
          purple: "#A855F7",
          blue: "#3B82F6",
          cyan: "#06B6D4",
          pink: "#EC4899",
        },
        glass: {
          light: "rgba(255, 255, 255, 0.1)",
          dark: "rgba(0, 0, 0, 0.2)",
        },
      },
      boxShadow: {
        "3d": "0 10px 30px -5px rgba(0, 163, 255, 0.3), 0 6px 10px -5px rgba(0, 163, 255, 0.2)",
        "3d-hover": "0 20px 40px -5px rgba(0, 163, 255, 0.4), 0 10px 20px -5px rgba(0, 163, 255, 0.3)",
        "3d-dark": "0 10px 30px -5px rgba(0, 0, 0, 0.5), 0 6px 10px -5px rgba(0, 0, 0, 0.3)",
        "neumorphic-light": "8px 8px 16px rgba(0, 0, 0, 0.1), -8px -8px 16px rgba(255, 255, 255, 0.8)",
        "neumorphic-dark": "8px 8px 16px rgba(0, 0, 0, 0.4), -8px -8px 16px rgba(255, 255, 255, 0.05)",
        "neumorphic-inset": "inset 4px 4px 8px rgba(0, 0, 0, 0.15), inset -4px -4px 8px rgba(255, 255, 255, 0.7)",
        "neumorphic-inset-dark": "inset 4px 4px 8px rgba(0, 0, 0, 0.4), inset -4px -4px 8px rgba(255, 255, 255, 0.05)",
        "glow": "0 0 20px rgba(0, 163, 255, 0.5), 0 0 40px rgba(0, 163, 255, 0.3), 0 0 60px rgba(0, 163, 255, 0.1)",
        "glow-purple": "0 0 20px rgba(168, 85, 247, 0.5), 0 0 40px rgba(168, 85, 247, 0.3)",
        "glow-sm": "0 0 10px rgba(0, 163, 255, 0.4)",
        "glass": "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        "btn-3d": "0 6px 0 #0082CC, 0 8px 10px rgba(0, 0, 0, 0.2)",
        "btn-3d-pressed": "0 2px 0 #0082CC, 0 3px 5px rgba(0, 0, 0, 0.2)",
        "btn-dark-3d": "0 6px 0 #1e293b, 0 8px 10px rgba(0, 0, 0, 0.3)",
        "btn-dark-3d-pressed": "0 2px 0 #1e293b, 0 3px 5px rgba(0, 0, 0, 0.3)",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        float: "float linear infinite",
        "soft-float": "soft-float 4s ease-in-out infinite",
        "wave-sweep": "wave-sweep 2.5s ease-in-out forwards",
        "spin-slow": "spin-slow 6s linear infinite",
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
        "float-slow": "float-slow 6s ease-in-out infinite",
        "float-delayed": "float-slow 6s ease-in-out infinite 2s",
        "float-reverse": "float-reverse 5s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "tilt": "tilt 10s ease-in-out infinite",
        "bounce-slow": "bounce-slow 3s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "gradient-x": "gradient-x 3s ease infinite",
        "blob": "blob 7s infinite",
      },
      keyframes: {
        float: {
          "0%": { transform: "translateY(0) rotate(0deg)", opacity: "0" },
          "20%": { opacity: "0.5" },
          "100%": { transform: "translateY(-120vh) rotate(360deg)", opacity: "0" },
        },
        "soft-float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "25%": { transform: "translateY(-20px) translateX(10px)" },
          "50%": { transform: "translateY(-10px) translateX(-5px)" },
          "75%": { transform: "translateY(-25px) translateX(5px)" },
        },
        "float-reverse": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(20px) rotate(10deg)" },
        },
        "wave-sweep": {
          "0%": { transform: "translateX(-200%) skewX(-20deg)" },
          "100%": { transform: "translateX(200%) skewX(-20deg)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.7" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0, 163, 255, 0.4), 0 0 40px rgba(0, 163, 255, 0.2)" },
          "50%": { boxShadow: "0 0 30px rgba(0, 163, 255, 0.6), 0 0 60px rgba(0, 163, 255, 0.4)" },
        },
        "tilt": {
          "0%, 100%": { transform: "rotate(-1deg)" },
          "50%": { transform: "rotate(1deg)" },
        },
        "bounce-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "blob": {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "glass-gradient": "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))",
        "mesh-gradient": "radial-gradient(at 40% 20%, hsla(189, 100%, 50%, 0.3) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(270, 100%, 70%, 0.3) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(240, 100%, 70%, 0.2) 0px, transparent 50%)",
      },
    },
  },
  plugins: [],
};
