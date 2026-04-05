import { useState, useEffect } from "react";
import { ArrowRight, X } from "lucide-react";
import MagneticButton from "./MagneticButton";
import TurnstileWidget from "./TurnstileWidget";
import { submitWaitlist, type WaitlistProduct } from "@/lib/backendApi";

interface StickyWaitlistBarProps {
  product: "lume" | "symmetry" | "rbmarket";
  isSignedUp?: boolean;
  onSignedUp?: () => void;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

const StickyWaitlistBar = ({
  product,
  isSignedUp = false,
  onSignedUp,
}: StickyWaitlistBarProps) => {
  const [email, setEmail] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [submissionState, setSubmissionState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [dismissed, setDismissed] = useState(false);
  const [visible, setVisible] = useState(false);
  const theme = themes[product];

  const productByTheme: Record<StickyWaitlistBarProps["product"], WaitlistProduct | null> = {
    lume: "lume",
    symmetry: "symmetryai",
    rbmarket: null,
  };

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (isSignedUp || dismissed || !visible) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const backendProduct = productByTheme[product];
    if (!backendProduct) {
      setSubmissionState("error");
      setErrorMessage("Waitlist submissions are unavailable for this product.");
      return;
    }

    const trimmedEmail = email.trim();
    if (!trimmedEmail) return;

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      setSubmissionState("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!captchaToken) {
      setSubmissionState("error");
      setErrorMessage("Please complete the challenge.");
      return;
    }

    setSubmissionState("submitting");
    setErrorMessage("");

    try {
      const result = await submitWaitlist({
        product: backendProduct,
        email: trimmedEmail,
        captchaToken,
      });

      if (result.duplicate) {
        setSubmissionState("error");
        setErrorMessage("This email is already on the waitlist.");
        return;
      }

      setSubmissionState("success");
      setEmail("");
      setCaptchaToken(null);
      onSignedUp?.();
    } catch (error) {
      setSubmissionState("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-40 ${theme.bg} backdrop-blur-xl border-t ${theme.border} transition-transform duration-500`} style={{ transform: visible ? "translateY(0)" : "translateY(100%)" }}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <span className={`${theme.text} text-sm font-medium hidden sm:block whitespace-nowrap`}>
          {submissionState === "success" ? "🎉 You're on the list!" : theme.label}
        </span>
        <div className="flex-1 max-w-md">
          {submissionState !== "success" && (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (submissionState === "error") {
                    setSubmissionState("idle");
                    setErrorMessage("");
                  }
                }}
                placeholder="your@email.com"
                disabled={submissionState === "submitting"}
                className={`flex-1 ${theme.input} rounded-full px-4 py-2 text-sm border focus:outline-none transition-colors`}
              />
              <MagneticButton
                as="button"
                disabled={submissionState === "submitting" || !captchaToken}
                className={`${theme.button} font-semibold px-5 py-2 rounded-full text-sm flex items-center gap-1.5 hover:opacity-90 transition-opacity disabled:opacity-70`}
              >
                {submissionState === "submitting" ? "Submitting..." : "Join Beta"} <ArrowRight className="w-3.5 h-3.5" />
              </MagneticButton>
            </form>
          )}
          {submissionState !== "success" && (
            <div className="mt-2">
              <TurnstileWidget action="waitlist_submit" onTokenChange={setCaptchaToken} />
            </div>
          )}
          <p
            aria-live="polite"
            className={`text-xs mt-1 min-h-4 break-words ${submissionState === "error" ? "text-destructive" : "text-transparent"}`}
          >
            {submissionState === "error" ? errorMessage : ""}
          </p>
        </div>
        <button onClick={() => setDismissed(true)} className={`${theme.text}/50 hover:${theme.text} transition-colors`}>
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default StickyWaitlistBar;
