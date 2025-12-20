import { NextResponse } from "next/server";

const USERNAME = "hendsuuu";
const ORG_NAME = "berUang-Capstone";

// 🔥 REPO YANG DIPAKAI SAJA
const USER_REPOS = [
  "porto-v2",
  "web-porto",
  "Competition-Landscape-Filament",
  "crud-Berita-Ci4",
  "react",
//   "Joki",
  "tomat",
  "kicksteps",
  "Telegram-Bot",
  "Grand-Atma",
  "expressjs-multirole",
  "notes-app-backend",
  "javascript",
  "fullstack-react-express-jwt",
  "laravel-reverb-chat",
];

const ORG_REPOS = ["ML"];

export const revalidate = 60 * 60 * 6;

export async function GET() {
  const headers = {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  };

  const totals: Record<string, number> = {};

  const fetchLanguages = async (owner: string, repo: string) => {
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/languages`,
      { headers }
    );

    if (!res.ok) {
      const err = await res.json();
      console.error("GitHub API error:", err);
      return null;
    }

    return res.json();
  };

  for (const repo of USER_REPOS) {
    const languages = await fetchLanguages(USERNAME, repo);
    if (!languages) continue;

    for (const lang in languages) {
      totals[lang] = (totals[lang] || 0) + languages[lang];
    }
  }

  for (const repo of ORG_REPOS) {
    const languages = await fetchLanguages(ORG_NAME, repo);
    if (!languages) continue;

    for (const lang in languages) {
      totals[lang] = (totals[lang] || 0) + languages[lang];
    }
  }

  const totalBytes = Object.values(totals).reduce((a, b) => a + b, 0);

  const result = Object.entries(totals)
    .map(([language, bytes]) => ({
      language,
      percentage: +((bytes / totalBytes) * 100).toFixed(2),
    }))
    .sort((a, b) => b.percentage - a.percentage);

    console.log("GitHub Languages fetched:", totals, "bytes across", result.length, "languages");
  return NextResponse.json(result);
}
