import type { Blog } from '$lib/types';

export async function getBlogsAsJson(fetchFunc: typeof fetch): Promise<{ [slug: string]: Blog }> {
  try {
    const res = await fetchFunc('/blog/build/index.json');
    if (!res.ok) throw Error('could not fetch /blog/build/index.json');
    let json = await res.json();

    // add a slug property to each blog
    for (const slug of Object.getOwnPropertyNames(json)) {
      json[slug].slug = slug
    }

    return json;
  } catch (e: unknown) {
    console.error(e);
    throw e;
  }
}
