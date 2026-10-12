import { Link } from "react-router-dom";
import { apps, studioLegal, SUPPORT_EMAIL } from "@/content/apps";
import { profile } from "@/content/profile";

const linkClass = "text-apple-body hover:underline";

/** Shared footer. Every page lists every policy link, so Play Store reviewers can always reach them. */
const SiteFooter = () => {
  const mobile = apps.filter((app) => app.platform === "mobile");
  const web = apps.filter((app) => app.platform === "web");
  const appPolicies = apps.flatMap((app) => app.legal);

  return (
    <footer className="bg-apple-gray text-xs leading-relaxed text-apple-secondary">
      <div className="mx-auto max-w-[980px] px-[22px] pb-6 pt-8">
        <div className="grid grid-cols-2 gap-6 border-b border-apple-hairline pb-5 md:grid-cols-4">
          <div className="flex flex-col gap-1.5">
            <div className="font-semibold text-apple-ink">Mobile apps</div>
            {mobile.map((app) => (
              <Link key={app.slug} to={`/${app.slug}`} className={linkClass}>
                {app.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="font-semibold text-apple-ink">Web apps</div>
            {web.map((app) => (
              <Link key={app.slug} to={`/${app.slug}`} className={linkClass}>
                {app.name}
              </Link>
            ))}
            <div className="mt-2.5 font-semibold text-apple-ink">Connect</div>
            <a href={`mailto:${profile.email}`} className={linkClass}>Email</a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className={linkClass}>GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>LinkedIn</a>
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="font-semibold text-apple-ink">App policies</div>
            {appPolicies.map((link) => (
              <Link key={link.href} to={link.href} className={linkClass}>
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="font-semibold text-apple-ink">Aimtera Labs</div>
            {studioLegal.map((link) => (
              <Link key={link.href} to={link.href} className={linkClass}>
                {link.label}
              </Link>
            ))}
            <a href={`mailto:${SUPPORT_EMAIL}`} className={linkClass}>Support</a>
          </div>
        </div>
        <p className="mt-4">
          Copyright © {new Date().getFullYear()} {profile.name}. Apps published by Aimtera Labs. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default SiteFooter;
