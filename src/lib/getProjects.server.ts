import type { Project } from '$lib/types';
import { ProjectType } from '$lib/types';

import { marked } from 'marked';

async function getDescription(projectName: string, fetchFunc: typeof fetch): Promise<string> {
  const res: Response = await fetchFunc(`/projects/descriptions/${projectName}.md`);
  if (!res.ok) {
    return '<p>(no description provided)</p>';
  }
  return marked(await res.text());
}

/* return a Project modified to include metadata fetched from the Github API */
async function createGithubProject(
  projectName: string,
  project: Project,
  fetchFunc: typeof fetch
): Promise<Project> {
  try {
    const res: Response = await fetchFunc(`https://api.github.com/repos/b-sharman/${projectName}`);
    const githubProject = await res.json() as {
      description: string;
      html_url: string;
      languages_url: string;
      name: string;
    };

    // set project.languages by querying the URL returned by the API
    const lang_res: Response = await fetchFunc(githubProject.languages_url);
    project.languages = Object.keys(await lang_res.json());

    project.bottomText = 'see it on GitHub';
    project.description = githubProject.description;
    project.name = githubProject.name;
    project.url = githubProject.html_url;
  } catch {
    // https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api
    project.bottomText = '';
    project.category = 'error';
    project.description = 'probably got rate limited by the GitHub API =/';
    project.languages = [];
    project.name = projectName;
    project.type = ProjectType.NetworkError;
    project.url = '';
  }

  // grab description from associated markdown file
  project.description = await getDescription(projectName, fetchFunc);

  return project;
}

/* doesn't need to be async, but that makes it consistent with createGithubProject */
async function createBlogProject(
  projectName: string,
  project: Project,
  fetchFunc: typeof fetch
): Promise<Project> {
  project.bottomText = 'read the blog post';
  project.url = `/blog/${projectName}`;

  // grab description from associated markdown file
  project.description = await getDescription(projectName, fetchFunc);

  return project;
}

export async function getProjects(fetchFunc: typeof fetch): Promise<Project[]> {
  let projects: Project[] = [];

  const res: Response = await fetchFunc('/projects/projects.json');
  if (!res.ok) {
    console.error('Failed to fetch from projects.json');
    return projects;
  }

  const obj: object = await res.json();

  for (let [projectName, project] of Object.entries(obj) as [string, Project][]) {
    switch (project.type) {
      case 'github':
        projects.push(await createGithubProject(projectName, project, fetchFunc));
        break;

      case 'blog':
        projects.push(await createBlogProject(projectName, project, fetchFunc));
        break;

      default:
        console.error('Error when parsing projects: project type is invalid');
    }
  }

  return projects;
}
