"use client";
import { CldImage } from "next-cloudinary";
import { useState } from "react";
import { Button } from "../ui/button";

const htmlToText = (html) => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || '';
};

export default function QuoteAll() {
  const [quotes, setQuotes] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateQuote = () => {
    setLoading(true);
    fetchImages();
    fetchQuotes();
  };

  const fetchImages = async () => {
    try {
      const response = await fetch(`/api/getImages`);
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const fetchQuotes = async () => {
    try {
      const response = await fetch(`/api/quotes`);
      const data = await response.json();
      setQuotes(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching quotes:", error);
      setLoading(false);
    }
  };

  const handleDownload = async (image, quote) => {
    try {
      const response = await fetch(`/api/generateImageWithQuote?image=${image}&quote=${encodeURIComponent(quote)}`);
      const data = await response.json();
      
      // Fetch the image data as a blob
      const imageResponse = await fetch(data.url);
      const blob = await imageResponse.blob();
      
      // Create a temporary URL for the blob
      const url = URL.createObjectURL(blob);
      
      // Create a temporary anchor element
      const link = document.createElement('a');
      link.href = url;
      link.download = 'quote-image.png'; // Default filename, you can change it as needed
      
      // Append the anchor to the body
      document.body.appendChild(link);
      
      // Trigger the download
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(url); // Release the object URL
    } catch (error) {
      console.error("Error generating image with quote:", error);
    }
  };
  
  

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center my-8">
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg text-lg font-bold"
          onClick={generateQuote}
        >
          Generate Posts
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center mb-4">
        {loading
          ? Array(6)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="relative bg-gray-200 animate-pulse h-96 rounded-lg overflow-hidden"
                >
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-300" />
                </div>
              ))
          : images.map((image, index) => (
              <div
                key={index}
                className="relative bg-white shadow-lg border overflow-hidden"
              >
                <CldImage
                  crop="fill"
                  priority
                  width="400"
                  height="400"
                  src={image}
                  alt={`Quote Background ${index + 1}`}
                  className="object-cover "
                />

                {quotes[index] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 text-white text-center">
                    <div
                      className="text-lg font-semibold leading-tight"
                      dangerouslySetInnerHTML={{ __html: quotes[index].h }}
                    />
                  </div>
                )}

                <div className="absolute bottom-0 right-0 m-2">
                  <Button
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg"
                    onClick={() => handleDownload(image, htmlToText(quotes[index].h))}
                  >
                    Download
                  </Button>
                </div>
              </div>
            ))}
      </div>

      {!loading && quotes.length === 0 && (
        <p className="text-gray-600 text-center my-4">
          No quotes available. Click the button to load quotes.
        </p>
      )}
    </div>
  );
}
