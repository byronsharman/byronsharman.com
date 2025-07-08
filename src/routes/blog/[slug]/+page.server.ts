import { PUBLIC_BASE_URL } from "$env/static/public";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

import hljs from "highlight.js/lib/common";
import imageSizeFromFile from "image-size";
import { marked } from "marked";
import type { Tokens } from "marked";

import { checkImageProperties, getBlogCardData } from "$lib/server/blogUtils";
import type {
  BlogCardData,
  BlogInJson,
  BlogPreviewImage,
  RenderBlog,
} from "$lib/types";

// how many other blogs to put in the "Recent Posts" section
const RECENT_LIMIT = 4;

export const load: PageServerLoad = async ({
  fetch,
  params,
}): Promise<RenderBlog> => {
  let first_image = true;

  const renderer = {
    // these are modifications of the default renderer
    // https://github.com/markedjs/marked/blob/master/src/Renderer.ts

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
      const imgPath = `/blog/images/${params.slug}/${href}`;
      const { width, height } = imageSizeFromFile(`static${imgPath}`);
      let out = `<figure class="flex flex-col text-center"><img src=${imgPath} width="${width}" height="${height}" alt="${text}" class="mx-auto"${first_image ? "" : "loading=lazy"} />`;
      if (title) {
        out += `<figcaption>${marked(title)}</figcaption>`;
      }
      out += "</figure>";
      first_image = false;
      return out;
    },
  };
  marked.use({ renderer });

  // Why do we query index.json twice, once in blogUtils and once here? The
  // motive is to do as much of the data processing as possible server-side (in
  // .server.ts files). This means that blogUtils, which is only used to
  // populate blog cards, removes data in index.json only needed to make a
  // RenderBlog. To get that data again, we have to load index.json again.
  // Loading it twice isn't an issue because this is all (theoretically) done
  // at compile time.

  const res = await fetch("/blog/index.json");
  if (!res.ok) throw Error("could not fetch /blog/index.json");

  const builder = ((await res.json()) as { [slug: string]: BlogInJson })[
    params.slug
  ];
  if (builder === undefined || !builder.published)
    return error(404, "Not found");

  let previewImage: BlogPreviewImage | undefined = undefined;
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
    const res = await fetch(`/blog/build/${params.slug}.md`);
    if (!res.ok)
      throw Error(`failed to fetch from /blog/build/${params.slug}.md`);
    const text = await res.text();
    html = await marked(text);
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

  const recentBlogs: BlogCardData[] = (await getBlogCardData(fetch))
    .filter((blog) => blog.slug !== params.slug) // don't show this blog in the recent blogs
    .slice(0, RECENT_LIMIT);

  const retval: RenderBlog = {
    date: builder.date,
    preview: builder.preview,
    title: builder.title,
    customHeaderMD: builder.customHeaderMD,

    // TODO: some duplication here with blogUtils, what to do about that?
    absoluteUrl: `${PUBLIC_BASE_URL}/blog/${params.slug}`,
    html: html,
    ldjson: ldjson,
    previewImage: previewImage,
    recentBlogs: recentBlogs,
  };
  return retval;
};
