"use client";

import { useState, useEffect } from "react";
import {
  Sun,
  Moon,
  Mic,
  Brain,
  Shield,
  Users,
  Clock,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Globe,
  HeartHandshake,
} from "lucide-react";
import Link from "next/link";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: "blue" | "indigo" | "purple" | "green" | "orange" | "pink";
}

export default function LandingPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    const initialTheme = savedTheme || systemTheme;

    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("theme", theme);
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme, isLoaded]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900 transition-all duration-700">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse [animation-delay:1000ms]"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-6 max-w-7xl mx-auto backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            GovAssist Voice
          </h1>
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
      <section className="relative z-10 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 px-8 py-16 max-w-7xl mx-auto">
        <div
          className={`max-w-2xl text-center lg:text-left transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 border border-blue-200/50 dark:border-blue-700/50 mb-6">
            <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              Powered by Advanced AI
            </span>
          </div>

          <h2 className="text-6xl lg:text-7xl font-black text-gray-900 dark:text-white leading-tight mb-6">
            Government
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Services
            </span>
            <br />
            <span className="text-4xl lg:text-5xl font-bold">Made Simple</span>
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Skip the paperwork, skip the queues. Just speak to get instant help
            with benefits, applications, and government services in your
            language.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="/voice-buddy">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                <div className="flex items-center justify-center">
                  <Mic className="mr-3 h-6 w-6 group-hover:animate-pulse" />
                  <span className="text-lg font-semibold">Start Speaking</span>
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </button>
            </Link>
          </div>

          <div className="flex items-center justify-center lg:justify-start mt-8 space-x-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              <span>Free to use</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              <span>Multilingual</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              <span>24/7 Available</span>
            </div>
          </div>
        </div>

        <div
          className={`w-full max-w-lg mx-auto transition-all duration-1000 [transition-delay:300ms] ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-3xl blur-2xl"></div>
            <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/20">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <Mic className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Voice Interface
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Speak naturally, get instant responses
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse mr-3"></div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    &quot;How do I apply for benefits?&quot;
                  </span>
                </div>
                <div className="flex items-center p-3 bg-green-50 dark:bg-green-900/30 rounded-xl ml-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    I will guide you through the process...
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose GovAssist Voice?
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Revolutionary voice-powered assistance that makes government
              services accessible to everyone
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Brain className="h-8 w-8" />}
              title="AI-Powered Intelligence"
              description="Advanced language models understand complex queries and provide accurate, helpful responses about government services."
              color="blue"
            />
            <FeatureCard
              icon={<Globe className="h-8 w-8" />}
              title="Multilingual Support"
              description="Communicate in your preferred language. Supporting Hindi, English, Punjabi, and 50+ other languages."
              color="indigo"
            />
            <FeatureCard
              icon={<Clock className="h-8 w-8" />}
              title="24/7 Availability"
              description="Get help anytime, anywhere. No office hours, no waiting in line. Instant assistance when you need it."
              color="purple"
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8" />}
              title="Secure & Private"
              description="Your conversations are encrypted and private. Built with government-grade security standards."
              color="green"
            />
            <FeatureCard
              icon={<Users className="h-8 w-8" />}
              title="Accessibility First"
              description="Designed for everyone including elderly citizens, people with disabilities, and those uncomfortable with technology."
              color="orange"
            />
            <FeatureCard
              icon={<HeartHandshake className="h-8 w-8" />}
              title="Citizen-Centric"
              description="Built by understanding real citizen needs. Simplified processes, clear guidance, and helpful assistance."
              color="pink"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative z-10 py-20 px-6 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Services We Help With
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              From benefits to documentation, we haveve got you covered
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Social Security Benefits",
              "Healthcare Services",
              "Education Assistance",
              "Employment Support",
              "Housing Programs",
              "Tax Information",
              "Legal Aid",
              "Emergency Services",
            ].map((service, index) => (
              <div
                key={index}
                className="group p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200/50 dark:border-gray-700/50"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {service}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Get instant help and guidance
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-3xl"></div>
            <div className="relative z-10">
              <h3 className="text-4xl font-bold text-white mb-6">
                Ready to Simplify Your Government Experience?
              </h3>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of citizens who are already using voice
                technology to access government services faster and easier.
              </p>
              <Link href="/voice-buddy">
                <button className="group px-10 py-5 bg-white text-blue-600 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                  <div className="flex items-center justify-center">
                    <Mic className="mr-3 h-6 w-6 group-hover:animate-pulse" />
                    <span>Get Started Now</span>
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 p-8 text-center border-t border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              GovAssist Voice
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} GovAssist Voice. Empowering citizens
            through technology.
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
    <div className="group relative p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 border border-gray-200/50 dark:border-gray-700/50">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-transparent group-hover:from-blue-50/50 group-hover:to-indigo-50/50 dark:group-hover:from-blue-900/10 dark:group-hover:to-indigo-900/10 rounded-3xl transition-all duration-500"></div>
      <div className="relative z-10">
        <div
          className={`w-16 h-16 bg-gradient-to-r ${colorClasses[color]} rounded-2xl mb-6 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}
        >
          {icon}
        </div>
        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h4>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
