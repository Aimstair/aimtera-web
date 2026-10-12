import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import GlobalNav from "@/components/site/GlobalNav";
import LocalNav from "@/components/site/LocalNav";
import SiteFooter from "@/components/site/SiteFooter";
import AppIcon from "@/components/site/AppIcon";
import Segmented from "@/components/site/Segmented";
import PageTransition from "@/components/PageTransition";
import { BehindTheBuild, PillLink, StoreGallery } from "@/components/site/Section";
import { getApp } from "@/content/apps";
import gameplay from "@/assets/apps/clipit-01.png";
import shotDoubleTap from "@/assets/apps/clipit-02.png";
import shotStorage from "@/assets/apps/clipit-03.png";
import shotVault from "@/assets/apps/clipit-04.png";
import shotCollections from "@/assets/apps/clipit-05.png";

const CORAL = "#ff6b4a";
const app = getApp("clipit");

type Gesture = "tap" | "hold" | "double";

const gestures: Array<{ id: Gesture; title: string; desc: string }> = [
  { id: "tap", title: "Tap", desc: "Take a screenshot." },
  { id: "hold", title: "Hold", desc: "Start a manual screen recording." },
  { id: "double", title: "Double-tap", desc: "Save the last 15–60 seconds as a flashback clip." },
];

const BubbleDemo = () => {
  const [gesture, setGesture] = useState<Gesture>("double");
  const [flashing, setFlashing] = useState(false);
  const timer = useRef<number>();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const pick = (id: Gesture) => {
    setGesture(id);
    window.clearTimeout(timer.current);
    if (id === "tap") {
      setFlashing(true);
      timer.current = window.setTimeout(() => setFlashing(false), 350);
    }
  };

  const toast =
    gesture === "tap" ? "Screenshot saved to Vault" : gesture === "hold" ? "Recording · tap the bubble to stop" : "Flashback saved · last 30s";
  const ring =
    gesture === "hold"
      ? "0 0 0 8px rgba(255,59,48,0.35)"
      : gesture === "double"
        ? "0 0 0 10px rgba(255,107,74,0.25), 0 0 0 22px rgba(255,107,74,0.10)"
        : "none";

  return (
    <div className="mt-14 flex flex-wrap items-center gap-12">
      <div role="radiogroup" aria-label="Gesture" className="flex flex-[1_1_300px] flex-col gap-1">
        {gestures.map((g) => {
          const on = g.id === gesture;
          return (
            <button
              key={g.id}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => pick(g.id)}
              className={`rounded-[18px] px-[22px] py-5 text-left transition-all ${on ? "bg-[#1c1c1e] shadow-[inset_3px_0_0_#ff6b4a]" : "opacity-60 hover:opacity-90"}`}
            >
              <span className="block text-2xl font-bold tracking-[-0.01em]">{g.title}</span>
              <span className="mt-1 block text-[17px] text-[#a1a1a6]">{g.desc}</span>
            </button>
          );
        })}
      </div>

      <div className="flex min-w-0 flex-[2_1_520px] justify-center">
        <div className="relative aspect-[600/290] w-[600px] max-w-full overflow-hidden rounded-[44px] border-[12px] border-[#2c2c2e] bg-[#111]">
          <img src={gameplay} alt="Mobile game running under the Clip It bubble" className="absolute left-0 top-[-205%] w-[125%] max-w-none" />
          <div aria-hidden="true" className="absolute inset-0 bg-white transition-opacity duration-300" style={{ opacity: flashing ? 0.75 : 0 }} />
          {gesture === "hold" && (
            <div className="absolute left-[18px] top-4 flex items-center gap-2 rounded-full bg-black/65 px-3 py-1.5 text-[13px] font-semibold">
              <span className="h-[9px] w-[9px] rounded-full bg-[#ff3b30]" />
              REC 00:07
            </div>
          )}
          <div
            className="absolute right-[22px] top-1/2 flex h-[62px] w-[62px] -translate-y-1/2 items-center justify-center rounded-full border-4 bg-[rgba(10,10,12,0.75)] transition-shadow duration-300"
            style={{ borderColor: CORAL, boxShadow: ring }}
          >
            <span className="h-[22px] w-[22px] rounded-md" style={{ background: CORAL }} />
          </div>
          <div
            className="absolute bottom-[18px] left-1/2 flex -translate-x-1/2 items-center gap-2.5 whitespace-nowrap rounded-[14px] border border-white/10 bg-[rgba(28,28,30,0.92)] px-4 py-2.5 text-sm font-semibold"
            aria-live="polite"
          >
            <span className="h-2 w-2 rounded-full" style={{ background: CORAL }} />
            {toast}
          </div>
        </div>
      </div>
    </div>
  );
};

