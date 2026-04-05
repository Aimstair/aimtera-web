import { useEffect, useRef, useState } from "react";
import { ArrowRight, Shield, Users, TrendingUp, Star, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import ScrollReveal from "@/components/ScrollReveal";
import MagneticButton from "@/components/MagneticButton";
import PageTransition from "@/components/PageTransition";
import heroLaptop from "@/assets/rbmarket-hero-laptop.png";
import chatImg from "@/assets/rbmarket-chat.png";
import profileImg from "@/assets/rbmarket-profile.png";
import { Link } from "react-router-dom";

const CountUpNumber = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        const duration = 2000;
        const start = performance.now();
        const animate = (now: number) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * target));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

const FloatingVouch = ({ name, text, delay }: { name: string; text: string; delay: number }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setVisible(true), delay);
      }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className="rounded-xl p-4 border transition-all duration-700"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
        background: "hsl(var(--rbmarket-surface))",
        borderColor: "hsl(var(--rbmarket-accent) / 0.15)",
      }}
    >
      <div className="flex items-center gap-1 mb-2">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-3 h-3 fill-current text-rbmarket-accent" />
        ))}
      </div>
      <p className="text-sm mb-2" style={{ color: "hsl(var(--lume-foreground) / 0.7)" }}>"{text}"</p>
      <p className="text-xs font-semibold" style={{ color: "hsl(var(--rbmarket-accent))" }}>{name}</p>
    </div>
  );
};

