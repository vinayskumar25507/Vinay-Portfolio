"use client";

import { useState, useEffect } from "react";
import { Search, FileText, Briefcase, Code, Mail } from "lucide-react";

export default function CommandPalette({ isOpen, setIsOpen, handleEmailCopy }: any) {
  const [search, setSearch] = useState("");

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setIsOpen]);

  if (!isOpen) return null;

  const actions = [
    { id: "resume", title: "View Resume", icon: <FileText size={18} />, action: () => window.open("/Personal Information/Vinay S Kumar - Resume.pdf", "_blank") },
    { id: "projects", title: "Scroll to Projects", icon: <Code size={18} />, action: () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }) },
    { id: "experience", title: "Scroll to Experience", icon: <Briefcase size={18} />, action: () => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" }) },
    { id: "email", title: "Copy Email", icon: <Mail size={18} />, action: handleEmailCopy },
  ];

  const filteredActions = actions.filter((action) =>
    action.title.toLowerCase().includes(search.toLowerCase())
  );

  const executeAction = (actionFn: () => void) => {
    actionFn();
    setIsOpen(false);
    setSearch("");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
      <div 
        className="w-full max-w-xl bg-gray-900 border border-[#EFBF04]/50 rounded-2xl shadow-[0_0_20px_rgba(239,191,4,0.3)] overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <div className="flex items-center px-4 py-3 border-b border-white/10">
          <Search size={20} className="text-[#EFBF04] mr-3" />
          <input
            autoFocus
            type="text"
            placeholder="Type a command or search..."
            className="w-full bg-transparent text-white focus:outline-none placeholder-gray-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && filteredActions.length > 0) {
                executeAction(filteredActions[0].action);
              }
            }}
          />
          <span className="text-xs text-gray-400 bg-white/10 px-2 py-1 rounded">ESC</span>
        </div>

        <div className="max-h-60 overflow-y-auto p-2">
          {filteredActions.length === 0 ? (
            <div className="text-center py-6 text-gray-400">No results found.</div>
          ) : (
            filteredActions.map((action) => (
              <button
                key={action.id}
                onClick={() => executeAction(action.action)}
                className="w-full flex items-center px-4 py-3 text-left text-gray-200 hover:bg-white/10 hover:text-[#EFBF04] rounded-xl transition-colors group"
              >
                <span className="mr-3 text-gray-400 group-hover:text-[#EFBF04] transition-colors">{action.icon}</span>
                {action.title}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}