const FlashbackBuffer = () => {
  const [length, setLength] = useState(30);
  const width = `${(length / 60) * 34}%`;

  return (
    <section id="flashback" className="scroll-mt-14 bg-white px-[22px] py-[140px] text-apple-ink">
      <div className="mx-auto max-w-[980px]">
        <p className="text-[17px] font-semibold text-[#e8492b]">02 · The flashback buffer</p>
        <h2 className="mt-2 text-[clamp(36px,5vw,56px)] font-bold leading-[1.07] tracking-[-0.025em]">
          Other apps record everything.
          <br />
          Clip It saves just the highlight.
        </h2>
        <p className="mt-3.5 max-w-[680px] text-[21px] leading-[1.4] text-apple-secondary">
          Your recent screen activity sits in a rolling buffer. Only the window you choose is ever written to storage.
        </p>

        <Segmented
          className="mt-12"
          ariaLabel="Flashback length"
          value={length}
          onChange={setLength}
          options={[15, 30, 45, 60].map((n) => ({ value: n, label: `${n}s` }))}
        />

        <div className="mt-10">
          <div className="flex justify-between text-[13px] text-apple-secondary">
            <span>Match starts</span>
            <span>Double-tap</span>
          </div>
          <div className="mt-2 text-[15px] font-semibold">Typical screen recorder</div>
          <div className="mt-2 h-11 rounded-[10px] bg-[repeating-linear-gradient(90deg,#d2d2d7_0_2px,#e8e8ed_2px_14px)]" />
          <div className="mt-1.5 text-sm text-apple-secondary">Records the whole session. You scrub through it later.</div>

          <div className="mt-8 text-[15px] font-semibold">Clip It</div>
          <div className="relative mt-2 h-11 overflow-hidden rounded-[10px] bg-apple-gray">
            <div
              className="absolute inset-y-0 right-0 rounded-[10px] transition-all duration-500 ease-out"
              style={{ width, background: "linear-gradient(90deg, rgba(255,107,74,0.25), #ff6b4a)" }}
            />
          </div>
          <div className="mt-1.5 text-sm text-apple-secondary">
            Keeps only the last <strong className="text-apple-ink">{length} seconds</strong>. Everything before that is discarded, so
            storage stays small.
          </div>
        </div>
      </div>
    </section>
  );
};

type VaultFilter = "All" | "Images" | "GIFs" | "Videos";

const vaultItems = [
  { label: "Clip 3:02 PM (Edited)", type: "Videos", dur: "0:15", ocr: "TRIPLE KILL", x: 0, y: -205 },
  { label: "Screenshot 3:13 PM", type: "Images", ocr: "$657", x: -80, y: -230 },
  { label: "GIF 3:20 PM", type: "GIFs", ocr: "", x: -40, y: -255 },
  { label: "Screenshot 3:14 PM (Edited)", type: "Images", ocr: "Recall", x: -10, y: -262 },
  { label: "Clip 2:47 PM", type: "Videos", dur: "0:30", ocr: "Mystery Codex", x: -83, y: -192 },
  { label: "Screenshot 2:40 PM", type: "Images", ocr: "", x: -60, y: -215 },
];

