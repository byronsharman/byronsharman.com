import type { PageServerLoad } from './$types';

import type { Blog } from '$lib/types';
import { getBlogsAsJson } from '$lib/blogUtils.server';
import { getProjects } from '$lib/getProjects.server';

export const load: PageServerLoad = async ({ fetch }) => {
  let blogs: { [slug: string]: Blog };

  // blog data
  try {
    blogs = await getBlogsAsJson(fetch);
  } catch (e: unknown) {
    blogs = {};
    console.error(e);
  }

  const projects = await getProjects(fetch);

  return {
    blogs: blogs,
    projects: projects,
  };
};

