"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";

export default function MediaCarousel({ media }: { media: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-slide logic
  useEffect(() => {
    if (!media || media.length <= 1 || isHovered) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));
    }, 4000); // Changes every 4 seconds

    return () => clearInterval(timer);
  }, [media, isHovered]);

  if (!media || media.length === 0) return null;

  const nextSlide = (e: any) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = (e: any) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));
  };

  const toggleMute = (e: any) => {
    e.preventDefault();
    setIsMuted(!isMuted);
  };

  return (
    <div 
      className="relative w-full h-full overflow-hidden rounded-xl bg-black/20 group/carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* SMOOTH SLIDING TRACK */}
      <div 
        className="flex w-full h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {media.map((item, idx) => (
          <div key={idx} className="relative w-full h-full shrink-0 overflow-hidden">
            {item.type === "image" ? (
              <Image
                src={item.url}
                alt={`Slide ${idx + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover/carousel:scale-105"
              />
            ) : (
              <video
                src={item.url}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover transition-transform duration-700 group-hover/carousel:scale-105"
              />
            )}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {media.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white opacity-0 group-hover/carousel:opacity-100 transition-all hover:bg-[#EFBF04] hover:text-black z-20"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white opacity-0 group-hover/carousel:opacity-100 transition-all hover:bg-[#EFBF04] hover:text-black z-20"
          >
            <ChevronRight size={18} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {media.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? "w-5 bg-[#EFBF04]" : "w-1.5 bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}

      {/* Mute Toggle for Video */}
      {media[currentIndex]?.type === "video" && (
        <button
          onClick={toggleMute}
          className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white opacity-0 group-hover/carousel:opacity-100 transition-all hover:bg-[#EFBF04] hover:text-black z-20"
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      )}
    </div>
  );
}