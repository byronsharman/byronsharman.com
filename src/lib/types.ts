export enum ProjectType {
  Blog = "blog",
  GitHub = "github",
  NetworkError = "networkerror",
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

// describes the blogs in index.json
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
  bottomText: string;
  category: ProjectCategory;
  description: string;
  hackathonName?: string;
  image?: ProjectImage;
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
