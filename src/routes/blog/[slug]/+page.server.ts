import { PUBLIC_BASE_URL } from "$env/static/public";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

import hljs from "highlight.js/lib/common";
import imageSizeFromFile from "image-size";
import * as marked from "marked";
import type { Tokens } from "marked";

import { checkImageProperties, getBlogCardData } from "$lib/server/blogUtils";
import type {
  BlogCardData,
  BlogInJson,
  BlogPreviewImage,
  RenderBlog,
} from "$lib/types";

import blogsJson from "$lib/assets/json/blogs.json";

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
  // TODO: some duplication here with blogUtils, what to do about that?
  const absoluteUrl = `${PUBLIC_BASE_URL}/blog/${params.slug}`;

  // Why do we query blogs.json twice, once in blogUtils and once here? The
  // motive is to do as much of the data processing as possible server-side (in
  // .server.ts files). This means that blogUtils, which is only used to
  // populate blog cards, removes data in blogs.json only needed to make a
  // RenderBlog. To get that data again, we have to load blogs.json again.
  // Loading it twice isn't an issue because this is all (theoretically) done
  // at compile time.

  configureMarked(params.slug);

  const builder = (blogsJson as Record<string, BlogInJson>)[params.slug];
  if (builder === undefined || !builder.published)
    return error(404, "Not found");

  let previewImage: BlogPreviewImage | undefined;
  if (checkImageProperties(params.slug, builder)) {
    const imgPathWithoutExt = `${PUBLIC_BASE_URL}/blog/images/${params.slug}/${builder.previewImage}.`;
    previewImage = {
      alt: builder.previewImageAlt,
      openGraphImageUrl: imgPathWithoutExt + builder.openGraphImageExt,
      absolutePath: imgPathWithoutExt + builder.previewImageExt,
    };
  }

  // TODO: more graceful error handling here
  let html = "";
  try {
    const content = await import(
      `$lib/assets/markdown/blogs/${params.slug}.md?raw`
    );
    html = await marked.parse(content.default);
  } catch (e: unknown) {
    console.error(e);
    throw e;
  }

  const ldjson = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: builder.title,
    image: previewImage === undefined ? undefined : previewImage.absolutePath,
    datePublished: new Date(builder.date * 1000).toISOString(),
    author: [
      {
        "@type": "Person",
        name: "Byron Sharman",
        url: PUBLIC_BASE_URL,
      },
    ],
  });

  const recentBlogs: BlogCardData[] = (await getBlogCardData())
    .filter((blog) => blog.slug !== params.slug) // don't show this blog in the recent blogs
    .slice(0, RECENT_LIMIT);

  const { date, preview, title, customHeaderMD } = builder;

  const retval: RenderBlog = {
    absoluteUrl,
    customHeaderMD,
    date,
    html,
    ldjson,
    preview,
    previewImage,
    recentBlogs,
    title,
  };
  return retval;
};
