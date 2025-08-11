import { getBlogCardData } from "$lib/server/blogUtils";

import type { BlogCardData } from "$lib/types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const blogs: BlogCardData[] = await getBlogCardData();
  return { blogs };
};
