import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { marked } from 'marked';
import hljs from 'highlight.js/lib/common';

import type { RenderBlog } from '$lib/types';
import { jsonToBlogArray, getBlogsAsJson } from '$lib/blogUtils.server';

// how many other blogs to put in the "Recent Posts" section
const RECENT_LIMIT = 4;

export const load: PageServerLoad = async ({ fetch, params }): Promise<RenderBlog> => {
  const blogsJson = await getBlogsAsJson(fetch);

  // grab the data provided by the json file using the slug provided by svelte
  let builder = blogsJson[params.slug];
  // return 404 if the data has no slug
  if (builder === undefined) return error(404, 'Not found');

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

  let html;
  try {
    const res = await fetch(`/blog/build/${params.slug}.md`);
    if (!res.ok) throw Error(`failed to fetch from /blog/build/${params.slug}.md`);
    const text = await res.text();
    html = await marked(text);
  } catch (e: unknown) {
    console.error(e);
    throw e;
  }

  let previewImageUrl;
  let openGraphImageUrl;
  const url = `${import.meta.env.VITE_URL}/blog/${params.slug}/`;
  if (builder.previewImage !== undefined) {
    previewImageUrl = `${import.meta.env.VITE_URL}/blog/images/${params.slug}/${builder.previewImage}.${builder.previewImageExt}`;
    openGraphImageUrl = `${import.meta.env.VITE_URL}/blog/images/${params.slug}/${builder.previewImage}.${builder.openGraphImageExt}`;
  }

  const ldjson = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": builder.title,
    "image": builder.previewImage ? previewImageUrl : undefined,
    "datePublished": new Date(builder.date * 1000).toISOString(),
    "author": [{
      "@type": "Person",
      "name": "Byron Sharman",
      "url": "https://b-sharman.dev"
    }]
  });

  const recentBlogs = jsonToBlogArray(blogsJson, RECENT_LIMIT, params.slug);

  const retval: RenderBlog = {
    ...builder,
    recentBlogs: recentBlogs,
    html: html,
    ldjson: ldjson,
    openGraphImageUrl: openGraphImageUrl,
    previewImageUrl: previewImageUrl,
    url: url,
  };
  return retval;
};
