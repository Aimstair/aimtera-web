import { Link } from "react-router-dom";

const CorporateFooter = () => {
  return (
    <footer id="contact" className="py-16 border-t" style={{ background: "hsl(var(--corp-dark-bg))", borderColor: "hsl(0 0% 100% / 0.06)" }}>
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-gradient-corporate mb-3">Aimtera Labs</h3>
            <p className="text-sm max-w-md leading-relaxed" style={{ color: "hsl(var(--corp-dark-muted))" }}>
              Building the next generation of AI and social interactions. We create apps that connect the digital and physical worlds.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm" style={{ color: "hsl(var(--corp-dark-foreground))" }}>Products</h4>
            <div className="space-y-2">
              <Link to="/rbmarket" className="block text-sm transition-colors" style={{ color: "hsl(var(--corp-dark-muted))" }}>RBMarket <span className="text-xs text-rbmarket-accent">LIVE</span></Link>
              <Link to="/lume" className="block text-sm transition-colors" style={{ color: "hsl(var(--corp-dark-muted))" }}>Lume</Link>
              <Link to="/symmetryai" className="block text-sm transition-colors" style={{ color: "hsl(var(--corp-dark-muted))" }}>SymmetryAI</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm" style={{ color: "hsl(var(--corp-dark-foreground))" }}>Legal</h4>
            <div className="space-y-2">
              <Link to="/privacy" className="block text-sm transition-colors" style={{ color: "hsl(var(--corp-dark-muted))" }}>Privacy Policy</Link>
              <Link to="/terms" className="block text-sm transition-colors" style={{ color: "hsl(var(--corp-dark-muted))" }}>Terms of Service</Link>
              <Link to="/account-deletion" className="block text-sm transition-colors" style={{ color: "hsl(var(--corp-dark-muted))" }}>Account Deletion</Link>
              <a href="mailto:support@aimteralabs.com" className="block text-sm transition-colors" style={{ color: "hsl(var(--corp-dark-muted))" }}>Support</a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6" style={{ borderTop: "1px solid hsl(0 0% 100% / 0.06)" }}>
          <p className="text-xs" style={{ color: "hsl(var(--corp-dark-muted) / 0.5)" }}>
            &copy; {new Date().getFullYear()} Aimtera Labs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default CorporateFooter;
