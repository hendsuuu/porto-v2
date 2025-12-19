import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(
    "https://wakatime.com/api/v1/users/current/stats/last_365_days",
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          process.env.WAKATIME_API_KEY + ":"
        ).toString("base64")}`,
      },
      next: { revalidate: 3600 }, // cache 1 jam
    }
  );

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch WakaTime" }, { status: 500 });
  }

  const data = await res.json();

  return NextResponse.json({
    total_seconds: data.data.total_seconds,
    languages: data.data.languages.slice(0, 5), // top 5 languages
  });
}
