import parseExtension from "$lib/server/parseExtension";
import { Blog } from "$lib/zod-schemas/blog";
import type { BlogCardData } from "$lib/types";

import matter from "gray-matter";
import { basename } from "node:path";
import type { Picture } from "vite-imagetools";
import type * as zod from "zod";

/* It's important to distinguish the responsibilities of this function from
 * those of src/routes/blog/[slug]/+page.server.ts. This function only returns
 * BlogCardData, whereas src/routes/blog/[slug]/+page.server.ts returns full
 * RenderBlogs.
 */

// return BlogCardData[] populated from blog frontmatter
// does not return blogs with published=false
export async function getBlogCardData(): Promise<BlogCardData[]> {
  const rawBlogData: Record<string, string> = import.meta.glob(
    "$lib/assets/markdown/blogs/*.md",
    {
      query: "?raw",
      import: "default",
      eager: true,
    },
  );
  return (
    // aaa I need the pipeline operator
    await Promise.all(
      Object.entries(rawBlogData).map(
        async ([filename, rawMarkdown]): Promise<BlogCardData | undefined> => {
          const slug: string = basename(filename, ".md");
          const { data } = parseBlog(rawMarkdown);
          const { date, description, image, published, title } = data;

          let picture: (Picture & { alt: string }) | undefined;
          if (image !== undefined) {
            const parseResult = parseExtension(image.path);
            if (parseResult !== null) {
              const { baseName, extension } = parseResult;
              let imgAsset: { default: Picture } | undefined;
              switch (extension) {
                case "jpg":
                  imgAsset = await import(
                    `$lib/assets/blog/images/${slug}/${baseName}.jpg?w=480;700;1200&format=avif&as=picture`
                  );
                  break;
                case "png":
                  imgAsset = await import(
                    `$lib/assets/blog/images/${slug}/${baseName}.png?w=480;700;1200&format=avif&as=picture`
                  );
                  break;
                default:
                  throw new Error(`unsupported extension in ${image.path}`);
              }
              if (imgAsset !== undefined) {
                picture = { ...imgAsset.default, alt: image.alt };
              }
            }
          }

          if (!published) return undefined;
          return {
            date,
            description,
            mode: "regular",
            picture,
            slug,
            title,
            url: `/blog/${slug}`,
          };
        },
      ),
    )
  )
    .filter((bcd) => bcd !== undefined)
    .toSorted((a, b) => b.date - a.date);
}

export function parseBlog(rawMarkdown: string): {
  content: string;
  data: zod.infer<typeof Blog>;
} {
  const { content, data } = matter(rawMarkdown);
  const verified = Blog.parse(data);
  return { content, data: verified };
}
