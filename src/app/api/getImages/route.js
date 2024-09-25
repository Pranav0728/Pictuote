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
      .max_results(100) // Fetch more images to choose from
      .execute();

    if (!result || !result.resources) {
      throw new Error("No resources found in Cloudinary response.");
    }

    // Shuffle the images array to simulate randomness
    const shuffledImages = result.resources.sort(() => 0.5 - Math.random());
    const randomImages = shuffledImages.slice(0, 50);

    const imageUrls = randomImages.map((file) => file.public_id);
    return NextResponse.json(imageUrls);
  } catch (e) {
    console.error("Error fetching images from Cloudinary:", e.message);
    return new NextResponse(
      JSON.stringify({ message: "Error fetching images", error: e.message }),
      { status: 500 }
    );
  }
}
export const revalidate = 0;