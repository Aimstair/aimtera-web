import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X, ArrowLeft } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  const isLume = location.pathname.startsWith("/lume");
  const isSymmetry = location.pathname.startsWith("/symmetryai");
  const isRBMarket = location.pathname.startsWith("/rbmarket");
  const isProductPage = isLume || isSymmetry || isRBMarket;
  const isLegal = ["/privacy", "/terms", "/account-deletion", "/admin/reports"].includes(location.pathname);

  const navClasses = isLume
    ? "bg-lume-bg/90 border-b border-lume-amber/10 backdrop-blur-xl"
    : isSymmetry
    ? "bg-symmetry-bg/90 border-b border-symmetry-cyan/10 backdrop-blur-xl"
    : isRBMarket
    ? "bg-rbmarket-bg/90 border-b border-rbmarket-accent/10 backdrop-blur-xl"
    : "bg-[hsl(220_20%_7%_/_0.9)] border-b border-[hsl(0_0%_100%_/_0.06)] backdrop-blur-xl";

  const linkClasses = isLume
    ? "text-lume-foreground/70 hover:text-lume-amber transition-colors"
    : isSymmetry
    ? "text-lume-foreground/70 hover:text-symmetry-cyan transition-colors"
    : isRBMarket
    ? "text-lume-foreground/70 hover:text-rbmarket-accent transition-colors"
    : "text-[hsl(0_0%_55%)] hover:text-[hsl(0_0%_95%)] transition-colors";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${navClasses}`}>
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {(isProductPage || isLegal) && (
            <Link to="/" className={`${linkClasses} flex items-center gap-1 text-sm`}>
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Aimtera Labs</span>
            </Link>
          )}
          <Link to="/" className="font-bold text-xl tracking-tight">
            {isLume ? (
              <span className="text-gradient-lume">Lume</span>
            ) : isSymmetry ? (
              <span className="text-gradient-symmetry">SymmetryAI</span>
            ) : isRBMarket ? (
              <span className="text-gradient-rbmarket">RBMarket</span>
            ) : (
              <span className="text-gradient-corporate">Aimtera Labs</span>
            )}
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {!isProductPage && !isLegal && (
            <>
              <a href="#about" className={linkClasses}>About</a>
              <a href="#team" className={linkClasses}>Team</a>
              <div className="relative" onMouseEnter={() => setProductsOpen(true)} onMouseLeave={() => setProductsOpen(false)}>
                <button className={`${linkClasses} flex items-center gap-1`}>
                  Products <ChevronDown className="w-3.5 h-3.5" />
                </button>
                {productsOpen && (
                  <div className="absolute top-full pt-2 left-1/2 -translate-x-1/2">
                    <div className="rounded-lg shadow-lg py-2 min-w-[200px] glassmorphism" style={{ background: "hsl(220 20% 12% / 0.95)" }}>
                      <Link to="/rbmarket" className="block px-4 py-2.5 hover:bg-[hsl(0_0%_100%_/_0.05)] transition-colors text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-gradient-rbmarket font-semibold">RBMarket</span>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: "hsl(var(--rbmarket-accent) / 0.2)", color: "hsl(var(--rbmarket-accent))" }}>LIVE</span>
                        </div>
                        <p className="text-xs mt-0.5" style={{ color: "hsl(0 0% 50%)" }}>P2P game marketplace</p>
                      </Link>
                      <Link to="/lume" className="block px-4 py-2.5 hover:bg-[hsl(0_0%_100%_/_0.05)] transition-colors text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-gradient-lume font-semibold">Lume</span>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: "hsl(var(--lume-amber) / 0.2)", color: "hsl(var(--lume-amber))" }}>BETA</span>
                        </div>
                        <p className="text-xs mt-0.5" style={{ color: "hsl(0 0% 50%)" }}>Proximity social messaging</p>
                      </Link>
                      <Link to="/symmetryai" className="block px-4 py-2.5 hover:bg-[hsl(0_0%_100%_/_0.05)] transition-colors text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-gradient-symmetry font-semibold">SymmetryAI</span>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: "hsl(var(--symmetry-cyan) / 0.2)", color: "hsl(var(--symmetry-cyan))" }}>BETA</span>
                        </div>
                        <p className="text-xs mt-0.5" style={{ color: "hsl(0 0% 50%)" }}>AI fitness companion</p>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <a href="#contact" className={linkClasses}>Contact</a>
            </>
          )}
          {isLume && (
            <>
              <a href="#features" className={linkClasses}>Features</a>
              <a href="#waitlist" className={linkClasses}>Join Waitlist</a>
            </>
          )}
          {isSymmetry && (
            <>
              <a href="#features" className={linkClasses}>Features</a>
              <a href="#waitlist" className={linkClasses}>Join Beta</a>
            </>
          )}
          {isRBMarket && (
            <>
              <a href="#features" className={linkClasses}>Features</a>
              <a
                href="https://rbmarket.app"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full text-sm font-semibold transition-opacity hover:opacity-90"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--rbmarket-accent)), hsl(var(--rbmarket-blue)))",
                  color: "hsl(var(--primary-foreground))",
                }}
              >
                Launch App ↗
              </a>
            </>
          )}
        </div>

        <button className={`md:hidden ${linkClasses}`} onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className={`md:hidden border-t px-6 py-4 space-y-3 ${
          isLume ? 'border-lume-amber/10 bg-lume-bg' :
          isSymmetry ? 'border-symmetry-cyan/10 bg-symmetry-bg' :
          isRBMarket ? 'border-rbmarket-accent/10 bg-rbmarket-bg' :
          'border-[hsl(0_0%_100%_/_0.06)]'
        }`} style={!isProductPage ? { background: "hsl(220 20% 7%)" } : undefined}>
          {!isProductPage && !isLegal && (
            <>
              <a href="#about" className={`block ${linkClasses}`} onClick={() => setMobileOpen(false)}>About</a>
              <a href="#team" className={`block ${linkClasses}`} onClick={() => setMobileOpen(false)}>Team</a>
              <Link to="/rbmarket" className={`block ${linkClasses}`} onClick={() => setMobileOpen(false)}>RBMarket <span className="text-xs text-rbmarket-accent">LIVE</span></Link>
              <Link to="/lume" className={`block ${linkClasses}`} onClick={() => setMobileOpen(false)}>Lume <span className="text-xs text-lume-amber">BETA</span></Link>
              <Link to="/symmetryai" className={`block ${linkClasses}`} onClick={() => setMobileOpen(false)}>SymmetryAI <span className="text-xs text-symmetry-cyan">BETA</span></Link>
              <a href="#contact" className={`block ${linkClasses}`} onClick={() => setMobileOpen(false)}>Contact</a>
            </>
          )}
          {isRBMarket && (
            <>
              <a href="#features" className={`block ${linkClasses}`} onClick={() => setMobileOpen(false)}>Features</a>
              <a href="https://rbmarket.app" target="_blank" rel="noopener noreferrer" className={`block ${linkClasses}`} onClick={() => setMobileOpen(false)}>Launch App ↗</a>
            </>
          )}
          {isLume && (
            <>
              <a href="#features" className={`block ${linkClasses}`} onClick={() => setMobileOpen(false)}>Features</a>
              <a href="#waitlist" className={`block ${linkClasses}`} onClick={() => setMobileOpen(false)}>Join Waitlist</a>
            </>
          )}
          {isSymmetry && (
            <>
              <a href="#features" className={`block ${linkClasses}`} onClick={() => setMobileOpen(false)}>Features</a>
              <a href="#waitlist" className={`block ${linkClasses}`} onClick={() => setMobileOpen(false)}>Join Beta</a>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
