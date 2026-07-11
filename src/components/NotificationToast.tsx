"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
// Adjust this import path to match exactly how you import CONFIG in your page.tsx
import { CONFIG } from "../../my-portfolio/src/content"; 

export default function NotificationToast() {
  const [isVisible, setIsVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("Check out my latest AI Masterclass and build your own automations.");
  const [workshopName, setWorkshopName] = useState("New AI Workshop!");

  useEffect(() => {
    // Find the first workshop in your content.ts that has a feedback API link
    const latestWorkshop = CONFIG.socialService.find(service => service.feedbackApiUrl);

    const checkRatingAndShow = async () => {
      // If we found a workshop with an API, check its rating
      if (latestWorkshop && latestWorkshop.feedbackApiUrl) {
        setWorkshopName(latestWorkshop.organization); // Dynamically set the title!

        try {
          const res = await fetch(latestWorkshop.feedbackApiUrl);
          const data = await res.json();
          
          if (data.feedback && data.feedback.length > 0) {
            const totalStars = data.feedback.reduce((acc: number, item: any) => acc + Number(item.rating), 0);
            const avg = (totalStars / data.feedback.length).toFixed(1);
            setToastMessage(`Check out the masterclass that students rated ${avg}/5 stars!`);
          }
        } catch (error) {
          console.error("Toast fetch error:", error);
        }
      }
      
      // Show the toast after 3 seconds
      setTimeout(() => setIsVisible(true), 3000);
    };

    checkRatingAndShow();
  }, []);

  const scrollToCommunity = () => {
    document.getElementById("community")?.scrollIntoView({ behavior: "smooth" });
    setIsVisible(false);
  };

  // If there are no workshops with an API link in content.ts, don't show the toast at all
  const hasWorkshop = CONFIG.socialService.some(service => service.feedbackApiUrl);
  if (!hasWorkshop) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="fixed bottom-24 right-4 sm:right-6 z-40"
        >
          <div 
            onClick={scrollToCommunity}
            className="group cursor-pointer flex items-start gap-3 p-4 bg-white/80 backdrop-blur-xl border border-[#EFBF04]/40 rounded-2xl shadow-[0_10px_40px_rgba(239,191,4,0.15)] max-w-[300px]"
          >
            <div className="shrink-0 p-2 bg-[#EFBF04]/10 rounded-full">
              <Sparkles className="w-5 h-5 text-[#EFBF04]" />
            </div>
            
            <div className="flex-1">
              {/* Dynamically renders the name of the organization/workshop */}
              <h4 className="text-sm font-bold text-[#456882] mb-1">{workshopName}</h4>
              <p className="text-xs text-[#4F959D] leading-relaxed">
                {toastMessage}
              </p>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsVisible(false);
              }}
              className="shrink-0 p-1 rounded-full hover:bg-black/5 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}