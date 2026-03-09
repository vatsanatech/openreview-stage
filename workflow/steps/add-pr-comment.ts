import { getBot } from "@/lib/bot";

export const addPRComment = async (
  threadId: string,
  body: string
): Promise<void> => {
  "use step";

  const bot = await getBot();
  const adapter = bot.getAdapter("github");
  await adapter.postMessage(threadId, { markdown: body });
};
