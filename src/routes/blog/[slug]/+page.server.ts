import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { marked } from 'marked';

export const load: PageLoad = async (p) => {
  const blogs = await p.fetch('/blog/index.json')
    .then(res => res.json());
  if (!Object.keys(blogs).includes(p.params.slug)) return error(404, 'Not found');

  let retval = blogs[p.params.slug];
  const text = await p.fetch(`/blog/${retval["slug"]}.md`)
    .then(res => res.text());
  retval.html = marked(text);

  return retval;
};
