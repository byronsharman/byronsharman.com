import { PUBLIC_BASE_URL } from "$env/static/public";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

import hljs from "highlight.js/lib/common";
import * as marked from "marked";
import type { Tokens } from "marked";

import { getBlogCardData, parseBlog } from "$lib/server/blogUtils";
import type { BlogCardData, Image, RenderBlog } from "$lib/types";
import type { Picture } from "vite-imagetools";

// how many other blogs to put in the "Recent Posts" section
const RECENT_LIMIT = 4;

// whether the blog should fetch syntax highlighting CSS
let requiresHighlight = false;

function parseExtension(
  path: string,
): { baseName: string; extension: string } | null {
  const match = path.match(/(.*)\.(\w+)$/);
  if (match === null) {
    console.error(`couldn't parse extension from image path ${path}`);
    return null;
  }
  return {
    baseName: match[1],
    extension: match[2],
  };
}

function configureMarked(slug: string) {
  let first_image = true;
  // TODO: this can probably be removed now that there is one marked instance per page
  // this is necessary because the top-level definition does not get updated on
  // page refreshes
  requiresHighlight = false;

  const imgData: Record<
    string,
    ({ type: "picture" } & Picture) | { type: "img"; src: string }
  > = {};

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
      if (!(href in imgData)) return text;
      const data = imgData[href];

      const loading = `loading="${first_image ? "eager" : "lazy"}"`;
      let img: string | undefined;
      switch (data.type) {
        case "img":
          img = `<img src="${data.src}" alt="${text}" ${loading} />`;
          break;
        case "picture":
          img = Object.entries(data.sources)
            .map(
              ([format, srcset]) => `\
<source
  srcset="${srcset}"
  type="image/${format}"
  sizes="(max-width: 700px) 100vw, min(700px, ${data.img.w}px)"
/>`,
            )
            .reduce((acc, current) => acc + current, "<picture>")
            .concat(`\
<img
  src=${data.img.src}
  alt="${text}"
  width="${data.img.w}"
  height="${data.img.h}"
  ${loading}
/></picture>`);
          break;
      }

      let out = `<figure class="text-center">${img}`;
      if (title) {
        out += `<figcaption>${title}</figcaption>`;
      }
      out += "</figure>";
      first_image = false;
      return out;
    },
  };

  const walkTokens = async (token: marked.Token) => {
    if (token.type === "image") {
      // parse markdown in image captions
      if (token.title !== null) {
        token.title = await marked.parseInline(token.title);
      }

      let picture: { default: Picture } | undefined;
      const parseResult = parseExtension(token.href);
      if (parseResult === null) return;
      const { baseName, extension } = parseResult;
      switch (extension) {
        // because Vite forces dynamic imports to have extensions, we must
        // copy and paste this code for every extension we wish to support
        case "avif":
          picture = await import(
            `$lib/assets/blog/images/${slug}/${baseName}.avif?w=480;700;1920&as=picture`
          );
          break;
        case "jpg":
          picture = await import(
            `$lib/assets/blog/images/${slug}/${baseName}.jpg?w=480;700;1920&format=avif&as=picture`
          );
          break;
        case "png":
          picture = await import(
            `$lib/assets/blog/images/${slug}/${baseName}.png?w=480;700;1920&format=avif&as=picture`
          );
          break;
        case "svg": {
          const { default: url } = await import(
            `$lib/assets/blog/images/${slug}/${baseName}.svg`
          );
          if (url !== undefined) {
            imgData[token.href] = { type: "img", src: url };
          }
          // since svgs are a special case, we want to end processing here
          return;
        }
        case "webp":
          picture = await import(
            `$lib/assets/blog/images/${slug}/${baseName}.webp?w=480;700;1920&as=picture`
          );
          break;
        default:
          console.error(`unsupported extension ${extension}`);
          break;
      }
      if (picture === undefined || picture.default === undefined) {
        console.error(`could not process image ${token.href}`);
        return;
      }

      imgData[token.href] = { type: "picture", ...picture.default };
    }
  };

  return new marked.Marked({ renderer, walkTokens, async: true });
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

  let previewImage: Image | undefined;
  if (data.image !== undefined) {
    const parseResult = parseExtension(data.image.path);
    if (parseResult !== null) {
      const { baseName, extension } = parseResult;
      let imgAsset: { default: string | undefined } | undefined;
      switch (extension) {
        case "jpg":
          imgAsset = await import(
            `$lib/assets/blog/images/${params.slug}/${baseName}.jpg?w=1200`
          );
          break;
        case "png":
          imgAsset = await import(
            `$lib/assets/blog/images/${params.slug}/${baseName}.png?w=1200`
          );
          break;
        default:
          throw new Error(
            `invalid preview image ${data.image.path} - Open Graph images must be png or jpg`,
          );
      }
      if (imgAsset !== undefined) {
        previewImage = {
          alt: data.image.alt,
          path: PUBLIC_BASE_URL + imgAsset.default,
        };
      }
    }
  }

  // it is necessary to make new instances of marked; otherwise, the global
  // instance will be duplicated and its configuration corrupted
  // https://marked.js.org/using_advanced#instance
  const markedInstance = configureMarked(params.slug);
  const html = await markedInstance.parse(content);

  const ldjson = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: data.title,
    ...(previewImage && { image: previewImage.path }),
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
