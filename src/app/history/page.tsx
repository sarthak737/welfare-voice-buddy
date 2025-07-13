"use client";

import { useEffect, useState } from "react";

type HistoryEntry = {
  command: string;
  response: string;
  time: string;
};

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("voice-history");
    if (stored) setHistory(JSON.parse(stored));
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black p-6">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">
        Command History
      </h1>
      <div className="space-y-4">
        {history.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400">No history yet.</p>
        )}
        {history.map((entry, i) => (
          <div
            key={i}
            className="p-4 rounded-xl bg-gray-100 dark:bg-gray-800 border dark:border-gray-700"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {entry.time}
            </p>
            <p className="mt-2 font-medium text-gray-800 dark:text-white">
              You: {entry.command}
            </p>
            <p className="mt-1 text-blue-600 dark:text-blue-400">
              Bot: {entry.response}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
