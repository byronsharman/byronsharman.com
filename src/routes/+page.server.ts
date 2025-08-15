import { getBlogCardData } from "$lib/server/blogUtils";

import type { BlogCardData } from "$lib/types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const blogs: BlogCardData[] = await getBlogCardData();
  if (!blogs.some((blog) => blog.mode === "featured")) {
    // feature the first blog with an image
    for (const bcd of blogs) {
      if (bcd.picture !== undefined) {
        bcd.mode = "featured";
        break;
      }
    }
  }

  // move the featured blog to the front
  let i = 0;
  for (; blogs[i].mode !== "featured"; i++) {}
  const tmp = blogs.splice(i, 1);
  blogs.unshift(...tmp);
  return { blogs };
};
