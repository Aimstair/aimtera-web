import { useEffect, useMemo, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          action?: string;
          theme?: "light" | "dark" | "auto";
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        },
      ) => string;
      remove?: (widgetId: string) => void;
      reset?: (widgetId: string) => void;
    };
  }
}

interface TurnstileWidgetProps {
  action: string;
  onTokenChange: (token: string | null) => void;
  className?: string;
  theme?: "light" | "dark" | "auto";
}

const TURNSTILE_SCRIPT_ID = "turnstile-api-script";

const isLocalHost = (hostname: string) =>
  hostname === "localhost" || hostname === "127.0.0.1";

const TurnstileWidget = ({
  action,
  onTokenChange,
  className = "",
  theme = "dark",
}: TurnstileWidgetProps) => {
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY?.trim() || "";
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);

  const localBypass = useMemo(
    () => typeof window !== "undefined" && isLocalHost(window.location.hostname),
    [],
  );

  useEffect(() => {
    if (!siteKey) {
      onTokenChange(localBypass ? "dev-turnstile-bypass" : null);
      return;
    }

    const ensureScript = () => {
      const existing = document.getElementById(TURNSTILE_SCRIPT_ID) as
        | HTMLScriptElement
        | null;
      if (existing) {
        return existing;
      }

      const script = document.createElement("script");
      script.id = TURNSTILE_SCRIPT_ID;
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
      return script;
    };

    const renderWidget = () => {
      if (!containerRef.current || !window.turnstile) {
        return;
      }

      if (widgetIdRef.current && window.turnstile.remove) {
        window.turnstile.remove(widgetIdRef.current);
      }

      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        action,
        theme,
        callback: (token) => {
          onTokenChange(token);
        },
        "expired-callback": () => {
          onTokenChange(null);
        },
        "error-callback": () => {
          onTokenChange(null);
        },
      });
    };

    const script = ensureScript();
    const onLoaded = () => renderWidget();

    if (window.turnstile) {
      renderWidget();
    } else {
      script.addEventListener("load", onLoaded);
    }

    return () => {
      script.removeEventListener("load", onLoaded);
      if (widgetIdRef.current && window.turnstile?.remove) {
        window.turnstile.remove(widgetIdRef.current);
      }
    };
  }, [action, localBypass, onTokenChange, siteKey, theme]);

  if (!siteKey && !localBypass) {
    return (
      <p className="text-xs text-destructive">
        Challenge is unavailable. Please contact support.
      </p>
    );
  }

  if (!siteKey && localBypass) {
    return (
      <p className="text-xs text-muted-foreground" aria-live="polite">
        Local development bypass active for challenge validation.
      </p>
    );
  }

  return <div className={className} ref={containerRef} />;
};

export default TurnstileWidget;
