import { useState } from "react";
import { Link } from "react-router-dom";
import GlobalNav from "@/components/site/GlobalNav";
import SiteFooter from "@/components/site/SiteFooter";
import AppIcon from "@/components/site/AppIcon";
import Segmented from "@/components/site/Segmented";
import PageTransition from "@/components/PageTransition";
import { apps, getApp, AppEntry } from "@/content/apps";
import { experience, profile, toolbox, workStages } from "@/content/profile";
import clipItVault from "@/assets/apps/clipit-04.png";
import speedMathHome from "@/assets/apps/speedmath-01.png";
import speedSpellRound from "@/assets/apps/speedspell-02.png";
import test4TestProof from "@/assets/apps/test4test-03.png";
import symmetryPhone from "@/assets/symmetry-hero-phone.png";
import maisonCarteHero from "@/assets/apps/maisoncarte-hero.jpg";

/* Icon positions around the portrait, in px within a 380px square. */
const orbitPositions: Record<string, { x: number; y: number }> = {
  clipit: { x: 150, y: 0 },
  speedmath: { x: 300, y: 92 },
  speedspell: { x: 268, y: 282 },
  test4test: { x: 32, y: 282 },
  rbmarket: { x: 0, y: 92 },
  maisoncarte: { x: 150, y: 300 },
};

const Hero = () => {
  const orbitApps = apps.filter((app) => app.slug in orbitPositions);
  const [selected, setSelected] = useState(orbitApps[0].slug);
  const current = getApp(selected);

  return (
    <section id="top" className="mx-auto flex max-w-[1120px] flex-wrap items-center gap-12 px-[22px] pb-[72px] pt-24">
      <div className="min-w-0 flex-[999_1_480px]">
        <p className="text-[21px] font-semibold text-apple-secondary">{profile.role}</p>
        <h1 className="mt-3 text-[clamp(56px,8vw,104px)] font-bold leading-none tracking-[-0.035em]">
          Hi, I'm {profile.firstName}.
        </h1>
        <p className="mt-7 max-w-[560px] text-2xl leading-[1.33]">
          I build mobile apps, web platforms and automations, from the first sketch to production.
        </p>
        <p className="mt-3 max-w-[560px] text-[19px] leading-[1.47] text-apple-secondary">
          Four of my apps are live on Google Play under my studio, Aimtera Labs. Two of my products run on the web: a
          marketplace and an interactive greeting-card studio. At work, I build automation systems at Belli AI.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-7">
          <a
            href="#experience"
            className="inline-flex min-h-11 items-center rounded-full bg-apple-blue px-6 text-[17px] text-white transition-opacity hover:opacity-90"
          >
            See my experience
          </a>
          <a href="#apps" className="text-[17px] text-apple-link hover:underline">
            Explore my apps ›
          </a>
          <a href="#contact" className="text-[17px] text-apple-link hover:underline">
            Get in touch ›
          </a>
        </div>
      </div>

      <div className="flex flex-[1_1_380px] flex-col items-center gap-5">
        <div className="h-[380px] w-[380px] max-[420px]:h-[304px] max-[420px]:w-[304px]">
        <div className="relative h-[380px] w-[380px] origin-top-left max-[420px]:scale-[0.8]">
          <div aria-hidden="true" className="absolute inset-5 rounded-full border border-dashed border-apple-hairline" />
          <div className="absolute left-[90px] top-[90px] flex h-[200px] w-[200px] items-center justify-center rounded-full bg-gradient-to-b from-apple-gray to-[#e8e8ed] text-[64px] font-bold tracking-[-0.03em] text-apple-tertiary">
            EG
          </div>
          {orbitApps.map((app) => {
            const on = app.slug === selected;
            const pos = orbitPositions[app.slug];
            return (
              <button
                key={app.slug}
                type="button"
                onClick={() => setSelected(app.slug)}
                aria-label={app.name}
                aria-pressed={on}
                className={`absolute overflow-hidden rounded-[20px] border-[3px] transition-all duration-300 ${
                  on
                    ? "scale-110 border-apple-blue shadow-[0_12px_30px_rgba(0,0,0,0.18)]"
                    : "border-white shadow-[0_6px_18px_rgba(0,0,0,0.1)] hover:scale-105"
                }`}
                style={{ left: pos.x, top: pos.y }}
              >
                <AppIcon app={app} size={74} className="!rounded-[17px]" />
              </button>
            );
          })}
        </div>
        </div>
        <div className="min-h-16 max-w-[340px] text-center" aria-live="polite">
          <div className="text-[17px] font-semibold">
            {current.name}{" "}
            <span className="font-normal text-apple-secondary">· {current.platform === "mobile" ? "Android" : "Web"}</span>
          </div>
          <div className="mt-1 text-[15px] text-apple-secondary">{current.line}</div>
        </div>
      </div>
    </section>
  );
};

