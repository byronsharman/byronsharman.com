import type {
  BlogInJson,
  GitHubAPIResponse,
  Project,
  ProjectCategory,
  ProjectImage,
} from "$lib/types";
import { PROJECT_CATEGORIES, ProjectType } from "$lib/types";

import imageSizeFromFile from "image-size";
import matter from "gray-matter";
import * as marked from "marked";
import { basename } from "node:path";

import blogsJson from "$lib/assets/json/blogs.json";

const LANG_EXCLUDES = ["Dockerfile", "Makefile"];

function validateCategory(category: string): category is ProjectCategory {
  return (PROJECT_CATEGORIES as readonly string[]).includes(category);
}

function validateProjectType(projectType: string): projectType is ProjectType {
  return (Object.values(ProjectType) as readonly string[]).includes(
    projectType,
  );
}

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
  const rawProjectData = import.meta.glob(
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
        const projectName: string = basename(filename, ".md");
        let { content, data } = matter(rawMarkdown);

        let image: ProjectImage | undefined;
        if ("image" in data) {
          const { alt, path } = data.image;
          // TODO: update image-size and use new API
          const { width, height } = await imageSizeFromFile(`static${path}`);
          if (width !== undefined && height !== undefined) {
            image = { alt, path, width, height };
          }
        }

        let { languages, name } = data;
        let date: Date | undefined;

        const category: ProjectCategory = validateCategory(data.category) ? data.category : "error";
        if (category === "hackathon") {
          content += `\nLike all hackathon projects, ${name} was a collaborative effort created in a weekend.`;
        }

        const projectType: ProjectType = validateProjectType(data.type)
          ? data.type
          : ProjectType.Error;
        let url: string | undefined;
        switch (projectType) {
          case ProjectType.GitHub:
            ({ date, languages, name, url } = await fetchGitHubMetadata(
              projectName,
              fetchFunc,
            ));
            break;
          case ProjectType.Blog:
            date = new Date(
              (blogsJson as Record<string, BlogInJson>)[projectName].date *
                1000,
            );
            url = `/blog/${projectName}`;
            break;
        }

        return {
          category,
          date,
          description: marked.parse(content),
          ...(data.hackathonName && { hackathonName: data.hackathonName }),
          ...(image && { image }),
          languages,
          name,
          type: projectType,
          url,
        };
      }),
    )
  )
    .filter((outcome) => outcome.status === "fulfilled")
    .map((outcome) => outcome.value)
    .toSorted((a, b) => b.date.valueOf() - a.date.valueOf());
}
