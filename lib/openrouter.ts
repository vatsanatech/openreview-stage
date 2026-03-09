import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

// OpenRouter provider configuration
export const openrouter = createOpenAICompatible({
  name: "openrouter",
  baseURL: "https://openrouter.ai/api/v1",
  headers: {
    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    "HTTP-Referer": process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000",
    "X-Title": "OpenReview Bot",
  },
});

// Default model - DeepSeek Chat (cheap and good for code review)
export const DEFAULT_MODEL = "deepseek/deepseek-chat";

// Alternative models you can use:
// - "anthropic/claude-3.5-sonnet" (best quality, more expensive)
// - "openai/gpt-4o" (good balance)
// - "google/gemini-pro-1.5" (good for long context)
// - "meta-llama/llama-3.1-70b-instruct" (open source, cheap)
