import { useState } from "react";
import GlobalNav from "@/components/site/GlobalNav";
import LocalNav from "@/components/site/LocalNav";
import SiteFooter from "@/components/site/SiteFooter";
import AppIcon from "@/components/site/AppIcon";
import PageTransition from "@/components/PageTransition";
import { BehindTheBuild, PillLink, SectionHeading, StoreGallery } from "@/components/site/Section";
import { getApp } from "@/content/apps";
import shotMaster from "@/assets/apps/speedspell-01.png";
import shotHear from "@/assets/apps/speedspell-02.png";
import shotLevels from "@/assets/apps/speedspell-03.png";
import shotModes from "@/assets/apps/speedspell-04.png";

const app = getApp("speedspell");
const PAPER = "#f2f1ec";
const RULE = "#d8d6cf";
const BLUE = "#c3d3e8";
const RED = "#e5b0ae";
const WORD = "EXTRUSIVE";

type Lifeline = "define" | "origin" | "sentence" | "listen";

const clues: Record<Lifeline, string> = {
  define: "Adjective: forced out at the surface; as, ___ rocks",
  origin: "From Latin extrudere, “to thrust out”",
  sentence: "Basalt is the most common ___ rock on Earth.",
  listen: "Playing pronunciation… /ɪkˈstruːsɪv/",
};

const modes = [
  { name: "Train", kicker: "01 — PRACTICE", title: "TRAIN", sub: "Your pace, four levels", chips: ["BEGINNER", "INTERMEDIATE", "EXPERT", "OLYMPIAD"], tint: BLUE, body: "Practice at your own pace across four difficulty levels. Every correct answer earns ELO." },
  { name: "Blitz", kicker: "02 — SPEED ROUND", title: "BLITZ", sub: "60 seconds on the clock", chips: ["60S", "NO PAUSE", "HIGH SCORE"], tint: "#f2d58a", body: "Spell as many words as you can before time runs out." },
  { name: "Daily Challenge", kicker: "03 — DAILY", title: "CHALLENGE", sub: "Streak: 0", chips: ["NEW EVERY DAY", "CURATED", "STREAKS"], tint: RED, body: "A fresh set of curated words every day. Come back daily to build your streak." },
  { name: "Multiplayer", kicker: "04 — PASS & PLAY", title: "MULTIPLAYER", sub: "Challenge a friend on this device", chips: ["2 PLAYERS", "ONE PHONE", "TURN BASED"], tint: BLUE, body: "Pass-and-play spelling battles. No accounts or internet needed." },
  { name: "Graveyard", kicker: "05 — THE GRAVEYARD", title: "REVIEW", sub: "22 words need practice", chips: ["MISSPELLED", "COME BACK", "CLEAR THEM"], tint: "#d9d6cc", body: "Words you get wrong come back to haunt you here. Clear the Graveyard to prove you have mastered them." },
  { name: "Custom Lists", kicker: "06 — CUSTOM", title: "YOUR LISTS", sub: "For school, SAT prep or study", chips: ["SAT PREP", "MEDICAL", "SCIENCE"], tint: "#bfe0c4", body: "Build your own spelling lists, or explore themed packs like SAT Prep, Medical and Science." },
];

