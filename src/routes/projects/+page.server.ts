import type { PageServerLoad } from "./$types";

import { getProjects } from "$lib/getProjects.server";
import type { Project } from "$lib/types";

export const load: PageServerLoad = async ({ fetch }) => {
  let projects: Project[] = [];
  try {
    projects = await getProjects(fetch);
  } catch (e: unknown) {
    console.error(e);
  }
  return { projects };
};
