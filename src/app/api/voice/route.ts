import { NextResponse } from "next/server";

const SYSTEM_PROMPTS = {
  en: `You are an AI assistant specialized in Indian government schemes.
  - Provide only accurate information from official government sources like india.gov.in, mygov.in, and ministry websites
  - Be concise and factual
  - If unsure, say you don't know rather than guessing
  - Format responses clearly with scheme name, eligibility, benefits, and application process
  - Include relevant official links when possible
  - Current year is ${new Date().getFullYear()}`,

  hi: `आप भारत सरकार की योजनाओं में विशेषज्ञता प्राप्त एक सहायक हैं।
  - केवल आधिकारिक सरकारी स्रोतों जैसे india.gov.in, mygov.in और मंत्रालयों की वेबसाइटों से सटीक जानकारी दें
  - संक्षिप्त और तथ्यात्मक रहें
  - यदि सुनिश्चित नहीं हैं तो अनुमान लगाने के बजाय कहें कि आपको नहीं पता
  - योजना का नाम, पात्रता, लाभ और आवेदन प्रक्रिया स्पष्ट रूप से बताएं
  - संभव हो तो प्रासंगिक आधिकारिक लिंक शामिल करें
  - वर्तमान वर्ष ${new Date().getFullYear()} है`,
};

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request format" },
        { status: 400 }
      );
    }

    const { query, language = "en" } = body;
    console.log("📨 Incoming query:", { query, language });

    if (typeof query !== "string" || !query.trim()) {
      return NextResponse.json(
        { error: "Query must be a non-empty string" },
        { status: 400 }
      );
    }

    if (!["en", "hi"].includes(language)) {
      return NextResponse.json(
        { error: "Language must be either 'en' or 'hi'" },
        { status: 400 }
      );
    }

    if (!process.env.TOGETHER_API_KEY) {
      console.error("❌ TOGETHER_API_KEY not configured");
      return NextResponse.json(
        { error: "Service configuration error" },
        { status: 500 }
      );
    }

    if (query.length > 500) {
      return NextResponse.json(
        { error: "Query too long. Maximum 500 characters" },
        { status: 400 }
      );
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);

    // 🔁 Dynamic model switching
    const model =
      language === "hi"
        ? "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo"
        : "mistralai/Mixtral-8x7B-v0.1";

    // 👇 Force Hindi output if needed
    const userContent =
      language === "hi"
        ? `${query.trim()} कृपया उत्तर हिंदी में दें।`
        : query.trim();

    const response = await fetch(
      "https://api.together.xyz/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
        },
        body: JSON.stringify({
          model,
          messages: [
            {
              role: "system",
              content: SYSTEM_PROMPTS[language as keyof typeof SYSTEM_PROMPTS],
            },
            { role: "user", content: userContent },
          ],
          max_tokens: 300,
          temperature: 0.3,
          top_p: 0.7,
          stream: false,
        }),
        signal: controller.signal,
      }
    );

    clearTimeout(timeout);

    if (!response.ok) {
      const errorText = await response.text().catch(() => "API error");
      console.error("❌ Together API error:", response.status, errorText);
      return NextResponse.json(
        { error: "Unable to process request. Please try again." },
        { status: response.status > 500 ? 503 : 400 }
      );
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      console.error("❌ Empty AI response");
      return NextResponse.json(
        { error: "Received empty response from service" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      response: reply,
      language,
      modelUsed: model,
    });
  } catch (error) {
    console.error("❌ Processing error:", error);

    if (error instanceof Error && error.name === "AbortError") {
      return NextResponse.json(
        { error: "Request timeout. Please try again." },
        { status: 408 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
