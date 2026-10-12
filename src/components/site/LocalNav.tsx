import { ReactNode } from "react";
import { Link } from "react-router-dom";

export interface LocalNavLink {
  label: string;
  href: string;
}

interface LocalNavProps {
  name: string;
  icon: ReactNode;
  /** Where the app name links to (its overview page). */
  homeHref: string;
  links: LocalNavLink[];
  cta?: { label: string; href: string; color: string };
  dark?: boolean;
}

const isRoute = (href: string) => href.startsWith("/");
const isExternal = (href: string) => /^https?:\/\//.test(href);

const LocalNav = ({ name, icon, homeHref, links, cta, dark = false }: LocalNavProps) => (
  <div
    className={`sticky top-0 z-40 border-b backdrop-blur-xl backdrop-saturate-150 ${
      dark ? "border-white/[0.12] bg-[rgba(22,22,23,0.72)] text-[#f5f5f7]" : "border-black/[0.12] bg-white/80 text-apple-ink"
    }`}
  >
    <nav
      aria-label={name}
      className="mx-auto flex min-h-[52px] max-w-[1024px] flex-wrap items-center justify-between gap-x-4 gap-y-2 px-[22px] py-1"
    >
      <Link to={homeHref} className="flex items-center gap-2.5 text-[21px] font-semibold tracking-[-0.01em]">
        {icon}
        {name}
      </Link>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs">
        {links.map((link) =>
          isRoute(link.href) ? (
            <Link key={link.href} to={link.href} className="opacity-80 transition-opacity hover:opacity-100">
              {link.label}
            </Link>
          ) : (
            <a key={link.href} href={link.href} className="opacity-80 transition-opacity hover:opacity-100">
              {link.label}
            </a>
          ),
        )}
        {cta && (
          <a
            href={cta.href}
            {...(isExternal(cta.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="rounded-full px-3.5 py-1.5 text-white transition-opacity hover:opacity-90"
            style={{ background: cta.color }}
          >
            {cta.label}
          </a>
        )}
      </div>
    </nav>
  </div>
);

export default LocalNav;
