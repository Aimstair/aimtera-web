import LegalLayout from "@/components/site/LegalLayout";

const TermsOfService = () => (
  <LegalLayout
    eyebrow="Aimtera Labs · Legal"
    title="Terms of Service"
    dateLine="Last updated: April 5, 2026"
  >
    <section>
      <h2>1. Acceptance of Terms</h2>
      <p>By accessing or using any Aimtera Labs services, including RBMarket, Lume, and SymmetryAI (collectively, the "Services"), you agree to be bound by these Terms of Service. If you do not agree, please do not use our Services.</p>
    </section>

    <section>
      <h2>2. Use of Services</h2>
      <p>You agree to:</p>
      <ul>
        <li>Use the Services only for lawful purposes.</li>
        <li>Not engage in fraud, scamming, or deceptive practices.</li>
        <li>Not harass, threaten, or abuse other users.</li>
        <li>Not attempt to reverse-engineer, hack, or exploit our systems.</li>
        <li>Keep your account credentials secure and confidential.</li>
      </ul>
    </section>

    <section>
      <h2>3. User Accounts</h2>
      <p>You must be at least 13 years old to create an account. You are responsible for all activity that occurs under your account. We reserve the right to suspend or terminate accounts that violate these Terms.</p>
    </section>

    <section>
      <h2>4. Peer-to-Peer Transactions (RBMarket)</h2>
      <p>RBMarket facilitates peer-to-peer transactions between users. Aimtera Labs is not a party to any transaction and is not responsible for the actions or inactions of users. We do not guarantee the quality, safety, or legality of items traded.</p>
    </section>

    <section>
      <h2>5. User Content</h2>
      <p>You retain ownership of content you create. By posting content, you grant Aimtera Labs a non-exclusive, worldwide license to use, display, and distribute your content as necessary to operate the Services.</p>
    </section>

    <section>
      <h2>6. Intellectual Property</h2>
      <p>All trademarks, logos, and service marks displayed on the Services are the property of Aimtera Labs. You may not use them without our prior written consent.</p>
    </section>

    <section>
      <h2>7. Limitation of Liability</h2>
      <p>To the maximum extent permitted by law, Aimtera Labs shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of the Services.</p>
    </section>

    <section>
      <h2>8. Modifications</h2>
      <p>We reserve the right to modify these Terms at any time. We will notify users of material changes through the Services or via email.</p>
    </section>

    <section>
      <h2>9. Contact</h2>
      <p>For questions about these Terms, contact us at <a href="mailto:legal@aimteralabs.com">legal@aimteralabs.com</a>.</p>
    </section>
  </LegalLayout>
);

export default TermsOfService;
