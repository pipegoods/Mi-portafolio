import type { CvData } from "./types.ts";

// Fuente única de verdad: de aquí salen tanto las secciones del sitio como
// el CV en PDF. Editar en un solo lugar evita que las dos versiones diverjan.
export const es: CvData = {
  ui: {
    locale: "es",
    nav: {
      about: "Qué construyo",
      experience: "Experiencia",
      projects: "Proyectos",
    },
    sections: {
      about: "Sobre mí",
      experience: "Experiencia",
      projects: "Proyectos",
    },
    yearsInProduction: "{years} años en producción",
    resume: "Curriculum",
    backToTop: "Volver arriba",
    viewOnGithub: "Ver en GitHub",
    photoAlt: "Foto de perfil de {name}",
    ogImageAlt:
      "{name}, Full Stack Developer en Cali, Colombia, junto a la ilustración de un tótem interactivo",
    pageTitle: "Andrés Vizcaíno | Full Stack Developer",
    ogTitle: "Hola, soy Andrés Vizcaíno",
    metaDescription:
      "Desarrollador full stack en Cali, Colombia. Llevo {years} años construyendo plataformas para eventos científicos: e-learnings, transmisiones en vivo y tótems interactivos para congresos.",
    cv: {
      experience: "Experiencia",
      projects: "Proyectos",
      skills: "Habilidades",
      languages: "Idiomas",
      education: "Educación",
    },
    switchTo: { href: "/en/", label: "English" },
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
      "Soy un desarrollador full stack cartagenero. Llevo seis años en igloolab construyendo plataformas para eventos científicos: e-learnings, transmisiones en vivo, juegos para congresos y tótems que funcionan con botones físicos.",
      "Trabajo el proyecto completo: levanto el requerimiento con el cliente, lo construyo y me encargo del servidor. Ahora lidero una herramienta de apoyo diagnóstico con IA para médicos generales.",
      "Por fuera del trabajo hago mis propias apps, casi siempre para resolverme un problema.",
    ],
    stack: [
      "Next JS",
      "TypeScript",
      "Prisma",
      "Supabase",
      "React Native",
    ],
  },

  experience: [
    {
      name: "igloolab",
      location: "Cali, Colombia",
      roles: [
        {
          title: "Full Stack Web Developer",
          startDate: "Sep. 2022",
          endDate: "Actualidad",
          tasks: [
            "Lidero el desarrollo de plataformas para eventos científicos de laboratorios farmacéuticos globales, con e-learnings de hasta 1.000 usuarios inscritos y transmisiones en vivo de 300 asistentes simultáneos.",
            "Lidero una herramienta de soporte diagnóstico dermatológico para médicos generales, que combina RAG sobre literatura médica con análisis de imágenes mediante modelos multimodales.",
            "Automaticé la generación de escarapelas, reduciendo de días a minutos un proceso que antes era manual para el equipo de diseño.",
            "Construí juegos y experiencias interactivas (trivias, ruletas, escape rooms) para congresos, en web y en tótems digitales, integrando botones físicos y sensores con Arduino.",
            "Entrego cerca de 3 proyectos al mes y hago también el DevOps: administro los servidores y respondo por la estabilidad en Digital Ocean, Vercel, Netlify y Azure.",
            "Levanto requerimientos directamente con el cliente y acompaño el proyecto desde la definición hasta la entrega en producción.",
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
            "Desarrollé front-end con React JS, encargándome de la maquetación y el despliegue de plataformas web.",
          ],
          stack: [
            "React",
            "HTML",
            "JavaScript",
            "MongoDB",
            "Digital Ocean",
          ],
        },
        {
          title: "Web Master",
          startDate: "Abr. 2021",
          endDate: "Sep. 2021",
          tasks: [
            "Administré los sitios web corporativos y mejoré su interfaz y posicionamiento SEO, cuidando rendimiento, seguridad y disponibilidad.",
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
          endDate: "Abr. 2021",
          tasks: [
            "Construí sitios web en WordPress para pymes.",
            "Administré hosting en CPanel y Linux.",
          ],
          stack: ["WordPress", "HTML", "Hosting Web"],
        },
      ],
    },
  ],

  projects: [
    {
      name: "Dogesti",
      tagline: "Sistema de operación para pymes",
      description:
        "Una pyme opera todo en un solo sistema: inventario por sede, punto de venta y facturación electrónica ante la DIAN. Un mismo usuario puede manejar varias empresas.",
      technologies: [
        "Next JS",
        "Supabase",
        "Tailwind CSS",
        "shadcn/ui",
        "TypeScript",
      ],
      link: "https://dogesti.com",
      linkLabel: "Ver demo",
      inCv: true,
    },
    {
      name: "Viatro",
      tagline: "Legalización de gastos de viaje",
      description:
        "Legalizar gastos de viaje sin perseguir recibos: cada evento lleva sus movimientos por categoría, con el soporte adjunto y la factura escaneada por QR. La construí porque viajo a eventos y me tocaba hacerlo a mano.",
      technologies: ["Next JS", "Prisma", "PostgreSQL", "Clerk", "AWS S3", "PWA"],
      inCv: true,
    },
    {
      name: "Artemis II Tracker",
      tagline: "Visualización 3D de la misión de la NASA",
      description:
        "La nave Orion rumbo a la Luna y de vuelta, en 3D y con la trayectoria real del JPL de la NASA. Cabe en un solo archivo HTML.",
      technologies: ["Three.js", "WebGL", "JavaScript", "Datos del JPL"],
      link: "https://github.com/pipegoods/artemis-ii-tracker",
      inCv: true,
    },
    {
      name: "Stridia",
      tagline: "Rutinas de running con IA",
      description:
        "Dile tu objetivo —5K, resistencia, velocidad— y arma el plan semanal de entrenamiento; si un día amaneces mal, lo reajusta. Hecho a cuatro manos con Katy Paola.",
      technologies: ["Next JS", "AI SDK", "Open AI", "Dexie", "TypeScript"],
      link: "https://github.com/katy-paola/cubepath-hackathon",
    },
    {
      name: "Fintivo",
      tagline: "Finanzas personales en el teléfono",
      description:
        "Ingresos y gastos con la plata en pesos colombianos y las categorías que uno de verdad usa. Guarda todo en el teléfono: sin cuenta que crear ni datos que subir.",
      technologies: ["Flutter", "Dart", "Material Design 3"],
      link: "https://appdistribution.firebase.google.com/i/70e43f42606783c2",
      linkLabel: "Descargar APK",
    },
    {
      name: "lpbcol-app",
      tagline: "Liga Profesional de Béisbol de Colombia",
      description:
        "Resultados y tablas de la Liga Profesional de Béisbol de Colombia. Como no hay API pública, los saco por scraping. Proyecto de práctica.",
      technologies: ["Astro", "Hono", "Scraping Web", "Tailwind CSS", "TypeScript"],
      link: "https://github.com/pipegoods/lpbcol-app",
    },
  ],

  skills: [
    {
      label: "Lenguajes",
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
      label: "Datos e infraestructura",
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
      label: "Otros",
      items: [
        "RAG y modelos multimodales",
        "API REST",
        "Arduino",
        "Git",
        "Scrum",
      ],
    },
  ],

  languages: [
    { name: "Español", level: "nativo" },
    { name: "Inglés", level: "B2 en lectura y escucha, B1 conversacional" },
  ],

  education: [
    {
      institution: "Universidad de Cartagena, Colombia",
      degree: "Ingeniería de Sistemas",
      date: "Dic. 2022",
    },
  ],
};
