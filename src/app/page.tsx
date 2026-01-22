"use client";

import { useState, useEffect, useRef } from "react";
import { CONFIG } from "@/content";
import GlassCard from "@/components/GlassCard";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
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

  const handleEmailClick = () => {
    const rawEmail = "vinayskumar2557@gmail.com";
    if (navigator && "clipboard" in navigator) {
      navigator.clipboard
        .writeText(rawEmail)
        .then(() => {
          setEmailCopied(true);
          setTimeout(() => setEmailCopied(false), 1800);
        })
        .catch(() => {
          // fail silently; mailto link still works
        });
    }
  };

  // Scroll reveal for sections with staggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            // Add staggered delays to children
            const headings = entry.target.querySelectorAll("h2, h3");
            const cards = entry.target.querySelectorAll(".work-card, .services-content, .about-box");
            const texts = entry.target.querySelectorAll("p, span:not(.name-shimmer)");
            
            headings.forEach((el, i) => {
              setTimeout(() => {
                el.classList.add("stagger-reveal-1");
              }, i * 50);
            });
            
            cards.forEach((el, i) => {
              setTimeout(() => {
                el.classList.add("stagger-reveal-2");
                // Trigger certificate shimmer when revealed
                if (el.classList.contains("certificate-shimmer")) {
                  el.classList.add("revealed");
                }
              }, i * 100);
            });
            
            // Include education cards in reveal
            const educationCards = entry.target.querySelectorAll(".education-card");
            educationCards.forEach((el, i) => {
              setTimeout(() => {
                el.classList.add("stagger-reveal-2");
              }, i * 100);
            });
            
            texts.forEach((el, i) => {
              setTimeout(() => {
                el.classList.add("stagger-reveal-3");
              }, i * 50);
            });
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      section.classList.add("scroll-reveal");
      section.classList.add("section-dimmed"); // Initialize all sections as dimmed
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  // Dynamic Viewport Focus - The Gaze
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const section = entry.target as HTMLElement;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            // Remove dimmed class and add focused class
            section.classList.remove("section-dimmed");
            section.classList.add("section-focused");
          } else {
            // Remove focused class and add dimmed class
            section.classList.remove("section-focused");
            section.classList.add("section-dimmed");
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: "-20% 0px -20% 0px",
      }
    );

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      // Initialize all sections as dimmed
      if (!section.classList.contains("section-focused")) {
        section.classList.add("section-dimmed");
      }
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  // Magnetic Button Effect
  useEffect(() => {
    const buttons = document.querySelectorAll(".magnetic-button");
    
    const cleanupFunctions: (() => void)[] = [];
    
    buttons.forEach((button) => {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const moveX = x * 0.15;
        const moveY = y * 0.15;
        
        (button as HTMLElement).style.setProperty("--magnetic-x", `${moveX}px`);
        (button as HTMLElement).style.setProperty("--magnetic-y", `${moveY}px`);
      };
      
      const handleMouseLeave = () => {
        (button as HTMLElement).style.setProperty("--magnetic-x", "0px");
        (button as HTMLElement).style.setProperty("--magnetic-y", "0px");
      };
      
      button.addEventListener("mousemove", handleMouseMove);
      button.addEventListener("mouseleave", handleMouseLeave);
      
      cleanupFunctions.push(() => {
        button.removeEventListener("mousemove", handleMouseMove);
        button.removeEventListener("mouseleave", handleMouseLeave);
      });
    });
    
    return () => {
      cleanupFunctions.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "var(--body-color)" }}>
      {/* Main content */}
      <main className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24" style={{ position: "relative", zIndex: 10 }}>
        {/* --- HERO --- */}
        <section className="mb-16 sm:mb-20 lg:mb-24">
          <GlassCard delay={0.1}>
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 md:gap-8 text-center md:text-left">
              <div className="md:max-w-2xl order-2 md:order-1">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6" style={{ color: "var(--title-color)" }}>
                  Hi, I&apos;m{" "}
                  <span className="name-shimmer">
                    {name}
                  </span>
                </h1>
                <p
                  className="text-lg sm:text-xl leading-relaxed max-w-2xl"
                  style={{ color: "var(--text-color)" }}
                  dangerouslySetInnerHTML={{ __html: bio }}
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="shrink-0 order-1 md:order-2 md:ml-auto mx-auto md:mx-0"
              >
                <div className="relative rounded-full p-[4px] bg-white/10 backdrop-blur-xl shadow-lg solar-profile">
                  <Image
                    src={profileImage}
                    alt={`${name} profile photo`}
                    width={112}
                    height={112}
                    className="rounded-full object-cover w-28 h-28 sm:w-32 sm:h-32"
                    priority
                  />
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
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-button magnetic-button flex items-center gap-2 px-4 py-2 rounded-full bg-white/30 hover:bg-white/60"
                  style={{ color: "var(--text-color)" }}
                >
                  <Github className="w-5 h-5" style={{ color: "var(--skin-color)" }} />
                  <span className="text-sm sm:text-base">GitHub</span>
                </a>
              )}
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-button magnetic-button flex items-center gap-2 px-4 py-2 rounded-full bg-white/30 hover:bg-white/60"
                  style={{ color: "var(--text-color)" }}
                >
                  <Linkedin className="w-5 h-5" style={{ color: "var(--skin-color)" }} />
                  <span className="text-sm sm:text-base">LinkedIn</span>
                </a>
              )}
              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-button magnetic-button flex items-center gap-2 px-4 py-2 rounded-full bg-white/30 hover:bg-white/60"
                  style={{ color: "var(--text-color)" }}
                >
                  <Twitter className="w-5 h-5" style={{ color: "var(--skin-color)" }} />
                  <span className="text-sm sm:text-base">Twitter</span>
                </a>
              )}
              <a
                href={CONFIG.socialLinks.email}
                onClick={handleEmailClick}
                className="social-button magnetic-button flex items-center gap-2 px-4 py-2 rounded-full bg-white/30 hover:bg-white/60"
                style={{ color: "var(--text-color)" }}
              >
                <Mail className="w-5 h-5" style={{ color: "var(--skin-color)" }} />
                <span className="text-sm sm:text-base">Email</span>
              </a>
            </div>
            {emailCopied && (
              <div className="mt-3 text-xs sm:text-sm font-medium text-center sm:text-left" style={{ color: "var(--skin-color)" }}>
                Copied email to clipboard
              </div>
            )}
          </GlassCard>
        </section>

        {/* --- EDUCATION --- */}
        <section className="mb-16 sm:mb-20 lg:mb-24">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12 text-center sm:text-left" style={{ color: "var(--title-color)" }}>
            Education
          </h2>

          <div className="flex flex-col gap-6 sm:gap-8">
            {education.map((edu, index) => (
              <GlassCard
                key={`${edu.institution}-${edu.degree}-${edu.duration}`}
                delay={0.25 + index * 0.1}
                className="education-card"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold mb-1" style={{ color: "var(--title-color)" }}>
                        {edu.degree}
                      </h3>
                      <p className="text-base font-medium" style={{ color: "var(--text-color)" }}>
                        {edu.institution}
                      </p>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-1">
                      <div className="text-sm font-medium" style={{ color: "var(--skin-color)" }}>
                        {edu.duration}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed mt-2" style={{ color: "var(--text-color)" }}>
                    {edu.details}
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* --- SKILLS --- */}
        <section className="mb-16 sm:mb-20 lg:mb-24">
          <GlassCard delay={0.25} className="skills-card">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-center sm:text-left" style={{ color: "var(--title-color)" }}>
                Skills
              </h2>

              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.35,
                      delay: 0.3 + index * 0.04,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="px-3 py-1 text-xs sm:text-sm bg-white/40 backdrop-blur-sm border border-white/30 rounded-full text-slate-800 font-medium whitespace-nowrap"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </GlassCard>
        </section>

        {/* --- PROJECTS --- */}
        <section>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12 text-center sm:text-left" style={{ color: "var(--title-color)" }}>
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((project, index) => (
              <GlassCard
                key={project.title}
                delay={0.3 + index * 0.1}
                image={project.image}
                link={project.link}
                techTags={project.techTags}
                isProject={true}
              >
                <div className="h-full flex flex-col">
                  <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4" style={{ color: "var(--title-color)" }}>
                    {project.title}
                  </h3>
                  <p className="mb-4 sm:mb-6 flex-grow leading-relaxed" style={{ color: "var(--text-color)" }}>
                    {project.description}
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* --- EXPERIENCES --- */}
        <section className="mt-16 sm:mt-20 lg:mt-24">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12 text-center sm:text-left" style={{ color: "var(--title-color)" }}>
            Experiences
          </h2>

          <div className="relative">
            {/* timeline line */}
            <div className="absolute left-3 top-0 bottom-0 w-px bg-gray-900/10" aria-hidden="true" />

            <div className="space-y-6 sm:space-y-8">
              {experiences.map((exp, index) => (
                <div key={`${exp.company}-${exp.role}-${exp.duration}`} className="relative pl-10">
                  {/* timeline dot */}
                  <div
                    className="absolute left-3 top-8 -translate-x-1/2 w-3 h-3 rounded-full shadow-sm"
                    style={{ background: `var(--skin-color)` }}
                    aria-hidden="true"
                  />

                  <GlassCard delay={0.35 + index * 0.1} className="experience-card">
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                        <div className="text-lg sm:text-xl font-semibold" style={{ color: "var(--title-color)" }}>
                          {exp.role}{" "}
                          <span className="font-medium" style={{ color: "var(--text-color)" }}>· {exp.company}</span>
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
                  className={href ? "hover:bg-white/15 transition-colors" : ""}
                  isCertificate={true}
                >
                  <div className="flex flex-col gap-2">
                    <div className="text-lg font-semibold" style={{ color: "var(--title-color)" }}>{cert.name}</div>
                    <div className="text-sm" style={{ color: "var(--text-color)" }}>
                      {cert.issuer} · {cert.date}
                    </div>
                    {href ? (
                      <div className="text-sm font-medium" style={{ color: "var(--skin-color)" }}>
                        View credential →
                      </div>
                    ) : null}
                  </div>
                </GlassCard>
              );

              return href ? (
                <a
                  key={`${cert.name}-${cert.issuer}-${cert.date}`}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 rounded-2xl"
                >
                  {Card}
                </a>
              ) : (
                <div key={`${cert.name}-${cert.issuer}-${cert.date}`} className="block">
                  {Card}
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
