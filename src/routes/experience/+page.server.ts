import type { PageServerLoad } from "./$types";

import { getExperience } from "$lib/server/getExperience";
import type { Experience } from "$lib/types";

export const load: PageServerLoad = async ({ fetch }) => {
  let experiences: Experience[] = [];
  try {
    experiences = await getExperience(fetch);
  } catch (e: unknown) {
    console.error(e);
  }
  return { experiences };
};
