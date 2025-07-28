import type { RequestHandler } from "./$types";
import { parseBlog } from "$lib/server/blogUtils";
import { basename } from "node:path";

export const prerender = true;

export const GET: RequestHandler = () => {
  const initial_xml = `\
<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
  <channel>
    <title>Byron Sharman</title>
    <link>https://byronsharman.com/</link>
    <description>The latest blog posts from Byron Sharman</description>
    <language>en-us</language>
    <atom:link href="https://byronsharman.com/blog.xml" rel="self" type="application/rss+xml"/>`;

  const rawBlogData: Record<string, string> = import.meta.glob(
    "$lib/assets/markdown/blogs/*.md",
    {
      query: "?raw",
      import: "default",
      eager: true,
    },
  );
  return new Response(
    Object.entries(rawBlogData)
      .map(([filename, rawMarkdown]) => {
        const { data } = parseBlog(rawMarkdown);
        const { image: _, ...rest } = data;
        const slug: string = basename(filename, ".md");

        return { ...rest, slug };
      })
      .filter((blog) => blog.published)
      .toSorted((a, b) => b.date - a.date)
      .reduce(
        (output, blog) => `\
${output}
    <item>
      <title>${blog.title}</title>
      <description>${blog.description}</description>
      <link>https://byronsharman.com/blog/${blog.slug}</link>
      <guid>https://byronsharman.com/blog/${blog.slug}</guid>
      <pubDate>${new Date(blog.date * 1000).toUTCString()}</pubDate>
    </item>`,
        initial_xml,
      )
      .concat(`
  </channel>
</rss>
`),
  );
};
