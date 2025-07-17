import type { BlogCardData } from "$lib/types";
import matter from "gray-matter";
import { basename } from "node:path";

/* It's important to distinguish the responsibilities of this function from
 * those of src/routes/blog/[slug]/+page.server.ts. This function only returns
 * BlogCardData, whereas src/routes/blog/[slug]/+page.server.ts returns full
 * RenderBlogs.
 */

// return BlogCardData[] populated from blog frontmatter
// does not return blogs with published=false
export function getBlogCardData(): BlogCardData[] {
  const rawBlogData = import.meta.glob("$lib/assets/markdown/blogs/*.md", {
    query: "?raw",
    import: "default",
    eager: true,
  });
  return Object.entries(rawBlogData)
    .map(([filename, rawMarkdown]): BlogCardData | undefined => {
      const slug: string = basename(filename, ".md");
      const { data } = matter(rawMarkdown);
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
