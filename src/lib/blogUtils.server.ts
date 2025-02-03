import type { Blog } from '$lib/types';

/* pass in Response.json() and get back a Blog[] */
export function blogJsonToObject(obj: object, toOmit?: string, shouldSlice: boolean = false) {
  let entries = Object.entries(obj);
  if (toOmit !== undefined) entries = entries.filter((e) => e[0] != toOmit);
  if (shouldSlice) entries = entries.slice(0, 4);
  return entries.map(
    ([key, value]: [string, any]) => {
      return {...value, slug: key};
    }
  ) as Blog[];
}

export async function getBlogsAsJson(fetchFunc: Function) {
  return await fetchFunc('/blog/build/index.json')
    .then((res: Response) => res.json())
    .catch((err: Error) => console.error(err));
}
