import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { marked } from 'marked';

const renderer = {
  // this is just the defualt renderer
  // https://github.com/markedjs/marked/blob/master/src/Renderer.ts#L135-L148
  // but modified to wrap everything in a <figure> and use titles as captions
  image(href: string, title: string | null, text: string): string {
    if (href === "") return text;
    let out = `<figure class="flex flex-col text-center"><img src="${href}" alt="${text}" class="mx-auto" />`;
    if (title) {
      out += `<figcaption>${title}</figcaption>`;
    }
    out += '</figure>';
    return out;
  }
}
marked.use({ renderer });

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