const Vault = () => {
  const [filter, setFilter] = useState<VaultFilter>("All");
  const [query, setQuery] = useState("");
  const q = query.toLowerCase();
  const items = vaultItems.filter(
    (item) => (filter === "All" || item.type === filter) && (!q || item.ocr.toLowerCase().includes(q)),
  );

  return (
    <section id="vault" className="scroll-mt-14 bg-apple-gray px-[22px] py-[140px] text-apple-ink">
      <div className="mx-auto flex max-w-[1080px] flex-wrap items-center gap-16">
        <div className="flex-[1_1_360px]">
          <p className="text-[17px] font-semibold text-[#e8492b]">03 · The Vault</p>
          <h2 className="mt-2 text-[clamp(36px,5vw,52px)] font-bold leading-[1.07] tracking-[-0.025em]">Every clip, automatically organized.</h2>
          <p className="mt-3.5 text-[19px] leading-[1.47] text-apple-secondary">
            Captures land in a private, searchable Vault. On-device OCR reads the text inside your screenshots, so you can search
            for what was on screen.
          </p>
          <p className="mb-2.5 mt-7 text-[15px] font-semibold">Try searching</p>
          <div className="flex flex-wrap gap-2">
            {["triple kill", "mystery codex"].map((term) => {
              const on = query === term;
              return (
                <button
                  key={term}
                  type="button"
                  aria-pressed={on}
                  onClick={() => {
                    setQuery(term);
                    setFilter("All");
                  }}
                  className={`min-h-10 rounded-full border px-4 text-[15px] transition-colors ${
                    on ? "border-apple-ink bg-apple-ink text-white" : "border-apple-hairline bg-white hover:border-apple-ink"
                  }`}
                >
                  “{term}”
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => setQuery("")}
              className="min-h-10 rounded-full border border-apple-hairline bg-white px-4 text-[15px] hover:border-apple-ink"
            >
              Clear search
            </button>
          </div>
          <p className="mt-7 text-[15px] text-apple-secondary">
            You can also trim, crop and export clips without leaving the app, and group them into Collections.
          </p>
        </div>

        <div className="mx-auto flex-none">
          <div className="flex h-[740px] w-[340px] flex-col overflow-hidden rounded-[54px] border-[12px] border-apple-ink bg-[#0b0b0d] text-[#f5f5f7] shadow-[0_30px_60px_rgba(0,0,0,0.18)] sm:w-[360px]">
            <div className="h-[34px]" />
            <div className="flex items-end justify-between px-[18px] pt-2">
              <div>
                <div className="text-[10px] tracking-[0.12em] text-[#8e8e93]">CLIP IT</div>
                <div className="text-2xl font-bold">Vault</div>
              </div>
              <div className="rounded-full border px-2.5 py-1 text-[11px] font-bold" style={{ borderColor: CORAL, color: CORAL }}>
                FREE
              </div>
            </div>
            <div className={`mx-[18px] mt-3 flex items-center gap-2 rounded-xl bg-[#1c1c1f] px-3 py-2.5 text-[13px] ${query ? "text-[#f5f5f7]" : "text-[#8e8e93]"}`}>
              <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8e8e93" strokeWidth="2.4" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </svg>
              {query || "Search captures, tags, OCR…"}
            </div>
            <div className="mx-[18px] mt-3 flex gap-1.5" role="radiogroup" aria-label="Filter">
              {(["All", "Images", "GIFs", "Videos"] as VaultFilter[]).map((f) => {
                const on = f === filter;
                return (
                  <button
                    key={f}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => setFilter(f)}
                    className={`rounded-full border px-3 py-1.5 text-xs ${on ? "text-[#f5f5f7]" : "border-[#1c1c1f] bg-[#1c1c1f] text-[#c7c7cc]"}`}
                    style={on ? { background: "rgba(255,107,74,0.12)", borderColor: CORAL } : undefined}
                  >
                    {f}
                  </button>
                );
              })}
            </div>
            <div className="mx-[18px] mt-3 grid flex-1 grid-cols-2 content-start gap-2 overflow-hidden">
              {items.map((item) => (
                <div
                  key={item.label}
                  className="relative h-[150px] overflow-hidden rounded-xl bg-[#222]"
                  style={q ? { boxShadow: `inset 0 0 0 2px ${CORAL}` } : undefined}
                >
                  <img src={gameplay} alt="" className="absolute w-[300px] max-w-none" style={{ left: item.x, top: item.y }} />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-2 pb-1.5 pt-[18px] text-[11px] font-semibold">
                    {item.label}
                  </div>
                  {item.type === "Videos" && (
                    <div className="absolute right-1.5 top-1.5 rounded-md bg-black/60 px-1.5 py-0.5 text-[10px]">▶ {item.dur}</div>
                  )}
                  {q && (
                    <div className="absolute left-1.5 top-1.5 rounded-md px-1.5 py-0.5 text-[10px] font-bold" style={{ background: CORAL }}>
                      Text: {item.ocr}
                    </div>
                  )}
                </div>
              ))}
              {items.length === 0 && <div className="col-span-2 py-10 text-center text-[13px] text-[#8e8e93]">No captures match.</div>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const checkIcon = (
  <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e8492b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const StorageAndPrivacy = () => (
  <section className="bg-white px-[22px] py-[140px] text-apple-ink">
    <div className="mx-auto flex max-w-[1080px] flex-wrap-reverse items-center gap-16">
      <div className="mx-auto w-[360px] max-w-full flex-none rounded-[28px] bg-[#141416] p-6 text-[#f5f5f7] shadow-[0_30px_60px_rgba(0,0,0,0.18)]">
        <div className="text-[10px] tracking-[0.12em] text-[#8e8e93]">MANAGE</div>
        <div className="text-xl font-bold">Storage &amp; Settings</div>
        <div className="mt-4 rounded-[18px] bg-[#1f1f22] p-[18px]">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[26px] font-bold">129.1</span>
              <span className="text-[#8e8e93]"> / 512 MB</span>
            </div>
            <span className="rounded-lg border border-[#3a3a3c] px-2 py-0.5 text-xs">25%</span>
          </div>
          <div className="mt-0.5 text-[10px] tracking-[0.1em] text-[#8e8e93]">ON-DEVICE STORAGE</div>
          <div className="mt-3 flex h-[7px] overflow-hidden rounded bg-[#2c2c2e]">
            <span className="w-[14.8%]" style={{ background: CORAL }} />
            <span className="w-[10.4%] bg-[#8b6cf0]" />
          </div>
          <div className="mt-3.5 flex gap-1.5 text-[11px]">
            {[
              ["IMAGES", "75.8 MB"],
              ["GIFS", "0.0 MB"],
              ["VIDEOS", "53.4 MB"],
            ].map(([label, value]) => (
              <div key={label} className="flex-1 rounded-[10px] border border-[#2c2c2e] p-2">
                <div className="text-[#8e8e93]">● {label}</div>
                <div className="mt-0.5 font-bold">{value}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3 rounded-2xl border p-3.5 text-[13px]" style={{ borderColor: "rgba(255,107,74,0.35)", background: "rgba(255,107,74,0.06)" }}>
          <div className="font-bold">Remove the Clip It watermark</div>
          <div className="mt-0.5 text-[#8e8e93]">Unlimited exports, batch actions and more</div>
        </div>
      </div>

      <div className="flex-[1_1_380px]">
        <p className="text-[17px] font-semibold text-[#e8492b]">04 · 100% on your device</p>
        <h2 className="mt-2 text-[clamp(36px,5vw,52px)] font-bold leading-[1.07] tracking-[-0.025em]">Your clips never leave your phone.</h2>
        <ul className="mt-7 flex flex-col border-b border-apple-hairline">
          {["No account required", "No cloud sync or upload", "No tracking", "Premium is billed through Google Play and can be canceled anytime"].map(
            (item) => (
              <li key={item} className="flex items-center gap-3.5 border-t border-apple-hairline py-4 text-[19px]">
                {checkIcon}
                {item}
              </li>
            ),
          )}
        </ul>
        <p className="mt-5 text-[17px]">
          <Link to="/clipit/privacy" className="text-apple-link hover:underline">
            Read the privacy policy ›
          </Link>
        </p>
      </div>
    </div>
  </section>
);

const ClipIt = () => (
  <PageTransition>
    <div className="min-h-screen bg-black text-[#f5f5f7]">
      <GlobalNav dark />
      <LocalNav
        dark
        name={app.name}
        homeHref="/clipit"
        icon={<AppIcon app={app} size={28} />}
        links={[
          { label: "Bubble", href: "#bubble" },
          { label: "Flashback", href: "#flashback" },
          { label: "Vault", href: "#vault" },
          { label: "Privacy", href: "/clipit/privacy" },
          { label: "Terms", href: "/clipit/terms" },
        ]}
        cta={{ label: "Get", href: app.storeUrl!, color: CORAL }}
      />

      <section className="px-[22px] pb-20 pt-24 text-center">
        <AppIcon app={app} size={88} className="mx-auto" />
        <p className="mt-[18px] text-[21px] font-semibold text-[#ff7a59]">Clip It · Android · 4.8★ on Google Play</p>
        <h1 className="mx-auto mt-2.5 max-w-[900px] text-[clamp(52px,8vw,96px)] font-bold leading-[1.02] tracking-[-0.035em]">
          Never miss a highlight.
        </h1>
        <p className="mx-auto mt-[22px] max-w-[620px] text-[21px] leading-[1.4] text-[#a1a1a6]">
          Clip It keeps the last 15–60 seconds of your screen in a rolling buffer. Double-tap the bubble and that moment is saved,
          even though you never hit record.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-7">
          <PillLink href={app.storeUrl!} background={CORAL} external>
            Get it on Google Play
          </PillLink>
          <a href="#bubble" className="text-[17px] text-apple-link-dark hover:underline">
            See how it works ›
          </a>
        </div>
      </section>

      <section id="bubble" className="mx-auto max-w-[1120px] scroll-mt-14 px-[22px] pb-[140px] pt-10">
        <p className="text-[17px] font-semibold text-[#ff7a59]">01 · The bubble</p>
        <h2 className="mt-2 text-[clamp(36px,5vw,56px)] font-bold leading-[1.07] tracking-[-0.025em]">One button. Three gestures.</h2>
        <p className="mt-3 max-w-[640px] text-[21px] leading-[1.4] text-[#a1a1a6]">
          A small bubble floats over any app without flashing or covering your game. Try each gesture.
        </p>
        <BubbleDemo />
      </section>

      <FlashbackBuffer />
      <Vault />
      <StorageAndPrivacy />

      <div className="text-apple-ink">
        <StoreGallery
          height={480}
          images={[
            { src: gameplay, alt: "Never miss a highlight" },
            { src: shotDoubleTap, alt: "Double-tap. That's it." },
            { src: shotVault, alt: "Every clip, automatically organized" },
            { src: shotCollections, alt: "Collections" },
            { src: shotStorage, alt: "Storage and settings" },
          ]}
        />
        <div className="bg-white">
          <BehindTheBuild appName="Clip It" stack="React Native · Expo · Reanimated · Zustand · RevenueCat · AdMob · On-device OCR">
            <p>
              Clip It is built with React Native and Expo. The capture bubble floats over other apps through Android's overlay
              permission. The flashback buffer keeps a short rolling window of screen frames and only writes it to storage when you
              double-tap. Everything lives in the app's local storage, with no cloud back end. Premium unlocks through RevenueCat on
              top of Google Play Billing.
            </p>
          </BehindTheBuild>
        </div>
        <SiteFooter />
      </div>
    </div>
  </PageTransition>
);

export default ClipIt;
