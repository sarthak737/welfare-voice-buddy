"use client";

import { useState, useEffect } from "react";
import {
  Sun,
  Moon,
  Mic,
  Brain,
  Clock,
  CheckCircle,
  ArrowRight,
  HeartHandshake,
  Phone,
  FileText,
  MapPin,
  Star,
  Volume2,
  Languages,
  Accessibility,
  Heart,
} from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: "blue" | "indigo" | "purple" | "green" | "orange" | "pink";
}

interface TestimonialProps {
  name: string;
  location: string;
  quote: string;
  language: string;
}

function TestimonialCard({
  name,
  location,
  quote,
  language,
}: TestimonialProps) {
  return (
    <div className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50">
      <div className="flex items-center mb-4">
        <div className="flex space-x-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
          ))}
        </div>
      </div>
      <p className="text-gray-700 dark:text-gray-300 mb-4 italic leading-relaxed">
        &quot;{quote}&quot;
      </p>
      <div className="flex items-center justify-between">
        <div>
          <h5 className="font-semibold text-gray-900 dark:text-white">
            {name}
          </h5>
          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
            <MapPin className="h-3 w-3 mr-1" />
            {location}
          </p>
        </div>
        <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-1 rounded-full">
          {language}
        </span>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Get saved theme or default to system preference
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
    // Apply theme to document and save to localStorage
    if (isLoaded) {
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      // Save theme preference
      if (window.localStorage) {
        window.localStorage.setItem("theme", theme);
      }
    }
  }, [theme, isLoaded]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900 transition-all duration-700">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse [animation-delay:1000ms]"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full blur-2xl animate-pulse [animation-delay:2000ms]"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex flex-col sm:flex-row justify-between items-center p-4 sm:p-6 max-w-7xl mx-auto backdrop-blur-sm">
        <div className="flex items-center space-x-3 mb-4 sm:mb-0">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
            <HeartHandshake className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent">
              Digital Companion
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Your Government Services Helper
            </p>
          </div>
        </div>
        <button
          onClick={toggleTheme}
          className="p-3 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 hover:scale-105"
          aria-label={
            theme === "light" ? "Switch to dark mode" : "Switch to light mode"
          }
        >
          {theme === "light" ? (
            <Moon className="h-5 w-5 text-gray-700" />
          ) : (
            <Sun className="h-5 w-5 text-yellow-400" />
          )}
        </button>
      </header>

      {/* Hero Section */}
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

            <button className="group px-6 sm:px-8 py-3 sm:py-4 border-2 border-green-300 dark:border-green-600 text-green-700 dark:text-green-400 rounded-2xl font-semibold hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-300 flex items-center justify-center">
              <Phone className="mr-2 h-5 w-5" />
              <span className="text-sm sm:text-base">Call: 1800-XXX-XXXX</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center justify-center lg:justify-start">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
              <span>Completely Free</span>
            </div>
            <div className="flex items-center justify-center lg:justify-start">
              <Languages className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0" />
              <span>10+ Languages</span>
            </div>
            <div className="flex items-center justify-center lg:justify-start">
              <Clock className="h-4 w-4 text-purple-500 mr-2 flex-shrink-0" />
              <span>24/7 Available</span>
            </div>
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

      {/* Problem Statement Section */}
      <section className="relative z-10 py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-r from-gray-50 to-green-50 dark:from-gray-800 dark:to-green-900/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Breaking Down Barriers
            </h3>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Millions struggle with government services due to language,
              distance, and complexity. We&apos;re changing that, one
              conversation at a time.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-12">
            <div className="text-center p-6 bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-lg">
              <MapPin className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Distance Problem
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Remote areas, far from government offices, multiple trips
                required
              </p>
            </div>
            <div className="text-center p-6 bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-lg">
              <Languages className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Language Barriers
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Complex English forms, no local language support, confusing
                processes
              </p>
            </div>
            <div className="text-center p-6 bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-lg">
              <FileText className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Complex Procedures
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Overwhelming paperwork, unclear requirements, changing rules
              </p>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full font-semibold">
              <Heart className="h-5 w-5 mr-2" />
              Our Solution: A Caring Digital Companion
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How We Help People Like Priya
            </h3>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Every feature is designed with empathy, understanding the real
              challenges faced by citizens in rural and urban areas
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <FeatureCard
              icon={<Volume2 className="h-8 w-8" />}
              title="Voice-First Design"
              description="No typing, no reading complex menus. Just speak naturally like you're talking to a helpful friend who understands your needs."
              color="blue"
            />
            <FeatureCard
              icon={<Languages className="h-8 w-8" />}
              title="True Multilingual Support"
              description="Speak in Hindi, Punjabi, Bengali, Tamil, or any of 10+ Indian languages. We understand dialects and regional variations too."
              color="indigo"
            />
            <FeatureCard
              icon={<Brain className="h-8 w-8" />}
              title="Smart Eligibility Matching"
              description="Tell us about your situation, and we'll instantly identify all welfare schemes you qualify for - no more missing out on benefits."
              color="purple"
            />
            <FeatureCard
              icon={<Accessibility className="h-8 w-8" />}
              title="Accessibility Champion"
              description="Built for elderly citizens, people with disabilities, and those who've never used smartphones. Simple, patient, and understanding."
              color="green"
            />
            <FeatureCard
              icon={<FileText className="h-8 w-8" />}
              title="Document Helper"
              description="Confused about paperwork? We explain every document needed, help you check what you have, and remind you what's missing."
              color="orange"
            />
            <FeatureCard
              icon={<HeartHandshake className="h-8 w-8" />}
              title="Cultural Sensitivity"
              description="We understand Indian family structures, cultural contexts, and speak with the respect and patience you deserve."
              color="pink"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Real Stories, Real Impact
            </h3>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
              Hear from citizens who found their voice through our digital
              companion
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <TestimonialCard
              name="राज कुमारी"
              location="Jharkhand"
              quote="पहले मुझे समझ नहीं आता था कि कौन सी योजना मेरे लिए है। अब मैं बस बोलती हूं और सब कुछ समझ जाती हूं।"
              language="Hindi"
            />
            <TestimonialCard
              name="Manjeet Singh"
              location="Punjab"
              quote="ਮੈਂ ਕਦੇ ਸਰਕਾਰੀ ਦਫ਼ਤਰ ਨਹੀਂ ਗਿਆ ਸੀ। ਹੁਣ ਘਰ ਬੈਠੇ ਸਾਰਾ ਕੰਮ ਹੋ ਜਾਂਦਾ ਹੈ।"
              language="Punjabi"
            />
            <TestimonialCard
              name="Lakshmi Devi"
              location="Tamil Nadu"
              quote="எனக்கு எழுத படிக்க தெரியாது. ஆனால் இந்த system என்னோட பேச்சை புரிஞ்சுக்கிடும்."
              language="Tamil"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative z-10 py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Welfare Schemes & Services
            </h3>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
              From Aadhaar to housing schemes, we help with everything that
              matters to your family
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { name: "आधार कार्ड", icon: "🆔" },
              { name: "राशन कार्ड", icon: "🍚" },
              { name: "पेंशन योजना", icon: "👴" },
              { name: "आवास योजना", icon: "🏠" },
              { name: "स्वास्थ्य बीमा", icon: "🏥" },
              { name: "शिक्षा छात्रवृत्ति", icon: "🎓" },
              { name: "रोजगार गारंटी", icon: "💼" },
              { name: "किसान योजना", icon: "🌾" },
            ].map((service, index) => (
              <div
                key={index}
                className="group p-4 sm:p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200/50 dark:border-gray-700/50"
              >
                <div className="text-2xl sm:text-3xl mb-2 sm:mb-4 text-center group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h4 className="text-sm sm:text-lg font-semibold text-gray-900 dark:text-white text-center">
                  {service.name}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl sm:rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-2xl sm:rounded-3xl"></div>
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
                आपका अधिकार, आपकी आवाज़
                <br />
                <span className="text-lg sm:text-xl lg:text-2xl">
                  Your Rights, Your Voice
                </span>
              </h3>
              <p className="text-base sm:text-lg lg:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
                Join thousands who&apos;ve already discovered how easy
                government services can be. No forms, no travel, no confusion -
                just conversations that get results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => (window.location.href = "/voice-buddy")}
                  className="group w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-white text-green-600 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-center">
                    <Mic className="mr-3 h-5 sm:h-6 w-5 sm:w-6 group-hover:animate-pulse" />
                    <span>अभी शुरू करें / Start Now</span>
                    <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 p-6 sm:p-8 text-center border-t border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
              <HeartHandshake className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent">
              Digital Companion
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            © {new Date().getFullYear()} Digital Companion. Empowering every
            citizen through technology.
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            सरकारी सेवाएं, आसान भाषा में • Government Services, Made Simple
          </p>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, description, color }: FeatureCardProps) {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600 group-hover:from-blue-600 group-hover:to-blue-700",
    indigo:
      "from-indigo-500 to-indigo-600 group-hover:from-indigo-600 group-hover:to-indigo-700",
    purple:
      "from-purple-500 to-purple-600 group-hover:from-purple-600 group-hover:to-purple-700",
    green:
      "from-green-500 to-green-600 group-hover:from-green-600 group-hover:to-green-700",
    orange:
      "from-orange-500 to-orange-600 group-hover:from-orange-600 group-hover:to-orange-700",
    pink: "from-pink-500 to-pink-600 group-hover:from-pink-600 group-hover:to-pink-700",
  };

  return (
    <div className="group relative p-6 sm:p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 border border-gray-200/50 dark:border-gray-700/50">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-transparent group-hover:from-blue-50/50 group-hover:to-indigo-50/50 dark:group-hover:from-blue-900/10 dark:group-hover:to-indigo-900/10 rounded-2xl sm:rounded-3xl transition-all duration-500"></div>
      <div className="relative z-10">
        <div
          className={`w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-r ${colorClasses[color]} rounded-xl sm:rounded-2xl mb-4 sm:mb-6 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}
        >
          {icon}
        </div>
        <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h4>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
