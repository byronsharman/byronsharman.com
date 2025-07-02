import { getBlogCardData } from "$lib/server/blogUtils";

import type { BlogCardData } from "$lib/types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch }) => {
  let blogs: BlogCardData[] = [];
  try {
    blogs = await getBlogCardData(fetch);
  } catch (e: unknown) {
    console.error(e);
  }
  return { blogs };
};
