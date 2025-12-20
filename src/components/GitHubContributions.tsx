"use client";

import { useEffect, useMemo, useState } from "react";

type Day = {
  date: string;
  contributionCount: number;
  contributionLevel: "NONE" | "FIRST_QUARTILE" | "SECOND_QUARTILE" | "THIRD_QUARTILE" | "FOURTH_QUARTILE";
};

type Week = {
  contributionDays: Day[]; // 7 items (Sun..Sat) biasanya, tapi aman kita handle
};

const CELL = 12;     // ukuran kotak
const GAP = 4;       // gap antar kotak

export default function GitHubContributions() {
  const [weeks, setWeeks] = useState<Week[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch("/api/github-contributions")
      .then((res) => res.json())
      .then((data) => {
        setWeeks(data.weeks);
        setTotal(data.totalContributions);
      });
  }, []);

  // ✅ Hijau untuk kontribusi, PUTIH untuk NONE
  const levelColor = (level: Day["contributionLevel"]) => {
    switch (level) {
      case "NONE":
        return "bg-white/20"; // no contribution => putih
      case "FIRST_QUARTILE":
        return "bg-emerald-900/80";
      case "SECOND_QUARTILE":
        return "bg-emerald-700";
      case "THIRD_QUARTILE":
        return "bg-emerald-500";
      case "FOURTH_QUARTILE":
        return "bg-emerald-300";
      default:
        return "bg-white/20";
    }
  };

  /**
   * ✅ Label bulan yang align dengan minggu:
   * Tampilkan nama bulan hanya ketika bulan berubah pada "week start day".
   * (mirip GitHub: label muncul di kolom minggu pertama bulan itu)
   */
  const monthLabels = useMemo(() => {
    const labels: { index: number; label: string }[] = [];
    let lastMonth = -1;

    weeks.forEach((w, i) => {
      const firstDay = w.contributionDays?.[0];
      if (!firstDay) return;

      const d = new Date(firstDay.date);
      const m = d.getMonth();
      if (m !== lastMonth) {
        labels.push({
          index: i,
          label: d.toLocaleString("en-US", { month: "short" }),
        });
        lastMonth = m;
      }
    });

    return labels;
  }, [weeks]);

  // Lebar label bulan = 1 kolom minggu (CELL) + gap
  const colWidth = CELL + GAP;

  return (
    <section className="text-white lg:w-full mx-auto px-11 lg:px-0">
  <h3 className="text-lg font-semibold mb-1">GitHub Contribution</h3>
  <p className="text-sm text-white/70 mb-4">
    {total} contributions in the last year
  </p>

  {/* Scroll container */}
  <div className="relative lg:w-full w-[300px] mx-auto overflow-x-auto">
    {/* Content wrapper (prevent shrink) */}
    <div className="min-w-max">

      {/* Month labels */}
      <div className="flex items-center mb-1">
        <div className="w-10 ml-2" />
        <div className="relative" style={{ height: 16 }}>
          {monthLabels.map((m) => (
            <span
              key={m.index}
              className="absolute text-xs text-white/60"
              style={{ left: m.index * colWidth }}
            >
              {m.label}
            </span>
          ))}
        </div>
      </div>

      {/* Grid + day labels */}
      <div className="flex gap-2">
        {/* Day labels */}
        <div
          className="w-10 relative shrink-0"
          style={{ height: 7 * (CELL + GAP) - GAP }}
        >
          <span
            className="absolute text-xs text-white/60"
            style={{ top: 1 * (CELL + GAP) - 2 }}
          >
            Mon
          </span>
          <span
            className="absolute text-xs text-white/60"
            style={{ top: 3 * (CELL + GAP) - 2 }}
          >
            Wed
          </span>
          <span
            className="absolute text-xs text-white/60"
            style={{ top: 5 * (CELL + GAP) - 2 }}
          >
            Fri
          </span>
        </div>

        {/* Heatmap */}
        <div className="flex" style={{ gap: GAP }}>
          {weeks.map((week, i) => (
            <div key={i} className="flex flex-col" style={{ gap: GAP }}>
              {week.contributionDays.map((day) => (
                <div
                  key={day.date}
                  title={`${day.contributionCount} contributions on ${day.date}`}
                  className={`${levelColor(day.contributionLevel)} rounded-[3px]`}
                  style={{ width: CELL, height: CELL }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>

  {/* Legend */}
  <div className="flex items-center justify-end gap-2 mt-3 text-xs text-white/60">
    <span>Less</span>
    <div className="flex" style={{ gap: GAP }}>
      <div style={{ width: CELL, height: CELL }} className="rounded-[3px] bg-white/20" />
      <div style={{ width: CELL, height: CELL }} className="rounded-[3px] bg-emerald-900/80" />
      <div style={{ width: CELL, height: CELL }} className="rounded-[3px] bg-emerald-700" />
      <div style={{ width: CELL, height: CELL }} className="rounded-[3px] bg-emerald-500" />
      <div style={{ width: CELL, height: CELL }} className="rounded-[3px] bg-emerald-300" />
    </div>
    <span>More</span>
  </div>
</section>

  );
}
