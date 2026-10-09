export interface Role {
  title: string;
  startDate: string;
  endDate: string;
  tasks: string[];
  stack: string[];
}

export interface Company {
  /** Nombre corto, el que se muestra en el sitio. */
  name: string;
  /** Razón social, si difiere. El CV usa esta cuando existe. */
  legalName?: string;
  location: string;
  roles: Role[];
}

export interface Project {
  name: string;
  /** Frase de una línea que acompaña al nombre en el CV. */
  tagline?: string;
  description: string;
  technologies: string[];
  link?: string;
  linkLabel?: string;
  /** Los proyectos entran al CV solo si se marcan; el sitio los muestra todos. */
  inCv?: boolean;
  /** El sitio lo muestra en una tarjeta ancha, antes que los demás. */
  featured?: boolean;
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface Language {
  name: string;
  level: string;
}

export interface Education {
  institution: string;
  degree: string;
  date: string;
}

export interface Profile {
  name: string;
  /** Nombre completo para el encabezado del CV. */
  fullName: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  site: string;
  github: string;
  linkedin: string;
  twitter: string;
  /** Inicio de la carrera: los años de experiencia se calculan desde aquí. */
  careerStart: string;
  /** Párrafos de la sección "Sobre mí" del sitio. */
  about: string[];
  /** Tecnologías destacadas bajo la presentación. */
  stack: string[];
}

/** Textos de interfaz. Separados del contenido para poder traducirlos aparte. */
export interface Ui {
  /** Código del idioma para el atributo lang y las URLs. */
  locale: string;
  /** Etiquetas de navegación y encabezados de sección. */
  nav: { about: string; experience: string; projects: string; contact: string };
  sections: {
    about: string;
    experience: string;
    projects: string;
    contact: string;
  };
  /** Texto que acompaña al correo en la sección de contacto. */
  contactIntro: string;
  copyEmail: string;
  emailCopied: string;
  /** Admite el marcador {years}. */
  yearsInProduction: string;
  resume: string;
  backToTop: string;
  viewOnGithub: string;
  /** Admite el marcador {name}. */
  photoAlt: string;
  /** Descripción de la tarjeta de Open Graph. Admite el marcador {name}. */
  ogImageAlt: string;
  pageTitle: string;
  ogTitle: string;
  /** Admite el marcador {years}. */
  metaDescription: string;
  /** Encabezados de las secciones del CV. */
  cv: {
    experience: string;
    projects: string;
    skills: string;
    languages: string;
    education: string;
  };
  /** Enlace al otro idioma. */
  switchTo: { href: string; label: string };
  /** Aviso para quien llega con el navegador en el otro idioma. Va escrito en
   * ese otro idioma, porque es el que entiende el visitante. */
  languageSuggestion: {
    /** Prefijo de idioma del navegador que dispara el aviso, p. ej. "en". */
    lang: string;
    message: string;
    action: string;
    dismiss: string;
  };
}

export interface CvData {
  ui: Ui;
  profile: Profile;
  experience: Company[];
  projects: Project[];
  skills: SkillGroup[];
  languages: Language[];
  education: Education[];
}
