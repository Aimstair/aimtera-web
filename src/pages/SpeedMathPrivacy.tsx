import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";

const SpeedMathPrivacy = () => {
  return (
    <PageTransition>
      <div className="min-h-screen font-sans" style={{ background: "hsl(var(--speedmath-bg))" }}>
        <Navbar />
        <div className="pt-32 pb-24">
          <div className="container mx-auto px-6 max-w-3xl">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border" style={{ borderColor: "hsl(var(--speedmath-accent) / 0.3)", background: "hsl(var(--speedmath-accent) / 0.1)" }}>
                <span className="text-xs font-bold" style={{ color: "hsl(var(--speedmath-accent))" }}>LEGAL</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">Privacy Policy</h1>
              <p className="text-sm mb-12 text-white/50">Effective Date: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
            </ScrollReveal>

            <div className="space-y-12 text-[15px] leading-relaxed text-white/70">
              <ScrollReveal delay={100}>
                <section>
                  <h2 className="text-2xl font-bold mb-4 text-white">1. Introduction</h2>
                  <p>Welcome to Speed Math ("we," "our," or "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application (the "App"). Please read this policy carefully. If you do not agree with the terms of this privacy policy, please do not access the App.</p>
                </section>
              </ScrollReveal>

              <ScrollReveal delay={150}>
                <section>
                  <h2 className="text-2xl font-bold mb-4 text-white">2. Information We Collect</h2>
                  <p className="mb-4">We may collect information about you in a variety of ways. The information we may collect via the App includes:</p>
                  <ul className="space-y-4">
                    <li className="flex flex-col gap-1">
                      <strong className="text-white">Personal Data:</strong>
                      <span>We do not collect personally identifiable information (like your name or email) unless you voluntarily provide it to us (e.g., by contacting customer support).</span>
                    </li>
                    <li className="flex flex-col gap-1">
                      <strong className="text-white">Game Data:</strong>
                      <span>We collect data related to your gameplay, such as your high scores, selected difficulty levels, and performance analytics to provide the core functions of the App. This data is typically stored locally on your device.</span>
                    </li>
                    <li className="flex flex-col gap-1">
                      <strong className="text-white">Usage Data:</strong>
                      <span>We may automatically collect certain information when you access the App, including your device type, operating system, and App usage metrics.</span>
                    </li>
                  </ul>
                </section>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <section>
                  <h2 className="text-2xl font-bold mb-4 text-white">3. How We Use Your Information</h2>
                  <p className="mb-4">Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the App to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Generate personal gameplay analytics and track your progress.</li>
                    <li>Improve the App's performance and develop new features (like adjusting difficulty algorithms).</li>
                    <li>Provide customer support and respond to your inquiries.</li>
                  </ul>
                </section>
              </ScrollReveal>

              <ScrollReveal delay={250}>
                <section>
                  <h2 className="text-2xl font-bold mb-4 text-white">4. Disclosure of Your Information</h2>
                  <p className="mb-4">We will not share, sell, or rent your personal information to third parties for their marketing purposes. We may share information we have collected about you in certain situations:</p>
                  <ul className="space-y-4">
                    <li className="flex flex-col gap-1">
                      <strong className="text-white">By Law or to Protect Rights:</strong>
                      <span>If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others.</span>
                    </li>
                    <li className="flex flex-col gap-1">
                      <strong className="text-white">Third-Party Service Providers:</strong>
                      <span>We may share your information with third parties that perform services for us or on our behalf, such as data analysis and hosting services.</span>
                    </li>
                  </ul>
                </section>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <section>
                  <h2 className="text-2xl font-bold mb-4 text-white">5. Data Storage and Security</h2>
                  <p>We use administrative, technical, and physical security measures to help protect your personal information. Most gameplay data, including your analytics and game-over states, are stored locally on your device. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.</p>
                </section>
              </ScrollReveal>

              <ScrollReveal delay={350}>
                <section>
                  <h2 className="text-2xl font-bold mb-4 text-white">6. Children's Privacy</h2>
                  <p>Our App does not knowingly solicit information from or market to children under the age of 13. If we learn that we have collected personal information from a child under age 13 without verification of parental consent, we will delete that information as quickly as possible.</p>
                </section>
              </ScrollReveal>

              <ScrollReveal delay={400}>
                <section>
                  <h2 className="text-2xl font-bold mb-4 text-white">7. Changes to This Privacy Policy</h2>
                  <p>We may update this Privacy Policy from time to time. We will notify you of any changes by updating the "Effective Date" of this Privacy Policy. You are encouraged to periodically review this Privacy Policy to stay informed of updates.</p>
                </section>
              </ScrollReveal>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-white/10 py-12" style={{ background: "hsl(var(--speedmath-surface))" }}>
          <div className="container mx-auto px-6 text-center">
             <Link to="/speedmath" className="text-white hover:text-white/80 transition-colors font-medium mb-6 inline-block">
               &larr; Back to Speed Math
             </Link>
            <p className="text-white/30 text-xs">&copy; {new Date().getFullYear()} Aimtera Labs. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
};

export default SpeedMathPrivacy;
