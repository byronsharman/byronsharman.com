import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { marked } from 'marked';
import hljs from 'highlight.js/lib/common';

import { blogJsonToObject, getBlogsAsJson } from '$lib/blogUtils.server';

export const load: PageServerLoad = async ({ fetch, params }) => {
  const blogs = await getBlogsAsJson(fetch);

  // return 404 if the data has no slug
  if (!Object.keys(blogs).includes(params.slug)) return error(404, 'Not found');

  // grab the data provided by the json file using the slug provided by svelte
  let retval = blogs[params.slug];

  const renderer = {
    // these are modifications of the default renderer
    // https://github.com/markedjs/marked/blob/master/src/Renderer.ts

    code(text: string, lang: string): string {
      const langString: string | undefined = (lang || '').match(/^\S*/)?.[0];

      let code: string = text.replace(/\n$/, '') + '\n';

      if (!langString) {
        code = `<pre><code>${code}</code></pre>\n`;
        return code;
      }

      try {
        code = hljs.highlight(code, {language: langString}).value;
      } finally {
        code = `<pre><code class="language-${langString}">${code}</code></pre>\n`;
        return code;
      }
    },

    image(href: string, title: string | null, text: string): string {
      if (href === "") return text;
      let out = `<figure class="flex flex-col text-center"><img src="/blog/images/${params.slug}/${href}" alt="${text}" class="mx-auto" />`;
      if (title) {
        out += `<figcaption>${marked(title)}</figcaption>`;
      }
      out += '</figure>';
      return out;
    }
  }
  marked.use({ renderer });

  const text = await fetch(`/blog/build/${params.slug}.md`)
    .then((res: Response) => res.text())
    .catch((err: Error) => console.error(err));
  retval.html = marked(text);

  retval.url = `${import.meta.env.VITE_URL}/blog/${params.slug}/`;
  if (retval.previewImage !== undefined) {
    retval.previewImageUrl = `${import.meta.env.VITE_URL}/blog/images/${params.slug}/${retval.previewImage}.${retval.previewImageExt}`;
    retval.openGraphImageUrl = `${import.meta.env.VITE_URL}/blog/images/${params.slug}/${retval.previewImage}.${retval.openGraphImageExt}`;
  }

  retval.ldjson = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": retval.title,
    "image": retval.previewImage ? retval.previewImageUrl : undefined,
    "datePublished": new Date(retval.date * 1000).toISOString(),
    "author": [{
      "@type": "Person",
      "name": "Byron Sharman",
      "url": "https://b-sharman.dev"
    }]
  });

  retval.blogs = blogJsonToObject(blogs, params.slug, true);
  return retval;
};
