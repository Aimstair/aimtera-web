import { useEffect, useRef, useState } from "react";
import GlobalNav from "@/components/site/GlobalNav";
import LocalNav from "@/components/site/LocalNav";
import SiteFooter from "@/components/site/SiteFooter";
import AppIcon from "@/components/site/AppIcon";
import PageTransition from "@/components/PageTransition";
import { BehindTheBuild, PillLink, StoreGallery } from "@/components/site/Section";
import { getApp } from "@/content/apps";
import shotToday from "@/assets/apps/test4test-today.webp";
import shotCatalog from "@/assets/apps/test4test-catalog.webp";
import shotBuild from "@/assets/apps/test4test-build.webp";
import shotVerify from "@/assets/apps/test4test-verify.webp";
import shotListing from "@/assets/apps/test4test-listing.webp";

const app = getApp("test4test");
const VIOLET = "#5b3fd6";
const NIGHT = "#14112e";
const initials = ["AK", "MR", "JL", "SP", "TN", "RB", "EC", "DV", "HY", "OM", "LG", "FQ", "ZW", "BI", "CU", "NA", "PX", "GE", "VS", "KT"];

const SlotBoard = () => {
  const [filled, setFilled] = useState(6);
  const timer = useRef<number>();

  useEffect(() => () => window.clearInterval(timer.current), []);

  const fill = () => {
    window.clearInterval(timer.current);
    if (filled >= 20) {
      setFilled(0);
      return;
    }
    timer.current = window.setInterval(() => {
      setFilled((n) => {
        if (n + 1 >= 20) window.clearInterval(timer.current);
        return Math.min(20, n + 1);
      });
    }, 140);
  };

  return (
    <div className="mx-auto mt-14 max-w-[620px]">
      <div className="grid grid-cols-10 gap-2.5" aria-hidden="true">
        {initials.map((label, i) => {
          const on = i < filled;
          return (
            <div
              key={label}
              className={`flex aspect-square items-center justify-center rounded-full text-[11px] font-bold transition-all duration-300 sm:text-xs ${
                on ? "scale-100 bg-gradient-to-br from-[#a5b4fc] to-[#c4b5fd] text-[#1e1b4b]" : "scale-90 border-[1.5px] border-dashed border-[#b9a8ff]/45 text-transparent"
              }`}
            >
              {on ? label : ""}
            </div>
          );
        })}
      </div>
      <div className="mt-[22px] flex flex-wrap items-center justify-center gap-5">
        <div className="text-[17px] font-semibold" aria-live="polite">
          {filled} of 20 testers joined
        </div>
        <button type="button" onClick={fill} className="min-h-11 rounded-full bg-[#7c5cff] px-5 text-[15px] font-semibold text-white transition-opacity hover:opacity-90">
          {filled >= 20 ? "Reset" : "Fill the slots"}
        </button>
      </div>
    </div>
  );
};

const loopSteps = [
  { short: "Test others", title: "Test other developers' apps", body: "Opt in to apps from the catalog, install them and use them for 14 days.", note: "Every completed day earns Tokens. Finishing the full cycle builds your Karma." },
  { short: "Earn Tokens", title: "Earn Tokens and Karma", body: "Tokens are the community currency. Karma is your reputation as a reliable tester.", note: "Testers with high Karma get priority access to new apps. Missing days costs Karma." },
  { short: "List your app", title: "List your own app", body: "Spend Tokens to put your unreleased app in the catalog. You can also skip the queue with a Pro plan.", note: "Pro plans also give your app boosted visibility." },
  { short: "Get published", title: "Fill 20 slots, then ship", body: "Real developers fill your 20 testing slots. After 14 verified days and a round of written feedback, you apply for production access.", note: "Then you can test the next developer's app, and the loop continues." },
];
const loopPositions = [
  { left: "50%", top: "0%" },
  { left: "100%", top: "50%" },
  { left: "50%", top: "100%" },
  { left: "0%", top: "50%" },
];

