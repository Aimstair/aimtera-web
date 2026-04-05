import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import CorporateFooter from "@/components/CorporateFooter";
import ParticleHero from "@/components/ParticleHero";
import StickyProductShowcase from "@/components/StickyProductShowcase";
import InteractiveTeamGrid from "@/components/InteractiveTeamGrid";
import ScrollReveal from "@/components/ScrollReveal";
import MagneticButton from "@/components/MagneticButton";
import PageTransition from "@/components/PageTransition";

const Index = () => {
  return (
    <PageTransition>
      <div className="min-h-screen" style={{ background: "hsl(var(--corp-dark-bg))" }}>
        <Navbar />

        {/* Hero */}
        <section className="relative pt-16 min-h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0" style={{ background: "hsl(var(--corp-dark-bg))" }}>
            <ParticleHero />
          </div>
          <div className="relative container mx-auto px-6 py-32 md:py-44 text-center">
            <ScrollReveal>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-[0.95] tracking-tight" style={{ color: "hsl(var(--corp-dark-foreground))" }}>
                We Build<br />What's Next.
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: "hsl(var(--corp-dark-muted))" }}>
                Pioneering AI fitness, proximity social networks, and decentralized gaming economies.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={400}>
              <MagneticButton
                as="a"
                href="#products"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-lg transition-opacity hover:opacity-90"
                style={{
                  background: "hsl(var(--corp-dark-foreground))",
                  color: "hsl(var(--corp-dark-bg))",
                }}
              >
                Explore Our Products <ArrowRight className="w-5 h-5" />
              </MagneticButton>
            </ScrollReveal>
          </div>
        </section>

        {/* Values */}
        <section id="about" className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center pointer-events-none overflow-hidden opacity-[0.03]">
            <div className="whitespace-nowrap animate-scroll-x text-[10rem] font-black tracking-tight" style={{ color: "hsl(var(--corp-dark-foreground))" }}>
              INNOVATION • PRIVACY • COMMUNITY • INNOVATION • PRIVACY • COMMUNITY •&nbsp;
              INNOVATION • PRIVACY • COMMUNITY • INNOVATION • PRIVACY • COMMUNITY •
            </div>
          </div>

          <div className="container mx-auto px-6 relative">
            <ScrollReveal>
              <h2 className="text-3xl md:text-5xl font-bold text-center mb-4" style={{ color: "hsl(var(--corp-dark-foreground))" }}>
                What Drives Us
              </h2>
              <p className="text-center mb-16 max-w-lg mx-auto" style={{ color: "hsl(var(--corp-dark-muted))" }}>
                Our core pillars guide every product decision we make.
              </p>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { icon: "👥", title: "Human-Centric Design", desc: "Every feature starts with empathy. We design for real people, not hypothetical users." },
                { icon: "✨", title: "Seamless Technology", desc: "The best tech is invisible. Our apps integrate into your life without friction." },
                { icon: "🛡️", title: "Privacy First", desc: "Your data is yours. We build trust through transparency and security by default." },
              ].map((v, i) => (
                <ScrollReveal key={v.title} delay={i * 150}>
                  <div
                    className="text-center p-8 rounded-2xl border transition-all duration-300 hover:border-[hsl(213_60%_40%_/_0.3)]"
                    style={{
                      background: "hsl(var(--corp-dark-elevated))",
                      borderColor: "hsl(0 0% 100% / 0.06)",
                    }}
                  >
                    <div className="text-3xl mb-5">{v.icon}</div>
                    <h3 className="text-lg font-semibold mb-3" style={{ color: "hsl(var(--corp-dark-foreground))" }}>
                      {v.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--corp-dark-muted))" }}>
                      {v.desc}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Products */}
        <div id="products">
          <StickyProductShowcase />
        </div>

        {/* Team */}
        <InteractiveTeamGrid />

        <CorporateFooter />
      </div>
    </PageTransition>
  );
};

export default Index;
