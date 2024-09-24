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
      .expression('folder:Quotes/General')
      .max_results(200)
      .execute();

    if (!result || !result.resources) {
      throw new Error("No resources found in Cloudinary response.");
    }

    // Shuffle images using a unique timestamp to ensure randomness
    const shuffledImages = result.resources.sort(() => 0.5 - Math.random());
    const randomImages = shuffledImages.slice(0, 1);
    const imageUrls = randomImages.map((file) => cloudinary.url(file.public_id));

    // Set no-cache headers
    const response = NextResponse.json(imageUrls);
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    return response;

  } catch (e) {
    console.error("Error fetching images from Cloudinary:", e.message);
    return new NextResponse(
      JSON.stringify({ message: "Error fetching images", error: e.message }),
      { status: 500 }
    );
  }
}
