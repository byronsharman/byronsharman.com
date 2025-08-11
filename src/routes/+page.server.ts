import { getBlogCardData } from "$lib/server/blogUtils";

import type { BlogCardData } from "$lib/types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const blogs: BlogCardData[] = await getBlogCardData();
  // feature the first blog with an image
  for (const bcd of blogs) {
    if (bcd.picture !== undefined) {
      bcd.mode = "featured";
      break;
    }
  }
  return { blogs };
};
