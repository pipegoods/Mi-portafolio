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

export interface CvData {
  profile: Profile;
  experience: Company[];
  projects: Project[];
  skills: SkillGroup[];
  languages: Language[];
  education: Education[];
}
