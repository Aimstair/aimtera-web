import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Bot, MessageCircle, Send, User, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

type TopicId =
  | "company"
  | "rbmarket"
  | "lume"
  | "symmetryai"
  | "privacy"
  | "accountDeletion"
  | "support"
  | "pricing"
  | "safety";

interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
}

interface TopicDefinition {
  terms: Record<string, number>;
  replies: string[];
  quickPrompts: string[];
  related: TopicId[];
}

interface TopicLink {
  label: string;
  href: string;
}

const KNOWLEDGE_BASE: Record<TopicId, TopicDefinition> = {
  company: {
    terms: {
      aimtera: 3,
      "aimtera labs": 5,
      company: 3,
      about: 2,
      team: 2,
      founder: 2,
      mission: 2,
      startup: 1,
      products: 2,
    },
    replies: [
      "Aimtera Labs is a product studio focused on practical consumer technology. The main products are RBMarket, Lume, and SymmetryAI.",
      "Aimtera Labs builds focused products across marketplace, proximity communication, and AI-assisted fitness. RBMarket, Lume, and SymmetryAI are the core offerings.",
      "Aimtera Labs is the company behind RBMarket, Lume, and SymmetryAI, with emphasis on practical product experiences and user trust.",
    ],
    quickPrompts: [
      "What is RBMarket?",
      "How does Lume work offline?",
      "What does SymmetryAI do?",
    ],
    related: ["rbmarket", "lume", "symmetryai"],
  },
  rbmarket: {
    terms: {
      rbmarket: 6,
      roblox: 4,
      marketplace: 3,
      trading: 3,
      vouch: 4,
      reputation: 3,
      fees: 3,
      scam: 2,
      profiles: 2,
      chat: 1,
      "zero fee": 5,
      "admin fees": 4,
    },
    replies: [
      "RBMarket is Aimtera's peer-to-peer Roblox item marketplace with zero admin fees, reputation signals, and transparent public profiles.",
      "RBMarket focuses on safer peer-to-peer Roblox trading through public reputation and profile transparency while keeping platform admin fees at zero.",
      "RBMarket is built for direct Roblox item trading with no admin fee overhead plus trust features like vouches and public trader history.",
    ],
    quickPrompts: [
      "How does RBMarket reputation work?",
      "Is RBMarket free to use?",
      "How is trading safety handled?",
    ],
    related: ["pricing", "safety", "support"],
  },
  lume: {
    terms: {
      lume: 6,
      bluetooth: 4,
      proximity: 4,
      offline: 4,
      messaging: 3,
      internet: 2,
      waitlist: 2,
      beta: 2,
      social: 2,
      nearby: 2,
    },
    replies: [
      "Lume is a proximity-first messaging concept where interactions can hop device-to-device over Bluetooth, designed for local discovery and communication.",
      "Lume focuses on nearby social messaging with Bluetooth-based proximity behavior, reducing dependency on continuous internet access.",
      "Lume is Aimtera's proximity messaging product centered on nearby interactions, Bluetooth transport behavior, and a beta waitlist.",
    ],
    quickPrompts: [
      "How do I join the Lume waitlist?",
      "Does Lume require internet?",
      "What makes Lume different?",
    ],
    related: ["company", "support"],
  },
  symmetryai: {
    terms: {
      symmetryai: 6,
      symmetry: 3,
      fitness: 4,
      workout: 3,
      muscle: 4,
      analysis: 3,
      ai: 2,
      training: 2,
      progress: 2,
      waitlist: 2,
    },
    replies: [
      "SymmetryAI is Aimtera's AI-guided fitness product focused on muscle balance insights and targeted training direction.",
      "SymmetryAI is designed to analyze physique balance and support focused workout planning around underdeveloped areas.",
      "SymmetryAI combines image-driven analysis concepts with practical training recommendations aimed at better muscle symmetry outcomes.",
    ],
    quickPrompts: [
      "How do I join the SymmetryAI waitlist?",
      "What insights does SymmetryAI provide?",
      "Is SymmetryAI already launched?",
    ],
    related: ["company", "support"],
  },
  privacy: {
    terms: {
      privacy: 6,
      data: 4,
      policy: 4,
      collect: 2,
      delete: 2,
      personal: 2,
      security: 2,
      tracking: 2,
      "privacy policy": 5,
    },
    replies: [
      "Aimtera publishes privacy details on the Privacy Policy page and treats user data handling as a product trust priority.",
      "For privacy specifics, the canonical source is the Privacy Policy route, including what is collected and how it is handled.",
      "Aimtera privacy details are documented on the Privacy Policy page, including data handling expectations and user controls.",
    ],
    quickPrompts: [
      "Where is the privacy policy?",
      "How do I request account deletion?",
      "How can I contact privacy support?",
    ],
    related: ["accountDeletion", "support"],
  },
  accountDeletion: {
    terms: {
      "account deletion": 6,
      deletion: 5,
      "delete account": 6,
      remove: 2,
      erase: 2,
      "right to delete": 3,
      "account removal": 5,
    },
    replies: [
      "You can submit a request on the account deletion page, and the team follows the workflow described there.",
      "Account deletion requests are handled through the dedicated account deletion route so details can be captured accurately.",
      "For account removal, use the account deletion page to submit your request and service scope.",
    ],
    quickPrompts: [
      "Take me to account deletion details",
      "How long does deletion processing take?",
      "Where can I contact support?",
    ],
    related: ["privacy", "support"],
  },
  support: {
    terms: {
      support: 5,
      contact: 4,
      help: 3,
      email: 3,
      issue: 2,
      question: 2,
      reach: 2,
      "customer support": 5,
    },
    replies: [
      "For support questions, contact support@aimteralabs.com. Privacy-specific questions can go to privacy@aimteralabs.com.",
      "Support is available via support@aimteralabs.com, and privacy requests are best sent to privacy@aimteralabs.com.",
      "If you need help, use support@aimteralabs.com. For privacy matters, use privacy@aimteralabs.com.",
    ],
    quickPrompts: [
      "What is the support email?",
      "Privacy contact details",
      "Tell me about Aimtera products",
    ],
    related: ["company", "privacy"],
  },
  pricing: {
    terms: {
      price: 4,
      pricing: 4,
      fee: 3,
      cost: 3,
      free: 3,
      paid: 2,
      subscription: 2,
      "zero admin fees": 6,
    },
    replies: [
      "RBMarket is positioned with zero admin fees. Lume and SymmetryAI pricing details are expected closer to broader release milestones.",
      "Current public pricing detail is strongest for RBMarket: zero admin fees. Future pricing for Lume and SymmetryAI has not been finalized publicly.",
      "RBMarket highlights zero admin fees. Lume and SymmetryAI pricing will be communicated when launch plans are finalized.",
    ],
    quickPrompts: [
      "Is RBMarket free?",
      "Tell me about Lume status",
      "Tell me about SymmetryAI status",
    ],
    related: ["rbmarket", "lume", "symmetryai"],
  },
  safety: {
    terms: {
      safety: 5,
      scam: 5,
      trust: 4,
      secure: 3,
      reputation: 3,
      vouch: 4,
      report: 3,
      fraud: 3,
    },
    replies: [
      "RBMarket emphasizes transparent profiles plus reputation and reporting signals to help users evaluate trade risk.",
      "Safety on RBMarket is supported through trust indicators, public trader context, and reporting mechanisms.",
      "For trading confidence, RBMarket uses profile transparency with reputation and report signals so users can make informed decisions.",
    ],
    quickPrompts: [
      "How does vouch-based reputation work?",
      "How can I contact support?",
      "Is RBMarket free to use?",
    ],
    related: ["rbmarket", "support"],
  },
};

