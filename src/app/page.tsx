"use client";

import { useState, useEffect } from "react";
import { CONFIG } from "../../my-portfolio/src/content";
import GlassCard from "@/components/GlassCard";
import MediaCarousel from "@/components/MediaCarousel";
import CommandPalette from "@/components/CommandPalette";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, FileText, Search, Play } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const {
    name,
    profileImage,
    bio,
    socialLinks,
    skills,
    education,
    projects,
    experiences,
    certificates,
  } = CONFIG;

  const [emailCopied, setEmailCopied] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  const handleEmailClick = (e?: any) => {
    if (e) e.preventDefault();
    const rawEmail = "vinayskumar2557@gmail.com";
    if (navigator && "clipboard" in navigator) {
      navigator.clipboard
        .writeText(rawEmail)
        .then(() => {
          setEmailCopied(true);
          setTimeout(() => setEmailCopied(false), 1800);
        })
        .catch(() => { });
    }
  };

  // Listen for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Scroll reveal - For Individual Card Tracking
  useEffect(() => {
    const itemObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("item-visible");
            itemObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const selectors = "h1, h2, h3, .education-card, .skills-card, .experience-card, .work-card, .certificate-shimmer, p, .social-button";

    // 1. Select all items
    const items = document.querySelectorAll(selectors);

    items.forEach((item) => {
      // 2. Check if the item (or its parent) has a 'no-reveal' class
      if (!item.classList.contains("no-reveal") && !item.closest(".no-reveal")) {
        item.classList.add("scroll-reveal-item");
        itemObserver.observe(item);
      }
    });

    return () => itemObserver.disconnect();
  }, []);

  // Dynamic Viewport Focus - The Gaze
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const section = entry.target as HTMLElement;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            section.classList.remove("section-dimmed");
            section.classList.add("section-focused");
          } else {
            section.classList.remove("section-focused");
            section.classList.add("section-dimmed");
          }
        });
      },
      { threshold: 0.5, rootMargin: "-20% 0px -20% 0px" }
    );

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      if (!section.classList.contains("section-focused")) section.classList.add("section-dimmed");
      observer.observe(section);
    });

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  // Magnetic Button Effect
  useEffect(() => {
    const buttons = document.querySelectorAll(".magnetic-button");
    const cleanupFunctions: (() => void)[] = [];

    buttons.forEach((button) => {
      const handleMouseMove = (e: any) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        (button as HTMLElement).style.setProperty("--magnetic-x", `${x * 0.15}px`);
        (button as HTMLElement).style.setProperty("--magnetic-y", `${y * 0.15}px`);
      };
      const handleMouseLeave = () => {
        (button as HTMLElement).style.setProperty("--magnetic-x", "0px");
        (button as HTMLElement).style.setProperty("--magnetic-y", "0px");
      };

      button.addEventListener("mousemove", handleMouseMove as unknown as EventListener);
      button.addEventListener("mouseleave", handleMouseLeave as unknown as EventListener);

      cleanupFunctions.push(() => {
        button.removeEventListener("mousemove", handleMouseMove);
        button.removeEventListener("mouseleave", handleMouseLeave);
      });
    });

    return () => cleanupFunctions.forEach((cleanup) => cleanup());
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "var(--body-color)" }}>

      {/* COMMAND PALETTE */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        setIsOpen={setIsCommandPaletteOpen}
        handleEmailCopy={handleEmailClick}
      />

      {/* TOP-RIGHT SEARCH PILL TRIGGER */}
      <button
        onClick={() => setIsCommandPaletteOpen(true)}
        className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:border-[#EFBF04] hover:shadow-[0_0_15px_rgba(239,191,4,0.4)] transition-all duration-300 group"
      >
        <Search size={16} className="text-gray-300 group-hover:text-[#EFBF04] transition-colors" />
        <span className="text-sm font-medium text-gray-300 group-hover:text-white">Search... ⌘K</span>
      </button>

      <main className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24" style={{ position: "relative", zIndex: 10 }}>
        {/* --- HERO --- */}
        <section className="mb-16 sm:mb-20 lg:mb-24">
          <GlassCard delay={0.1}>
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 md:gap-8 text-center md:text-left">
              <div className="md:max-w-2xl order-2 md:order-1">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6" style={{ color: "var(--title-color)" }}>
                  Hi, I&apos;m <span className="name-shimmer">{name}</span>
                </h1>
                <p className="text-lg sm:text-xl leading-relaxed max-w-2xl" style={{ color: "var(--text-color)" }} dangerouslySetInnerHTML={{ __html: bio }} />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="shrink-0 order-1 md:order-2 md:ml-auto mx-auto md:mx-0"
              >
                <div className="relative rounded-full p-[4px] bg-white/10 backdrop-blur-xl shadow-lg solar-profile no-reveal">
                  <Image src={profileImage} alt={`${name} profile photo`} width={112} height={112} className="rounded-full object-cover w-28 h-28 sm:w-32 sm:h-32" priority />
                </div>
              </motion.div>
            </div>
          </GlassCard>
        </section>

        {/* --- SOCIAL LINKS / CONTACT --- */}
        <section className="mb-16 sm:mb-20 lg:mb-24">
          <GlassCard delay={0.2}>
            <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-4">
              {socialLinks.github && (
                <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="social-button magnetic-button flex items-center gap-2 px-4 py-2 rounded-full bg-white/30 hover:bg-white/60" style={{ color: "var(--text-color)" }}>
                  <Github className="w-5 h-5" style={{ color: "var(--skin-color)" }} />
                  <span className="text-sm sm:text-base">GitHub</span>
                </a>
              )}
              {socialLinks.linkedin && (
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="social-button magnetic-button flex items-center gap-2 px-4 py-2 rounded-full bg-white/30 hover:bg-white/60" style={{ color: "var(--text-color)" }}>
                  <Linkedin className="w-5 h-5" style={{ color: "var(--skin-color)" }} />
                  <span className="text-sm sm:text-base">LinkedIn</span>
                </a>
              )}
              {socialLinks.twitter && (
                <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="social-button magnetic-button flex items-center gap-2 px-4 py-2 rounded-full bg-white/30 hover:bg-white/60" style={{ color: "var(--text-color)" }}>
                  <Twitter className="w-5 h-5" style={{ color: "var(--skin-color)" }} />
                  <span className="text-sm sm:text-base">Twitter</span>
                </a>
              )}

              <a href={CONFIG.socialLinks.email} onClick={handleEmailClick} className="social-button magnetic-button flex items-center gap-2 px-4 py-2 rounded-full bg-white/30 hover:bg-white/60" style={{ color: "var(--text-color)" }}>
                <Mail className="w-5 h-5" style={{ color: "var(--skin-color)" }} />
                <span className="text-sm sm:text-base">Email</span>
              </a>

              {socialLinks.resume && (
                <a href={socialLinks.resume} target="_blank" rel="noopener noreferrer" className="social-button magnetic-button flex items-center gap-2 px-4 py-2 rounded-full bg-white/30 hover:bg-white/60" style={{ color: "var(--text-color)" }}>
                  <FileText className="w-5 h-5" style={{ color: "var(--skin-color)" }} />
                  <span className="text-sm sm:text-base">Resume</span>
                </a>
              )}
            </div>
            {emailCopied && <div className="mt-3 text-xs sm:text-sm font-medium text-center sm:text-left" style={{ color: "var(--skin-color)" }}>Copied email to clipboard</div>}
          </GlassCard>
        </section>

        {/* --- EDUCATION --- */}
        <section className="mb-16 sm:mb-20 lg:mb-24">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12 text-center sm:text-left" style={{ color: "var(--title-color)" }}>Education</h2>
          <div className="flex flex-col gap-6 sm:gap-8">
            {education.map((edu, index) => (
              <GlassCard key={index} delay={0.25 + index * 0.1} className="education-card">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold mb-1" style={{ color: "var(--title-color)" }}>{edu.degree}</h3>
                      <p className="text-base font-medium" style={{ color: "var(--text-color)" }}>{edu.institution}</p>

                      {edu.percentage && (
                        <div
                          className="inline-block mt-3 mb-1 px-3 py-1.5 rounded-md border text-sm font-bold transition-colors duration-500 bg-[#FFFFFF] [.section-focused_&]:bg-[#EFBF04]"
                          style={{ color: "#456882", borderColor: "#EFBF04" }}
                        >
                          Score: {edu.percentage}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-start sm:items-end gap-1">
                      <div className="text-sm font-medium" style={{ color: "var(--skin-color)" }}>{edu.duration}</div>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed mt-2 whitespace-pre-line" style={{ color: "var(--text-color)" }}>{edu.details}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* --- SKILLS --- */}
        <section className="mb-16 sm:mb-20 lg:mb-24">
          <GlassCard delay={0.25} className="skills-card">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-center sm:text-left" style={{ color: "var(--title-color)" }}>Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.3 + index * 0.04, ease: [0.22, 1, 0.36, 1] }}
                    className="px-3 py-1 text-xs sm:text-sm font-bold rounded-full border transition-colors duration-500 bg-[#FFFFFF] [.section-focused_&]:bg-[#EFBF04] whitespace-nowrap"
                    style={{ color: "#456882", borderColor: "#EFBF04" }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </GlassCard>
        </section>

        {/* --- PROJECTS --- */}
        <section id="projects">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12 text-center sm:text-left" style={{ color: "var(--title-color)" }}>Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((project, index) => (
              <GlassCard
                key={project.title}
                delay={0.3 + index * 0.1}
                link={project.link}
                techTags={project.techTags}
                isProject={true}
              >
                {project.media && (
                  <div className="relative h-48 w-full overflow-hidden rounded-xl mb-4">
                    <MediaCarousel media={project.media} />
                  </div>
                )}

                <div className="h-full flex flex-col">
                  <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4" style={{ color: "var(--title-color)" }}>{project.title}</h3>
                  <p className="mb-4 sm:mb-6 flex-grow leading-relaxed" style={{ color: "var(--text-color)" }}>{project.description}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* --- EXPERIENCES --- */}
        <section id="experience" className="mt-16 sm:mt-20 lg:mt-24">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12 text-center sm:text-left" style={{ color: "var(--title-color)" }}>Experiences</h2>
          <div className="relative">
            <div className="absolute left-3 top-0 bottom-0 w-px bg-gray-900/10" aria-hidden="true" />
            <div className="space-y-6 sm:space-y-8">
              {experiences.map((exp, index) => (
                <div key={index} className="relative pl-10">
                  <div className="absolute left-3 top-8 -translate-x-1/2 w-3 h-3 rounded-full shadow-sm" style={{ background: `var(--skin-color)` }} aria-hidden="true" />
                  <GlassCard delay={0.35 + index * 0.1} className="experience-card">
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                        <div className="text-lg sm:text-xl font-semibold" style={{ color: "var(--title-color)" }}>
                          {exp.role} <span className="font-medium" style={{ color: "var(--text-color)" }}>· {exp.company}</span>
                        </div>
                        <div className="text-sm" style={{ color: "var(--text-color)" }}>{exp.duration}</div>
                      </div>
                      <p className="leading-relaxed" style={{ color: "var(--text-color)" }}>{exp.description}</p>
                    </div>
                  </GlassCard>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- CERTIFICATES & LICENSES --- */}
        <section className="mt-16 sm:mt-20 lg:mt-24">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12 text-center sm:text-left" style={{ color: "var(--title-color)" }}>
            Certificates &amp; Licenses
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {certificates.map((cert, index) => {
              const href = cert.linkToFile?.trim();

              const Card = (
                <GlassCard
                  delay={0.35 + index * 0.08}
                  className={href ? "hover:bg-white/15 transition-colors flex flex-col h-full" : "flex flex-col h-full"}
                  isCertificate={true}
                >
                  {cert.media && (
                    <div className="relative h-48 w-full overflow-hidden rounded-xl mb-4 shrink-0">
                      <MediaCarousel media={cert.media} />
                    </div>
                  )}

                  <div className="flex flex-col gap-2 flex-grow">
                    <div className="text-lg font-semibold" style={{ color: "var(--title-color)" }}>{cert.name}</div>
                    <div className="text-sm" style={{ color: "var(--text-color)" }}>{cert.issuer}</div>
                    <div className="text-sm" style={{ color: "var(--text-color)" }}>{cert.date}</div>

                    {cert.description && (
                      <p className="text-sm mt-1 mb-4 leading-relaxed" style={{ color: "var(--text-color)", opacity: 0.9 }}>
                        {cert.description}
                      </p>
                    )}

                    {/* Action Area for Links/Buttons */}
                    <div className="mt-auto pt-2 flex items-center justify-between flex-wrap gap-2">
                      {/* Certificate Link Text */}
                      {href && (
                        <div className="text-sm font-medium" style={{ color: "var(--skin-color)" }}>
                          View credential →
                        </div>
                      )}

                      {/* Conditional Project Button */}
                      {cert.linkToProject && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            window.open(cert.linkToProject, "_blank", "noopener,noreferrer");
                          }}
                          className="relative z-10 px-3 py-1.5 rounded-md border text-xs sm:text-sm font-bold transition-colors duration-500 bg-[#FFFFFF] [.section-focused_&]:bg-[#EFBF04] hover:opacity-80"
                          style={{
                            color: "#456882",
                            borderColor: "#EFBF04"
                          }}
                        >
                          View Project
                        </button>
                      )}
                    </div>
                  </div>
                </GlassCard>
              );

              return href ? (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 rounded-2xl h-full"
                >
                  {Card}
                </a>
              ) : (
                <div key={index} className="block h-full">
                  {Card}
                </div>
              );
            })}
          </div>
        </section>

        {/* --- SOCIAL SERVICE SECTION --- */}
        <section className="mt-16 sm:mt-20 lg:mb-24">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12 text-center sm:text-left" style={{ color: "var(--title-color)" }}>
            Social Service
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CONFIG.socialService.map((service, index) => (
              <a
                key={index}
                href={service.linkToFile}
                target="_blank"
                rel="noopener noreferrer"
                className="block group focus:outline-none"
              >
                <GlassCard
                  delay={0.3 + index * 0.1}
                  isCertificate={true}
                  className="work-card certificate-shimmer h-full flex flex-col"
                >
                  {service.media && (
                    <div className="relative aspect-video w-full overflow-hidden rounded-xl mb-4">
                      <MediaCarousel media={service.media} />
                    </div>
                  )}
                  <div className="flex flex-col gap-2 flex-grow">
                    <h3 className="text-xl font-bold" style={{ color: "var(--title-color)" }}>
                      {service.role}
                    </h3>
                    <p className="font-semibold" style={{ color: "var(--skin-color)" }}>
                      {service.organization}
                    </p>
                    <p className="text-sm opacity-80" style={{ color: "var(--text-color)" }}>
                      {service.duration}
                    </p>
                    <p className="text-sm mt-2 whitespace-pre-line" style={{ color: "var(--text-color)" }}>
                      {service.description}
                    </p>

                    <div className="mt-auto pt-4 text-sm font-bold flex items-center gap-1" style={{ color: "var(--skin-color)" }}>
                      View Documentation
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                </GlassCard>
              </a>
            ))}
          </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="mt-24 pb-12 border-t border-gray-900/10 text-center">
          <div className="max-w-3xl mx-auto px-4">
            <p className="text-xs sm:text-sm leading-relaxed opacity-70" style={{ color: "var(--text-color)" }}>© 2026 {name}. All Rights Reserved.</p>
            <p className="mt-4 text-[10px] sm:text-xs italic leading-relaxed" style={{ color: "var(--text-color)", opacity: 0.6 }}>
              Declaration: All information, project data, and academic achievements presented in this portfolio are true and accurate to the best of my knowledge. As a B.Tech Computer Science & Engineering student, these works represent my active learning journey in Generative AI, Robotics, and Full-Stack Development.
            </p>
            <div className="mt-6 h-[1px] w-24 mx-auto bg-gradient-to-r from-transparent via-[#EFBF04] to-transparent shadow-[0_0_8px_#EFBF04]" />
          </div>
        </footer>
      </main>
    </div>
  );
}