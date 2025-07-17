type BaseBlog = {
  date: number;
  description: string;
  title: string;
};

export type BlogCardData = BaseBlog & {
  slug: string;
  url: string;
};

// contains all the extra fields necessary to render a full blog page
export type RenderBlog = BaseBlog & {
  absoluteUrl: string;
  html: string;
  ldjson: string;
  previewImage?: BlogPreviewImage;
  recentBlogs: BlogCardData[];
};

export enum ProjectType {
  Blog = "blog",
  GitHub = "github",
  Error = "error",
}

export type Project = {
  category: ProjectCategory;
  date: Date;
  description: string;
  hackathonName?: string;
  image?: ProjectImage;
  languages: string[];
  name: string;
  type: ProjectType;
  url: string;
};

export const PROJECT_CATEGORIES = [
  "error",
  "hackathon",
  "personal",
  "school",
] as const;
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

/* This is by no means exhaustive, but I *think* it's better than nothing? */
export type GitHubAPIResponse = {
  description: string;
  updated_at: string;
  html_url: string;
  languages_url: string;
  name: string;
};

type BaseImage = {
  alt: string;
};

export type ProjectImage = BaseImage & {
  path: string;
  width?: number;
  height?: number;
};

export type BlogPreviewImage = BaseImage & {
  absolutePath: string;
  ogUrl: string;
};
