import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(`https://zenquotes.io/api/quotes?random=${Math.random()}`);
    const data = await response.json();

    const headers = new Headers();
    headers.set('Cache-Control', 'no-store');

    return NextResponse.json(data, { headers }); 
  } catch (e) {
    return new NextResponse(
      JSON.stringify({ message: "Error fetching quotes", error: e.message }),
      { status: 500 }
    );
  }
}
