import type { PageServerLoad } from './$types';
import type { Project } from '$lib/types';
import { getProjects } from '$lib/getProjects.server';

export const load: PageServerLoad = async ({ fetch }) => {
  let retval: any = {};
  // TODO: We make an unnecessary query to the GitHub API here. getProjects should accept a flag for which it skips all projects with category github.
  retval.projects = await getProjects(fetch);
  retval.projects = retval.projects.filter(
    (project: Project) => { return project.category == "hackathon"; }
  );

  return retval;
};

