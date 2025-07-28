import type { BlogCardData } from "$lib/types";
import { Blog } from "$lib/zod-schemas/blog";
import matter from "gray-matter";
import { basename } from "node:path";
import type * as zod from "zod";

/* It's important to distinguish the responsibilities of this function from
 * those of src/routes/blog/[slug]/+page.server.ts. This function only returns
 * BlogCardData, whereas src/routes/blog/[slug]/+page.server.ts returns full
 * RenderBlogs.
 */

// return BlogCardData[] populated from blog frontmatter
// does not return blogs with published=false
export function getBlogCardData(): BlogCardData[] {
  const rawBlogData: Record<string, string> = import.meta.glob(
    "$lib/assets/markdown/blogs/*.md",
    {
      query: "?raw",
      import: "default",
      eager: true,
    },
  );
  return Object.entries(rawBlogData)
    .map(([filename, rawMarkdown]): BlogCardData | undefined => {
      const slug: string = basename(filename, ".md");
      const { data } = parseBlog(rawMarkdown);
      const { date, description, published, title } = data;
      if (!published) return undefined;
      return {
        date,
        description,
        slug,
        title,
        url: `/blog/${slug}`,
      };
    })
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
