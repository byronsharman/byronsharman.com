import type { PageLoad } from './$types';
import type { Blog, Project } from '$lib/types';
import { ProjectType } from '$lib/types';

const failPlaceholder: Project = {
  category: "error",
  bottomText: '',
  description: 'probably got rate limited by the GitHub API =/',
  languages: [],
  name: 'failed to load',
  type: ProjectType.NetworkError,
  url: '',
};

export const load: PageLoad = async (p) => {
  let retval: any = {};

  let projects = await p.fetch('/projects.json')
    .then((res: Response) => res.json())
    .then((obj: Object) => Object.entries(obj));

  // use information from projects.json to build metadata for ProjectCards
  retval.projects = await Promise.all(
    projects.map(async ([projectName, project]: [string, Project]) => {
      switch (project.type) {
        // ----- GitHub project -----
        case 'github':
          /* If this breaks during a time of high traffic, it may be related to rate limiting:
           * https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api
           */
          const res = await p.fetch(`https://api.github.com/repos/b-sharman/${projectName}`);
          if (!res.ok) {
            console.error('There was an error when fetching from the GitHub API');
            console.error('The response was:', res);
            return failPlaceholder;
          }
          const githubProject = await res.json();
          const lang_res = await p.fetch(githubProject.languages_url);
          if (!lang_res.ok) {
            console.error('There was an error when fetching from the GitHub API');
            console.error('The response was:', lang_res);
            return failPlaceholder;
          }
          project.languages = Object.keys(await lang_res.json());
          project.bottomText = 'see it on GitHub';
          project.description = githubProject.description;
          project.name = githubProject.name;
          project.url = githubProject.html_url;
          break;

        // ----- blog project -----
        case 'blog':
          project.bottomText = 'read the blog post';
          // TODO: don't hardcode the domain
          project.url = `https://b-sharman.dev/blog/${projectName}/`;
          break;

        // ----- project.type error handling -----
        default:
          console.error('Error when parsing projects: project type is invalid');
      }

      return project;
    })
  );

  // blog data
  retval.blogs  = await p.fetch('/blog/build/index.json')
    .then((res: Response) => res.json())
    .then((obj: Object) => Object.entries(obj)
      .map(
        ([key, value]: [string, any]) => {
          return {...value, slug: key};
        }
      ) as Blog[]
    );


  return retval;
};

