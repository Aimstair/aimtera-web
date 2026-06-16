import { Activity, ShieldCheck, Users, Smartphone, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ScrollReveal from "@/components/ScrollReveal";
import MagneticButton from "@/components/MagneticButton";
import PageTransition from "@/components/PageTransition";

const Test4Test = () => {
  const features = [
    { icon: Users, title: "Mutual Testing Community", description: "Connect with other passionate Google Play developers to exchange testing services and hit your 20 testers requirement." },
    { icon: ShieldCheck, title: "14-Day Verification", description: "We ensure compliance by verifying the completion of 14-day app tests through the review of daily screenshots." },
    { icon: Activity, title: "Karma & Tokens", description: "Earn tokens and build your Karma score by being a reliable tester. Use your tokens to get your own app tested." },
    { icon: Smartphone, title: "Device & Regional Insights", description: "Ensure your app runs perfectly across different operating systems, device models, and regions." },
    { icon: Star, title: "Privacy-Focused Groups", description: "Facilitate communication seamlessly between app owners and testers using secure, privacy-focused Google Groups." },
  ];

  const steps = [
    { num: "01", title: "Join the Community", desc: "Sign in with Google and register your app for testing." },
    { num: "02", title: "Test & Earn", desc: "Test other developers' apps, submit daily proofs, and earn tokens." },
    { num: "03", title: "Launch Successfully", desc: "Use your tokens to get 20 testers for 14 days and meet Google Play compliance." }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen font-sans" style={{ background: "hsl(var(--test4test-bg))" }}>
        <Navbar />

        {/* Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="relative container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="z-10">
                <ScrollReveal>
                  <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border" style={{ borderColor: "hsl(var(--test4test-accent) / 0.3)", background: "hsl(var(--test4test-accent) / 0.1)" }}>
                    <span className="text-xs font-bold" style={{ color: "hsl(var(--test4test-accent))" }}>FOR DEVELOPERS</span>
                  </div>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                    Publish Apps with<br /><span className="text-gradient-test4test">Confidence.</span>
                  </h1>
                  <p className="text-white/60 text-lg mb-10 max-w-lg leading-relaxed">
                    Overcome the Google Play 20-tester requirement effortlessly. Test4Test connects you with real developers for mutual 14-day app testing.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <MagneticButton as="button" className="bg-white text-black font-semibold px-8 py-3.5 rounded-full hover:bg-white/90 transition-colors flex items-center justify-center gap-2">
                      Download on Google Play
                    </MagneticButton>
                  </div>
                </ScrollReveal>
              </div>
              <ScrollReveal delay={200} direction="right">
                <div className="hidden lg:flex justify-center relative">
                  <div className="w-80 h-[40rem] rounded-[2.5rem] bg-black/40 border border-white/10 glassmorphism relative z-10 flex flex-col items-center justify-center glow-test4test p-8 text-center animate-float">
                    <Users className="w-16 h-16 mb-6" style={{ color: "hsl(var(--test4test-accent))" }} />
                    <h3 className="text-2xl font-bold text-white mb-2">Test4Test</h3>
                    <p className="text-white/60">Mutual App Testing</p>
                  </div>
                  <div className="absolute inset-0 -z-10 flex items-center justify-center">
                    <div className="w-[30rem] h-[30rem] rounded-full blur-[120px] animate-pulse-glow" style={{ background: "hsl(var(--test4test-accent) / 0.15)" }} />
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-24 bg-black/40 border-y border-white/5 relative glassmorphism">
          <div className="container mx-auto px-6">
            <ScrollReveal>
              <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-16">Why Test4Test?</h2>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {features.map((f, i) => (
                <ScrollReveal key={f.title} delay={i * 100}>
                  <div className="p-8 rounded-3xl h-full border border-white/10 transition-all hover:border-white/30 hover:shadow-2xl hover:scale-[1.02]" style={{ background: "hsl(var(--test4test-surface))", boxShadow: "0 0 40px -10px hsl(var(--test4test-blue) / 0.05)" }}>
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: "hsl(var(--test4test-accent) / 0.15)" }}>
                      <f.icon className="w-7 h-7" style={{ color: "hsl(var(--test4test-accent))" }} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
                    <p className="text-white/60 leading-relaxed text-sm">{f.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full blur-[150px] opacity-20" style={{ background: "hsl(var(--test4test-blue))" }} />
          </div>
          <div className="container mx-auto px-6 max-w-5xl relative z-10">
            <ScrollReveal>
              <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-24">How It Works</h2>
            </ScrollReveal>
            
            <div className="relative">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 hidden md:block" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--test4test-accent) / 0.4), transparent)" }} />
              <div className="grid md:grid-cols-3 gap-16 md:gap-8">
                {steps.map((step, i) => (
                  <ScrollReveal key={step.title} delay={i * 150}>
                    <div className="relative bg-black/60 p-8 rounded-3xl border border-white/10 text-center backdrop-blur-xl">
                      <div className="w-20 h-20 rounded-full mx-auto -mt-16 flex items-center justify-center text-2xl font-bold border-[6px]" style={{ borderColor: "hsl(var(--test4test-surface))", background: "hsl(var(--test4test-accent))", color: "hsl(var(--test4test-bg))" }}>
                        {step.num}
                      </div>
                      <h3 className="text-xl font-bold text-white mt-8 mb-3">{step.title}</h3>
                      <p className="text-white/60 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-16" style={{ background: "hsl(var(--test4test-surface))" }}>
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="text-2xl font-bold text-gradient-test4test tracking-tighter">
                Test4Test
              </div>
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium">
                <Link to="/" className="text-white/60 hover:text-white transition-colors">Home</Link>
                <Link to="/" className="text-white/60 hover:text-white transition-colors">About</Link>
                <a href="mailto:support@aimteralabs.com" className="text-white/60 hover:text-white transition-colors">Contact Us</a>
                <Link to="/test4test/privacy" className="text-white/60 hover:text-white transition-colors">Privacy Policy</Link>
                <Link to="/test4test/account-deletion" className="text-white/60 hover:text-white transition-colors">Account Deletion</Link>
                <Link to="/terms" className="text-white/60 hover:text-white transition-colors">Terms of Service</Link>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-white/5 text-center flex flex-col items-center gap-4">
              <p className="text-white/40 text-xs">&copy; {new Date().getFullYear()} Aimtera Labs. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
};

export default Test4Test;
