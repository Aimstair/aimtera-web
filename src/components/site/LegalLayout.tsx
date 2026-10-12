import { ReactNode } from "react";
import GlobalNav from "@/components/site/GlobalNav";
import LocalNav, { LocalNavLink } from "@/components/site/LocalNav";
import SiteFooter from "@/components/site/SiteFooter";
import AppIcon from "@/components/site/AppIcon";
import PageTransition from "@/components/PageTransition";
import { getApp } from "@/content/apps";

interface LegalLayoutProps {
  /** Slug of the app this policy belongs to. Omit for Aimtera Labs-wide policies. */
  appSlug?: string;
  eyebrow: string;
  title: string;
  /** e.g. "Last updated: June 16, 2026". Rendered exactly as passed. */
  dateLine?: string;
  children: ReactNode;
}

const LegalLayout = ({ appSlug, eyebrow, title, dateLine, children }: LegalLayoutProps) => {
  const app = appSlug ? getApp(appSlug) : null;
  const links: LocalNavLink[] = app ? [{ label: "Overview", href: `/${app.slug}` }, ...app.legal.map((l) => ({ label: l.label.replace(`${app.name} `, ""), href: l.href }))] : [];

  return (
    <PageTransition>
      <div className="min-h-screen bg-white text-apple-ink">
        <GlobalNav sticky={!app} />
        {app && (
          <LocalNav
            name={app.name}
            homeHref={`/${app.slug}`}
            icon={<AppIcon app={app} size={28} />}
            links={links}
            cta={app.storeUrl ? { label: "Get", href: app.storeUrl, color: "#1d1d1f" } : undefined}
          />
        )}
        <main className="mx-auto max-w-[692px] px-[22px] pb-[120px] pt-20">
          <p className="text-[17px] font-semibold text-apple-secondary">{eyebrow}</p>
          <h1 className="mt-2 text-[clamp(36px,6vw,48px)] font-bold leading-[1.08] tracking-[-0.025em]">{title}</h1>
          {dateLine && <p className="mt-3.5 text-sm text-apple-secondary">{dateLine}</p>}
          <div className="legal-prose mt-11">{children}</div>
        </main>
        <SiteFooter />
      </div>
    </PageTransition>
  );
};

export default LegalLayout;
