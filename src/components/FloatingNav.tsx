"use client";

import { useState, useEffect } from "react";
import { GraduationCap, Zap, Code, Briefcase, Heart, Trophy, Coffee, BookOpen, Award } from "lucide-react";

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState("");

  const navItems = [
    { id: "education", icon: <GraduationCap size={18} />, label: "Education" },
    { id: "skills", icon: <Zap size={18} />, label: "Skills" },
    { id: "projects", icon: <Code size={18} />, label: "Projects" },
    { id: "research", icon: <BookOpen size={18} />, label: "Research" },
    { id: "experience", icon: <Briefcase size={18} />, label: "Experience" },
    { id: "achievements", icon: <Trophy size={18} />, label: "Awards" },
    { id: "certificates", icon: <Award size={18} />, label: "Certificates" },
    { id: "community", icon: <Heart size={18} />, label: "Impact" },
    { id: "hobbies", icon: <Coffee size={18} />, label: "Hobbies" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // 1. Shift the trigger point to the top 1/3rd of the screen instead of the exact middle
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      // 2. Check if the user has scrolled to the absolute bottom of the page
      const isAtBottom = window.innerHeight + Math.round(window.scrollY) >= document.documentElement.scrollHeight - 50;

      const sections = navItems
        .map((item) => document.getElementById(item.id))
        .filter(Boolean); // Removes null values if a section doesn't exist yet

      // 3. If at the bottom, force highlight the very last visible section
      if (isAtBottom && sections.length > 0) {
        setActiveSection(sections[sections.length - 1]!.id);
        return;
      }

      // 4. Otherwise, run the normal calculation
      sections.forEach((section) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(section.id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    
    // Trigger it once on mount to highlight the first section on load
    handleScroll(); 
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-1 sm:gap-2 px-3 py-2 bg-white/20 backdrop-blur-xl border border-white/40 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            title={item.label}
            className={`p-2.5 rounded-full transition-all duration-300 ${
              activeSection === item.id
                ? "bg-[#EFBF04] text-white shadow-[0_0_15px_rgba(239,191,4,0.4)]"
                : "text-[#456882] hover:bg-white/40 hover:text-[#EFBF04]"
            }`}
          >
            {item.icon}
          </button>
        ))}
      </div>
    </div>
  );
}