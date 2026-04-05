import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";

const TermsOfService = () => {
  return (
    <PageTransition>
      <div className="min-h-screen" style={{ background: "hsl(var(--corp-dark-bg))" }}>
        <Navbar />
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-6 max-w-3xl">
            <ScrollReveal>
              <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "hsl(var(--corp-dark-foreground))" }}>Terms of Service</h1>
              <p className="text-sm mb-12" style={{ color: "hsl(var(--corp-dark-muted))" }}>Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
            </ScrollReveal>

            <div className="space-y-8 text-sm leading-relaxed" style={{ color: "hsl(var(--corp-dark-muted))" }}>
              <ScrollReveal delay={100}>
                <section>
                  <h2 className="text-xl font-semibold mb-3" style={{ color: "hsl(var(--corp-dark-foreground))" }}>1. Acceptance of Terms</h2>
                  <p>By accessing or using any Aimtera Labs services, including RBMarket, Lume, and SymmetryAI (collectively, the "Services"), you agree to be bound by these Terms of Service. If you do not agree, please do not use our Services.</p>
                </section>
              </ScrollReveal>

              <ScrollReveal delay={150}>
                <section>
                  <h2 className="text-xl font-semibold mb-3" style={{ color: "hsl(var(--corp-dark-foreground))" }}>2. Use of Services</h2>
                  <p className="mb-2">You agree to:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Use the Services only for lawful purposes.</li>
                    <li>Not engage in fraud, scamming, or deceptive practices.</li>
                    <li>Not harass, threaten, or abuse other users.</li>
                    <li>Not attempt to reverse-engineer, hack, or exploit our systems.</li>
                    <li>Keep your account credentials secure and confidential.</li>
                  </ul>
                </section>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <section>
                  <h2 className="text-xl font-semibold mb-3" style={{ color: "hsl(var(--corp-dark-foreground))" }}>3. User Accounts</h2>
                  <p>You must be at least 13 years old to create an account. You are responsible for all activity that occurs under your account. We reserve the right to suspend or terminate accounts that violate these Terms.</p>
                </section>
              </ScrollReveal>

              <ScrollReveal delay={250}>
                <section>
                  <h2 className="text-xl font-semibold mb-3" style={{ color: "hsl(var(--corp-dark-foreground))" }}>4. Peer-to-Peer Transactions (RBMarket)</h2>
                  <p>RBMarket facilitates peer-to-peer transactions between users. Aimtera Labs is not a party to any transaction and is not responsible for the actions or inactions of users. We do not guarantee the quality, safety, or legality of items traded.</p>
                </section>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <section>
                  <h2 className="text-xl font-semibold mb-3" style={{ color: "hsl(var(--corp-dark-foreground))" }}>5. User Content</h2>
                  <p>You retain ownership of content you create. By posting content, you grant Aimtera Labs a non-exclusive, worldwide license to use, display, and distribute your content as necessary to operate the Services.</p>
                </section>
              </ScrollReveal>

              <ScrollReveal delay={350}>
                <section>
                  <h2 className="text-xl font-semibold mb-3" style={{ color: "hsl(var(--corp-dark-foreground))" }}>6. Intellectual Property</h2>
                  <p>All trademarks, logos, and service marks displayed on the Services are the property of Aimtera Labs. You may not use them without our prior written consent.</p>
                </section>
              </ScrollReveal>

              <ScrollReveal delay={400}>
                <section>
                  <h2 className="text-xl font-semibold mb-3" style={{ color: "hsl(var(--corp-dark-foreground))" }}>7. Limitation of Liability</h2>
                  <p>To the maximum extent permitted by law, Aimtera Labs shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of the Services.</p>
                </section>
              </ScrollReveal>

              <ScrollReveal delay={450}>
                <section>
                  <h2 className="text-xl font-semibold mb-3" style={{ color: "hsl(var(--corp-dark-foreground))" }}>8. Modifications</h2>
                  <p>We reserve the right to modify these Terms at any time. We will notify users of material changes through the Services or via email.</p>
                </section>
              </ScrollReveal>

              <ScrollReveal delay={500}>
                <section>
                  <h2 className="text-xl font-semibold mb-3" style={{ color: "hsl(var(--corp-dark-foreground))" }}>9. Contact</h2>
                  <p>For questions about these Terms, contact us at <a href="mailto:legal@aimteralabs.com" className="text-corporate-blue-light hover:underline">legal@aimteralabs.com</a>.</p>
                </section>
              </ScrollReveal>
            </div>
          </div>
        </div>

        <footer className="border-t py-8" style={{ borderColor: "hsl(0 0% 100% / 0.06)", background: "hsl(var(--corp-dark-bg))" }}>
          <div className="container mx-auto px-6 text-center">
            <p className="text-xs" style={{ color: "hsl(var(--corp-dark-muted) / 0.5)" }}>&copy; {new Date().getFullYear()} Aimtera Labs. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
};

export default TermsOfService;
