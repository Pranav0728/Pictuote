"use client";
import { useState, useEffect } from "react";
import { FileText, Share2, ImageIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Feature from "../ui/feature";
import "cloudinary-video-player/cld-video-player.min.css";

export default function LandingPage() {
  const router = useRouter();
  const [videoSrc, setVideoSrc] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCloudinaryVideoPlayer = async () => {
      const cloudinary = await import("cloudinary-video-player");
      // Initialize your video player or any related logic here
    };
    loadCloudinaryVideoPlayer();
  }, []);
  // Fetch video from Cloudinary on component mount
  useEffect(() => {
    const fetchVideo = async () => {
      const publicId = "Quotes/Home/hnqzix8dqzoahqixlkha"; // Replace with your public ID
      const response = await fetch(`/api/getVideo?publicId=${publicId}`);
      if (response.ok) {
        const data = await response.json();
        setVideoSrc(data.resources[0].secure_url); // Adjust based on the response structure
      } else {
        console.error("Error fetching video:", response.statusText);
      }
    };
    fetchVideo();
  }, []);

  const startCreating = () => {
    setLoading(true);
    try {
      router.push(`/post`);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full pt-20 pb-24 px-4 md:py-26 md:px-32 w-full items-center text-center gap-12 ">
      <h1 className="max-w-lg md:max-w-2xl text-3xl md:text-4xl font-bold">
        Generate and Share{" "}
        <span className="text-pink-500 text-6xl glow">Beautiful Quotes</span>{" "}
        Instantly
      </h1>

      <div className="flex gap-6 items-center mt-10 flex-col md:flex-row max-w-screen-lg">
        <div className="flex flex-col gap-6 items-center">
          <h3 className="max-w-lg md:max-w-2xl text-xl md:text-2xl md:px-5 text-gray-700">
            <span className="font-bold text-indigo-500">One-click</span> quote
            generation for your social media, powered by{" "}
            <span className="text-pink-500 font-bold">Pictuote</span>
          </h3>
          <Button
            onClick={startCreating}
            className="w-40 flex justify-center items-center bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-semibold text-lg px-4 py-2 rounded-md"
            type="button"
            disabled={loading}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Start Generating"
            )}
          </Button>
        </div>

        <video
          id="player"
          loop
          autoPlay
          muted
          src={videoSrc}
          className="cld-video-player cld-fluid shadow-2xl rounded-md"
        ></video>
      </div>

      <div className="flex flex-col mt-20 md:gap-25 gap-15 items-center">
        <div className="flex flex-col gap-12 items-center">
          <h1 className="max-w-lg md:max-w-2xl text-3xl md:text-5xl font-bold text-purple-600">
            Why Choose <span className="text-pink-500 glow">Pictuote?</span>
          </h1>
          <p className="max-w-lg md:max-w-2xl text-base md:text-xl mx-10 text-gray-600">
            Pictuote makes it{" "}
            <span className="font-bold text-green-500">easy</span> for content
            creators to generate{" "}
            <span className="font-bold text-yellow-500">eye-catching</span>{" "}
            posts with beautiful quotes in seconds. No design skills needed.
          </p>

          <div className="flex flex-col md:flex-row gap-12 items-center md:mb-20">
            <Feature
              icon={<FileText size={24} />}
              headline="Unlimited Quote Designs"
              description="Generate unique quote designs with every click, perfect for your social feed."
            />
            <Feature
              icon={<ImageIcon size={24} />}
              headline="Customizable Images"
              description="Choose from a wide range of stunning backgrounds or upload your own."
            />
            <Feature
              icon={<Share2 size={24} />}
              headline="Share with One Click"
              description="Easily share your creations to Instagram, Twitter, and other platforms."
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 max-w-lg md:max-w-2xl items-center md:mb-20">
          <h1 className="max-w-lg md:max-w-2xl text-3xl md:text-5xl font-bold text-teal-500">
            Get Started with <span className="glowi">Pictuote</span>
          </h1>
          <p className="max-w-lg md:max-w-2xl text-base md:text-xl mx-10 text-gray-600">
            Whether you&apos;re a professional content creator or just getting
            started, Pictuote has everything you need to make an impact.
          </p>

          <Button
            className="w-40 flex justify-center items-center bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-semibold text-lg px-4 py-2 rounded-md"
            type="button"
            onClick={startCreating}
          >
            Start Now
          </Button>
        </div>

        <div className="flex flex-col gap-6 items-center">
          <h1 className="max-w-lg md:max-w-2xl text-3xl md:text-5xl font-bold text-red-500">
            Have Questions?
          </h1>
          <p className="max-w-lg md:max-w-2xl text-base md:text-xl text-gray-600">
            Reach out to us for support or feedback. We’d love to hear from you!
          </p>
          <Link href="/feedback">
            <Button
              size="tiny"
              className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold px-4 py-2 rounded-md"
              variant="ghost"
            >
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
