// /pages/api/getImages.js
import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    const result = await cloudinary.search
      .expression('folder:Quotes') // Ensure folder name is correct
      .max_results(5)
      .execute();

    if (!result || !result.resources) {
      throw new Error("No resources found in Cloudinary response.");
    }

    const imageUrls = result.resources.map((file) => file.public_id);
    return NextResponse.json(imageUrls);
  } catch (e) {
    console.error("Error fetching images from Cloudinary:", e.message);
    return new NextResponse(
      JSON.stringify({ message: "Error fetching quotes", error: e.message }),
      { status: 500 }
    );
  }
}
