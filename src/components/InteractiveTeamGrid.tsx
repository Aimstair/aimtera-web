import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
}

const team: TeamMember[] = [
  { name: "Founder 1", role: "CEO & Co-Founder", bio: "Passionate about connecting people through technology.", initials: "F1" },
  { name: "Founder 2", role: "CTO & Co-Founder", bio: "Building scalable systems that delight users.", initials: "F2" },
  { name: "Team Member", role: "Head of Design", bio: "Crafting beautiful, intuitive experiences.", initials: "TM" },
];

const InteractiveTeamGrid = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="team" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center pointer-events-none overflow-hidden opacity-[0.03]">
        <div className="whitespace-nowrap animate-scroll-x text-[12rem] font-black tracking-tight">
          INNOVATION • PRIVACY • COMMUNITY • INNOVATION • PRIVACY • COMMUNITY •
        </div>
      </div>

      <div className="container mx-auto px-6 relative">
        <ScrollReveal>
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4" style={{ color: "hsl(0 0% 95%)" }}>
            The Team
          </h2>
          <p className="text-center mb-16 max-w-lg mx-auto" style={{ color: "hsl(0 0% 50%)" }}>
            Meet the people building the future of connected experiences.
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {team.map((m, i) => (
            <ScrollReveal key={m.name} delay={i * 150}>
              <div
                className="relative group cursor-pointer"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="relative overflow-hidden rounded-2xl aspect-[3/4] mb-4">
                  <div
                    className="absolute inset-0 flex items-center justify-center transition-all duration-700"
                    style={{
                      background: hoveredIndex === i
                        ? "linear-gradient(135deg, hsl(213 50% 24%) 0%, hsl(260 70% 40%) 100%)"
                        : "hsl(0 0% 15%)",
                    }}
                  >
                    <span
                      className="text-6xl font-bold transition-all duration-700"
                      style={{
                        color: hoveredIndex === i ? "hsl(0 0% 100%)" : "hsl(0 0% 25%)",
                        transform: hoveredIndex === i ? "scale(1.1)" : "scale(1)",
                      }}
                    >
                      {m.initials}
                    </span>
                  </div>

                  <div
                    className="absolute bottom-0 left-0 right-0 p-6 transition-all duration-500"
                    style={{
                      transform: hoveredIndex === i ? "translateY(0)" : "translateY(100%)",
                      background: "linear-gradient(to top, hsl(0 0% 0% / 0.9), transparent)",
                    }}
                  >
                    <p className="text-sm font-medium" style={{ color: "hsl(213 60% 70%)" }}>{m.role}</p>
                    <p className="text-xs mt-1" style={{ color: "hsl(0 0% 60%)" }}>{m.bio}</p>
                  </div>
                </div>

                <h3 className="font-semibold" style={{ color: "hsl(0 0% 90%)" }}>{m.name}</h3>
                <p className="text-sm" style={{ color: "hsl(0 0% 50%)" }}>{m.role}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InteractiveTeamGrid;
