"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  image?: string;
  link?: string;
  techTags?: string[];
}

export default function GlassCard({
  children,
  delay = 0,
  className = "",
  image,
  link,
  techTags,
}: GlassCardProps) {
  const hasLink = Boolean(link);

  const card = (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`relative ${
        hasLink
          ? "group hover:shadow-2xl hover:border-white/40 cursor-pointer"
          : "cursor-default"
      } flex flex-col backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-lg transition-all duration-300 ${className}`}
    >
      {hasLink ? (
        <div
          className="absolute right-4 top-4 z-20 h-9 w-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-105"
          aria-label="View Project"
        >
          <ExternalLink
            className="h-4 w-4 text-slate-900 transition-colors duration-300 group-hover:text-indigo-700"
            aria-hidden
          />
        </div>
      ) : null}

      {image ? (
        <div className="relative h-48 overflow-hidden rounded-xl mb-4">
          <img
            src={image}
            alt=""
            className={`w-full h-full object-cover ${
              hasLink ? "transition-transform duration-500 ease-out group-hover:scale-105" : ""
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
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 rounded-2xl"
      >
        {card}
      </a>
    );
  }

  return card;
}
