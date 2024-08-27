import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { marked } from 'marked';

export const load: PageLoad = async (p) => {
  const blogs = await p.fetch('/blog/build/index.json')
    .then(res => res.json());

  // return 404 if the data has no slug
  if (!Object.keys(blogs).includes(p.params.slug)) return error(404, 'Not found');

  // grab the data provided by the json file using the slug provided by svelte
  let retval = blogs[p.params.slug];

  const renderer = {
    // this is just the default renderer
    // https://github.com/markedjs/marked/blob/master/src/Renderer.ts#L135-L148
    // but modified to wrap everything in a <figure> and use titles as captions
    image(href: string, title: string | null, text: string): string {
      if (href === "") return text;
      let out = `<figure class="flex flex-col text-center"><img src="/blog/images/${p.params.slug}/${href}" alt="${text}" class="mx-auto" />`;
      if (title) {
        out += `<figcaption>${marked(title)}</figcaption>`;
      }
      out += '</figure>';
      return out;
    }
  }
  marked.use({ renderer });

  const text = await p.fetch(`/blog/build/${p.params.slug}.md`)
    .then(res => res.text());
  retval.html = marked(text);

  // TODO: use environment variables or something other than hardcoding the domain
  retval.url = `https://b-sharman.dev/blog/${p.params.slug}/`;
  retval.previewImageUrl = `https://b-sharman.dev/blog/images/${p.params.slug}/${retval.previewImage}.${retval.previewImageExt}`;
  retval.openGraphImageUrl = `https://b-sharman.dev/blog/images/${p.params.slug}/${retval.previewImage}.${retval.openGraphImageExt}`;

  return retval;
};
