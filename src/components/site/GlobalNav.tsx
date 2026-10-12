import { Link } from "react-router-dom";
import { profile } from "@/content/profile";

interface GlobalNavProps {
  dark?: boolean;
  /** When true the bar sticks to the top. App pages leave this off and let their local nav stick instead. */
  sticky?: boolean;
}

const links = [
  { label: "Experience", href: "/#experience" },
  { label: "Apps", href: "/#apps" },
  { label: "Contact", href: "/#contact" },
];

const GlobalNav = ({ dark = false, sticky = false }: GlobalNavProps) => (
  <header
    className={`${sticky ? "sticky top-0 z-40" : "relative z-30"} border-b backdrop-blur-xl backdrop-saturate-150 ${
      dark ? "border-white/10 bg-[rgba(22,22,23,0.8)] text-[#f5f5f7]" : "border-black/[0.08] bg-white/80 text-apple-ink"
    }`}
  >
    <nav
      aria-label="Global"
      className="mx-auto flex min-h-12 max-w-[1024px] flex-wrap items-center justify-between gap-x-4 px-[22px]"
    >
      <Link to="/" className="text-[17px] font-semibold tracking-[-0.02em]">
        {profile.name}
      </Link>
      <div className="flex flex-wrap gap-7 text-xs">
        {links.map((link) => (
          <Link key={link.href} to={link.href} className="opacity-80 transition-opacity hover:opacity-100">
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  </header>
);

export default GlobalNav;
