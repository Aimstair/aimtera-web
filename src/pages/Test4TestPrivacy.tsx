import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";

const Test4TestPrivacy = () => {
  return (
    <PageTransition>
      <div className="min-h-screen font-sans" style={{ background: "hsl(var(--test4test-bg))" }}>
        <Navbar />
        <div className="pt-32 pb-24">
          <div className="container mx-auto px-6 max-w-3xl">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border" style={{ borderColor: "hsl(var(--test4test-accent) / 0.3)", background: "hsl(var(--test4test-accent) / 0.1)" }}>
                <span className="text-xs font-bold" style={{ color: "hsl(var(--test4test-accent))" }}>LEGAL</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">Privacy Policy for Test4Test</h1>
              <p className="text-sm mb-12 text-white/50">Last Updated: June 16, 2026</p>
            </ScrollReveal>

            <div className="space-y-12 text-[15px] leading-relaxed text-white/70">
              <ScrollReveal delay={100}>
                <section>
                  <h2 className="text-2xl font-bold mb-4 text-white">1. Introduction</h2>
                  <p>Welcome to Test4Test ("we," "our," or "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application (the "App") and the mutual app testing services provided within. Please read this Privacy Policy carefully.</p>
                </section>
              </ScrollReveal>

              <ScrollReveal delay={150}>
                <section>
                  <h2 className="text-2xl font-bold mb-4 text-white">2. Information We Collect</h2>
                  <p className="mb-4">We collect the following types of information when you use the App:</p>
                  <ul className="space-y-4">
                    <li className="flex flex-col gap-1">
                      <strong className="text-white">Account Information:</strong>
                      <span>When you sign in using your Google account, we collect your email address, name, and profile picture.</span>
                    </li>
                    <li className="flex flex-col gap-1">
                      <strong className="text-white">Device Information:</strong>
                      <span>We collect technical information such as your operating system, device model, and location (country level) to help developers ensure testing requirements are met.</span>
                    </li>
                    <li className="flex flex-col gap-1">
                      <strong className="text-white">User-Generated Content:</strong>
                      <span>App listings, URLs, daily testing screenshot proofs, bug reports, and reviews submitted within the App.</span>
                    </li>
                    <li className="flex flex-col gap-1">
                      <strong className="text-white">Usage Data:</strong>
                      <span>Information about your app usage, including your Karma score, Token balances, and testing streaks.</span>
                    </li>
                  </ul>
                </section>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <section>
                  <h2 className="text-2xl font-bold mb-4 text-white">3. How We Use Your Information</h2>
                  <p className="mb-4">We use the collected information for the following purposes:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>To provide, maintain, and improve the App's mutual testing community.</li>
                    <li>To manage user accounts and authenticate users securely.</li>
                    <li>To verify the completion of 14-day app tests through the review of daily screenshots.</li>
                    <li>To facilitate communication between app owners and testers using privacy-focused Google Groups.</li>
                    <li>To monitor App performance, prevent fraud, and enforce our terms of service.</li>
                  </ul>
                </section>
              </ScrollReveal>

              <ScrollReveal delay={250}>
                <section>
                  <h2 className="text-2xl font-bold mb-4 text-white">4. Data Sharing and Disclosure</h2>
                  <p className="mb-4">We do not sell your personal data. We only share information in the following ways:</p>
                  <ul className="space-y-4">
                    <li className="flex flex-col gap-1">
                      <strong className="text-white">With Other Users:</strong>
                      <span>As part of the mutual testing process, your name, profile picture, device info, and email (if you join a Google Group for closed testing) will be shared with the developer whose app you are testing.</span>
                    </li>
                    <li className="flex flex-col gap-1">
                      <strong className="text-white">Service Providers:</strong>
                      <span>We use third-party services (such as Supabase for database hosting and Google for authentication) that process data on our behalf.</span>
                    </li>
                    <li className="flex flex-col gap-1">
                      <strong className="text-white">Legal Requirements:</strong>
                      <span>We may disclose your information if required to do so by law or in response to valid requests by public authorities.</span>
                    </li>
                  </ul>
                </section>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <section>
                  <h2 className="text-2xl font-bold mb-4 text-white">5. Data Security</h2>
                  <p>We implement reasonable administrative, technical, and physical security measures to protect your personal information. However, no method of transmission over the internet or method of electronic storage is 100% secure.</p>
                </section>
              </ScrollReveal>

              <ScrollReveal delay={350}>
                <section>
                  <h2 className="text-2xl font-bold mb-4 text-white">6. Account Deletion and Data Retention</h2>
                  <p>You have the right to request the deletion of your account and associated data. You can delete your account and remove your app listings directly through the profile settings within the Test4Test App. Upon deletion, your personal data will be removed from our active databases, except where retention is required by law.</p>
                </section>
              </ScrollReveal>

              <ScrollReveal delay={400}>
                <section>
                  <h2 className="text-2xl font-bold mb-4 text-white">7. Children's Privacy</h2>
                  <p>Test4Test is a tool built for app developers and professional QA testers. The App is strictly intended for users who are 18 years of age or older. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such data, we will take steps to delete it immediately.</p>
                </section>
              </ScrollReveal>

              <ScrollReveal delay={450}>
                <section>
                  <h2 className="text-2xl font-bold mb-4 text-white">8. Changes to This Privacy Policy</h2>
                  <p>We may update this Privacy Policy from time to time. We will notify you of any changes by updating the "Last Updated" date at the top of this policy and, if the changes are significant, by providing an in-app notice.</p>
                </section>
              </ScrollReveal>

              <ScrollReveal delay={500}>
                <section>
                  <h2 className="text-2xl font-bold mb-4 text-white">9. Contact Us</h2>
                  <p>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at: <a href="mailto:support@aimteralabs.com" className="text-test4test-accent hover:underline">support@aimteralabs.com</a></p>
                </section>
              </ScrollReveal>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-white/10 py-12" style={{ background: "hsl(var(--test4test-surface))" }}>
          <div className="container mx-auto px-6 text-center">
             <Link to="/test4test" className="text-white hover:text-white/80 transition-colors font-medium mb-6 inline-block">
               &larr; Back to Test4Test
             </Link>
            <p className="text-white/30 text-xs">&copy; {new Date().getFullYear()} Aimtera Labs. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
};

export default Test4TestPrivacy;
