import clipItIcon from "@/assets/apps/clipit-icon.png";
import speedMathIcon from "@/assets/apps/speedmath-icon.jpg";
import speedSpellIcon from "@/assets/apps/speedspell-icon.jpg";
import test4TestIcon from "@/assets/apps/test4test-icon.jpg";

export type AppPlatform = "mobile" | "web";

export interface AppLink {
  label: string;
  href: string;
}

export interface AppEntry {
  slug: string;
  name: string;
  platform: AppPlatform;
  category: string;
  status?: string;
  /** Short line used in the hero orbit and footers. */
  line: string;
  /** Image URL for the app icon, or a monogram rendered on `monoBg`. */
  icon?: string;
  mono?: string;
  monoBg?: string;
  storeUrl?: string;
  siteUrl?: string;
  legal: AppLink[];
}

const playStore = (id: string) => `https://play.google.com/store/apps/details?id=com.aimteralabs.${id}`;

export const apps: AppEntry[] = [
  {
    slug: "clipit",
    name: "Clip It",
    platform: "mobile",
    category: "Tools",
    line: "Saves the last 60 seconds of your screen with a double-tap.",
    icon: clipItIcon,
    storeUrl: playStore("clipit"),
    legal: [
      { label: "Clip It Privacy Policy", href: "/clipit/privacy" },
      { label: "Clip It Terms of Service", href: "/clipit/terms" },
    ],
  },
  {
    slug: "speedmath",
    name: "Speed Math",
    platform: "mobile",
    category: "Educational",
    line: "Mental arithmetic, flashed as fast as 0.4 seconds per number.",
    icon: speedMathIcon,
    storeUrl: playStore("speedmath"),
    legal: [{ label: "Speed Math Privacy Policy", href: "/speedmath/privacy" }],
  },
  {
    slug: "speedspell",
    name: "Speed Spell",
    platform: "mobile",
    category: "Word game",
    line: "Spelling bee training with a Linguistic ELO rating.",
    icon: speedSpellIcon,
    storeUrl: playStore("speedspell"),
    legal: [],
  },
  {
    slug: "test4test",
    name: "Test4Test",
    platform: "mobile",
    category: "Productivity",
    line: "Gets Android developers through Google Play closed testing.",
    icon: test4TestIcon,
    storeUrl: playStore("test4test"),
    legal: [
      { label: "Test4Test Privacy Policy", href: "/test4test/privacy" },
      { label: "Test4Test Account Deletion", href: "/test4test/account-deletion" },
    ],
  },
  {
    slug: "symmetryai",
    name: "SymmetryAI",
    platform: "mobile",
    category: "Health and fitness",
    status: "In development",
    line: "AI-guided muscle balance and training insights.",
    mono: "S",
    monoBg: "#0f172a",
    legal: [],
  },
  {
    slug: "rbmarket",
    name: "RBMarket",
    platform: "web",
    category: "Marketplace",
    status: "Live",
    line: "A peer-to-peer marketplace for Roblox items.",
    mono: "RB",
    monoBg: "#006fd7",
    siteUrl: "https://rbmarket.app",
    legal: [],
  },
  {
    slug: "maisoncarte",
    name: "Maison Carte",
    platform: "web",
    category: "Greeting cards",
    status: "Live",
    line: "Interactive greeting cards, sealed in wax and sent as one link.",
    mono: "MC",
    monoBg: "#5c1a23",
    siteUrl: "https://maisoncarte.app",
    legal: [],
  },
];

export const getApp = (slug: string) => {
  const app = apps.find((entry) => entry.slug === slug);
  if (!app) throw new Error(`Unknown app: ${slug}`);
  return app;
};

/** Aimtera Labs-wide policies that Google Play listings point to. */
export const studioLegal: AppLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Account Deletion", href: "/account-deletion" },
];

export const SUPPORT_EMAIL = "support@aimteralabs.com";
