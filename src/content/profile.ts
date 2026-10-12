export const profile = {
  name: "Eric Mar Geonzon",
  firstName: "Eric",
  role: "Computer Engineer · Developer · Automations",
  email: "ericmargeonzon@gmail.com",
  github: "https://github.com/Aimstair",
  linkedin: "https://www.linkedin.com/in/eric-mar-geonzon",
};

export interface ExperienceRole {
  company: string;
  short: string;
  period: string;
  place: string;
  now: boolean;
  title: string;
  lead: string;
  points: string[];
  tags: string[];
}

export const experience: ExperienceRole[] = [
  {
    company: "Belli AI",
    short: "Automations and Systems",
    period: "Aug 2026 – Present",
    place: "Singapore",
    now: true,
    title: "Operations Associate, Automations and Systems",
    lead: "I build automation systems and data pipelines that replace manual operations work.",
    points: [
      "Built an end-to-end recruitment automation in n8n covering lead generation, cold-outreach sequences and candidate-intent tracking, connected through REST APIs and webhooks.",
      "Built scheduled data pipelines that turn corporate card transactions into monthly per-person reports and twice-monthly receipt audits, delivered automatically.",
    ],
    tags: ["n8n", "Zapier", "Python", "REST APIs", "Webhooks", "Scheduled pipelines"],
  },
  {
    company: "Aimtera Labs",
    short: "Founder and indie developer",
    period: "Dec 2025 – Present",
    place: "Independent",
    now: true,
    title: "Founder and indie developer",
    lead: "My own studio. I design, build and ship apps end to end, then keep them running.",
    points: [
      "Shipped four Android apps to Google Play: Clip It, Speed Math, Speed Spell and Test4Test. Each is rated 4.8 stars.",
      "In its first month, Test4Test reached 500+ users and 278 listed apps, and helped 252 of those apps reach production on Google Play.",
      "Built two web products: RBMarket, a Next.js marketplace with real-time chat and PayMongo payments, and Maison Carte, interactive greeting cards delivered as micro-sites.",
    ],
    tags: ["React Native", "Expo", "React", "Next.js 14", "Node.js", "Prisma", "Supabase", "PayPal", "RevenueCat"],
  },
  {
    company: "Xeleqt AI",
    short: "Software Developer Intern",
    period: "Jan 2026 – Apr 2026",
    place: "Cebu City",
    now: false,
    title: "Software Developer Intern",
    lead: "I was the only frontend developer on a full modernization of an enterprise web app covering HR, accounting and inventory.",
    points: [
      "Reworked the architecture so lists of 10,000+ employees render and simulate without slowing down.",
      "Redesigned the interface in a low-contrast glassmorphism style and upgraded core libraries to pay down technical debt.",
    ],
    tags: ["React", "TypeScript", "Rendering performance", "Library upgrades"],
  },
  {
    company: "Cebu Pionaire Inc.",
    short: "Full-Stack and Automation Engineer",
    period: "Jun 2024 – Jan 2026",
    place: "Cebu City",
    now: false,
    title: "Full-Stack and Automation Engineer",
    lead: "I built the customer acquisition engine and the website it sends traffic to.",
    points: [
      "Built automated acquisition pipelines with n8n and custom scrapers that watch Facebook groups and comments, capturing and parsing 200+ high-intent leads a week.",
      "Built a fast, custom web platform for the company's services, the main landing page for that automated traffic.",
    ],
    tags: ["n8n", "Custom scrapers", "Data parsing", "Web development"],
  },
  {
    company: "USJ-R Supreme Student Council",
    short: "Website Manager",
    period: "Jul 2024 – Apr 2025",
    place: "Cebu City",
    now: false,
    title: "Website Manager",
    lead: "I ran the student council's official website.",
    points: [
      "Led the rebrand and redesign of the site's structure and interface for a more consistent look and a better user experience.",
      "Handled maintenance, deployments and content updates, and worked with committees to launch event pages.",
    ],
    tags: ["HTML/CSS", "JavaScript", "Web design", "Deployment"],
  },
  {
    company: "University of San Jose–Recoletos",
    short: "B.S. Computer Engineering",
    period: "Graduated June 2026",
    place: "Cebu City",
    now: false,
    title: "B.S. in Computer Engineering",
    lead: "My foundation in engineering, software and how to ship projects.",
    points: [
      "Relevant courses: Data Structures and Algorithms, Software Engineering, Object-Oriented Programming, Quality Assurance, Project Management and Emerging Technology.",
      "Final-year solo project: an HR Management System.",
    ],
    tags: ["C#", "Python", "Data structures", "OOP"],
  },
];

export const toolbox: Array<{ label: string; items: string }> = [
  { label: "Languages", items: "TypeScript · JavaScript · Python · C# · Dart · SQL · HTML/CSS" },
  { label: "Mobile", items: "React Native · Expo · Reanimated · RevenueCat · AdMob · Google Play Console" },
  { label: "Web", items: "React · Next.js · Node.js · Prisma · Tailwind CSS" },
  { label: "Data and services", items: "PostgreSQL · Supabase · Pusher · PayMongo · PayPal · Git" },
  { label: "Automation", items: "n8n · Zapier · REST APIs and webhooks · Custom scrapers" },
];

export const workStages: Array<{ title: string; body: string; example: string }> = [
  {
    title: "Spot a problem",
    body: "Every app starts with a specific, everyday frustration.",
    example: "Clip It exists so a clutch play is never lost. Test4Test exists because finding 20 testers blocks so many Android launches.",
  },
  {
    title: "Design the core",
    body: "I design the one interaction the app depends on first, then everything around it.",
    example: "For Clip It that was a single floating bubble. For Speed Math it was a number flashing on an empty screen.",
  },
  {
    title: "Build it",
    body: "React Native and Expo on mobile, React and Next.js on the web, with Postgres behind both. I build the whole stack myself.",
    example: "RBMarket runs on Next.js 14 and Prisma, with PayMongo payments and real-time chat over Pusher.",
  },
  {
    title: "Ship it",
    body: "Store listings, privacy policies, billing and Play Console review: the work that turns a project into a product.",
    example: "Four apps passed Google Play review and are live under Aimtera Labs.",
  },
  {
    title: "Grow and iterate",
    body: "Ratings, reviews and usage decide what goes into the next version.",
    example: "In its first month, Test4Test reached 500+ users and 278 listed apps, and helped 252 of them reach production on Google Play.",
  },
];
