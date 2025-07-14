export enum ProjectType {
  Blog = "blog",
  GitHub = "github",
  Error = "error",
}

type BaseBlog = {
  customHeaderMD?: string;
  date: number;
  preview: string;
  title: string;
};

export type BlogCardData = Omit<BaseBlog, "customHeaderMD"> & {
  slug: string;
  url: string;
};

// describes the blogs in blogs.json
export type BlogInJson = Readonly<
  BaseBlog & {
    openGraphImageExt?: string;
    previewImage?: string;
    previewImageAlt?: string;
    previewImageExt?: string;
    published: boolean;
  }
>;

// contains all the extra fields necessary to render a full blog page
export type RenderBlog = BaseBlog & {
  absoluteUrl: string;
  html: string;
  ldjson: string;
  previewImage?: BlogPreviewImage;
  recentBlogs: BlogCardData[];
};

export type Project = {
  category: ProjectCategory;
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

export type GitHubAPIResponse = {
  description: string;
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
  openGraphImageUrl: string;
};
