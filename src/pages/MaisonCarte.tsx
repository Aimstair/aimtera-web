import { PointerEvent, useEffect, useRef, useState } from "react";
import GlobalNav from "@/components/site/GlobalNav";
import LocalNav from "@/components/site/LocalNav";
import SiteFooter from "@/components/site/SiteFooter";
import AppIcon from "@/components/site/AppIcon";
import PageTransition from "@/components/PageTransition";
import { BehindTheBuild, PillLink } from "@/components/site/Section";
import { getApp } from "@/content/apps";
import envelopeHero from "@/assets/apps/maisoncarte-hero.jpg";

const app = getApp("maisoncarte");
const WINE = "#5c1a23";
const CREAM = "#f9f5ee";
const INK = "#2a1f1c";
const MUTED = "#74655c";
const GOLD = "#b08a52";
const SITE_URL = app.siteUrl!;
const sealStyle = { background: "radial-gradient(circle at 35% 30%, #8a2c3a, #5c1a23 60%, #3e1017)" };

const Envelope = () => {
  const [open, setOpen] = useState(false);

  return (
    <section id="envelope" className="mx-auto max-w-[1080px] scroll-mt-14 px-[22px] pb-[140px] pt-[120px]">
      <div className="flex flex-wrap items-center gap-16">
        <div className="flex-[1_1_340px]">
          <p className="text-[17px] font-semibold" style={{ color: WINE }}>01 · Sent, not posted</p>
          <h2 className="mt-2 text-[clamp(36px,5vw,52px)] font-bold leading-[1.07] tracking-[-0.025em]">One link. One recipient. One moment.</h2>
          <p className="mt-3.5 text-[19px] leading-[1.47] text-apple-secondary">
            The recipient opens a private link and finds a wax-sealed envelope designed for the lock screen. The sender can keep
            editing until the card is opened.
          </p>
          <p className="mt-[22px] text-[15px] text-apple-secondary">Try it: break the seal.</p>
        </div>
        <div className="mx-auto flex-none">
          <div className="relative h-[640px] w-[340px] overflow-hidden rounded-[52px] border-[12px] border-apple-ink bg-[#efe8dc] font-cormorant shadow-[0_30px_60px_rgba(0,0,0,0.16)]" style={{ color: INK }}>
            <div className="absolute inset-x-0 top-14 text-center font-sans text-[13px] tracking-[0.3em]" style={{ color: MUTED }}>FOR AMELIA</div>
            <div
              className="absolute inset-x-[34px] h-[300px] rounded-md bg-[#fffdf8] px-7 py-[34px] text-center shadow-[0_10px_30px_rgba(42,31,28,0.15)] transition-[top] duration-700 ease-out"
              style={{ top: open ? 96 : 320 }}
            >
              <div className="font-sans text-sm tracking-[0.3em]" style={{ color: GOLD }}>NO. 01 — BIRTHDAYS</div>
              <div className="mt-[18px] text-[38px] italic leading-[1.05]">Happy birthday, Amelia.</div>
              <div className="mt-4 text-lg leading-[1.4]" style={{ color: MUTED }}>Another year of you. Scroll slowly, there's more inside.</div>
            </div>
            <div className="absolute inset-x-[22px] top-[300px] h-[220px] rounded-md shadow-[0_16px_40px_rgba(42,31,28,0.18)]" style={{ background: CREAM }} />
            <div
              aria-hidden="true"
              className="absolute inset-x-[22px] top-[300px] h-0 transition-all duration-500"
              style={{ borderLeft: "148px solid transparent", borderRight: "148px solid transparent", borderTop: open ? "0 solid #f3ede2" : "150px solid #f3ede2" }}
            />
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close the envelope" : "Break the wax seal"}
              className="absolute left-1/2 top-[360px] flex h-[84px] w-[84px] items-center justify-center rounded-full text-[26px] font-semibold text-[#e8c9a0] shadow-[0_6px_14px_rgba(62,16,23,0.4),inset_0_0_0_6px_rgba(0,0,0,0.12)] transition-all duration-500"
              style={{ ...sealStyle, transform: `translateX(-50%) scale(${open ? 0.4 : 1})`, opacity: open ? 0 : 1 }}
            >
              MC
            </button>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="absolute bottom-10 left-1/2 min-h-11 -translate-x-1/2 whitespace-nowrap rounded-full border bg-transparent px-[22px] font-sans text-sm"
              style={{ borderColor: WINE, color: WINE }}
            >
              {open ? "Seal it again" : "Break the seal"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const COLS = 10;
const ROWS = 6;

const ScratchOff = () => {
  const [foil, setFoil] = useState<boolean[]>(() => Array(COLS * ROWS).fill(true));
  const [dragging, setDragging] = useState(false);
  const revealed = Math.round((foil.filter((f) => !f).length / foil.length) * 100);

  const scratchAt = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const col = Math.floor(((event.clientX - rect.left) / rect.width) * COLS);
    const row = Math.floor(((event.clientY - rect.top) / rect.height) * ROWS);
    if (col < 0 || row < 0 || col >= COLS || row >= ROWS) return;
    const index = row * COLS + col;
    setFoil((prev) => (prev[index] ? prev.map((f, i) => (i === index ? false : f)) : prev));
  };

  return (
    <section id="scratch" className="scroll-mt-14 px-[22px] py-[140px]" style={{ background: INK, color: CREAM }}>
      <div className="mx-auto flex max-w-[1080px] flex-wrap-reverse items-center gap-16">
        <div className="mx-auto w-[420px] max-w-full flex-none">
          <div
            className="relative h-[300px] cursor-crosshair touch-none select-none overflow-hidden rounded-[18px] shadow-[0_30px_60px_rgba(0,0,0,0.35)]"
            style={{ background: CREAM, color: INK }}
            onPointerMove={(e) => {
              if (e.pointerType === "mouse" || dragging) scratchAt(e);
            }}
            onPointerDown={(e) => {
              setDragging(true);
              scratchAt(e);
            }}
            onPointerUp={() => setDragging(false)}
            onPointerLeave={() => setDragging(false)}
            role="img"
            aria-label={`Scratch card, ${revealed}% revealed. Hidden message: Pack a bag. We leave Friday.`}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center font-cormorant">
              <div className="font-sans text-[13px] tracking-[0.3em]" style={{ color: GOLD }}>A LITTLE SURPRISE</div>
              <div className="mt-2.5 text-[40px] italic leading-[1.05]">
                Pack a bag.
                <br />
                We leave Friday.
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 grid grid-cols-10 grid-rows-6">
              {foil.map((on, i) => (
                <div
                  key={i}
                  className="transition-opacity duration-300"
                  style={{
                    opacity: on ? 1 : 0,
                    background: `linear-gradient(${i % 2 ? 135 : 45}deg, #c9a463, #e9d29b 45%, #b8904f)`,
                  }}
                />
              ))}
            </div>
          </div>
          <div className="mt-4 flex justify-between text-sm text-[#c9b8a6]">
            <span aria-live="polite">{revealed}% revealed</span>
            <button type="button" onClick={() => setFoil(Array(COLS * ROWS).fill(true))} className="text-[#e8c9a0] hover:underline">
              Reset foil
            </button>
          </div>
        </div>
        <div className="flex-[1_1_340px]">
          <p className="text-[17px] font-semibold text-[#e8c9a0]">02 · The Scratch-Off</p>
          <h2 className="mt-2 text-[clamp(36px,5vw,52px)] font-bold leading-[1.07] tracking-[-0.025em]">Run a finger across gold foil.</h2>
          <p className="mt-3.5 text-[19px] leading-[1.47] text-[#c9b8a6]">
            Under the foil is a hidden photo and message. Move your cursor over the card, or drag a finger across it, to scratch.
          </p>
        </div>
      </div>
    </section>
  );
};

const candleColors = ["#e5b0ae", "#c3d3e8", "#f2d58a", "#bfe0c4", "#e8c9a0"];

const Candles = () => {
  const [lit, setLit] = useState(false);
  const [flames, setFlames] = useState<boolean[]>([true, true, true, true, true]);
  const allOut = lit && flames.every((f) => !f);
  const dark = lit && !allOut;

  const strike = () => {
    setLit(true);
    setFlames([true, true, true, true, true]);
  };

  return (
    <section id="candles" className="scroll-mt-14 px-[22px] py-[140px] transition-colors duration-700" style={{ background: dark ? "#1a1210" : CREAM }}>
      <div className="mx-auto max-w-[1080px] text-center">
        <p className="text-[17px] font-semibold" style={{ color: GOLD }}>03 · Blow Out the Candles</p>
        <h2 className="mt-2 text-[clamp(36px,5vw,52px)] font-bold leading-[1.07] tracking-[-0.025em] transition-colors" style={{ color: dark ? CREAM : INK }}>
          Strike the match. Make a wish.
        </h2>
        <p className="mx-auto mt-3.5 max-w-[600px] text-[19px] leading-[1.47] transition-colors" style={{ color: dark ? "#c9b8a6" : MUTED }} aria-live="polite">
          {!lit ? "Strike the match to light the candles." : !allOut ? "Now click each flame to blow it out." : "Wish made. The room lights up."}
        </p>
        <div className="mx-auto mt-14 flex h-[200px] items-end justify-center gap-6 sm:gap-9">
          {flames.map((burning, i) => {
            const on = lit && burning;
            return (
              <button
                key={i}
                type="button"
                disabled={!on}
                aria-label={on ? `Blow out candle ${i + 1}` : `Candle ${i + 1}`}
                onClick={() => setFlames((prev) => prev.map((f, j) => (j === i ? false : f)))}
                className="flex flex-col items-center disabled:cursor-default"
              >
                <span
                  className="h-[22px] w-3.5 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] transition-all duration-300"
                  style={
                    on
                      ? { opacity: 1, background: "radial-gradient(circle at 50% 70%, #fff6c8, #ffb23f 55%, #ff7a1a)", boxShadow: "0 0 24px 8px rgba(255,170,60,0.45)" }
                      : { opacity: 0, transform: "scale(0.4)" }
                  }
                />
                <span className="h-2.5 w-0.5" style={{ background: INK }} />
                <span
                  className="w-5 rounded-t"
                  style={{ height: 90 + (i % 3) * 18, background: `repeating-linear-gradient(45deg, ${candleColors[i]} 0 8px, #fffdf8 8px 14px)` }}
                />
              </button>
            );
          })}
        </div>
        <div className="mx-auto h-[26px] w-[420px] max-w-full rounded-md bg-[#e8dccb]" />
        <button type="button" onClick={strike} className="mt-9 min-h-11 rounded-full px-6 text-base text-white transition-opacity hover:opacity-90" style={{ background: WINE }}>
          {lit ? "Light them again" : "Strike the match"}
        </button>
        {allOut && (
          <div className="mx-auto mt-11 max-w-[760px]">
            <div className="grid grid-cols-3 gap-3" aria-hidden="true">
              <div className="h-40 rounded-[14px] bg-gradient-to-br from-[#f3d9b1] to-[#e8b98a]" />
              <div className="h-40 rounded-[14px] bg-gradient-to-br from-[#f0c9b8] to-[#d99a8a]" />
              <div className="h-40 rounded-[14px] bg-gradient-to-br from-[#f5e1c0] to-[#d8c08f]" />
            </div>
            <p className="mt-3.5 text-sm" style={{ color: MUTED }}>The room lights up with the sender's photos.</p>
          </div>
        )}
      </div>
    </section>
  );
};

const acts = [
  { label: "ACT I", title: "How we met", bg: "linear-gradient(135deg, #3e2a24, #a0643f 60%, #e8c08a)" },
  { label: "ACT II", title: "The first trip", bg: "linear-gradient(135deg, #1f3a4a, #4f7d8c 55%, #d8c8a6)" },
  { label: "ACT III", title: "Every ordinary Sunday", bg: "linear-gradient(135deg, #3a2a3e, #8a5a7a 55%, #f0c9b8)" },
  { label: "CREDITS", title: "Starring: us", bg: "linear-gradient(135deg, #0d0a09, #2a1f1c 60%, #5c1a23)" },
];

const CinemaReel = () => {
  const [act, setAct] = useState(0);
  const [zoomed, setZoomed] = useState(true);
  const [playing, setPlaying] = useState(false);
  const reel = useRef<number>();
  const zoomTimer = useRef<number>();

  useEffect(
    () => () => {
      window.clearInterval(reel.current);
      window.clearTimeout(zoomTimer.current);
    },
    [],
  );

  const goTo = (index: number) => {
    setAct(index);
    setZoomed(false);
    window.clearTimeout(zoomTimer.current);
    zoomTimer.current = window.setTimeout(() => setZoomed(true), 60);
  };

  const toggle = () => {
    if (playing) {
      window.clearInterval(reel.current);
      setPlaying(false);
      return;
    }
    setPlaying(true);
    goTo(0);
    let i = 0;
    window.clearInterval(reel.current);
    reel.current = window.setInterval(() => {
      i += 1;
      if (i >= acts.length) {
        window.clearInterval(reel.current);
        setPlaying(false);
        return;
      }
      goTo(i);
    }, 2600);
  };

  const current = acts[act];

  return (
    <section id="reel" className="mx-auto max-w-[1080px] scroll-mt-14 px-[22px] py-[140px]">
      <p className="text-[17px] font-semibold" style={{ color: WINE }}>04 · The Cinema Reel</p>
      <h2 className="mt-2 text-[clamp(36px,5vw,52px)] font-bold leading-[1.07] tracking-[-0.025em]">A short film for two.</h2>
      <p className="mt-3.5 max-w-[640px] text-[19px] leading-[1.47] text-apple-secondary">
        Timed slides, Ken Burns transitions, custom acts and a closing credit roll, all from photos the sender uploads.
      </p>
      <div className="mt-11 rounded-[22px] bg-[#0d0a09] p-[22px]" style={{ color: CREAM }}>
        <div className="relative h-[clamp(240px,40vw,380px)] overflow-hidden rounded-xl">
          <div
            className="absolute inset-[-6%] transition-[transform,background] ease-out"
            style={{ background: current.bg, transform: `scale(${zoomed ? 1.08 : 1})`, transitionDuration: zoomed ? "2600ms" : "0ms" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent from-50% to-black/60" />
          <div className="absolute bottom-6 left-7 font-cormorant">
            <div className="font-sans text-[13px] tracking-[0.3em] text-[#e8c9a0]">{current.label}</div>
            <div className="mt-1.5 text-[clamp(28px,4vw,40px)] italic">{current.title}</div>
          </div>
        </div>
        <div className="mt-[18px] flex flex-wrap items-center gap-4">
          <button type="button" onClick={toggle} className="min-h-11 rounded-full px-5 text-[15px] font-semibold text-[#0d0a09]" style={{ background: CREAM }}>
            {playing ? "Pause" : "▶ Play the reel"}
          </button>
          <div className="grid min-w-[200px] flex-1 grid-cols-4 gap-1.5">
            {acts.map((a, i) => (
              <button
                key={a.label}
                type="button"
                aria-label={a.label}
                aria-current={i === act}
                onClick={() => goTo(i)}
                className="h-1.5 rounded-sm"
                style={{ background: i <= act ? "#e8c9a0" : "#3a302c" }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const flow = [
  ["i.", "Pick a design", "Nine designs across the Birthdays and Anniversary collections."],
  ["ii.", "Compose it", "Add photos, a message and your acts."],
  ["iii.", "Pay once", "From $1 per card, paid through PayPal. No subscription."],
  ["iv.", "Send the link", "A private link, editable until it's opened."],
];

const MaisonCarte = () => (
  <PageTransition>
    <div className="min-h-screen bg-white text-apple-ink">
      <GlobalNav />
      <LocalNav
        name={app.name}
        homeHref="/maisoncarte"
        icon={<AppIcon app={app} size={28} />}
        links={[
          { label: "Envelope", href: "#envelope" },
          { label: "Scratch-Off", href: "#scratch" },
          { label: "Candles", href: "#candles" },
          { label: "Cinema Reel", href: "#reel" },
        ]}
        cta={{ label: "Open ↗", href: SITE_URL, color: WINE }}
      />

      <section className="px-[22px] py-24" style={{ background: CREAM }}>
        <div className="mx-auto flex max-w-[1120px] flex-wrap items-center gap-12">
          <div className="flex-[1_1_440px]">
            <p className="text-[21px] font-semibold" style={{ color: WINE }}>Maison Carte · Web app · Live at maisoncarte.app</p>
            <h1 className="mt-3 text-[clamp(48px,7.5vw,92px)] font-bold leading-[1.02] tracking-[-0.035em]" style={{ color: INK }}>
              Greeting cards you open like a gift.
            </h1>
            <p className="mt-[22px] max-w-[540px] text-[21px] leading-[1.4]" style={{ color: MUTED }}>
              Every card is a small interactive website, sealed in wax and sent as one private link. Built mobile-first and meant to
              be opened slowly.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-7">
              <PillLink href={SITE_URL} background={WINE} external>
                Visit maisoncarte.app ↗
              </PillLink>
              <a href="#envelope" className="text-[17px] hover:underline" style={{ color: WINE }}>
                Open a card ›
              </a>
            </div>
          </div>
          <div className="flex-[1_1_440px]">
            <img
              src={envelopeHero}
              alt="Cream envelope with a burgundy wax seal and a dark rose"
              className="block aspect-[6/5] w-full rounded-[28px] object-cover object-[40%_55%] shadow-[0_30px_60px_rgba(42,31,28,0.18)]"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[980px] px-[22px] pt-[120px]">
        <p className="mb-5 text-[17px] font-semibold text-apple-secondary">Since launch</p>
        <p className="text-[clamp(30px,3.8vw,44px)] font-semibold leading-[1.2] tracking-[-0.02em] text-apple-tertiary">
          <span className="text-apple-ink">13,986 visitors</span> have explored the atelier, and <span style={{ color: WINE }}>31 cards</span> have
          been sent across <span className="text-apple-ink">9 designs.</span>
        </p>
        <p className="mt-10 text-[clamp(30px,3.8vw,44px)] font-semibold leading-[1.2] tracking-[-0.02em] text-apple-tertiary">
          Live cards are not videos. <span className="text-apple-ink">They react to scroll, tap and tilt.</span> Each card is{" "}
          <span className="text-apple-ink">tuned for one specific feeling,</span> and prices start at <span style={{ color: WINE }}>$1 per card.</span>
        </p>
      </section>

      <Envelope />
      <ScratchOff />
      <Candles />
      <CinemaReel />

      <section className="px-[22px] py-[120px]" style={{ background: CREAM }}>
        <div className="mx-auto max-w-[980px]">
          <h2 className="text-[clamp(32px,4.5vw,48px)] font-bold leading-[1.08] tracking-[-0.025em]" style={{ color: INK }}>
            Compose in minutes. Pay once. Share one link.
          </h2>
          <ol className="mt-12 grid grid-cols-1 border-t-2 sm:grid-cols-2 lg:grid-cols-4" style={{ borderColor: INK }}>
            {flow.map(([n, title, body]) => (
              <li key={n} className="pr-5 pt-[22px]">
                <div className="font-cormorant text-[40px] italic" style={{ color: GOLD }}>{n}</div>
                <div className="text-[19px] font-semibold" style={{ color: INK }}>{title}</div>
                <div className="mt-1 text-[15px] leading-normal" style={{ color: MUTED }}>{body}</div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <BehindTheBuild appName="Maison Carte" stack="React · Node.js · Supabase · PayPal · Tailwind CSS">
        <p>
          Each card is a small React site generated from a template and the sender's photos and message. Supabase stores the cards
          and their private share links, a Node.js back end handles composing and delivery, and PayPal handles the one-time payment.
          Motion is web-native, so it responds to scroll, tap and device tilt instead of playing a flat video.
        </p>
      </BehindTheBuild>
      <SiteFooter />
    </div>
  </PageTransition>
);

export default MaisonCarte;
