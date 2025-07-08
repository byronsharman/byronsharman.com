import type { GitHubAPIResponse, Project } from "$lib/types";
import { ProjectType } from "$lib/types";

import imageSizeFromFile from "image-size";
import { marked } from "marked";

const LANG_EXCLUDES = ["Dockerfile", "Makefile"];

async function getDescription(
  projectName: string,
  fetchFunc: typeof fetch,
): Promise<string> {
  const res: Response = await fetchFunc(
    `/projects/descriptions/${projectName}.md`,
  );
  if (!res.ok) {
    return "<p>(no description provided)</p>";
  }
  return marked(await res.text());
}

/* return a Project modified to include metadata fetched from the Github API */
async function createGithubProject(
  projectName: string,
  project: Project,
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
    description: await getDescription(projectName, fetchFunc),
  };
}

/* return a Project initialized from JSON in project.json */
async function createBlogProject(
  projectName: string,
  project: Project,
  fetchFunc: typeof fetch,
): Promise<Project> {
  return {
    ...project,
    url: `/blog/${projectName}`,
    bottomText: "read the blog post",
    // grab description from associated markdown file
    description: await getDescription(projectName, fetchFunc),
  };
}

export async function getProjects(fetchFunc: typeof fetch): Promise<Project[]> {
  const projects: Project[] = [];

  const res: Response = await fetchFunc("/projects/projects.json");
  if (!res.ok) {
    console.error("Failed to fetch from projects.json");
    return projects;
  }

  return Promise.all(
    (Object.entries(await res.json()) as [string, Project][])
      .map(async ([projectName, project]) => {
        if (project.image !== undefined) {
          const { width, height } = await imageSizeFromFile(
            `static/${project.image.path}`,
          );
          // TODO: ProjectImage.{ width, height } should probably have type number | undefined
          if (width !== undefined && height !== undefined) {
            project.image.width = width;
            project.image.height = height;
          }
        }
        switch (project.type) {
          case ProjectType.GitHub:
            return await createGithubProject(projectName, project, fetchFunc);
          case ProjectType.Blog:
            return await createBlogProject(projectName, project, fetchFunc);
          default:
            console.error(
              `Error when parsing projects: unrecognized project type ${project.type}`,
            );
            return null;
        }
      })
      .filter((projectPromise) => projectPromise !== null),
  );
}