const Loop = () => {
  const [step, setStep] = useState(0);
  const current = loopSteps[step];

  return (
    <section id="loop" className="mx-auto max-w-[1080px] scroll-mt-14 px-[22px] py-[140px]">
      <p className="text-[17px] font-semibold" style={{ color: VIOLET }}>01 · The test-for-test loop</p>
      <h2 className="mt-2 text-[clamp(36px,5vw,56px)] font-bold leading-[1.07] tracking-[-0.025em]">
        Test apps. Earn Tokens.
        <br />
        Spend them on your own.
      </h2>
      <div className="mt-14 flex flex-wrap items-center gap-14">
        <div className="relative mx-auto aspect-square w-[340px] max-w-[calc(100%-100px)] flex-none">
          <div aria-hidden="true" className="absolute inset-0 rounded-full border-2 border-dashed border-[#d4ccff]" />
          <div className="absolute inset-[22%] flex flex-col items-center justify-center text-center">
            <div className="text-[13px] font-semibold" style={{ color: VIOLET }}>Step {step + 1} of 4</div>
            <div className="mt-1 text-[clamp(17px,2.4vw,22px)] font-bold leading-tight tracking-[-0.01em]">{current.title}</div>
          </div>
          {loopSteps.map((item, i) => {
            const on = i === step;
            return (
              <button
                key={item.short}
                type="button"
                aria-pressed={on}
                onClick={() => setStep(i)}
                className={`absolute flex h-[100px] w-[100px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-0.5 rounded-full p-2 transition-all ${
                  on ? "text-white shadow-[0_0_0_10px_rgba(91,63,214,0.15)]" : "border-[1.5px] border-[#d4ccff] bg-white text-apple-ink hover:border-[#5b3fd6]"
                }`}
                style={{ ...loopPositions[i], ...(on ? { background: VIOLET } : {}) }}
              >
                <span className="text-xs opacity-80">0{i + 1}</span>
                <span className="text-[15px] font-bold leading-tight">{item.short}</span>
              </button>
            );
          })}
        </div>
        <div className="flex-[1_1_380px]" aria-live="polite">
          <div className="text-[32px] font-bold tracking-[-0.02em]">{current.title}</div>
          <p className="mt-3 text-[21px] leading-[1.43] text-apple-body">{current.body}</p>
          <p className="mt-[18px] text-[17px] text-apple-secondary">{current.note}</p>
          <button
            type="button"
            onClick={() => setStep((step + 1) % loopSteps.length)}
            className="mt-6 min-h-11 rounded-full border border-apple-hairline bg-white px-5 text-[15px] hover:border-apple-ink"
          >
            Next step →
          </button>
        </div>
      </div>
    </section>
  );
};

type DayState = "ok" | "bad" | "wait" | "future";
const nextDayState: Record<DayState, DayState> = { ok: "bad", bad: "wait", wait: "ok", future: "future" };
const dayLook: Record<DayState, { className: string; mark: string; word: string }> = {
  ok: { className: "border border-[#bfe6cd] bg-[#e3f5ea] text-[#1f8f4e]", mark: "✓", word: "approved" },
  bad: { className: "border border-[#f6c4be] bg-[#fde8e6] text-[#c0392b]", mark: "✕", word: "rejected" },
  wait: { className: "border border-[#f3dd9b] bg-[#fff6dc] text-[#9a6b00]", mark: "?", word: "waiting for review" },
  future: { className: "cursor-default border border-dashed border-apple-hairline bg-apple-gray text-[#aeaeb2]", mark: "·", word: "not reached yet" },
};

