import { NextResponse } from "next/server";

const GITHUB_API = "https://api.github.com/graphql";

export async function GET() {
  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                contributionLevel
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch(GITHUB_API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        username: process.env.GITHUB_USERNAME,
      },
    }),
    next: { revalidate: 3600 }, // cache 1 jam
  });

  const json = await res.json();

  return NextResponse.json(
    json.data.user.contributionsCollection.contributionCalendar
  );
}
