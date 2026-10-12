import LegalLayout from "@/components/site/LegalLayout";

const ClipItPrivacy = () => (
  <LegalLayout
    appSlug="clipit"
    eyebrow="Clip It · Legal"
    title="Privacy Policy for Clip It"
    dateLine="Effective date: July 21, 2026"
  >
    <p>
      This Privacy Policy explains how Clip It ("the App," "we," "us") handles information when you use our application. We built Clip It around a simple principle: your captures stay on your device. This policy explains exactly what that means in practice.
    </p>

    <section>
      <h2>1. Information We Do Not Collect</h2>
      <p>Clip It does not require an account, login, or profile to use. We do not collect, transmit, or have any access to:</p>
      <ul>
        <li>Screenshots, screen recordings, or any media you capture within the App</li>
        <li>Text extracted via on-device search/OCR processing</li>
        <li>Your device's screen contents at any time</li>
        <li>Your location</li>
        <li>Your contacts, photos, or other apps' data</li>
      </ul>
      <p>All of the above stays exclusively on your device, in the App's local, sandboxed storage. We have no server that receives this content, because no such server exists — Clip It has no cloud backend.</p>
    </section>

    <section>
      <h2>2. Information We Do Collect</h2>
      <div>
        <div>
          <h3>2.1 In-App Purchases</h3>
          <p>If you subscribe to Clip It Premium, the transaction is processed entirely by <strong>Google Play Billing</strong>. We receive confirmation of your subscription status (active/inactive) so the App can unlock Premium features, but we do not receive or store your payment details (card numbers, billing address, etc.) — that information is handled directly by Google Play under <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google's Privacy Policy</a>.</p>
        </div>
        <div>
          <h3>2.2 Device Permissions</h3>
          <p>Clip It requests the following device permissions to function. Granting these permissions does not mean we collect the associated data remotely — these permissions enable <strong>on-device</strong> functionality only:</p>
          <div className="legal-table">
            <table>
              <thead>
                <tr>
                  <th>Permission</th>
                  <th>Why it's needed</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Display over other apps</td>
                  <td>Enables the floating capture bubble to appear system-wide</td>
                </tr>
                <tr>
                  <td>Screen Recording (MediaProjection)</td>
                  <td>Enables screenshot capture, manual recording, and the Flashback Buffer feature. This data is processed and stored locally only.</td>
                </tr>
                <tr>
                  <td>Storage</td>
                  <td>To save captured media and enable Export to your device's Gallery</td>
                </tr>
                <tr>
                  <td>Notifications</td>
                  <td>For local, on-device save-confirmation indicators</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h3>2.3 Diagnostic/Crash Data</h3>
          <p>Clip It does not include any analytics, advertising, or crash-reporting SDKs at this time. If this changes in a future update, this policy will be updated accordingly.</p>
        </div>
      </div>
    </section>

    <section>
      <h2>3. How We Use Information</h2>
      <p>The limited information described in Section 2 is used solely to: process and validate your subscription status, and (if applicable) diagnose and fix technical issues via crash reports. We do not use any information for advertising, and we do not sell, rent, or share information with third parties for marketing purposes.</p>
    </section>

    <section>
      <h2>4. Data Storage & Security</h2>
      <ul>
        <li>All captured media (screenshots, recordings, flashback clips) is stored in the App's sandboxed local storage on your device, inaccessible to other apps.</li>
        <li>Because this data never leaves your device, there is no server-side breach risk for your captured content — it is only as secure as your device itself. We recommend using your device's standard security features (screen lock, biometric authentication) as an additional safeguard.</li>
        <li>We do not maintain any backend database of user content, because none exists.</li>
      </ul>
    </section>

    <section>
      <h2>5. Data Retention & Deletion</h2>
      <ul>
        <li>You control all data retention. Deleted items move to Trash and are permanently removed after 30 days, or immediately if you choose to permanently delete them.</li>
        <li>Uninstalling the App removes all locally stored data, since nothing is retained on any server.</li>
        <li>Subscription status is retained by Google Play per their own retention policies; we do not separately retain historical purchase records beyond what's needed to validate your current entitlement.</li>
      </ul>
    </section>

    <section>
      <h2>6. Children's Privacy</h2>
      <p>Clip It is not directed at children under 13 (or the relevant age of digital consent in your jurisdiction), and we do not knowingly collect information from children. Because the App requires no account and processes no personal data on a server, there is inherently limited data-collection risk; however, if you believe a child has used the App inappropriately, please contact us at <a href="mailto:support@aimteralabs.com">support@aimteralabs.com</a>.</p>
    </section>

    <section>
      <h2>7. Your Rights</h2>
      <p>Because Clip It stores your content locally and doesn't maintain user accounts, most data-subject rights (access, deletion, portability) are already in your direct control via the App itself — you can view, export, or delete your content at any time without contacting us.</p>
      <p>For rights specifically related to your subscription data held by Google Play (e.g. under GDPR or CCPA), please refer to <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Play's Privacy Policy</a> or contact Google directly, since that data is processed by them, not us.</p>
      <p>If you have privacy questions not addressed here, contact us at <a href="mailto:support@aimteralabs.com">support@aimteralabs.com</a>.</p>
    </section>

    <section>
      <h2>8. International Users</h2>
      <p>Clip It is available globally via Google Play. Because the App does not transmit your captured content to any server, there is no cross-border data transfer of your media content to consider. Subscription/billing data transfer, if any, is governed by Google Play's own policies.</p>
    </section>

    <section>
      <h2>9. Changes to This Policy</h2>
      <p>We may update this Privacy Policy from time to time, such as if we add new features that change what data is processed (e.g. adding analytics, cloud sync, or new permissions in a future version). We will update the "Effective date" above when changes are made, and material changes will be communicated via an in-app notice where practical.</p>
    </section>

    <section>
      <h2>10. Contact Us</h2>
      <p>If you have questions about this Privacy Policy, contact us at:</p>
      <p><a href="mailto:support@aimteralabs.com">support@aimteralabs.com</a></p>
    </section>
  </LegalLayout>
);

export default ClipItPrivacy;
