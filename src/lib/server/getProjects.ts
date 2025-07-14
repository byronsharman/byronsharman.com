import type {
  GitHubAPIResponse,
  Project,
  ProjectCategory,
  ProjectImage,
} from "$lib/types";
import { PROJECT_CATEGORIES, ProjectType } from "$lib/types";

import imageSizeFromFile from "image-size";
import matter from "gray-matter";
import { marked } from "marked";
import { basename } from "node:path";

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
        const projectName = basename(filename, ".md");
        const { content, data } = matter(rawMarkdown);

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
        const projectType: ProjectType = validateProjectType(data.type)
          ? data.type
          : ProjectType.Error;
        let url: string | undefined;
        switch (projectType) {
          case ProjectType.GitHub:
            ({ languages, name, url } = await fetchGitHubMetadata(
              projectName,
              fetchFunc,
            ));
            break;
          case ProjectType.Blog:
            url = `/blog/${projectName}`;
            break;
        }
        return {
          category: validateCategory(data.category) ? data.category : "error",
          description: marked(content),
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
    .map((outcome) => outcome.value);
}
