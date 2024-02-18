import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { marked } from 'marked';

// I should be able to do this, but Vite said No, and I gave up after like 30 minutes
// import lorem from '/src/blog/lorem.md';

export const load: PageLoad = async (p) => {
  let retval = {'slug': p.params.slug};
  if (p.params.slug === 'lorem') {
    const text = await p.fetch('/src/blog/lorem.md')
      .then(res => res.text());
    retval.lorem = marked(text);
    return retval;
  }

  error(404, 'Not found');
};
