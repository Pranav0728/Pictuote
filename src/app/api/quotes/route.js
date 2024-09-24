import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch random quotes from the API
    const response = await fetch(`https://zenquotes.io/api/quotes?random=${Math.random()}`);
    const data = await response.json();

    // Set 'stale-while-revalidate' headers
    const headers = new Headers();
    headers.set('Cache-Control', 'no-store');

    // Return the fetched data with the cache control headers
    return NextResponse.json(data, { headers });
  } catch (e) {
    // Handle any errors that may occur
    return new NextResponse(
      JSON.stringify({ message: "Error fetching quotes", error: e.message }),
      { status: 500 }
    );
  }
}
