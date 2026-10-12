import { useState } from "react";
import GlobalNav from "@/components/site/GlobalNav";
import LocalNav from "@/components/site/LocalNav";
import SiteFooter from "@/components/site/SiteFooter";
import AppIcon from "@/components/site/AppIcon";
import PageTransition from "@/components/PageTransition";
import { BehindTheBuild, PillLink } from "@/components/site/Section";
import { getApp } from "@/content/apps";

const app = getApp("rbmarket");
const BLUE = "#006fd7";
const GREEN = "#63b55b";
const SITE_URL = app.siteUrl!;

const listings = [
  { title: "SWEET SET BUNDLE MM2 GODLY CHEAP!", game: "Murder Mystery 2", price: "1,355", seller: "breakingbad", views: 62, bg: "from-[#fde68a] to-[#fca5a5]", vouches: 0 },
  { title: "CELESTIAL KNIFE MM2 GODLY CHEAP", game: "Murder Mystery 2", price: "1,993", seller: "breakingbad", views: 56, bg: "from-[#c7d2fe] to-[#a5f3fc]", vouches: 0 },
  { title: "NM Headless Horseman - 61kg", game: "Grow a Garden", price: "2,000", seller: "angel", views: 22, bg: "from-[#fed7aa] to-[#d9f99d]", vouches: 1 },
  { title: "Nightmare Peacock - 101.96kg", game: "Grow a Garden", price: "350", seller: "aimstair", views: 21, bg: "from-[#bbf7d0] to-[#bfdbfe]", vouches: 1 },
];

const trends: Array<[string, number]> = [
  ["Murder Mystery 2", 11],
  ["Steal a Brainrot", 8],
  ["Grow a Garden", 6],
  ["Roblox", 3],
  ["Blox Fruits", 1],
  ["Pet Simulator 99", 1],
];

const tradeSteps = [
  { title: "Find an item", body: "Browse listings by game, or search for a pet, item or unit. Every listing shows its price, its seller and how many people viewed it." },
  { title: "Message the seller", body: "Each listing has a Message button that opens a real-time chat. Buyer and seller agree on the details themselves." },
  { title: "Pay your way", body: "The two traders pick the method: GCash, PayPal, Robux or a cross-trade. RBMarket takes no cut." },
  { title: "Leave a vouch", body: "After the trade, the buyer vouches for the seller. Vouches build reputation and push trusted sellers up the rankings." },
];

const BrowserChrome = ({ url }: { url?: string }) => (
  <div className="flex h-9 items-center gap-[7px] bg-[#f0f0f2] px-3.5" aria-hidden="true">
    <span className="h-[11px] w-[11px] rounded-full bg-[#ff5f57]" />
    <span className="h-[11px] w-[11px] rounded-full bg-[#febc2e]" />
    <span className="h-[11px] w-[11px] rounded-full bg-[#28c840]" />
    {url && <span className="ml-4 max-w-[360px] flex-1 rounded-md bg-white px-2.5 py-[3px] text-xs text-[#747474]">{url}</span>}
  </div>
);

