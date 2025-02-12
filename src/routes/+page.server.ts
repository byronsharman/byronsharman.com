import type { PageServerLoad } from './$types';

import type { Blog, Project } from '$lib/types';
import { jsonToBlogArray, getBlogsAsJson } from '$lib/blogUtils.server';
import { getProjects } from '$lib/getProjects.server';

export const load: PageServerLoad = async ({ fetch }) => {
  let blogs: Blog[];

  // blog data
  try {
    const json = await getBlogsAsJson(fetch);
    blogs = jsonToBlogArray(json);
  } catch (e: unknown) {
    console.error(e);
    blogs = []
  }

  const projects = await getProjects(fetch);

  return {
    blogs: blogs,
    projects: projects,
  };
};

