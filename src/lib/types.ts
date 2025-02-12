export enum ProjectType {
  Blog = 'blog',
  GitHub = 'github',
  NetworkError = 'networkerror',
}

// describes the blogs in index.json
export interface Blog {
  customHeaderMD: string;
  date: number;
  openGraphImageExt?: string;
  preview: string;
  previewImage?: string;
  previewImageAlt?: string;
  previewImageExt?: string;
  slug: string;
  title: string;
};

// contains all the extra fields necessary to render a full blog page
export interface RenderBlog extends Blog {
  html: string;
  ldjson: string;
  openGraphImageUrl?: string;
  previewImageUrl?: string;
  recentBlogs: { [slug: string]: Blog };
  url: string;
}

export type Project = {
  bottomText: string;
  category: ProjectCategory;
  description: string;
  hackathonName?: string;
  image?: string;
  imageAlt?: string;
  languages: Array<string>;
  name: string;
  type: ProjectType;
  url: string;
};

export type ProjectCategory = "error" | "hackathon" | "personal" | "school";
