"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
// Adjust this import path to match exactly how you import CONFIG in your page.tsx
import { CONFIG } from "../../my-portfolio/src/content";

// Define a type for our stacked toasts
type ToastData = {
  id: string;
  title: string;
  message: string;
};

export default function NotificationToast() {
  // Store an array of active toasts instead of a single boolean
  const [toasts, setToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    const checkRatingsAndShow = async () => {
      // 1. Group workshops by their feedbackApiUrl
      const grouped = CONFIG.socialService.reduce((acc: any, service: any) => {
        if (!service.feedbackApiUrl) return acc;

        // If this URL isn't in our accumulator yet, add it
        if (!acc[service.feedbackApiUrl]) {
          acc[service.feedbackApiUrl] = {
            url: service.feedbackApiUrl,
            organizations: [service.organization],
          };
        } else {
          // If the URL exists, append the organization name so we can group them
          if (!acc[service.feedbackApiUrl].organizations.includes(service.organization)) {
            acc[service.feedbackApiUrl].organizations.push(service.organization);
          }
        }
        return acc;
      }, {});

      const uniqueWorkshops = Object.values(grouped);
      if (uniqueWorkshops.length === 0) return;

      // 2. Fetch data for each unique URL and build the toast data
      const fetchedToasts: ToastData[] = [];

      for (const workshop of uniqueWorkshops as any[]) {
        // Join multiple institution names (e.g., "Institution 1 & Institution 2")
        let title = "";
        const orgs = workshop.organizations;

        if (orgs.length === 1) {
          title = orgs[0];
        } else if (orgs.length === 2) {
          title = orgs.join(" & ");
        } else {
          // Shows the first two, then counts the rest
          const remainingCount = orgs.length - 2;
          title = `${orgs[0]}, ${orgs[1]} & ${remainingCount} other${remainingCount > 1 ? 's' : ''}`;
        }
        let message = "Check out my latest AI Masterclass and build your own automations.";

        try {
          const res = await fetch(workshop.url);
          const data = await res.json();

          if (data.feedback && data.feedback.length > 0) {
            const totalStars = data.feedback.reduce((acc: number, item: any) => acc + Number(item.rating), 0);
            const avg = (totalStars / data.feedback.length).toFixed(1);
            message = `Check out the masterclass that students rated ${avg}/5 stars!`;
          }
        } catch (error) {
          console.error("Toast fetch error:", error);
        }

        fetchedToasts.push({
          id: workshop.url, // Using the unique URL as the toast ID
          title,
          message,
        });
      }

      // 3. Show all fetched toasts after 3 seconds
      setTimeout(() => setToasts(fetchedToasts), 3000);
    };

    checkRatingsAndShow();
  }, []);

  // Handle clicking the toast body
  const handleToastClick = (id: string) => {
    document.getElementById("community")?.scrollIntoView({ behavior: "smooth" });
    // Remove only the clicked toast
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Handle clicking the close button
  const dismissToast = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  if (toasts.length === 0) return null;

  return (
    // Wrap the toasts in a flex-col container so they stack neatly without overlapping
    <div className="fixed bottom-24 right-4 sm:right-6 z-40 flex flex-col gap-4 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="pointer-events-auto"
          >
            <div
              onClick={() => handleToastClick(toast.id)}
              className="group cursor-pointer flex items-start gap-3 p-4 bg-white/80 backdrop-blur-xl border border-[#EFBF04]/40 rounded-2xl shadow-[0_10px_40px_rgba(239,191,4,0.15)] max-w-[300px]"
            >
              <div className="shrink-0 p-2 bg-[#EFBF04]/10 rounded-full">
                <Sparkles className="w-5 h-5 text-[#EFBF04]" />
              </div>

              <div className="flex-1">
                <h4 className="text-sm font-bold text-[#456882] mb-1">{toast.title}</h4>
                <p className="text-xs text-[#4F959D] leading-relaxed">
                  {toast.message}
                </p>
              </div>

              <button
                onClick={(e) => dismissToast(toast.id, e)}
                className="shrink-0 p-1 rounded-full hover:bg-black/5 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}