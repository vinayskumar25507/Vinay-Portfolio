"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Volume2, VolumeX, Play, Pause } from "lucide-react";

const formatTime = (timeInSeconds: number) => {
  if (isNaN(timeInSeconds)) return "0:00";
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export default function MediaCarousel({ media }: { media: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);
  
  const [videoDuration, setVideoDuration] = useState(0);
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);
  
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const currentIsVideo = media[currentIndex]?.type === "video";
    if (!media || media.length <= 1 || isHovered || (currentIsVideo && isPlaying)) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(timer);
  }, [media, isHovered, currentIndex, isPlaying]);

  useEffect(() => {
    setVideoProgress(0);
    setVideoCurrentTime(0);
    
    videoRefs.current.forEach((vid, idx) => {
      if (vid) {
        if (idx === currentIndex && isPlaying) {
          if (vid.currentTime === vid.duration) vid.currentTime = 0; 
          vid.play().catch(() => {});
        } else {
          vid.pause();
        }
      }
    });
  }, [currentIndex, isPlaying]);

  if (!media || media.length === 0) return null;

  const nextSlide = (e?: any) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    setCurrentIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));
    setIsPlaying(true);
  };

  const prevSlide = (e?: any) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    setCurrentIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));
    setIsPlaying(true);
  };

  const toggleMute = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  const togglePlay = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  const handleLoadedMetadata = (e: any) => {
    setVideoDuration(e.currentTarget.duration);
  };

  const handleTimeUpdate = (e: any) => {
    const { currentTime, duration } = e.currentTarget;
    setVideoCurrentTime(currentTime);
    if (duration > 0) {
      setVideoDuration(duration);
      setVideoProgress((currentTime / duration) * 100);
    }
  };

  const handleSeek = (e: any) => {
    e.stopPropagation();
    const seekToPercentage = parseFloat(e.target.value);
    setVideoProgress(seekToPercentage);
    
    const video = videoRefs.current[currentIndex];
    if (video && video.duration) {
      const newTime = (seekToPercentage / 100) * video.duration;
      video.currentTime = newTime;
      setVideoCurrentTime(newTime);
    }
  };

  const handleVideoEnd = () => {
    if (media.length === 1) {
      const video = videoRefs.current[currentIndex];
      if (video) {
        video.currentTime = 0;
        video.play().catch(() => {});
      }
    } else {
      nextSlide();
    }
  };

  // --- NEW EVENT HELPERS ---
  // Completely kills the event and prevents Next.js / <a> tags from navigating
  const blockNavigation = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Only stops bubbling (used for pointer events so dragging still works)
  const blockBubbling = (e: any) => {
    e.stopPropagation();
  };

  return (
    <div 
      className="relative w-full h-full overflow-hidden rounded-xl bg-black/20 group/carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
                ref={(el) => {
                  videoRefs.current[idx] = el;
                }}
                src={item.url}
                muted={isMuted}
                playsInline
                onLoadedMetadata={idx === currentIndex ? handleLoadedMetadata : undefined}
                onTimeUpdate={idx === currentIndex ? handleTimeUpdate : undefined}
                onEnded={idx === currentIndex ? handleVideoEnd : undefined}
                className="w-full h-full object-cover transition-transform duration-700 group-hover/carousel:scale-105"
              />
            )}
          </div>
        ))}
      </div>

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
        </>
      )}

      {media[currentIndex]?.type !== "video" && media.length > 1 && (
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
      )}

      {media[currentIndex]?.type === "video" && (
        <div 
          // Use the aggressive blockNavigation here
          onClick={blockNavigation} 
          onPointerDown={blockBubbling} 
          className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 z-20 flex flex-col gap-3"
        >
          <div className="flex items-center gap-3 w-full">
            <input
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={videoProgress || 0}
              onChange={handleSeek}
              // Prevent navigation on click, but only stop bubbling on pointer/touch
              onClick={blockNavigation}
              onPointerDown={blockBubbling}
              onTouchStart={blockBubbling}
              className="w-full h-1.5 bg-white/30 rounded-lg appearance-none cursor-pointer accent-[#EFBF04]"
            />
            <span className="text-[11px] font-mono text-white/90 whitespace-nowrap shrink-0">
              {formatTime(videoCurrentTime)} / {formatTime(videoDuration)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={togglePlay}
              className="p-1.5 rounded-full bg-black/60 text-white hover:bg-[#EFBF04] hover:text-black transition-all"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>

            <button
              onClick={toggleMute}
              className="p-1.5 rounded-full bg-black/60 text-white hover:bg-[#EFBF04] hover:text-black transition-all"
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}