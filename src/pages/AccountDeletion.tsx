import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import LegalLayout from "@/components/site/LegalLayout";
import TurnstileWidget from "@/components/TurnstileWidget";
import {
  confirmAccountDeletionRequest,
  submitAccountDeletionRequest,
} from "@/lib/backendApi";

const serviceOptions = ["RBMarket", "Lume", "SymmetryAI", "All Services"] as const;

const AccountDeletion = () => {
  const [searchParams] = useSearchParams();
  const handledVerificationTokenRef = useRef<string | null>(null);
  const [email, setEmail] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [reason, setReason] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submissionState, setSubmissionState] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [verificationState, setVerificationState] = useState<
    "idle" | "verifying" | "verified" | "failed"
  >("idle");
  const [verificationMessage, setVerificationMessage] = useState("");

  useEffect(() => {
    const verifyToken = (searchParams.get("verify") || "").trim();
    if (!verifyToken || handledVerificationTokenRef.current === verifyToken) {
      return;
    }

    handledVerificationTokenRef.current = verifyToken;
    setVerificationState("verifying");
    setVerificationMessage("Verifying your account deletion request...");

    void confirmAccountDeletionRequest(verifyToken)
      .then((response) => {
        setVerificationState("verified");
        setVerificationMessage(response.message);
      })
      .catch((error) => {
        setVerificationState("failed");
        setVerificationMessage(
          error instanceof Error
            ? error.message
            : "Could not verify your request. Please submit a new one.",
        );
      });
  }, [searchParams]);

  const toggleService = (service: string) => {
    setErrorMessage("");
    if (submissionState === "error") {
      setSubmissionState("idle");
    }

    setSelectedServices((previous) => {
      if (service === "All Services") {
        return previous.includes("All Services") ? [] : ["All Services"];
      }

      const withoutAll = previous.filter((item) => item !== "All Services");
      if (withoutAll.includes(service)) {
        return withoutAll.filter((item) => item !== service);
      }

      return [...withoutAll, service];
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) return;

    if (selectedServices.length === 0) {
      setErrorMessage("Select at least one service.");
      setSubmissionState("error");
      return;
    }

    if (!captchaToken) {
      setErrorMessage("Please complete the challenge.");
      setSubmissionState("error");
      return;
    }

    setSubmissionState("submitting");
    setErrorMessage("");

    try {
      await submitAccountDeletionRequest({
        email,
        services: selectedServices,
        reason: reason.trim() || null,
        captchaToken,
      });
      setSubmitted(true);
    } catch (error) {
      setSubmissionState("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <LegalLayout eyebrow="Aimtera Labs · Account" title="Account Deletion Request">
      <p className="legal-lead">We're sorry to see you go. Submit a request below and we'll process your account deletion within 30 days.</p>

      {verificationState !== "idle" && (
        <div
          className={`rounded-xl border px-4 py-3 text-[15px] ${
            verificationState === "failed"
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-emerald-200 bg-emerald-50 text-emerald-800"
          }`}
          aria-live="polite"
        >
          {verificationMessage}
        </div>
      )}

      <section>
        <h2>What Happens When You Delete Your Account</h2>
        <ul>
          <li>All your personal information will be permanently deleted.</li>
          <li>Your profile, messages, and activity history will be removed.</li>
          <li>Any active trades or listings will be cancelled (RBMarket).</li>
          <li>Your vouches and reputation data will be anonymized.</li>
          <li>This action is <strong>irreversible</strong>.</li>
        </ul>
      </section>

      <section>
        <h2>Processing Time</h2>
        <p>Account deletion requests are processed within 30 days. You will receive a confirmation email once your data has been removed.</p>
      </section>

      {submitted ? (
        <div className="rounded-[18px] bg-apple-gray p-8 text-center">
          <div className="text-4xl text-emerald-600" aria-hidden="true">✓</div>
          <h3 className="!mt-3 text-xl font-bold text-apple-ink">Request Submitted</h3>
          <p className="mt-2">We've received your account deletion request. Please check your inbox and click the verification link to continue processing.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 rounded-[18px] bg-apple-gray p-6 sm:p-8">
          <div>
            <label htmlFor="deletion-email" className="mb-2 block text-[15px] font-semibold text-apple-ink">Email Address *</label>
            <input
              id="deletion-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="The email associated with your account"
              className="w-full rounded-xl border border-apple-hairline bg-white px-4 py-3 text-[17px] text-apple-ink placeholder:text-apple-tertiary focus:border-apple-blue focus:outline-none focus:ring-4 focus:ring-apple-blue/15"
            />
          </div>
          <fieldset>
            <legend className="mb-2 block text-[15px] font-semibold text-apple-ink">Which service(s)?</legend>
            <div className="flex flex-wrap gap-x-5 gap-y-3">
              {serviceOptions.map((service) => (
                <label key={service} className="flex cursor-pointer items-center gap-2 text-[15px] text-apple-body">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded accent-[#0071e3]"
                    checked={selectedServices.includes(service)}
                    onChange={() => toggleService(service)}
                  />
                  {service}
                </label>
              ))}
            </div>
          </fieldset>
          <div>
            <label htmlFor="deletion-reason" className="mb-2 block text-[15px] font-semibold text-apple-ink">Reason (optional)</label>
            <textarea
              id="deletion-reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Let us know why you're leaving (optional)"
              rows={4}
              className="w-full rounded-xl border border-apple-hairline bg-white px-4 py-3 text-[17px] text-apple-ink placeholder:text-apple-tertiary focus:border-apple-blue focus:outline-none focus:ring-4 focus:ring-apple-blue/15 resize-none"
            />
          </div>
          {submissionState === "error" && (
            <p className="text-[15px] text-red-600">{errorMessage}</p>
          )}
          <TurnstileWidget
            action="account_deletion_submit"
            onTokenChange={setCaptchaToken}
          />
          <button
            type="submit"
            disabled={submissionState === "submitting" || !captchaToken}
            className="min-h-11 rounded-full bg-[#d70015] px-6 text-[17px] text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {submissionState === "submitting" ? "Submitting..." : "Submit Deletion Request"}
          </button>
        </form>
      )}
    </LegalLayout>
  );
};

export default AccountDeletion;
