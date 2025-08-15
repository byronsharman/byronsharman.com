import { getBlogCardData } from "$lib/server/blogUtils";

import type { BlogCardData } from "$lib/types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const blogs: BlogCardData[] = await getBlogCardData();
  if (!blogs.some(blog => blog.mode === "featured")) {
    // feature the first blog with an image
    for (const bcd of blogs) {
      if (bcd.picture !== undefined) {
        bcd.mode = "featured";
        break;
      }
    }
  }

  // swap the first blog with the first featured blog
  let i=0;
  for (; blogs[i].mode !== "featured"; i++) {}
  const tmp = blogs[0];
  blogs[0] = blogs[i];
  blogs[i] = tmp;
  return { blogs };
};