const SiteReplica = () => (
  <div className="mx-auto mt-16 max-w-[1040px] overflow-hidden rounded-t-2xl border border-b-0 border-[#e4e4e4] bg-[#fdfdfd] text-left text-[#0d0d0d] shadow-[0_-10px_60px_rgba(0,0,0,0.06)]">
    <BrowserChrome url="rbmarket.app" />
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e4e4e4] px-7 py-3.5">
      <span className="text-lg font-extrabold" style={{ color: BLUE }}>RBMarket</span>
      <span className="hidden flex-wrap gap-[22px] text-sm text-[#747474] sm:flex">
        <span>Marketplace</span>
        <span>Currency</span>
        <span>Hall of Shame</span>
        <span>Trends</span>
      </span>
      <span className="flex items-center gap-2.5 text-sm">
        <span>Login</span>
        <span className="rounded-[10px] px-3.5 py-[7px] text-[#f8f8f8]" style={{ background: BLUE }}>Sign Up</span>
      </span>
    </div>
    <div className="px-7 pb-7 pt-10" style={{ background: "linear-gradient(135deg, rgba(0,111,215,0.10), rgba(0,111,215,0.02))" }}>
      <div className="max-w-[560px] text-[clamp(24px,3vw,34px)] font-extrabold tracking-[-0.02em]">Trade In-Game Items Safely &amp; Anonymously</div>
      <div className="mt-2 text-[15px] text-[#747474]">Connect with buyers and sellers in the gaming community. No hidden fees, just trusted trading.</div>
      <div className="mt-4 flex gap-2.5 text-sm">
        <span className="rounded-[10px] px-4 py-[9px] text-[#f8f8f8]" style={{ background: BLUE }}>Browse Items</span>
        <span className="rounded-[10px] border border-[#e4e4e4] bg-white px-4 py-[9px]">Start Selling</span>
      </div>
    </div>
    <div className="px-7 pb-8 pt-6">
      <div className="text-lg font-bold">Featured Listings</div>
      <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {listings.map((item) => (
          <div key={item.title} className="overflow-hidden rounded-[10px] border border-[#e4e4e4] bg-white">
            <div className={`relative h-24 bg-gradient-to-br ${item.bg}`}>
              <span className="absolute left-2 top-2 rounded-md bg-black/55 px-1.5 py-0.5 text-[11px] text-white">{item.views} views</span>
            </div>
            <div className="px-3 py-2.5">
              <div className="truncate text-[13px] font-bold">{item.title}</div>
              <div className="text-xs text-[#747474]">{item.game}</div>
              <div className="mt-1.5 flex items-center justify-between">
                <span className="text-[15px] font-extrabold" style={{ color: BLUE }}>₱{item.price}</span>
                <span className="text-xs text-[#747474]">{item.seller}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const TradeFlow = () => {
  const [step, setStep] = useState(0);
  const [game, setGame] = useState("All");
  const [picked, setPicked] = useState(1);
  const [payment, setPayment] = useState("GCash");
  const [vouched, setVouched] = useState(false);
  const item = listings[picked];
  const results = listings.map((l, i) => ({ ...l, i })).filter((l) => game === "All" || l.game === game);

  return (
    <section id="trade" className="mx-auto max-w-[1080px] scroll-mt-14 px-[22px] py-[140px]">
      <p className="text-[17px] font-semibold" style={{ color: BLUE }}>01 · The trade flow</p>
      <h2 className="mt-2 text-[clamp(36px,5vw,56px)] font-bold leading-[1.07] tracking-[-0.025em]">From listing to vouch in four steps.</h2>

      <div role="tablist" aria-label="Trade steps" className="mt-10 grid grid-cols-2 border-b border-apple-hairline sm:grid-cols-4">
        {tradeSteps.map((s, i) => {
          const on = i === step;
          return (
            <button
              key={s.title}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls="trade-panel"
              onClick={() => setStep(i)}
              className={`px-2 pb-4 pt-3.5 text-left transition-opacity ${on ? "" : "opacity-55 hover:opacity-90"}`}
              style={on ? { boxShadow: `inset 0 -3px 0 ${BLUE}` } : undefined}
            >
              <span className="block text-[13px] text-apple-secondary">Step {i + 1}</span>
              <span className="mt-0.5 block text-[17px] font-semibold">{s.title}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-12">
        <div className="flex-[1_1_300px]" aria-live="polite">
          <div className="text-[28px] font-bold tracking-[-0.015em]">{tradeSteps[step].title}</div>
          <p className="mt-2.5 text-[19px] leading-[1.47] text-apple-secondary">{tradeSteps[step].body}</p>
          <button
            type="button"
            onClick={() => {
              if (step === 3) setVouched(false);
              setStep((step + 1) % 4);
            }}
            className="mt-[22px] min-h-11 rounded-full px-5 text-[15px] text-white"
            style={{ background: BLUE }}
          >
            {step === 3 ? "Start over" : "Next step →"}
          </button>
        </div>

        <div id="trade-panel" role="tabpanel" className="min-h-[380px] flex-[2_1_520px] overflow-hidden rounded-2xl border border-[#e4e4e4] bg-[#fdfdfd] text-[#0d0d0d]">
          {step === 0 && (
            <div className="p-[22px]">
              <div className="rounded-[10px] border border-[#e4e4e4] bg-white px-3 py-2.5 text-sm text-[#747474]">Search items, pets, units…</div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {["All", "Murder Mystery 2", "Grow a Garden"].map((g) => {
                  const on = g === game;
                  return (
                    <button
                      key={g}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setGame(g)}
                      className={`rounded-full border px-3 py-1.5 text-xs ${on ? "text-white" : "border-[#e4e4e4] bg-white"}`}
                      style={on ? { background: BLUE, borderColor: BLUE } : undefined}
                    >
                      {g}
                    </button>
                  );
                })}
              </div>
              <div className="mt-3.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {results.map((r) => (
                  <div key={r.title} className="rounded-[10px] border border-[#e4e4e4] bg-white p-2.5">
                    <div className={`h-[70px] rounded-md bg-gradient-to-br ${r.bg}`} />
                    <div className="mt-2 truncate text-[13px] font-bold">{r.title}</div>
                    <div className="text-xs text-[#747474]">{r.game} · {r.seller}</div>
                    <div className="mt-1.5 flex items-center justify-between">
                      <span className="font-extrabold" style={{ color: BLUE }}>₱{r.price}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setPicked(r.i);
                          setVouched(false);
                          setStep(1);
                        }}
                        className="rounded-lg px-2.5 py-1.5 text-xs text-white"
                        style={{ background: BLUE }}
                      >
                        Message
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="flex min-h-[380px] flex-col">
              <div className="flex items-center gap-2.5 border-b border-[#e4e4e4] px-[18px] py-3.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e4e4e4] text-xs font-bold">{item.seller.slice(0, 2).toUpperCase()}</span>
                <div>
                  <div className="text-sm font-bold">{item.seller}</div>
                  <div className="text-xs text-[#747474]">{item.title}</div>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-2.5 p-[18px] text-sm">
                <div className="max-w-[70%] self-end rounded-[14px_14px_4px_14px] px-3 py-2 text-[#f8f8f8]" style={{ background: BLUE }}>Hi! Is this still available?</div>
                <div className="max-w-[70%] self-start rounded-[14px_14px_14px_4px] bg-[#f0f0f2] px-3 py-2">Yes. GCash or Robux works for me.</div>
                <div className="max-w-[70%] self-end rounded-[14px_14px_4px_14px] px-3 py-2 text-[#f8f8f8]" style={{ background: BLUE }}>GCash. Sending now.</div>
              </div>
              <div className="border-t border-[#e4e4e4] px-[18px] py-3 text-[13px] text-[#747474]">Usernames only. No real names are shown.</div>
            </div>
          )}

          {step === 2 && (
            <div className="p-[26px]">
              <div className="text-[15px] font-bold">How do you want to pay?</div>
              <div role="radiogroup" aria-label="Payment method" className="mt-3.5 grid grid-cols-2 gap-2.5">
                {[
                  ["GCash", "E-wallet"],
                  ["PayPal", "Online payment"],
                  ["Robux", "In-game currency"],
                  ["Cross-trade", "Swap items"],
                ].map(([name, sub]) => {
                  const on = name === payment;
                  return (
                    <button
                      key={name}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      onClick={() => setPayment(name)}
                      className="rounded-[10px] bg-white p-3.5 text-left text-sm"
                      style={{ border: on ? `2px solid ${BLUE}` : "1px solid #e4e4e4", margin: on ? 0 : 1 }}
                    >
                      <span className="block font-bold">{name}</span>
                      <span className="mt-0.5 block text-xs text-[#747474]">{sub}</span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-[18px] text-[13px] text-[#747474]">Buyer and seller agree on terms themselves. RBMarket charges no fees.</div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col items-center p-8 text-center">
              <span className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#e4e4e4] text-2xl font-extrabold">{item.seller.slice(0, 2).toUpperCase()}</span>
              <div className="mt-3 text-xl font-extrabold">{item.seller}</div>
              <div className="text-[13px] text-[#747474]">Joined Dec 2025</div>
              <div className="mt-[18px] text-[44px] font-extrabold" style={{ color: GREEN }} aria-live="polite">
                {item.vouches + (vouched ? 1 : 0)}
              </div>
              <div className="text-[13px] text-[#747474]">vouches</div>
              <button
                type="button"
                onClick={() => setVouched((v) => !v)}
                className="mt-[18px] min-h-11 rounded-[10px] px-[18px] text-sm font-semibold text-white"
                style={{ background: vouched ? GREEN : BLUE }}
              >
                {vouched ? "Vouched ✓" : `Vouch for ${item.seller}`}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const RBMarket = () => (
  <PageTransition>
    <div className="min-h-screen bg-white text-apple-ink">
      <GlobalNav />
      <LocalNav
        name={app.name}
        homeHref="/rbmarket"
        icon={<AppIcon app={app} size={28} />}
        links={[
          { label: "A trade", href: "#trade" },
          { label: "Trending", href: "#trending" },
          { label: "Trust", href: "#trust" },
        ]}
        cta={{ label: "Open ↗", href: SITE_URL, color: BLUE }}
      />

      <section className="overflow-hidden bg-apple-gray px-[22px] pt-24 text-center">
        <p className="text-[21px] font-semibold" style={{ color: BLUE }}>RBMarket · Web app · Live at rbmarket.app</p>
        <h1 className="mx-auto mt-2.5 max-w-[960px] text-[clamp(44px,7.5vw,92px)] font-bold leading-[1.02] tracking-[-0.035em]">
          A marketplace for Roblox items.
        </h1>
        <p className="mx-auto mt-[22px] max-w-[640px] text-[21px] leading-[1.4] text-apple-secondary">
          Players buy and sell pets, items and units for cash. There are no hidden fees, trades stay anonymous, and trust comes from
          community vouches.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-7">
          <PillLink href={SITE_URL} background={BLUE} external>
            Visit rbmarket.app ↗
          </PillLink>
          <a href="#trade" className="text-[17px] text-apple-link hover:underline">
            Follow a trade ›
          </a>
        </div>
        <SiteReplica />
      </section>

      <TradeFlow />

      <section id="trending" className="scroll-mt-14 bg-apple-gray px-[22px] py-[140px]">
        <div className="mx-auto max-w-[980px]">
          <p className="text-[17px] font-semibold" style={{ color: BLUE }}>02 · Trending games</p>
          <h2 className="mt-2 text-[clamp(36px,5vw,52px)] font-bold leading-[1.07] tracking-[-0.025em]">What people are trading.</h2>
          <p className="mt-3 text-[19px] text-apple-secondary">Active listings by game, from the live site.</p>
          <div className="mt-10 flex flex-col gap-3.5">
            {trends.map(([name, count]) => (
              <div key={name} className="grid grid-cols-[minmax(110px,180px)_1fr_40px] items-center gap-4">
                <div className="text-[15px] font-semibold sm:text-[17px]">{name}</div>
                <div className="h-7 overflow-hidden rounded-lg bg-apple-fill">
                  <div className="h-full rounded-lg" style={{ width: `${(count / 11) * 100}%`, background: BLUE }} />
                </div>
                <div className="text-right text-[17px] font-semibold">{count}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="trust" className="mx-auto max-w-[980px] scroll-mt-14 px-[22px] py-[140px]">
        <p className="text-[17px] font-semibold" style={{ color: BLUE }}>03 · The trust layer</p>
        <h2 className="mt-2 text-[clamp(36px,5vw,52px)] font-bold leading-[1.07] tracking-[-0.025em]">Anonymous, but accountable.</h2>
        <div className="mt-10 flex flex-col border-b border-apple-hairline">
          {[
            ["Anonymous profiles", "Traders see usernames, not identities, so you can trade with confidence and stay private."],
            ["Community vouches", "Reputation comes from completed trades. Top Vouched Sellers are featured on the home page."],
            ["Hall of Shame", "Reported scammers are listed publicly, so the whole community knows who to avoid."],
          ].map(([title, body]) => (
            <div key={title} className="flex flex-wrap gap-6 border-t border-apple-hairline py-[26px]">
              <div className="flex-[0_0_240px] text-[21px] font-bold">{title}</div>
              <div className="flex-[1_1_380px] text-[19px] leading-[1.47] text-apple-body">{body}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="bg-apple-gray">
        <BehindTheBuild appName="RBMarket" stack="Next.js 14 · Prisma · Auth.js · Pusher · PayMongo · UploadThing · Tailwind CSS · Radix UI">
          <p>
            I built RBMarket solo in December 2025 as a full-stack marketplace for direct user-to-user negotiation. Messaging runs
            in real time over Pusher, and subscriptions are paid through the PayMongo API. With SEO as the only growth channel, it
            launched to <strong className="text-apple-ink">85 community members, 22 active listings and ₱7.3k in trade volume</strong>{" "}
            from 13 active traders.
          </p>
        </BehindTheBuild>
      </div>
      <SiteFooter />
    </div>
  </PageTransition>
);

export default RBMarket;
