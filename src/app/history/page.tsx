"use client";

import { useEffect, useState } from "react";

type HistoryEntry = {
  command: string;
  response: string;
  time: string;
  id?: string; // Add unique identifier
};

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("voice-history");
      if (stored) {
        const parsedHistory = JSON.parse(stored);

        // Validate the data structure
        if (Array.isArray(parsedHistory)) {
          const validHistory = parsedHistory.filter(
            (entry) =>
              entry &&
              typeof entry === "object" &&
              typeof entry.command === "string" &&
              typeof entry.response === "string" &&
              typeof entry.time === "string"
          );
          setHistory(validHistory);
        } else {
          console.warn("Invalid history data format, clearing storage");
          localStorage.removeItem("voice-history");
        }
      }
    } catch (err) {
      console.error("Error loading history:", err);
      setError("Failed to load history data");
      // Clear corrupted data
      localStorage.removeItem("voice-history");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearHistory = () => {
    if (window.confirm("Are you sure you want to clear all history?")) {
      setHistory([]);
      localStorage.removeItem("voice-history");
    }
  };

  const deleteEntry = (index: number) => {
    const newHistory = history.filter((_, i) => i !== index);
    setHistory(newHistory);
    localStorage.setItem("voice-history", JSON.stringify(newHistory));
  };

  const formatTime = (timeString: string) => {
    try {
      const date = new Date(timeString);
      if (isNaN(date.getTime())) {
        return timeString; // Return original if invalid
      }
      return date.toLocaleString();
    } catch {
      return timeString;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500 dark:text-gray-400">
            Loading history...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-black p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-red-500 dark:text-red-400">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold dark:text-white">
            Command History
          </h1>
          {history.length > 0 && (
            <button
              onClick={clearHistory}
              className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              Clear All
            </button>
          )}
        </div>

        <div className="space-y-4">
          {history.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No command history yet.
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                Your voice commands and responses will appear here.
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {history.length} command{history.length !== 1 ? "s" : ""} in
                history
              </p>
              {history.map((entry, i) => (
                <div
                  key={entry.id || `${entry.time}-${i}`}
                  className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatTime(entry.time)}
                    </p>
                    <button
                      onClick={() => deleteEntry(i)}
                      className="text-gray-400 hover:text-red-500 text-xs px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      aria-label="Delete entry"
                    >
                      Delete
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        You said:
                      </p>
                      <p className="text-gray-800 dark:text-white break-words">
                        {entry.command}
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Assistant replied:
                      </p>
                      <p className="text-gray-800 dark:text-white break-words">
                        {entry.response}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
