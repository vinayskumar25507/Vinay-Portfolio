"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";

export default function WorkshopFeedback({ apiUrl }: { apiUrl?: string }) {
  const [rating, setRating] = useState<{ average: number; count: number } | null>(null);

  useEffect(() => {
    if (!apiUrl) return;

    const fetchFeedback = async () => {
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        
        if (data.feedback && data.feedback.length > 0) {
          const totalStars = data.feedback.reduce((acc: number, item: any) => acc + Number(item.rating), 0);
          const avg = (totalStars / data.feedback.length).toFixed(1);
          setRating({ average: Number(avg), count: data.feedback.length });
        }
      } catch (error) {
        console.error("Failed to fetch workshop feedback:", error);
      }
    };

    fetchFeedback();
  }, [apiUrl]);

  // If there's no rating data or 0 reviews, render absolutely nothing
  if (!rating || rating.count === 0) return null;

  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 mb-2 rounded-full bg-[#EFBF04]/10 border border-[#EFBF04]/30 w-fit">
      <Star className="w-3.5 h-3.5 text-[#EFBF04] fill-[#EFBF04]" />
      <span className="text-xs font-bold" style={{ color: "var(--skin-color)" }}>
        {rating.average}/5 <span className="opacity-70 font-medium">({rating.count} Reviews)</span>
      </span>
    </div>
  );
}