const RBMarket = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-rbmarket-gradient">
        <Navbar />

        {/* Hero — Action-Oriented */}
        <section className="pt-16 min-h-screen flex items-center relative overflow-hidden">
          {/* Animated gradient orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse-glow" style={{ background: "hsl(var(--rbmarket-accent))", top: "10%", right: "10%" }} />
            <div className="absolute w-72 h-72 rounded-full blur-3xl opacity-10 animate-pulse-glow" style={{ background: "hsl(var(--rbmarket-blue))", bottom: "20%", left: "5%", animationDelay: "1s" }} />
          </div>

          <div className="container mx-auto px-6 py-24 text-center relative">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full" style={{ background: "hsl(var(--rbmarket-accent) / 0.1)", border: "1px solid hsl(var(--rbmarket-accent) / 0.2)" }}>
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "hsl(var(--rbmarket-accent))" }} />
                <span className="text-sm font-medium" style={{ color: "hsl(var(--rbmarket-accent))" }}>Live Now</span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-lume-foreground mb-6 leading-tight">
                The Marketplace,<br />
                <span className="text-gradient-rbmarket">Democratized.</span>
                <br />
                <span className="text-2xl md:text-3xl font-light" style={{ color: "hsl(var(--lume-foreground) / 0.6)" }}>Live right now.</span>
              </h1>
              <p className="text-lume-foreground/60 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                Peer-to-peer Roblox item trading with zero admin fees. Secure vouching, transparent reputation, and real-time negotiations.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <MagneticButton as="div" className="inline-block">
                <a
                  href="https://rbmarket.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 font-bold text-xl px-10 py-5 rounded-full transition-all hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--rbmarket-accent)), hsl(var(--rbmarket-blue)))",
                    color: "hsl(220 20% 7%)",
                    boxShadow: "0 0 30px hsl(var(--rbmarket-accent) / 0.4), 0 0 60px hsl(var(--rbmarket-accent) / 0.2)",
                  }}
                >
                  Go to RBMarket.app <ArrowRight className="w-6 h-6" />
                </a>
              </MagneticButton>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <div className="max-w-4xl mx-auto mt-16 relative">
                {/* Laptop mockup with animated screen */}
                <div className="relative rounded-xl overflow-hidden" style={{ boxShadow: "0 0 60px -15px hsl(var(--rbmarket-accent) / 0.3)" }}>
                  <img src={heroLaptop} alt="RBMarket live dashboard" className="w-full" width={1280} height={800} />
                  {/* Animated overlay suggesting activity */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 right-0 h-full opacity-20" style={{ background: "linear-gradient(180deg, transparent 0%, hsl(var(--rbmarket-accent) / 0.1) 50%, transparent 100%)", animation: "scanDown 3s ease-in-out infinite" }} />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Social Proof & Active Stats */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold text-lume-foreground text-center mb-4">Trusted by the Community</h2>
              <p className="text-lume-foreground/50 text-center mb-16 max-w-lg mx-auto">
                Real numbers. Real trades. Real trust.
              </p>
            </ScrollReveal>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto mb-20">
              {[
                { value: 500, suffix: "+", label: "Active Trades", icon: TrendingUp },
                { value: 1200, suffix: "+", label: "Verified Vouches", icon: Shield },
                { value: 0, suffix: "", label: "Admin Fees", icon: Users, displayText: "Zero" },
              ].map((stat, i) => (
                <ScrollReveal key={stat.label} delay={i * 150}>
                  <div className="text-center p-8 rounded-2xl border" style={{ background: "hsl(var(--rbmarket-surface))", borderColor: "hsl(var(--rbmarket-accent) / 0.1)" }}>
                    <stat.icon className="w-8 h-8 mx-auto mb-4 text-rbmarket-accent" />
                    <div className="text-4xl md:text-5xl font-bold mb-2 text-gradient-rbmarket">
                      {stat.displayText || <CountUpNumber target={stat.value} suffix={stat.suffix} />}
                    </div>
                    <p className="text-sm" style={{ color: "hsl(var(--lume-foreground) / 0.5)" }}>{stat.label}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Floating vouch reviews */}
            <ScrollReveal>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                <FloatingVouch name="@TraderX" text="Smoothest trade I've ever done. Instant and secure." delay={0} />
                <FloatingVouch name="@RobloxKing" text="Love the vouch system — no more scammers!" delay={200} />
                <FloatingVouch name="@LimitedCollector" text="Finally a marketplace that puts traders first." delay={400} />
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-24">
          <div className="container mx-auto px-6">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold text-lume-foreground text-center mb-4">How It Works</h2>
              <p className="text-lume-foreground/50 text-center mb-20 max-w-lg mx-auto">
                Trade safely, transparently, and without middlemen.
              </p>
            </ScrollReveal>

            <div className="space-y-32 max-w-5xl mx-auto">
              {/* P2P */}
              <ScrollReveal>
                <div className="flex flex-col lg:flex-row-reverse gap-12 lg:gap-20 items-center">
                  <div className="flex-1">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: "hsl(var(--rbmarket-accent) / 0.1)" }}>
                      <Users className="w-5 h-5 text-rbmarket-accent" />
                    </div>
                    <p className="text-rbmarket-accent text-xs font-semibold tracking-widest uppercase mb-2">Peer-to-Peer</p>
                    <h3 className="text-2xl md:text-3xl font-bold text-lume-foreground mb-4">Direct Trading Freedom</h3>
                    <p className="text-lume-foreground/60 leading-relaxed">
                      Negotiate directly with buyers and sellers. Real-time chat, no admin bottlenecks, no hidden fees. Just clean, fast transactions.
                    </p>
                  </div>
                  <div className="flex-1">
                    <div className="rounded-2xl overflow-hidden glow-rbmarket">
                      <img src={chatImg} alt="P2P chat interface" className="w-full" loading="lazy" width={800} height={800} />
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Public Profile — Glassmorphism */}
              <ScrollReveal>
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
                  <div className="flex-1">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: "hsl(var(--rbmarket-accent) / 0.1)" }}>
                      <Shield className="w-5 h-5 text-rbmarket-accent" />
                    </div>
                    <p className="text-rbmarket-accent text-xs font-semibold tracking-widest uppercase mb-2">Trust & Transparency</p>
                    <h3 className="text-2xl md:text-3xl font-bold text-lume-foreground mb-4">Public Profiles. No Hiding.</h3>
                    <p className="text-lume-foreground/60 leading-relaxed">
                      Every trader has a public profile with vouches, reports, and transaction history. Bad actors have nowhere to hide. Hover to see the spotlight effect.
                    </p>
                  </div>
                  <div className="flex-1">
                    <div className="rounded-2xl overflow-hidden relative group" style={{ boxShadow: "0 0 60px -15px hsl(var(--rbmarket-accent) / 0.3)" }}>
                      <img src={profileImg} alt="User profile with vouches" className="w-full" loading="lazy" width={800} height={800} />
                      {/* Glassmorphism overlay */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "linear-gradient(135deg, hsl(var(--rbmarket-accent) / 0.05), hsl(var(--rbmarket-blue) / 0.1))", backdropFilter: "blur(2px)" }}>
                        {/* Spotlight sweep */}
                        <div className="absolute inset-0 overflow-hidden">
                          <div className="absolute top-0 -left-full w-1/3 h-full" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--rbmarket-accent) / 0.15), transparent)", animation: "spotlightSweep 2s ease-in-out infinite" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Fast Marquee */}
        <section className="py-8 overflow-hidden border-y" style={{ borderColor: "hsl(var(--rbmarket-accent) / 0.1)" }}>
          <div className="flex whitespace-nowrap" style={{ animation: "marquee 12s linear infinite" }}>
            {[...Array(3)].map((_, i) => (
              <span key={i} className="text-2xl md:text-3xl font-bold tracking-wider mx-8" style={{ color: "hsl(var(--rbmarket-accent) / 0.2)" }}>
                BUY. SELL. VOUCH. REPEAT. • NO ADMIN INTERFERENCE • P2P FREEDOM •&nbsp;
              </span>
            ))}
          </div>
        </section>

        {/* Final Push CTA */}
        <section className="py-24">
          <div className="container mx-auto px-6 text-center">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold text-lume-foreground mb-4">Ready to Trade?</h2>
              <p className="text-lume-foreground/50 mb-10 max-w-md mx-auto">
                Join the fairest marketplace in gaming. No fees. No middlemen. Just P2P freedom.
              </p>
              <MagneticButton as="div" className="inline-block">
                <a
                  href="https://rbmarket.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 font-bold text-xl px-10 py-5 rounded-full transition-all hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--rbmarket-accent)), hsl(var(--rbmarket-blue)))",
                    color: "hsl(220 20% 7%)",
                    boxShadow: "0 0 30px hsl(var(--rbmarket-accent) / 0.4), 0 0 60px hsl(var(--rbmarket-accent) / 0.2)",
                  }}
                >
                  Start Trading on RBMarket.app <ExternalLink className="w-5 h-5" />
                </a>
              </MagneticButton>
            </ScrollReveal>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t py-12" style={{ borderColor: "hsl(var(--rbmarket-accent) / 0.1)", background: "hsl(var(--rbmarket-bg))" }}>
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8">
              <div>
                <h3 className="text-lg font-bold text-gradient-rbmarket mb-2">RBMarket</h3>
                <p className="text-lume-foreground/30 text-xs">By Aimtera Labs</p>
              </div>
              <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
                <Link to="/privacy" className="text-lume-foreground/50 hover:text-lume-foreground transition-colors">Privacy Policy</Link>
                <Link to="/terms" className="text-lume-foreground/50 hover:text-lume-foreground transition-colors">Terms of Service</Link>
                <Link to="/account-deletion" className="text-lume-foreground/50 hover:text-lume-foreground transition-colors">Account Deletion</Link>
                <a href="mailto:support@aimteralabs.com" className="text-lume-foreground/50 hover:text-lume-foreground transition-colors">Support</a>
              </div>
            </div>
            <div className="mt-8 pt-6" style={{ borderTop: "1px solid hsl(var(--rbmarket-accent) / 0.05)" }}>
              <p className="text-lume-foreground/20 text-xs">
                &copy; {new Date().getFullYear()} Aimtera Labs. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
};

export default RBMarket;
