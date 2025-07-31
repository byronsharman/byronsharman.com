import type { GitHubAPIResponse, Experience, ExperienceImage } from "$lib/types";

import imageSizeFromFile from "image-size";
import matter from "gray-matter";
import * as marked from "marked";
import { basename, dirname } from "node:path";

import { ExperienceSchema } from "$lib/zod-schemas/experience";
import { parseBlog } from "./blogUtils";

const LANG_EXCLUDES = ["Dockerfile", "Makefile"];

/* return an Experience modified to include metadata fetched from the Github API */
async function fetchGitHubMetadata(
  repoName: string,
  fetchFunc: typeof fetch,
) {
  const res: Response = await fetchFunc(
    `https://api.github.com/repos/byronsharman/${repoName}`,
  );
  if (!res.ok) {
    throw new Error(
      `Fetch from GitHub API failed with code ${res.status}: ${res.statusText}`,
    );
  }
  const data: GitHubAPIResponse = await res.json();

  // get languages by querying the URL returned by the API
  let languages: string[] = [];
  const lang_res = await fetchFunc(data.languages_url);
  if (!res.ok) {
    throw new Error(
      `Fetch from GitHub API failed with code ${res.status}: ${res.statusText}. Skipping languages for experience ${data.name}.`,
    );
  } else {
    languages = Object.keys(await lang_res.json()).filter(
      (lang) => !LANG_EXCLUDES.includes(lang),
    );
  }

  return {
    name: data.name,
    date: new Date(data.updated_at),
    url: data.html_url,
    languages,
  };
}

export async function getExperience(fetchFunc: typeof fetch): Promise<Experience[]> {
  const rawData: Record<string, string> = import.meta.glob(
    "$lib/assets/markdown/experience/**/*.md",
    {
      query: "?raw",
      import: "default",
      // for some reason the returned object is empty unless eager is true
      eager: true,
    },
  );
  return (
    await Promise.allSettled(
      Object.entries(rawData).map(async ([filename, rawMarkdown]) => {
        const matterObject = matter(rawMarkdown);
        let { content } = matterObject;
        const untrustedData = matterObject.data;

        const validated = ExperienceSchema.safeParse(untrustedData);
        let data: typeof validated.data | undefined;
        if (validated.success) {
          data = validated.data;
        } else {
          console.error(
            `experience '${filename}' did not pass data validation: ${validated.error}`,
          );
          throw new Error(
            `experience '${filename}' did not pass data validation: ${validated.error}`,
          );
        }

        if ("published" in data && data.published === false) {
          throw new Error("unpublished");
        }

        const id: string = basename(filename, ".md");

        let image: ExperienceImage | undefined;
        if (data.image !== undefined) {
          const { alt, path } = data.image;
          const { width, height } = imageSizeFromFile(`static${path}`);
          if (width !== undefined && height !== undefined) {
            image = { alt, path, width, height };
          }
        }

        if (dirname(filename).endsWith("hackathons")) {
          content += "\nLike all hackathon projects, this was a collaborative effort created in a weekend.";
        }
        const description = marked.parse(content) as string;

        // Unfortunately extremely verbose. Would love to know the idiomatic
        // way to do this!
        type MyType = Pick<Experience, "description" | "parenthetical" | "image" | "type">;
        const baseReturnValue: MyType = {
          description,
          parenthetical: data.parenthetical,
          image,
          type: data.type,
        };

        switch (data.type) {
          case "github": {
            const additionalData = await fetchGitHubMetadata(
              id,
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
              `$lib/assets/markdown/blogs/${id}.md?raw`
            );
            const { data: blogData } = parseBlog(raw.default);
            return {
              ...baseReturnValue,
              date: data.date ?? new Date(blogData.date * 1000),
              languages: data.languages,
              name: data.name,
              url: `/blog/${id}`,
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
