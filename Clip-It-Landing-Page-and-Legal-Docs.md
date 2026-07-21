# Clip It — Landing Page, Privacy Policy & Legal Documentation

**Note on legal content:** The Privacy Policy and Terms/Legal sections in this document are **drafts written to match Clip It's actual functionality** (local-only storage, on-device capture, in-app purchases). They are a strong starting point, not a substitute for review by a lawyer familiar with app-store compliance (Google Play's Data Safety requirements) and applicable privacy law (e.g. GDPR if you have EU users, CCPA if California users, COPPA if minors could plausibly use the app). Have these reviewed before publishing, especially before your Play Store listing goes live, since Play Console will hold you to what's declared here.

---

# Part 1 — Landing Page Specification

**URL:** `aimstair.app/clipit`

## 1. Purpose & Positioning

This page exists to do three things, in order: explain what Clip It does in under 5 seconds of scanning, show it rather than just describe it, and convert to a Play Store download. Everything on the page should serve one of those three goals — resist adding content that doesn't.

## 2. Layout Structure (top to bottom)

### 2.1 Navigation Bar
- Left: Clip It logo mark + wordmark (small, matches app branding — dark background, coral accent)
- Right: minimal links only — "Privacy," "Download" (anchor-links to the footer/CTA, not a separate page)
- Sticky/fixed on scroll, using the same glass/blur treatment as the app's own header, for brand consistency

