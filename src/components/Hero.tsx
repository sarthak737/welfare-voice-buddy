"use client";
import { useState, useEffect } from "react";
import { Heart, Clock, Mic, ArrowRight, Volume2 } from "lucide-react";
const Hero = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage?.getItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    const initialTheme = savedTheme || systemTheme;

    setTheme(initialTheme as "light" | "dark");
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      if (window.localStorage) {
        window.localStorage.setItem("theme", theme);
      }
    }
  }, [theme, isLoaded]);
  return (
    <section className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 px-4 sm:px-8 py-8 sm:py-16 max-w-7xl mx-auto">
      <div
        className={`max-w-2xl text-center lg:text-left transition-all duration-1000 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 border border-green-200/50 dark:border-green-700/50 mb-4 sm:mb-6">
          <Heart className="h-4 w-4 text-green-600 dark:text-green-400 mr-2" />
          <span className="text-xs sm:text-sm font-medium text-green-700 dark:text-green-300">
            Designed for Everyone, Everywhere
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-gray-900 dark:text-white leading-tight mb-4 sm:mb-6">
          Your Voice,
          <br />
          <span className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Your Rights
          </span>
          <br />
          <span className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold">
            Made Simple
          </span>
        </h2>

        <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 leading-relaxed">
          No more confusing forms or long trips to government offices. Just
          speak naturally in your language, and get instant help with welfare
          schemes, benefits, and services that can change your life.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-6 sm:mb-8">
          <button
            onClick={() => (window.location.href = "/voice-buddy")}
            className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
          >
            <div className="flex items-center justify-center">
              <Mic className="mr-3 h-5 sm:h-6 w-5 sm:w-6 group-hover:animate-pulse" />
              <span className="text-base sm:text-lg font-semibold">
                शुरू करें / Start Speaking
              </span>
              <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity"></div>
          </button>
        </div>

        <div className="flex items-center justify-center lg:justify-start text-sm text-gray-500 dark:text-gray-400">
          <Clock className="h-4 w-4 text-purple-500 mr-2 flex-shrink-0" />
          <span>24/7 Available</span>
        </div>
      </div>

      <div
        className={`w-full max-w-lg mx-auto lg:mx-0 transition-all duration-1000 [transition-delay:300ms] ${
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-3xl blur-2xl"></div>
          <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20 dark:border-gray-700/20">
            <div className="text-center mb-6">
              <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <Volume2 className="h-8 sm:h-10 w-8 sm:w-10 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Speak in Your Language
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                Hindi, English, Punjabi, Bengali & more
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse mr-3 mt-2 flex-shrink-0"></div>
                <div>
                  <span className="text-xs text-blue-600 dark:text-blue-400 font-medium block mb-1">
                    User (Hindi):
                  </span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    &quot;मुझे राशन कार्ड बनवाना है&quot;
                  </span>
                </div>
              </div>
              <div className="flex items-start p-3 bg-green-50 dark:bg-green-900/30 rounded-xl ml-4">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <div>
                  <span className="text-xs text-green-600 dark:text-green-400 font-medium block mb-1">
                    Assistant:
                  </span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    मैं आपकी राशन कार्ड बनवाने में मदद करूंगा। पहले बताइए...
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-center p-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:100ms]"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:200ms]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
