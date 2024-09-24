"use server"
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const randomParam = Date.now(); // Use current timestamp as a unique value
    const response = await fetch(`https://zenquotes.io/api/quotes?random=${Date.now()}`);
    const data = await response.json();

    // Set no-cache headers
    const apiResponse = NextResponse.json(data);
    apiResponse.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    return apiResponse;
  } catch (e) {
    return new NextResponse(
      JSON.stringify({ message: "Error fetching quotes", error: e.message }),
      { status: 500 }
    );
  }
}
