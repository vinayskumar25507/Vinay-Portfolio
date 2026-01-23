export interface Project {
  title: string;
  description: string;
  techTags: string[];
  image?: string;
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
  },
  skills: ["C++", "Python", "n8n", "HTML", "CSS", "JavaScript", "MySQL"],
  education: [
    {
      degree: "B.Tech in Computer Science & Engineering",
      institution: "SVyasa Deemed to be University X Nxtwave of Innovation in Advanced Technologies",
      duration: "2025 - 2029",
      details: "Specializing in Generative AI, Robotics, Full Stack Development, and Technical Market Analysis. Actively conducting meta-analysis on Autonomous AI Agents.",
      percentage: "--%",
    },
    {
      degree: "Pre-University",
      institution: "Jnanodaya PU College",
      duration: "2023 - 2024",
      details: "Karnataka State Board (PUC - Pre-University Course)\nPCMC Stream\nSpecializing in Physics, Chemistry, Mathematics, and Computer Science",
      percentage: "92.3%",
    },
    {
      degree: "10th Standard",
      institution: "St.Rossello's Central School",
      duration: "2022",
      details: "Central Board of Secondary Education",
      percentage: "93.2%",
    },
  ],
  projects: [
    {
      title: "Rio: AI Retail & Style Assistant",
      description: "A specialized assistant that processes voice and text to scrape Amazon India for products. Includes a custom Python-based audio converter to handle OGA to OGG format transitions for seamless transcription.",
      image: "/Project Photos/Rio.png",
      techTags: ["n8n", "Python", "ScraperAPI", "Groq STT", "Whisper AI"],
    },
    {
      title: "Odin: AI-Powered Multi-Tool Agent",
      description: "An autonomous Telegram agent using a LangChain framework to identify user intent and execute tasks via tools like Google Calendar, Wikipedia, and SerpAPI for real-time web data.",
      image: "/Project Photos/Odin.png",
      techTags: ["n8n", "LangChain", "MCP", "Telegram Bot", "Google Gemini"],
    },
    {
      title: "AI Image Generator Webhook",
      description: "A high-speed image generation workflow triggered by webhooks. It communicates with the Freepik Imagen3 API, manages asynchronous wait states, and returns the generated binary image file.",
      image: "/Project Photos/Thumbnail Studio.png",
      link: "https://thumbnail-studio-03d98c9e.base44.app",
      techTags: ["n8n", "Freepik API", "Webhooks", "REST API", "Binary Data"],
    },
    {
      title: "AI Podcast Generator",
      description: "An end-to-end audio production workflow that converts raw topics into conversational scripts via Gemini, then utilizes Murf AI for high-fidelity speech synthesis and distribution.",
      image: "/Project Photos/Podcast Spark.png",
      link: "https://podcast-spark-47b201f4.base44.app/",
      techTags: ["n8n", "Murf AI", "Speech Synthesis", "Google Gemini", "Webhooks"],
    },
    {
      title: "Daily Market Intelligence Brief",
      description: "A comprehensive market analysis pipeline that aggregates data from 10+ financial sources (NSE, MoneyControl, Economic Times). Uses LangChain and Gemini to generate high-fidelity Markdown reports featuring world indices, Indian market movers, and corporate actions distributed via Gmail.",
      image: "/Project Photos/Stocks News.png",
      techTags: ["n8n", "LangChain", "Google Gemini", "SerpAPI", "Gmail API"],
    },
    {
      title: "Long-Term Wealth Predictor",
      description: "An advanced 'Forensics Analyst' agent that validates investment signals by merging technical momentum (SMA/RSI) with fundamental catalysts. Features a custom 'Judge' code node for risk validation and Elliott Wave pattern estimation to identify generational wealth opportunities.",
      image: "/Project Photos/Long Term Stocks.png",
      techTags: ["n8n", "Mistral AI", "Yahoo Finance API", "TypeScript", "Market Forensics"],
    },
    {
      title: "Netflix Series Tracker",
      description: "A dynamic tracking dashboard utilizing the TMDB API to manage watchlists. Features custom progress logic, LocalStorage persistence, and automated status transitions based on episode completion.",
      image: "/Project Photos/Netflix.png",
      link: "https://vinayskumar25507.github.io/NETFLIX-TRACKER/",
      techTags: ["JavaScript (ES6+)", "REST API", "LocalStorage", "CSS Grid", "HTML5"],
    },
    {
      title: "Anime Discovery & Tracker",
      description: "A feature-rich tracking dashboard using the Jikan (MyAnimeList) API. Developed custom logic for dynamic progress bars, automated status transitions (e.g., 'Watching' to 'Completed'), and persistent data storage using the LocalStorage API.",
      image: "/Project Photos/Anime.png",
      link: "https://vinayskumar25507.github.io/VIN-ANIME-TRACKER/",
      techTags: ["JavaScript (ES6+)", "Jikan API", "LocalStorage", "CSS Grid", "HTML5"],
    },
    {
      title: "AI News Summarizer & Distribution",
      description: "A scheduled pipeline that aggregates data from multiple RSS feeds and SerpAPI. It uses LLMs to synthesize a daily tech brief and automates professional email delivery via the Gmail API.",
      image: "/Project Photos/News Summarizer.png",
      techTags: ["n8n", "RSS", "Gmail API", "SerpAPI", "Data Aggregation"],
    },
    {
      title: "Social Media Workflow",
      description: "An automated content adaptation system that monitors Google Sheets for new articles, generates platform-optimized summaries, and publishes directly to LinkedIn and X.",
      image: "/Project Photos/Social Media.png",
      techTags: ["n8n", "LinkedIn API", "X API", "Google Sheets", "LLM Chains"],
    },
  ],
  experiences: [
    {
      company: "Launched Global",
      role: "Web Developer Intern",
      duration: "November 2025 - December 2025",
      description:
        "Developed a responsive web application using JavaScript (ES6+) and the Jikan API to search and manage anime watchlists. Implemented automated progress tracking and LocalStorage persistence to manage user states like Watching and Completed.",
    },
  ],
  certificates: [
    {
      name: "BASE44 Workshop Certificate",
      issuer: "Nxtwave of Innovation in Advanced Technologies (NIAT)",
      date: "0November 2025",
      // Put your file under /public and reference like: \"/certificates/aws-ccp.pdf\"
      linkToFile: "/Certificates/BASE44.png",
    },
    {
      name: "Web Development Course Completion Certificate",
      issuer: "Launched Global and E-Cell IIT Khargpur",
      date: "December 2025",
      linkToFile: "/Certificates/Certificate of Course Completion - Launched Global.pdf",
    },
    {
      name: "Web Development Internship Completion Certificate",
      issuer: "Launched Global",
      date: "December 2025",
      linkToFile: "/Certificates/Certificate Of Internship Completion - Launched Global.pdf",
    },
  ],
};
