import type { BlogCardData, BlogInJson } from "$lib/types";

/* It's important to distinguish between the responsibilities of this function vs
 * the responsibilities of src/routes/blog/[slug]/+page.server.ts. This function
 * transforms JSON into BlogCardDatas. src/routes/blog/[slug]/+page.server.ts
 * transforms JSON into RenderBlogs.
 */

// return BlogCardData[] populated from index.json
// does not return blogs with published=false
export async function getBlogCardData(
  fetchFunc: typeof fetch,
): Promise<BlogCardData[]> {
  const res = await fetchFunc("/blog/index.json");
  if (!res.ok) throw Error("could not fetch /blog/index.json");

  const entries = Object.entries(
    (await res.json()) as { [slug: string]: BlogInJson },
  );
  for (const [slug, blog] of entries) {
    // print an error message if any of the blogs are invalid
    checkImageProperties(slug, blog);
  }

  return entries
    .filter(([_, blog]) => blog.published)
    .map(
      ([slug, blog]): BlogCardData => ({
        date: blog.date,
        preview: blog.preview,
        slug: slug,
        title: blog.title,
        url: `/blog/${slug}`,
      }),
    );
}

// Returns whether the given blog contains a preview image. Prints an error if some but not all the required preview image properties are found.
export function checkImageProperties(
  slug: string,
  blog: BlogInJson,
): blog is Required<BlogInJson> {
  const imgProperties = [
    "openGraphImageExt",
    "previewImage",
    "previewImageAlt",
    "previewImageExt",
  ];
  const existingProperties = imgProperties.filter(
    (property) => property in blog,
  );
  if (existingProperties.length === imgProperties.length) return true;

  if (existingProperties.length !== 0) {
    console.error(
      `Some, but not all of the required properties for a preview image were found in index.json for slug \`${slug}\`. The following properties were missing: ${imgProperties.filter((property) => !(property in blog)).join(", ")}`,
    );
  }

  return false;
}
