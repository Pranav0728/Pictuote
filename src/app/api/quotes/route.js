import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(`https://zenquotes.io/api/quotes?random=${Math.random()}`);
    const data = await response.json();

    // Set no-cache headers
    const apiResponse = NextResponse.json(data);
    return apiResponse;
  } catch (e) {
    return new NextResponse(
      JSON.stringify({ message: "Error fetching quotes", error: e.message }),
      { status: 500 }
    );
  }
}
export const revalidate = 0;
