import LegalLayout from "@/components/site/LegalLayout";

const ClipItTerms = () => (
  <LegalLayout
    appSlug="clipit"
    eyebrow="Clip It · Legal"
    title="Terms of Service for Clip It"
    dateLine="Effective date: July 21, 2026"
  >
    <section>
      <h2>1. Acceptance of Terms</h2>
      <p>By downloading, installing, or using Clip It ("the App"), you agree to these Terms of Service. If you do not agree, do not use the App.</p>
    </section>

    <section>
      <h2>2. License Grant</h2>
      <p>We grant you a limited, non-exclusive, non-transferable, revocable license to use the App on devices you own or control, solely for personal, non-commercial use, subject to these Terms.</p>
    </section>

    <section>
      <h2>3. User Responsibility for Lawful Use — Important</h2>
      <p><strong>Clip It gives you the ability to capture screenshots and record your device's screen, including content displayed within other applications.</strong> You are solely responsible for ensuring your use of these capture features complies with applicable law, including:</p>
      <ul>
        <li><strong>Consent and wiretapping/recording laws</strong>, which vary significantly by jurisdiction — some regions require the consent of all parties before recording audio/video of a conversation or communication (e.g. recording a video call). It is your responsibility to understand and comply with the laws applicable to you.</li>
        <li><strong>Copyright and intellectual property law</strong> — capturing and redistributing copyrighted content (e.g. video, music, or other creative work displayed on your screen) may infringe the rights of the copyright holder. Clip It is a capture tool; it does not grant you any rights to redistribute captured content that you do not otherwise have the right to share.</li>
        <li><strong>Third-party platform terms of service</strong> — other apps you use may have their own terms restricting screen recording or capture of their content (e.g. some streaming services). Using Clip It to capture such content may violate those third-party terms, which is between you and that service.</li>
      </ul>
      <p>We are not responsible for how you use captured content, and we disclaim liability for any legal consequences arising from your use of the App's capture features in violation of applicable law or third-party terms.</p>
    </section>

    <section>
      <h2>4. Subscriptions & Payment</h2>
      <ul>
        <li>Clip It offers optional "Premium" subscription features (e.g. watermark removal), billed and processed through <strong>Google Play Billing</strong>.</li>
        <li>Subscriptions auto-renew unless cancelled prior to the renewal date, per Google Play's standard subscription terms.</li>
        <li>Refunds are handled according to <strong>Google Play's refund policy</strong>, not directly by us — please refer to Google Play's support resources for refund requests.</li>
        <li>Prices are subject to change; you will be notified of any price changes in accordance with Google Play's requirements before they take effect for existing subscribers.</li>
      </ul>
    </section>

    <section>
      <h2>5. Intellectual Property</h2>
      <p>The App itself — including its design, logo, code, and branding — is owned by Aimtera Labs and protected by applicable intellectual property law. This license does not grant you any rights to our trademarks, logos, or brand assets beyond normal use of the App as intended.</p>
      <p>You retain full ownership of the content you capture using the App (screenshots, recordings, etc.) — we claim no rights to your captured media.</p>
    </section>

    <section>
      <h2>6. Disclaimer of Warranties</h2>
      <p>The App is provided "as is" and "as available," without warranties of any kind, whether express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that the App will be uninterrupted, error-free, or that all features (e.g. Flashback Buffer, background capture) will function identically across all devices, given real hardware and OS-level variation in screen-capture APIs.</p>
    </section>

    <section>
      <h2>7. Limitation of Liability</h2>
      <p>To the maximum extent permitted by applicable law, Aimtera Labs shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of data, arising from your use of or inability to use the App.</p>
    </section>

    <section>
      <h2>8. Termination</h2>
      <p>We may suspend or terminate your access to the App if you violate these Terms. Since the App requires no account, "termination" primarily means restricting your ability to receive updates or access Premium features tied to your Google Play account, where applicable.</p>
    </section>

    <section>
      <h2>9. Governing Law</h2>
      <p>These Terms are governed by the laws of California, United States, without regard to conflict-of-law principles.</p>
    </section>

    <section>
      <h2>10. Changes to These Terms</h2>
      <p>We may update these Terms from time to time. Continued use of the App after changes take effect constitutes acceptance of the updated Terms.</p>
    </section>

    <section>
      <h2>11. Contact Us</h2>
      <p>Questions about these Terms can be directed to <a href="mailto:support@aimteralabs.com">support@aimteralabs.com</a>.</p>
    </section>
  </LegalLayout>
);

export default ClipItTerms;
