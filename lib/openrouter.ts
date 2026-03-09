import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

// AIRouter (Stage internal) provider configuration
export const openrouter = createOpenAICompatible({
  name: "airouter",
  baseURL: "https://airouter.stage.in/v1",
  headers: {
    Authorization: `Bearer ${process.env.AIROUTER_API_KEY}`,
  },
});

// Default model - DeepSeek Chat (good for code review)
export const DEFAULT_MODEL = "deepseek/deepseek-chat";

// Alternative models (check AIRouter for available models):
// - "anthropic/claude-3.5-sonnet"
// - "openai/gpt-4o"
// - "deepseek/deepseek-coder"
