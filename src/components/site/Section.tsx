import { ReactNode } from "react";

interface HeadingProps {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  eyebrowColor?: string;
  leadClassName?: string;
  className?: string;
}

/** Eyebrow + large headline + lead paragraph, the building block of every section. */
export const SectionHeading = ({
  eyebrow,
  title,
  lead,
  eyebrowColor,
  leadClassName = "text-apple-secondary",
  className = "",
}: HeadingProps) => (
  <div className={className}>
    {eyebrow && (
      <p className="text-[17px] font-semibold" style={eyebrowColor ? { color: eyebrowColor } : undefined}>
        {eyebrow}
      </p>
    )}
    <h2 className="mt-2 text-[clamp(36px,5vw,56px)] font-bold leading-[1.07] tracking-[-0.025em]">{title}</h2>
    {lead && <p className={`mt-3 max-w-[680px] text-[21px] leading-[1.4] ${leadClassName}`}>{lead}</p>}
  </div>
);

interface BehindTheBuildProps {
  appName: string;
  children: ReactNode;
  stack: string;
}

export const BehindTheBuild = ({ appName, children, stack }: BehindTheBuildProps) => (
  <section className="px-[22px] py-[120px]">
    <div className="mx-auto flex max-w-[980px] flex-wrap gap-10">
      <div className="flex-[1_1_280px]">
        <p className="text-[17px] font-semibold text-apple-secondary">Behind the build</p>
        <h2 className="mt-2 text-[40px] font-bold leading-[1.1] tracking-[-0.02em]">How I built {appName}.</h2>
      </div>
      <div className="flex-[2_1_460px] text-[19px] leading-[1.53] text-apple-body">
        {children}
        <p className="mt-[18px] text-[15px] text-apple-secondary">Built with: {stack}</p>
      </div>
    </div>
  </section>
);

interface StoreGalleryProps {
  images: Array<{ src: string; alt: string }>;
  height: number;
  className?: string;
  title?: string;
  note?: string;
  dark?: boolean;
}

/** Horizontally scrolling strip of the real Play Store screenshots. */
export const StoreGallery = ({ images, height, className = "bg-apple-gray", title = "On Google Play.", note, dark = false }: StoreGalleryProps) => (
  <section className={`py-[120px] ${className}`}>
    <div className="mx-auto max-w-[980px] px-[22px]">
      <h2 className={`text-[32px] font-bold tracking-[-0.02em] ${dark ? "text-[#f5f5f7]" : ""}`}>{title}</h2>
      {note && <p className={`mt-2 text-[15px] ${dark ? "text-[#b8b4e0]" : "text-apple-secondary"}`}>{note}</p>}
    </div>
    <div className="no-scrollbar mt-8 flex gap-4 overflow-x-auto px-[max(22px,calc((100%-980px)/2))] pb-3">
      {images.map((image) => (
        <img
          key={image.src}
          src={image.src}
          alt={image.alt}
          loading="lazy"
          className="flex-none rounded-[22px]"
          style={{ height: `min(${height}px, 70vw)` }}
        />
      ))}
    </div>
  </section>
);

interface PillLinkProps {
  href: string;
  children: ReactNode;
  background?: string;
  color?: string;
  external?: boolean;
}

export const PillLink = ({ href, children, background = "#0071e3", color = "#ffffff", external = false }: PillLinkProps) => (
  <a
    href={href}
    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    className="inline-flex min-h-11 items-center rounded-full px-6 text-[17px] transition-opacity hover:opacity-90"
    style={{ background, color }}
  >
    {children}
  </a>
);
