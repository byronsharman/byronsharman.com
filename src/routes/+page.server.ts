import type { PageServerLoad } from "./$types";

import { getBlogCardData } from "$lib/blogUtils.server";
import type { BlogCardData } from "$lib/types";

export const load: PageServerLoad = async ({ fetch }) => {
  let blogs: BlogCardData[] = [];
  try {
    blogs = await getBlogCardData(fetch);
  } catch (e: unknown) {
    console.error(e);
  }
  return { blogs };
};
