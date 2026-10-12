import LegalLayout from "@/components/site/LegalLayout";

const Test4TestPrivacy = () => (
  <LegalLayout
    appSlug="test4test"
    eyebrow="Test4Test · Legal"
    title="Privacy Policy for Test4Test"
    dateLine="Last Updated: June 16, 2026"
  >
    <section>
      <h2>1. Introduction</h2>
      <p>Welcome to Test4Test ("we," "our," or "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application (the "App") and the mutual app testing services provided within. Please read this Privacy Policy carefully.</p>
    </section>

    <section>
      <h2>2. Information We Collect</h2>
      <p>We collect the following types of information when you use the App:</p>
      <ul>
        <li>
          <strong>Account Information:</strong>
          <span>When you sign in using your Google account, we collect your email address, name, and profile picture.</span>
        </li>
        <li>
          <strong>Device Information:</strong>
          <span>We collect technical information such as your operating system, device model, and location (country level) to help developers ensure testing requirements are met.</span>
        </li>
        <li>
          <strong>User-Generated Content:</strong>
          <span>App listings, URLs, daily testing screenshot proofs, bug reports, and reviews submitted within the App.</span>
        </li>
        <li>
          <strong>Usage Data:</strong>
          <span>Information about your app usage, including your Karma score, Token balances, and testing streaks.</span>
        </li>
      </ul>
    </section>

    <section>
      <h2>3. How We Use Your Information</h2>
      <p>We use the collected information for the following purposes:</p>
      <ul>
        <li>To provide, maintain, and improve the App's mutual testing community.</li>
        <li>To manage user accounts and authenticate users securely.</li>
        <li>To verify the completion of 14-day app tests through the review of daily screenshots.</li>
        <li>To facilitate communication between app owners and testers using privacy-focused Google Groups.</li>
        <li>To monitor App performance, prevent fraud, and enforce our terms of service.</li>
      </ul>
    </section>

    <section>
      <h2>4. Data Sharing and Disclosure</h2>
      <p>We do not sell your personal data. We only share information in the following ways:</p>
      <ul>
        <li>
          <strong>With Other Users:</strong>
          <span>As part of the mutual testing process, your name, profile picture, device info, and email (if you join a Google Group for closed testing) will be shared with the developer whose app you are testing.</span>
        </li>
        <li>
          <strong>Service Providers:</strong>
          <span>We use third-party services (such as Supabase for database hosting and Google for authentication) that process data on our behalf.</span>
        </li>
        <li>
          <strong>Legal Requirements:</strong>
          <span>We may disclose your information if required to do so by law or in response to valid requests by public authorities.</span>
        </li>
      </ul>
    </section>

    <section>
      <h2>5. Data Security</h2>
      <p>We implement reasonable administrative, technical, and physical security measures to protect your personal information. However, no method of transmission over the internet or method of electronic storage is 100% secure.</p>
    </section>

    <section>
      <h2>6. Account Deletion and Data Retention</h2>
      <p>You have the right to request the deletion of your account and associated data. You can delete your account and remove your app listings directly through the profile settings within the Test4Test App. Upon deletion, your personal data will be removed from our active databases, except where retention is required by law.</p>
    </section>

    <section>
      <h2>7. Children's Privacy</h2>
      <p>Test4Test is a tool built for app developers and professional QA testers. The App is strictly intended for users who are 18 years of age or older. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such data, we will take steps to delete it immediately.</p>
    </section>

    <section>
      <h2>8. Changes to This Privacy Policy</h2>
      <p>We may update this Privacy Policy from time to time. We will notify you of any changes by updating the "Last Updated" date at the top of this policy and, if the changes are significant, by providing an in-app notice.</p>
    </section>

    <section>
      <h2>9. Contact Us</h2>
      <p>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at: <a href="mailto:support@aimteralabs.com">support@aimteralabs.com</a></p>
    </section>
  </LegalLayout>
);

export default Test4TestPrivacy;
