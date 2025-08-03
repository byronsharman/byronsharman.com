import { PUBLIC_BASE_URL } from "$env/static/public";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

import hljs from "highlight.js/lib/common";
import * as marked from "marked";
import type { Tokens } from "marked";

import { getBlogCardData, parseBlog } from "$lib/server/blogUtils";
import type { BlogCardData, BlogPreviewImage, RenderBlog } from "$lib/types";

// how many other blogs to put in the "Recent Posts" section
const RECENT_LIMIT = 4;

// whether the blog should fetch syntax highlighting CSS
let requiresHighlight = false;

function configureMarked(slug: string): void {
  let first_image = true;
  // this is necessary because the top-level definition does not get updated on
  // page refreshes
  requiresHighlight = false;

  const renderer = {
    // these are modifications of the default renderer
    // https://github.com/markedjs/marked/blob/master/src/Renderer.ts

    blockquote({ tokens }: Tokens.Blockquote): string {
      return `<aside>${marked.parser(tokens)}</aside>`;
    },

    code({ text, lang }: Tokens.Code): string {
      const langString: string | undefined = (lang || "").match(/^\S*/)?.[0];

      let code = `${text.replace(/\n$/, "")}\n`;

      if (!langString) {
        code = `<pre><code>${code}</code></pre>\n`;
        return code;
      }

      try {
        code = hljs.highlight(code, { language: langString }).value;
        requiresHighlight = true;
      } finally {
        code = `<pre><code class="language-${langString}">${code}</code></pre>\n`;
      }
      return code;
    },

    image({ href, title, text }: Tokens.Image): string {
      if (href === "") return text;
      let srcset: string | undefined;
      const match = href.match(/(.*)\.(\w+)$/);
      if (match === null) {
        console.error(`couldn't parse extension from image path ${href}`);
        return text;
      }
      const baseName = match[1];
      const extension = match[2];
      (async () => {
        switch (extension) {
          // because Vite forces dynamic imports to have extensions, we must
          // copy and paste this code for every extension we wish to support
          case "avif":
            return await import(
              `$lib/assets/blog/images/${slug}/${baseName}.avif?w=480;700;1920&format=avif?withoutEnlargement`
            );
          case "jpg":
            return await import(
              `$lib/assets/blog/images/${slug}/${baseName}.jpg?w=480;700;1920&format=avif?withoutEnlargement`
            );
          case "png":
            return await import(
              `$lib/assets/blog/images/${slug}/${baseName}.png?w=480;700;1920&format=avif?withoutEnlargement`
            );
          case "webp":
            return await import(
              `$lib/assets/blog/images/${slug}/${baseName}.webp?w=480;700;1920&format=avif?withoutEnlargement`
            );
          default:
            throw new Error(`unsupported extension ${extension}`);
        }
      })().then(({ default: path }: { default: string[] }) => {
          // size of responsive images in pixels
          // unfortunately we cannot specify these dynamically in the import URLs
          // because this breaks vite-imagetools
          const SIZES = [480, 700, 1920];

          srcset = path.map((url, index) => `${url} ${SIZES[index]}w`).join(", ");
        });

      let out = `\
<figure class="flex flex-col text-center">\
<img
  srcset=${srcset}
  alt="${text}"
  class="mx-auto"
  loading="${first_image ? "eager" : "lazy"}"
/>`;
      if (title) {
        out += `<figcaption>${marked.parseInline(title)}</figcaption>`;
      }
      out += "</figure>";
      first_image = false;
      return out;
    },
  };

  marked.use({ renderer });
}

export const load: PageServerLoad = async ({ params }): Promise<RenderBlog> => {
  let raw: { default: string };
  try {
    raw = await import(`$lib/assets/markdown/blogs/${params.slug}.md?raw`);
  } catch {
    return error(404, "Not found");
  }
  const { content, data } = parseBlog(raw.default);
  if (!data.published) return error(404, "Not found");

  const absoluteUrl = `${PUBLIC_BASE_URL}/blog/${params.slug}`;

  // Why do we query blogs.json twice, once in blogUtils and once here? The
  // motive is to do as much of the data processing as possible server-side (in
  // .server.ts files). This means that blogUtils, which is only used to
  // populate blog cards, removes data in blogs.json only needed to make a
  // RenderBlog. To get that data again, we have to load blogs.json again.
  // Loading it twice isn't an issue because this is all (theoretically) done
  // at compile time.

  configureMarked(params.slug);

  let previewImage: BlogPreviewImage | undefined;
  if (data.image !== undefined) {
    const imgPathWithoutExt = `${PUBLIC_BASE_URL}/blog/images/${params.slug}/${data.image.name}.`;
    previewImage = {
      alt: data.image.alt,
      ogUrl: imgPathWithoutExt + data.image.ogExt,
      absolutePath: imgPathWithoutExt + data.image.optimizedExt,
    };
  }

  const html = await marked.parse(content);

  const ldjson = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: data.title,
    ...(previewImage && { image: previewImage.absolutePath }),
    datePublished: new Date(data.date * 1000).toISOString(),
    author: [
      {
        "@type": "Person",
        name: "Byron Sharman",
        url: PUBLIC_BASE_URL,
      },
    ],
  });

  const recentBlogs: BlogCardData[] = getBlogCardData()
    .filter((blog) => blog.slug !== params.slug) // don't show this blog in the recent blogs
    .slice(0, RECENT_LIMIT);

  const { date, description, title } = data;

  const retval: RenderBlog = {
    absoluteUrl,
    date,
    html,
    ldjson,
    description,
    previewImage,
    recentBlogs,
    requiresHighlight,
    title,
  };
  return retval;
};
