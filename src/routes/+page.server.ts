import type { PageServerLoad } from './$types';

import { blogJsonToObject, getBlogsAsJson } from '$lib/blogUtils.server';
import { getProjects } from '$lib/getProjects.server';

export const load: PageServerLoad = async ({ fetch }) => {
  let retval: any = {};

  // blog data
  retval.blogs = await getBlogsAsJson(fetch)
    .then((obj: object) => blogJsonToObject(obj))
    .catch((err: Error) => console.error(err));

  retval.projects = await getProjects(fetch);

  return retval;
};

