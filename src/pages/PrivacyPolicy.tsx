import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";

const PrivacyPolicy = () => {
  return (
    <PageTransition>
      <div className="min-h-screen" style={{ background: "hsl(var(--corp-dark-bg))" }}>
        <Navbar />
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-6 max-w-3xl">
            <ScrollReveal>
              <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "hsl(var(--corp-dark-foreground))" }}>Privacy Policy</h1>
              <p className="text-sm mb-12" style={{ color: "hsl(var(--corp-dark-muted))" }}>Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
            </ScrollReveal>

            <div className="space-y-8 text-sm leading-relaxed" style={{ color: "hsl(var(--corp-dark-muted))" }}>
              <ScrollReveal delay={100}>
                <section>
                  <h2 className="text-xl font-semibold mb-3" style={{ color: "hsl(var(--corp-dark-foreground))" }}>1. Introduction</h2>
                  <p>Aimtera Labs ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our applications and services, including RBMarket, Lume, and SymmetryAI (collectively, the "Services").</p>
                </section>
              </ScrollReveal>

              <ScrollReveal delay={150}>
                <section>
                  <h2 className="text-xl font-semibold mb-3" style={{ color: "hsl(var(--corp-dark-foreground))" }}>2. Information We Collect</h2>
                  <p className="mb-2">We may collect the following types of information:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong style={{ color: "hsl(var(--corp-dark-foreground))" }}>Account Information:</strong> Email address, username, and profile details you provide during registration.</li>
                    <li><strong style={{ color: "hsl(var(--corp-dark-foreground))" }}>Usage Data:</strong> Information about how you interact with our Services, including pages visited, features used, and timestamps.</li>
                    <li><strong style={{ color: "hsl(var(--corp-dark-foreground))" }}>Device Information:</strong> Device type, operating system, browser type, and unique device identifiers.</li>
                    <li><strong style={{ color: "hsl(var(--corp-dark-foreground))" }}>Location Data:</strong> Approximate location based on IP address. For Lume, precise location data if you grant permission for proximity features.</li>
                    <li><strong style={{ color: "hsl(var(--corp-dark-foreground))" }}>User Content:</strong> Messages, reviews, vouches, and other content you create within our Services.</li>
                  </ul>
                </section>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <section>
                  <h2 className="text-xl font-semibold mb-3" style={{ color: "hsl(var(--corp-dark-foreground))" }}>3. How We Use Your Information</h2>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>To provide, maintain, and improve our Services.</li>
                    <li>To process transactions and manage your account.</li>
                    <li>To communicate with you about updates, promotions, and support.</li>
                    <li>To ensure the safety and security of our platform.</li>
                    <li>To comply with legal obligations.</li>
                  </ul>
                </section>
              </ScrollReveal>

              <ScrollReveal delay={250}>
                <section>
                  <h2 className="text-xl font-semibold mb-3" style={{ color: "hsl(var(--corp-dark-foreground))" }}>4. Data Sharing</h2>
                  <p>We do not sell your personal information. We may share your data with:</p>
                  <ul className="list-disc pl-6 space-y-1 mt-2">
                    <li>Service providers who assist in operating our platform.</li>
                    <li>Law enforcement when required by law.</li>
                    <li>Other users as part of public profile features (e.g., vouches on RBMarket).</li>
                  </ul>
                </section>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <section>
                  <h2 className="text-xl font-semibold mb-3" style={{ color: "hsl(var(--corp-dark-foreground))" }}>5. Data Security</h2>
                  <p>We implement industry-standard security measures including encryption, secure storage, and regular security audits to protect your information.</p>
                </section>
              </ScrollReveal>

              <ScrollReveal delay={350}>
                <section>
                  <h2 className="text-xl font-semibold mb-3" style={{ color: "hsl(var(--corp-dark-foreground))" }}>6. Your Rights</h2>
                  <p>You have the right to access, correct, delete, or export your personal data. To exercise these rights, contact us at <a href="mailto:privacy@aimteralabs.com" className="text-corporate-blue-light hover:underline">privacy@aimteralabs.com</a>.</p>
                </section>
              </ScrollReveal>

              <ScrollReveal delay={400}>
                <section>
                  <h2 className="text-xl font-semibold mb-3" style={{ color: "hsl(var(--corp-dark-foreground))" }}>7. Data Retention</h2>
                  <p>We retain your data for as long as your account is active or as needed to provide Services. You can request deletion at any time through our <Link to="/account-deletion" className="text-corporate-blue-light hover:underline">Account Deletion</Link> page.</p>
                </section>
              </ScrollReveal>

              <ScrollReveal delay={450}>
                <section>
                  <h2 className="text-xl font-semibold mb-3" style={{ color: "hsl(var(--corp-dark-foreground))" }}>8. Children's Privacy</h2>
                  <p>Our Services are not intended for children under 13. We do not knowingly collect personal information from children.</p>
                </section>
              </ScrollReveal>

              <ScrollReveal delay={500}>
                <section>
                  <h2 className="text-xl font-semibold mb-3" style={{ color: "hsl(var(--corp-dark-foreground))" }}>9. Contact Us</h2>
                  <p>If you have questions about this Privacy Policy, contact us at:</p>
                  <p className="mt-2"><a href="mailto:privacy@aimteralabs.com" className="text-corporate-blue-light hover:underline">privacy@aimteralabs.com</a></p>
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

export default PrivacyPolicy;
