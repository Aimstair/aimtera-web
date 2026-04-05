import { useState, useEffect } from "react";
import { ArrowRight, X } from "lucide-react";
import MagneticButton from "./MagneticButton";

interface StickyWaitlistBarProps {
  product: "lume" | "symmetry" | "rbmarket";
}

const themes = {
  lume: {
    bg: "bg-lume-bg/95",
    border: "border-lume-amber/20",
    input: "bg-lume-bg-elevated border-lume-amber/20 text-lume-foreground placeholder:text-lume-foreground/30 focus:border-lume-amber/50",
    button: "bg-gradient-to-r from-lume-amber to-lume-magenta text-primary-foreground",
    text: "text-lume-foreground",
    label: "Join the Lume Beta",
  },
  symmetry: {
    bg: "bg-symmetry-bg/95",
    border: "border-symmetry-cyan/20",
    input: "bg-[hsl(220_30%_12%)] border-symmetry-cyan/20 text-lume-foreground placeholder:text-lume-foreground/30 focus:border-symmetry-cyan/50",
    button: "bg-gradient-to-r from-symmetry-cyan to-symmetry-purple text-primary-foreground",
    text: "text-lume-foreground",
    label: "Join the SymmetryAI Beta",
  },
  rbmarket: {
    bg: "bg-[hsl(220_20%_8%)]/95",
    border: "border-[hsl(145_60%_45%)]/20",
    input: "bg-[hsl(220_20%_12%)] border-[hsl(145_60%_45%)]/20 text-lume-foreground placeholder:text-lume-foreground/30 focus:border-[hsl(145_60%_45%)]/50",
    button: "bg-gradient-to-r from-[hsl(145_60%_45%)] to-[hsl(200_80%_55%)] text-primary-foreground",
    text: "text-lume-foreground",
    label: "Join the RBMarket Beta",
  },
};

const StickyWaitlistBar = ({ product }: StickyWaitlistBarProps) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [visible, setVisible] = useState(false);
  const theme = themes[product];

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (dismissed || !visible) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) { setSubmitted(true); setEmail(""); }
  };

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-40 ${theme.bg} backdrop-blur-xl border-t ${theme.border} transition-transform duration-500`} style={{ transform: visible ? "translateY(0)" : "translateY(100%)" }}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <span className={`${theme.text} text-sm font-medium hidden sm:block whitespace-nowrap`}>
          {submitted ? "🎉 You're on the list!" : theme.label}
        </span>
        {!submitted && (
          <form onSubmit={handleSubmit} className="flex-1 flex gap-2 max-w-md">
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className={`flex-1 ${theme.input} rounded-full px-4 py-2 text-sm border focus:outline-none transition-colors`} />
            <MagneticButton as="button" className={`${theme.button} font-semibold px-5 py-2 rounded-full text-sm flex items-center gap-1.5 hover:opacity-90 transition-opacity`}>
              Join Beta <ArrowRight className="w-3.5 h-3.5" />
            </MagneticButton>
          </form>
        )}
        <button onClick={() => setDismissed(true)} className={`${theme.text}/50 hover:${theme.text} transition-colors`}>
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default StickyWaitlistBar;