const SpellingRound = () => {
  const [lifeline, setLifeline] = useState<Lifeline>("define");
  const [typed, setTyped] = useState("");
  const [result, setResult] = useState<{ ok: boolean; text: string } | null>(null);
  const [score, setScore] = useState(0);

  const press = (key: string) => {
    if (key === "⌫") {
      setTyped((t) => t.slice(0, -1));
      setResult(null);
      return;
    }
    if (key === "ENTER") {
      if (!typed) return;
      const ok = typed === WORD;
      setResult({ ok, text: ok ? "CORRECT · ELO goes up" : "NOT QUITE · sent to the Graveyard" });
      if (ok) setScore((s) => s + 1);
      else setTyped("");
      return;
    }
    setResult(null);
    setTyped((t) => (t.length < 12 ? t + key : t));
  };

  const display = typed.length > WORD.length ? typed : WORD.split("").map((_, i) => typed[i] ?? "_").join("");
  const rows = ["QWERTYUIOP".split(""), "ASDFGHJKL".split(""), ["ENTER", ..."ZXCVBNM".split(""), "⌫"]];

  return (
    <section id="play" className="mx-auto max-w-[1080px] scroll-mt-14 px-[22px] py-[140px]">
      <div className="flex flex-wrap items-center gap-16">
        <div className="flex-[1_1_360px]">
          <p className="text-[17px] font-semibold text-apple-secondary">01 · The spelling round</p>
          <h2 className="mt-2 text-[clamp(36px,5vw,52px)] font-bold leading-[1.07] tracking-[-0.025em]">Stuck? Use a lifeline.</h2>
          <p className="mt-3.5 text-[19px] leading-[1.47] text-apple-secondary">
            You hear the word and race the timer. If you're unsure, unlock its definition, its origin or an example sentence. Then
            type it out.
          </p>
          <p className="mt-[22px] text-[15px] text-apple-secondary">Try it: tap the lifelines, then spell the word with the keyboard.</p>
        </div>

        <div className="mx-auto flex-none">
          <div
            className="flex h-[720px] w-[340px] flex-col overflow-hidden rounded-[54px] border-[12px] border-[#111] font-archivo text-[#111] shadow-[0_30px_60px_rgba(0,0,0,0.16)] sm:w-[360px]"
            style={{ background: PAPER }}
          >
            <div className="h-[34px]" />
            <div className="flex items-center justify-between px-4 py-1.5">
              <span className="text-lg" aria-hidden="true">←</span>
              <span className="text-[11px] tracking-[0.14em] text-[#57575c]">TRAIN · OLYMPIAD</span>
              <span className="border-2 border-[#111] px-2 py-0.5 text-[13px] font-extrabold">{score}</span>
            </div>
            <div className="mx-4 mt-2 flex items-center gap-2.5">
              <div className="h-1.5 flex-1 bg-[#e2e0d8]">
                <div className="h-full w-2/5 bg-[#f2b33d]" />
              </div>
              <span className="text-sm font-extrabold">7s</span>
            </div>
            <div className="mx-3 mt-2.5 flex flex-wrap justify-center gap-1.5">
              {(["define", "origin", "sentence", "listen"] as Lifeline[]).map((key) => {
                const on = key === lifeline;
                return (
                  <button
                    key={key}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setLifeline(key)}
                    className="min-h-[34px] border px-2.5 py-2 text-[11px] font-extrabold tracking-[0.08em]"
                    style={on ? { background: BLUE, borderColor: "#111", color: "#111" } : { background: "#ffffff", borderColor: RULE, color: "#3a3a3c" }}
                  >
                    {key.toUpperCase()}
                  </button>
                );
              })}
            </div>
            <div className="mt-2.5 min-h-9 border-y border-[#e2e0d8] bg-white px-4 py-2.5 text-[13px] italic text-[#3a3a3c]" aria-live="polite">
              {clues[lifeline]}
            </div>
            <div className="flex flex-1 flex-col items-center justify-center gap-3">
              <div className="text-[34px] font-black tracking-[0.14em]" aria-live="polite">
                {display}
              </div>
              <div className="min-h-5 text-[13px] font-bold" style={{ color: result?.ok ? "#2f7a3a" : "#c0392b" }}>
                {result?.text}
              </div>
            </div>
            <div className="flex flex-col gap-1.5 bg-white px-1 pb-3.5 pt-2">
              {rows.map((row, r) => (
                <div key={r} className="flex justify-center gap-1">
                  {row.map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => press(key)}
                      aria-label={key === "⌫" ? "Delete" : key}
                      className={`h-[42px] rounded font-bold ${key === "ENTER" ? "w-16 bg-[#111] text-[11px] text-white" : key === "⌫" ? "w-11 text-[15px]" : "w-[29px] text-[15px]"}`}
                      style={key === "ENTER" ? undefined : { background: PAPER }}
                    >
                      {key}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const GameModes = () => {
  const [index, setIndex] = useState(0);
  const mode = modes[index];

  return (
    <section id="modes" className="scroll-mt-14 bg-apple-gray px-[22px] py-[140px]">
      <div className="mx-auto max-w-[1080px]">
        <SectionHeading eyebrow="02 · Six game modes" eyebrowColor="#6e6e73" title="Six ways to play." />
        <div className="mt-12 flex flex-wrap items-stretch gap-10">
          <div role="tablist" aria-label="Game modes" className="flex flex-[1_1_300px] flex-col">
            {modes.map((m, i) => {
              const on = i === index;
              return (
                <button
                  key={m.name}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-controls="mode-panel"
                  onClick={() => setIndex(i)}
                  className={`border-t border-apple-hairline px-1 py-[18px] text-left text-[21px] font-semibold transition-colors ${on ? "text-apple-ink" : "text-apple-tertiary hover:text-apple-ink"}`}
                >
                  <span className="inline-block w-7 text-[13px] text-apple-secondary">0{i + 1}</span>
                  {m.name}
                </button>
              );
            })}
          </div>
          <div id="mode-panel" role="tabpanel" className="min-h-[380px] flex-[2_1_460px] px-10 py-11 font-archivo text-[#111]" style={{ background: PAPER }} aria-live="polite">
            <div className="text-[11px] tracking-[0.16em] text-[#57575c]">{mode.kicker}</div>
            <div className="mt-2 text-[clamp(40px,5vw,52px)] font-black leading-[0.95]">{mode.title}</div>
            <div className="mt-2.5 text-[15px] text-[#57575c]">{mode.sub}</div>
            <div className="mt-7 flex flex-wrap gap-2 border-t pt-5" style={{ borderColor: RULE }}>
              {mode.chips.map((chip) => (
                <span key={chip} className="px-3 py-2 text-[13px] font-bold tracking-[0.04em]" style={{ background: mode.tint }}>
                  {chip}
                </span>
              ))}
            </div>
            <p className="mt-[22px] font-sans text-[17px] leading-normal text-apple-ink">{mode.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const steps = [
  { n: "01", name: "BEGINNER", detail: "3–5 letters · Anagram mode · 30s", bg: "#e8e6df", ink: "#57575c", height: 160, text: "#111" },
  { n: "02", name: "INTERMEDIATE", detail: "6–8 letters · QWERTY mode · 25s", bg: BLUE, ink: "#3d4a5c", height: 230, text: "#111" },
  { n: "03", name: "EXPERT", detail: "9–12 letters · Complex rules · 20s", bg: RED, ink: "#5c3d3c", height: 300, text: "#111" },
  { n: "04", name: "OLYMPIAD", detail: "Spelling bee competition words", bg: "#111111", ink: "#b5b4ae", height: 380, text: PAPER },
];

const LevelStaircase = () => (
  <section id="levels" className="mx-auto max-w-[1080px] scroll-mt-14 px-[22px] py-[140px]">
    <SectionHeading
      eyebrow="03 · Linguistic ELO"
      eyebrowColor="#6e6e73"
      title="Climb from Beginner to Olympiad."
      lead="Each level changes the rules. Longer words, a different keyboard and less time. Every correct answer adds to your ELO."
    />
    <div className="mt-14 grid grid-cols-2 items-end gap-2 font-archivo md:grid-cols-4">
      {steps.map((step) => (
        <div
          key={step.name}
          className="flex flex-col justify-end p-[18px]"
          style={{ background: step.bg, height: step.height, color: step.text }}
        >
          <div className="text-[11px] tracking-[0.14em]" style={{ color: step.ink }}>{step.n}</div>
          <div className="text-[clamp(16px,2vw,22px)] font-black">{step.name}</div>
          <div className="mt-1 text-xs" style={{ color: step.ink }}>{step.detail}</div>
        </div>
      ))}
    </div>
  </section>
);

const SpeedSpell = () => (
  <PageTransition>
    <div className="min-h-screen bg-white text-apple-ink">
      <GlobalNav />
      <LocalNav
        name={app.name}
        homeHref="/speedspell"
        icon={<AppIcon app={app} size={28} />}
        links={[
          { label: "Play", href: "#play" },
          { label: "Modes", href: "#modes" },
          { label: "Levels", href: "#levels" },
        ]}
        cta={{ label: "Get", href: app.storeUrl!, color: "#111111" }}
      />

      <section className="overflow-hidden bg-[#e4e6ea] px-[22px] pt-24">
        <div className="mx-auto flex max-w-[1080px] flex-wrap items-end gap-12">
          <div className="flex-[1_1_420px] pb-24">
            <AppIcon app={app} size={88} />
            <p className="mt-[18px] text-[21px] font-semibold text-[#57575c]">Speed Spell · Android · 4.8★ on Google Play</p>
            <h1 className="mt-2.5 text-[clamp(52px,8vw,96px)] font-bold leading-[1.02] tracking-[-0.035em]">
              Hear it.
              <br />
              Spell it.
            </h1>
            <p className="mt-[22px] max-w-[520px] text-[21px] leading-[1.4] text-[#57575c]">
              A spelling bee trainer with more than 2,000 words, six game modes and a competitive ELO rating. It works fully
              offline, with no account.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-7">
              <PillLink href={app.storeUrl!} background="#111111" external>
                Get it on Google Play
              </PillLink>
              <a href="#play" className="text-[17px] text-apple-link hover:underline">
                Spell a word ›
              </a>
            </div>
          </div>
          <div className="mx-auto h-[560px] w-[320px] flex-none rounded-t-[48px] border-[11px] border-b-0 border-[#111] pt-14 font-archivo text-[#111]" style={{ background: PAPER }}>
            <div className="px-6">
              <div className="text-[54px] font-black leading-[0.92] tracking-[-0.02em]">
                SPEED
                <br />
                SPELL.
              </div>
              <div className="mt-3.5 text-[10px] tracking-[0.18em] text-[#57575c]">—— SPELLING BEE TRAINING</div>
            </div>
            <div className="mt-[22px] grid grid-cols-3 border-y" style={{ borderColor: RULE }}>
              {[
                ["STREAK", "0"],
                ["ACCURACY", "81%"],
                ["ROUNDS", "57"],
              ].map(([label, value], i) => (
                <div key={label} className="px-4 py-3.5" style={i ? { borderLeft: `1px solid ${RULE}` } : undefined}>
                  <div className="text-[10px] tracking-[0.12em] text-[#57575c]">{label}</div>
                  <div className="text-[26px] font-extrabold">{value}</div>
                </div>
              ))}
            </div>
            <div className="mx-4 mt-[18px] px-[18px] py-4" style={{ background: BLUE }}>
              <div className="text-[10px] tracking-[0.14em] text-[#3d4a5c]">01 — PRACTICE</div>
              <div className="mt-1 flex justify-between text-[26px] font-extrabold">TRAIN <span>→</span></div>
              <div className="text-xs text-[#3d4a5c]">Earn ELO</div>
            </div>
            <div className="mx-4 mt-2.5 px-[18px] py-4" style={{ background: RED }}>
              <div className="text-[10px] tracking-[0.14em] text-[#5c3d3c]">02 — CUSTOM</div>
              <div className="mt-1 flex justify-between text-[26px] font-extrabold">GAME MODES <span>→</span></div>
              <div className="text-xs text-[#5c3d3c]">Daily Challenge, Graveyard and Custom</div>
            </div>
          </div>
        </div>
      </section>

      <SpellingRound />
      <GameModes />
      <LevelStaircase />

      <StoreGallery
        className="bg-[#e4e6ea]"
        height={480}
        images={[
          { src: shotMaster, alt: "Master your spelling" },
          { src: shotHear, alt: "Hear it. Spell it." },
          { src: shotLevels, alt: "Beginner to Olympiad" },
          { src: shotModes, alt: "Six unique game modes" },
        ]}
      />
      <BehindTheBuild appName="Speed Spell" stack="React Native · Expo · Expo Speech (text-to-speech) · Zustand · AdMob · Offline word bank">
        <p>
          Speed Spell shares Speed Math's design language and app architecture. Words are pronounced with on-device text-to-speech,
          and the 2,000+ word bank ships with the app, so it works fully offline. Progress, ELO, streaks and the Graveyard of missed
          words are stored locally, and no account is needed.
        </p>
      </BehindTheBuild>
      <SiteFooter />
    </div>
  </PageTransition>
);

export default SpeedSpell;
