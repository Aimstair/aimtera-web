import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import { Suspense, lazy, useCallback, useEffect, useRef, useState } from "react";
import CustomCursor from "@/components/CustomCursor";
import ChatbotWidget from "./components/ChatbotWidget";
import { setupGlobalErrorMonitoring } from "@/lib/monitoring";

const queryClient = new QueryClient();

const Index = lazy(() => import("./pages/Index.tsx"));
const Lume = lazy(() => import("./pages/Lume.tsx"));
const SymmetryAI = lazy(() => import("./pages/SymmetryAI.tsx"));
const RBMarket = lazy(() => import("./pages/RBMarket.tsx"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.tsx"));
const TermsOfService = lazy(() => import("./pages/TermsOfService.tsx"));
const AccountDeletion = lazy(() => import("./pages/AccountDeletion.tsx"));
const AdminReports = lazy(() => import("./pages/AdminReports.tsx"));
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
    title: "Aimtera Labs",
    description: "Aimtera Labs builds RBMarket, Lume, and SymmetryAI.",
    canonicalPath: "/",
    pageName: "Home",
    ogType: "website",
    ogImagePath: "/logo.png",
    twitterCard: "summary_large_image",
    schema: {
      "@type": "WebSite",
      name: "Aimtera Labs",
      url: SEO_SITE_URL,
      description: "Aimtera Labs builds RBMarket, Lume, and SymmetryAI.",
      publisher: {
        "@type": "Organization",
        name: "Aimtera Labs",
        url: SEO_SITE_URL,
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
  "/lume": {
    title: "Lume | Aimtera Labs",
    description: "Lume is a proximity-first social messaging experience.",
    canonicalPath: "/lume",
    pageName: "Lume",
    ogType: "website",
    ogImagePath: "/og-lume.png",
    twitterCard: "summary_large_image",
    schema: {
      "@type": "SoftwareApplication",
      name: "Lume",
      applicationCategory: "SocialNetworkingApplication",
      operatingSystem: "Web",
      url: `${SEO_SITE_URL}/lume`,
      description: "Lume is a proximity-first social messaging experience.",
      image: `${SEO_SITE_URL}/og-lume.png`,
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
      name: "Aimtera Labs",
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

const RouteLoadingFallback = () => {
  const loadingSteps = [
    "Preparing your experience",
    "Optimizing visuals and interactions",
    "Finalizing route transition",
  ];
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setStepIndex((current) => (current + 1) % loadingSteps.length);
    }, 1100);

    return () => {
      window.clearInterval(interval);
    };
  }, [loadingSteps.length]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-6" role="status" aria-live="polite">
      <div className="w-full max-w-sm rounded-2xl border border-border/70 bg-background/95 backdrop-blur-sm p-6 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12 shrink-0">
            <div className="absolute inset-0 rounded-full border-2 border-muted" />
            <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold text-foreground">Loading Aimtera Labs</p>
            <p className="text-xs text-muted-foreground">{loadingSteps[stepIndex]}</p>
          </div>
        </div>

        <div className="mt-5 h-1.5 rounded-full bg-muted overflow-hidden">
          <div className="h-full w-1/2 rounded-full bg-primary animate-pulse" />
        </div>

        <div className="mt-4 flex gap-2" aria-hidden="true">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce" />
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:120ms]" />
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:240ms]" />
        </div>
      </div>
    </div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();
  const scrollPositionsRef = useRef<Record<string, number>>({});
  const initialPathRef = useRef(location.pathname);
  const previousPathRef = useRef(location.pathname);
  const pendingRestorePathRef = useRef<string | null>(null);

  useEffect(() => {
    const originalScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    if (initialPathRef.current !== "/") {
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
    upsertMeta("property", "og:site_name", "Aimtera Labs");
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

  const restorePendingScrollPosition = useCallback(() => {
    const targetPath = pendingRestorePathRef.current;
    if (!targetPath) return;

    pendingRestorePathRef.current = null;

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
          <Route path="/lume" element={<Lume />} />
          <Route path="/symmetryai" element={<SymmetryAI />} />
          <Route path="/rbmarket" element={<RBMarket />} />
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
      <ChatbotWidget />
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CustomCursor />
      <Toaster />
      <Sonner />
      <AppShell />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
