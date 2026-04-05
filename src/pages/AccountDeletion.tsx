import { useState } from "react";
import Navbar from "@/components/Navbar";
import ScrollReveal from "@/components/ScrollReveal";
import MagneticButton from "@/components/MagneticButton";
import PageTransition from "@/components/PageTransition";

const AccountDeletion = () => {
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen" style={{ background: "hsl(var(--corp-dark-bg))" }}>
        <Navbar />
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-6 max-w-3xl">
            <ScrollReveal>
              <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "hsl(var(--corp-dark-foreground))" }}>Account Deletion Request</h1>
              <p className="text-sm mb-12" style={{ color: "hsl(var(--corp-dark-muted))" }}>We're sorry to see you go. Submit a request below and we'll process your account deletion within 30 days.</p>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="space-y-6 text-sm leading-relaxed mb-12" style={{ color: "hsl(var(--corp-dark-muted))" }}>
                <section>
                  <h2 className="text-xl font-semibold mb-3" style={{ color: "hsl(var(--corp-dark-foreground))" }}>What Happens When You Delete Your Account</h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>All your personal information will be permanently deleted.</li>
                    <li>Your profile, messages, and activity history will be removed.</li>
                    <li>Any active trades or listings will be cancelled (RBMarket).</li>
                    <li>Your vouches and reputation data will be anonymized.</li>
                    <li>This action is <strong style={{ color: "hsl(var(--corp-dark-foreground))" }}>irreversible</strong>.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3" style={{ color: "hsl(var(--corp-dark-foreground))" }}>Processing Time</h2>
                  <p>Account deletion requests are processed within 30 days. You will receive a confirmation email once your data has been removed.</p>
                </section>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              {submitted ? (
                <div className="rounded-2xl p-8 text-center border" style={{ background: "hsl(var(--corp-dark-elevated))", borderColor: "hsl(var(--rbmarket-accent) / 0.2)" }}>
                  <div className="text-4xl mb-4">✓</div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: "hsl(var(--corp-dark-foreground))" }}>Request Submitted</h3>
                  <p style={{ color: "hsl(var(--corp-dark-muted))" }}>We've received your account deletion request. You will receive a confirmation email within 48 hours, and your data will be permanently deleted within 30 days.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "hsl(var(--corp-dark-foreground))" }}>Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="The email associated with your account"
                      className="w-full rounded-lg px-4 py-3 text-sm border focus:outline-none transition-colors"
                      style={{
                        background: "hsl(var(--corp-dark-elevated))",
                        borderColor: "hsl(0 0% 100% / 0.1)",
                        color: "hsl(var(--corp-dark-foreground))",
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "hsl(var(--corp-dark-foreground))" }}>Which service(s)?</label>
                    <div className="flex flex-wrap gap-3">
                      {["RBMarket", "Lume", "SymmetryAI", "All Services"].map((service) => (
                        <label key={service} className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: "hsl(var(--corp-dark-muted))" }}>
                          <input type="checkbox" className="rounded" />
                          {service}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "hsl(var(--corp-dark-foreground))" }}>Reason (optional)</label>
                    <textarea
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="Let us know why you're leaving (optional)"
                      rows={4}
                      className="w-full rounded-lg px-4 py-3 text-sm border focus:outline-none transition-colors resize-none"
                      style={{
                        background: "hsl(var(--corp-dark-elevated))",
                        borderColor: "hsl(0 0% 100% / 0.1)",
                        color: "hsl(var(--corp-dark-foreground))",
                      }}
                    />
                  </div>
                  <MagneticButton
                    as="button"
                    className="px-8 py-3 rounded-full font-semibold text-sm transition-opacity hover:opacity-90"
                    style={{
                      background: "hsl(var(--destructive))",
                      color: "hsl(var(--destructive-foreground))",
                    }}
                  >
                    Submit Deletion Request
                  </MagneticButton>
                </form>
              )}
            </ScrollReveal>
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

export default AccountDeletion;
