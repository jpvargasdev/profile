
export interface Project {
  title: string;
  year: string;
  description: string;
  tags: string[];
  image?: string;
  link?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export interface Experience {
  company: string;
  role: string;
  start: string;
  end: string;
  description: string;
  logo?: string;
  location?: string;
  technologies?: string[];
}

export interface Hobby {
  title: string;
  description: string;
  image?: string;
  icon?: string;
}
