"use client";

import { useEffect, useState } from "react";

type Language = {
  name: string;
  percent: number;
  total_seconds: number;
};

export default function WakaTimeStats() {
  const [totalHours, setTotalHours] = useState(0);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/wakatime")
      .then((res) => res.json())
      .then((data) => {
        setTotalHours((data.total_seconds ?? 0) / 3600);
        setLanguages(data.languages ?? []);
      })
      .catch(() => {
        setLanguages([]);
        setTotalHours(0);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="text-white w-full max-w-md">
      <h3 className="text-lg font-semibold mb-1">Coding Activity</h3>

      <p className="text-sm text-white/70 mb-4">
        {loading
          ? "Loading coding stats..."
          : `⏱ ${totalHours.toFixed(1)} hours coded in the last year`}
      </p>

      <div className="space-y-3">
        {!loading && languages.length === 0 && (
          <p className="text-xs text-white/50">
            No language data available
          </p>
        )}

        {languages.map((lang) => (
          <div key={lang.name}>
            <div className="flex justify-between text-xs mb-1 text-white/80">
              <span>{lang.name}</span>
              <span>{lang.percent.toFixed(1)}%</span>
            </div>

            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-400 rounded-full transition-all"
                style={{ width: `${lang.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
