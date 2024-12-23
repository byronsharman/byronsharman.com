export enum ProjectType {
  Blog = 'blog',
  GitHub = 'github',
  NetworkError = 'networkerror',
}

export type Blog = {
  customHeaderHTML: string;
  date: number;
  preview: string;
  previewImage: string;
  previewImageAlt: string;
  slug: string;
  title: string;
};

export type Project = {
  bottomText: string;
  category: ProjectCategory;
  description: string;
  hackathonName?: string;
  image?: string;
  languages: Array<string>;
  name: string;
  type: ProjectType;
  url: string;
};

export type ProjectCategory = "error" | "hackathon" | "personal" | "school";
