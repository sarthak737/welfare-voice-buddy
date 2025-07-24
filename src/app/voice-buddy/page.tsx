"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import {
  Mic,
  StopCircle,
  Volume2,
  AlertCircle,
  Sparkles,
  Bot,
  User,
  Clock,
  Waves,
  Languages,
} from "lucide-react";

interface HistoryEntry {
  command: string;
  response: string;
  time: string;
  id: string;
  language: "en" | "hi";
}

export default function VoiceBuddyLite() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [waveAnimation, setWaveAnimation] = useState([0, 0, 0, 0, 0]);
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [browserCompatibility, setBrowserCompatibility] = useState({
    speechRecognition: false,
    speechSynthesis: false,
  });

  // Refs for cleanup
  const currentUtterance = useRef<SpeechSynthesisUtterance | null>(null);
  const recognitionTimeout = useRef<NodeJS.Timeout | null>(null);
  const waveInterval = useRef<NodeJS.Timeout | null>(null);

  // Check browser compatibility on mount
  useEffect(() => {
    const speechRecognitionSupported =
      "webkitSpeechRecognition" in window || "SpeechRecognition" in window;
    const speechSynthesisSupported = "speechSynthesis" in window;

    setBrowserCompatibility({
      speechRecognition: speechRecognitionSupported,
      speechSynthesis: speechSynthesisSupported,
    });

    // Load history from localStorage
    const savedHistory = localStorage.getItem("voiceBuddyHistory");
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (err) {
        console.error("Failed to parse history", err);
      }
    }
  }, []);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // Animated wave bars for listening state
  useEffect(() => {
    if (listening) {
      waveInterval.current = setInterval(() => {
        setWaveAnimation((prev) => prev.map(() => Math.random() * 100));
      }, 150);
    } else {
      if (waveInterval.current) {
        clearInterval(waveInterval.current);
      }
      setWaveAnimation([0, 0, 0, 0, 0]);
    }

    return () => {
      if (waveInterval.current) {
        clearInterval(waveInterval.current);
      }
    };
  }, [listening]);

  // Save to history
  const saveToHistory = useCallback(
    (command: string, response: string) => {
      const entry: HistoryEntry = {
        command,
        response,
        time: new Date().toISOString(),
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        language,
      };

      const newHistory = [entry, ...history].slice(0, 20);
      setHistory(newHistory);
      localStorage.setItem("voiceBuddyHistory", JSON.stringify(newHistory));
    },
    [history, language]
  );

  const speak = useCallback(
    (text: string) => {
      if (!browserCompatibility.speechSynthesis) {
        setError(
          language === "en"
            ? "Speech synthesis not supported in this browser"
            : "इस ब्राउज़र में वॉइस सपोर्ट उपलब्ध नहीं है"
        );
        return;
      }

      if (currentUtterance.current) {
        window.speechSynthesis.cancel();
      }

      const utter = new SpeechSynthesisUtterance(text);
      currentUtterance.current = utter;

      // Set voice properties based on language
      utter.lang = language === "hi" ? "hi-IN" : "en-US";
      utter.rate = 0.9;
      utter.pitch = 1;
      utter.volume = 0.8;

      // Try to find appropriate voice
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find((v) =>
        language === "hi"
          ? v.lang.includes("hi-IN") || v.lang.includes("hi")
          : v.lang.includes("en-US") || v.lang.includes("en")
      );

      if (preferredVoice) {
        utter.voice = preferredVoice;
      }

      utter.onstart = () => {
        setIsSpeaking(true);
        setError(null);
      };

      utter.onend = () => {
        setIsSpeaking(false);
        currentUtterance.current = null;
      };

      utter.onerror = (event) => {
        console.error("Speech synthesis error:", event);
        setIsSpeaking(false);
        setError(
          language === "en"
            ? "Error occurred during speech synthesis"
            : "ध्वनि प्रतिक्रिया में त्रुटि हुई"
        );
        currentUtterance.current = null;
      };

      try {
        window.speechSynthesis.speak(utter);
      } catch (err) {
        console.error("Failed to start speech:", err);
        setError(
          language === "en"
            ? "Failed to start speech synthesis"
            : "ध्वनि प्रारंभ करने में विफल"
        );
        setIsSpeaking(false);
      }
    },
    [browserCompatibility.speechSynthesis, language]
  );

  const handleProcess = useCallback(async () => {
    const command = transcript.trim();
    if (!command) {
      setError(
        language === "en"
          ? "No speech detected. Please try again."
          : "कोई आवाज़ नहीं मिली। कृपया पुनः प्रयास करें।"
      );
      return;
    }

    setLoading(true);
    setError(null);

    if (recognitionTimeout.current) {
      clearTimeout(recognitionTimeout.current);
      recognitionTimeout.current = null;
    }

    try {
      const response = await fetch("/api/voice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: command,
          language: language,
        }),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      setResponse(data.response);
      saveToHistory(command, data.response);

      if (browserCompatibility.speechSynthesis) {
        speak(data.response);
      }
    } catch (err) {
      console.error("API error:", err);
      const errorMsg =
        language === "en"
          ? "Error processing voice command. Please try again."
          : "आदेश प्रसंस्करण में त्रुटि। कृपया पुनः प्रयास करें।";
      setError(errorMsg);
      setResponse(errorMsg);

      if (browserCompatibility.speechSynthesis) {
        speak(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  }, [
    transcript,
    speak,
    browserCompatibility.speechSynthesis,
    saveToHistory,
    language,
  ]);

  const startListening = useCallback(() => {
    if (!browserSupportsSpeechRecognition) {
      setError(
        language === "en"
          ? "Speech recognition not supported"
          : "वॉइस रिकग्निशन सपोर्ट नहीं है"
      );
      return;
    }

    setError(null);
    resetTranscript();
    setResponse("");

    try {
      SpeechRecognition.startListening({
        continuous: true,
        language: language === "hi" ? "hi-IN" : "en-US",
      });

      recognitionTimeout.current = setTimeout(() => {
        if (listening) {
          SpeechRecognition.stopListening();
          if (transcript.trim()) {
            handleProcess();
          } else {
            setError(
              language === "en"
                ? "No speech detected within time limit"
                : "समय सीमा के भीतर कोई आवाज़ नहीं मिली"
            );
          }
        }
      }, 30000);
    } catch (err) {
      console.error("Failed to start listening:", err);
      setError(
        language === "en"
          ? "Failed to start speech recognition"
          : "वॉइस रिकग्निशन शुरू करने में विफल"
      );
    }
  }, [
    browserSupportsSpeechRecognition,
    resetTranscript,
    listening,
    transcript,
    handleProcess,
    language,
  ]);

  const stopListening = useCallback(() => {
    try {
      SpeechRecognition.stopListening();

      if (recognitionTimeout.current) {
        clearTimeout(recognitionTimeout.current);
        recognitionTimeout.current = null;
      }

      if (transcript.trim()) {
        handleProcess();
      } else {
        setError(
          language === "en" ? "No speech detected" : "कोई आवाज़ नहीं मिली"
        );
      }
    } catch (err) {
      console.error("Failed to stop listening:", err);
      setError(
        language === "en"
          ? "Failed to stop speech recognition"
          : "वॉइस रिकग्निशन रोकने में विफल"
      );
    }
  }, [transcript, handleProcess, language]);

  const toggleListening = useCallback(() => {
    if (listening) {
      stopListening();
    } else {
      startListening();
    }
  }, [listening, startListening, stopListening]);

  const stopSpeaking = useCallback(() => {
    if (window.speechSynthesis && isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      currentUtterance.current = null;
    }
  }, [isSpeaking]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (browserCompatibility.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (recognitionTimeout.current) {
        clearTimeout(recognitionTimeout.current);
      }
      if (waveInterval.current) {
        clearInterval(waveInterval.current);
      }
      if (listening) {
        SpeechRecognition.stopListening();
      }
    };
  }, [browserCompatibility.speechSynthesis, listening]);

  // Auto-stop listening when page becomes hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && listening) {
        SpeechRecognition.stopListening();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [listening]);

  // Update voice when language changes during speech
  useEffect(() => {
    if (isSpeaking && currentUtterance.current) {
      stopSpeaking();
      speak(response);
    }
  }, [language]);

  if (
    !browserCompatibility.speechRecognition ||
    !browserSupportsSpeechRecognition
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl max-w-md w-full shadow-2xl">
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="text-white w-10 h-10" />
            </div>
            <h1 className="text-2xl font-bold text-white">
              {language === "en" ? "Browser Incompatible" : "ब्राउज़र असंगत"}
            </h1>
            <div className="text-red-200 space-y-4">
              <p>
                {language === "en"
                  ? "Your browser doesn't support speech recognition features."
                  : "आपका ब्राउज़र वॉइस रिकग्निशन का समर्थन नहीं करता है।"}
              </p>
              <div className="bg-white/5 rounded-2xl p-4">
                <p className="font-semibold mb-2">
                  {language === "en"
                    ? "Supported browsers:"
                    : "समर्थित ब्राउज़र:"}
                </p>
                <ul className="space-y-1 text-sm">
                  <li>• Google Chrome (desktop)</li>
                  <li>• Microsoft Edge (desktop)</li>
                  <li>• Safari (macOS/iOS)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // UI text based on language
  const uiText = {
    en: {
      title: "Voice Buddy",
      subtitle: "Your intelligent voice assistant",
      listening: "Listening...",
      speakNow: "Speak now...",
      startPrompt: "Press start and begin speaking",
      responsePlaceholder: "Response will appear here",
      history: "History",
      noHistory: "No conversations yet",
      startHistory: "Start speaking to build your history",
      stopSpeaking: "Stop Speaking",
      speakAgain: "Speak Again",
      processing: "Processing your request...",
      noSpeech: "No speech detected. Please try again.",
    },
    hi: {
      title: "वॉइस बडी",
      subtitle: "आपका बुद्धिमान आवाज सहायक",
      listening: "सुन रहा हूँ...",
      speakNow: "अब बोलें...",
      startPrompt: "शुरू करें और बोलना शुरू करें",
      responsePlaceholder: "प्रतिक्रिया यहां दिखाई देगी",
      history: "इतिहास",
      noHistory: "अभी तक कोई वार्तालाप नहीं",
      startHistory: "अपना इतिहास बनाने के लिए बोलना शुरू करें",
      stopSpeaking: "बोलना बंद करें",
      speakAgain: "फिर से बोलें",
      processing: "आपका अनुरोध प्रसंस्करण...",
      noSpeech: "कोई आवाज नहीं मिली। कृपया पुनः प्रयास करें।",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse [animation-delay:2s]"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                {uiText[language].title}
              </h1>
            </div>
            <p className="text-blue-200/80 text-lg">
              {uiText[language].subtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Voice Interface */}
            <div className="lg:col-span-2">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                {/* Browser compatibility warning */}
                {!browserCompatibility.speechSynthesis && (
                  <div className="mb-6 bg-yellow-500/20 border border-yellow-500/30 text-yellow-200 p-4 rounded-2xl flex items-start gap-3">
                    <AlertCircle className="flex-shrink-0 mt-0.5 w-5 h-5" />
                    <span className="text-sm">
                      {language === "en"
                        ? "Speech synthesis not supported. Text-only responses available."
                        : "ध्वनि संश्लेषण समर्थित नहीं है। केवल पाठ प्रतिक्रियाएं उपलब्ध हैं।"}
                    </span>
                  </div>
                )}

                {/* Error display */}
                {error && (
                  <div className="mb-6 bg-red-500/20 border border-red-500/30 text-red-200 p-4 rounded-2xl flex items-start gap-3">
                    <AlertCircle className="flex-shrink-0 mt-0.5 w-5 h-5" />
                    <span className="text-sm">{error}</span>
                  </div>
                )}

                {/* Language toggle */}
                <div className="flex justify-center mb-6">
                  <button
                    onClick={() =>
                      setLanguage((lang) => (lang === "en" ? "hi" : "en"))
                    }
                    className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-colors flex items-center gap-2"
                  >
                    <Languages className="w-4 h-4" />
                    <span>{language === "en" ? "हिंदी" : "English"}</span>
                  </button>
                </div>

                {/* Voice Visualizer */}
                <div className="text-center mb-8">
                  <div
                    className={`relative mx-auto w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
                      listening
                        ? "bg-gradient-to-r from-red-500/20 to-pink-500/20 border-2 border-red-400/50"
                        : loading
                        ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-2 border-blue-400/50"
                        : "bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-2 border-purple-400/30"
                    }`}
                  >
                    {listening && (
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-400/30 to-pink-400/30 animate-ping"></div>
                    )}
                    <div className="relative z-10 flex items-center gap-1">
                      {listening ? (
                        waveAnimation.map((height, i) => (
                          <div
                            key={i}
                            className="w-1 bg-red-400 rounded-full transition-all duration-150"
                            style={{ height: `${Math.max(8, height * 0.4)}px` }}
                          />
                        ))
                      ) : loading ? (
                        <div className="animate-spin w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full"></div>
                      ) : (
                        <Mic className="w-8 h-8 text-purple-300" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="flex justify-center gap-4 mb-8">
                  <button
                    onClick={toggleListening}
                    disabled={loading || isSpeaking}
                    className={`group relative px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                      listening
                        ? "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 shadow-lg shadow-red-500/25"
                        : "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg shadow-purple-500/25"
                    } text-white transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
                  >
                    <div className="flex items-center gap-3">
                      {listening ? (
                        <StopCircle className="w-5 h-5" />
                      ) : (
                        <Mic className="w-5 h-5" />
                      )}
                      <span>
                        {listening
                          ? language === "en"
                            ? "Stop & Process"
                            : "रोकें और प्रक्रिया करें"
                          : language === "en"
                          ? "Start Listening"
                          : "सुनना शुरू करें"}
                      </span>
                    </div>
                  </button>

                  {isSpeaking && (
                    <button
                      onClick={stopSpeaking}
                      className="px-6 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-orange-500/25"
                    >
                      {uiText[language].stopSpeaking}
                    </button>
                  )}
                </div>

                {/* Transcript Display */}
                <div className="mb-6">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 min-h-24">
                    {listening && (
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                        <span className="text-sm text-red-300 font-medium">
                          {uiText[language].listening}
                        </span>
                      </div>
                    )}

                    {transcript ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-blue-300" />
                          <span className="text-sm font-medium text-blue-300">
                            {language === "en" ? "You said:" : "आपने कहा:"}
                          </span>
                        </div>
                        <p className="text-white text-lg leading-relaxed ml-6">
                          {transcript}
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-16">
                        <p className="text-white/60 text-center">
                          {listening
                            ? uiText[language].speakNow
                            : uiText[language].startPrompt}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Response Display */}
                <div className="mb-6">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 min-h-24">
                    {loading ? (
                      <div className="flex items-center justify-center gap-3 h-16">
                        <div className="animate-spin w-5 h-5 border-2 border-purple-400 border-t-transparent rounded-full"></div>
                        <p className="text-purple-300 font-medium">
                          {uiText[language].processing}
                        </p>
                      </div>
                    ) : response ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Bot className="w-4 h-4 text-purple-300" />
                          <span className="text-sm font-medium text-purple-300">
                            {language === "en" ? "Assistant:" : "सहायक:"}
                          </span>
                        </div>
                        <p className="text-white text-lg leading-relaxed ml-6">
                          {response}
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-16">
                        <p className="text-white/60 text-center">
                          {uiText[language].responsePlaceholder}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                {response && (
                  <div className="flex justify-center gap-3">
                    {browserCompatibility.speechSynthesis && (
                      <button
                        onClick={() => speak(response)}
                        disabled={isSpeaking || loading}
                        className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-green-500/25"
                      >
                        <div className="flex items-center gap-2">
                          <Volume2 className="w-4 h-4" />
                          <span>
                            {isSpeaking
                              ? uiText[language].stopSpeaking
                              : uiText[language].speakAgain}
                          </span>
                        </div>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* History Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl h-full">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Clock className="w-5 h-5 text-purple-300" />
                    {uiText[language].history}
                  </h3>
                  <div className="text-sm text-blue-200 bg-blue-500/20 px-3 py-1 rounded-full">
                    {history.length} {language === "en" ? "saved" : "सहेजे गए"}
                  </div>
                </div>

                {history.length > 0 ? (
                  <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
                    {history.slice(0, 5).map((entry) => (
                      <div
                        key={entry.id}
                        className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-200"
                      >
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <User className="w-3 h-3 text-blue-300 mt-1 flex-shrink-0" />
                            <p className="text-sm text-blue-200 leading-tight">
                              {entry.command}
                            </p>
                          </div>
                          <div className="flex items-start gap-2">
                            <Bot className="w-3 h-3 text-purple-300 mt-1 flex-shrink-0" />
                            <p className="text-sm text-white/80 leading-tight">
                              {entry.response.substring(0, 100)}...
                            </p>
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="text-xs text-white/40">
                              {new Date(entry.time).toLocaleTimeString()}
                            </p>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-white/10">
                              {entry.language === "en" ? "EN" : "HI"}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Waves className="w-8 h-8 text-white/40" />
                    </div>
                    <p className="text-white/60">
                      {uiText[language].noHistory}
                    </p>
                    <p className="text-white/40 text-sm mt-1">
                      {uiText[language].startHistory}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
}
