import type { Blog } from "$lib/types";

/* It's important to distinguish between the responsibilities of this function vs
 * the responsibilities of src/routes/blog/[slug]/+page.server.ts. This function
 * transforms data from JSON into a Blog. src/routes/blog/[slug]/+page.server.ts
 * transforms Blogs into RenderBlogs.
 */
export async function getBlogsAsJson(
  fetchFunc: typeof fetch,
): Promise<{ [slug: string]: Blog }> {
  try {
    const res = await fetchFunc("/blog/build/index.json");
    if (!res.ok) throw Error("could not fetch /blog/build/index.json");
    const json = await res.json();

    // massage the properties until they match the Blog type
    for (const slug of Object.getOwnPropertyNames(json)) {
      if (json[slug].previewImage !== undefined) {
        const pathWithoutExt = `${import.meta.env.VITE_URL}/blog/images/${slug}/${json[slug].previewImage}.`;
        json[slug].previewImage = {
          alt: json[slug].previewImageAlt,
          path: pathWithoutExt + json[slug].previewImageExt,
        };
        json[slug].openGraphImageUrl =
          pathWithoutExt + json[slug].openGraphImageExt;
      }
      json[slug].slug = slug;
      json[slug].url = `/blog/${slug}`;
    }

    return json;
  } catch (e: unknown) {
    console.error(e);
    throw e;
  }
}
