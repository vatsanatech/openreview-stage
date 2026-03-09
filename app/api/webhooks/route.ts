import { after, NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getBot } from "@/lib/bot";

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  const bot = await getBot();
  const handler = bot.webhooks.github;

  if (!handler) {
    return NextResponse.json(
      { error: "GitHub adapter not configured" },
      { status: 404 }
    );
  }

  return handler(request, {
    waitUntil: (task) => after(() => task),
  }) as Promise<NextResponse>;
};
