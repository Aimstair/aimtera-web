import { useEffect, useState } from "react";
import GlobalNav from "@/components/site/GlobalNav";
import LocalNav from "@/components/site/LocalNav";
import SiteFooter from "@/components/site/SiteFooter";
import AppIcon from "@/components/site/AppIcon";
import TurnstileWidget from "@/components/TurnstileWidget";
import PageTransition from "@/components/PageTransition";
import { BehindTheBuild } from "@/components/site/Section";
import { getApp } from "@/content/apps";
import heroPhone from "@/assets/symmetry-hero-phone.png";
import muscleChart from "@/assets/symmetry-muscle-chart.png";
import workoutImg from "@/assets/symmetry-workout.png";
import graphImg from "@/assets/symmetry-graph.png";
import { getWaitlistCount, submitWaitlist } from "@/lib/backendApi";

const app = getApp("symmetryai");
const CYAN = "#22d3ee";
const SLATE = "#0f172a";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface WaitlistFormProps {
  isSignedUp: boolean;
  onSignedUp: () => void;
}

const WaitlistForm = ({ isSignedUp, onSignedUp }: WaitlistFormProps) => {
  const [email, setEmail] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [submissionState, setSubmissionState] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSignedUp) return;

    const trimmedEmail = email.trim();
    if (!trimmedEmail) return;

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      setSubmissionState("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!captchaToken) {
      setSubmissionState("error");
      setErrorMessage("Please complete the challenge.");
      return;
    }

    setSubmissionState("submitting");
    setErrorMessage("");

    try {
      const result = await submitWaitlist({
        product: "symmetryai",
        email: trimmedEmail,
        captchaToken,
      });

      if (result.duplicate) {
        setSubmissionState("error");
        setErrorMessage("This email is already on the waitlist.");
        return;
      }

      setEmail("");
      setCaptchaToken(null);
      setSubmissionState("idle");
      onSignedUp();
    } catch (error) {
      setSubmissionState("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  };

  if (isSignedUp) {
    return <p className="text-[19px] font-semibold" style={{ color: CYAN }}>You're on the list. We'll be in touch.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-[520px] space-y-2">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="symmetry-email" className="sr-only">Email address</label>
        <input
          id="symmetry-email"
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (submissionState === "error") {
              setSubmissionState("idle");
              setErrorMessage("");
            }
          }}
          placeholder="Enter your email"
          disabled={submissionState === "submitting"}
          className="min-h-12 flex-1 rounded-full border border-white/15 bg-white/5 px-6 text-[17px] text-white placeholder:text-white/40 focus:border-[#22d3ee] focus:outline-none"
        />
        <button
          type="submit"
          disabled={submissionState === "submitting" || !captchaToken}
          className="min-h-12 whitespace-nowrap rounded-full px-7 text-[17px] font-semibold text-[#0f172a] transition-opacity hover:opacity-90 disabled:opacity-60"
          style={{ background: CYAN }}
        >
          {submissionState === "submitting" ? "Joining..." : "Join Waitlist"}
        </button>
      </div>
      <TurnstileWidget action="waitlist_submit" onTokenChange={setCaptchaToken} />
      <p aria-live="polite" className={`min-h-5 break-words text-sm ${submissionState === "error" ? "text-red-400" : "text-transparent"}`}>
        {submissionState === "error" ? errorMessage : ""}
      </p>
    </form>
  );
};

const features = [
  { eyebrow: "The scan", title: "AI muscle analysis", body: "Upload a photo and the AI maps your muscle development, highlighting overdeveloped and underdeveloped areas.", image: muscleChart, alt: "AI muscle analysis breakdown" },
  { eyebrow: "The plan", title: "Tailored workouts", body: "Scan results turn into targeted routines that focus on your weakest areas.", image: workoutImg, alt: "Generated workout routine" },
  { eyebrow: "The loop", title: "Track your balance", body: "Log workouts, rescan, and watch your symmetry improve over time.", image: graphImg, alt: "Muscle symmetry progress graph" },
];

