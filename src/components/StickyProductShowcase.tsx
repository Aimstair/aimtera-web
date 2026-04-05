import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import MagneticButton from "./MagneticButton";
import lumeMockup from "@/assets/lume-phone-mockup.png";
import symmetryMockup from "@/assets/symmetry-hero-phone.png";
import rbmarketMockup from "@/assets/rbmarket-hero-laptop.png";

interface Product {
  name: string;
  tagline: string;
  description: string;
  link: string;
  gradient: string;
  accentColor: string;
  textGradient: string;
  image: string;
  imageAlt: string;
  imageClass: string;
  status: "live" | "beta" | "development";
  ctaLabel: string;
  ctaExternal?: boolean;
  externalLink?: string;
}

const products: Product[] = [
  {
    name: "RBMarket",
    tagline: "The marketplace, democratized.",
    description: "Peer-to-peer trading with zero admin fees. Secure vouching, transparent reputation, and real-time negotiations. Live and ready to use.",
    link: "/rbmarket",
    gradient: "from-[hsl(220_20%_6%)] via-[hsl(160_15%_8%)] to-[hsl(200_20%_6%)]",
    accentColor: "hsl(145, 60%, 45%)",
    textGradient: "bg-clip-text text-transparent bg-gradient-to-r from-[hsl(145_60%_45%)] to-[hsl(200_80%_55%)]",
    image: rbmarketMockup,
    imageAlt: "RBMarket dashboard on MacBook",
    imageClass: "w-[420px] md:w-[520px] drop-shadow-2xl",
    status: "live",
    ctaLabel: "Launch App",
    ctaExternal: false,
    // externalLink: "https://rbmarket.app",
  },
  {
    name: "Lume",
    tagline: "Serendipity in your pocket.",
    description: "Share proximity-based messages with people you cross paths with every day. Proximity technology meets beautiful design.",
    link: "/lume",
    gradient: "from-[hsl(230_50%_6%)] via-[hsl(260_30%_10%)] to-[hsl(330_40%_8%)]",
    accentColor: "hsl(38, 92%, 50%)",
    textGradient: "text-gradient-lume",
    image: lumeMockup,
    imageAlt: "Lume app on iPhone",
    imageClass: "w-64 md:w-72 animate-float drop-shadow-2xl",
    status: "beta",
    ctaLabel: "Join Waitlist",
  },
  {
    name: "SymmetryAI",
    tagline: "Your body, decoded.",
    description: "AI-powered muscle analysis and personalized workout generation. Scan, analyze, and train smarter than ever before.",
    link: "/symmetryai",
    gradient: "from-[hsl(220_30%_5%)] via-[hsl(220_40%_8%)] to-[hsl(200_30%_6%)]",
    accentColor: "hsl(185, 80%, 55%)",
    textGradient: "text-gradient-symmetry",
    image: symmetryMockup,
    imageAlt: "SymmetryAI body scan",
    imageClass: "w-60 md:w-68 drop-shadow-2xl",
    status: "development",
    ctaLabel: "Join Waitlist",
  },
];

const StatusBadge = ({ status, accentColor }: { status: string; accentColor: string }) => {
  if (status === "live") {
    return (
      <span
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
        style={{
          background: `${accentColor}20`,
          color: accentColor,
          boxShadow: `0 0 15px ${accentColor}40, 0 0 30px ${accentColor}20`,
          animation: "glowPulse 2s ease-in-out infinite",
        }}
      >
        <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: accentColor }} />
        LIVE
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
      style={{
        background: `${accentColor}15`,
        color: accentColor,
        border: `1px solid ${accentColor}30`,
      }}
    >
      {status === "beta" ? "BETA" : "IN DEVELOPMENT"}
    </span>
  );
};

const StickyProductShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const totalHeight = container.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / totalHeight));
      const idx = Math.min(products.length - 1, Math.floor(p * products.length));
      setActiveIndex(idx);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const product = products[activeIndex];

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${products.length * 100 + 50}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {products.map((p, i) => (
          <div
            key={p.name}
            className={`absolute inset-0 bg-gradient-to-br ${p.gradient} transition-opacity duration-700`}
            style={{ opacity: i === activeIndex ? 1 : 0 }}
          />
        ))}

        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ opacity: 0.15 }}>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full blur-3xl animate-pulse-glow"
              style={{
                width: 100 + i * 40,
                height: 100 + i * 40,
                background: product.accentColor,
                left: `${20 + i * 15}%`,
                top: `${10 + i * 18}%`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>

        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <div className="mb-4">
                  <StatusBadge status={product.status} accentColor={product.accentColor} />
                </div>
                <h3
                  className={`text-5xl md:text-7xl font-bold mb-4 ${product.textGradient}`}
                  key={product.name}
                  style={{ animation: "fadeSlideIn 0.5s ease-out" }}
                >
                  {product.name}
                </h3>
                <p className="text-2xl md:text-3xl font-light mb-6" style={{ color: "hsl(0 0% 90%)" }}>
                  {product.tagline}
                </p>
                <p className="text-lg mb-8 max-w-lg" style={{ color: "hsl(0 0% 60%)" }}>
                  {product.description}
                </p>
                <MagneticButton as="div" className="inline-block">
                  {product.ctaExternal ? (
                    <a
                      href={product.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-semibold text-lg hover:gap-3 transition-all px-8 py-4 rounded-full"
                      style={{
                        background: `linear-gradient(135deg, ${product.accentColor}, ${product.accentColor}cc)`,
                        color: "hsl(220 20% 7%)",
                        boxShadow: `0 0 20px ${product.accentColor}40`,
                      }}
                    >
                      {product.ctaLabel} <ExternalLink className="w-5 h-5" />
                    </a>
                  ) : (
                    <Link
                      to={product.link}
                      className="inline-flex items-center gap-2 font-semibold text-lg hover:gap-3 transition-all px-8 py-4 rounded-full"
                      style={{
                        color: product.accentColor,
                        border: `1px solid ${product.accentColor}40`,
                        background: `${product.accentColor}10`,
                      }}
                    >
                      {product.ctaLabel} <ArrowRight className="w-5 h-5" />
                    </Link>
                  )}
                </MagneticButton>
              </div>

              <div className="flex justify-center">
                <img
                  key={product.name}
                  src={product.image}
                  alt={product.imageAlt}
                  className={product.imageClass}
                  style={{ animation: "fadeScaleIn 0.6s ease-out" }}
                />
              </div>
            </div>

            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3">
              {products.map((p, i) => (
                <div
                  key={p.name}
                  className="w-2 h-2 rounded-full transition-all duration-500"
                  style={{
                    background: i === activeIndex ? product.accentColor : "hsl(0 0% 30%)",
                    transform: i === activeIndex ? "scale(1.5)" : "scale(1)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StickyProductShowcase;
