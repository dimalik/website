export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  image?: string;
  content: string;
}

export interface Project {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  image?: string;
  content: string;
}

export interface Publication {
  title: string;
  authors: string[];
  venue: string;
  year: number;
  category: "peer-reviewed" | "other" | "patent";
  links: {
    pdf?: string;
    code?: string;
    bibtex?: string;
    interactive?: string;
  };
}

export interface LatestItem {
  slug: string;
  title: string;
  date: string;
  description: string;
  type: "post" | "project";
}
