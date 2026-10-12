import { useEffect, useRef, useState } from "react";
import GlobalNav from "@/components/site/GlobalNav";
import LocalNav from "@/components/site/LocalNav";
import SiteFooter from "@/components/site/SiteFooter";
import AppIcon from "@/components/site/AppIcon";
import Segmented from "@/components/site/Segmented";
import PageTransition from "@/components/PageTransition";
import { BehindTheBuild, PillLink, SectionHeading, StoreGallery } from "@/components/site/Section";
import { getApp } from "@/content/apps";
import shotTrain from "@/assets/apps/speedmath-01.png";
import shotLevels from "@/assets/apps/speedmath-02.png";
import shotMemorize from "@/assets/apps/speedmath-03.png";
import shotHighScore from "@/assets/apps/speedmath-04.png";
import shotAnalytics from "@/assets/apps/speedmath-05.png";

const app = getApp("speedmath");
const PAPER = "#f2f1ec";
const RULE = "#d8d6cf";
const BLUE = "#c3d3e8";
const RED = "#e5b0ae";

const levels = [
  { name: "Beginner", count: 5, digits: "1 digit", speed: "1.0s", gap: 1.0, sample: ["7", "3", "9", "2", "5"], size: 22 },
  { name: "Intermediate", count: 8, digits: "2–3 digits", speed: "0.8s", gap: 0.8, sample: ["48", "213", "67", "905", "31", "742", "86", "159"], size: 18 },
  { name: "Expert", count: 10, digits: "3–4 digits", speed: "0.6s", gap: 0.6, sample: ["482", "7310", "659", "2041", "873", "5126", "390", "8457", "614", "2903"], size: 14 },
  { name: "Olympiad", count: 10, digits: "4–5 digits", speed: "0.4s", gap: 0.4, sample: ["64669", "1827", "90413", "5532", "71208", "3394", "48851", "2076", "93140", "6618"], size: 12 },
];

const HomeScreens = () => (
  <div className="mx-auto mt-16 flex flex-wrap justify-center gap-9 text-left font-archivo text-[#111]">
    <div className="relative flex h-[460px] w-[300px] flex-col items-center justify-center rounded-t-[46px] border-[11px] border-b-0 border-[#111]" style={{ background: PAPER }}>
      <span aria-hidden="true" className="absolute left-10 top-[90px] rotate-[-18deg] text-[44px] text-[#b5b4ae]">+</span>
      <span aria-hidden="true" className="absolute right-[50px] top-[140px] rotate-[14deg] text-[40px] text-[#b5b4ae]">–</span>
      <span aria-hidden="true" className="absolute bottom-[70px] left-[60px] rotate-[20deg] text-[44px] text-[#b5b4ae]">×</span>
      <div className="text-center text-[44px] font-black leading-[0.95] tracking-[-0.02em]">
        SPEED
        <br />
        <span className="text-[#a9c0de]">MATH</span>
      </div>
      <div className="mt-3.5 h-0.5 w-10 bg-[#111]" />
      <div className="mt-3 text-[10px] tracking-[0.2em] text-[#57575c]">SHARPEN YOUR MIND</div>
    </div>
    <div className="h-[460px] w-[300px] rounded-t-[46px] border-[11px] border-b-0 border-[#111] pt-11" style={{ background: PAPER }}>
      <div className="px-[22px]">
        <div className="text-[40px] font-black leading-[0.95] tracking-[-0.02em]">
          SPEED
          <br />
          MATH.
        </div>
        <div className="mt-2.5 text-[9px] tracking-[0.18em] text-[#57575c]">—— MENTAL ARITHMETIC TRAINING</div>
      </div>
      <div className="mt-[18px] grid grid-cols-3 border-y" style={{ borderColor: RULE }}>
        {[
          ["ELO", "982"],
          ["ACCURACY", "28%"],
          ["ROUNDS", "18"],
        ].map(([label, value], i) => (
          <div key={label} className="px-3.5 py-3" style={i ? { borderLeft: `1px solid ${RULE}` } : undefined}>
            <div className="text-[9px] tracking-[0.12em] text-[#57575c]">{label}</div>
            <div className="text-[22px] font-extrabold">{value}</div>
          </div>
        ))}
      </div>
      <div className="mx-4 mt-4 px-4 py-3.5" style={{ background: BLUE }}>
        <div className="text-[9px] tracking-[0.14em] text-[#3d4a5c]">01 — PRACTICE</div>
        <div className="mt-1 flex justify-between text-[22px] font-extrabold">TRAIN <span>→</span></div>
        <div className="text-[11px] text-[#3d4a5c]">No score impact</div>
      </div>
      <div className="mx-4 mt-2.5 px-4 py-3.5" style={{ background: RED }}>
        <div className="text-[9px] tracking-[0.14em] text-[#5c3d3c]">02 — RANKED</div>
        <div className="mt-1 flex justify-between text-[22px] font-extrabold">COMPETE <span>→</span></div>
        <div className="text-[11px] text-[#5c3d3c]">ELO changes</div>
      </div>
    </div>
  </div>
);

