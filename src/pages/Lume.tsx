import { useEffect, useState } from "react";
import { ArrowRight, Bluetooth, Layers, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ScrollReveal from "@/components/ScrollReveal";
import MagneticButton from "@/components/MagneticButton";
import StickyWaitlistBar from "@/components/StickyWaitlistBar";
import TurnstileWidget from "@/components/TurnstileWidget";
import PageTransition from "@/components/PageTransition";
import heroBg from "@/assets/hero-lume.jpg";
import phoneMockup from "@/assets/lume-phone-mockup.png";
import proximityImg from "@/assets/lume-proximity.png";
import echoDeckImg from "@/assets/lume-echo-deck.png";
import mapImg from "@/assets/lume-map.png";
import proximitySpark from "@/assets/lume-proximity-spark.png";
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
        product: "lume",
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
    return <div className={className}><p className="text-lume-amber font-semibold">🎉 You're on the list! We'll be in touch.</p></div>;
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
          className="flex-1 bg-lume-bg-elevated border border-lume-amber/20 rounded-full px-6 py-3.5 text-lume-foreground placeholder:text-lume-foreground/30 focus:outline-none focus:border-lume-amber/50 transition-colors"
        />
        <MagneticButton
          as="button"
          disabled={submissionState === "submitting" || !captchaToken}
          className="bg-gradient-to-r from-lume-amber to-lume-magenta text-primary-foreground font-semibold px-8 py-3.5 rounded-full hover:opacity-90 transition-opacity flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-70"
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

const Lume = () => {
  const [isWaitlistSignedUp, setIsWaitlistSignedUp] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);
  const [isCountLoading, setIsCountLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchWaitlistCount = async () => {
      setIsCountLoading(true);
      try {
        const result = await getWaitlistCount("lume");
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
    { icon: Bluetooth, title: "Pass It On", subtitle: "Proximity Technology", description: "Messages seamlessly hop between devices using Bluetooth as users walk past one another. No internet needed — just proximity and serendipity.", image: proximityImg, imgAlt: "Two phones connecting via Bluetooth proximity" },
    { icon: Layers, title: "The Echo Deck", subtitle: "Beautiful Message Cards", description: "Every message is a beautifully crafted card, designed to be screenshotted and shared on Instagram Stories. Express yourself with style.", image: echoDeckImg, imgAlt: "Swipeable gradient message cards" },
    { icon: MapPin, title: "Track Your Impact", subtitle: "Watch Messages Travel", description: "See your messages travel across the city or globe as they pass from person to person. Watch your words find their audience.", image: mapImg, imgAlt: "Map showing message paths across a city" },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-lume-bg">
        <Navbar />
        <StickyWaitlistBar
          product="lume"
          isSignedUp={isWaitlistSignedUp}
          onSignedUp={handleWaitlistSignedUp}
        />

        {/* Hero */}
        <section className="relative pt-16 overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroBg} alt="" className="w-full h-full object-cover" width={1920} height={1080} />
            <div className="absolute inset-0 bg-lume-bg/60" />
          </div>
          <div className="relative container mx-auto px-6 py-24 md:py-36">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <ScrollReveal>
                  <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full" style={{ background: "hsl(var(--lume-amber) / 0.15)", border: "1px solid hsl(var(--lume-amber) / 0.3)" }}>
                    <span className="text-xs font-bold text-lume-amber">BETA</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-lume-foreground mb-6 leading-tight">
                    Leave a Little<br /><span className="text-gradient-lume">Light Behind.</span>
                  </h1>
                  <p className="text-lume-foreground/60 text-lg mb-8 max-w-lg leading-relaxed">
                    A new social experience where your messages are passed to the people you cross paths with every day. Join the exclusive beta.
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
                  <img src={phoneMockup} alt="Lume app interface" className="w-80 animate-float drop-shadow-2xl relative z-10" width={1024} height={1024} />
                  <div className="absolute inset-0 -z-10 flex items-center justify-center">
                    <div className="w-64 h-64 rounded-full bg-lume-amber/10 blur-3xl animate-pulse-glow" />
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Proximity Spark */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <ScrollReveal>
              <div className="max-w-2xl mx-auto text-center">
                <img src={proximitySpark} alt="Two phones exchanging messages" className="w-full max-w-lg mx-auto mb-8" loading="lazy" width={1024} height={600} />
                <h2 className="text-2xl md:text-3xl font-bold text-lume-foreground mb-3">Messages That <span className="text-gradient-lume">Travel</span></h2>
                <p className="text-lume-foreground/50 max-w-md mx-auto">When two Lume users cross paths, messages hop between devices using Bluetooth — no internet needed.</p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-24">
          <div className="container mx-auto px-6">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold text-lume-foreground text-center mb-4">How It Works</h2>
              <p className="text-lume-foreground/50 text-center mb-20 max-w-lg mx-auto">Lume reimagines social interaction through proximity, beauty, and serendipity.</p>
            </ScrollReveal>
            <div className="space-y-32">
              {features.map((f, i) => (
                <ScrollReveal key={f.title} delay={100}>
                  <div className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12 lg:gap-20 items-center max-w-5xl mx-auto`}>
                    <div className="flex-1">
                      <div className="w-10 h-10 rounded-lg bg-lume-amber/10 flex items-center justify-center mb-4"><f.icon className="w-5 h-5 text-lume-amber" /></div>
                      <p className="text-lume-amber text-xs font-semibold tracking-widest uppercase mb-2">{f.subtitle}</p>
                      <h3 className="text-2xl md:text-3xl font-bold text-lume-foreground mb-4">{f.title}</h3>
                      <p className="text-lume-foreground/60 leading-relaxed">{f.description}</p>
                    </div>
                    <div className="flex-1">
                      <div className="rounded-2xl overflow-hidden glow-lume">
                        <img src={f.image} alt={f.imgAlt} className="w-full" loading="lazy" width={800} height={600} />
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
          <div className="absolute inset-0 bg-gradient-to-t from-lume-bg via-lume-bg-elevated to-lume-bg" />
          <div className="relative container mx-auto px-6 text-center">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold text-lume-foreground mb-4">Ready to Light Up?</h2>
              <p className="text-lume-foreground/50 mb-10 max-w-md mx-auto">Be among the first to experience Lume. Join our exclusive beta waitlist.</p>
              <WaitlistForm
                className="max-w-lg mx-auto"
                isSignedUp={isWaitlistSignedUp}
                onSignedUp={handleWaitlistSignedUp}
              />
            </ScrollReveal>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-lume-amber/10 py-12 bg-lume-bg">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8">
              <div>
                <h3 className="text-lg font-bold text-gradient-lume mb-2">Lume</h3>
                <p className="text-lume-foreground/30 text-xs">By Aimtera Labs</p>
              </div>
              <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
                <Link to="/privacy" className="text-lume-foreground/50 hover:text-lume-foreground transition-colors">Privacy Policy</Link>
                <Link to="/terms" className="text-lume-foreground/50 hover:text-lume-foreground transition-colors">Terms of Service</Link>
                <Link to="/account-deletion" className="text-lume-foreground/50 hover:text-lume-foreground transition-colors">Account Deletion</Link>
                <a href="mailto:support@aimteralabs.com" className="text-lume-foreground/50 hover:text-lume-foreground transition-colors">Support</a>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-lume-amber/5">
              <p className="text-lume-foreground/20 text-xs">&copy; {new Date().getFullYear()} Aimtera Labs. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
};

export default Lume;
