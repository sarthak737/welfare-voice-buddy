"use client";
import { useState, useEffect } from "react";
import { Sun, Moon, HeartHandshake } from "lucide-react";
const Header = () => {
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

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };
  return (
    <header className="relative z-10 flex justify-between items-center p-4 max-w-7xl mx-auto backdrop-blur-sm">
      <div className="flex items-center gap-x-3">
        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
          <HeartHandshake className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent">
            Welfare Voice Buddy
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Your Government Services Helper
          </p>
        </div>
      </div>
      <button
        onClick={toggleTheme}
        className="cursor-pointer p-3 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 hover:scale-105"
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
  );
};
export default Header;
