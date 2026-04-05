import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        corporate: {
          blue: "hsl(var(--corporate-blue))",
          "blue-light": "hsl(var(--corporate-blue-light))",
          slate: "hsl(var(--corporate-slate))",
          "bg-warm": "hsl(var(--corporate-bg-warm))",
        },
        "corp-dark": {
          bg: "hsl(var(--corp-dark-bg))",
          elevated: "hsl(var(--corp-dark-elevated))",
          surface: "hsl(var(--corp-dark-surface))",
          foreground: "hsl(var(--corp-dark-foreground))",
          muted: "hsl(var(--corp-dark-muted))",
        },
        lume: {
          bg: "hsl(var(--lume-bg))",
          "bg-elevated": "hsl(var(--lume-bg-elevated))",
          foreground: "hsl(var(--lume-foreground))",
          amber: "hsl(var(--lume-amber))",
          magenta: "hsl(var(--lume-magenta))",
          glow: "hsl(var(--lume-glow))",
        },
        symmetry: {
          bg: "hsl(var(--symmetry-bg))",
          cyan: "hsl(var(--symmetry-cyan))",
          purple: "hsl(var(--symmetry-purple))",
          "neon-green": "hsl(var(--symmetry-neon-green))",
        },
        rbmarket: {
          bg: "hsl(var(--rbmarket-bg))",
          accent: "hsl(var(--rbmarket-accent))",
          blue: "hsl(var(--rbmarket-blue))",
          surface: "hsl(var(--rbmarket-surface))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
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
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        scan: {
          "0%": { top: "-10%" },
          "100%": { top: "110%" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "scroll-x": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        scan: "scan 2.5s ease-in-out infinite",
        marquee: "marquee 20s linear infinite",
        "scroll-x": "scroll-x 30s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
