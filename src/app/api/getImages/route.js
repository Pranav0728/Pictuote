import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    // Fetch up to 200 results to have a larger pool of images
    const result = await cloudinary.search
      .expression('folder:Quotes/General')
      .max_results(200) // Increase the dataset size to get more images
      .execute();

    // Check if there are resources in the response
    if (!result || !result.resources) {
      throw new Error("No resources found in Cloudinary response.");
    }

    // Shuffle images using a timestamp seed for better randomness
    const shuffledImages = result.resources.sort(() => 0.5 - Math.random());

    // Get the first 50 randomly shuffled images
    const randomImages = shuffledImages.slice(0, 50);

    // Extract public_id of the images for generating URLs
    const imageUrls = randomImages.map((file) => file.public_id);

    // Set 'stale-while-revalidate' headers
    // Return the JSON response with cache headers
    return NextResponse.json(imageUrls);

  } catch (e) {
    console.error("Error fetching images from Cloudinary:", e.message);
    return new NextResponse(
      JSON.stringify({ message: "Error fetching images", error: e.message }),
      { status: 500 }
    );
  }
}
