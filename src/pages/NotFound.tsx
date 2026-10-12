import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import GlobalNav from "@/components/site/GlobalNav";
import SiteFooter from "@/components/site/SiteFooter";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-white text-apple-ink">
      <GlobalNav sticky />
      <main className="flex flex-1 flex-col items-center justify-center px-[22px] py-32 text-center">
        <p className="text-[17px] font-semibold text-apple-secondary">404</p>
        <h1 className="mt-2 text-[clamp(40px,6vw,64px)] font-bold leading-[1.05] tracking-[-0.03em]">This page doesn't exist.</h1>
        <p className="mt-4 max-w-[480px] text-[19px] text-apple-secondary">The link may be broken, or the page may have moved.</p>
        <Link
          to="/"
          className="mt-8 inline-flex min-h-11 items-center rounded-full bg-apple-blue px-6 text-[17px] text-white transition-opacity hover:opacity-90"
        >
          Return to Home
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
};

export default NotFound;
