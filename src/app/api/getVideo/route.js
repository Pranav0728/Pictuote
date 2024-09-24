// import { NextResponse } from 'next/server';
// import cloudinary from 'cloudinary';

// cloudinary.config({
//   cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Define the GET method
// export async function GET(request) {
//   const { searchParams } = new URL(request.url);
//   const publicId = searchParams.get('publicId');

//   if (!publicId) {
//     return NextResponse.json({ error: 'Public ID is required' }, { status: 400 });
//   }

//   try {
//     // Fetch the video metadata from Cloudinary
//     const videoData = await cloudinary.v2.api.resources_by_ids(publicId, { resource_type: 'video' });
//     return NextResponse.json(videoData);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: 'Error fetching video from Cloudinary' }, { status: 500 });
//   }
// }
