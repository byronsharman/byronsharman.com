import type * as zod from "zod";
import type { ExperienceSchema } from "$lib/zod-schemas/experience";

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
  requiresHighlight: boolean;
};

// properties needed to draw an experience that should override properties in
// zod.infer<typeof ExperienceSchema>
type RenderExperience = {
  date: Date;
  description: string;
  image?: ExperienceImage;
  languages: string[];
  name: string;
  url?: string;
};

export type Experience = Omit<
  zod.infer<typeof ExperienceSchema>,
  keyof RenderExperience
> &
  RenderExperience;

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

export type ExperienceImage = BaseImage & {
  path: string;
  width: number;
  height: number;
};

export type BlogPreviewImage = BaseImage & {
  absolutePath: string;
  ogUrl: string;
};
