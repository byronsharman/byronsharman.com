import { getBlogCardData } from "$lib/server/blogUtils";

import type { BlogCardData } from "$lib/types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const blogs: BlogCardData[] = await getBlogCardData();
  for (const bcd of blogs) {
    if (bcd.picture !== undefined) {
      bcd.mode = "image";
    }
  }
  return { blogs };
};
