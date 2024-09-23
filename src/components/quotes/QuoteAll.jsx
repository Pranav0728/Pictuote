"use client";
import { CldImage } from "next-cloudinary";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { ArrowDownIcon } from "lucide-react";

const htmlToText = (html) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || "";
};

export default function QuoteAll() {
  const [quotes, setQuotes] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [downloadingIndex, setDownloadingIndex] = useState(null);

  const generateQuote = async () => {
    setLoading(true);
    await Promise.all([fetchImages(), fetchQuotes()]);
    setLoading(false);
  };

  const fetchImages = async () => {
    try {
      const response = await fetch(`/api/getImages?rand=${Math.random()}`, {
        headers: { 'Cache-Control': 'no-cache' }
      });
      console.log(response)
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const fetchQuotes = async () => {
    try {
      const response = await fetch(`/api/quotes?rand=${Math.random()}`, {
        headers: { 'Cache-Control': 'no-cache' }
      });
      const data = await response.json();
      console.log(response)
      setQuotes(data);
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  };

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

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center my-8">
        <Button
          className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-full shadow-lg text-lg font-bold"
          onClick={generateQuote}
        >
          Generate Posts
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center mb-4">
        {loading
          ? Array(50)
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
                      handleDownload(
                        image,
                        htmlToText(quotes[index].h),
                        index
                      )
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
            ))}
      </div>

      {!loading && quotes.length === 0 && (
        <p className="text-gray-600 text-center my-4">
          Click the button to load quotes.
        </p>
      )}
    </div>
  );
}
