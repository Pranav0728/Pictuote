"use client";
import { CoffeeIcon } from "lucide-react";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function Feedback() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0); // New rating state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          feedback,
          rating, // Send rating in the request
        }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      // Clear form fields on success
      setName("");
      setEmail("");
      setFeedback("");
      setRating(0);
    } catch (err) {
      setError(err.message || "Failed to submit feedback");
    } finally {
      setLoading(false);
      alert("Feedback submitted successfully!");
    }
  };
  const buyMeCoffee = () => {
    window.open("https://www.buymeacoffee.com/PranavMolawade", "_blank");
  };

  return (
    <>
      <div className="flex flex-col h-full pt-20 pb-24 px-4 md:py-26 md:px-32 w-full items-center gap-12">
        <div key="1" className="border-2 p-4 rounded-md shadow-md space-y-8">
          <div className="flex justify-between items-center flex-row ">
            <h2 className="text-5xl font-bold glow text-center m-2">
              Feedback Form
            </h2>
            <Button
              className="bg-gradient-to-r  from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full shadow-xl transform transition-all hover:scale-110 hover:shadow-2xl focus:outline-none flex items-center"
              onClick={buyMeCoffee}
            >
              <CoffeeIcon className="m-2"/>
              <p>Buy me a coffee</p>
            </Button>
          </div>
          <div className="space-y-2 ">
            <p>
              We value your feedback. Please fill in the form below to help us
              improve our services.
            </p>
          </div>
          <form className="space-y-4 min-w-[40vw]" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2 items-end">
              <div className="space-y-2">
                <Label htmlFor="email">Email (optional)</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="feedback">Your Feedback</Label>
              <textarea
                className="w-full p-2"
                id="feedback"
                placeholder="Share your thoughts"
                required
                rows={4}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rating">Rating (1 to 5)</Label>
              <Input
                type="number"
                id="rating"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button
              className="w-full flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full p-3 shadow-md transition duration-300 hover:opacity-90"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Submit Feedback"
              )}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Feedback;
