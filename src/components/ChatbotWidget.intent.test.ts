import { buildBotReply, resolveTopic } from "@/components/ChatbotWidget";
import { describe, expect, it } from "vitest";

describe("Chatbot intent engine", () => {
  it("resolves RBMarket topic from marketplace language", () => {
    const topic = resolveTopic("How does RBMarket reputation and fees work?", null);
    expect(topic).toBe("rbmarket");
  });

  it("uses previous topic for follow-up prompts", () => {
    const topic = resolveTopic("tell me more", "lume");
    expect(topic).toBe("lume");
  });

  it("falls back to support for unrelated prompts", () => {
    const topic = resolveTopic("what is the weather today", null);
    expect(topic).toBe("support");
  });

  it("builds deterministic replies for same input", () => {
    const first = buildBotReply("Tell me about SymmetryAI", null);
    const second = buildBotReply("Tell me about SymmetryAI", null);

    expect(first.topicId).toBe("symmetryai");
    expect(second.topicId).toBe("symmetryai");
    expect(first.reply).toBe(second.reply);
    expect(first.quickPrompts).toEqual(second.quickPrompts);
    expect(first.links.length).toBeGreaterThan(0);
  });
});
