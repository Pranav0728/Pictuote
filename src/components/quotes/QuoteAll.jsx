"use client";
import { CldImage } from "next-cloudinary";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { ArrowDownIcon } from "lucide-react";
import axios from 'axios';
import dynamic from 'next/dynamic';

const htmlToText = (html) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || "";
};

function QuoteAll() {
  const [quotes, setQuotes] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [downloadingIndex, setDownloadingIndex] = useState(null);
  const [abortControllers, setAbortControllers] = useState([]);

  useEffect(() => {
    console.log("Images state updated:", images);
  }, [images]);

  useEffect(() => {
    console.log("Quotes state updated:", quotes);
  }, [quotes]);

  const generateQuote = () => {
    setLoading(true);
    
    // Create a new AbortController for this request
    const controller1 = new AbortController();
    const controller2 = new AbortController();
    
    // Abort previous requests if they exist
    abortControllers.forEach(controller => controller.abort());

    // Store the controllers in state for cleanup later
    setAbortControllers([controller1, controller2]);

    // Fetch images and quotes in parallel
    Promise.all([
      fetchImages(controller1.signal),
      fetchQuotes(controller2.signal)
    ])
      .then(([imagesData, quotesData]) => {
        setImages(imagesData);
        setQuotes(quotesData);
        console.log("Images and Quotes fetched successfully");
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("Request canceled:", error.message);
        } else {
          console.error("Error fetching data:", error);
        }
      })
      .finally(() => {
        setLoading(false);
        // Clear abort controllers after completion
        setAbortControllers([]);
      });
  };

  const fetchImages = (signal) => {
    return axios.get(`/api/getImages?random=${Math.random()}`, { signal })
      .then(response => {
        console.log("fetchImages called with data:", response.data);
        return response.data; // return images data
      })
      .catch(error => {
        console.error("Error fetching images:", error);
        throw error; // rethrow to handle in the Promise.all
      });
  };

  const fetchQuotes = (signal) => {
    return axios.get(`/api/quotes?random=${Math.random()}`, { signal })
      .then(response => {
        console.log("fetchQuotes called with data:", response.data);
        return response.data; // return quotes data
      })
      .catch(error => {
        console.error("Error fetching quotes:", error);
        throw error; // rethrow to handle in the Promise.all
      });
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

export default dynamic(() => Promise.resolve(QuoteAll), { ssr: false });