const LevelTimeline = () => {
  const [index, setIndex] = useState(0);
  const level = levels[index];

  return (
    <section id="levels" className="mx-auto max-w-[980px] scroll-mt-14 px-[22px] py-[140px]">
      <SectionHeading
        eyebrow="01 · Four difficulty tiers"
        eyebrowColor="#6e6e73"
        title="From one digit to Olympiad speed."
        lead="Each tier changes three things: how many numbers flash, how big they are, and how fast they appear."
      />
      <Segmented
        className="mt-11"
        ariaLabel="Difficulty"
        value={index}
        onChange={setIndex}
        options={levels.map((l, i) => ({ value: i, label: l.name }))}
      />
      <div className="mt-9 text-2xl font-semibold tracking-[-0.01em]" aria-live="polite">
        {level.count} numbers · {level.digits} · one every {level.speed}
      </div>
      <div className="relative mt-7 h-[120px] border-b-2 border-apple-ink font-archivo" aria-hidden="true">
        {level.sample.map((value, i) => {
          const left = `${4 + ((i * level.gap) / 6.4) * 92}%`;
          return (
            <div key={`${index}-${i}`}>
              <div
                className="absolute bottom-3.5 -translate-x-1/2 whitespace-nowrap border px-2.5 py-2 font-extrabold transition-all duration-500"
                style={{ left, background: PAPER, borderColor: RULE, fontSize: level.size }}
              >
                {value}
              </div>
              <div className="absolute -bottom-[7px] h-3 w-0.5 bg-apple-ink transition-all duration-500" style={{ left }} />
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex justify-between text-[13px] text-apple-secondary">
        <span>0s</span>
        <span>2s</span>
        <span>4s</span>
        <span>6.4s</span>
      </div>
    </section>
  );
};

type Phase = "idle" | "flash" | "answer" | "result";

const PlayableRound = () => {
  const [phase, setPhase] = useState<Phase>("idle");
  const [sequence, setSequence] = useState<number[]>([]);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [typed, setTyped] = useState("");
  const [correct, setCorrect] = useState(false);
  const [streak, setStreak] = useState(0);
  const interval = useRef<number>();
  const blink = useRef<number>();

  useEffect(
    () => () => {
      window.clearInterval(interval.current);
      window.clearTimeout(blink.current);
    },
    [],
  );

  const start = () => {
    window.clearInterval(interval.current);
    const next = Array.from({ length: 5 }, () => 1 + Math.floor(Math.random() * 9));
    setSequence(next);
    setIndex(0);
    setVisible(true);
    setTyped("");
    setPhase("flash");
    let i = 0;
    interval.current = window.setInterval(() => {
      i += 1;
      if (i >= next.length) {
        window.clearInterval(interval.current);
        setPhase("answer");
        return;
      }
      setVisible(false);
      window.clearTimeout(blink.current);
      blink.current = window.setTimeout(() => {
        setIndex(i);
        setVisible(true);
      }, 120);
    }, 1000);
  };

  const total = sequence.reduce((a, b) => a + b, 0);

  const press = (key: string) => {
    if (key === "CLR") return setTyped("");
    if (key === "ENT") {
      if (!typed) return;
      const ok = Number(typed) === total;
      setCorrect(ok);
      setStreak((s) => (ok ? s + 1 : 0));
      setPhase("result");
      return;
    }
    setTyped((t) => (t.length < 3 ? t + key : t));
  };

  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "CLR", "0", "ENT"];

  return (
    <section id="play" className="scroll-mt-14 bg-apple-gray px-[22px] py-[140px]">
      <div className="mx-auto flex max-w-[1080px] flex-wrap items-center gap-16">
        <div className="flex-[1_1_360px]">
          <p className="text-[17px] font-semibold text-apple-secondary">02 · Memorize and calculate</p>
          <h2 className="mt-2 text-[clamp(36px,5vw,52px)] font-bold leading-[1.07] tracking-[-0.025em]">Try a Beginner round.</h2>
          <p className="mt-3.5 text-[19px] leading-[1.47] text-apple-secondary">
            Five one-digit numbers, one per second. Keep a running total in your head, then type it on the keypad.
          </p>
          <p className="mt-[22px] text-[15px] text-apple-secondary">
            This is a working copy of the app's game loop: the flash, the hidden total and the keypad.
          </p>
        </div>

        <div className="mx-auto flex-none">
          <div
            className="flex h-[700px] w-[340px] flex-col overflow-hidden rounded-[52px] border-[12px] border-[#111] font-archivo text-[#111] shadow-[0_30px_60px_rgba(0,0,0,0.16)] transition-colors"
            style={{ background: phase === "flash" ? "#f0e1e5" : PAPER }}
          >
            <div className="h-[30px]" />
            <div className="flex justify-between px-[18px] py-1.5 text-[10px] tracking-[0.14em] text-[#57575c]">
              <span>← TRAIN · BEGINNER</span>
              <span>STREAK: {streak}</span>
            </div>

            {phase === "idle" && (
              <div className="flex flex-1 flex-col items-center justify-center gap-[22px] px-7 text-center">
                <div className="text-[44px] font-black leading-[0.95]">READY?</div>
                <div className="text-[13px] text-[#57575c]">5 numbers · 1 digit · 1.0s flicker</div>
                <button type="button" onClick={start} className="min-h-12 bg-[#111] px-9 py-4 text-[15px] font-extrabold tracking-[0.1em] text-white">
                  START →
                </button>
              </div>
            )}

            {phase === "flash" && (
              <div className="flex flex-1 flex-col items-center justify-center">
                <div className="text-[120px] font-black transition-opacity duration-100" style={{ opacity: visible ? 1 : 0 }} aria-live="assertive">
                  {sequence[index]}
                </div>
                <div className="mt-5 flex gap-1.5" aria-hidden="true">
                  {sequence.map((_, i) => (
                    <span key={i} className="h-1 w-[22px]" style={{ background: i <= index ? "#111" : RULE }} />
                  ))}
                </div>
              </div>
            )}

            {phase === "answer" && (
              <div className="flex flex-1 flex-col">
                <div className="flex flex-1 items-center justify-center text-[72px] font-black" aria-live="polite">
                  {typed || "?"}
                </div>
                <div className="grid grid-cols-3 gap-2 border-t p-3.5" style={{ background: PAPER, borderColor: RULE }}>
                  {keys.map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => press(key)}
                      aria-label={key === "CLR" ? "Clear" : key === "ENT" ? "Enter" : key}
                      className={`h-[52px] border border-[#111] font-extrabold ${key.length > 1 ? "text-xs" : "text-[22px]"}`}
                      style={{ background: key === "CLR" ? "#111" : key === "ENT" ? BLUE : "#ffffff", color: key === "CLR" ? "#ffffff" : "#111" }}
                    >
                      {key}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {phase === "result" && (
              <div className="flex flex-1 flex-col justify-center px-[26px]">
                <div className="text-[52px] font-black leading-[0.95]">{correct ? "CORRECT." : "MISSED."}</div>
                <div className="mt-3.5 text-sm text-[#57575c]">{correct ? "Nice. Your streak grows by one." : `The total was ${total}.`}</div>
                <div className="mt-[22px] border-t pt-3.5 text-[13px] tracking-[0.06em]" style={{ borderColor: RULE }}>
                  {sequence.join(" + ")} = {total}
                </div>
                <button
                  type="button"
                  onClick={start}
                  className="mt-7 flex min-h-12 justify-between px-5 py-4 text-left text-[15px] font-extrabold tracking-[0.1em]"
                  style={{ background: BLUE }}
                >
                  <span>PLAY AGAIN</span>
                  <span>→</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const roundsPattern = [1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1];

const TrainOrCompete = () => {
  const [mode, setMode] = useState<"train" | "compete">("compete");
  const compete = mode === "compete";
  const points = compete
    ? "0,100 40,92 80,96 120,80 160,74 200,82 240,62 280,50 320,56 360,36 400,28"
    : "0,70 400,70";

  return (
    <section id="elo" className="mx-auto max-w-[1080px] scroll-mt-14 px-[22px] py-[140px]">
      <div className="flex flex-wrap items-center gap-16">
        <div className="flex-[1_1_380px]">
          <p className="text-[17px] font-semibold text-apple-secondary">03 · Train or compete</p>
          <h2 className="mt-2 text-[clamp(36px,5vw,52px)] font-bold leading-[1.07] tracking-[-0.025em]">Practice freely. Then play for ELO.</h2>
          <p className="mt-3.5 text-[19px] leading-[1.47] text-apple-secondary">
            Train mode never touches your score. Compete mode is ranked, so every round moves your ELO, which becomes your
            cognitive score in Analytics.
          </p>
          <Segmented
            className="mt-7"
            ariaLabel="Mode"
            value={mode}
            onChange={setMode}
            options={[
              { value: "train", label: "Train" },
              { value: "compete", label: "Compete" },
            ]}
          />
        </div>
        <div className="flex-[1_1_460px] p-7 font-archivo text-[#111]" style={{ background: PAPER }}>
          <div className="text-[10px] tracking-[0.14em] text-[#57575c]">COGNITIVE SCORE</div>
          <div className="flex items-baseline gap-3">
            <span className="text-[56px] font-black">{compete ? 982 : 910}</span>
            <span className="text-sm font-bold" style={{ color: compete ? "#2f7a3a" : "#57575c" }}>
              {compete ? "Rising with ranked play" : "No score impact"}
            </span>
          </div>
          <svg viewBox="0 0 400 140" role="img" aria-label={compete ? "ELO rising over recent ranked rounds" : "ELO flat during training"} className="mt-2 block h-[140px] w-full">
            <line x1="0" y1="70" x2="400" y2="70" stroke={RULE} strokeDasharray="4 4" />
            <polyline points={points} fill="none" stroke="#111" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
          </svg>
          <div className="mt-4 flex justify-between text-[10px] tracking-[0.14em] text-[#57575c]">
            <span>RECENT ROUNDS</span>
            <span>{roundsPattern.filter(Boolean).length} / 20</span>
          </div>
          <div className="mt-2 grid grid-cols-[repeat(20,minmax(0,1fr))] gap-1" aria-hidden="true">
            {roundsPattern.map((won, i) => (
              <span key={i} className="h-3.5" style={{ background: won ? "#a9d4a1" : "#e5a3a1" }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const SecondChance = () => {
  const [saved, setSaved] = useState(false);

  return (
    <section className="px-[22px] py-[140px]" style={{ background: RED }}>
      <div className="mx-auto flex max-w-[1080px] flex-wrap-reverse items-center gap-16">
        <div className="mx-auto w-[320px] max-w-full flex-none bg-white font-archivo text-[#111] shadow-[0_30px_60px_rgba(0,0,0,0.16)]">
          <div className="bg-[#d98e8b] px-6 pb-5 pt-10 text-center">
            <div className="text-[32px] font-black text-[#5c3d3c] line-through">58</div>
            <div className="text-[52px] font-black text-[#d9241b]">652327</div>
          </div>
          <div className="px-[22px] py-5">
            <div className="flex items-end justify-between">
              <div>
                <div className="text-[9px] tracking-[0.14em] text-[#57575c]">SECOND CHANCE</div>
                <div className="text-[28px] font-black">{saved ? "SAVED." : "MISSED."}</div>
              </div>
              <div className="text-right">
                <div className="text-[9px] tracking-[0.14em] text-[#57575c]">EXPIRES IN</div>
                <div className="text-[28px] font-black">9s</div>
              </div>
            </div>
            <p className="mt-3 text-xs leading-normal text-[#57575c]">
              {saved ? "Streak restored. Keep going." : "Watch a short ad to save your streak and continue this run. One retry allowed per game."}
            </p>
            <button
              type="button"
              onClick={() => setSaved((s) => !s)}
              className="mt-3.5 min-h-11 w-full bg-[#111] p-3.5 text-xs font-extrabold tracking-[0.1em] text-white"
            >
              {saved ? "CONTINUE →" : "WATCH AD TO CONTINUE"}
            </button>
          </div>
        </div>
        <div className="flex-[1_1_380px] text-apple-ink">
          <p className="text-[17px] font-semibold text-[#5c3d3c]">04 · One more try</p>
          <h2 className="mt-2 text-[clamp(36px,5vw,52px)] font-bold leading-[1.07] tracking-[-0.025em]">Missed it? Save your streak.</h2>
          <p className="mt-3.5 text-[19px] leading-[1.47] text-[#4a3534]">
            A wrong answer offers one rewarded ad per game to keep the run going. The ad only appears when a player chooses it, at
            the moment they want another try.
          </p>
        </div>
      </div>
    </section>
  );
};

const SpeedMath = () => (
  <PageTransition>
    <div className="min-h-screen bg-white text-apple-ink">
      <GlobalNav />
      <LocalNav
        name={app.name}
        homeHref="/speedmath"
        icon={<AppIcon app={app} size={28} />}
        links={[
          { label: "Levels", href: "#levels" },
          { label: "Play", href: "#play" },
          { label: "ELO", href: "#elo" },
          { label: "Privacy", href: "/speedmath/privacy" },
        ]}
        cta={{ label: "Get", href: app.storeUrl!, color: "#111111" }}
      />

      <section className="overflow-hidden bg-[#e4e6ea] px-[22px] pt-24 text-center">
        <AppIcon app={app} size={88} className="mx-auto" />
        <p className="mt-[18px] text-[21px] font-semibold text-[#57575c]">Speed Math · Android · 4.8★ on Google Play</p>
        <h1 className="mx-auto mt-2.5 max-w-[900px] text-[clamp(52px,8vw,96px)] font-bold leading-[1.02] tracking-[-0.035em]">Train your brain.</h1>
        <p className="mx-auto mt-[22px] max-w-[620px] text-[21px] leading-[1.4] text-[#57575c]">
          Numbers flash on the screen. Add them in your head, then type the total. It's simple, and it's hard to put down.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-7">
          <PillLink href={app.storeUrl!} background="#111111" external>
            Get it on Google Play
          </PillLink>
          <a href="#play" className="text-[17px] text-apple-link hover:underline">
            Play a round ›
          </a>
        </div>
        <HomeScreens />
      </section>

      <LevelTimeline />
      <PlayableRound />
      <TrainOrCompete />
      <SecondChance />

      <StoreGallery
        className="bg-[#e4e6ea]"
        height={380}
        images={[
          { src: shotTrain, alt: "Train your brain" },
          { src: shotLevels, alt: "Select level" },
          { src: shotMemorize, alt: "Memorize and calculate" },
          { src: shotHighScore, alt: "Beat your high score" },
          { src: shotAnalytics, alt: "Track your brain's progress" },
        ]}
      />
      <BehindTheBuild appName="Speed Math" stack="React Native · Expo · Reanimated · Zustand · AdMob rewarded ads · Haptics">
        <p>
          Speed Math is a React Native and Expo app with a deliberately minimal, poster-like design. Each tier is a set of
          parameters for how many numbers flash, how many digits they have and how fast they appear. Train and Compete run the same
          loop, but only Compete feeds the ELO rating. Stats are stored on the device, and an optional rewarded ad lets players save
          a streak.
        </p>
      </BehindTheBuild>
      <SiteFooter />
    </div>
  </PageTransition>
);

export default SpeedMath;
