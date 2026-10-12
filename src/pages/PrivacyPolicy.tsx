import { Link } from "react-router-dom";
import LegalLayout from "@/components/site/LegalLayout";

const PrivacyPolicy = () => (
  <LegalLayout
    eyebrow="Aimtera Labs · Legal"
    title="Privacy Policy"
    dateLine="Last updated: April 5, 2026"
  >
    <section>
      <h2>1. Introduction</h2>
      <p>Aimtera Labs ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our applications and services, including RBMarket, Lume, and SymmetryAI (collectively, the "Services").</p>
    </section>

    <section>
      <h2>2. Information We Collect</h2>
      <p>We may collect the following types of information:</p>
      <ul>
        <li><strong>Account Information:</strong> Email address, username, and profile details you provide during registration.</li>
        <li><strong>Usage Data:</strong> Information about how you interact with our Services, including pages visited, features used, and timestamps.</li>
        <li><strong>Device Information:</strong> Device type, operating system, browser type, and unique device identifiers.</li>
        <li><strong>Location Data:</strong> Approximate location based on IP address. For Lume, precise location data if you grant permission for proximity features.</li>
        <li><strong>User Content:</strong> Messages, reviews, vouches, and other content you create within our Services.</li>
      </ul>
    </section>

    <section>
      <h2>3. How We Use Your Information</h2>
      <ul>
        <li>To provide, maintain, and improve our Services.</li>
        <li>To process transactions and manage your account.</li>
        <li>To communicate with you about updates, promotions, and support.</li>
        <li>To ensure the safety and security of our platform.</li>
        <li>To comply with legal obligations.</li>
      </ul>
    </section>

    <section>
      <h2>4. Data Sharing</h2>
      <p>We do not sell your personal information. We may share your data with:</p>
      <ul>
        <li>Service providers who assist in operating our platform.</li>
        <li>Law enforcement when required by law.</li>
        <li>Other users as part of public profile features (e.g., vouches on RBMarket).</li>
      </ul>
    </section>

    <section>
      <h2>5. Data Security</h2>
      <p>We implement industry-standard security measures including encryption, secure storage, and regular security audits to protect your information.</p>
    </section>

    <section>
      <h2>6. Your Rights</h2>
      <p>You have the right to access, correct, delete, or export your personal data. To exercise these rights, contact us at <a href="mailto:privacy@aimteralabs.com">privacy@aimteralabs.com</a>.</p>
    </section>

    <section>
      <h2>7. Data Retention</h2>
      <p>We retain your data for as long as your account is active or as needed to provide Services. You can request deletion at any time through our <Link to="/account-deletion">Account Deletion</Link> page.</p>
    </section>

    <section>
      <h2>8. Children's Privacy</h2>
      <p>Our Services are not intended for children under 13. We do not knowingly collect personal information from children.</p>
    </section>

    <section>
      <h2>9. Contact Us</h2>
      <p>If you have questions about this Privacy Policy, contact us at:</p>
      <p><a href="mailto:privacy@aimteralabs.com">privacy@aimteralabs.com</a></p>
    </section>
  </LegalLayout>
);

export default PrivacyPolicy;
