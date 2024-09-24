"use client";
import { CldImage } from "next-cloudinary";
import { useState } from "react";
import { Button } from "../ui/button";
import { ArrowDownIcon } from "lucide-react";
import useSWR, { mutate } from 'swr';
import axios from 'axios';

// Function to fetch data with axios
const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function QuoteAll() {
  const [downloadingIndex, setDownloadingIndex] = useState(null);
  
  const { data: images, error: imagesError } = useSWR(`/api/getImages?random=${Math.random()}`, fetcher);
  const { data: quotes, error: quotesError } = useSWR(`/api/quotes?random=${Math.random()}`, fetcher);

  const handleDownload = async (image, quote, index) => {
    setDownloadingIndex(index);
    try {
      const response = await fetch(
        `/api/generateImageWithQuote?image=${image}&quote=${encodeURIComponent(quote)}`
      );
      const data = await response.json();

      const imageResponse = await fetch(data.url);
      const blob = await imageResponse.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "quote-image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating image with quote:", error);
    } finally {
      setDownloadingIndex(null);
    }
  };

  // Log errors
  if (imagesError) console.error("Error fetching images:", imagesError);
  if (quotesError) console.error("Error fetching quotes:", quotesError);

  const generatePosts = () => {
    // Call mutate to re-fetch images and quotes
    mutate(`/api/getImages?random=${Math.random()}`);
    mutate(`/api/quotes?random=${Math.random()}`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center my-8">
        <Button
          className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-full shadow-lg text-lg font-bold"
          onClick={generatePosts}
        >
          Generate Posts
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center mb-4">
        {(!images && !imagesError) || (!quotes && !quotesError) ? (
          Array(50)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="relative bg-gray-200 animate-pulse h-96 rounded-lg overflow-hidden"
              >
                <div className="absolute inset-0 flex items-center justify-center bg-gray-300" />
              </div>
            ))
        ) : (
          images.map((image, index) => (
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
                className="object-cover"
              />

              {quotes[index] && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 text-white text-center">
                  <div
                    className="text-sm md:text-lg font-semibold leading-tight"
                    dangerouslySetInnerHTML={{ __html: quotes[index].h }}
                  />
                </div>
              )}

              <div className="absolute bottom-0 right-0 m-2">
                <Button
                  className={`hover:opacity-50 px-3 py-1 hover:bg-gray-200 rounded-lg ${
                    downloadingIndex === index
                      ? "bg-green-600"
                      : "bg-gray-200"
                  }`}
                  onClick={() =>
                    handleDownload(image, htmlToText(quotes[index].h), index)
                  }
                >
                  {downloadingIndex === index ? (
                    <div className="loader"></div>
                  ) : (
                    <ArrowDownIcon color="black" />
                  )}
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {!images && !imagesError && quotes.length === 0 && (
        <p className="text-gray-600 text-center my-4">
          Click the button to load quotes.
        </p>
      )}
    </div>
  );
}