const DailyProof = () => {
  const [days, setDays] = useState<DayState[]>(() => Array.from({ length: 14 }, (_, i) => (i < 9 ? "ok" : i === 9 ? "wait" : "future")));
  const count = (state: DayState) => days.filter((d) => d === state).length;
  const approved = count("ok");
  const rejected = count("bad");
  const pending = count("wait");
  const karma = Math.max(5, Math.min(100, 40 + approved * 6 - rejected * 12));

  return (
    <section id="proof" className="scroll-mt-14 bg-apple-gray px-[22px] py-[140px]">
      <div className="mx-auto max-w-[1080px]">
        <p className="text-[17px] font-semibold" style={{ color: VIOLET }}>02 · Verified 14-day retention</p>
        <h2 className="mt-2 text-[clamp(36px,5vw,56px)] font-bold leading-[1.07] tracking-[-0.025em]">A screenshot a day keeps testers honest.</h2>
        <p className="mt-3 max-w-[680px] text-[21px] leading-[1.4] text-apple-secondary">
          Testers upload daily proof that they're using your app. You approve or reject each one in Developer Studio. Click a day to
          review it.
        </p>

        <div className="mt-12 rounded-[28px] bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#a5b4fc] to-[#c4b5fd] font-bold text-[#312e81]">JD</span>
              <div>
                <div className="text-[17px] font-semibold">Tester · jdoe</div>
                <div className="text-sm text-apple-secondary">Testing your app · Day {approved + rejected + pending} of 14</div>
              </div>
            </div>
            <div className="text-[15px] text-apple-body" aria-live="polite">
              <strong className="text-[#1f8f4e]">{approved}</strong> approved · <strong className="text-[#c0392b]">{rejected}</strong> rejected · {pending} waiting
            </div>
          </div>
          <div className="mt-6 grid grid-cols-7 gap-2 md:grid-cols-[repeat(14,minmax(0,1fr))]">
            {days.map((state, i) => (
              <button
                key={i}
                type="button"
                disabled={state === "future"}
                aria-label={`Day ${i + 1}, ${dayLook[state].word}`}
                onClick={() => setDays((prev) => prev.map((d, j) => (j === i ? nextDayState[d] : d)))}
                className={`flex h-16 flex-col items-center justify-center gap-0.5 rounded-xl ${dayLook[state].className}`}
              >
                <span className="text-[11px] opacity-70">D{i + 1}</span>
                <span className="text-lg font-bold">{dayLook[state].mark}</span>
              </button>
            ))}
          </div>
          <div className="mt-[22px] h-2 overflow-hidden rounded bg-[#ececf0]">
            <div className="h-full bg-gradient-to-r from-[#7c5cff] to-[#5b3fd6] transition-all duration-300" style={{ width: `${karma}%` }} />
          </div>
          <div className="mt-2 flex justify-between text-[13px] text-apple-secondary">
            <span>Tester Karma</span>
            <span>{rejected > 0 ? "Rejected proofs lower Karma" : "On a clean streak"}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const MasterGroup = () => (
  <section id="group" className="mx-auto max-w-[1080px] scroll-mt-14 px-[22px] py-[140px]">
    <p className="text-[17px] font-semibold" style={{ color: VIOLET }}>03 · Privacy-first master group</p>
    <h2 className="mt-2 text-[clamp(36px,5vw,56px)] font-bold leading-[1.07] tracking-[-0.025em]">
      One email in Play Console.
      <br />
      Every tester gets in.
    </h2>
    <p className="mt-3 max-w-[680px] text-[21px] leading-[1.4] text-apple-secondary">
      Instead of typing 20 email addresses into your testing track, you add one Google Group. Verified testers get access, and
      their personal emails stay private.
    </p>
    <div className="mt-14 flex flex-wrap items-center justify-center gap-6">
      <div className="w-[220px] rounded-[18px] border border-apple-hairline p-5">
        <div className="text-[13px] text-apple-secondary">Play Console</div>
        <div className="mt-1 text-[17px] font-semibold">Closed testing track</div>
        <div className="mt-3 rounded-lg bg-apple-gray px-2.5 py-2 text-[13px]">1 email list</div>
      </div>
      <div aria-hidden="true" className="text-[28px] text-apple-tertiary">→</div>
      <div className="w-[260px] rounded-[18px] p-5 text-white shadow-[0_16px_40px_rgba(91,63,214,0.3)]" style={{ background: VIOLET }}>
        <div className="text-[13px] opacity-80">Test4Test master group</div>
        <div className="mt-1 text-[17px] font-semibold">One Google Group</div>
        <div className="mt-3 text-[13px] opacity-85">Members managed by Test4Test</div>
      </div>
      <div aria-hidden="true" className="text-[28px] text-apple-tertiary">→</div>
      <div className="grid w-[260px] grid-cols-5 gap-2" aria-label="20 verified testers" role="img">
        {initials.map((label, i) => (
          <span
            key={label}
            className="flex h-10 items-center justify-center rounded-full text-[11px] font-bold text-[#312e81]"
            style={{ background: ["#c7d2fe", "#ddd6fe", "#e0e7ff", "#ede9fe"][i % 4] }}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  </section>
);

const Test4Test = () => (
  <PageTransition>
    <div className="min-h-screen bg-white text-apple-ink">
      <GlobalNav />
      <LocalNav
        name={app.name}
        homeHref="/test4test"
        icon={<AppIcon app={app} size={28} />}
        links={[
          { label: "The loop", href: "#loop" },
          { label: "Daily proof", href: "#proof" },
          { label: "Master group", href: "#group" },
          { label: "Privacy", href: "/test4test/privacy" },
          { label: "Account deletion", href: "/test4test/account-deletion" },
        ]}
        cta={{ label: "Get", href: app.storeUrl!, color: VIOLET }}
      />

      <section className="px-[22px] pb-[120px] pt-24 text-center text-[#f5f5f7]" style={{ background: NIGHT }}>
        <AppIcon app={app} size={88} className="mx-auto" />
        <p className="mt-[18px] text-[21px] font-semibold text-[#b9a8ff]">Test4Test · Android · 4.8★ on Google Play</p>
        <h1 className="mx-auto mt-2.5 max-w-[960px] text-[clamp(44px,7.5vw,92px)] font-bold leading-[1.02] tracking-[-0.035em]">
          20 testers. 14 days.
          <br />
          Without begging friends.
        </h1>
        <p className="mx-auto mt-[22px] max-w-[660px] text-[21px] leading-[1.4] text-[#b8b4e0]">
          New Google Play developer accounts must run a closed test before going to production. Test4Test is a test-for-test
          community that fills those slots with real developers.
        </p>
        <div className="mt-8">
          <PillLink href={app.storeUrl!} background="#7c5cff" external>
            Get it on Google Play
          </PillLink>
        </div>
        <SlotBoard />
      </section>

      <section className="mx-auto max-w-[980px] px-[22px] pt-[120px]">
        <p className="text-[17px] font-semibold text-apple-secondary">The first month</p>
        <p className="mt-3 text-[clamp(30px,3.8vw,44px)] font-semibold leading-[1.2] tracking-[-0.02em] text-apple-tertiary">
          In its first month, <span className="text-apple-ink">500+ developers</span> joined Test4Test and listed{" "}
          <span className="text-apple-ink">278 apps.</span> <span style={{ color: VIOLET }}>252 of those apps</span> made it to
          production on Google Play.
        </p>
      </section>

      <Loop />
      <DailyProof />
      <MasterGroup />

      <StoreGallery
        className="bg-[#14112e]"
        dark
        title="Inside the app."
        height={480}
        images={[
          { src: shotToday, alt: "Today tab: UTC reset countdown and a 14-day testing contract" },
          { src: shotCatalog, alt: "Catalog tab: boosted apps with Token and Karma rewards" },
          { src: shotBuild, alt: "Build tab: your listed apps with locked testers and churn" },
          { src: shotVerify, alt: "Verify tab: reviewing a tester's daily proof screenshot" },
          { src: shotListing, alt: "App listing: tester capacity, requirements and feedback" },
        ]}
      />
      <BehindTheBuild appName="Test4Test" stack="React Native · Expo Router · Supabase · TanStack Query · Google Sign-In · RevenueCat">
        <p>
          Test4Test exists to get indie developers through Google Play's 20-tester, 14-day requirement. The app is React Native with Expo
          Router, backed by Supabase for accounts, listings, daily proofs and the Token and Karma ledger. Testers sign in with
          Google, and Pro plans are sold through RevenueCat. Within its first month it helped 252 apps reach production.
        </p>
      </BehindTheBuild>
      <SiteFooter />
    </div>
  </PageTransition>
);

export default Test4Test;
