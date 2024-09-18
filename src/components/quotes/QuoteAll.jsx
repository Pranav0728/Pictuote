"use client";
import { CldImage } from "next-cloudinary";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";

export default function QuoteAll() {
  const [quotes, setQuotes] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch(`/api/getImages`);
      const data = await response.json();
      setImages(data); // Store image public_ids in state
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const fetchQuotes = async () => {
    try {
      const response = await fetch(`/api/quotes`);
      const data = await response.json();
      setQuotes(data);
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Centered Generate Posts Button */}
      <div className="flex justify-center my-8">
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg text-lg font-bold"
          onClick={fetchQuotes}
        >
          Generate Posts
        </Button>
      </div>
      {/* Instagram-like Post Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center mb-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative bg-white shadow-lg border  overflow-hidden"
          >
            {/* Image Section */}
            <CldImage
              crop="fill"
              priority
              width="400"
              height="400"
              src={image} // Cloudinary public_id
              alt={`Quote Background ${index + 1}`}
              className="object-cover "
            />

            {/* Centered Quote Overlay */}
            {quotes[index] && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 text-white text-center">
                {/* Center the blockquote */}
                <div
                  className="text-lg font-semibold leading-tight"
                  dangerouslySetInnerHTML={{ __html: quotes[index].h }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Placeholder text when no quotes are available */}
      {quotes.length === 0 && (
        <p className="text-gray-600 text-center my-4">
          No quotes available. Click the button to load quotes.
        </p>
      )}
    </div>
  );
}