### 2.2 Hero Section
- **Headline**: leads with the core mechanic, not a generic tagline — e.g. "Capture anything on your screen, without leaving what you're doing." (adjust wording to taste, but it should name the floating-bubble mechanic, since that's the actual differentiator)
- **Subheadline**: one sentence expanding on it — mentions the three actions (screenshot, record, flashback save) and the local-only/private angle
- **Primary CTA button**: "Get it on Google Play" — Play Store badge (official Google-provided badge asset, not a custom-styled button — Play Store branding guidelines require using their asset as-is)
- **Hero visual**: not a static screenshot — ideally a short looping video or GIF showing the actual chat-head bubble in action (tap → screenshot flash, double-tap → flashback save), since this is the hardest part of the product to explain in text and the easiest to show

### 2.3 "How It Works" Section
Three or four short steps, each with a small supporting visual (screenshot or short clip):
1. The floating bubble sits over any app
2. Tap for a screenshot, hold to record, double-tap to save the last X seconds
3. Everything lands in your private Vault, organized and searchable
4. Trim, crop, and export — share or save, watermark-free with Premium

### 2.4 Feature Highlights Grid
3–6 cards, icon + short label + one line, covering:
- **Flashback Buffer** — "Never miss a moment. Save the last 15–60 seconds instantly."
- **Fully Local** — "Nothing uploaded, nothing tracked. Your clips stay on your device."
- **Smart Search** — "Find any screenshot by what's written in it."
- **Custom Region Capture** — "Record just the part of the screen you need."
- **Built-in Editor** — "Trim, crop, and export without leaving the app."
- **Collections** — "Organize your clips into albums that make sense to you."

### 2.5 Screenshots/Visual Showcase
- A horizontal scroll or grid of real in-app screenshots (Vault grid, Editor, the bubble overlay) — reuse the actual dark/coral visual language so the landing page feels like a preview of the app, not a separate marketing skin
- Consider device-frame mockups (phone bezel) rather than bare screenshots, for context

### 2.6 Privacy/Trust Section
Given "fully local" is a real differentiator, give it dedicated space rather than burying it in the feature grid:
- Short, plain-language reassurance: no account required, no cloud upload, no ad tracking
- Link to the full Privacy Policy page here

### 2.7 Pricing / Free vs. Premium Section
- Simple two-column comparison (mirrors the in-app Subscription screen): Free vs. Premium, watermark-removal as the headline differentiator
- CTA here can repeat the Play Store badge, or link to "Download to see plans" if you don't want to commit to pricing details on the marketing page (pricing changes are easier to manage in-app/in-store than on a static page)

### 2.8 FAQ Section (optional but recommended)
Address likely pre-download hesitations directly:
- "Does this work in the background while I game?" 
- "Is my data ever uploaded anywhere?"
- "What permissions does the app need, and why?"
- "iOS or Android?"

### 2.9 Footer
- Secondary Play Store CTA (repeat the badge)
- Links: Privacy Policy, Terms of Service, Contact/Support email
- Copyright line

## 3. Components Needed

| Component | Notes |
|---|---|
| Official Google Play badge | Use Google's provided asset/SVG, do not recreate — required for compliance with Play Store branding guidelines |
| Sticky nav with blur/glass header | Reuses app's existing glass-header pattern |
| Feature card grid | Icon + label + one-liner, responsive grid |
| Device-frame image/video mockup | For hero and showcase sections |
| FAQ accordion | Collapsible Q&A, standard pattern |
| Footer with legal links | Must link to Privacy Policy at minimum |

## 4. Visual/Brand Direction

Reuse the app's own design system rather than inventing a separate marketing aesthetic:
- Dark near-black background (`#0A0A0C`)
- Coral accent (`#FF6B4A`) reserved for CTAs and highlights, not overused
- Same typography weight/style as the in-app UI (bold, geometric sans)
- The paperclip + record-dot logo mark should appear prominently near the top

## 5. CTA Strategy

- **Primary CTA (Play Store badge)** should appear at least twice: hero section and footer, ideally a third time after the pricing section
- Do not gate any content behind the CTA — every section should be visible without clicking anything, since the goal is to build enough confidence to leave the page and go to the Play Store
- No email capture / newsletter signup unless you have a specific use for it — an extra form is friction against the one action that matters (the download)

---

# Part 2 — Privacy Policy (Draft)

**URL:** `aimstair.app/clipit/privacy`
**Last updated:** [insert date at publish time]

> **Instructions before publishing:** Replace all bracketed placeholders (`[ ]`) with your actual details. This draft assumes: Android-first distribution via Google Play, in-app purchases via Google Play Billing, no analytics/crash-reporting SDK included by default (add a section if you do add one — see note at the bottom), and no account/login system. Adjust if any of these assumptions change.

---

## Privacy Policy for Clip It

**Effective date:** [insert date]

This Privacy Policy explains how Clip It ("the App," "we," "us") handles information when you use our application. We built Clip It around a simple principle: your captures stay on your device. This policy explains exactly what that means in practice.

### 1. Information We Do Not Collect

Clip It does not require an account, login, or profile to use. We do not collect, transmit, or have any access to:
- Screenshots, screen recordings, or any media you capture within the App
- Text extracted via on-device search/OCR processing
- Your device's screen contents at any time
- Your location
- Your contacts, photos, or other apps' data

All of the above stays exclusively on your device, in the App's local, sandboxed storage. We have no server that receives this content, because no such server exists — Clip It has no cloud backend.

### 2. Information We Do Collect

**2.1 In-App Purchases**
If you subscribe to Clip It Premium, the transaction is processed entirely by **Google Play Billing**. We receive confirmation of your subscription status (active/inactive) so the App can unlock Premium features, but we do not receive or store your payment details (card numbers, billing address, etc.) — that information is handled directly by Google Play under [Google's Privacy Policy](https://policies.google.com/privacy).

**2.2 Device Permissions**
Clip It requests the following device permissions to function. Granting these permissions does not mean we collect the associated data remotely — these permissions enable **on-device** functionality only:

| Permission | Why it's needed |
|---|---|
| Display over other apps | Enables the floating capture bubble to appear system-wide |
| Screen Recording (MediaProjection) | Enables screenshot capture, manual recording, and the Flashback Buffer feature. This data is processed and stored locally only. |
| [Storage, if applicable] | To save captured media and enable Export to your device's Gallery |
| [Notifications, if applicable] | For local, on-device save-confirmation indicators |

**2.3 Optional: Diagnostic/Crash Data**
[If you add a crash-reporting or analytics SDK — e.g. Firebase Crashlytics, Sentry — describe it here, including what's collected (typically: crash logs, device model, OS version, app version) and link to that provider's privacy policy. If you do not include any such SDK, you can state: "Clip It does not include any analytics, advertising, or crash-reporting SDKs at this time. If this changes in a future update, this policy will be updated accordingly."]

### 3. How We Use Information

The limited information described in Section 2 is used solely to: process and validate your subscription status, and (if applicable) diagnose and fix technical issues via crash reports. We do not use any information for advertising, and we do not sell, rent, or share information with third parties for marketing purposes.

### 4. Data Storage & Security

- All captured media (screenshots, recordings, flashback clips) is stored in the App's sandboxed local storage on your device, inaccessible to other apps.
- Because this data never leaves your device, there is no server-side breach risk for your captured content — it is only as secure as your device itself. We recommend using your device's standard security features (screen lock, biometric authentication) as an additional safeguard.
- We do not maintain any backend database of user content, because none exists.

### 5. Data Retention & Deletion

- You control all data retention. Deleted items move to Trash and are permanently removed after 30 days, or immediately if you choose to permanently delete them.
- Uninstalling the App removes all locally stored data, since nothing is retained on any server.
- Subscription status is retained by Google Play per their own retention policies; we do not separately retain historical purchase records beyond what's needed to validate your current entitlement.

### 6. Children's Privacy

Clip It is not directed at children under 13 (or the relevant age of digital consent in your jurisdiction), and we do not knowingly collect information from children. Because the App requires no account and processes no personal data on a server, there is inherently limited data-collection risk; however, if you believe a child has used the App inappropriately, please contact us at [support email].

### 7. Your Rights

Because Clip It stores your content locally and doesn't maintain user accounts, most data-subject rights (access, deletion, portability) are already in your direct control via the App itself — you can view, export, or delete your content at any time without contacting us.

For rights specifically related to your subscription data held by Google Play (e.g. under GDPR or CCPA), please refer to [Google Play's Privacy Policy](https://policies.google.com/privacy) or contact Google directly, since that data is processed by them, not us.

If you have privacy questions not addressed here, contact us at **[support email]**.

### 8. International Users

Clip It is available globally via Google Play. Because the App does not transmit your captured content to any server, there is no cross-border data transfer of your media content to consider. Subscription/billing data transfer, if any, is governed by Google Play's own policies.

### 9. Changes to This Policy

We may update this Privacy Policy from time to time, such as if we add new features that change what data is processed (e.g. adding analytics, cloud sync, or new permissions in a future version). We will update the "Effective date" above when changes are made, and material changes will be communicated via an in-app notice where practical.

### 10. Contact Us

If you have questions about this Privacy Policy, contact us at:
**[support email]**
**[optional: mailing address, if required by your jurisdiction]**

---

# Part 3 — Terms of Service & Legal Declarations

**Suggested URL:** `aimstair.app/clipit/terms`

## Terms of Service for Clip It

**Effective date:** [insert date]

### 1. Acceptance of Terms

By downloading, installing, or using Clip It ("the App"), you agree to these Terms of Service. If you do not agree, do not use the App.

### 2. License Grant

We grant you a limited, non-exclusive, non-transferable, revocable license to use the App on devices you own or control, solely for personal, non-commercial use, subject to these Terms.

### 3. User Responsibility for Lawful Use — Important

**Clip It gives you the ability to capture screenshots and record your device's screen, including content displayed within other applications.** You are solely responsible for ensuring your use of these capture features complies with applicable law, including:

- **Consent and wiretapping/recording laws**, which vary significantly by jurisdiction — some regions require the consent of all parties before recording audio/video of a conversation or communication (e.g. recording a video call). It is your responsibility to understand and comply with the laws applicable to you.
- **Copyright and intellectual property law** — capturing and redistributing copyrighted content (e.g. video, music, or other creative work displayed on your screen) may infringe the rights of the copyright holder. Clip It is a capture tool; it does not grant you any rights to redistribute captured content that you do not otherwise have the right to share.
- **Third-party platform terms of service** — other apps you use may have their own terms restricting screen recording or capture of their content (e.g. some streaming services). Using Clip It to capture such content may violate those third-party terms, which is between you and that service.

We are not responsible for how you use captured content, and we disclaim liability for any legal consequences arising from your use of the App's capture features in violation of applicable law or third-party terms.

### 4. Subscriptions & Payment

- Clip It offers optional "Premium" subscription features (e.g. watermark removal), billed and processed through **Google Play Billing**.
- Subscriptions auto-renew unless cancelled prior to the renewal date, per Google Play's standard subscription terms.
- Refunds are handled according to **Google Play's refund policy**, not directly by us — please refer to Google Play's support resources for refund requests.
- Prices are subject to change; you will be notified of any price changes in accordance with Google Play's requirements before they take effect for existing subscribers.

### 5. Intellectual Property

The App itself — including its design, logo, code, and branding — is owned by [Your Company/Developer Name] and protected by applicable intellectual property law. This license does not grant you any rights to our trademarks, logos, or brand assets beyond normal use of the App as intended.

You retain full ownership of the content you capture using the App (screenshots, recordings, etc.) — we claim no rights to your captured media.

### 6. Disclaimer of Warranties

The App is provided "as is" and "as available," without warranties of any kind, whether express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that the App will be uninterrupted, error-free, or that all features (e.g. Flashback Buffer, background capture) will function identically across all devices, given real hardware and OS-level variation in screen-capture APIs.

### 7. Limitation of Liability

To the maximum extent permitted by applicable law, [Your Company/Developer Name] shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of data, arising from your use of or inability to use the App.

### 8. Termination

We may suspend or terminate your access to the App if you violate these Terms. Since the App requires no account, "termination" primarily means restricting your ability to receive updates or access Premium features tied to your Google Play account, where applicable.

### 9. Governing Law

These Terms are governed by the laws of [insert jurisdiction — typically where your company is registered], without regard to conflict-of-law principles. [Have a lawyer confirm the appropriate jurisdiction for your situation.]

### 10. Changes to These Terms

We may update these Terms from time to time. Continued use of the App after changes take effect constitutes acceptance of the updated Terms.

### 11. Contact Us

Questions about these Terms can be directed to **[support email]**.

---

## Additional Legal Declaration: Data Safety Notes for Google Play Console

*(Not a public-facing legal page — this is a working reference for accurately completing Google Play Console's required "Data Safety" section when you submit your listing. Play Console requires this to be accurate and consistent with your actual Privacy Policy above.)*

| Data Safety Question | Suggested Answer (verify against actual implementation) |
|---|---|
| Does your app collect or share any of the required user data types? | Yes — limited to purchase history (via Google Play Billing) [and device/crash data if you add an SDK] |
| Is data encrypted in transit? | N/A for captured media (never transmitted). Yes, if applicable, for any billing/diagnostic data sent to Google Play or a crash-reporting SDK, per that provider's standard. |
| Can users request data deletion? | Yes — content is deletable directly in-app at any time; no server-side account data exists to separately request deletion of, beyond what Google Play itself retains for billing. |
| Is data shared with third parties? | Only with Google Play Billing for subscription processing [and your crash/analytics SDK provider, if applicable] — no data sold or shared for advertising purposes. |
| Does the app collect location, contacts, or photos data? | No, not collected or transmitted — media capture stays on-device. |

**Action item:** Confirm final answers with whoever implements analytics/crash reporting (if any), since the Data Safety form must exactly match what the app actually does — inaccurate declarations can result in Play Store policy violations.