const Experience = () => {
  const [index, setIndex] = useState(0);
  const role = experience[index];

  return (
    <section id="experience" className="scroll-mt-12 bg-black px-[22px] py-[120px] text-[#f5f5f7]">
      <div className="mx-auto max-w-[1120px]">
        <p className="text-[17px] font-semibold text-apple-link-dark">Experience</p>
        <h2 className="mt-2 text-[clamp(44px,6vw,72px)] font-bold leading-[1.04] tracking-[-0.03em]">
          Where I've built things.
        </h2>
        <p className="mt-3.5 max-w-[640px] text-[21px] leading-[1.4] text-[#a1a1a6]">
          Automation systems, enterprise front ends and apps of my own. Select a role.
        </p>

        <div className="mt-14 flex flex-wrap items-stretch gap-10">
          <div
            role="tablist"
            aria-label="Roles"
            aria-orientation="vertical"
            className="relative flex flex-[1_1_320px] flex-col border-l-2 border-[#2c2c2e] pl-[22px]"
          >
            {experience.map((item, i) => {
              const on = i === index;
              return (
                <button
                  key={item.company}
                  type="button"
                  role="tab"
                  id={`role-tab-${i}`}
                  aria-selected={on}
                  aria-controls="role-panel"
                  onClick={() => setIndex(i)}
                  className={`relative py-4 pl-1.5 text-left transition-colors ${on ? "text-[#f5f5f7]" : "text-[#a1a1a6] hover:text-[#f5f5f7]"}`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute -left-[31px] top-[22px] h-4 w-4 rounded-full transition-all ${
                      on ? "bg-apple-link-dark shadow-[0_0_0_5px_rgba(41,151,255,0.25)]" : "border-2 border-[#48484a] bg-black"
                    }`}
                  />
                  <span className={`block text-[13px] font-semibold ${on ? "text-apple-link-dark" : "text-apple-tertiary"}`}>
                    {item.period}
                  </span>
                  <span className="mt-0.5 block text-[19px] font-semibold tracking-[-0.01em]">{item.company}</span>
                  <span className="mt-0.5 block text-sm text-apple-tertiary">{item.short}</span>
                </button>
              );
            })}
          </div>

          <div
            id="role-panel"
            role="tabpanel"
            aria-labelledby={`role-tab-${index}`}
            className="flex min-h-[520px] flex-[2_1_520px] flex-col rounded-[28px] bg-[#1d1d1f] px-7 py-10 sm:px-11 sm:py-12"
          >
            <div className="flex flex-wrap items-center gap-3">
              {role.now && (
                <span className="rounded-full bg-apple-link-dark px-3 py-1 text-xs font-bold tracking-[0.04em] text-black">NOW</span>
              )}
              <span className="text-[15px] text-[#a1a1a6]">
                {role.period} · {role.place}
              </span>
            </div>
            <h3 className="mt-[18px] text-[clamp(32px,3.6vw,44px)] font-bold leading-[1.08] tracking-[-0.025em]">{role.title}</h3>
            <div className="mt-1.5 text-[21px] font-semibold text-apple-link-dark">{role.company}</div>
            <p className="mt-[22px] text-[21px] leading-[1.43]">{role.lead}</p>
            <ul className="mt-[22px] flex flex-col">
              {role.points.map((point) => (
                <li key={point} className="flex gap-3.5 border-t border-[#333336] py-3.5 text-[17px] leading-normal text-[#c7c7cc]">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-apple-link-dark" />
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-wrap gap-2 pt-6">
              {role.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-[#424245] px-3.5 py-1.5 text-[13px] text-apple-hairline">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HowIWork = () => {
  const [step, setStep] = useState(0);
  const stage = workStages[step];

  return (
    <section id="work" className="mx-auto max-w-[980px] px-[22px] pb-[100px] pt-[120px]">
      <h2 className="text-[clamp(40px,5vw,56px)] font-bold leading-[1.07] tracking-[-0.025em]">From idea to the Play Store.</h2>
      <p className="mt-3 text-[21px] text-apple-secondary">Select a stage.</p>

      <div className="relative mt-14">
        <div aria-hidden="true" className="absolute left-[10%] right-[10%] top-[27px] h-0.5 bg-apple-hairline" />
        <div
          aria-hidden="true"
          className="absolute left-[10%] top-[27px] h-0.5 bg-apple-blue transition-all duration-500"
          style={{ width: `${(step / (workStages.length - 1)) * 80}%` }}
        />
        <div className="relative grid grid-cols-5 gap-2">
          {workStages.map((item, i) => {
            const on = i === step;
            const done = i <= step;
            return (
              <button
                key={item.title}
                type="button"
                aria-pressed={on}
                onClick={() => setStep(i)}
                className="flex flex-col items-center gap-3"
              >
                <span
                  className={`flex h-14 w-14 items-center justify-center rounded-full text-[19px] font-bold transition-all ${
                    on
                      ? "bg-apple-blue text-white shadow-[0_0_0_8px_rgba(0,113,227,0.15)]"
                      : done
                        ? "border-2 border-apple-blue bg-white text-apple-blue"
                        : "border-2 border-apple-hairline bg-white text-apple-tertiary"
                  }`}
                >
                  {i + 1}
                </span>
                <span className="text-center text-[13px] font-semibold sm:text-[15px]">{item.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-12 flex min-h-40 flex-wrap items-start gap-8 border-t border-apple-hairline pt-9" aria-live="polite">
        <div className="flex-[1_1_260px]">
          <div className="text-[15px] font-semibold text-apple-blue">Stage {step + 1}</div>
          <div className="mt-1.5 text-[32px] font-bold tracking-[-0.02em]">{stage.title}</div>
        </div>
        <div className="flex-[2_1_420px]">
          <p className="text-[21px] leading-[1.43]">{stage.body}</p>
          <p className="mt-3.5 text-[17px] text-apple-secondary">{stage.example}</p>
        </div>
      </div>
    </section>
  );
};

const Toolbox = () => (
  <section className="mx-auto max-w-[980px] px-[22px] pb-[120px]">
    <h2 className="mb-2 text-[32px] font-bold tracking-[-0.02em]">Toolbox</h2>
    <div className="flex flex-col border-b border-apple-hairline">
      {toolbox.map((row) => (
        <div key={row.label} className="flex flex-wrap gap-x-8 gap-y-2 border-t border-apple-hairline py-[22px]">
          <div className="flex-[0_0_180px] text-[17px] font-semibold">{row.label}</div>
          <div className="flex-[1_1_400px] text-[17px] leading-relaxed text-apple-body">{row.items}</div>
        </div>
      ))}
    </div>
  </section>
);

interface TileProps {
  app: AppEntry;
  headline: string;
  body: string;
  background: string;
  dark?: boolean;
  linkColor: string;
  exploreLabel: string;
  media: React.ReactNode;
  wide?: boolean;
}

const AppTile = ({ app, headline, body, background, dark = false, linkColor, exploreLabel, media, wide = false }: TileProps) => {
  const external = app.storeUrl ?? app.siteUrl;
  return (
    <article
      className={`flex min-h-[600px] flex-col overflow-hidden rounded-[28px] ${wide ? "md:col-span-2" : ""}`}
      style={{ background, color: dark ? "#f5f5f7" : "#1d1d1f" }}
    >
      <div className="px-7 pt-12 sm:px-10">
        <div className="flex items-center gap-3.5">
          <AppIcon app={app} size={56} />
          <div>
            <div className="text-[21px] font-semibold">{app.name}</div>
            <div className={`text-sm ${dark ? "text-white/60" : "text-black/55"}`}>
              {app.category} · {app.platform === "mobile" ? "Android" : "Web"}
              {app.status ? ` · ${app.status}` : ""}
            </div>
          </div>
        </div>
        <h3 className="mt-6 max-w-[620px] text-[clamp(30px,3.4vw,36px)] font-bold leading-[1.1] tracking-[-0.02em]">{headline}</h3>
        <p className={`mt-2.5 max-w-[620px] text-[17px] leading-[1.47] ${dark ? "text-white/65" : "text-black/60"}`}>{body}</p>
        <div className="mt-4 flex flex-wrap gap-6 text-[17px]">
          <Link to={`/${app.slug}`} className="hover:underline" style={{ color: linkColor }}>
            {exploreLabel} ›
          </Link>
          {external && (
            <a href={external} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: linkColor }}>
              {app.storeUrl ? "Google Play ›" : `${new URL(external).hostname} ↗`}
            </a>
          )}
        </div>
      </div>
      <div className="mt-auto pt-8">{media}</div>
    </article>
  );
};

const Apps = () => {
  const [tab, setTab] = useState<"mobile" | "web">("mobile");
  const mobileCount = apps.filter((a) => a.platform === "mobile").length;
  const webCount = apps.filter((a) => a.platform === "web").length;

  return (
    <section id="apps" className="scroll-mt-12 bg-apple-gray px-3 pb-3 pt-[120px]">
      <div className="mx-auto max-w-[980px] px-2.5 text-center">
        <h2 className="text-[clamp(40px,5vw,56px)] font-bold leading-[1.07] tracking-[-0.025em]">Things I've built.</h2>
        <Segmented
          className="mt-8"
          ariaLabel="Platform"
          value={tab}
          onChange={setTab}
          options={[
            { value: "mobile", label: `Mobile apps · ${mobileCount}` },
            { value: "web", label: `Web apps · ${webCount}` },
          ]}
        />
      </div>

      {tab === "mobile" ? (
        <div className="mx-auto mt-12 grid max-w-[1240px] gap-3 md:grid-cols-2">
          <AppTile
            app={getApp("clipit")}
            headline="Never miss a highlight."
            body="Double-tap a floating bubble to save the last 15–60 seconds, even though you never hit record."
            background="#0b0b0d"
            dark
            linkColor="#ff7a59"
            exploreLabel="See how it works"
            media={
              <div className="h-[300px] overflow-hidden px-7 sm:px-10">
                <img src={clipItVault} alt="Clip It Vault screen" className="h-full w-full rounded-t-[18px] object-cover object-[center_62%]" />
              </div>
            }
          />
          <AppTile
            app={getApp("speedmath")}
            headline="Numbers flash. You add them up."
            body="Mental arithmetic training, from one-digit sums all the way to Olympiad speed."
            background="#e4e6ea"
            linkColor="#0066cc"
            exploreLabel="Try a round"
            media={<img src={speedMathHome} alt="Speed Math splash and home screens" className="h-[300px] w-full object-cover object-[center_85%]" />}
          />
          <AppTile
            app={getApp("speedspell")}
            headline="Hear it. Spell it."
            body="A spelling bee trainer with 2,000+ words, six game modes and a Linguistic ELO rating."
            background="#e4e6ea"
            linkColor="#0066cc"
            exploreLabel="Spell a word"
            media={
              <div className="flex h-[300px] justify-center overflow-hidden">
                <img src={speedSpellRound} alt="Speed Spell spelling screen" className="h-full w-[420px] max-w-full object-cover object-[center_46%]" />
              </div>
            }
          />
          <AppTile
            app={getApp("test4test")}
            headline="Find 20 testers. Keep them for 14 days."
            body="A test-for-test community that gets Android developers through Google Play's closed-testing requirement."
            background="#1b1740"
            dark
            linkColor="#a5b4fc"
            exploreLabel="See the loop"
            media={<img src={test4TestProof} alt="Test4Test daily proof screenshot" className="h-[300px] w-full object-cover object-[center_70%]" />}
          />
          <AppTile
            app={getApp("symmetryai")}
            headline="Your body, decoded."
            body="AI-guided muscle balance and training insights, built with React Native, the device camera and Supabase."
            background="#0f172a"
            dark
            linkColor="#22d3ee"
            exploreLabel="Join the waitlist"
            wide
            media={
              <div className="flex h-[300px] justify-center overflow-hidden">
                <img src={symmetryPhone} alt="SymmetryAI concept on a phone" className="h-full w-[420px] max-w-full object-cover object-top" />
              </div>
            }
          />
        </div>
      ) : (
        <div className="mx-auto mt-12 grid max-w-[1240px] gap-3 md:grid-cols-2">
          <AppTile
            app={getApp("maisoncarte")}
            headline="Greeting cards you open like a gift."
            body="Interactive cards delivered as small websites, sealed in wax and sent as one private link. Scratch-offs, candles and cinema reels, from $1."
            background="#f9f5ee"
            linkColor="#5c1a23"
            exploreLabel="Open a card"
            media={
              <div className="h-[300px] overflow-hidden px-7 sm:px-10">
                <img src={maisonCarteHero} alt="Cream envelope with a burgundy wax seal" className="h-full w-full rounded-t-[18px] object-cover" />
              </div>
            }
          />
          <AppTile
            app={getApp("rbmarket")}
            headline="Trade in-game items safely and anonymously."
            body="A full-stack peer-to-peer marketplace for Roblox items, with real-time chat, community vouches and PayMongo subscriptions. It launched on SEO alone and reached 85 members and ₱7.3k in trade volume."
            background="#ffffff"
            linkColor="#0066cc"
            exploreLabel="Follow a trade"
            media={
              <div className="px-7 sm:px-10">
                <div className="overflow-hidden rounded-t-[14px] border border-b-0 border-[#e4e4e4] bg-[#fdfdfd]">
                  <div className="flex h-7 items-center gap-1.5 bg-[#f0f0f2] px-3" aria-hidden="true">
                    <span className="h-[9px] w-[9px] rounded-full bg-[#ff5f57]" />
                    <span className="h-[9px] w-[9px] rounded-full bg-[#febc2e]" />
                    <span className="h-[9px] w-[9px] rounded-full bg-[#28c840]" />
                  </div>
                  <div className="grid grid-cols-2 gap-2.5 p-[18px]">
                    {[
                      { title: "CELESTIAL KNIFE MM2 GODLY", game: "Murder Mystery 2", price: "₱1,993", bg: "from-[#dbeafe] to-[#e0e7ff]" },
                      { title: "Nightmare Peacock · 101.96kg", game: "Grow a Garden", price: "₱350", bg: "from-[#dcfce7] to-[#fef9c3]" },
                    ].map((item) => (
                      <div key={item.title} className="rounded-[10px] border border-[#e4e4e4] p-2.5">
                        <div className={`h-[70px] rounded-md bg-gradient-to-br ${item.bg}`} />
                        <div className="mt-2 truncate text-xs font-semibold text-[#0d0d0d]">{item.title}</div>
                        <div className="text-[11px] text-[#747474]">{item.game}</div>
                        <div className="mt-1 text-[13px] font-bold text-[#006fd7]">{item.price}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            }
          />
        </div>
      )}
      <p className="pb-24 pt-7 text-center text-sm text-apple-secondary">Mobile apps are published by Aimtera Labs.</p>
    </section>
  );
};

const Contact = () => (
  <section id="contact" className="scroll-mt-12 px-3 pb-3 pt-3">
    <div className="rounded-[28px] bg-black px-6 py-28 text-center text-[#f5f5f7]">
      <h2 className="text-[clamp(40px,6vw,72px)] font-bold leading-[1.05] tracking-[-0.03em]">Let's build something.</h2>
      <p className="mx-auto mt-[18px] max-w-[520px] text-[21px] leading-[1.38] text-[#a1a1a6]">
        Open to freelance work, collaborations and full-time roles.
      </p>
      <div className="mt-9 flex flex-wrap items-center justify-center gap-7">
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex min-h-11 items-center rounded-full bg-[#f5f5f7] px-6 text-[17px] text-apple-ink transition-opacity hover:opacity-90"
        >
          {profile.email}
        </a>
        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-[17px] text-apple-link-dark hover:underline">
          GitHub ›
        </a>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-[17px] text-apple-link-dark hover:underline">
          LinkedIn ›
        </a>
      </div>
    </div>
  </section>
);

const Index = () => (
  <PageTransition>
    <div className="min-h-screen bg-white text-apple-ink">
      <GlobalNav sticky />
      <Hero />
      <Experience />
      <HowIWork />
      <Toolbox />
      <Apps />
      <Contact />
      <SiteFooter />
    </div>
  </PageTransition>
);

export default Index;
