"use client";

import { useState, useEffect } from "react";
import { Sun, Moon, Mic, Brain, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LandingPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 dark:from-gray-900 dark:to-black transition-colors duration-500">
      <header className="flex justify-between items-center p-6">
        <h1 className="text-3xl font-bold dark:text-white">
          Welfare Voice Buddy
        </h1>
        <Button
          variant="ghost"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? (
            <Moon className="h-6 w-6" />
          ) : (
            <Sun className="h-6 w-6" />
          )}
        </Button>
      </header>

      <section className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 px-8 py-20">
        <motion.div
          className="max-w-xl text-center lg:text-left"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
            Speak Freely. <br /> Get Instant Responses.
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Your voice-powered AI buddy to assist, respond and understand you in
            real-time. Say goodbye to typing.
          </p>
          <Link href="/voice-buddy">
            <Button className="text-lg px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
              <Mic className="mr-2 h-5 w-5" /> Start Talking
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="/voice-buddy-illustration.png"
            alt="Voice Buddy Illustration"
            className="w-full max-w-md"
          />
        </motion.div>
      </section>

      <section className="py-20 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Why Welfare Voice Buddy?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Feature
              icon={<Brain className="h-8 w-8" />}
              title="AI Powered"
              text="Uses advanced AI to understand and respond to your voice instantly."
            />
            <Feature
              icon={<MessageCircle className="h-8 w-8" />}
              title="Natural Communication"
              text="No typing, just speak and get what you want."
            />
            <Feature
              icon={<Mic className="h-8 w-8" />}
              title="Speech First"
              text="Designed around voice interactions. Mobile-friendly and fast."
            />
          </div>
        </div>
      </section>

      <footer className="p-6 text-center text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Welfare Voice Buddy. All rights reserved.
      </footer>
    </main>
  );
}

function Feature({
  icon,
  title,
  text,
}: {
  icon: JSX.Element;
  title: string;
  text: string;
}) {
  return (
    <motion.div
      className="flex flex-col items-center p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="mb-4 text-blue-600 dark:text-blue-400">{icon}</div>
      <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h4>
      <p className="text-gray-600 dark:text-gray-300 text-sm text-center">
        {text}
      </p>
    </motion.div>
  );
}
