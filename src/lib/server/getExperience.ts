import type { GitHubAPIResponse, Experience } from "$lib/types";

import matter from "gray-matter";
import * as marked from "marked";
import { basename, dirname } from "node:path";

import { ExperienceSchema } from "$lib/zod-schemas/experience";
import { parseBlog } from "./blogUtils";

const LANG_EXCLUDES = ["Dockerfile", "Makefile"];

async function gitHubFetchErrorMessage(
  res: Response,
  repoName: string,
  requestType: string,
) {
  const body = await res.text();
  const bodySummary = body.length > 0 ? ` Response body: ${body}` : "";
  return `GitHub API ${requestType} request for '${repoName}' failed with ${res.status} ${res.statusText}.${bodySummary}`;
}

/* return an Experience modified to include metadata fetched from the Github API */
async function fetchGitHubMetadata(repoName: string, fetchFunc: typeof fetch) {
  const res: Response = await fetchFunc(
    `https://api.github.com/repos/byronsharman/${repoName}`,
  );
  if (!res.ok) {
    throw new Error(await gitHubFetchErrorMessage(res, repoName, "repo"));
  }
  const data: GitHubAPIResponse = await res.json();

  // get languages by querying the URL returned by the API
  let languages: string[] = [];
  const lang_res = await fetchFunc(data.languages_url);
  if (!lang_res.ok) {
    throw new Error(
      await gitHubFetchErrorMessage(lang_res, repoName, "languages"),
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

export async function getExperience(
  fetchFunc: typeof fetch,
): Promise<Experience[]> {
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
    await Promise.all(
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
          return undefined;
        }

        const id: string = basename(filename, ".md");

        if (dirname(filename).endsWith("hackathons")) {
          content +=
            "\n\nLike all hackathon projects, this was a collaborative effort created in a weekend.";
        }
        const description = marked.parse(content) as string;

        // Unfortunately extremely verbose. Would love to know the idiomatic
        // way to do this!
        type MyType = Pick<
          Experience,
          "description" | "parenthetical" | "startDate" | "type" | "ongoing"
        >;
        const baseReturnValue: MyType = {
          description,
          parenthetical: data.parenthetical,
          type: data.type,
          startDate: data.startDate,
          ongoing: !!data.ongoing,
        };

        switch (data.type) {
          case "github": {
            const additionalData = await fetchGitHubMetadata(id, fetchFunc);
            return {
              ...baseReturnValue,
              ...additionalData,
              date: data.date ?? additionalData.date,
            };
          }
          case "blog": {
            const raw = await import(`$lib/assets/markdown/blogs/${id}.md?raw`);
            const { data: blogData } = parseBlog(raw.default);
            return {
              ...baseReturnValue,
              date: data.date ?? new Date(blogData.date * 1000),
              languages: data.languages,
              name: data.name,
              url: `/blog/${id}`,
            };
          }
          case "employment":
            return {
              ...baseReturnValue,
              date: data.date,
              languages: data.languages,
              name: data.name,
              startDate: data.startDate,
              url: data.url,
            };
        }
      }),
    )
  )
    .filter((experience) => experience !== undefined)
    .toSorted((a, b) => b.date.valueOf() - a.date.valueOf());
}
