import type { Blog } from '$lib/types';

/* pass in the result of getBlogsAsJson and get back a Blog[] */
export function jsonToBlogArray(
  obj: {[slug: string]: unknown},     // the output of Response.json()
  limit?: number,  // the maximum number of blogs to return
  toOmit?: string, // a slug of a blog to omit from the return value
): Blog[] {
  let entries = Object.entries(obj);
  if (toOmit !== undefined) entries = entries.filter((e) => e[0] != toOmit);
  if (limit !== undefined) entries = entries.slice(0, limit);
  return entries.map(
    ([key, value]: [string, any]) => {
      return {...value, slug: key};
    }
  );
}

export async function getBlogsAsJson(fetchFunc: typeof fetch): Promise<{ [slug: string]: Blog }> {
  try {
    const res = await fetchFunc('/blog/build/index.json');
    if (!res.ok) throw Error('could not fetch /blog/build/index.json');
    return await res.json();
  } catch (e: unknown) {
    console.error(e);
    throw e;
  }
}
