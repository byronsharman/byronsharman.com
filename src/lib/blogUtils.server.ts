import type { Blog } from '$lib/types';

/* pass in Response.json() and get back a Blog[] */
export function blogJsonToObject(
  obj: object,
  toOmit?: string,
  shouldSlice: boolean = false
): Blog[] {
  let entries = Object.entries(obj);
  if (toOmit !== undefined) entries = entries.filter((e) => e[0] != toOmit);
  if (shouldSlice) entries = entries.slice(0, 4);
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
