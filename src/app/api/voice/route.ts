import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { command } = await req.json();
  console.log("📨 Incoming command:", command);

  if (typeof command !== "string" || !command.trim()) {
    return NextResponse.json({ response: "Invalid command." }, { status: 400 });
  }

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

    console.log("📬 Together API status:", res.status);

    if (!res.ok) {
      const errorText = await res.text();
      console.error("❌ Together API error response:", errorText);
      return NextResponse.json(
        { response: "Together API error." },
        { status: res.status }
      );
    }

    const data = await res.json();
    console.log("📥 Together API data:", data);

    const reply = data.choices?.[0]?.message?.content?.trim() || "No response.";
    return NextResponse.json({ response: reply });
  } catch (err) {
    console.error("❌ Request failed:", err);
    return NextResponse.json(
      { response: "Internal server error." },
      { status: 500 }
    );
  }
}
