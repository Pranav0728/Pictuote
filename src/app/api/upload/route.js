import cloudinary from '@/lib/cloudinary';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const fileStr = req.body.data; // Get base64 string from the request
      console.log('Received image data:', fileStr); // Log received data for debugging

      const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
        upload_preset: 'xeq1ny7f', // Replace with your actual Cloudinary preset
        folder: 'Quotes_General/' // Specify the folder
      });

      console.log('Upload response:', uploadedResponse); // Log the response from Cloudinary
      res.status(200).json({ url: uploadedResponse.secure_url }); // Return the uploaded image URL
    } catch (error) {
      console.error('Upload error:', error); // Log any error
      res.status(500).json({ error: 'Something went wrong with the image upload!' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' }); // Handle unsupported methods
  }
}
