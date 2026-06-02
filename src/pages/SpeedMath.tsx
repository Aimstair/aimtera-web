import { Activity, Calculator, RotateCcw, Trophy, Volume2 } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ScrollReveal from "@/components/ScrollReveal";
import MagneticButton from "@/components/MagneticButton";
import PageTransition from "@/components/PageTransition";
import phoneMockup from "@/assets/speedmath-mockup.png";

const SpeedMath = () => {
  const features = [
    { icon: Calculator, title: "Intuitive Gameplay", description: "Quickly input your answers using our custom-built, responsive on-screen Numpad." },
    { icon: Trophy, title: "Multiple Difficulties", description: "Whether you are a beginner or a math whiz, pick your challenge using the Difficulty selection." },
    { icon: Activity, title: "Detailed Analytics", description: "Track your progress over time, monitor your high scores, and see how your mental math improves with our dedicated Analytics dashboard." },
    { icon: RotateCcw, title: "Never Give Up", description: "Made a mistake? Use the 'Second Chance' feature to keep your streak alive and push your score even higher." },
    { icon: Volume2, title: "Immersive Experience", description: "Enjoy satisfying audio feedback with custom sound effects for correct answers, wrong answers, and time-running-out beeps." },
  ];

  const steps = [
    { num: "01", title: "Choose Your Difficulty", desc: "Pick a level that matches your skills." },
    { num: "02", title: "Solve the Equations", desc: "Read the prompt and type the answer fast." },
    { num: "03", title: "Beat the High Score", desc: "Review your game-over stats and check your analytics to see your improvement." }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen font-sans" style={{ background: "hsl(var(--speedmath-bg))" }}>
        <Navbar />

        {/* Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="relative container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="z-10">
                <ScrollReveal>
                  <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border" style={{ borderColor: "hsl(var(--speedmath-accent) / 0.3)", background: "hsl(var(--speedmath-accent) / 0.1)" }}>
                    <span className="text-xs font-bold" style={{ color: "hsl(var(--speedmath-accent))" }}>NEW RELEASE</span>
                  </div>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                    Master Math at<br /><span className="text-gradient-speedmath">Lightning Speed!</span>
                  </h1>
                  <p className="text-white/60 text-lg mb-10 max-w-lg leading-relaxed">
                    Test your reflexes and sharpen your mind with Speed Math. Solve equations, beat the clock, and track your brain's performance.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <MagneticButton as="button" className="bg-white text-black font-semibold px-8 py-3.5 rounded-full hover:bg-white/90 transition-colors flex items-center justify-center gap-2">
                      Download on the App Store
                    </MagneticButton>
                    <MagneticButton as="button" className="bg-white/10 text-white font-semibold px-8 py-3.5 rounded-full hover:bg-white/20 transition-colors flex items-center justify-center gap-2 backdrop-blur-sm border border-white/20">
                      Get it on Google Play
                    </MagneticButton>
                  </div>
                </ScrollReveal>
              </div>
              <ScrollReveal delay={200} direction="right">
                <div className="hidden lg:flex justify-center relative">
                  <img src={phoneMockup} alt="Speed Math App Interface" className="w-80 animate-float drop-shadow-2xl relative z-10 rounded-[2.5rem] glow-speedmath" />
                  <div className="absolute inset-0 -z-10 flex items-center justify-center">
                    <div className="w-[30rem] h-[30rem] rounded-full blur-[120px] animate-pulse-glow" style={{ background: "hsl(var(--speedmath-accent) / 0.15)" }} />
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
              <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-16">Core Features</h2>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {features.map((f, i) => (
                <ScrollReveal key={f.title} delay={i * 100}>
                  <div className="p-8 rounded-3xl h-full border border-white/10 transition-all hover:border-white/30 hover:shadow-2xl hover:scale-[1.02]" style={{ background: "hsl(var(--speedmath-surface))", boxShadow: "0 0 40px -10px hsl(var(--speedmath-blue) / 0.05)" }}>
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: "hsl(var(--speedmath-accent) / 0.15)" }}>
                      <f.icon className="w-7 h-7" style={{ color: "hsl(var(--speedmath-accent))" }} />
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
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full blur-[150px] opacity-20" style={{ background: "hsl(var(--speedmath-blue))" }} />
          </div>
          <div className="container mx-auto px-6 max-w-5xl relative z-10">
            <ScrollReveal>
              <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-24">How It Works</h2>
            </ScrollReveal>
            
            <div className="relative">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 hidden md:block" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--speedmath-accent) / 0.4), transparent)" }} />
              <div className="grid md:grid-cols-3 gap-16 md:gap-8">
                {steps.map((step, i) => (
                  <ScrollReveal key={step.title} delay={i * 150}>
                    <div className="relative bg-black/60 p-8 rounded-3xl border border-white/10 text-center backdrop-blur-xl">
                      <div className="w-20 h-20 rounded-full mx-auto -mt-16 flex items-center justify-center text-2xl font-bold border-[6px]" style={{ borderColor: "hsl(var(--speedmath-surface))", background: "hsl(var(--speedmath-accent))", color: "hsl(var(--speedmath-bg))" }}>
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
        <footer className="border-t border-white/10 py-16" style={{ background: "hsl(var(--speedmath-surface))" }}>
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="text-2xl font-bold text-gradient-speedmath tracking-tighter">
                Speed Math
              </div>
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium">
                <Link to="/" className="text-white/60 hover:text-white transition-colors">Home</Link>
                <Link to="/" className="text-white/60 hover:text-white transition-colors">About</Link>
                <a href="mailto:support@aimteralabs.com" className="text-white/60 hover:text-white transition-colors">Contact Us</a>
                <Link to="/speedmath/privacy" className="text-white/60 hover:text-white transition-colors">Privacy Policy</Link>
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

export default SpeedMath;
