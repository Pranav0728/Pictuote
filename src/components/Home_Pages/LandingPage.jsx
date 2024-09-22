"use client";
import { useState } from "react";
import { FileText, Share2, ImageIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Feature from "../ui/feature";

export default function LandingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
    <>
      <div className="flex flex-col h-full pt-20 pb-24 px-4 md:py-26 md:px-32 w-full items-center text-center gap-12">
        <h1 className="max-w-lg md:max-w-2xl text-2xl md:text-4xl">
          Create and Share Beautiful Quotes Instantly
        </h1>
        
        <div className="flex gap-6 items-center flex-col md:flex-row max-w-screen-lg">
          <div className="flex flex-col gap-6 items-center">
            <h3 className="max-w-lg md:max-w-2xl text-xl md:text-2xl md:px-5">
              One-click quote generation for your social media, powered by Pictuote
            </h3>
            <Button
              onClick={startCreating}
              className="w-40 flex justify-center items-center"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Start Creating"
              )}
            </Button>
          </div>
          {/* <video
            playsInline
            controls
            width="520"
            height="360"
            className="mt-6 mx-auto rounded-lg shadow-lg "
          >
            <source src="/videos/pictuote-demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video> */}
        </div>

        <div className="flex flex-col md:pt-24 md:gap-25 gap-15 items-center">
          <div className="flex flex-col gap-12 items-center">
            <h1 className="max-w-lg md:max-w-2xl text-2xl md:text-4xl">
              Why Choose Pictuote?
            </h1>
            <p className="max-w-lg md:max-w-2xl text-base md:text-lg mx-10">
              Pictuote makes it easy for content creators to generate eye-catching posts with beautiful quotes in seconds. No design skills needed.
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
            <h1 className="max-w-lg md:max-w-2xl text-2xl md:text-4xl">
              Get Started with Pictuote
            </h1>
            <p className="max-w-lg md:max-w-2xl text-base md:text-lg mx-10">
              Whether you're a professional content creator or just getting started, Pictuote has everything you need to make an impact.
            </p>

            <Button
              className="w-40 flex justify-center items-center"
              type="submit"
              onClick={startCreating}
            >
              Start Now
            </Button>
          </div>
          <div className="flex flex-col gap-6 items-center">
            <h1 className="max-w-lg md:max-w-2xl text-2xl md:text-4xl">
              Have Questions?
            </h1>
            <p className="max-w-lg md:max-w-2xl text-base md:text-lg">
              Reach out to us for support or feedback. We’d love to hear from you!
            </p>
            <Link href="/contact">
              <Button size="tiny" variant="ghost">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
