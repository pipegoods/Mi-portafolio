import type { CvData } from "./types.ts";

// Adaptación, no traducción literal. "Cartagenero", "sin perseguir recibos" o
// "a cuatro manos" no tienen equivalente directo: se busca el mismo registro
// —cercano, concreto, sin lenguaje de venta— en inglés natural.
export const en: CvData = {
  ui: {
    locale: "en",
    nav: {
      about: "About me",
      experience: "Experience",
      projects: "Projects",
      contact: "Contact",
    },
    sections: {
      about: "About me",
      experience: "Experience",
      projects: "Projects",
      contact: "Contact",
    },
    contactIntro: "To reach me about a project or a role:",
    copyEmail: "Copy",
    emailCopied: "Copied",
    yearsInProduction: "{years} years in production",
    resume: "Resume",
    backToTop: "Back to top",
    viewOnGithub: "View on GitHub",
    photoAlt: "Profile photo of {name}",
    ogImageAlt:
      "{name}, Full Stack Developer in Cali, Colombia, next to an illustration of an interactive kiosk",
    pageTitle: "Andrés Vizcaíno | Full Stack Developer",
    ogTitle: "Hi, I'm Andrés Vizcaíno",
    metaDescription:
      "Full stack developer in Cali, Colombia. {years} years building platforms for scientific events: e-learning, live streaming and interactive kiosks for medical conferences.",
    cv: {
      experience: "Experience",
      projects: "Projects",
      skills: "Skills",
      languages: "Languages",
      education: "Education",
    },
    switchTo: { href: "/", label: "Español" },
    languageSuggestion: {
      lang: "es",
      message: "Este sitio también está en español.",
      action: "Leer en español",
      dismiss: "Cerrar",
    },
  },

  profile: {
    name: "Andrés Vizcaíno",
    fullName: "Andrés Vizcaíno Salazar",
    title: "Full Stack Developer",
    location: "Cali, Colombia",
    email: "pipe.jaider@gmail.com",
    phone: "+57 316 796 6709",
    site: "https://andresvizcaino.com",
    github: "https://github.com/pipegoods",
    linkedin: "https://www.linkedin.com/in/andres-vizcaino-salazar/",
    twitter: "@pipegoods",
    careerStart: "2020-05-01",
    about: [
      "I'm a full stack developer from Cartagena, on Colombia's Caribbean coast, with six years of experience. Five of them have been at igloolab, building platforms for scientific events: e-learning, live streams, conference games, and kiosks that run on physical buttons.",
      "I take projects end to end: I gather the requirements with the client, build it, and look after the server. Right now I'm leading an AI diagnostic-support tool for general practitioners.",
      "Outside work I build my own apps, usually to solve a problem I keep running into.",
    ],
    stack: ["Next JS", "TypeScript", "Prisma", "Supabase", "React Native"],
  },

  experience: [
    {
      name: "igloolab",
      location: "Cali, Colombia",
      roles: [
        {
          title: "Full Stack Web Developer",
          startDate: "Sep. 2022",
          endDate: "Present",
          tasks: [
            "I lead development of platforms for scientific events run by global pharmaceutical companies, with e-learning courses of up to 1,000 registered users and live streams for 300 simultaneous attendees.",
            "I lead a dermatology diagnostic-support tool for general practitioners, combining RAG over medical literature with image analysis using multimodal models.",
            "I automated conference badge generation, cutting a manual design-team process from days to minutes.",
            "I built interactive games and experiences (trivia, prize wheels, escape rooms) for conferences, both on the web and on digital kiosks, wiring physical buttons and sensors with Arduino.",
            "I ship around 3 projects a month and also own the DevOps side: I run the servers and answer for uptime on Digital Ocean, Vercel, Netlify and Azure.",
            "I gather requirements directly with clients and stay with the project from definition through to production.",
          ],
          stack: [
            "Next.js",
            "React",
            "TypeScript",
            "Python",
            "FastAPI",
            "Prisma",
            "Supabase",
            "PostgreSQL",
            "Docker",
            "Tailwind CSS",
          ],
        },
        {
          title: "Web Developer",
          startDate: "Sep. 2021",
          endDate: "Sep. 2022",
          tasks: [
            "I built front-ends with React JS, handling markup and deployment of web platforms.",
          ],
          stack: ["React", "HTML", "JavaScript", "MongoDB", "Digital Ocean"],
        },
        {
          title: "Web Master",
          startDate: "Apr. 2021",
          endDate: "Sep. 2021",
          tasks: [
            "I maintained the corporate websites and improved their interface and search ranking, looking after performance, security and availability.",
          ],
          stack: ["WordPress", "Drupal", "HTML", "CSS", "JavaScript"],
        },
      ],
    },
    {
      name: "Sima",
      legalName: "Agencia Sima Digital",
      location: "Cartagena, Colombia",
      roles: [
        {
          title: "Web Master",
          startDate: "May. 2020",
          endDate: "Apr. 2021",
          tasks: [
            "I built WordPress sites for small businesses.",
            "I managed hosting on CPanel and Linux.",
          ],
          stack: ["WordPress", "HTML", "Web Hosting"],
        },
      ],
    },
  ],

  projects: [
    {
      name: "Dogesti",
      tagline: "Operations system for small businesses",
      description:
        "A small business runs everything in one place: inventory by location, point of sale, and electronic invoicing with Colombia's tax authority. One account can manage several companies.",
      technologies: [
        "Next JS",
        "Supabase",
        "Tailwind CSS",
        "shadcn/ui",
        "TypeScript",
      ],
      link: "https://dogesti.com",
      linkLabel: "View demo",
      inCv: true,
      featured: true,
    },
    {
      name: "Viatro",
      tagline: "Travel expense reporting",
      description:
        "Filing travel expenses without hunting for receipts: each trip keeps its entries by category, with the receipt attached and the invoice scanned by QR. I built it because I travel to events and was doing this by hand.",
      technologies: [
        "Next JS",
        "Prisma",
        "PostgreSQL",
        "Clerk",
        "AWS S3",
        "PWA",
      ],
      inCv: true,
    },
    {
      name: "Artemis II Tracker",
      tagline: "3D visualization of the NASA mission",
      description:
        "The Orion spacecraft on its way to the Moon and back, in 3D, following the real trajectory published by NASA's JPL. It fits in a single HTML file.",
      technologies: ["Three.js", "WebGL", "JavaScript", "JPL data"],
      link: "https://github.com/pipegoods/artemis-ii-tracker",
      inCv: true,
    },
    {
      name: "Stridia",
      tagline: "AI running plans",
      description:
        "Tell it your goal — 5K, endurance, speed — and it builds the week's training plan; if you wake up feeling off, it adjusts. Built together with Katy Paola.",
      technologies: ["Next JS", "AI SDK", "Open AI", "Dexie", "TypeScript"],
      link: "https://github.com/katy-paola/cubepath-hackathon",
    },
    {
      name: "Fintivo",
      tagline: "Personal finances on your phone",
      description:
        "Income and expenses in Colombian pesos, with the categories people actually use. Everything stays on the phone: no account to create, nothing uploaded.",
      technologies: ["Flutter", "Dart", "Material Design 3"],
      link: "https://appdistribution.firebase.google.com/i/70e43f42606783c2",
      linkLabel: "Download APK",
    },
    {
      name: "lpbcol-app",
      tagline: "Colombian Professional Baseball League",
      description:
        "Scores and standings for Colombia's Professional Baseball League. There's no public API, so I scrape them. A practice project.",
      technologies: [
        "Astro",
        "Hono",
        "Web scraping",
        "Tailwind CSS",
        "TypeScript",
      ],
      link: "https://github.com/pipegoods/lpbcol-app",
    },
  ],

  skills: [
    {
      // "Programming languages" y no "Languages", para no chocar con la
      // sección de idiomas.
      label: "Programming languages",
      items: ["TypeScript", "JavaScript", "Python", "Dart", "Go", "SQL"],
    },
    {
      label: "Frameworks",
      items: [
        "Next.js",
        "React",
        "React Native",
        "Flutter",
        "Astro",
        "FastAPI",
        "Node.js",
        "Tailwind CSS",
      ],
    },
    {
      label: "Data & infrastructure",
      items: [
        "PostgreSQL",
        "Prisma",
        "Supabase",
        "MongoDB",
        "Docker",
        "Digital Ocean",
        "Vercel",
        "Azure",
        "Netlify",
      ],
    },
    {
      label: "Other",
      items: ["RAG and multimodal models", "REST APIs", "Arduino", "Git", "Scrum"],
    },
  ],

  languages: [
    { name: "Spanish", level: "native" },
    { name: "English", level: "B2 reading and listening, B1 conversational" },
  ],

  education: [
    {
      institution: "Universidad de Cartagena, Colombia",
      degree: "B.Sc. in Systems Engineering",
      date: "Dec. 2022",
    },
  ],
};
