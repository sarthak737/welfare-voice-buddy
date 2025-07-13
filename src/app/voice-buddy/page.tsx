"use client";

import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { MicrophoneIcon, StopIcon, PlayIcon } from "@heroicons/react/24/solid";

export default function VoiceBuddyPage() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recognitionRef = useRef<any>(null);

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      toast.error("Speech recognition not supported in this browser.");
      return;
    }

    if (recognitionRef.current) {
      recognitionRef.current.start();
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      toast.error(`Mic error: ${event.error}`);
      setIsListening(false);
    };

    recognition.onresult = (event: any) => {
      let interim = "";
      let final = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const text = result[0].transcript;
        result.isFinal ? (final += text + " ") : (interim += text);
      }

      setTranscript(final || interim);

      if (final.trim()) {
        setResponse("");
        processVoiceCommand(final.trim());
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
  };

  const processVoiceCommand = async (command: string) => {
    try {
      const res = await fetch("/api/voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command }),
      });

      const data = await res.json();
      const reply = data.response || "No response.";

      setResponse(reply);
      speakResponse(reply);
      toast.success("AI responded");

      const now = new Date().toLocaleString();
      const newEntry = { command, response: reply, time: now };
      const existing = JSON.parse(
        localStorage.getItem("voice-history") || "[]"
      );
      localStorage.setItem(
        "voice-history",
        JSON.stringify([newEntry, ...existing])
      );
    } catch (err) {
      console.error("API error:", err);
      toast.error("Something went wrong");
      setResponse("Error processing your request.");
    }
  };

  const speakResponse = (text: string) => {
    if (!("speechSynthesis" in window)) return;

    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-pink-200 p-4 dark:from-gray-900 dark:to-black">
      <div className="voice-buddy-container bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg max-w-md w-full">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <button
              onClick={isListening ? stopListening : startListening}
              className={`p-4 rounded-full ${
                isListening ? "bg-red-500" : "bg-blue-600"
              } text-white transition-all hover:scale-105`}
              aria-label={isListening ? "Stop listening" : "Start listening"}
            >
              {isListening ? (
                <StopIcon className="h-8 w-8" />
              ) : (
                <MicrophoneIcon className="h-8 w-8" />
              )}
            </button>
            {isListening && (
              <div className="absolute -inset-2 border-2 border-red-500 rounded-full animate-pulse"></div>
            )}
          </div>

          <div className="w-full">
            <div className="bg-gray-800 rounded-lg p-4 min-h-32 max-h-64 overflow-y-auto">
              {transcript && (
                <div className="mb-4">
                  <p className="text-sm text-gray-400">You said:</p>
                  <p className="text-white">{transcript}</p>
                </div>
              )}
              {response && (
                <div>
                  <p className="text-sm text-gray-400">Response:</p>
                  <p className="text-white">{response}</p>
                </div>
              )}
            </div>
          </div>

          {isSpeaking && (
            <div className="flex items-center gap-2 text-blue-400">
              <PlayIcon className="h-4 w-4 animate-pulse" />
              <span>Speaking...</span>
            </div>
          )}
        </div>
        <Link href="/history">
          <Button className="text-lg px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
            <Mic className="mr-2 h-5 w-5" />
            See history
          </Button>
        </Link>
      </div>
    </main>
  );
}
