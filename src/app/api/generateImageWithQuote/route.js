import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const imagePublicId = searchParams.get("image");
    const quote = searchParams.get("quote") || "Your Quote Here"; // Default text if no quote provided

    // Log the parameters to make sure they're correctly received
    console.log("Image Public ID:", imagePublicId);
    console.log("Quote:", quote);

    if (!imagePublicId) {
      throw new Error("Missing required query parameter: imagePublicId");
    }

    // Generate the image URL with background and overlay text
    const imageUrl = cloudinary.url(imagePublicId, {
      transformation: [
        {
          width: 1080,
          height: 1080,
          crop: "fill", // Instagram post dimensions
        },
        {
          background: "black",
          opacity: 50, 
          width: 1080,
          height: 1080,
          crop: "fill",
          gravity: "center",
        },
        {
          // Add the text overlay on top of the image
          overlay: {
            // font_family: "Courier new",
            font_family: "Arial",
            // font_family: "Open sans",
            // font_family: "Verdana",
            // font_family: "Roboto",
            font_size: 50,
            font_weight: "bold",
            text_align: "center",
            text: quote,
          },
          color: "white",
          gravity: "center",
          width: 1000, // Adjust width to fit inside the image
          crop: "fit",
        }
      ],
    });

    // Respond with the generated Cloudinary URL
    return NextResponse.json({ url: imageUrl });
  } catch (e) {
    console.error("Error generating image with quote:", e.message);
    return new NextResponse(
      JSON.stringify({ message: "Error generating image", error: e.message }),
      { status: 500 }
    );
  }
}

