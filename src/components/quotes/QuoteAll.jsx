"use client";
import { CldImage } from "next-cloudinary";
import { useState } from "react";
import { Button } from "../ui/button";

export default function QuoteAll() {
  const [quotes, setQuotes] = useState([]);

  const fetchQuotes = async () => {
    try {
      const response = await fetch(`/api/quotes`); // Ensure this endpoint works correctly
      const data = await response.json();
      setQuotes(data);
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center mb-4">
        <CldImage
          crop="fill"  
          priority
          width="300"
          height="300"
          src="Quotes/cukpfut6mwqb9vt18hsw"
          alt="Inspirational Quote Background"
          className="object-cover rounded-lg shadow-lg m-2"
        />
        <CldImage
          crop="fill"  
          priority
          width="300"
          height="300"
          src="Quotes/zcbkupgwoo2ocilqtgwf"
          alt="Inspirational Quote Background"
          className="object-cover rounded-lg shadow-lg m-2"
        />
        <CldImage
          crop="fill"  
          priority
          width="300"
          height="300"
          src="Quotes/zae0pn0ghakgn421thxo"
          alt="Inspirational Quote Background"
          className="object-cover rounded-lg shadow-lg m-2"
        />
      </div>
      <Button
        onClick={fetchQuotes}
      >
        Generate Posts
      </Button>
      <h1 className="text-2xl font-bold my-4">Quotes</h1>
      {quotes.length === 0 ? (
        <p className="text-gray-600">No quotes available. Click the button to load quotes.</p>
      ) : (
        quotes.map((quote, index) => (
          <div key={index} className="my-4 p-4 border border-gray-200 rounded-lg shadow-md">
            <p className="text-lg font-semibold">{quote.q}</p>
            <p className="text-sm text-gray-600 mt-2">- {quote.a}</p>
          </div>
        ))
      )}
    </div>
  );
}
