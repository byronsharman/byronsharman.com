import type { PageLoad } from './$types';
import type { Project } from '$lib/types';
import { getProjects } from '$lib/getProjects.server';

export const load: PageLoad = async (p) => {
  let retval: any = {};
  // TODO: We make an unnecessary query to the GitHub API here. getProjects should accept a flag for which it skips all projects with category github.
  retval.projects = await getProjects(p);
  retval.projects = retval.projects.filter(
    (project: Project) => { return project.category == "hackathon"; }
  );

  return retval;
};

