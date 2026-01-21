"use client";

import { useState } from "react";
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

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Animated mesh gradient blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl animate-float" style={{ animationDelay: "6s" }}></div>
        <div className="absolute -bottom-40 right-1/3 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "12s" }}></div>
      </div>

      {/* Main content */}
      <main className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        {/* --- HERO --- */}
        <section className="mb-16 sm:mb-20 lg:mb-24">
          <GlassCard delay={0.1}>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6 sm:gap-8 text-center sm:text-left">
              <div className="sm:max-w-2xl order-2 sm:order-1">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
                  Hi, I&apos;m{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {name}
                  </span>
                </h1>
                <p
                  className="text-lg sm:text-xl text-gray-700 leading-relaxed max-w-2xl"
                  dangerouslySetInnerHTML={{ __html: bio }}
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="shrink-0 order-1 sm:order-2 sm:ml-auto"
              >
                <div className="rounded-full p-[2px] bg-white/10 border border-white/20 backdrop-blur-xl shadow-lg">
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
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/30 border border-white/20 hover:bg-white/60 hover:scale-105 transition-all duration-300 text-slate-700"
                >
                  <Github className="w-5 h-5" />
                  <span className="text-sm sm:text-base">GitHub</span>
                </a>
              )}
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/30 border border-white/20 hover:bg-white/60 hover:scale-105 transition-all duration-300 text-slate-700"
                >
                  <Linkedin className="w-5 h-5" />
                  <span className="text-sm sm:text-base">LinkedIn</span>
                </a>
              )}
              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/30 border border-white/20 hover:bg-white/60 hover:scale-105 transition-all duration-300 text-slate-700"
                >
                  <Twitter className="w-5 h-5" />
                  <span className="text-sm sm:text-base">Twitter</span>
                </a>
              )}
              <a
                href={CONFIG.socialLinks.email}
                onClick={handleEmailClick}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/30 border border-white/20 hover:bg-white/60 hover:scale-105 transition-all duration-300 text-slate-700"
              >
                <Mail className="w-5 h-5" />
                <span className="text-sm sm:text-base">Email</span>
              </a>
            </div>
            {emailCopied && (
              <div className="mt-3 text-xs sm:text-sm text-emerald-700 font-medium text-center sm:text-left">
                Copied email to clipboard
              </div>
            )}
          </GlassCard>
        </section>

        {/* --- SKILLS --- */}
        <section className="mb-16 sm:mb-20 lg:mb-24">
          <GlassCard delay={0.25}>
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center sm:text-left">
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
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 sm:mb-12 text-center sm:text-left">
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
              >
                <div className="h-full flex flex-col">
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">
                    {project.title}
                  </h3>
                  <p className="text-gray-700 mb-4 sm:mb-6 flex-grow leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* --- EXPERIENCES --- */}
        <section className="mt-16 sm:mt-20 lg:mt-24">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 sm:mb-12 text-center sm:text-left">
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
                    className="absolute left-3 top-8 -translate-x-1/2 w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-sm"
                    aria-hidden="true"
                  />

                  <GlassCard delay={0.35 + index * 0.1}>
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                        <div className="text-lg sm:text-xl font-semibold text-gray-900">
                          {exp.role}{" "}
                          <span className="text-gray-600 font-medium">· {exp.company}</span>
                        </div>
                        <div className="text-sm text-gray-600">{exp.duration}</div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                    </div>
                  </GlassCard>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- CERTIFICATES & LICENSES --- */}
        <section className="mt-16 sm:mt-20 lg:mt-24">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 sm:mb-12 text-center sm:text-left">
            Certificates &amp; Licenses
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {certificates.map((cert, index) => {
              const href = cert.linkToFile?.trim();
              const Card = (
                <GlassCard
                  delay={0.35 + index * 0.08}
                  className={href ? "hover:bg-white/15 transition-colors" : ""}
                >
                  <div className="flex flex-col gap-2">
                    <div className="text-lg font-semibold text-gray-900">{cert.name}</div>
                    <div className="text-sm text-gray-600">
                      {cert.issuer} · {cert.date}
                    </div>
                    {href ? (
                      <div className="text-sm text-blue-700/80 font-medium">
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
