import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import { Suspense, lazy, useCallback, useEffect, useRef } from "react";
import { setupGlobalErrorMonitoring } from "@/lib/monitoring";

const queryClient = new QueryClient();

const Index = lazy(() => import("./pages/Index.tsx"));
const SymmetryAI = lazy(() => import("./pages/SymmetryAI.tsx"));
const RBMarket = lazy(() => import("./pages/RBMarket.tsx"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.tsx"));
const TermsOfService = lazy(() => import("./pages/TermsOfService.tsx"));
const AccountDeletion = lazy(() => import("./pages/AccountDeletion.tsx"));
const AdminReports = lazy(() => import("./pages/AdminReports.tsx"));
const SpeedMath = lazy(() => import("./pages/SpeedMath.tsx"));
const SpeedSpell = lazy(() => import("./pages/SpeedSpell.tsx"));
const MaisonCarte = lazy(() => import("./pages/MaisonCarte.tsx"));
const SpeedMathPrivacy = lazy(() => import("./pages/SpeedMathPrivacy.tsx"));
const Test4Test = lazy(() => import("./pages/Test4Test.tsx"));
const Test4TestPrivacy = lazy(() => import("./pages/Test4TestPrivacy.tsx"));
const Test4TestAccountDeletion = lazy(() => import("./pages/Test4TestAccountDeletion.tsx"));
const ClipIt = lazy(() => import("./pages/ClipIt.tsx"));
const ClipItPrivacy = lazy(() => import("./pages/ClipItPrivacy.tsx"));
const ClipItTerms = lazy(() => import("./pages/ClipItTerms.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

interface RouteMetadata {
  title: string;
  description: string;
  canonicalPath: string;
  pageName: string;
  ogType: "website" | "article";
  ogImagePath: string;
  twitterCard: "summary" | "summary_large_image";
  robots?: string;
  schema?: Record<string, unknown>;
}

const SEO_SITE_URL = "https://www.aimteralabs.com";
const DEFAULT_OG_IMAGE_PATH = "/logo.png";

const withAbsoluteUrl = (path: string) => {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${SEO_SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};

const routeMetadata: Record<string, RouteMetadata> = {
  "/": {
    title: "Eric Mar Geonzon — Developer",
    description:
      "Eric Mar Geonzon builds mobile apps, web platforms and automations. Creator of Clip It, Speed Math, Speed Spell, Test4Test, RBMarket and Maison Carte.",
    canonicalPath: "/",
    pageName: "Home",
    ogType: "website",
    ogImagePath: "/logo.png",
    twitterCard: "summary_large_image",
    schema: {
      "@type": "ProfilePage",
      name: "Eric Mar Geonzon — Developer",
      url: SEO_SITE_URL,
      mainEntity: {
        "@type": "Person",
        name: "Eric Mar Geonzon",
        jobTitle: "Developer",
        url: SEO_SITE_URL,
        sameAs: ["https://github.com/Aimstair", "https://www.linkedin.com/in/eric-mar-geonzon"],
        alumniOf: { "@type": "CollegeOrUniversity", name: "University of San Jose–Recoletos" },
        worksFor: { "@type": "Organization", name: "Aimtera Labs", url: SEO_SITE_URL },
      },
    },
  },
  "/rbmarket": {
    title: "RBMarket | Aimtera Labs",
    description: "RBMarket is Aimtera's peer-to-peer Roblox item marketplace.",
    canonicalPath: "/rbmarket",
    pageName: "RBMarket",
    ogType: "website",
    ogImagePath: "/og-rbmarket.png",
    twitterCard: "summary_large_image",
    schema: {
      "@type": "SoftwareApplication",
      name: "RBMarket",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: `${SEO_SITE_URL}/rbmarket`,
      description: "RBMarket is Aimtera's peer-to-peer Roblox item marketplace.",
      image: `${SEO_SITE_URL}/og-rbmarket.png`,
      publisher: {
        "@type": "Organization",
        name: "Aimtera Labs",
        url: SEO_SITE_URL,
      },
    },
  },
  "/symmetryai": {
    title: "SymmetryAI | Aimtera Labs",
    description: "SymmetryAI provides AI-guided muscle balance and training insights.",
    canonicalPath: "/symmetryai",
    pageName: "SymmetryAI",
    ogType: "website",
    ogImagePath: "/og-symmetryai.png",
    twitterCard: "summary_large_image",
    schema: {
      "@type": "SoftwareApplication",
      name: "SymmetryAI",
      applicationCategory: "HealthApplication",
      operatingSystem: "Web",
      url: `${SEO_SITE_URL}/symmetryai`,
      description: "SymmetryAI provides AI-guided muscle balance and training insights.",
      image: `${SEO_SITE_URL}/og-symmetryai.png`,
      publisher: {
        "@type": "Organization",
        name: "Aimtera Labs",
        url: SEO_SITE_URL,
      },
    },
  },
  "/speedmath": {
    title: "Speed Math | Aimtera Labs",
    description: "Master math at lightning speed with Speed Math.",
    canonicalPath: "/speedmath",
    pageName: "Speed Math",
    ogType: "website",
    ogImagePath: "/logo.png",
    twitterCard: "summary_large_image",
    schema: {
      "@type": "SoftwareApplication",
      name: "Speed Math",
      applicationCategory: "GameApplication",
      operatingSystem: "Android",
      url: `${SEO_SITE_URL}/speedmath`,
      description: "Master math at lightning speed with Speed Math.",
      publisher: {
        "@type": "Organization",
        name: "Aimtera Labs",
        url: SEO_SITE_URL,
      },
    },
  },
  "/speedspell": {
    title: "Speed Spell | Aimtera Labs",
    description: "Speed Spell is a spelling bee trainer with 2,000+ words, six game modes and a Linguistic ELO rating.",
    canonicalPath: "/speedspell",
    pageName: "Speed Spell",
    ogType: "website",
    ogImagePath: "/logo.png",
    twitterCard: "summary_large_image",
    schema: {
      "@type": "SoftwareApplication",
      name: "Speed Spell",
      applicationCategory: "GameApplication",
      operatingSystem: "Android",
      url: `${SEO_SITE_URL}/speedspell`,
      description: "Speed Spell is a spelling bee trainer with 2,000+ words, six game modes and a Linguistic ELO rating.",
      publisher: {
        "@type": "Organization",
        name: "Aimtera Labs",
        url: SEO_SITE_URL,
      },
    },
  },
  "/maisoncarte": {
    title: "Maison Carte | Eric Mar Geonzon",
    description: "Maison Carte sends interactive greeting cards as small websites, sealed in wax and shared as one private link.",
    canonicalPath: "/maisoncarte",
    pageName: "Maison Carte",
    ogType: "website",
    ogImagePath: "/logo.png",
    twitterCard: "summary_large_image",
    schema: {
      "@type": "WebApplication",
      name: "Maison Carte",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web",
      url: "https://maisoncarte.app",
      description: "Interactive greeting cards delivered as micro-websites.",
      author: { "@type": "Person", name: "Eric Mar Geonzon" },
    },
  },
  "/speedmath/privacy": {
    title: "Speed Math Privacy Policy | Aimtera Labs",
    description: "Privacy policy for the Speed Math app.",
    canonicalPath: "/speedmath/privacy",
    pageName: "Speed Math Privacy Policy",
    ogType: "article",
    ogImagePath: "/logo.png",
    twitterCard: "summary",
    schema: {
      "@type": "CreativeWork",
      name: "Speed Math Privacy Policy",
      url: `${SEO_SITE_URL}/speedmath/privacy`,
      description: "Privacy policy for the Speed Math app.",
      publisher: {
        "@type": "Organization",
        name: "Aimtera Labs",
        url: SEO_SITE_URL,
      },
    },
  },
  "/test4test": {
    title: "Test4Test | Aimtera Labs",
    description: "Mutual app testing community for Google Play developers.",
    canonicalPath: "/test4test",
    pageName: "Test4Test",
    ogType: "website",
    ogImagePath: "/logo.png",
    twitterCard: "summary_large_image",
    schema: {
      "@type": "SoftwareApplication",
      name: "Test4Test",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Android",
      url: `${SEO_SITE_URL}/test4test`,
      description: "Mutual app testing community for Google Play developers.",
      publisher: {
        "@type": "Organization",
        name: "Aimtera Labs",
        url: SEO_SITE_URL,
      },
    },
  },
  "/test4test/privacy": {
    title: "Test4Test Privacy Policy | Aimtera Labs",
    description: "Privacy policy for the Test4Test mutual app testing service.",
    canonicalPath: "/test4test/privacy",
    pageName: "Test4Test Privacy Policy",
    ogType: "article",
    ogImagePath: "/logo.png",
    twitterCard: "summary",
  },
  "/test4test/account-deletion": {
    title: "Test4Test Account Deletion | Aimtera Labs",
    description: "Account deletion instructions for Test4Test.",
    canonicalPath: "/test4test/account-deletion",
    pageName: "Test4Test Account Deletion",
    ogType: "article",
    ogImagePath: "/logo.png",
    twitterCard: "summary",
  },
  "/clipit": {
    title: "Clip It | Aimtera Labs",
    description: "Capture anything on your screen, without leaving what you're doing.",
    canonicalPath: "/clipit",
    pageName: "Clip It",
    ogType: "website",
    ogImagePath: "/logo.png",
    twitterCard: "summary_large_image",
    schema: {
      "@type": "SoftwareApplication",
      name: "Clip It",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Android",
      url: `${SEO_SITE_URL}/clipit`,
      description: "Capture anything on your screen, without leaving what you're doing.",
      publisher: {
        "@type": "Organization",
        name: "Aimtera Labs",
        url: SEO_SITE_URL,
      },
    },
  },
  "/clipit/privacy": {
    title: "Clip It Privacy Policy | Aimtera Labs",
    description: "Privacy policy for the Clip It app.",
    canonicalPath: "/clipit/privacy",
    pageName: "Clip It Privacy Policy",
    ogType: "article",
    ogImagePath: "/logo.png",
    twitterCard: "summary",
  },
  "/clipit/terms": {
    title: "Clip It Terms of Service | Aimtera Labs",
    description: "Terms of Service for the Clip It app.",
    canonicalPath: "/clipit/terms",
    pageName: "Clip It Terms of Service",
    ogType: "article",
    ogImagePath: "/logo.png",
    twitterCard: "summary",
  },
  "/privacy": {
    title: "Privacy Policy | Aimtera Labs",
    description: "Read how Aimtera Labs handles privacy and personal data.",
    canonicalPath: "/privacy",
    pageName: "Privacy Policy",
    ogType: "article",
    ogImagePath: "/logo.png",
    twitterCard: "summary_large_image",
    schema: {
      "@type": "CreativeWork",
      name: "Aimtera Labs Privacy Policy",
      url: `${SEO_SITE_URL}/privacy`,
      description: "Read how Aimtera Labs handles privacy and personal data.",
      publisher: {
        "@type": "Organization",
        name: "Aimtera Labs",
        url: SEO_SITE_URL,
      },
    },
  },
  "/terms": {
    title: "Terms of Service | Aimtera Labs",
    description: "Review Aimtera Labs terms for product and platform usage.",
    canonicalPath: "/terms",
    pageName: "Terms of Service",
    ogType: "article",
    ogImagePath: "/logo.png",
    twitterCard: "summary_large_image",
    schema: {
      "@type": "CreativeWork",
      name: "Aimtera Labs Terms of Service",
      url: `${SEO_SITE_URL}/terms`,
      description: "Review Aimtera Labs terms for product and platform usage.",
      publisher: {
        "@type": "Organization",
        name: "Aimtera Labs",
        url: SEO_SITE_URL,
      },
    },
  },
  "/account-deletion": {
    title: "Account Deletion | Aimtera Labs",
    description: "Submit and verify an account deletion request for Aimtera services.",
    canonicalPath: "/account-deletion",
    pageName: "Account Deletion",
    ogType: "article",
    ogImagePath: "/logo.png",
    twitterCard: "summary_large_image",
    schema: {
      "@type": "CreativeWork",
      name: "Aimtera Labs Account Deletion",
      url: `${SEO_SITE_URL}/account-deletion`,
      description: "Submit and verify an account deletion request for Aimtera services.",
      publisher: {
        "@type": "Organization",
        name: "Aimtera Labs",
        url: SEO_SITE_URL,
      },
    },
  },
  "/admin/reports": {
    title: "Admin Reports | Aimtera Labs",
    description: "Operational dashboard for deletion queue, rate limits, and monitoring events.",
    canonicalPath: "/admin/reports",
    pageName: "Admin Reports",
    ogType: "website",
    ogImagePath: "/logo.png",
    twitterCard: "summary",
    robots: "noindex, nofollow",
  },
};

const upsertMeta = (attribute: "name" | "property", key: string, content: string) => {
  let tag = document.head.querySelector(`meta[${attribute}="${key}"]`) as
    | HTMLMetaElement
    | null;

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
};

const upsertCanonical = (href: string) => {
  let tag = document.head.querySelector('link[rel="canonical"]') as
    | HTMLLinkElement
    | null;

  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", "canonical");
    document.head.appendChild(tag);
  }

  tag.setAttribute("href", href);
};

const upsertRouteSchema = (schema: Record<string, unknown> | null) => {
  const existingScript = document.head.querySelector(
    'script[data-seo-schema="route"]',
  ) as HTMLScriptElement | null;

  if (!schema) {
    existingScript?.remove();
    return;
  }

  const script = existingScript || document.createElement("script");
  script.type = "application/ld+json";
  script.setAttribute("data-seo-schema", "route");
  script.textContent = JSON.stringify(schema);

  if (!existingScript) {
    document.head.appendChild(script);
  }
};

const upsertRobots = (value?: string) => {
  const existingTag = document.head.querySelector('meta[name="robots"]') as
    | HTMLMetaElement
    | null;

  if (!value) {
    existingTag?.remove();
    return;
  }

  let tag = existingTag;

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", "robots");
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", value);
};

const buildBreadcrumbSchema = (metadata: RouteMetadata, canonicalUrl: string) => {
  const itemListElement: Array<Record<string, unknown>> = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Eric Mar Geonzon",
      item: SEO_SITE_URL,
    },
  ];

  if (metadata.canonicalPath !== "/") {
    itemListElement.push({
      "@type": "ListItem",
      position: 2,
      name: metadata.pageName,
      item: canonicalUrl,
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };
};

const RouteLoadingFallback = () => (
  <div className="flex min-h-screen w-full items-center justify-center bg-white" role="status" aria-live="polite">
    <span className="h-6 w-6 animate-spin rounded-full border-2 border-apple-hairline border-t-apple-ink" />
    <span className="sr-only">Loading</span>
  </div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  const scrollPositionsRef = useRef<Record<string, number>>({});
  const initialPathRef = useRef(location.pathname);
  const previousPathRef = useRef(location.pathname);
  const pendingRestorePathRef = useRef<string | null>(null);

  useEffect(() => {
    const originalScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    if (initialPathRef.current !== "/" && !window.location.hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
    }

    return () => {
      window.history.scrollRestoration = originalScrollRestoration;
    };
  }, []);

  useEffect(() => {
    const previousPath = previousPathRef.current;
    if (previousPath === location.pathname) return;

    scrollPositionsRef.current[previousPath] = window.scrollY;
    pendingRestorePathRef.current = location.pathname;
    previousPathRef.current = location.pathname;
  }, [location.pathname]);

  useEffect(() => {
    const metadata =
      routeMetadata[location.pathname] ||
      ({
        title: "Page Not Found | Aimtera Labs",
        description: "The page you are looking for could not be found.",
        canonicalPath: location.pathname,
        pageName: "Page Not Found",
        ogType: "website",
        ogImagePath: DEFAULT_OG_IMAGE_PATH,
        twitterCard: "summary",
        robots: "noindex, nofollow",
      } satisfies RouteMetadata);

    const canonicalUrl = withAbsoluteUrl(metadata.canonicalPath);
    const absoluteImageUrl = withAbsoluteUrl(metadata.ogImagePath || DEFAULT_OG_IMAGE_PATH);

    document.title = metadata.title;
    upsertMeta("name", "description", metadata.description);
    upsertMeta("property", "og:site_name", "Eric Mar Geonzon");
    upsertMeta("property", "og:title", metadata.title);
    upsertMeta("property", "og:description", metadata.description);
    upsertMeta("property", "og:type", metadata.ogType);
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:image", absoluteImageUrl);
    upsertMeta("name", "twitter:card", metadata.twitterCard);
    upsertMeta("name", "twitter:title", metadata.title);
    upsertMeta("name", "twitter:description", metadata.description);
    upsertMeta("name", "twitter:image", absoluteImageUrl);

    upsertRobots(metadata.robots);

    const routeSchemaGraph = [metadata.schema, buildBreadcrumbSchema(metadata, canonicalUrl)].filter(
      Boolean,
    ) as Array<Record<string, unknown>>;

    upsertRouteSchema(
      routeSchemaGraph.length > 0
        ? {
            "@context": "https://schema.org",
            "@graph": routeSchemaGraph,
          }
        : null,
    );

    upsertCanonical(canonicalUrl);
  }, [location.pathname]);

  // Scroll to "#section" targets once the lazily loaded page has rendered them.
  useEffect(() => {
    if (!location.hash) return;
    const id = decodeURIComponent(location.hash.slice(1));
    let attempts = 0;
    const timer = window.setInterval(() => {
      const target = document.getElementById(id);
      attempts += 1;
      if (target) {
        window.clearInterval(timer);
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (attempts > 40) {
        window.clearInterval(timer);
      }
    }, 50);
    return () => window.clearInterval(timer);
  }, [location.pathname, location.hash]);

  const restorePendingScrollPosition = useCallback(() => {
    const targetPath = pendingRestorePathRef.current;
    if (!targetPath) return;

    pendingRestorePathRef.current = null;

    if (window.location.hash) return;

    const savedPosition = scrollPositionsRef.current[targetPath];

    // Main route should always restore to its previous position (or top on first visit).
    if (targetPath === "/") {
      const nextScroll = Number.isFinite(savedPosition) ? Math.max(0, savedPosition) : 0;
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      window.scrollTo({ top: Math.min(nextScroll, maxScroll), behavior: "auto" });
      return;
    }

    // Every non-main route opens at the top.
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <AnimatePresence mode="wait" onExitComplete={restorePendingScrollPosition}>
      <Suspense fallback={<RouteLoadingFallback />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Index />} />
          <Route path="/lume" element={<Navigate to="/" replace />} />
          <Route path="/symmetryai" element={<SymmetryAI />} />
          <Route path="/rbmarket" element={<RBMarket />} />
          <Route path="/speedmath" element={<SpeedMath />} />
          <Route path="/speedspell" element={<SpeedSpell />} />
          <Route path="/maisoncarte" element={<MaisonCarte />} />
          <Route path="/speedmath/privacy" element={<SpeedMathPrivacy />} />
          <Route path="/test4test" element={<Test4Test />} />
          <Route path="/test4test/privacy" element={<Test4TestPrivacy />} />
          <Route path="/test4test/account-deletion" element={<Test4TestAccountDeletion />} />
          <Route path="/clipit" element={<ClipIt />} />
          <Route path="/clipit/privacy" element={<ClipItPrivacy />} />
          <Route path="/clipit/terms" element={<ClipItTerms />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/account-deletion" element={<AccountDeletion />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

const AppShell = () => {
  useEffect(() => {
    setupGlobalErrorMonitoring();
  }, []);

  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppShell />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
