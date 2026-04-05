import { useEffect, useState } from "react";
import { ArrowRight, Scan, Dumbbell, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ScrollReveal from "@/components/ScrollReveal";
import MagneticButton from "@/components/MagneticButton";
import StickyWaitlistBar from "@/components/StickyWaitlistBar";
import TurnstileWidget from "@/components/TurnstileWidget";
import PageTransition from "@/components/PageTransition";
import heroPhone from "@/assets/symmetry-hero-phone.png";
import muscleChart from "@/assets/symmetry-muscle-chart.png";
import workoutImg from "@/assets/symmetry-workout.png";
import graphImg from "@/assets/symmetry-graph.png";
import { getWaitlistCount, submitWaitlist } from "@/lib/backendApi";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface WaitlistFormProps {
  className?: string;
  isSignedUp: boolean;
  onSignedUp: () => void;
}

const WaitlistForm = ({ className = "", isSignedUp, onSignedUp }: WaitlistFormProps) => {
  const [email, setEmail] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [submissionState, setSubmissionState] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSignedUp) return;

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
        product: "symmetryai",
        email: trimmedEmail,
        captchaToken,
      });

      if (result.duplicate) {
        setSubmissionState("error");
        setErrorMessage("This email is already on the waitlist.");
        return;
      }

      setEmail("");
      setCaptchaToken(null);
      setSubmissionState("idle");
      onSignedUp();
    } catch (error) {
      setSubmissionState("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
      );
    }
  };

  if (isSignedUp) {
    return <div className={className}><p className="text-symmetry-cyan font-semibold">🎉 You're on the list!</p></div>;
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-2 ${className}`}>
      <div className="flex flex-col sm:flex-row gap-3">
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
          placeholder="Enter your email"
          disabled={submissionState === "submitting"}
          className="flex-1 bg-[hsl(220_30%_12%)] border border-symmetry-cyan/20 rounded-full px-6 py-3.5 text-lume-foreground placeholder:text-lume-foreground/30 focus:outline-none focus:border-symmetry-cyan/50 transition-colors"
        />
        <MagneticButton
          as="button"
          disabled={submissionState === "submitting" || !captchaToken}
          className="bg-gradient-to-r from-symmetry-cyan to-symmetry-purple text-primary-foreground font-semibold px-8 py-3.5 rounded-full hover:opacity-90 transition-opacity flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-70"
        >
          {submissionState === "submitting" ? "Joining..." : "Join Waitlist"} <ArrowRight className="w-4 h-4" />
        </MagneticButton>
      </div>
      <TurnstileWidget
        action="waitlist_submit"
        onTokenChange={setCaptchaToken}
      />
      <p
        aria-live="polite"
        className={`text-sm min-h-5 break-words ${submissionState === "error" ? "text-destructive" : "text-transparent"}`}
      >
        {submissionState === "error" ? errorMessage : ""}
      </p>
    </form>
  );
};

const SymmetryAI = () => {
  const [isWaitlistSignedUp, setIsWaitlistSignedUp] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);
  const [isCountLoading, setIsCountLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchWaitlistCount = async () => {
      setIsCountLoading(true);
      try {
        const result = await getWaitlistCount("symmetryai");
        if (isMounted) {
          setWaitlistCount(result.count);
        }
      } catch {
        if (isMounted) {
          setWaitlistCount(null);
        }
      } finally {
        if (isMounted) {
          setIsCountLoading(false);
        }
      }
    };

    fetchWaitlistCount();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleWaitlistSignedUp = () => {
    setIsWaitlistSignedUp((previous) => {
      if (!previous) {
        setWaitlistCount((current) => (typeof current === "number" ? current + 1 : current));
      }
      return true;
    });
  };

  const waitlistCountText = isCountLoading
    ? "Loading live waitlist count..."
    : typeof waitlistCount === "number"
      ? `${waitlistCount.toLocaleString()} ${waitlistCount === 1 ? "person" : "people"} currently on the waitlist.`
      : "Live waitlist count is temporarily unavailable.";

  const features = [
    { icon: Scan, title: "AI Muscle Analysis", subtitle: "The Scan", description: "Upload a photo and our AI instantly maps your muscle development. Identify overdeveloped and underdeveloped areas with precision imaging.", image: muscleChart, imgAlt: "AI muscle analysis breakdown" },
    { icon: Dumbbell, title: "Tailored Workout Generation", subtitle: "The Plan", description: "Based on your scan results, SymmetryAI generates hyper-targeted workout routines that focus on your weakest areas. No guesswork, just science.", image: workoutImg, imgAlt: "Generated workout routine" },
    { icon: TrendingUp, title: "The Evolutionary Loop", subtitle: "Track Progress", description: "Log your workouts, rescan, and watch your symmetry improve over time. Beautiful data visualization tracks your journey to perfect balance.", image: graphImg, imgAlt: "Muscle symmetry progress graph" },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-symmetry-gradient">
        <Navbar />
        <StickyWaitlistBar
          product="symmetry"
          isSignedUp={isWaitlistSignedUp}
          onSignedUp={handleWaitlistSignedUp}
        />

        {/* Hero */}
        <section className="pt-16 min-h-screen flex items-center relative overflow-hidden">
          <div className="container mx-auto px-6 py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <ScrollReveal>
                  <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full" style={{ background: "hsl(var(--symmetry-cyan) / 0.15)", border: "1px solid hsl(var(--symmetry-cyan) / 0.3)" }}>
                    <span className="text-xs font-bold text-symmetry-cyan">IN DEVELOPMENT</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-lume-foreground mb-6 leading-tight">
                    Your Body,<br /><span className="text-gradient-symmetry">Decoded.</span>
                  </h1>
                  <p className="text-lume-foreground/60 text-lg mb-8 max-w-lg leading-relaxed">
                    AI-powered muscle analysis and personalized workout generation. Scan, analyze, and train smarter than ever before.
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={200}>
                  <WaitlistForm
                    className="max-w-lg"
                    isSignedUp={isWaitlistSignedUp}
                    onSignedUp={handleWaitlistSignedUp}
                  />
                  <p className="max-w-lg mt-2 text-xs text-lume-foreground/50" aria-live="polite">
                    {waitlistCountText}
                  </p>
                </ScrollReveal>
              </div>
              <ScrollReveal delay={300} direction="right">
                <div className="hidden lg:flex justify-center relative">
                  <div className="relative">
                    <img src={heroPhone} alt="SymmetryAI body scan" className="w-72 drop-shadow-2xl relative z-10" width={800} height={1024} />
                    <div className="absolute left-0 right-0 h-1 z-20 animate-scan scan-line" style={{ filter: "blur(2px)" }} />
                    <div className="absolute inset-0 -z-10 blur-3xl opacity-30">
                      <div className="w-full h-full bg-gradient-to-b from-symmetry-cyan/50 to-symmetry-purple/50 rounded-full" />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-24">
          <div className="container mx-auto px-6">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold text-lume-foreground text-center mb-4">How It Works</h2>
              <p className="text-lume-foreground/50 text-center mb-20 max-w-lg mx-auto">Three steps to symmetrical, science-backed training.</p>
            </ScrollReveal>
            <div className="space-y-32 max-w-5xl mx-auto">
              {features.map((f, i) => (
                <ScrollReveal key={f.title} delay={100}>
                  <div className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12 lg:gap-20 items-center`}>
                    <div className="flex-1">
                      <div className="w-10 h-10 rounded-lg bg-symmetry-cyan/10 flex items-center justify-center mb-4"><f.icon className="w-5 h-5 text-symmetry-cyan" /></div>
                      <p className="text-symmetry-cyan text-xs font-semibold tracking-widest uppercase mb-2">{f.subtitle}</p>
                      <h3 className="text-2xl md:text-3xl font-bold text-lume-foreground mb-4">{f.title}</h3>
                      <p className="text-lume-foreground/60 leading-relaxed">{f.description}</p>
                    </div>
                    <div className="flex-1">
                      <div className="rounded-2xl overflow-hidden glow-symmetry">
                        <img src={f.image} alt={f.imgAlt} className="w-full" loading="lazy" width={800} height={800} />
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section id="waitlist" className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-symmetry-bg via-[hsl(240_25%_10%)] to-symmetry-bg" />
          <div className="relative container mx-auto px-6 text-center">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold text-lume-foreground mb-4">Ready to Get Balanced?</h2>
              <p className="text-lume-foreground/50 mb-10 max-w-md mx-auto">Join the beta and be among the first to train with AI precision.</p>
              <WaitlistForm
                className="max-w-lg mx-auto"
                isSignedUp={isWaitlistSignedUp}
                onSignedUp={handleWaitlistSignedUp}
              />
            </ScrollReveal>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-symmetry-cyan/10 py-12 bg-symmetry-bg">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8">
              <div>
                <h3 className="text-lg font-bold text-gradient-symmetry mb-2">SymmetryAI</h3>
                <p className="text-lume-foreground/30 text-xs">By Aimtera Labs</p>
              </div>
              <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
                <Link to="/privacy" className="text-lume-foreground/50 hover:text-lume-foreground transition-colors">Privacy Policy</Link>
                <Link to="/terms" className="text-lume-foreground/50 hover:text-lume-foreground transition-colors">Terms of Service</Link>
                <Link to="/account-deletion" className="text-lume-foreground/50 hover:text-lume-foreground transition-colors">Account Deletion</Link>
                <a href="mailto:support@aimteralabs.com" className="text-lume-foreground/50 hover:text-lume-foreground transition-colors">Support</a>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-symmetry-cyan/5">
              <p className="text-lume-foreground/20 text-xs">&copy; {new Date().getFullYear()} Aimtera Labs. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
};

export default SymmetryAI;
