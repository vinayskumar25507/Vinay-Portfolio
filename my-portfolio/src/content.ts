export type MediaItem = {
  type: "image" | "video";
  url: string;
};

export interface Project {
  title: string;
  description: string;
  techTags: string[];
  media?: MediaItem[];
  link?: string;
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  description: string;
}

export interface Certificate {
  name: string;
  issuer: string;
  date: string;
  description?: string;
  media?: MediaItem[];
  linkToFile?: string;
}

export interface Education {
  degree: string;
  institution: string;
  duration: string;
  details: string;
  percentage?: string;
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
  resume?: string;
}

export interface SocialService {
  organization: string;
  role: string;
  duration: string;
  description: string;
  media?: MediaItem[];
  linkToFile: string;
}

export interface Config {
  name: string;
  profileImage: string;
  bio: string;
  socialLinks: SocialLinks;
  skills: string[];
  education: Education[];
  projects: Project[];
  experiences: Experience[];
  certificates: Certificate[];
  socialService: SocialService[];
}

export const CONFIG: Config = {
  name: "VINAY S KUMAR",
  profileImage: "/Profile Picture/VINAY.jpg",
  bio: "SOFTWARE ENGINEER AT HEART | INNOVATOR BY DESIGN <br /> I build performant full-stack applications and AI-driven automation workflows that turn complex challenges into seamless digital experiences. <br />Driven by passion. Fueled by curiosity.",
  socialLinks: {
    github: "https://github.com/vinayskumar25507",
    linkedin: "https://www.linkedin.com/in/vinay-s-kumar-3662b9375",
    twitter: "https://x.com/VIN_2557",
    email: "mailto:vinayskumar2557@gmail.com",
    resume: "/Personal Information/Vinay S Kumar - Resume.pdf",
  },
  skills: [
    "C++",
    "Python",
    "n8n",
    "HTML",
    "CSS",
    "JavaScript",
    "SQL",
    "Gradio",
    "Flask",
    "FastAPI",
    "Generative AI",
    "LangChain",
    "Google ADK (Agent Development Kit)",
  ],
  education: [
    {
      degree: "B.Tech in Computer Science & Engineering",
      institution: "SVyasa Deemed to be University X Nxtwave of Innovation in Advanced Technologies",
      duration: "2025 - 2028",
      details: "Specializing in Generative AI, Robotics, Full Stack Development, and Technical Market Analysis. Actively conducting meta-analysis on Autonomous AI Agents.",
      percentage: "--%",
    },
    {
      degree: "12th Grade",
      institution: "Jnanodaya PU College",
      duration: "2024",
      details: "Karnataka State Board (PUC - Pre-University Course)\nPCMC Stream\nSpecialized in Physics, Chemistry, Mathematics, and Computer Science",
      percentage: "92.3%",
    },
    {
      degree: "10th Grade",
      institution: "St.Rossello's Central School",
      duration: "2022",
      details: "Central Board of Secondary Education",
      percentage: "93.2%",
    },
  ],
  projects: [
    {
      title: "DataScrape AI: CS & Tech Discovery Hub",
      description: "A full-stack, real-time intelligence dashboard for the computer science ecosystem. Built with a React/Vite frontend, the platform automates data extraction using an n8n workflow powered by Google Gemini AI. It intelligently parses live event and course data from GeeksforGeeks and hackathon listings from Unstop, transforming unstructured web content into a structured, actionable student resource.",
      media: [
        {type: "image", url: "/Project Photos/DataScrape - AI - FE.png"},
        {type: "image", url: "/Project Photos/DataScrape - AI - BE.png"},
      ],
      link: "https://data-scrape-ai.vercel.app",
      techTags: ["React", "Vite", "n8n", "Google Gemini AI", "Vercel"],
    },
    {
      title: "Study Assistant: Dual-Persona AI Tutor",
      description: "An interactive educational web application hosted on Hugging Face Spaces that utilizes the Gemini 2.5 Flash model to break down complex concepts. Built with Gradio, it allows users to toggle between 'Friendly' and 'Academic' AI personas to receive tailored, beginner-friendly explanations enriched with real-world analogies.",
      media: [{ type: "image", url: "/Project Photos/Study Assistant - NIAT - Building LLM Application.png" }],
      link: "https://huggingface.co/spaces/VinWin25/StudyAssistant",
      techTags: ["Python", "Gradio", "Google GenAI", "Gemini 2.5 Flash", "Hugging Face Spaces"],
    },
    {
      title: "Rio: AI Retail & Style Assistant",
      description: "A specialized assistant that processes voice and text to scrape Amazon India for products. Includes a custom Python-based audio converter to handle OGA to OGG format transitions for seamless transcription.",
      media: [{ type: "image", url: "/Project Photos/Rio.png" }],
      techTags: ["n8n", "Python", "ScraperAPI", "Groq STT", "Whisper AI"],
    },
    {
      title: "Odin: AI-Powered Multi-Tool Agent",
      description: "An autonomous Telegram agent using a LangChain framework to identify user intent and execute tasks via tools like Google Calendar, Wikipedia, and SerpAPI for real-time web data.",
      media: [{ type: "image", url: "/Project Photos/Odin.png" }],
      techTags: ["n8n", "LangChain", "MCP", "Telegram Bot", "Google Gemini"],
    },
    {
      title: "AI Image Generator Webhook",
      description: "A high-speed image generation workflow triggered by webhooks. It communicates with the Freepik Imagen3 API, manages asynchronous wait states, and returns the generated binary image file.",
      media: [{ type: "image", url: "/Project Photos/Thumbnail Studio.png" }],
      link: "https://thumbnail-studio-03d98c9e.base44.app",
      techTags: ["n8n", "Freepik API", "Webhooks", "REST API", "Binary Data"],
    },
    {
      title: "AI Podcast Generator",
      description: "An end-to-end audio production workflow that converts raw topics into conversational scripts via Gemini, then utilizes Murf AI for high-fidelity speech synthesis and distribution.",
      media: [{ type: "image", url: "/Project Photos/Podcast Spark.png" }],
      link: "https://podcast-spark-47b201f4.base44.app/",
      techTags: ["n8n", "Murf AI", "Speech Synthesis", "Google Gemini", "Webhooks"],
    },
    {
      title: "Daily Market Intelligence Brief",
      description: "A comprehensive market analysis pipeline that aggregates data from 10+ financial sources (NSE, MoneyControl, Economic Times). Uses LangChain and Gemini to generate high-fidelity Markdown reports featuring world indices, Indian market movers, and corporate actions distributed via Gmail.",
      media: [{ type: "image", url: "/Project Photos/Stocks News.png" }],
      techTags: ["n8n", "LangChain", "Google Gemini", "SerpAPI", "Gmail API"],
    },
    {
      title: "Long-Term Wealth Predictor",
      description: "An advanced 'Forensics Analyst' agent that validates investment signals by merging technical momentum (SMA/RSI) with fundamental catalysts. Features a custom 'Judge' code node for risk validation and Elliott Wave pattern estimation to identify generational wealth opportunities.",
      media: [{ type: "image", url: "/Project Photos/Long Term Stocks.png" }],
      techTags: ["n8n", "Mistral AI", "Yahoo Finance API", "TypeScript", "Market Forensics"],
    },
    {
      title: "Netflix Series Tracker",
      description: "A dynamic tracking dashboard utilizing the TMDB API to manage watchlists. Features custom progress logic, LocalStorage persistence, and automated status transitions based on episode completion.",
      media: [{ type: "image", url: "/Project Photos/Netflix.png" }],
      link: "https://vinayskumar25507.github.io/NETFLIX-TRACKER/",
      techTags: ["JavaScript (ES6+)", "REST API", "LocalStorage", "CSS Grid", "HTML5"],
    },
    {
      title: "Anime Discovery & Tracker",
      description: "A feature-rich tracking dashboard using the Jikan (MyAnimeList) API. Developed custom logic for dynamic progress bars, automated status transitions (e.g., 'Watching' to 'Completed'), and persistent data storage using the LocalStorage API.",
      media: [{ type: "image", url: "/Project Photos/Anime.png" }],
      link: "https://vinayskumar25507.github.io/VIN-ANIME-TRACKER/",
      techTags: ["JavaScript (ES6+)", "Jikan API", "LocalStorage", "CSS Grid", "HTML5"],
    },
    {
      title: "AI News Summarizer & Distribution",
      description: "A scheduled pipeline that aggregates data from multiple RSS feeds and SerpAPI. It uses LLMs to synthesize a daily tech brief and automates professional email delivery via the Gmail API.",
      media: [{ type: "image", url: "/Project Photos/News Summarizer.png" }],
      techTags: ["n8n", "RSS", "Gmail API", "SerpAPI", "Data Aggregation"],
    },
    {
      title: "Social Media Workflow",
      description: "An automated content adaptation system that monitors Google Sheets for new articles, generates platform-optimized summaries, and publishes directly to LinkedIn and X.",
      media: [{ type: "image", url: "/Project Photos/Social Media.png" }],
      techTags: ["n8n", "LinkedIn API", "X API", "Google Sheets", "LLM Chains"],
    },
  ],
  experiences: [
    {
      company: "Launched Global",
      role: "Web Developer Intern",
      duration: "November 2025 - December 2025",
      description: "Developed a responsive web application using JavaScript (ES6+) and the Jikan API to search and manage anime watchlists. Implemented automated progress tracking and LocalStorage persistence to manage user states like Watching and Completed.",
    },
  ],
  certificates: [
    {
      name: "Hack the Human Signal - AI & Robotics Workshop",
      issuer: "NxtWave of Innovation in Advanced Technologies (NIAT)",
      date: "12 January 2026",
      description: "Developed a real-time hand gesture recognition system using Python, OpenCV, and MediaPipe during an introductory robotics workshop to explore how machines visually perceive their environment. The project processes live webcam feeds to map hand landmarks and identify complex gestures, demonstrating foundational computer vision techniques used in human-robot interaction.",
      media: [
        { type: "video", url: "/Project Videos/AI Robotics Workshop Video.mp4" },
        { type: "image", url: "/Project Photos/AI Robotics Workshop/AI Robotics Workshop Certificate.png" },
        { type: "image", url: "/Project Photos/AI Robotics Workshop/AI Robotics Workshop - Practical.png" },
        { type: "image", url: "/Project Photos/AI Robotics Workshop/Robot.jpg" },
      ],
      linkToFile: "/Certificates/AI Robotics Workshop.png",
    },
    {
      name: "Murf.AI - Hands-On App Building Workshop",
      issuer: "NxtWave of Innovation in Advanced Technologies (NIAT)",
      date: "23 January 2026",
      description: "Developed an AI-powered travel guide web application using Python, Flask, Gemini, and Murf AI during a college workshop. The platform dynamically generates localized tourist descriptions and converts them into natural-sounding, multilingual audio guides based on user preferences.",
      media: [{ type: "image", url: "/Project Photos/MURFAI.png" }],
      linkToFile: "/Certificates/MURFAI.png",
    },
    {
      name: "BASE44 Workshop Certificate",
      issuer: "Nxtwave of Innovation in Advanced Technologies (NIAT)",
      date: "18 November 2025",
      description: "Explored rapid application development during a college workshop focused on Base44, an AI-powered no-code platform that translates natural language prompts into working applications. Gained hands-on experience with its core features—including auto-generated app structures, integrated database management, and built-in user authentication—to quickly design and deploy full-stack prototypes.",
      media: [{ type: "image", url: "/Project Photos/Base44.png" }],
      linkToFile: "/Certificates/BASE44.png",
    },
    {
      name: "Web Development Course Completion Certificate",
      issuer: "Launched Global and E-Cell IIT Khargpur",
      date: "December 2025",
      description: "Successfully completed a comprehensive Web Development program with a core focus on front-end technologies, including HTML5, CSS3, and modern vanilla JavaScript. Mastered essential web development concepts such as semantic UI structuring, responsive design using CSS Grid and Flexbox, asynchronous event handling, dynamic DOM manipulation, and browser data persistence (LocalStorage).",
      media: [{ type: "image", url: "/Project Photos/Course Completion - LG.png" }],
      linkToFile: "/Certificates/Certificate of Course Completion - Launched Global.pdf",
    },
    {
      name: "Web Development Internship Completion Certificate",
      issuer: "Launched Global",
      date: "December 2025",
      description: "Designed and developed the 'AniFocus Tracker,' a dynamic Single Page Application (SPA) built entirely with HTML, CSS, and vanilla JavaScript. Engineered core functionalities including full CRUD (Create, Read, Update, Delete) operations, dynamic content filtering, and real-time search logic. Implemented a persistent state management system utilizing the browser's LocalStorage API, and designed a highly responsive, modern dark-themed user interface to ensure a seamless user experience across devices.",
      media: [{ type: "image", url: "/Project Photos/Internship Completion - LG.png" }],
      linkToFile: "/Certificates/Certificate Of Internship Completion - Launched Global.pdf",
    },
  ],
  socialService: [
    {
      organization: "Narayana Hrudayalaya Blood Centre",
      role: "Voluntary Blood Donor",
      duration: "December 19, 2025",
      description: "Contributed to a life-saving cause through voluntary blood donation at Narayana Health, demonstrating social responsibility and community support.",
      media: [{ type: "image", url: "/Project Photos/Blood Donation - 1.jpg" },
              { type: "image", url: "/Profile Picture/First Blood Donation - 19 Dec 2025.jpg" },
            ],
      linkToFile: "/Certificates/Blood Donation - 1.pdf",
    },
  ],
};