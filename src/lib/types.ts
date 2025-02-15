export enum ProjectType {
  Blog = 'blog',
  GitHub = 'github',
  NetworkError = 'networkerror',
}

// describes the blogs in index.json
// TODO: tighten Blog interface so it only contains the minimum necessary to load a BlogCard
export interface Blog {
  customHeaderMD: string;
  date: number;
  openGraphImageUrl?: string;
  preview: string;
  previewImage?: Image;
  slug: string;
  title: string;
  url: string;
};

// contains all the extra fields necessary to render a full blog page
export interface RenderBlog extends Blog {
  html: string;
  ldjson: string;
  recentBlogs: { [slug: string]: Blog };
}

export type Project = {
  bottomText: string;
  category: ProjectCategory;
  description: string;
  hackathonName?: string;
  image?: Image;
  languages: Array<string>;
  name: string;
  type: ProjectType;
  url: string;
};

export type ProjectCategory = "error" | "hackathon" | "personal" | "school";

export type GitHubAPIResponse = {
  description: string;
  html_url: string;
  languages_url: string;
  name: string;
};

export type Image = {
  path: string;
  alt: string;
  width: number;
  height: number;
};
