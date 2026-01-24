"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { ReactNode, useRef, useState, useEffect } from "react";

interface GlassCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  image?: string;
  link?: string;
  techTags?: string[];
  isProject?: boolean;
  isCertificate?: boolean;
}

export default function GlassCard({
  children,
  delay = 0,
  className = "",
  image,
  link,
  techTags,
  isProject = false,
  isCertificate = false,
}: GlassCardProps) {
  const hasLink = Boolean(link);
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const mousePX = (x - centerX) / centerX;
      const mousePY = (y - centerY) / centerY;

      // Low-intensity parallax: max 10deg rotation, 15px translation
      const rX = Math.max(-10, Math.min(10, mousePY * 10));
      const rY = Math.max(-10, Math.min(10, mousePX * -10));
      const tX = Math.max(-15, Math.min(15, mousePX * -15));
      const tY = Math.max(-15, Math.min(15, mousePY * -15));

      setMousePosition({ x: mousePX, y: mousePY });

      card.style.setProperty("--rotate-x", `${rX}deg`);
      card.style.setProperty("--rotate-y", `${rY}deg`);
      card.style.setProperty("--translate-x", `${tX}px`);
      card.style.setProperty("--translate-y", `${tY}px`);

      if (isHovering) {
        card.style.setProperty("--translate-z", "-10px");
      } else {
        card.style.setProperty("--translate-z", "0px");
      }
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
      card.style.setProperty("--translate-z", "-10px");
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setMousePosition({ x: 0, y: 0 });
      card.style.setProperty("--rotate-x", "0deg");
      card.style.setProperty("--rotate-y", "0deg");
      card.style.setProperty("--translate-x", "0px");
      card.style.setProperty("--translate-y", "0px");
      card.style.setProperty("--translate-z", "0px");
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isHovering]);

  const cardClasses = [
    "relative",
    "work-card",
    "services-content",
    "about-box",
    "parallax-card",
    hasLink ? "group cursor-pointer" : "cursor-default",
    isProject ? "project-card" : "",
    isCertificate ? "certificate-card certificate-shimmer" : "",
    "flex flex-col backdrop-blur-xl rounded-2xl p-6 shadow-lg",
    className,
  ].filter(Boolean).join(" ");

  const card = (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cardClasses}
    >
      {hasLink ? (
        <div
          className="absolute right-4 top-4 z-20 h-9 w-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-105"
          aria-label="View Project"
        >
          <ExternalLink
            className="h-4 w-4 transition-colors duration-300"
            style={{ color: "var(--skin-color)" }}
            aria-hidden
          />
        </div>
      ) : null}

      {image ? (
        <div className="relative h-48 overflow-hidden rounded-xl mb-4">
          <img
            src={image}
            alt=""
            className={`w-full h-full object-cover ${hasLink ? "transition-transform duration-500 ease-out group-hover:scale-105" : ""
              }`}
          />
        </div>
      ) : null}
      <div className="flex flex-col flex-1">
        <div className="flex-1">{children}</div>

        {techTags?.length ? (
          <div className="flex flex-wrap gap-2 mt-auto pt-4">
            {techTags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs sm:text-sm bg-white/40 backdrop-blur-sm border border-white/30 rounded-full text-slate-800 font-medium whitespace-nowrap"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </motion.div>
  );

  if (link) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block focus:outline-none focus-visible:ring-2 rounded-2xl"
        style={{ "--tw-ring-color": "var(--skin-color)" } as React.CSSProperties}
      >
        {card}
      </a>
    );
  }

  return card;
}