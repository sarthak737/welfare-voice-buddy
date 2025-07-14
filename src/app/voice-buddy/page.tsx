"use client";

import { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Button } from "@/components/ui/button";
import { Mic, StopCircle, Volume2 } from "lucide-react";

export default function VoiceBuddyLite() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const nativeSupport =
    typeof window !== "undefined" &&
    (window.SpeechRecognition || window.webkitSpeechRecognition);

  const isSupported =
    browserSupportsSpeechRecognition || Boolean(nativeSupport);

  const speak = (text: string) => {
    const utter = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utter);
  };

  const handleProcess = async () => {
    if (!transcript.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command: transcript }),
      });

      const data = await res.json();
      const reply = data.response || "I didn't understand that.";
      setResponse(reply);
      speak(reply);
    } catch (err) {
      console.error("API error:", err);
      setResponse("Error processing voice command.");
    } finally {
      setLoading(false);
    }
  };

  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      handleProcess();
    } else {
      resetTranscript();
      setResponse("");
      SpeechRecognition.startListening({
        continuous: true,
        language: "en-US",
      });
    }
  };

  if (!isSupported) {
    return (
      <p className="text-red-500 text-center mt-8">
        ❌ Browser doesn't support Speech Recognition.
      </p>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
      <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md space-y-6 shadow-lg">
        <h1 className="text-2xl font-bold text-center">Voice Buddy</h1>

        <div className="flex justify-center">
          <Button
            onClick={toggleListening}
            disabled={loading}
            className="text-white bg-blue-600 hover:bg-blue-700"
          >
            {listening ? (
              <StopCircle className="w-5 h-5 mr-2" />
            ) : (
              <Mic className="w-5 h-5 mr-2" />
            )}
            {listening ? "Stop" : "Start"}
          </Button>
        </div>

        <div className="bg-gray-700 rounded-lg p-4 min-h-24">
          {transcript ? (
            <>
              <p className="text-sm text-gray-400">You said:</p>
              <p className="text-white">{transcript}</p>
            </>
          ) : (
            <p className="text-gray-400 text-center">Press start and speak</p>
          )}
        </div>

        <div className="bg-gray-700 rounded-lg p-4 min-h-24">
          {response ? (
            <>
              <p className="text-sm text-gray-400">Response:</p>
              <p className="text-white">{response}</p>
            </>
          ) : (
            <p className="text-gray-400 text-center">
              Response will appear here
            </p>
          )}
        </div>

        {response && (
          <div className="flex justify-center">
            <Button
              onClick={() => speak(response)}
              className="bg-green-600 hover:bg-green-700"
            >
              <Volume2 className="w-5 h-5 mr-2" />
              Speak Again
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
