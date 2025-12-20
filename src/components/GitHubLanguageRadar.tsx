/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import type { ChartOptions } from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

type Lang = {
  language: string;
  percentage: number;
};

export default function GitHubLanguageRadar() {
  const [data, setData] = useState<Lang[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  let isMounted = true;

  fetch("/api/github-languages")
    .then((res) => res.json())
    .then((res: Lang[]) => {
      if (isMounted) {
        setData(res.slice(0, 6));
      }
    })
    .finally(() => {
      if (isMounted) {
        setLoading(false);
      }
    });

  return () => {
    isMounted = false;
  };
}, []);

  if (loading) {
    return (
      <div className="w-[400px] mx-auto flex items-center justify-center h-[400px] text-white">
        <div className="animate-pulse text-sm tracking-wide">
          Loading GitHub Language Radar...
        </div>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="w-[400px] mx-auto text-center text-white text-sm">
        No language data available
      </div>
    );
  }

  const chartData = {
    labels: data.map((d) => d.language),
    datasets: [
      {
        label: "Language Usage (%)",
        data: data.map((d) => d.percentage),
        backgroundColor: "rgba(16, 185, 129, 0.25)",
        borderColor: "rgba(16, 185, 129, 1)",
        pointBackgroundColor: "rgba(16, 185, 129, 1)",
        borderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<"radar"> = {
    responsive: true,
    scales: {
      r: {
        beginAtZero: true,
        ticks: {
          color: "#ffffff",
          stepSize: 10,
          backdropColor: "transparent",
        //   display: false,
        },
        grid: {
          color: "rgba(255,255,255,0.25)",
        },
        angleLines: {
          color: "rgba(255,255,255,0.25)",
        },
        pointLabels: {
          color: "#ffffff",
          font: {
            size: 12,
            weight: 600,
            family: "Montserrat, sans-serif",
          },
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#ffffff",
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.raw}%`,
        },
      },
    },
  };

  return (
    <div className="lg:w-[450px]  max-w-xl mx-auto">
      <Radar className="ml-10" data={chartData} options={options} />
    </div>
  );
}