const SymmetryAI = () => {
  const [isWaitlistSignedUp, setIsWaitlistSignedUp] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);
  const [isCountLoading, setIsCountLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchWaitlistCount = async () => {
      setIsCountLoading(true);
      try {
        const result = await getWaitlistCount("symmetryai");
        if (isMounted) setWaitlistCount(result.count);
      } catch {
        if (isMounted) setWaitlistCount(null);
      } finally {
        if (isMounted) setIsCountLoading(false);
      }
    };

    fetchWaitlistCount();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleWaitlistSignedUp = () => {
    setIsWaitlistSignedUp((previous) => {
      if (!previous) {
        setWaitlistCount((current) => (typeof current === "number" ? current + 1 : current));
      }
      return true;
    });
  };

  const waitlistCountText = isCountLoading
    ? "Loading live waitlist count..."
    : typeof waitlistCount === "number"
      ? `${waitlistCount.toLocaleString()} ${waitlistCount === 1 ? "person" : "people"} currently on the waitlist.`
      : "Live waitlist count is temporarily unavailable.";

  return (
    <PageTransition>
      <div className="min-h-screen bg-white text-apple-ink">
        <GlobalNav dark />
        <LocalNav
          dark
          name={app.name}
          homeHref="/symmetryai"
          icon={<AppIcon app={app} size={28} />}
          links={[
            { label: "How it works", href: "#features" },
            { label: "Waitlist", href: "#waitlist" },
          ]}
        />

        <section className="overflow-hidden px-[22px] pt-24 text-center text-[#f5f5f7]" style={{ background: SLATE }}>
          <p className="text-[21px] font-semibold" style={{ color: CYAN }}>SymmetryAI · Mobile · In development</p>
          <h1 className="mx-auto mt-2.5 max-w-[900px] text-[clamp(52px,8vw,96px)] font-bold leading-[1.02] tracking-[-0.035em]">Your body, decoded.</h1>
          <p className="mx-auto mt-[22px] max-w-[620px] text-[21px] leading-[1.4] text-[#94a3b8]">
            AI-guided muscle balance and training insights. Scan, train the weak side, and rescan to watch the gap close.
          </p>
          <div className="mt-8">
            <a href="#waitlist" className="inline-flex min-h-11 items-center rounded-full px-6 text-[17px] font-semibold text-[#0f172a]" style={{ background: CYAN }}>
              Join the waitlist
            </a>
          </div>
          <img src={heroPhone} alt="SymmetryAI concept on a phone" className="mx-auto mt-14 h-[420px] w-auto max-w-full object-cover object-top" />
        </section>

        <section id="features" className="mx-auto max-w-[1080px] scroll-mt-14 px-[22px] py-[140px]">
          <h2 className="text-[clamp(36px,5vw,56px)] font-bold leading-[1.07] tracking-[-0.025em]">Scan. Train. Rescan.</h2>
          <div className="mt-14 flex flex-col gap-20">
            {features.map((feature, i) => (
              <div key={feature.title} className={`flex flex-wrap items-center gap-12 ${i % 2 ? "flex-row-reverse" : ""}`}>
                <div className="flex-[1_1_340px]">
                  <p className="text-[17px] font-semibold text-[#0891b2]">0{i + 1} · {feature.eyebrow}</p>
                  <h3 className="mt-2 text-[36px] font-bold leading-[1.1] tracking-[-0.02em]">{feature.title}</h3>
                  <p className="mt-3 text-[19px] leading-[1.47] text-apple-secondary">{feature.body}</p>
                </div>
                <div className="flex-[1_1_380px] overflow-hidden rounded-[28px]" style={{ background: SLATE }}>
                  <img src={feature.image} alt={feature.alt} loading="lazy" className="block h-[320px] w-full object-cover" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="waitlist" className="scroll-mt-14 px-3 pb-3">
          <div className="rounded-[28px] px-6 py-24 text-center text-[#f5f5f7]" style={{ background: SLATE }}>
            <h2 className="text-[clamp(36px,5vw,56px)] font-bold leading-[1.07] tracking-[-0.025em]">Be first to try it.</h2>
            <p className="mx-auto mt-3 max-w-[520px] text-[19px] text-[#94a3b8]" aria-live="polite">{waitlistCountText}</p>
            <div className="mt-8">
              <WaitlistForm isSignedUp={isWaitlistSignedUp} onSignedUp={handleWaitlistSignedUp} />
            </div>
          </div>
        </section>

        <BehindTheBuild appName="SymmetryAI" stack="React Native · Expo Router · Expo Camera · Supabase · NativeWind · Gifted Charts">
          <p>
            SymmetryAI is a React Native app in active development. The camera captures progress photos, Supabase stores scans and
            workout history, and charts show how muscle balance changes between scans.
          </p>
        </BehindTheBuild>
        <SiteFooter />
      </div>
    </PageTransition>
  );
};

export default SymmetryAI;
