import type { GitHubAPIResponse, Project, ProjectImage } from "$lib/types";

import imageSizeFromFile from "image-size";
import matter from "gray-matter";
import * as marked from "marked";
import { basename } from "node:path";

import { project } from "$lib/zod-schemas/project";
import { parseBlog } from "./blogUtils";

const LANG_EXCLUDES = ["Dockerfile", "Makefile"];

/* return a Project modified to include metadata fetched from the Github API */
async function fetchGitHubMetadata(
  projectName: string,
  fetchFunc: typeof fetch,
) {
  const res: Response = await fetchFunc(
    `https://api.github.com/repos/byronsharman/${projectName}`,
  );
  if (!res.ok) {
    throw new Error(
      `Fetch from GitHub API failed with code ${res.status}: ${res.statusText}`,
    );
  }
  const githubProject: GitHubAPIResponse = await res.json();

  // get project languages by querying the URL returned by the API
  let languages: string[] = [];
  const lang_res = await fetchFunc(githubProject.languages_url);
  if (!res.ok) {
    throw new Error(
      `Fetch from GitHub API failed with code ${res.status}: ${res.statusText}. Skipping languages for project ${githubProject.name}.`,
    );
  } else {
    languages = Object.keys(await lang_res.json()).filter(
      (lang) => !LANG_EXCLUDES.includes(lang),
    );
  }

  return {
    name: githubProject.name,
    date: new Date(githubProject.updated_at),
    url: githubProject.html_url,
    languages,
  };
}

export async function getProjects(fetchFunc: typeof fetch): Promise<Project[]> {
  const rawProjectData: Record<string, string> = import.meta.glob(
    "$lib/assets/markdown/projects/*.md",
    {
      query: "?raw",
      import: "default",
      // for some reason the returned object is empty unless eager is true
      eager: true,
    },
  );
  return (
    await Promise.allSettled(
      Object.entries(rawProjectData).map(async ([filename, rawMarkdown]) => {
        const matterObject = matter(rawMarkdown);
        const { content } = matterObject;
        const untrustedData = matterObject.data;

        const validated = project.safeParse(untrustedData);
        let data: typeof validated.data | undefined;
        if (validated.success) {
          data = validated.data;
        } else {
          console.error(
            `project '${filename}' did not pass data validation: ${validated.error}`,
          );
          throw new Error(
            `project '${filename}' did not pass data validation: ${validated.error}`,
          );
        }

        if ("published" in data && data.published === false) {
          throw new Error("unpublished");
        }

        const projectName: string = basename(filename, ".md");

        let image: ProjectImage | undefined;
        if (data.image !== undefined) {
          const { alt, path } = data.image;
          const { width, height } = imageSizeFromFile(`static${path}`);
          if (width !== undefined && height !== undefined) {
            image = { alt, path, width, height };
          }
        }

        if (data.category === "hackathon") {
          content.concat("\nLike all hackathon projects, this was a collaborative effort created in a weekend.");
        }
        const description = marked.parse(content) as string;

        // Unfortunately extremely verbose. Would love to know the idiomatic
        // way to do this!
        type MyType = Pick<Project, "category" | "description" | "parenthetical" | "image" | "type">;
        const baseReturnValue: MyType = {
          category: data.category,
          description,
          parenthetical: data.parenthetical,
          image,
          type: data.type,
        };

        switch (data.type) {
          case "github": {
            const additionalData = await fetchGitHubMetadata(
              projectName,
              fetchFunc,
            );
            return {
              ...baseReturnValue,
              ...additionalData,
              date: data.date ?? additionalData.date,
            };
          }
          case "blog": {
            const raw = await import(
              `$lib/assets/markdown/blogs/${projectName}.md?raw`
            );
            const { data: blogData } = parseBlog(raw.default);
            return {
              ...baseReturnValue,
              date: data.date ?? new Date(blogData.date * 1000),
              languages: data.languages,
              name: data.name,
              url: `/blog/${projectName}`,
            };
          }
          case "nolink":
            return {
              ...baseReturnValue,
              date: data.date,
              languages: data.languages,
              name: data.name,
            };
        }
      }),
    )
  )
    .filter((outcome) => outcome.status === "fulfilled")
    .map((outcome) => outcome.value)
    .toSorted((a, b) => b.date.valueOf() - a.date.valueOf());
}
