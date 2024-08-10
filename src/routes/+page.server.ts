import type { PageLoad } from './$types';
import type { Blog } from '$lib/types';

import { getProjects } from '$lib/getProjects.server';

export const load: PageLoad = async (p) => {
  let retval: any = {};

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

  retval.projects = await getProjects(p);

  return retval;
};

