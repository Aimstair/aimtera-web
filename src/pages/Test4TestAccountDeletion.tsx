import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";

const Test4TestAccountDeletion = () => {
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">Account Deletion</h1>
              <p className="text-sm mb-12 text-white/50">Last Updated: June 16, 2026</p>
            </ScrollReveal>

            <div className="space-y-12 text-[15px] leading-relaxed text-white/70">
              <ScrollReveal delay={100}>
                <section>
                  <p className="mb-4">
                    At Test4Test, we respect your privacy and give you full control over your personal data. 
                    If you no longer wish to use Test4Test, you can easily delete your account and remove all 
                    associated data from our active databases.
                  </p>
                </section>
              </ScrollReveal>

              <ScrollReveal delay={150}>
                <section>
                  <h2 className="text-2xl font-bold mb-4 text-white">How to Delete Your Account</h2>
                  <p className="mb-4">You can delete your account directly within the Test4Test mobile application:</p>
                  <ol className="list-decimal pl-6 space-y-2 mb-4">
                    <li>Open the Test4Test app on your device.</li>
                    <li>Navigate to the <strong>Profile</strong> tab in the bottom navigation bar.</li>
                    <li>Tap on the <strong>Settings</strong> gear icon in the top right corner.</li>
                    <li>Scroll down to the bottom of the Settings menu and tap on <strong>Delete Account</strong>.</li>
                    <li>Read the confirmation prompt and confirm your decision to permanently delete your account.</li>
                  </ol>
                </section>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <section>
                  <h2 className="text-2xl font-bold mb-4 text-white">What Happens When You Delete Your Account?</h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Your profile information (name, email, profile picture) will be permanently deleted.</li>
                    <li>All your app listings and testing requests will be removed from the platform.</li>
                    <li>Your Karma score, Token balances, and testing streaks will be permanently erased and cannot be recovered.</li>
                    <li>You will be removed from any active mutual testing cycles.</li>
                    <li>Data required to be retained by law will be securely archived.</li>
                  </ul>
                </section>
              </ScrollReveal>

              <ScrollReveal delay={250}>
                <section>
                  <h2 className="text-2xl font-bold mb-4 text-white">Need Help?</h2>
                  <p>
                    If you encounter any issues while trying to delete your account or have any questions about the 
                    process, please contact our support team at <a href="mailto:support@aimteralabs.com" className="text-test4test-accent hover:underline">support@aimteralabs.com</a>. We will process your deletion request within 30 days.
                  </p>
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

export default Test4TestAccountDeletion;
