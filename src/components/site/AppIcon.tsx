import { AppEntry } from "@/content/apps";

interface AppIconProps {
  app: AppEntry;
  size: number;
  className?: string;
  round?: boolean;
}

/** Renders an app's store icon, or its monogram for web products without one. */
const AppIcon = ({ app, size, className = "", round = false }: AppIconProps) => {
  const radius = round ? "9999px" : `${Math.round(size * 0.225)}px`;

  if (app.icon) {
    return (
      <img
        src={app.icon}
        alt=""
        width={size}
        height={size}
        className={`shrink-0 object-cover ${className}`}
        style={{ width: size, height: size, borderRadius: radius }}
      />
    );
  }

  const serif = app.slug === "maisoncarte";
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center font-extrabold ${serif ? "font-cormorant font-semibold" : ""} ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: serif ? "9999px" : radius,
        background: serif ? "radial-gradient(circle at 35% 30%, #8a2c3a, #5c1a23 60%, #3e1017)" : app.monoBg,
        color: serif ? "#e8c9a0" : app.slug === "symmetryai" ? "#22d3ee" : "#ffffff",
        fontSize: Math.round(size * (app.mono && app.mono.length > 1 ? 0.36 : 0.42)),
      }}
    >
      {app.mono}
    </span>
  );
};

export default AppIcon;
