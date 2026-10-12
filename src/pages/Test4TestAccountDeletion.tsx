import LegalLayout from "@/components/site/LegalLayout";

const Test4TestAccountDeletion = () => (
  <LegalLayout
    appSlug="test4test"
    eyebrow="Test4Test · Legal"
    title="Account Deletion"
    dateLine="Last Updated: June 16, 2026"
  >
    <section>
      <p>
        At Test4Test, we respect your privacy and give you full control over your personal data. 
        If you no longer wish to use Test4Test, you can easily delete your account and remove all 
        associated data from our active databases.
      </p>
    </section>

    <section>
      <h2>How to Delete Your Account</h2>
      <p>You can delete your account directly within the Test4Test mobile application:</p>
      <ol>
        <li>Open the Test4Test app on your device.</li>
        <li>Navigate to the <strong>Profile</strong> tab in the bottom navigation bar.</li>
        <li>Tap on the <strong>Settings</strong> gear icon in the top right corner.</li>
        <li>Scroll down to the bottom of the Settings menu and tap on <strong>Delete Account</strong>.</li>
        <li>Read the confirmation prompt and confirm your decision to permanently delete your account.</li>
      </ol>
    </section>

    <section>
      <h2>What Happens When You Delete Your Account?</h2>
      <ul>
        <li>Your profile information (name, email, profile picture) will be permanently deleted.</li>
        <li>All your app listings and testing requests will be removed from the platform.</li>
        <li>Your Karma score, Token balances, and testing streaks will be permanently erased and cannot be recovered.</li>
        <li>You will be removed from any active mutual testing cycles.</li>
        <li>Data required to be retained by law will be securely archived.</li>
      </ul>
    </section>

    <section>
      <h2>Need Help?</h2>
      <p>
        If you encounter any issues while trying to delete your account or have any questions about the 
        process, please contact our support team at <a href="mailto:support@aimteralabs.com">support@aimteralabs.com</a>. We will process your deletion request within 30 days.
      </p>
    </section>
  </LegalLayout>
);

export default Test4TestAccountDeletion;