const TOPIC_ORDER: TopicId[] = [
  "company",
  "rbmarket",
  "lume",
  "symmetryai",
  "privacy",
  "accountDeletion",
  "support",
  "pricing",
  "safety",
];

const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "by",
  "for",
  "from",
  "how",
  "i",
  "in",
  "is",
  "it",
  "me",
  "my",
  "of",
  "on",
  "or",
  "that",
  "the",
  "to",
  "what",
  "when",
  "where",
  "which",
  "who",
  "with",
  "you",
  "your",
]);

const FOLLOW_UP_TERMS = new Set([
  "it",
  "that",
  "this",
  "also",
  "more",
  "details",
  "explain",
  "pricing",
  "cost",
  "safe",
  "safety",
  "when",
  "how",
  "why",
  "does",
  "work",
]);

const DEFAULT_QUICK_PROMPTS = [
  "What is Aimtera Labs?",
  "Explain RBMarket",
  "How does Lume work?",
  "What is SymmetryAI?",
];

const TOPIC_LINKS: Record<TopicId, TopicLink[]> = {
  company: [
    { label: "Home", href: "/" },
    { label: "RBMarket", href: "/rbmarket" },
    { label: "Privacy", href: "/privacy" },
  ],
  rbmarket: [
    { label: "RBMarket", href: "/rbmarket" },
    { label: "Terms", href: "/terms" },
    { label: "Support Email", href: "mailto:support@aimteralabs.com" },
  ],
  lume: [
    { label: "Lume", href: "/lume" },
    { label: "Privacy", href: "/privacy" },
    { label: "Support Email", href: "mailto:support@aimteralabs.com" },
  ],
  symmetryai: [
    { label: "SymmetryAI", href: "/symmetryai" },
    { label: "Privacy", href: "/privacy" },
    { label: "Support Email", href: "mailto:support@aimteralabs.com" },
  ],
  privacy: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Account Deletion", href: "/account-deletion" },
    { label: "Privacy Email", href: "mailto:privacy@aimteralabs.com" },
  ],
  accountDeletion: [
    { label: "Account Deletion", href: "/account-deletion" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Support Email", href: "mailto:support@aimteralabs.com" },
  ],
  support: [
    { label: "Contact Support", href: "mailto:support@aimteralabs.com" },
    { label: "Privacy Contact", href: "mailto:privacy@aimteralabs.com" },
    { label: "Home", href: "/" },
  ],
  pricing: [
    { label: "RBMarket", href: "/rbmarket" },
    { label: "Lume", href: "/lume" },
    { label: "SymmetryAI", href: "/symmetryai" },
  ],
  safety: [
    { label: "RBMarket", href: "/rbmarket" },
    { label: "Terms", href: "/terms" },
    { label: "Support Email", href: "mailto:support@aimteralabs.com" },
  ],
};

