import type * as zod from "zod";
import type { project } from "$lib/zod-schemas/project";

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

// properties needed to draw a project that should override properties in zod.infer<typeof project>
type RenderProject = {
  date: Date;
  description: string;
  image?: ProjectImage;
  languages: string[];
  name: string;
  url?: string;
};

export type Project = Omit<zod.infer<typeof project>, keyof RenderProject> & RenderProject;

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
  width: number;
  height: number;
};

export type BlogPreviewImage = BaseImage & {
  absolutePath: string;
  ogUrl: string;
};
