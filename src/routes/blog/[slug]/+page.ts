import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { marked } from 'marked';

import blogs from '/src/blog/index.json';

export const load: PageLoad = async (p) => {
  if (!Object.keys(blogs).includes(p.params.slug)) return error(404, 'Not found');

  let retval = blogs[p.params.slug];
  const text = await p.fetch(`/src/blog/${retval["slug"]}.md`)
    .then(res => res.text());
  retval.html = marked(text);

  return retval;
};
