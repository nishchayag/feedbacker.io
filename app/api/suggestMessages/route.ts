import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { NextRequest } from "next/server";

export const maxDuration = 30;

export async function POST(_req: NextRequest): Promise<Response> {
  try {
    const prompt = [
      "Generate 3 concise and thoughtful questions that can be used to collect anonymous feedback from clients.",
      "Make them varied in tone and purpose (e.g., performance, collaboration, growth).",
      "Return them as a single string, separated by double pipe symbols: ||",
      "Example format:",
      "What can we improve on?||How effectively do we communicate during meetings?||What's one thing we could do to enhance your experience with us?",
      "Now generate a fresh set of 3 feedback questions in the same format.",
    ].join(" ");

    const result = await streamText({
      model: openai("gpt-4o"),
      messages: [
        {
          role: "system",
          content: "You help users generate feedback questions.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    // ✅ This returns a native Response with proper streaming
    return result.toDataStreamResponse();
  } catch (error) {
    console.error("❌ Feedback generation error:", error);

    return new Response(
      JSON.stringify({ error: "Failed to generate feedback suggestions." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