const normalizeInput = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const tokenize = (normalized: string) =>
  normalized
    .split(" ")
    .map((token) => token.trim())
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));

const buildTermSet = (tokens: string[]) => {
  const terms = new Set<string>(tokens);
  for (let i = 0; i < tokens.length - 1; i += 1) {
    terms.add(tokens[i] + " " + tokens[i + 1]);
  }
  for (let i = 0; i < tokens.length - 2; i += 1) {
    terms.add(tokens[i] + " " + tokens[i + 1] + " " + tokens[i + 2]);
  }
  return terms;
};

const hashSeed = (value: string) => {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
};

const seededPick = (options: string[], seedSource: string) => {
  if (options.length === 0) return "";
  const index = hashSeed(seedSource) % options.length;
  return options[index];
};

const scoreTopic = (
  topic: TopicDefinition,
  normalizedInput: string,
  termSet: Set<string>,
) => {
  let score = 0;
  const entries = Object.entries(topic.terms);
  for (const [term, weight] of entries) {
    const hasMatch = term.includes(" ")
      ? normalizedInput.includes(term)
      : termSet.has(term);
    if (hasMatch) {
      score += weight;
    }
  }
  return score;
};

const detectFollowUp = (tokens: string[], normalizedInput: string) => {
  if (tokens.some((token) => FOLLOW_UP_TERMS.has(token))) return true;
  return (
    normalizedInput.includes("tell me more") ||
    normalizedInput.includes("what about") ||
    normalizedInput.includes("can you explain")
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const resolveTopic = (input: string, previousTopic: TopicId | null): TopicId => {
  const normalizedInput = normalizeInput(input);
  const tokens = tokenize(normalizedInput);
  const termSet = buildTermSet(tokens);
  const isFollowUp = detectFollowUp(tokens, normalizedInput);

  const scores: Record<TopicId, number> = {
    company: 0,
    rbmarket: 0,
    lume: 0,
    symmetryai: 0,
    privacy: 0,
    accountDeletion: 0,
    support: 0,
    pricing: 0,
    safety: 0,
  };

  for (const topicId of TOPIC_ORDER) {
    scores[topicId] = scoreTopic(KNOWLEDGE_BASE[topicId], normalizedInput, termSet);
  }

  if (previousTopic && isFollowUp) {
    scores[previousTopic] += 2.25;
    for (const relatedTopic of KNOWLEDGE_BASE[previousTopic].related) {
      scores[relatedTopic] += 0.85;
    }
  }

  let bestTopic: TopicId = "support";
  let bestScore = -1;
  for (const topicId of TOPIC_ORDER) {
    const score = scores[topicId];
    if (score > bestScore) {
      bestScore = score;
      bestTopic = topicId;
    }
  }

  if (bestScore < 1.5 && previousTopic && isFollowUp) {
    return previousTopic;
  }

  if (bestScore < 1.5) {
    return "support";
  }

  return bestTopic;
};

// eslint-disable-next-line react-refresh/only-export-components
export const buildBotReply = (userInput: string, previousTopic: TopicId | null) => {
  const topicId = resolveTopic(userInput, previousTopic);
  const topic = KNOWLEDGE_BASE[topicId];
  const normalizedInput = normalizeInput(userInput);

  const reply = seededPick(topic.replies, topicId + "|" + normalizedInput);
  const quickPrompts = topic.quickPrompts.slice(0, 3);

  return {
    topicId,
    reply,
    quickPrompts,
    links: TOPIC_LINKS[topicId],
  };
};

const createMessageId = () =>
  "msg-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [lastTopic, setLastTopic] = useState<TopicId | null>("company");
  const [quickPrompts, setQuickPrompts] = useState<string[]>(DEFAULT_QUICK_PROMPTS);
  const [suggestedLinks, setSuggestedLinks] = useState<TopicLink[]>(TOPIC_LINKS.company);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: createMessageId(),
      role: "bot",
      content:
        "I am Aimtera Assistant. Ask about Aimtera, RBMarket, Lume, SymmetryAI, privacy, support, or account deletion.",
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [open]);

  const scheduleBotReply = useCallback(
    (userInput: string) => {
      const { topicId, reply, quickPrompts: nextPrompts, links } = buildBotReply(
        userInput,
        lastTopic,
      );

      const latency = 420 + (hashSeed(normalizeInput(userInput)) % 420);
      setIsTyping(true);

      window.setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: createMessageId(),
            role: "bot",
            content: reply,
          },
        ]);
        setLastTopic(topicId);
        setQuickPrompts(nextPrompts);
        setSuggestedLinks(links);
        setIsTyping(false);
      }, latency);
    },
    [lastTopic],
  );

  const sendMessage = useCallback(
    (rawValue: string) => {
      const trimmed = rawValue.trim();
      if (!trimmed || isTyping) return;

      setMessages((prev) => [
        ...prev,
        { id: createMessageId(), role: "user", content: trimmed },
      ]);
      setInput("");
      scheduleBotReply(trimmed);
    },
    [isTyping, scheduleBotReply],
  );

  const launcherLabel = useMemo(
    () => (open ? "Close Aimtera assistant" : "Open Aimtera assistant"),
    [open],
  );

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-105"
          style={{
            background: "linear-gradient(135deg, hsl(213 60% 45%), hsl(213 60% 35%))",
            boxShadow: "0 8px 24px hsl(213 60% 45% / 0.35)",
          }}
          aria-label={launcherLabel}
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </button>
      )}

      {open && (
        <div
          className="fixed bottom-6 right-6 z-50 w-[370px] max-w-[calc(100vw-1.5rem)] rounded-2xl overflow-hidden flex flex-col border"
          style={{
            height: "min(540px, calc(100vh - 4rem))",
            background: "hsl(220 20% 10%)",
            borderColor: "hsl(0 0% 100% / 0.08)",
            boxShadow: "0 18px 50px hsl(0 0% 0% / 0.55)",
          }}
        >
          <div
            className="flex items-center justify-between px-4 py-3 shrink-0"
            style={{
              background: "hsl(220 20% 12%)",
              borderBottom: "1px solid hsl(0 0% 100% / 0.06)",
            }}
          >
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" style={{ color: "hsl(213 60% 55%)" }} />
              <span className="font-semibold text-sm" style={{ color: "hsl(0 0% 95%)" }}>
                Aimtera Assistant
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1 rounded-md transition-colors"
              style={{ color: "hsl(0 0% 60%)" }}
              aria-label={launcherLabel}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div
            className="px-4 py-2 text-[11px] leading-relaxed shrink-0"
            style={{
              color: "hsl(0 0% 68%)",
              borderBottom: "1px solid hsl(0 0% 100% / 0.06)",
              background: "hsl(220 20% 11%)",
            }}
          >
            Assistant responses are informational and may be incomplete. Use support channels for account-specific help.
          </div>

          <ScrollArea className="flex-1">
            <div className="px-4 py-3 pr-2 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={"flex gap-2 " + (message.role === "user" ? "justify-end" : "justify-start")}
                >
                  {message.role === "bot" && (
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: "hsl(213 60% 45% / 0.2)" }}
                    >
                      <Bot className="w-3.5 h-3.5" style={{ color: "hsl(213 60% 55%)" }} />
                    </div>
                  )}

                  <div
                    className="rounded-xl px-3.5 py-2.5 text-sm max-w-[82%] leading-relaxed"
                    style={
                      message.role === "user"
                        ? { background: "hsl(213 60% 45%)", color: "hsl(0 0% 100%)" }
                        : { background: "hsl(0 0% 100% / 0.07)", color: "hsl(0 0% 86%)" }
                    }
                  >
                    {message.content}
                  </div>

                  {message.role === "user" && (
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: "hsl(0 0% 100% / 0.12)" }}
                    >
                      <User className="w-3.5 h-3.5" style={{ color: "hsl(0 0% 70%)" }} />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2 justify-start">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: "hsl(213 60% 45% / 0.2)" }}
                  >
                    <Bot className="w-3.5 h-3.5" style={{ color: "hsl(213 60% 55%)" }} />
                  </div>
                  <div
                    className="rounded-xl px-3.5 py-2.5 text-sm max-w-[82%]"
                    style={{ background: "hsl(0 0% 100% / 0.07)", color: "hsl(0 0% 86%)" }}
                  >
                    <span className="inline-flex items-center gap-1">
                      <span className="animate-pulse">.</span>
                      <span className="animate-pulse [animation-delay:120ms]">.</span>
                      <span className="animate-pulse [animation-delay:240ms]">.</span>
                    </span>
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>
          </ScrollArea>

          <div
            className="px-3 pb-2 pt-1 shrink-0 flex flex-wrap gap-2"
            style={{ borderTop: "1px solid hsl(0 0% 100% / 0.06)" }}
          >
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => sendMessage(prompt)}
                disabled={isTyping}
                className="px-2.5 py-1.5 text-xs rounded-full border transition-colors disabled:opacity-60"
                style={{
                  color: "hsl(0 0% 88%)",
                  borderColor: "hsl(0 0% 100% / 0.15)",
                  background: "hsl(0 0% 100% / 0.03)",
                }}
              >
                {prompt}
              </button>
            ))}
          </div>

          <div
            className="px-3 pb-2 shrink-0 flex flex-wrap gap-2"
            style={{ borderTop: "1px solid hsl(0 0% 100% / 0.06)" }}
          >
            {suggestedLinks.map((link) => (
              <a
                key={link.label + link.href}
                href={link.href}
                className="px-2.5 py-1.5 text-xs rounded-full border transition-colors hover:opacity-80"
                style={{
                  color: "hsl(210 80% 78%)",
                  borderColor: "hsl(210 80% 78% / 0.35)",
                  background: "hsl(210 80% 50% / 0.08)",
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div
            className="px-3 py-3 shrink-0"
            style={{ borderTop: "1px solid hsl(0 0% 100% / 0.06)" }}
          >
            <form
              onSubmit={(event) => {
                event.preventDefault();
                sendMessage(input);
              }}
              className="flex gap-2"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about Aimtera products or support..."
                disabled={isTyping}
                className="flex-1 text-sm rounded-lg px-3.5 py-2.5 border focus:outline-none transition-colors disabled:opacity-70"
                style={{
                  background: "hsl(220 20% 14%)",
                  borderColor: "hsl(0 0% 100% / 0.08)",
                  color: "hsl(0 0% 90%)",
                }}
              />
              <button
                type="submit"
                disabled={isTyping || !input.trim()}
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-opacity hover:opacity-80 disabled:opacity-60"
                style={{ background: "hsl(213 60% 45%)" }}
                aria-label="Send message"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;
