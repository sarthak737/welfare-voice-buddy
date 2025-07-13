import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { command } = await req.json();

  try {
    const res = await fetch("https://api.together.xyz/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
        messages: [
          { role: "system", content: "You are a helpful AI voice assistant." },
          { role: "user", content: command },
        ],
        max_tokens: 100,
        temperature: 0.7,
      }),
    });

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content?.trim() || "No response.";

    return NextResponse.json({ response: reply });
  } catch (err) {
    console.error("Together API error:", err);
    return NextResponse.json({ response: "API error." }, { status: 500 });
  }
}
