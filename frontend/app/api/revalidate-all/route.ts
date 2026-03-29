import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

const PUBLIC_TAGS = [
  "services",
  "projects",
  "testimonials",
  "platformUpdates",
  "industries",
  "solutions",
  "teamMembers",
  "packages",
] as const;

// Called by the client on every user entry to ensure subsequent server-side
// reads bypass stale cache entries and fetch fresh data from the database.
export async function POST(): Promise<NextResponse> {
  for (const tag of PUBLIC_TAGS) {
    revalidateTag(tag, "max");
  }
  return NextResponse.json({ revalidated: true });
}
