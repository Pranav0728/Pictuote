"use client";
import { useEffect, useRef, useState } from "react";
import { CldUploadWidget } from 'next-cloudinary';

const UploadWidget = () => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        uploadPreset: "xeq1ny7f",
      },
      function (error, result) {
        if (error) {
          console.error(error);
        }
        if (result && result.event === "success") {
          console.log(result.info);
        }
        // You can hide the overlay once upload is complete
        setIsUploading(false);
      }
    );
  }, []);

  const handleOpenWidget = () => {
    setIsUploading(true); // Show overlay before opening the widget
    widgetRef.current.open();
  };

  return (
    <div className="upload-container">
      <button onClick={handleOpenWidget} className="bg-red-600">
        Upload
      </button>
      
      {isUploading && (
        <div className="overlay">
          <div className="spinner">Uploading...</div>
        </div>
      )}
      
      <style jsx>{`
        .upload-container {
          position: relative;
          display: inline-block;
        }
        
        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.9);
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10;
        }
        
        .spinner {
          font-size: 1.5rem;
        }
      `}</style>
    </div>
  );
};

export default UploadWidget;
