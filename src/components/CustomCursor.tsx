import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if ("ontouchstart" in window) return;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const onEnter = () => setIsVisible(true);
    const onLeave = () => setIsVisible(false);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);

    let raf: number;
    const animate = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.15;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, [data-magnetic]")) {
        setIsHovering(true);
      }
    };
    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, [data-magnetic]")) {
        setIsHovering(false);
      }
    };

    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
    };
  }, [isVisible]);

  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.3s" }}
      >
        <div
          className="rounded-full transition-all duration-300 ease-out"
          style={{
            width: isHovering ? 12 : 6,
            height: isHovering ? 12 : 6,
            marginLeft: isHovering ? -6 : -3,
            marginTop: isHovering ? -6 : -3,
            background: "hsl(var(--primary-foreground))",
            boxShadow: isHovering
              ? "0 0 20px 6px hsl(var(--primary-foreground) / 0.4)"
              : "0 0 8px 2px hsl(var(--primary-foreground) / 0.3)",
          }}
        />
      </div>
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
        style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.3s" }}
      >
        <div
          className="rounded-full border transition-all duration-500 ease-out"
          style={{
            width: isHovering ? 48 : 32,
            height: isHovering ? 48 : 32,
            marginLeft: isHovering ? -24 : -16,
            marginTop: isHovering ? -24 : -16,
            borderColor: `hsl(var(--primary-foreground) / ${isHovering ? 0.5 : 0.2})`,
            background: isHovering ? "hsl(var(--primary-foreground) / 0.05)" : "transparent",
          }}
        />
      </div>
    </>
  );
};

export default CustomCursor;
