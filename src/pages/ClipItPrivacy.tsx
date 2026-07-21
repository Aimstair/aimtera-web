import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";

const ClipItPrivacy = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-[#0A0A0C] text-zinc-300">
        <Navbar />
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-6 max-w-3xl">
            <ScrollReveal>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Privacy Policy for Clip It</h1>
              <p className="text-sm mb-12 text-zinc-500">Effective date: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
            </ScrollReveal>

            <div className="space-y-8 text-sm leading-relaxed text-zinc-400">
              <ScrollReveal delay={100}>
                <p className="text-base text-zinc-300">
                  This Privacy Policy explains how Clip It ("the App," "we," "us") handles information when you use our application. We built Clip It around a simple principle: your captures stay on your device. This policy explains exactly what that means in practice.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={150}>
                <section>
                  <h2 className="text-xl font-semibold mb-3 text-white">1. Information We Do Not Collect</h2>
                  <p className="mb-2">Clip It does not require an account, login, or profile to use. We do not collect, transmit, or have any access to:</p>
                  <ul className="list-disc pl-6 space-y-1 mb-4">
                    <li>Screenshots, screen recordings, or any media you capture within the App</li>
                    <li>Text extracted via on-device search/OCR processing</li>
                    <li>Your device's screen contents at any time</li>
                    <li>Your location</li>
                    <li>Your contacts, photos, or other apps' data</li>
                  </ul>
                  <p>All of the above stays exclusively on your device, in the App's local, sandboxed storage. We have no server that receives this content, because no such server exists — Clip It has no cloud backend.</p>
                </section>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <section>
                  <h2 className="text-xl font-semibold mb-3 text-white">2. Information We Do Collect</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium text-zinc-200">2.1 In-App Purchases</h3>
                      <p>If you subscribe to Clip It Premium, the transaction is processed entirely by <strong>Google Play Billing</strong>. We receive confirmation of your subscription status (active/inactive) so the App can unlock Premium features, but we do not receive or store your payment details (card numbers, billing address, etc.) — that information is handled directly by Google Play under <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#FF6B4A] hover:underline">Google's Privacy Policy</a>.</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-zinc-200">2.2 Device Permissions</h3>
                      <p className="mb-2">Clip It requests the following device permissions to function. Granting these permissions does not mean we collect the associated data remotely — these permissions enable <strong>on-device</strong> functionality only:</p>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse mt-2 border border-zinc-800">
                          <thead>
                            <tr className="bg-zinc-900 border-b border-zinc-800">
                              <th className="p-3 font-medium text-zinc-200">Permission</th>
                              <th className="p-3 font-medium text-zinc-200">Why it's needed</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-zinc-800">
                              <td className="p-3">Display over other apps</td>
                              <td className="p-3">Enables the floating capture bubble to appear system-wide</td>
                            </tr>
                            <tr className="border-b border-zinc-800">
                              <td className="p-3">Screen Recording (MediaProjection)</td>
                              <td className="p-3">Enables screenshot capture, manual recording, and the Flashback Buffer feature. This data is processed and stored locally only.</td>
                            </tr>
                            <tr className="border-b border-zinc-800">
                              <td className="p-3">Storage</td>
                              <td className="p-3">To save captured media and enable Export to your device's Gallery</td>
                            </tr>
                            <tr>
                              <td className="p-3">Notifications</td>
                              <td className="p-3">For local, on-device save-confirmation indicators</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-zinc-200">2.3 Diagnostic/Crash Data</h3>
                      <p>Clip It does not include any analytics, advertising, or crash-reporting SDKs at this time. If this changes in a future update, this policy will be updated accordingly.</p>
                    </div>
                  </div>
                </section>
              </ScrollReveal>

              <ScrollReveal delay={250}>
                <section>
                  <h2 className="text-xl font-semibold mb-3 text-white">3. How We Use Information</h2>
                  <p>The limited information described in Section 2 is used solely to: process and validate your subscription status, and (if applicable) diagnose and fix technical issues via crash reports. We do not use any information for advertising, and we do not sell, rent, or share information with third parties for marketing purposes.</p>
                </section>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <section>
                  <h2 className="text-xl font-semibold mb-3 text-white">4. Data Storage & Security</h2>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>All captured media (screenshots, recordings, flashback clips) is stored in the App's sandboxed local storage on your device, inaccessible to other apps.</li>
                    <li>Because this data never leaves your device, there is no server-side breach risk for your captured content — it is only as secure as your device itself. We recommend using your device's standard security features (screen lock, biometric authentication) as an additional safeguard.</li>
                    <li>We do not maintain any backend database of user content, because none exists.</li>
                  </ul>
                </section>
              </ScrollReveal>

              <ScrollReveal delay={350}>
                <section>
                  <h2 className="text-xl font-semibold mb-3 text-white">5. Data Retention & Deletion</h2>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>You control all data retention. Deleted items move to Trash and are permanently removed after 30 days, or immediately if you choose to permanently delete them.</li>
                    <li>Uninstalling the App removes all locally stored data, since nothing is retained on any server.</li>
                    <li>Subscription status is retained by Google Play per their own retention policies; we do not separately retain historical purchase records beyond what's needed to validate your current entitlement.</li>
                  </ul>
                </section>
              </ScrollReveal>

              <ScrollReveal delay={400}>
                <section>
                  <h2 className="text-xl font-semibold mb-3 text-white">6. Children's Privacy</h2>
                  <p>Clip It is not directed at children under 13 (or the relevant age of digital consent in your jurisdiction), and we do not knowingly collect information from children. Because the App requires no account and processes no personal data on a server, there is inherently limited data-collection risk; however, if you believe a child has used the App inappropriately, please contact us at <a href="mailto:support@aimteralabs.com" className="text-[#FF6B4A] hover:underline">support@aimteralabs.com</a>.</p>
                </section>
              </ScrollReveal>

              <ScrollReveal delay={450}>
                <section>
                  <h2 className="text-xl font-semibold mb-3 text-white">7. Your Rights</h2>
                  <p className="mb-2">Because Clip It stores your content locally and doesn't maintain user accounts, most data-subject rights (access, deletion, portability) are already in your direct control via the App itself — you can view, export, or delete your content at any time without contacting us.</p>
                  <p className="mb-2">For rights specifically related to your subscription data held by Google Play (e.g. under GDPR or CCPA), please refer to <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#FF6B4A] hover:underline">Google Play's Privacy Policy</a> or contact Google directly, since that data is processed by them, not us.</p>
                  <p>If you have privacy questions not addressed here, contact us at <a href="mailto:support@aimteralabs.com" className="text-[#FF6B4A] hover:underline">support@aimteralabs.com</a>.</p>
                </section>
              </ScrollReveal>

              <ScrollReveal delay={500}>
                <section>
                  <h2 className="text-xl font-semibold mb-3 text-white">8. International Users</h2>
                  <p>Clip It is available globally via Google Play. Because the App does not transmit your captured content to any server, there is no cross-border data transfer of your media content to consider. Subscription/billing data transfer, if any, is governed by Google Play's own policies.</p>
                </section>
              </ScrollReveal>

              <ScrollReveal delay={550}>
                <section>
                  <h2 className="text-xl font-semibold mb-3 text-white">9. Changes to This Policy</h2>
                  <p>We may update this Privacy Policy from time to time, such as if we add new features that change what data is processed (e.g. adding analytics, cloud sync, or new permissions in a future version). We will update the "Effective date" above when changes are made, and material changes will be communicated via an in-app notice where practical.</p>
                </section>
              </ScrollReveal>
              
              <ScrollReveal delay={600}>
                <section>
                  <h2 className="text-xl font-semibold mb-3 text-white">10. Contact Us</h2>
                  <p>If you have questions about this Privacy Policy, contact us at:</p>
                  <p className="mt-2"><a href="mailto:support@aimteralabs.com" className="text-[#FF6B4A] hover:underline">support@aimteralabs.com</a></p>
                </section>
              </ScrollReveal>
            </div>
          </div>
        </div>

        <footer className="border-t border-white/10 py-8 bg-[#0A0A0C]">
          <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
            <p>&copy; {new Date().getFullYear()} Aimtera Labs. All rights reserved.</p>
            <div className="flex gap-4">
              <Link to="/clipit" className="hover:text-zinc-300 transition-colors">Back to Clip It</Link>
              <Link to="/clipit/terms" className="hover:text-zinc-300 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
};

export default ClipItPrivacy;
