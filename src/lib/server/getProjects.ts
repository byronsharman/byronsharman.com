import type { GitHubAPIResponse, Project, ProjectCategory } from "$lib/types";
import { ProjectType } from "$lib/types";

import imageSizeFromFile from "image-size";
import { marked } from "marked";

import projectsJson from "$lib/assets/json/projects.json";

const LANG_EXCLUDES = ["Dockerfile", "Makefile"];

async function getDescription(projectName: string): Promise<string> {
  const content = await import(
    `$lib/assets/markdown/projects/${projectName}.md?raw`
  );
  return marked(content.default);
}

/* return a Project modified to include metadata fetched from the Github API */
async function createGithubProject(
  projectName: string,
  project: (typeof projectsJson)[keyof typeof projectsJson],
  fetchFunc: typeof fetch,
): Promise<Project> {
  const errorPlaceholder: Project = {
    bottomText: "",
    category: "error",
    description: "Error loading project information",
    languages: [],
    name: projectName,
    type: ProjectType.NetworkError,
    url: "",
  };

  const res: Response = await fetchFunc(
    `https://api.github.com/repos/byronsharman/${projectName}`,
  );
  if (!res.ok) {
    console.error(
      `Fetch from GitHub API failed with code ${res.status}: ${res.statusText}`,
    );
    return errorPlaceholder;
  }
  const githubProject: GitHubAPIResponse = await res.json();

  // get project languages by querying the URL returned by the API
  let languages: string[] = [];
  const lang_res = await fetchFunc(githubProject.languages_url);
  if (!res.ok) {
    console.error(`\
Fetch from GitHub API failed with code ${res.status}: ${res.statusText}.
Skipping languages for project ${githubProject.name}.`);
  } else {
    languages = Object.keys(await lang_res.json()).filter(
      (lang) => !LANG_EXCLUDES.includes(lang),
    );
  }

  return {
    ...errorPlaceholder,
    ...project,
    name: githubProject.name,
    url: githubProject.html_url,
    languages,
    bottomText: "see it on GitHub",
    // grab description from associated markdown file
    description: await getDescription(projectName),

    /* TODO: use a data validation library or write narrowing functions or just
     * convert the json files to TypeScript object literals instead of this
     * error-prone workaround */
    category: project.category as ProjectCategory,
    type: project.type as ProjectType,
  };
}

/* return a Project initialized from JSON in project.json */
async function createBlogProject(
  projectName: string,
  project: Project,
): Promise<Project> {
  return {
    ...project,
    url: `/blog/${projectName}`,
    bottomText: "read the blog post",
    // grab description from associated markdown file
    description: await getDescription(projectName),
  };
}

export async function getProjects(fetchFunc: typeof fetch): Promise<Project[]> {
  return (
    await Promise.allSettled(
      Object.entries(projectsJson).map(async ([projectName, project]) => {
        // TODO: same as above TODO ^
        const retVal: any = project;
        if ("image" in project) {
          const { width, height } = await imageSizeFromFile(
            `static/${project.image.path}`,
          );
          if (width !== undefined && height !== undefined) {
            retVal.image.width = width;
            retVal.image.height = height;
          }
        }
        switch (project.type) {
          case ProjectType.GitHub:
            return await createGithubProject(projectName, retVal, fetchFunc);
          case ProjectType.Blog:
            return await createBlogProject(projectName, retVal);
          default:
            throw new Error(
              `Error when parsing projects: unrecognized project type ${project.type}`,
            );
        }
      }),
    )
  )
    .filter((outcome) => outcome.status === "fulfilled")
    .map((outcome) => outcome.value);
}
