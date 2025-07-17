import { PUBLIC_BASE_URL } from "$env/static/public";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

import hljs from "highlight.js/lib/common";
import imageSizeFromFile from "image-size";
import matter from "gray-matter";
import * as marked from "marked";
import type { Tokens } from "marked";

import { getBlogCardData } from "$lib/server/blogUtils";
import type { BlogCardData, BlogPreviewImage, RenderBlog } from "$lib/types";

// how many other blogs to put in the "Recent Posts" section
const RECENT_LIMIT = 4;

function configureMarked(slug: string): void {
  let first_image = true;

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
      } finally {
        code = `<pre><code class="language-${langString}">${code}</code></pre>\n`;
      }
      return code;
    },

    image({ href, title, text }: Tokens.Image): string {
      if (href === "") return text;
      const imgPath = `/blog/images/${slug}/${href}`;
      // TODO: figure out how to asynchronously determine image size
      // probably involves making walkTokens return custom tokens for images
      const { width, height } = imageSizeFromFile(`static${imgPath}`);
      let out = `<figure class="flex flex-col text-center"><img src=${imgPath} width="${width}" height="${height}" alt="${text}" class="mx-auto"${first_image ? "" : "loading=lazy"} />`;
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
  const raw = await import(`$lib/assets/markdown/blogs/${params.slug}.md?raw`);
  const { content, data } = matter(raw.default);
  // TODO: use a data validation library to verify data has the required properties
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
  if ("image" in data) {
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
    title,
  };
  return retval;
};
