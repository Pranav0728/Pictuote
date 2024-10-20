"use client";
import { CldImage } from "next-cloudinary";
import { useState } from "react";
import { Button } from "../ui/button";
import { ArrowDownIcon, ArrowUpIcon, Share2Icon, CoffeeIcon, WandIcon } from "lucide-react"; // Add Magic Wand icon

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

  const handleDownload = async (image, quote,author, index) => {
    setDownloadingIndex(index);
    try {
      const response = await fetch(
        `/api/generateImageWithQuote?image=${image}&quote=${encodeURIComponent(quote)}&author=${encodeURIComponent(author)}`
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const shareWebsite = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "✨ Discover Pictuote: Your Quote Generator!",
          text: "Generate beautiful quote images effortlessly and post them anywhere! 🎨 Inspire your audience with your creativity. Check it out now:",
          url: window.location.href,
        })
        .then(() => {
          console.log("Website shared successfully");
        })
        .catch((error) => {
          console.error("Error sharing website:", error);
          alert("Oops! Something went wrong while sharing. Please try again.");
        });
    } else {
      alert("It seems your browser doesn't support sharing. But don't worry, you can still share the link manually!");
    }
  };
  

  const buyMeCoffee = () => {
    window.open("https://www.buymeacoffee.com/PranavMolawade", "_blank");
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex justify-center items-center my-8  md:flex-row flex-col">
          {/* Generate Posts Button */}
          <Button
            className="bg-gradient-to-r w-52 m-2 from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-full shadow-lg text-lg font-bold transform transition-all hover:scale-110 hover:shadow-2xl focus:outline-none flex items-center"
            onClick={generateQuote}
          >
            <WandIcon className="mr-2" /> {/* Icon added */}
            Generate Posts
          </Button>
          {/* Share Button */}
          <Button
            className="bg-gradient-to-r m-2 w-52 from-green-400 to-teal-500 text-white px-4 py-2 rounded-full shadow-xl transform transition-all hover:scale-110 hover:shadow-2xl focus:outline-none flex items-center"
            onClick={shareWebsite}
          >
            <Share2Icon className="mr-2" />
            Share Pictuote
          </Button>
          {/* Buy Me a Coffee Button */}
          <Button
            className="bg-gradient-to-r m-2 w-52 from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full shadow-xl transform transition-all hover:scale-110 hover:shadow-2xl focus:outline-none flex items-center"
            onClick={buyMeCoffee}
          >
            <CoffeeIcon className="mr-2" />
            Buy Me a Coffee
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center mb-4">
          {loading
            ? Array(6)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="relative bg-gray-200 animate-pulse h-96  rounded-lg overflow-hidden"
                  >
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-300" />
                  </div>
                ))
            : images.map((image, index) => (
                <div
                  key={index}
                  className="relative bg-white shadow-lg border max-w-96 overflow-hidden"
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
                      dangerouslySetInnerHTML={{
                        __html: `${quotes[index].q}<br/><br/>— ${quotes[index].a}`,
                      }}
                    />
                  </div>
                  
                  )}

                  <div className="absolute bottom-0 right-0 m-2">
                    <Button
                      className={`hover:opacity-50 hover:bg-gray-100 text-black px-3 py-1 rounded-lg ${
                        downloadingIndex === index
                          ? "bg-green-600"
                          : "bg-gray-100"
                      }`}
                      onClick={() =>
                        handleDownload(
                          image,
                          htmlToText(quotes[index]?.q || ""),
                          htmlToText(quotes[index]?.a || ""),
                          index
                        )
                      }
                    >
                      {downloadingIndex === index ? (
                        <div className="loader"></div> // Add your spinner here
                      ) : (
                        <ArrowDownIcon />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
        </div>

        {!loading && quotes.length === 0 && (
          <p className="text-gray-600 text-center my-4">
            Click the button to Generate quotes.
          </p>
        )}

        {!loading && quotes.length > 0 && (
          <div className="fixed bottom-4 right-4">
            <Button
              className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white px-4 py-2 rounded-full shadow-xl transform transition-all hover:scale-110 hover:shadow-2xl focus:outline-none"
              onClick={scrollToTop}
            >
              <ArrowUpIcon size={24} />
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
